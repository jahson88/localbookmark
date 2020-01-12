# localbookmark 本地网络书签，使用过pocket书签，感觉不错，但是由于网络原因，有时很慢，所以想弄一个本地的书签。另外增加个人书签，加密存储，登录才能查看。

## Project setup
```
npm install
```

### Compiles for development
```
npm run dev:chrome
```

### Compiles and minifies for production
```
npm run build
```
#在此记录几个遇到的问题：
##1.chrome插件信息交互，popup.js、background.js、content.js、插件主页之间的交互，通用方法是
》发送消息chrome.runtime.sendMessage
》监听处理消息chrome.runtime.onMessage.addListener
在popup与background交互时，有帖子说采用chrome.extension.getBackgroundPage()可以直接获得background中的方法和变量，但是我测试失败，所以采用了通用的方法
在popup页sendMessage时，本想发送给background，但是插件主页收到了消息，所以才处理消息是判断了消息发送方。

##2.使用bluebird的Promise编写同步方法。
Promise.promisify可以很方便的将（params, callback）2个参数的函数转化为promise函数 例如Promise.promisify( crypto.randomBytes )
但是其他参数形式，需要些封装函数，例如：
var insertUser = function( doc){
    return new Promise( function( resolve, reject ){
        db.privateDoc.insert( doc, (err, res )=>{
            if( err )
                reject( err )
            else
                resolve( res )
        } )
    })
}

##3.使用crypto加解密
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

##4 使用nedb存储数据，采用文件存储，但是才chrome中运行，存储读取功能正常，但是为查到数据文件存在哪？

##5 待完善功能： （1）加密后的记录，如何查重复，这里采用了md5摘要，后续找专业方法，比如文件一致性比较
（2）导入导出功能



# 参考文档
See [Configuration Reference](https://cli.vuejs.org/config/).
See [AES加解密算法的模式介绍](https://blog.csdn.net/searchsun/article/details/2516191).
See [node.js的Promise库-bluebird示例](https://www.cnblogs.com/think8848/p/6591238.html).
See [Mozilla WebExtension APIs说明，部分与chrome API兼容](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Examples).