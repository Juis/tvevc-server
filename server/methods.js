Meteor.methods({

  'dataKey': function(){
    return ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
  },

  'insertProgram': function(form_categoryId, form_name){
    console.log(form_categoryId);
    console.log(form_name);
    console.log(((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase());
    //var a = Program.insert({status:1, user_record:1, user_change:1, date_record:new Date(), date_change:new Date(), category_id:form_categoryId, name:form_name});
    //var a = Program.insert({status:1, user_record:1, user_change:1, date_record:new Date(), date_change:new Date(), category_id:form_categoryId, name:form_name});
  }
});