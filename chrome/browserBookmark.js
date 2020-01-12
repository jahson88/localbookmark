
let isreged = false;
let isUserLogined = false;



function initPageAction(){
    //let loginuserdiv = document.getElementById("loginuserdiv")
    //let reguserdiv = document.getElementById("reguserdiv")
    let exportBookmark = document.getElementById("exportBookmark")
    let importBookmark = document.getElementById("importBookmark")
    let userlogin = document.getElementById("userlogin")
    let userlogout = document.getElementById("userlogout")

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
        let name = $("#reguserdiv #userName").val();
        let passwd = $("#reguserdiv #passwd").val();
        let passwd2 = $("#reguserdiv #passwd2").val();
        let isAuto = $("#reguserdiv #isauto").val();
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
    let pubCount = document.getElementById("pubCount");
    let privateCount = document.getElementById("privateCount");


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

let publicBookmarkPanel = document.getElementById("publicBookmark")
let privateBookmarkPanel = document.getElementById("privateBookmark")

chrome.runtime.onMessage.addListener((req, sender, sendResponse ) => {

    if( isBackground( sender ) ){
        if( req.cmd == "inituser"){
            if( req.ok ){
                if( req.data == "" || !req.data.name )
                    isreged = false;
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
                pubCount.innerText = req.data.count;
            return;
        }

        if( req.cmd=="getPrivateCount"){
            if( req.ok )
                privateCount.innerText = req.data.count-1;
            return;
        }
        if( req.cmd=="getPublicList"){
            if( req.ok ) {
                html = ['<ol id="js-list" class="list">']
                let res = req.data;
                for (var i = 0; i < res.length; i++)
                    html.push( compile( res[i]) )
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
                let res = req.data;
                for (var i = 0; i < res.length; i++)
                    html.push( compile( res[i]) )
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
                    $(docPanel).remove();
            }
            return;
        }
        if( req.cmd == "delPrivateDoc" ){
            if( req.ok ) {
                var docPanel = $("li[data-id=" + req.data.id + "]")
                if( docPanel )
                    $(docPanel).remove();
            }
            return;
        }
    }

})

let template = document.getElementById("itemtemplate")
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
        return false
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