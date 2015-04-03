 Template.poll.rendered = function(){

 //$('.modal-trigger').leanModal();

 }

 Template.poll.helpers({
	'polls': function(){
    	return Poll.find({status: 1});
	}
});