Template.programs.rendered = function(){

 $('.modal-trigger').leanModal();

}

Template.programList.helpers({
	'programs': function(){
    	return Program.find({status: 1});
	}
});

Template.programList.events({
	'click a[delete]': function(form){
		if(confirm('Deseja realmente remover o programa?')){
			Meteor.call('deleteProgram', [333, form.currentTarget.childNodes[1].value]);
		}
	}
});