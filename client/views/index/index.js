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