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
    if(data[1] === '' || data[2] === '' || data[4] === 'undefined'){
      return false;//Meteor.throwError('Preencha os campos obrigatórios.');
    }else{
      return true;
    }
  },

  'insertProgram': function(data){
    if(data[0] === 111 && Meteor.call('validateProgram', data)){
        Program.insert({status:1, category_id:data[1], name:data[2], description:data[3], logo:data[4], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
    }else{
      //erro aqui
    }
  }
});