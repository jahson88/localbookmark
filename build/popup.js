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
/******/ 	return __webpack_require__(__webpack_require__.s = "./chrome/popup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chrome/popup.js":
/*!*************************!*\
  !*** ./chrome/popup.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {


var actionResult = document.getElementById("actionResult")

function addBookmark() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        doAddBookmark( activeTab)
        //chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, doAddBookmark );
    });
}

function makeDoc( tab ){
    var doc = {};
    doc.url = tab.url;
    doc.title = tab.title;
    doc.description = ""    //tab.description;
    doc.content = "";
    doc.favIconUrl= tab.favIconUrl; //"https://www.baidu.com/favicon.ico"
    return doc;
}
function doAddBookmark( tab ) {
    //获得doc
    var doc = makeDoc( tab )
    chrome.runtime.sendMessage({cmd:"addBookmark", data:doc},
        ( response )=>{
        /*if( response && response.ok )
            actionResult.innerText =  "add success!";
        else if( response && !response.ok )
            actionResult.innerText = "add faild!err=" + response.msg  ;
        else
            actionResult.innerText = "add faild!"  ;*/
    })
    //chrome.extension.getBackgroundPage()此方法 获取不到BackgroundPage中定义的变量和方法
    /*
    var bg = chrome.extension.getBackgroundPage(); //window
    console.log( bg.testBGvar )
    bg.savePub( doc, ( err, newDoc)=>{
        if( err )
            alert( data.title +"添加失败" );
        else
            alert( data.title +"添加成功" )
    });

     */
}
function addBookmarkPrivate() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var doc = makeDoc( activeTab )
        chrome.runtime.sendMessage({cmd:"addBookmarkPrivate", data:doc} )
        //chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, doAddBookmarkPrivate );
    });


}

function doAddBookmarkPrivate( data ) {
    //获得doc
    var doc= data
    var bg = chrome.extension.getBackgroundPage();
    bg.savePrv( doc, ( err, newDoc)=>{
        if( err )
            { console.log ( data.title +"添加失败" ); }
        else
            { console.log ( data.title + "添加成功" ); }
    });
}

function browserlist( e ){
    e.preventDefault();
    chrome.tabs.create({'url': ext.extension.getURL('browserlist.html')});
}

var eaddBookmark = document.getElementById("addBookmark")
eaddBookmark.addEventListener( "click" , addBookmark )
var eaddBookmarkPrivate = document.getElementById("addBookmarkPrivate")
eaddBookmarkPrivate.addEventListener( "click" , addBookmarkPrivate )
var ebrowserlist = document.getElementById("browserlist")
ebrowserlist.addEventListener( "click" , browserlist )
/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBookmark);
});

 */

chrome.runtime.onMessage.addListener((req, sender, sendResponse ) => {
    if( isBackground(sender) ) {
        if (req && req.cmd == "addBookmark") {
            if (req.ok)
                { actionResult.innerText = "add success!"; }
            else
                { actionResult.innerText = "add faild!err=" + req.msg; }
        } else if (req && req.cmd == "addBookmarkPrivate") {

        } else
            { actionResult.innerText = "add faild!"; }
    }

})

//origin: "chrome-extension://plhdgkjnbdnfniiimfohclldnddafgaj"
function getExtensionId(){
    //return origin.substr( "chrome-extension://".length)
    return chrome.runtime.id;
}

