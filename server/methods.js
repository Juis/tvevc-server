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
      Program.remove({_id:data[1]});
    }
  },

// ANSWER
  'insertAnswer': function(data){
    if(data[0] === 111 && data[1] !== ''){
      return Answer.insert({status:1, description:data[1], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
    }else{
      //erro aqui
    }
  },
});