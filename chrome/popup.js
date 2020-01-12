
var actionResult = document.getElementById("actionResult")

function addBookmark() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        doAddBookmark( activeTab)
        //chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, doAddBookmark );
    });
}

function makeDoc( tab ){
    let doc = {};
    doc.url = tab.url;
    doc.title = tab.title;
    doc.description = ""    //tab.description;
    doc.content = "";
    doc.favIconUrl= tab.favIconUrl; //"https://www.baidu.com/favicon.ico"
    return doc;
}
function doAddBookmark( tab ) {
    //获得doc
    let doc = makeDoc( tab )
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
        let doc = makeDoc( activeTab )
        chrome.runtime.sendMessage({cmd:"addBookmarkPrivate", data:doc} )
        //chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, doAddBookmarkPrivate );
    });


}

function doAddBookmarkPrivate( data ) {
    //获得doc
    let doc= data
    var bg = chrome.extension.getBackgroundPage();
    bg.savePrv( doc, ( err, newDoc)=>{
        if( err )
            console.log ( data.title +"添加失败" );
        else
            console.log ( data.title + "添加成功" );
    });
}

function browserlist( e ){
    e.preventDefault();
    chrome.tabs.create({'url': ext.extension.getURL('browserlist.html')});
}

let eaddBookmark = document.getElementById("addBookmark")
eaddBookmark.addEventListener( "click" , addBookmark )
let eaddBookmarkPrivate = document.getElementById("addBookmarkPrivate")
eaddBookmarkPrivate.addEventListener( "click" , addBookmarkPrivate )
let ebrowserlist = document.getElementById("browserlist")
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
                actionResult.innerText = "add success!";
            else
                actionResult.innerText = "add faild!err=" + req.msg;
        } else if (req && req.cmd == "addBookmarkPrivate") {

        } else
            actionResult.innerText = "add faild!";
    }

})

//origin: "chrome-extension://plhdgkjnbdnfniiimfohclldnddafgaj"
function getExtensionId(){
    //return origin.substr( "chrome-extension://".length)
    return chrome.runtime.id;
}

function isBackground( sender ){
    if( !sender )
        return false
    return sender.url.indexOf("background_page.html") > -1 ;
}