/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./chrome/browserBookmark.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chrome/browserBookmark.js":
/*!***********************************!*\
  !*** ./chrome/browserBookmark.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {


var isreged = false;
var isUserLogined = false;



function initPageAction(){
    //let loginuserdiv = document.getElementById("loginuserdiv")
    //let reguserdiv = document.getElementById("reguserdiv")
    var exportBookmark = document.getElementById("exportBookmark")
    var importBookmark = document.getElementById("importBookmark")
    var userlogin = document.getElementById("userlogin")
    var userlogout = document.getElementById("userlogout")

    userlogin.addEventListener( "click" , ()=> {
        if( !isreged ){
            initReguserDiv();
            return;
        }
        $("#loginuserdiv").show();
        $("#loginuser_ok").click( ()=>{} )
        $("#loginuser_cancel").click( ()=>{ $("#loginuserdiv").hide() } )
    } )

    userlogout.addEventListener( "click" , ()=> {
        $("#loginuserdiv").show();
        $("#loginuser_ok").click( ()=>{} )
        $("#loginuser_cancel").click( ()=>{ $("#loginuserdiv").hide() } )
    } )
    exportBookmark.addEventListener( "click" , ()=> {

    } )

    importBookmark.addEventListener( "click" , ()=> {

    } )
}
//reguser init
function initReguserDiv() {
    $("#reguserdiv").show();
    $("#reguser_ok").click( ()=>{
        var name = $("#reguserdiv #userName").val();
        var passwd = $("#reguserdiv #passwd").val();
        var passwd2 = $("#reguserdiv #passwd2").val();
        var isAuto = $("#reguserdiv #isauto").val();
        if( name == "" || passwd =="" || passwd2==""  ){  //|| isAuto == ""
            $("#reguserdiv #errormsg").text( "字段不能为空" )
            return;
        }
        if( !passwd == passwd2 ){
            $("#reguserdiv #errormsg").text( "两个密码不一致！" )
            return
        }
        chrome.runtime.sendMessage({cmd: "reguser", data:{ name:name, passwd:passwd,  isAutoLogin: isAuto} })
    } )
    $("#reguser_cancel").click( ()=>{ $("#reguserdiv").hide() } )
}

function initUser( user ){

}

function initPageList() {
    var pubCount = document.getElementById("pubCount");
    var privateCount = document.getElementById("privateCount");


    chrome.runtime.sendMessage({cmd: "getPublicCount"})
    if( isUserLogined ){
        chrome.runtime.sendMessage({cmd: "getPrivateCount"})
        chrome.runtime.sendMessage({cmd: "getPrivateList", data: {pageNum: 1, sizeofpage: 100}})
    }
    chrome.runtime.sendMessage({cmd: "getPublicList", data: {pageNum: 1, sizeofpage: 100}})
}

function delPubDoc( e ){
    chrome.runtime.sendMessage({cmd:"delPubDoc", data:{id: e.dataset.id } } )
}
function delPrivateDoc( e ){
    chrome.runtime.sendMessage({cmd:"delPrivateDoc", data:{id: e.dataset.id } } )
}

function initPrivateList(){
    //显示个人书签
    chrome.runtime.sendMessage({cmd: "getPrivateCount"})
    chrome.runtime.sendMessage({cmd: "getPrivateList", data: {pageNum: 1, sizeofpage: 100}})
}

var publicBookmarkPanel = document.getElementById("publicBookmark")
var privateBookmarkPanel = document.getElementById("privateBookmark")

chrome.runtime.onMessage.addListener((req, sender, sendResponse ) => {

    if( isBackground( sender ) ){
        if( req.cmd == "inituser"){
            if( req.ok ){
                if( req.data == "" || !req.data.name )
                    { isreged = false; }
                else{
                    isreged = true;
                    if( req.data.isAutoLogin ) {
                        $("#userlogin").text(req.data.name + "已登录")
                        initPrivateList()
                    }
                }

            }
            return;
        }
        if( req.cmd == "userlogin" ){
            if( req.ok ){
                $("#loginuserdiv").hide()

                $("#userlogin").text(req.data.name + "已登录")
                initPrivateList()
            }else{
                $("#loginuserdiv>#errormsg").text(req.msg)
            }
            return;
        }
        if( req.cmd == "reguser" ){
            //注册同时登录
            if( req.ok ){
                $("#reguserdiv").hide()

                $("#userlogin").text(req.data.name + "已登录")
                initPrivateList()
            }else{
                $("#reguserdiv>#errormsg").text(req.msg)
            }
            return;
        }

        if( req.cmd=="getPublicCount"){
            if( req.ok )
                { pubCount.innerText = req.data.count; }
            return;
        }

        if( req.cmd=="getPrivateCount"){
            if( req.ok )
                { privateCount.innerText = req.data.count-1; }
            return;
        }
        if( req.cmd=="getPublicList"){
            if( req.ok ) {
                html = ['<ol id="js-list" class="list">']
                var res = req.data;
                for (var i = 0; i < res.length; i++)
                    { html.push( compile( res[i]) ) }
                html.push( '</ol>')
                publicBookmarkPanel.innerHTML = html.join("")
                $( 'a[title="Delete"]' ).click( function(){ delPubDoc( this ); } )
                console.log( html.join("") )
            }
            return;
        }
        if( req.cmd=="getPrivateList"){
            if( req.ok ) {
                html = ['<ol id="js-list" class="list">']
                var res$1 = req.data;
                for (var i = 0; i < res$1.length; i++)
                    { html.push( compile( res$1[i]) ) }
                html.push( '</ol>')
                privateBookmarkPanel.innerHTML = html.join("")
                $( 'a[title="Delete"]' ).click( function(){ delPubDoc( this ); } )
                console.log( html.join("") )
            }
            return;
        }
        if( req.cmd == "delPubDoc" ){
            if( req.ok ) {
                var docPanel = $("li[data-id=" + req.data.id + "]")
                if( docPanel )
                    { $(docPanel).remove(); }
            }
            return;
        }
        if( req.cmd == "delPrivateDoc" ){
            if( req.ok ) {
                var docPanel = $("li[data-id=" + req.data.id + "]")
                if( docPanel )
                    { $(docPanel).remove(); }
            }
            return;
        }
    }

})

var template = document.getElementById("itemtemplate")
function compile( content ){
    var itemnode = template.cloneNode( true )
    itemnode = jQuery( itemnode );
    $(itemnode).find( "[data-id]").each( function(i,e ){
        $(e).attr("data-id", content["_id"] )
    })
    $(itemnode).find("a:first").attr( "href", content["url"]);
    $(itemnode).find(".item__title, .js-itemTitle").text( content["title"] );
    //title="Date added"
    $(itemnode).find(".item__excerpt, .js-itemExcerpt").text( content["description"] );
    u = $(itemnode).find(".item__link")[0]
    //u.attr( "href", content["url"])
    //u.attr( "title", content["url"])
    $(u).attr( "href", content["url"])
    $(u).attr( "title", content["url"])
    $(u).text(content["url"])
    return itemnode.html();
}


function isBackground( sender ){
    if( !sender )
        { return false }
    return sender.url.indexOf("background_page.html") > -1 ;
}
/*
chrome.runtime.sendMessege(
    message,
    function(response) {

    }
)
 */

