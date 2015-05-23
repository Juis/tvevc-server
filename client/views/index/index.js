Meteor.setInterval(updateDateRecord, 1000 * 60);

Template.index.rendered = function(){
    var userSearch = User.findOne({_id:Meteor.userId2}, {$fields: {_id:1, level:1}});
    Session.set('getupDataUser', userSearch);
    Session.set('limit', 5);
    /*$(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          incrementLimit();
        }
    });*/

	$('.collection').collapsible({
      accordion : false
  	});

     $('.modal-trigger').leanModal();
}

Template.notify.destroyed = function() {
    Meteor.clearInterval();
};

Template.index.helpers({
    'qtUserCadastrado': function(){
        return User.find({status:1, level:'0'}).count();
    },

	'contents': function(){

		var dateRecords = [];
		var i = 0;
    	return Content.find({}, { limit: Session.get('limit') }).map(
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
                    status:c.status,
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
	},

    'mais': function(){
        return (Session.get('limit') >= Content.find().count())? 'display:none' : 'display:block';
    }
});

Template.index.events({
	'click #btnDelete': function(form){
		toastr.warning(
			"Deseja realmente remover a mensagem?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteContent', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
			'', 
			{
				"tapToDismiss": false, 
				"timeOut": 0, 
				"extendedTimeOut": 0
			}
		);
	},

    'click #mais': function(){
        incrementLimit();
    },

    'click #visualizeMensageHistory': function(form){
        if(Session.get('getupDataUser').level === '1'){
            Meteor.call('updateContentStatus', [222, form.currentTarget.childNodes[1].value]);
        }
    }
});