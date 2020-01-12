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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2hyb21lL2Jyb3dzZXJCb29rbWFyay5qcyJdLCJuYW1lcyI6WyJsZXQiLCJyZXMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBQSxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNwQkEsR0FBRyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Ozs7QUFJMUIsU0FBUyxjQUFjLEVBQUU7OztJQUdyQkEsR0FBRyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBQzlEQSxHQUFHLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7SUFDOURBLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Nocm9tZS9icm93c2VyQm9va21hcmsuanNcIik7XG4iLCJcclxubGV0IGlzcmVnZWQgPSBmYWxzZTtcclxubGV0IGlzVXNlckxvZ2luZWQgPSBmYWxzZTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdFBhZ2VBY3Rpb24oKXtcclxuICAgIC8vbGV0IGxvZ2ludXNlcmRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW51c2VyZGl2XCIpXHJcbiAgICAvL2xldCByZWd1c2VyZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWd1c2VyZGl2XCIpXHJcbiAgICBsZXQgZXhwb3J0Qm9va21hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cG9ydEJvb2ttYXJrXCIpXHJcbiAgICBsZXQgaW1wb3J0Qm9va21hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltcG9ydEJvb2ttYXJrXCIpXHJcbiAgICBsZXQgdXNlcmxvZ2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybG9naW5cIilcclxuICAgIGxldCB1c2VybG9nb3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybG9nb3V0XCIpXHJcblxyXG4gICAgdXNlcmxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoIFwiY2xpY2tcIiAsICgpPT4ge1xyXG4gICAgICAgIGlmKCAhaXNyZWdlZCApe1xyXG4gICAgICAgICAgICBpbml0UmVndXNlckRpdigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjbG9naW51c2VyZGl2XCIpLnNob3coKTtcclxuICAgICAgICAkKFwiI2xvZ2ludXNlcl9va1wiKS5jbGljayggKCk9Pnt9IClcclxuICAgICAgICAkKFwiI2xvZ2ludXNlcl9jYW5jZWxcIikuY2xpY2soICgpPT57ICQoXCIjbG9naW51c2VyZGl2XCIpLmhpZGUoKSB9IClcclxuICAgIH0gKVxyXG5cclxuICAgIHVzZXJsb2dvdXQuYWRkRXZlbnRMaXN0ZW5lciggXCJjbGlja1wiICwgKCk9PiB7XHJcbiAgICAgICAgJChcIiNsb2dpbnVzZXJkaXZcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIjbG9naW51c2VyX29rXCIpLmNsaWNrKCAoKT0+e30gKVxyXG4gICAgICAgICQoXCIjbG9naW51c2VyX2NhbmNlbFwiKS5jbGljayggKCk9PnsgJChcIiNsb2dpbnVzZXJkaXZcIikuaGlkZSgpIH0gKVxyXG4gICAgfSApXHJcbiAgICBleHBvcnRCb29rbWFyay5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCAoKT0+IHtcclxuXHJcbiAgICB9IClcclxuXHJcbiAgICBpbXBvcnRCb29rbWFyay5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCAoKT0+IHtcclxuXHJcbiAgICB9IClcclxufVxyXG4vL3JlZ3VzZXIgaW5pdFxyXG5mdW5jdGlvbiBpbml0UmVndXNlckRpdigpIHtcclxuICAgICQoXCIjcmVndXNlcmRpdlwiKS5zaG93KCk7XHJcbiAgICAkKFwiI3JlZ3VzZXJfb2tcIikuY2xpY2soICgpPT57XHJcbiAgICAgICAgbGV0IG5hbWUgPSAkKFwiI3JlZ3VzZXJkaXYgI3VzZXJOYW1lXCIpLnZhbCgpO1xyXG4gICAgICAgIGxldCBwYXNzd2QgPSAkKFwiI3JlZ3VzZXJkaXYgI3Bhc3N3ZFwiKS52YWwoKTtcclxuICAgICAgICBsZXQgcGFzc3dkMiA9ICQoXCIjcmVndXNlcmRpdiAjcGFzc3dkMlwiKS52YWwoKTtcclxuICAgICAgICBsZXQgaXNBdXRvID0gJChcIiNyZWd1c2VyZGl2ICNpc2F1dG9cIikudmFsKCk7XHJcbiAgICAgICAgaWYoIG5hbWUgPT0gXCJcIiB8fCBwYXNzd2QgPT1cIlwiIHx8IHBhc3N3ZDI9PVwiXCIgICl7ICAvL3x8IGlzQXV0byA9PSBcIlwiXHJcbiAgICAgICAgICAgICQoXCIjcmVndXNlcmRpdiAjZXJyb3Jtc2dcIikudGV4dCggXCLlrZfmrrXkuI3og73kuLrnqbpcIiApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoICFwYXNzd2QgPT0gcGFzc3dkMiApe1xyXG4gICAgICAgICAgICAkKFwiI3JlZ3VzZXJkaXYgI2Vycm9ybXNnXCIpLnRleHQoIFwi5Lik5Liq5a+G56CB5LiN5LiA6Ie077yBXCIgKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJyZWd1c2VyXCIsIGRhdGE6eyBuYW1lOm5hbWUsIHBhc3N3ZDpwYXNzd2QsICBpc0F1dG9Mb2dpbjogaXNBdXRvfSB9KVxyXG4gICAgfSApXHJcbiAgICAkKFwiI3JlZ3VzZXJfY2FuY2VsXCIpLmNsaWNrKCAoKT0+eyAkKFwiI3JlZ3VzZXJkaXZcIikuaGlkZSgpIH0gKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0VXNlciggdXNlciApe1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBhZ2VMaXN0KCkge1xyXG4gICAgbGV0IHB1YkNvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwdWJDb3VudFwiKTtcclxuICAgIGxldCBwcml2YXRlQ291bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaXZhdGVDb3VudFwiKTtcclxuXHJcblxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJnZXRQdWJsaWNDb3VudFwifSlcclxuICAgIGlmKCBpc1VzZXJMb2dpbmVkICl7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJnZXRQcml2YXRlQ291bnRcIn0pXHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJnZXRQcml2YXRlTGlzdFwiLCBkYXRhOiB7cGFnZU51bTogMSwgc2l6ZW9mcGFnZTogMTAwfX0pXHJcbiAgICB9XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7Y21kOiBcImdldFB1YmxpY0xpc3RcIiwgZGF0YToge3BhZ2VOdW06IDEsIHNpemVvZnBhZ2U6IDEwMH19KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxQdWJEb2MoIGUgKXtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6XCJkZWxQdWJEb2NcIiwgZGF0YTp7aWQ6IGUuZGF0YXNldC5pZCB9IH0gKVxyXG59XHJcbmZ1bmN0aW9uIGRlbFByaXZhdGVEb2MoIGUgKXtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6XCJkZWxQcml2YXRlRG9jXCIsIGRhdGE6e2lkOiBlLmRhdGFzZXQuaWQgfSB9IClcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFByaXZhdGVMaXN0KCl7XHJcbiAgICAvL+aYvuekuuS4quS6uuS5puetvlxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDogXCJnZXRQcml2YXRlQ291bnRcIn0pXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7Y21kOiBcImdldFByaXZhdGVMaXN0XCIsIGRhdGE6IHtwYWdlTnVtOiAxLCBzaXplb2ZwYWdlOiAxMDB9fSlcclxufVxyXG5cclxubGV0IHB1YmxpY0Jvb2ttYXJrUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInB1YmxpY0Jvb2ttYXJrXCIpXHJcbmxldCBwcml2YXRlQm9va21hcmtQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpdmF0ZUJvb2ttYXJrXCIpXHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UgKSA9PiB7XHJcblxyXG4gICAgaWYoIGlzQmFja2dyb3VuZCggc2VuZGVyICkgKXtcclxuICAgICAgICBpZiggcmVxLmNtZCA9PSBcImluaXR1c2VyXCIpe1xyXG4gICAgICAgICAgICBpZiggcmVxLm9rICl7XHJcbiAgICAgICAgICAgICAgICBpZiggcmVxLmRhdGEgPT0gXCJcIiB8fCAhcmVxLmRhdGEubmFtZSApXHJcbiAgICAgICAgICAgICAgICAgICAgaXNyZWdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpc3JlZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiggcmVxLmRhdGEuaXNBdXRvTG9naW4gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXNlcmxvZ2luXCIpLnRleHQocmVxLmRhdGEubmFtZSArIFwi5bey55m75b2VXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRQcml2YXRlTGlzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCByZXEuY21kID09IFwidXNlcmxvZ2luXCIgKXtcclxuICAgICAgICAgICAgaWYoIHJlcS5vayApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2dpbnVzZXJkaXZcIikuaGlkZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiN1c2VybG9naW5cIikudGV4dChyZXEuZGF0YS5uYW1lICsgXCLlt7LnmbvlvZVcIilcclxuICAgICAgICAgICAgICAgIGluaXRQcml2YXRlTGlzdCgpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJChcIiNsb2dpbnVzZXJkaXY+I2Vycm9ybXNnXCIpLnRleHQocmVxLm1zZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCByZXEuY21kID09IFwicmVndXNlclwiICl7XHJcbiAgICAgICAgICAgIC8v5rOo5YaM5ZCM5pe255m75b2VXHJcbiAgICAgICAgICAgIGlmKCByZXEub2sgKXtcclxuICAgICAgICAgICAgICAgICQoXCIjcmVndXNlcmRpdlwiKS5oaWRlKClcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI3VzZXJsb2dpblwiKS50ZXh0KHJlcS5kYXRhLm5hbWUgKyBcIuW3sueZu+W9lVwiKVxyXG4gICAgICAgICAgICAgICAgaW5pdFByaXZhdGVMaXN0KClcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3JlZ3VzZXJkaXY+I2Vycm9ybXNnXCIpLnRleHQocmVxLm1zZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiggcmVxLmNtZD09XCJnZXRQdWJsaWNDb3VudFwiKXtcclxuICAgICAgICAgICAgaWYoIHJlcS5vayApXHJcbiAgICAgICAgICAgICAgICBwdWJDb3VudC5pbm5lclRleHQgPSByZXEuZGF0YS5jb3VudDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIHJlcS5jbWQ9PVwiZ2V0UHJpdmF0ZUNvdW50XCIpe1xyXG4gICAgICAgICAgICBpZiggcmVxLm9rIClcclxuICAgICAgICAgICAgICAgIHByaXZhdGVDb3VudC5pbm5lclRleHQgPSByZXEuZGF0YS5jb3VudC0xO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCByZXEuY21kPT1cImdldFB1YmxpY0xpc3RcIil7XHJcbiAgICAgICAgICAgIGlmKCByZXEub2sgKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sID0gWyc8b2wgaWQ9XCJqcy1saXN0XCIgY2xhc3M9XCJsaXN0XCI+J11cclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSByZXEuZGF0YTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwucHVzaCggY29tcGlsZSggcmVzW2ldKSApXHJcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goICc8L29sPicpXHJcbiAgICAgICAgICAgICAgICBwdWJsaWNCb29rbWFya1BhbmVsLmlubmVySFRNTCA9IGh0bWwuam9pbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgJCggJ2FbdGl0bGU9XCJEZWxldGVcIl0nICkuY2xpY2soIGZ1bmN0aW9uKCl7IGRlbFB1YkRvYyggdGhpcyApOyB9IClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBodG1sLmpvaW4oXCJcIikgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIHJlcS5jbWQ9PVwiZ2V0UHJpdmF0ZUxpc3RcIil7XHJcbiAgICAgICAgICAgIGlmKCByZXEub2sgKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sID0gWyc8b2wgaWQ9XCJqcy1saXN0XCIgY2xhc3M9XCJsaXN0XCI+J11cclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSByZXEuZGF0YTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwucHVzaCggY29tcGlsZSggcmVzW2ldKSApXHJcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goICc8L29sPicpXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlQm9va21hcmtQYW5lbC5pbm5lckhUTUwgPSBodG1sLmpvaW4oXCJcIilcclxuICAgICAgICAgICAgICAgICQoICdhW3RpdGxlPVwiRGVsZXRlXCJdJyApLmNsaWNrKCBmdW5jdGlvbigpeyBkZWxQdWJEb2MoIHRoaXMgKTsgfSApXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggaHRtbC5qb2luKFwiXCIpIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCByZXEuY21kID09IFwiZGVsUHViRG9jXCIgKXtcclxuICAgICAgICAgICAgaWYoIHJlcS5vayApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb2NQYW5lbCA9ICQoXCJsaVtkYXRhLWlkPVwiICsgcmVxLmRhdGEuaWQgKyBcIl1cIilcclxuICAgICAgICAgICAgICAgIGlmKCBkb2NQYW5lbCApXHJcbiAgICAgICAgICAgICAgICAgICAgJChkb2NQYW5lbCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggcmVxLmNtZCA9PSBcImRlbFByaXZhdGVEb2NcIiApe1xyXG4gICAgICAgICAgICBpZiggcmVxLm9rICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvY1BhbmVsID0gJChcImxpW2RhdGEtaWQ9XCIgKyByZXEuZGF0YS5pZCArIFwiXVwiKVxyXG4gICAgICAgICAgICAgICAgaWYoIGRvY1BhbmVsIClcclxuICAgICAgICAgICAgICAgICAgICAkKGRvY1BhbmVsKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSlcclxuXHJcbmxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbXRlbXBsYXRlXCIpXHJcbmZ1bmN0aW9uIGNvbXBpbGUoIGNvbnRlbnQgKXtcclxuICAgIHZhciBpdGVtbm9kZSA9IHRlbXBsYXRlLmNsb25lTm9kZSggdHJ1ZSApXHJcbiAgICBpdGVtbm9kZSA9IGpRdWVyeSggaXRlbW5vZGUgKTtcclxuICAgICQoaXRlbW5vZGUpLmZpbmQoIFwiW2RhdGEtaWRdXCIpLmVhY2goIGZ1bmN0aW9uKGksZSApe1xyXG4gICAgICAgICQoZSkuYXR0cihcImRhdGEtaWRcIiwgY29udGVudFtcIl9pZFwiXSApXHJcbiAgICB9KVxyXG4gICAgJChpdGVtbm9kZSkuZmluZChcImE6Zmlyc3RcIikuYXR0ciggXCJocmVmXCIsIGNvbnRlbnRbXCJ1cmxcIl0pO1xyXG4gICAgJChpdGVtbm9kZSkuZmluZChcIi5pdGVtX190aXRsZSwgLmpzLWl0ZW1UaXRsZVwiKS50ZXh0KCBjb250ZW50W1widGl0bGVcIl0gKTtcclxuICAgIC8vdGl0bGU9XCJEYXRlIGFkZGVkXCJcclxuICAgICQoaXRlbW5vZGUpLmZpbmQoXCIuaXRlbV9fZXhjZXJwdCwgLmpzLWl0ZW1FeGNlcnB0XCIpLnRleHQoIGNvbnRlbnRbXCJkZXNjcmlwdGlvblwiXSApO1xyXG4gICAgdSA9ICQoaXRlbW5vZGUpLmZpbmQoXCIuaXRlbV9fbGlua1wiKVswXVxyXG4gICAgLy91LmF0dHIoIFwiaHJlZlwiLCBjb250ZW50W1widXJsXCJdKVxyXG4gICAgLy91LmF0dHIoIFwidGl0bGVcIiwgY29udGVudFtcInVybFwiXSlcclxuICAgICQodSkuYXR0ciggXCJocmVmXCIsIGNvbnRlbnRbXCJ1cmxcIl0pXHJcbiAgICAkKHUpLmF0dHIoIFwidGl0bGVcIiwgY29udGVudFtcInVybFwiXSlcclxuICAgICQodSkudGV4dChjb250ZW50W1widXJsXCJdKVxyXG4gICAgcmV0dXJuIGl0ZW1ub2RlLmh0bWwoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGlzQmFja2dyb3VuZCggc2VuZGVyICl7XHJcbiAgICBpZiggIXNlbmRlciApXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gc2VuZGVyLnVybC5pbmRleE9mKFwiYmFja2dyb3VuZF9wYWdlLmh0bWxcIikgPiAtMSA7XHJcbn1cclxuLypcclxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NlZ2UoXHJcbiAgICBtZXNzYWdlLFxyXG4gICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHJcbiAgICB9XHJcbilcclxuICovXHJcblxyXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7Y21kOiBcImluaXR1c2VyXCIgfSlcclxuaW5pdFBhZ2VBY3Rpb24oKSJdLCJzb3VyY2VSb290IjoiIn0=