chrome.runtime.sendMessage({cmd: "inituser" })
initPageAction()
initPageList()

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2hyb21lL2Jyb3dzZXJCb29rbWFyay5qcyJdLCJuYW1lcyI6WyJsZXQiLCJyZXMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBQSxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNwQkEsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Ozs7QUFJMUIsU0FBUyxjQUFjLEVBQUU7OztJQUdyQkEsR0FBRyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBQzlEQSxHQUFHLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7SUFDOURBLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7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b2ttYXJrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jaHJvbWUvYnJvd3NlckJvb2ttYXJrLmpzXCIpO1xuIiwiXHJcbmxldCBpc3JlZ2VkID0gZmFsc2U7XHJcbmxldCBpc1VzZXJMb2dpbmVkID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRQYWdlQWN0aW9uKCl7XHJcbiAgICAvL2xldCBsb2dpbnVzZXJkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2ludXNlcmRpdlwiKVxyXG4gICAgLy9sZXQgcmVndXNlcmRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVndXNlcmRpdlwiKVxyXG4gICAgbGV0IGV4cG9ydEJvb2ttYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBvcnRCb29rbWFya1wiKVxyXG4gICAgbGV0IGltcG9ydEJvb2ttYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbXBvcnRCb29rbWFya1wiKVxyXG4gICAgbGV0IHVzZXJsb2dpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcmxvZ2luXCIpXHJcbiAgICBsZXQgdXNlcmxvZ291dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcmxvZ291dFwiKVxyXG5cclxuICAgIHVzZXJsb2dpbi5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCAoKT0+IHtcclxuICAgICAgICBpZiggIWlzcmVnZWQgKXtcclxuICAgICAgICAgICAgaW5pdFJlZ3VzZXJEaXYoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiI2xvZ2ludXNlcmRpdlwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIiNsb2dpbnVzZXJfb2tcIikuY2xpY2soICgpPT57fSApXHJcbiAgICAgICAgJChcIiNsb2dpbnVzZXJfY2FuY2VsXCIpLmNsaWNrKCAoKT0+eyAkKFwiI2xvZ2ludXNlcmRpdlwiKS5oaWRlKCkgfSApXHJcbiAgICB9IClcclxuXHJcbiAgICB1c2VybG9nb3V0LmFkZEV2ZW50TGlzdGVuZXIoIFwiY2xpY2tcIiAsICgpPT4ge1xyXG4gICAgICAgICQoXCIjbG9naW51c2VyZGl2XCIpLnNob3coKTtcclxuICAgICAgICAkKFwiI2xvZ2ludXNlcl9va1wiKS5jbGljayggKCk9Pnt9IClcclxuICAgICAgICAkKFwiI2xvZ2ludXNlcl9jYW5jZWxcIikuY2xpY2soICgpPT57ICQoXCIjbG9naW51c2VyZGl2XCIpLmhpZGUoKSB9IClcclxuICAgIH0gKVxyXG4gICAgZXhwb3J0Qm9va21hcmsuYWRkRXZlbnRMaXN0ZW5lciggXCJjbGlja1wiICwgKCk9PiB7XHJcblxyXG4gICAgfSApXHJcblxyXG4gICAgaW1wb3J0Qm9va21hcmsuYWRkRXZlbnRMaXN0ZW5lciggXCJjbGlja1wiICwgKCk9PiB7XHJcblxyXG4gICAgfSApXHJcbn1cclxuLy9yZWd1c2VyIGluaXRcclxuZnVuY3Rpb24gaW5pdFJlZ3VzZXJEaXYoKSB7XHJcbiAgICAkKFwiI3JlZ3VzZXJkaXZcIikuc2hvdygpO1xyXG4gICAgJChcIiNyZWd1c2VyX29rXCIpLmNsaWNrKCAoKT0+e1xyXG4gICAgICAgIGxldCBuYW1lID0gJChcIiNyZWd1c2VyZGl2ICN1c2VyTmFtZVwiKS52YWwoKTtcclxuICAgICAgICBsZXQgcGFzc3dkID0gJChcIiNyZWd1c2VyZGl2ICNwYXNzd2RcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHBhc3N3ZDIgPSAkKFwiI3JlZ3VzZXJkaXYgI3Bhc3N3ZDJcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IGlzQXV0byA9ICQoXCIjcmVndXNlcmRpdiAjaXNhdXRvXCIpLnZhbCgpO1xyXG4gICAgICAgIGlmKCBuYW1lID09IFwiXCIgfHwgcGFzc3dkID09XCJcIiB8fCBwYXNzd2QyPT1cIlwiICApeyAgLy98fCBpc0F1dG8gPT0gXCJcIlxyXG4gICAgICAgICAgICAkKFwiI3JlZ3VzZXJkaXYgI2Vycm9ybXNnXCIpLnRleHQoIFwi5a2X5q615LiN6IO95Li656m6XCIgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCAhcGFzc3dkID09IHBhc3N3ZDIgKXtcclxuICAgICAgICAgICAgJChcIiNyZWd1c2VyZGl2ICNlcnJvcm1zZ1wiKS50ZXh0KCBcIuS4pOS4quWvhueggeS4jeS4gOiHtO+8gVwiIClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6IFwicmVndXNlclwiLCBkYXRhOnsgbmFtZTpuYW1lLCBwYXNzd2Q6cGFzc3dkLCAgaXNBdXRvTG9naW46IGlzQXV0b30gfSlcclxuICAgIH0gKVxyXG4gICAgJChcIiNyZWd1c2VyX2NhbmNlbFwiKS5jbGljayggKCk9PnsgJChcIiNyZWd1c2VyZGl2XCIpLmhpZGUoKSB9IClcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFVzZXIoIHVzZXIgKXtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQYWdlTGlzdCgpIHtcclxuICAgIGxldCBwdWJDb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHViQ291bnRcIik7XHJcbiAgICBsZXQgcHJpdmF0ZUNvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcml2YXRlQ291bnRcIik7XHJcblxyXG5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6IFwiZ2V0UHVibGljQ291bnRcIn0pXHJcbiAgICBpZiggaXNVc2VyTG9naW5lZCApe1xyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6IFwiZ2V0UHJpdmF0ZUNvdW50XCJ9KVxyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6IFwiZ2V0UHJpdmF0ZUxpc3RcIiwgZGF0YToge3BhZ2VOdW06IDEsIHNpemVvZnBhZ2U6IDEwMH19KVxyXG4gICAgfVxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJnZXRQdWJsaWNMaXN0XCIsIGRhdGE6IHtwYWdlTnVtOiAxLCBzaXplb2ZwYWdlOiAxMDB9fSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsUHViRG9jKCBlICl7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7Y21kOlwiZGVsUHViRG9jXCIsIGRhdGE6e2lkOiBlLmRhdGFzZXQuaWQgfSB9IClcclxufVxyXG5mdW5jdGlvbiBkZWxQcml2YXRlRG9jKCBlICl7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7Y21kOlwiZGVsUHJpdmF0ZURvY1wiLCBkYXRhOntpZDogZS5kYXRhc2V0LmlkIH0gfSApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQcml2YXRlTGlzdCgpe1xyXG4gICAgLy/mmL7npLrkuKrkurrkuabnrb5cclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6IFwiZ2V0UHJpdmF0ZUNvdW50XCJ9KVxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJnZXRQcml2YXRlTGlzdFwiLCBkYXRhOiB7cGFnZU51bTogMSwgc2l6ZW9mcGFnZTogMTAwfX0pXHJcbn1cclxuXHJcbmxldCBwdWJsaWNCb29rbWFya1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwdWJsaWNCb29rbWFya1wiKVxyXG5sZXQgcHJpdmF0ZUJvb2ttYXJrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaXZhdGVCb29rbWFya1wiKVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXEsIHNlbmRlciwgc2VuZFJlc3BvbnNlICkgPT4ge1xyXG5cclxuICAgIGlmKCBpc0JhY2tncm91bmQoIHNlbmRlciApICl7XHJcbiAgICAgICAgaWYoIHJlcS5jbWQgPT0gXCJpbml0dXNlclwiKXtcclxuICAgICAgICAgICAgaWYoIHJlcS5vayApe1xyXG4gICAgICAgICAgICAgICAgaWYoIHJlcS5kYXRhID09IFwiXCIgfHwgIXJlcS5kYXRhLm5hbWUgKVxyXG4gICAgICAgICAgICAgICAgICAgIGlzcmVnZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNyZWdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIHJlcS5kYXRhLmlzQXV0b0xvZ2luICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3VzZXJsb2dpblwiKS50ZXh0KHJlcS5kYXRhLm5hbWUgKyBcIuW3sueZu+W9lVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0UHJpdmF0ZUxpc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggcmVxLmNtZCA9PSBcInVzZXJsb2dpblwiICl7XHJcbiAgICAgICAgICAgIGlmKCByZXEub2sgKXtcclxuICAgICAgICAgICAgICAgICQoXCIjbG9naW51c2VyZGl2XCIpLmhpZGUoKVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjdXNlcmxvZ2luXCIpLnRleHQocmVxLmRhdGEubmFtZSArIFwi5bey55m75b2VXCIpXHJcbiAgICAgICAgICAgICAgICBpbml0UHJpdmF0ZUxpc3QoKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQoXCIjbG9naW51c2VyZGl2PiNlcnJvcm1zZ1wiKS50ZXh0KHJlcS5tc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggcmVxLmNtZCA9PSBcInJlZ3VzZXJcIiApe1xyXG4gICAgICAgICAgICAvL+azqOWGjOWQjOaXtueZu+W9lVxyXG4gICAgICAgICAgICBpZiggcmVxLm9rICl7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3JlZ3VzZXJkaXZcIikuaGlkZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiN1c2VybG9naW5cIikudGV4dChyZXEuZGF0YS5uYW1lICsgXCLlt7LnmbvlvZVcIilcclxuICAgICAgICAgICAgICAgIGluaXRQcml2YXRlTGlzdCgpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJChcIiNyZWd1c2VyZGl2PiNlcnJvcm1zZ1wiKS50ZXh0KHJlcS5tc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIHJlcS5jbWQ9PVwiZ2V0UHVibGljQ291bnRcIil7XHJcbiAgICAgICAgICAgIGlmKCByZXEub2sgKVxyXG4gICAgICAgICAgICAgICAgcHViQ291bnQuaW5uZXJUZXh0ID0gcmVxLmRhdGEuY291bnQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCByZXEuY21kPT1cImdldFByaXZhdGVDb3VudFwiKXtcclxuICAgICAgICAgICAgaWYoIHJlcS5vayApXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlQ291bnQuaW5uZXJUZXh0ID0gcmVxLmRhdGEuY291bnQtMTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggcmVxLmNtZD09XCJnZXRQdWJsaWNMaXN0XCIpe1xyXG4gICAgICAgICAgICBpZiggcmVxLm9rICkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IFsnPG9sIGlkPVwianMtbGlzdFwiIGNsYXNzPVwibGlzdFwiPiddXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmVxLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICBodG1sLnB1c2goIGNvbXBpbGUoIHJlc1tpXSkgKVxyXG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKCAnPC9vbD4nKVxyXG4gICAgICAgICAgICAgICAgcHVibGljQm9va21hcmtQYW5lbC5pbm5lckhUTUwgPSBodG1sLmpvaW4oXCJcIilcclxuICAgICAgICAgICAgICAgICQoICdhW3RpdGxlPVwiRGVsZXRlXCJdJyApLmNsaWNrKCBmdW5jdGlvbigpeyBkZWxQdWJEb2MoIHRoaXMgKTsgfSApXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggaHRtbC5qb2luKFwiXCIpIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCByZXEuY21kPT1cImdldFByaXZhdGVMaXN0XCIpe1xyXG4gICAgICAgICAgICBpZiggcmVxLm9rICkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IFsnPG9sIGlkPVwianMtbGlzdFwiIGNsYXNzPVwibGlzdFwiPiddXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmVxLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICBodG1sLnB1c2goIGNvbXBpbGUoIHJlc1tpXSkgKVxyXG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKCAnPC9vbD4nKVxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZUJvb2ttYXJrUGFuZWwuaW5uZXJIVE1MID0gaHRtbC5qb2luKFwiXCIpXHJcbiAgICAgICAgICAgICAgICAkKCAnYVt0aXRsZT1cIkRlbGV0ZVwiXScgKS5jbGljayggZnVuY3Rpb24oKXsgZGVsUHViRG9jKCB0aGlzICk7IH0gKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIGh0bWwuam9pbihcIlwiKSApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggcmVxLmNtZCA9PSBcImRlbFB1YkRvY1wiICl7XHJcbiAgICAgICAgICAgIGlmKCByZXEub2sgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZG9jUGFuZWwgPSAkKFwibGlbZGF0YS1pZD1cIiArIHJlcS5kYXRhLmlkICsgXCJdXCIpXHJcbiAgICAgICAgICAgICAgICBpZiggZG9jUGFuZWwgKVxyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jUGFuZWwpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIHJlcS5jbWQgPT0gXCJkZWxQcml2YXRlRG9jXCIgKXtcclxuICAgICAgICAgICAgaWYoIHJlcS5vayApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb2NQYW5lbCA9ICQoXCJsaVtkYXRhLWlkPVwiICsgcmVxLmRhdGEuaWQgKyBcIl1cIilcclxuICAgICAgICAgICAgICAgIGlmKCBkb2NQYW5lbCApXHJcbiAgICAgICAgICAgICAgICAgICAgJChkb2NQYW5lbCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcblxyXG5sZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW10ZW1wbGF0ZVwiKVxyXG5mdW5jdGlvbiBjb21waWxlKCBjb250ZW50ICl7XHJcbiAgICB2YXIgaXRlbW5vZGUgPSB0ZW1wbGF0ZS5jbG9uZU5vZGUoIHRydWUgKVxyXG4gICAgaXRlbW5vZGUgPSBqUXVlcnkoIGl0ZW1ub2RlICk7XHJcbiAgICAkKGl0ZW1ub2RlKS5maW5kKCBcIltkYXRhLWlkXVwiKS5lYWNoKCBmdW5jdGlvbihpLGUgKXtcclxuICAgICAgICAkKGUpLmF0dHIoXCJkYXRhLWlkXCIsIGNvbnRlbnRbXCJfaWRcIl0gKVxyXG4gICAgfSlcclxuICAgICQoaXRlbW5vZGUpLmZpbmQoXCJhOmZpcnN0XCIpLmF0dHIoIFwiaHJlZlwiLCBjb250ZW50W1widXJsXCJdKTtcclxuICAgICQoaXRlbW5vZGUpLmZpbmQoXCIuaXRlbV9fdGl0bGUsIC5qcy1pdGVtVGl0bGVcIikudGV4dCggY29udGVudFtcInRpdGxlXCJdICk7XHJcbiAgICAvL3RpdGxlPVwiRGF0ZSBhZGRlZFwiXHJcbiAgICAkKGl0ZW1ub2RlKS5maW5kKFwiLml0ZW1fX2V4Y2VycHQsIC5qcy1pdGVtRXhjZXJwdFwiKS50ZXh0KCBjb250ZW50W1wiZGVzY3JpcHRpb25cIl0gKTtcclxuICAgIHUgPSAkKGl0ZW1ub2RlKS5maW5kKFwiLml0ZW1fX2xpbmtcIilbMF1cclxuICAgIC8vdS5hdHRyKCBcImhyZWZcIiwgY29udGVudFtcInVybFwiXSlcclxuICAgIC8vdS5hdHRyKCBcInRpdGxlXCIsIGNvbnRlbnRbXCJ1cmxcIl0pXHJcbiAgICAkKHUpLmF0dHIoIFwiaHJlZlwiLCBjb250ZW50W1widXJsXCJdKVxyXG4gICAgJCh1KS5hdHRyKCBcInRpdGxlXCIsIGNvbnRlbnRbXCJ1cmxcIl0pXHJcbiAgICAkKHUpLnRleHQoY29udGVudFtcInVybFwiXSlcclxuICAgIHJldHVybiBpdGVtbm9kZS5odG1sKCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc0JhY2tncm91bmQoIHNlbmRlciApe1xyXG4gICAgaWYoICFzZW5kZXIgKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgcmV0dXJuIHNlbmRlci51cmwuaW5kZXhPZihcImJhY2tncm91bmRfcGFnZS5odG1sXCIpID4gLTEgO1xyXG59XHJcbi8qXHJcbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzZWdlKFxyXG4gICAgbWVzc2FnZSxcclxuICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgfVxyXG4pXHJcbiAqL1xyXG5cclxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJpbml0dXNlclwiIH0pXHJcbmluaXRQYWdlQWN0aW9uKClcclxuaW5pdFBhZ2VMaXN0KCkiXSwic291cmNlUm9vdCI6IiJ9