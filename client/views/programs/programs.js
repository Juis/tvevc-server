 Template.programs.rendered = function(){

 $('.modal-trigger').leanModal();

 }

Meteor.subscribe('programListarTudoAtivo');

Template.programList.helpers({
	'programs': function(){
    	return Program.find({status: 1});
	}
});