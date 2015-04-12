Meteor.methods({

//Meteor.call("apiSearch",["program", "97f0ad9e24ca5e0408a269748dgetup"], function(error,result) { console.log(result.content); });
  'apiSearch': function(dataHttp){
    return Meteor.http.call("GET",  "http://alissonplus.meteor.com/collectionapi/"+dataHttp[0], {headers:{"x-auth-token":dataHttp[1]}});   
  },

//Meteor.call("apiSearchOne",["program", "97f0ad9e24ca5e0408a269748dgetup", "Wy4N3W2TsCaRp4pdB"], function(error,result) { console.log(result.content); });
  'apiSearchOne': function(dataHttp){
    return Meteor.http.call("GET",  "http://alissonplus.meteor.com/collectionapi/"+dataHttp[0]+"/"+dataHttp[2], {headers:{"x-auth-token":dataHttp[1]}});   
  },

//Meteor.call("apiInsert",["program", "97f0ad9e24ca5e0408a269748dgetup", {"status":1,"category_id":"7CuqyS2hCk9BgCMKK","name":"Programa Novo teste","description":"teste","img":"data:image/jpeg;base64,/9j/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdC…vn1lltJ12OgU58bO3eRKBYLqb2w63hD4CdkAgkEHiXTeMdJJaM08tiVfB9tQOIDTtZ9o/Dn//Z","user_record":1,"user_change":1,"date_record":"7/4/2015","date_change":"7/4/2015"}], function(error,result) { console.log(result); });
  'apiInsert': function(dataHttp){
    return Meteor.http.call("POST",  "http://alissonplus.meteor.com/collectionapi/"+dataHttp[0], {headers:{"x-auth-token":dataHttp[1]}, data:dataHttp[2]});   
  },

//Meteor.call("apiUpdateOne",["program", "97f0ad9e24ca5e0408a269748dgetup", {$set: {"name":"Programa atualizado"}}, "dmgcgmrJrdsPtCGez"], function(error,result) { console.log(result); });
  'apiUpdateOne': function(dataHttp){
    return Meteor.http.call("PUT",  "http://alissonplus.meteor.com/collectionapi/"+dataHttp[0]+"/"+dataHttp[3], {headers:{"x-auth-token":dataHttp[1]}, data:dataHttp[2]});   
  },

//Meteor.call("apiDeleteOne",["program", "97f0ad9e24ca5e0408a269748dgetup", "dmgcgmrJrdsPtCGez"], function(error,result) { console.log(result.content); });
  'apiDeleteOne': function(dataHttp){
    return Meteor.http.call("DELETE",  "http://alissonplus.meteor.com/collectionapi/"+dataHttp[0]+"/"+dataHttp[2], {headers:{"x-auth-token":dataHttp[1]}});   
  }
  
});