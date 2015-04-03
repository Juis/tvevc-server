Template.programs.rendered = function(){ }

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