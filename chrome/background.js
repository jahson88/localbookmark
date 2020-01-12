
import { savePub, savePrv, getPublicCount, getPrivateCount, getPublicList, getPrivateList, delPrivate,delPub, regUser,initUserpasswd } from './savedoc'
var Promise = require('bluebird')
const crypto = require('crypto');
//let str = 'abcd';
//const password = 'FnJL7EDzjqWjcaY9';
const iv = 'unJL7EDz1qW3caY9';


let userpasswd = {}
let logined = false

initUser()




// 加密
function crypMessage( msg, password,iv ){
    const cipher = crypto.createCipheriv('aes-128-cbc', password, iv);
    let crypted = cipher.update(msg,'utf8', 'hex')
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
}


// 解密
function decrypMessage( data, password,iv ) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', password, iv);
    let decryptpted  = decipher.update(data, 'hex', 'utf8')
    decryptpted += decipher.final().toString();
    console.log(decryptpted);
    return decryptpted;
}


function md5( str ){
    return crypto.createHash('md5').update(str).digest('hex');
}

function initUser( res ){
    if( !userpasswd || !userpasswd.name ){
        initUserpasswd( (err, data )=> {
            if( err )
                return
            userpasswd = data;
            if( res )
                res(data)
        } )
    }else
        if( res )
            res( userpasswd )
}

function login( user, passwd ) {
    if( userpasswd == {} )
        return [false, "not register!"]
    if( userpasswd.name == user && userpasswd.password == md5( passwd ) )
        logined = true;
    return logined
}

var testBGvar = "this is bground!!!!!!";

/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log('
        我被执行了！');
    }
)
*/
chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    if (request && request.cmd) {
        // do something ...
    }
});

chrome.runtime.onConnect.addListener(port => {
    let tab
    let name
    if (isNumeric(port.name)) {
        tab = port.name
        name = 'devtools'
        //installProxy(+port.name)
    } else {
        tab = port.sender.tab.id
        name = 'backend'
    }

})

function isNumeric (str) {
    return +str + '' === str
}


