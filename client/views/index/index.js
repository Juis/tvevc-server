Template.index.rendered = function(){

	$('.collection').collapsible({
      accordion : false
  	});

     $('.modal-trigger').leanModal();
}

Template.index.helpers({
	'contents': function(){
    	return Content.find({}).map(
    		function(a) {
    			return {
    				_id:a._id, 
    				text:a.text, 
    				img:a.img,
    				user_name:User.find({_id:a.user_id}).map(
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