function isBackground( sender ){
    if( !sender )
        { return false }
    return sender.url.indexOf("background_page.html") > -1 ;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2hyb21lL3BvcHVwLmpzIl0sIm5hbWVzIjpbImxldCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0EsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0FBRTFELFNBQVMsV0FBVyxHQUFHO0lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUUsU0FBUyxJQUFJLEVBQUU7UUFDbEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLGFBQWEsRUFBRSxTQUFTLENBQUM7O0tBRTVCLENBQUMsQ0FBQztDQUNOOztBQUVELFNBQVMsT0FBTyxFQUFFLEdB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SUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRTtZQUNqQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2tCQUNOLFlBQVksQ0FBQyxTQUFTLEdBQUcsY0FBYyxHQUFDOztrQkFFeEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFDO1NBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxvQkFBb0IsRUFBRTs7U0FFbEQ7Y0FDRyxZQUFZLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBQztLQUM3Qzs7Q0FFSixDQUFDOzs7QUFHRixTQUFTLGNBQWMsRUFBRTs7SUFFckIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztDQUM1Qjs7QUFFRCxTQUFTLFlBQVksRUFBRSxNQUFNLEVBQUU7SUFDM0IsSUFBSSxDQUFDLE1BQU07VUFDUCxPQUFPLE9BQUs7SUFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFIiwiZmlsZSI6InBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jaHJvbWUvcG9wdXAuanNcIik7XG4iLCJcclxudmFyIGFjdGlvblJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aW9uUmVzdWx0XCIpXHJcblxyXG5mdW5jdGlvbiBhZGRCb29rbWFyaygpIHtcclxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbih0YWJzKSB7XHJcbiAgICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XHJcbiAgICAgICAgZG9BZGRCb29rbWFyayggYWN0aXZlVGFiKVxyXG4gICAgICAgIC8vY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3Byb2Nlc3MtcGFnZScgfSwgZG9BZGRCb29rbWFyayApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VEb2MoIHRhYiApe1xyXG4gICAgbGV0IGRvYyA9IHt9O1xyXG4gICAgZG9jLnVybCA9IHRhYi51cmw7XHJcbiAgICBkb2MudGl0bGUgPSB0YWIudGl0bGU7XHJcbiAgICBkb2MuZGVzY3JpcHRpb24gPSBcIlwiICAgIC8vdGFiLmRlc2NyaXB0aW9uO1xyXG4gICAgZG9jLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgZG9jLmZhdkljb25Vcmw9IHRhYi5mYXZJY29uVXJsOyAvL1wiaHR0cHM6Ly93d3cuYmFpZHUuY29tL2Zhdmljb24uaWNvXCJcclxuICAgIHJldHVybiBkb2M7XHJcbn1cclxuZnVuY3Rpb24gZG9BZGRCb29rbWFyayggdGFiICkge1xyXG4gICAgLy/ojrflvpdkb2NcclxuICAgIGxldCBkb2MgPSBtYWtlRG9jKCB0YWIgKVxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe2NtZDpcImFkZEJvb2ttYXJrXCIsIGRhdGE6ZG9jfSxcclxuICAgICAgICAoIHJlc3BvbnNlICk9PntcclxuICAgICAgICAvKmlmKCByZXNwb25zZSAmJiByZXNwb25zZS5vayApXHJcbiAgICAgICAgICAgIGFjdGlvblJlc3VsdC5pbm5lclRleHQgPSAgXCJhZGQgc3VjY2VzcyFcIjtcclxuICAgICAgICBlbHNlIGlmKCByZXNwb25zZSAmJiAhcmVzcG9uc2Uub2sgKVxyXG4gICAgICAgICAgICBhY3Rpb25SZXN1bHQuaW5uZXJUZXh0ID0gXCJhZGQgZmFpbGQhZXJyPVwiICsgcmVzcG9uc2UubXNnICA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhY3Rpb25SZXN1bHQuaW5uZXJUZXh0ID0gXCJhZGQgZmFpbGQhXCIgIDsqL1xyXG4gICAgfSlcclxuICAgIC8vY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgp5q2k5pa55rOVIOiOt+WPluS4jeWIsEJhY2tncm91bmRQYWdl5Lit5a6a5LmJ55qE5Y+Y6YeP5ZKM5pa55rOVXHJcbiAgICAvKlxyXG4gICAgdmFyIGJnID0gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpOyAvL3dpbmRvd1xyXG4gICAgY29uc29sZS5sb2coIGJnLnRlc3RCR3ZhciApXHJcbiAgICBiZy5zYXZlUHViKCBkb2MsICggZXJyLCBuZXdEb2MpPT57XHJcbiAgICAgICAgaWYoIGVyciApXHJcbiAgICAgICAgICAgIGFsZXJ0KCBkYXRhLnRpdGxlICtcIua3u+WKoOWksei0pVwiICk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhbGVydCggZGF0YS50aXRsZSArXCLmt7vliqDmiJDlip9cIiApXHJcbiAgICB9KTtcclxuXHJcbiAgICAgKi9cclxufVxyXG5mdW5jdGlvbiBhZGRCb29rbWFya1ByaXZhdGUoKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xyXG4gICAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xyXG4gICAgICAgIGxldCBkb2MgPSBtYWtlRG9jKCBhY3RpdmVUYWIgKVxyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtjbWQ6XCJhZGRCb29rbWFya1ByaXZhdGVcIiwgZGF0YTpkb2N9IClcclxuICAgICAgICAvL2Nocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdwcm9jZXNzLXBhZ2UnIH0sIGRvQWRkQm9va21hcmtQcml2YXRlICk7XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkb0FkZEJvb2ttYXJrUHJpdmF0ZSggZGF0YSApIHtcclxuICAgIC8v6I635b6XZG9jXHJcbiAgICBsZXQgZG9jPSBkYXRhXHJcbiAgICB2YXIgYmcgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XHJcbiAgICBiZy5zYXZlUHJ2KCBkb2MsICggZXJyLCBuZXdEb2MpPT57XHJcbiAgICAgICAgaWYoIGVyciApXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nICggZGF0YS50aXRsZSArXCLmt7vliqDlpLHotKVcIiApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS5sb2cgKCBkYXRhLnRpdGxlICsgXCLmt7vliqDmiJDlip9cIiApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJyb3dzZXJsaXN0KCBlICl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyd1cmwnOiBleHQuZXh0ZW5zaW9uLmdldFVSTCgnYnJvd3Nlcmxpc3QuaHRtbCcpfSk7XHJcbn1cclxuXHJcbmxldCBlYWRkQm9va21hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZEJvb2ttYXJrXCIpXHJcbmVhZGRCb29rbWFyay5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCBhZGRCb29rbWFyayApXHJcbmxldCBlYWRkQm9va21hcmtQcml2YXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRCb29rbWFya1ByaXZhdGVcIilcclxuZWFkZEJvb2ttYXJrUHJpdmF0ZS5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIgLCBhZGRCb29rbWFya1ByaXZhdGUgKVxyXG5sZXQgZWJyb3dzZXJsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJicm93c2VybGlzdFwiKVxyXG5lYnJvd3Nlcmxpc3QuYWRkRXZlbnRMaXN0ZW5lciggXCJjbGlja1wiICwgYnJvd3Nlcmxpc3QgKVxyXG4vKlxyXG5jaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xyXG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XHJcbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAncHJvY2Vzcy1wYWdlJyB9LCByZW5kZXJCb29rbWFyayk7XHJcbn0pO1xyXG5cclxuICovXHJcblxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UgKSA9PiB7XHJcbiAgICBpZiggaXNCYWNrZ3JvdW5kKHNlbmRlcikgKSB7XHJcbiAgICAgICAgaWYgKHJlcSAmJiByZXEuY21kID09IFwiYWRkQm9va21hcmtcIikge1xyXG4gICAgICAgICAgICBpZiAocmVxLm9rKVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uUmVzdWx0LmlubmVyVGV4dCA9IFwiYWRkIHN1Y2Nlc3MhXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGFjdGlvblJlc3VsdC5pbm5lclRleHQgPSBcImFkZCBmYWlsZCFlcnI9XCIgKyByZXEubXNnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVxICYmIHJlcS5jbWQgPT0gXCJhZGRCb29rbWFya1ByaXZhdGVcIikge1xyXG5cclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgYWN0aW9uUmVzdWx0LmlubmVyVGV4dCA9IFwiYWRkIGZhaWxkIVwiO1xyXG4gICAgfVxyXG5cclxufSlcclxuXHJcbi8vb3JpZ2luOiBcImNocm9tZS1leHRlbnNpb246Ly9wbGhkZ2tqbmJkbmZuaWlpbWZvaGNsbGRuZGRhZmdhalwiXHJcbmZ1bmN0aW9uIGdldEV4dGVuc2lvbklkKCl7XHJcbiAgICAvL3JldHVybiBvcmlnaW4uc3Vic3RyKCBcImNocm9tZS1leHRlbnNpb246Ly9cIi5sZW5ndGgpXHJcbiAgICByZXR1cm4gY2hyb21lLnJ1bnRpbWUuaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQmFja2dyb3VuZCggc2VuZGVyICl7XHJcbiAgICBpZiggIXNlbmRlciApXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gc2VuZGVyLnVybC5pbmRleE9mKFwiYmFja2dyb3VuZF9wYWdlLmh0bWxcIikgPiAtMSA7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9