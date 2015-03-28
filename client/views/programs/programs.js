Template.programs.rendered = function(){

 //$('.modal-trigger').leanModal();
 /*console.log(this.data);
 if(Router.current().params.success){
	Session.set('getup__form__imgBase64', 'undefined');
	toast('Programa inserido com sucesso.', 4000, 'rounded');
 }*/
}

Template.programs.helpers({
	'programs': function(){
    	return Program.find({status: 1});
	}
});

Template.programs.events({
	'click #btnDelete': function(form){
		if(confirm('Deseja realmente remover o programa?')){
			Meteor.call('deleteProgram', [333, form.currentTarget.childNodes[1].value]);
		}
	}
});