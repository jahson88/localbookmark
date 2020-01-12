
const crypto = require('crypto');
var Promise = require('bluebird')
var Datastore = require('nedb')
let db = {};


function init(){

    db.publicDoc = new Datastore('./pubdoc.db');
    db.privateDoc = new Datastore('./prvdoc.db');
    //db.userpassDoc = new Datastore('./userpass.db');

// You need to load each database (here we do it asynchronously)
    db.publicDoc.loadDatabase();
    db.privateDoc.loadDatabase();
    //db.userpassDoc.loadDatabase();
}

//aes iv 默认长度是16,否则报错Uncaught TypeError: invalid iv length 32
function createCryptoIV(){
    let randomBytes = Promise.promisify( crypto.randomBytes )
    randomBytes(8).then( function( buf){
        var token = buf.toString('hex').toUpperCase();
        console.log(token);
    }).catch( (e) =>{ console.log(e) } );
}

function regUser( user, passwd,isAutoLogin, cb ){
    let randomBytes = Promise.promisify( crypto.randomBytes )
    randomBytes(8)
        .then( function(data){
        var token = data.toString('hex').toUpperCase();
        console.log(token);
        //var insertUser = Promise.promisify( db.privateDoc.insert )
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
        return insertUser( {_id:'1', name:user, password:passwd, iv:token, isAutoLogin:isAutoLogin  } );
    }).then( function( data ){
        cb( null, data )
    }).catch( (err )=> cb( err ))
    //db.privateDoc.insert( {name:user, password:passwd, iv:iv}, cb )
}

function initUserpasswd( cb ){
    //var findOne = Promise.promisify( db.privateDoc.findOne )  //出错
    findOneAsync( { _id: "1"})
        .then( (data)=>cb( null, data))
        .catch( (err)=>cb( err ) )
}

function findOneAsync( data ){
    return new Promise( function( resolve, reject ){
        db.privateDoc.findOne( data, (err, res )=>{
            if( err )
                reject( err )
            else
                resolve( res )
        } )
    })
}


/*
var doc = { hello: 'world'
        , n: 5
        , today: new Date()
        , nedbIsAwesome: true
        , notthere: null
        , notToBeSaved: undefined  // Will not be saved
        , fruits: [ 'apple', 'orange', 'pear' ]
        , infos: { name: 'nedb' }
    };


 function (err, newDoc) {   // Callback is optional
            if (err)
                return;
            return newDoc;
        }
 */
function savePub( doc,  cb ){
    let ds = db.publicDoc;
    ds.findOne({ "url" : doc.url }, ( err, docs )=>{
        if( err )
            return cb( err );
        if( !docs )
            ds.insert(doc, cb );
        else
            //ds.update( )
            return cb( false, docs );
    } )

}


function savePrv( doc,  cb ){
    let ds = db.privateDoc;
    ds.findOne({ "digest" : doc.digest }, ( err, docs )=>{
        if( err )
            return cb( err );
        if( !docs )
            ds.insert( doc, cb );
        else
            //ds.update( )
            return cb( false, docs );
    } )

}

function delPub( id, cb ){
    db.publicDoc.remove( {_id: id} ,{}, cb )
}

function delPrivate( id, cb ){
    db.privateDoc.remove( {_id: id} , {}, cb )
}

function getPublicCount( cb ){
    db.publicDoc.count({  }, cb )
}
function getPrivateCount( cb ){
    db.privateDoc.count({  }, cb )
}

function findPubbyURL( url, cb ){
    db.publicDoc.findOne({ "url" : url }, cb )
}

function findPrivatebyURL( url, cb ){
    db.privateDoc.findOne({ "url" : url }, cb )
}

function getPublicList( pageNum, sizeofpage, cb ){
    db.publicDoc.find({}).sort({ planet: 1 }).skip( sizeofpage*(pageNum-1) ).limit( sizeofpage ).exec( cb)
}

function getPrivateList( pageNum, sizeofpage, cb ){
    db.privateDoc.find({}).sort({ planet: 1 }).skip( sizeofpage*(pageNum-1)  ).limit( sizeofpage ).exec( cb )
}






function md5( str ){
    return crypto.createHash('md5').update(str).digest('hex');
}






init()

module.exports = {
    savePub: savePub,
    savePrv: savePrv,
    getPublicCount : getPublicCount,
    getPrivateCount: getPrivateCount,
    getPublicList: getPublicList,
    getPrivateList: getPrivateList,
    delPub:    delPub,
    delPrivate: delPrivate,
    findPubbyURL: findPubbyURL,
    findPrivatebyURL: findPrivatebyURL,
    initUserpasswd:initUserpasswd,
    regUser: regUser
}