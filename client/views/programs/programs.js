Template.programs.rendered = function(){

 $('.modal-trigger').leanModal();

}

Template.programList.helpers({
	'programs': function(){
    	return Program.find({status: 1});
	}
});