Meteor.methods({

  'dataKey': function(){
    return ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
  },

  'dateNow': function(){
      var dateObj = new Date();
      return dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
  },

  'insertProgram': function(data){
    //if(dataKey() === data[0]){
      //if(data[1] === '' || data[2] === '' || data[4] === ''){
      //  Meteor.throwError('Preencha os campos obrigatórios.');
      //}else{
        var dateObj = new Date();
        var dateNow = dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
        Program.insert({status:1, category_id:data[1], name:data[2], description:data[3], logo:data[4], user_record:1, user_change:1, date_record:dateNow, date_change:dateNow});
      //}
    //}
  }
});