chrome.runtime.onMessage.addListener((req, sender /* cb */ ) => {
    console.log( "chrome.runtime.onMessage.addListener  req=" + req +"]     \nsender=" + sender )
    if( !req.cmd ) {
        console.log(  "chrome.runtime.onMessage.addListener  cmd=null" )
        return;
    }
    if( req.cmd == "inituser"){
        initUser( (data)=>{
            if( data && data["name" ])
                chrome.runtime.sendMessage({cmd:"inituser",  ok: true, data:data })
            else
                chrome.runtime.sendMessage({cmd:"inituser",  ok: false, msg:"no user!" })
        } );
        return;
    }
    if( req.cmd == "userlogin"){
        let errormsg = []
        if( req.data.name != userpasswd.name )
            errormsg.push( "用户名错误！" )
        if( req.data.passwd != userpasswd.passwd )
            errormsg.push( "密码错误！" )
        if( errormsg.length> 0 ){
            chrome.runtime.sendMessage({cmd:"inituser",  ok: false, msg: errormsg.join(" ") })
            return;
        }
        chrome.runtime.sendMessage({cmd:"userlogin",  ok: true, data:userpasswd })
        return;
    }
    if( req.cmd == "reguser"){
        let passwd = md5( req.data.passwd )
        regUser( req.data.name, passwd, req.data.isAutoLogin,(err, data )=>{
            if( err )
                chrome.runtime.sendMessage({cmd:"reguser",  ok: false, msg:err })
            else{
                userpasswd = data
                chrome.runtime.sendMessage({cmd:"reguser",  ok: true, data:data })
            }
        })
        return;
    }
    if( req.cmd == "addBookmark" ){
        console.log("runtime.onMessage.addListener  req.cmd=" +  req.cmd )
        savePub( req.data, ( err, newd ) => {
            if( err )
                chrome.runtime.sendMessage({cmd:"addBookmark",  ok: false, msg:" save faild!! " + err })
            else
                chrome.runtime.sendMessage({cmd:"addBookmark",  ok: true })
        })
        return;
    }
    if( req.cmd == "addBookmarkPrivate" ){
        console.log("runtime.onMessage.addListener  req.cmd=" +  req.cmd )
        //文档相似性检测，后面做
        let docstr = JSON.stringify( req.data )
        let digest = md5( docstr )
        ////aes 加密使用16个字符长度，加密内容，只选择密码的前16位; aes-256-cbc 可支持密码32位字符
        let doc = crypMessage( docstr, userpasswd.password.substr( 0, 16 ), userpasswd.iv )

        savePrv( {digest: digest, doc: doc }, ( err, newd ) => {
            if( err )
                chrome.runtime.sendMessage({cmd:"addBookmarkPrivate",ok: false, msg:" save faild!! " + err})
            else
                chrome.runtime.sendMessage({cmd:"addBookmarkPrivate", ok: true })
        })
        return;
    }

    if( req.cmd == "getPublicCount" ){
        console.log("runtime.onMessage.addListener  req.cmd=" +  req.cmd )
        getPublicCount( ( err, count ) => {
            if( err )
                chrome.runtime.sendMessage({cmd:"getPublicCount", ok: false, msg:"getPublicCount faild!! " + err })
            else
                chrome.runtime.sendMessage({cmd:"getPublicCount",  ok: true, data:{ count: count} })
        })
        return;
    }

    if( req.cmd == "getPrivateCount" ){
        console.log("runtime.onMessage.addListener  req.cmd=" +  req.cmd )
        getPrivateCount(( err, count ) => {
            if( err )
                chrome.runtime.sendMessage({cmd:"getPrivateCount", ok: false, msg:"getPrivateCount faild!! " + err})
            else
                chrome.runtime.sendMessage({cmd:"getPrivateCount", ok: true, data:{ count: count } })
        })
        return;
    }

    if( req.cmd == "getPublicList" ){
        console.log("runtime.onMessage.addListener  req.cmd=" +  req.cmd )
        getPublicList( req.data.pageNum, req.data.sizeofpage, ( err, res ) => {
            if( err )
                chrome.runtime.sendMessage({cmd:"getPublicList", ok: false, msg:"getPublicList faild!! " + err })
            else
                chrome.runtime.sendMessage({cmd:"getPublicList", ok: true, data: res })
        })
        return;
    }
    if( req.cmd == "getPrivateList" ){
        console.log("runtime.onMessage.addListener  req.cmd=" +  req.cmd )
        getPrivateList( req.data.pageNum, req.data.sizeofpage, ( err, res ) => {
            if( err )
                chrome.runtime.sendMessage({cmd:"getPrivateList", ok: false, msg:"getPublicList faild!! " + err })
            else {
                var prvlist = []
                for( var r in res ){  // r is number index
                    if( res[r]._id == 1 )
                        continue
                    var docstr = decrypMessage( res[r].doc, userpasswd.password.substr(0,16), userpasswd.iv )
                    var doc = JSON.parse( docstr )
                    doc["_id"] = res[r]._id;
                    prvlist.push( doc )
                }
                chrome.runtime.sendMessage({cmd: "getPrivateList", ok: true, data: prvlist })
            }
        })
        return;
    }

    if( req.cmd == "delPubDoc" ){
        delPub( req.data.id, (err, num )=>{
            if( err )
                chrome.runtime.sendMessage({cmd:"delPubDoc",  ok: false, msg:"delPubDoc faild!! " + err })
            else
                chrome.runtime.sendMessage({cmd:"delPubDoc",  ok: true,  data:{id:req.data.id, res: num } })
        })
        return;
    }

    if( req.cmd == "delPrivateDoc" ){
        delPrivate( req.data.id, (err, num )=>{
            if( err )
                chrome.runtime.sendMessage({cmd:"delPrivateDoc", ok: false, msg:"delPrivate faild!! " + err })
            else
                chrome.runtime.sendMessage({cmd:"delPrivateDoc",  ok: true, data:{ id:req.data.id, res: num} })
        })
        return;
    }
    /*
    if (sender.tab && req.vueDetected) {
        const suffix = req.nuxtDetected ? '.nuxt' : ''

        chrome.browserAction.setIcon({
            tabId: sender.tab.id,
            path: {
                16: `icons/16${suffix}.png`,
                48: `icons/48${suffix}.png`,
                128: `icons/128${suffix}.png`
            }
        })
        chrome.browserAction.setPopup({
            tabId: sender.tab.id,
            //popup: req.devtoolsEnabled ? `popups/enabled${suffix}.html` : `popups/disabled${suffix}.html`
        })
    }*/
})

// Right-click inspect context menu entry
/*let activeTabId
chrome.tabs.onActivated.addListener(({ tabId }) => {
    activeTabId = tabId
    updateContextMenuItem()
})

function updateContextMenuItem () {
    chrome.contextMenus.removeAll(() => {
        if (ports[activeTabId]) {
            chrome.contextMenus.create({
                id: 'vue-inspect-instance',
                title: 'Inspect Vue component',
                contexts: ['all']
            })
        }
    })
}*/

/*
chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.runtime.sendMessage({
        vueContextMenu: {
            id: info.menuItemId
        }
    })
})
 */