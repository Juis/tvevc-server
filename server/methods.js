/*
  111 => Dados vindo do formulario, sempre colocar no inicio do array data no cliente
*/
Meteor.methods({

  /*'dataKey': function(){
    return ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
  },*/

  'dateNow': function(){
    var dateObj = new Date();
    return dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
  },

  'validateProgram': function(data){
    if((data[0] === 222 && data[2] === '' || data[3] === '' || data[5] === 'undefined') || (data[0] === 111 && data[1] === '' || data[2] === '' || data[4] === 'undefined')){
      return false;//Meteor.throwError('Preencha os campos obrigatórios.');
    }else{
      return true;
    }
  },

// PROGRAM
  'insertProgram': function(data){
    if(data[0] === 111 && Meteor.call('validateProgram', data)){
        Program.insert({status:1, category_id:data[1], name:data[2], description:data[3], img:data[4], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
    }else{
      //erro aqui
    }
  },

  'updateProgram': function(data){
    if(data[0] === 222 && Meteor.call('validateProgram', data)){
        Program.update({_id:data[1]},{$set: {category_id:data[2], name:data[3], description:data[4], img:data[5], user_change:1, date_change:Meteor.call('dateNow')}});
    }else{
      //erro aqui
    }
  },

  'deleteProgram': function(data){
    if(data[0] === 333){
      var polls = answers = '';
      polls = Poll.find({program_id:data[1]}).map(function(a) {return [a._id]; });

      if(polls){

        for(var p in polls){
          answers = Answer.find({poll_id:polls[p][0]}).map(function(a) {return [a._id]; });
          if(answers){

            for(var a in answers){
              Answer.remove({_id:answers[a][0]});
            }
          }

          Poll.remove({_id:polls[p][0]});
        }
      }

      Program.remove({_id:data[1]});
    }
  },

// ANSWER
  'insertAnswer': function(data){
    if(data[0] === 111 && data[1] !== ''){
      return Answer.insert({status:1, poll_id:'undefined', description:data[1], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
    }else{
      //erro aqui
    }
  },

// POLL
  'insertPoll': function(data){
    if(data[0] === 111 && data[1] !== ''){
      var pollId = Poll.insert({status:1, program_id:data[1], description:data[2], img:data[4], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
      Answer.update({_id: { $in:data[3] }}, {$set: {poll_id:pollId}}, {multi:true});
    }else{
      //erro aqui
    }
  },

  'updatePoll': function(data){
    if(data[0] === 222 && data[1] !== ''){
      Poll.update({_id:data[1]},{$set: {program_id:data[2], description:data[3], img:data[4], img:data[5], user_change:1, date_change:Meteor.call('dateNow')}});
    }else{
      //erro aqui
    }
  },

  'deletePoll': function(data){
    if(data[0] === 333){
      answers = Answer.find({poll_id:data[1]}).map(function(a) {return [a._id]; });
      if(answers){

        for(var a in answers){
          Answer.remove({_id:answers[a][0]});
        }
      }

      Poll.remove({_id:data[1]});
    }
  },

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
  },
});