Meteor.setInterval(updateDateRecord, 1000 * 60);

Template.index.rendered = function(){

	$('.collection').collapsible({
      accordion : false
  	});

     $('.modal-trigger').leanModal();
}

Template.notify.destroyed = function() {
    Meteor.clearInterval();
};

Template.index.helpers({
	'contents': function(){
		var dateRecords = [];
		var i = 0;
    	return Content.find({}).map(
    		function(c) {
    			dateRecords[i] = {
    				_id:c._id, 
    				date_record:c.date_record
    			};
    			Session.set('getupDateRecods', dateRecords);
    			i++;

    			Meteor.call(
    				'timeCompare', 
    				c.date_record, 
    				function(error, result){
    					Session.set('getupToolTimeCompare' + c._id, result);
    				}
				);

    			return {
    				_id:c._id, 
    				text:c.text, 
    				img:c.img,
    				timeCompared:Session.get('getupToolTimeCompare' + c._id),
    				user_name:User.find({_id:c.user_id}).map(
    					function(u){
    						return u.name;
						}
					)
    			}; 
    		}
		);
	}
});

Template.index.events({
	'click #btnDelete': function(form){
		console.log(form.currentTarget.childNodes[1].value);
		toastr.warning(
			"Deseja realmente remover a mensagem?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteContent', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
			'', 
			{
				"tapToDismiss": false, 
				"timeOut": 0, 
				"extendedTimeOut": 0
			}
		);
	}
});