Template.programs.rendered = function(){ }

Template.programs.helpers({
	'programs': function(){
    	return Program.find({status: 1}).map(
    		function(p) {
    			return {
    				_id:p._id, 
    				name:p.name, 
    				img_avatar:p.img_avatar
    			}; 
    		}
		);
	}
});

Template.programs.events({
	'click #btnDelete': function(form){
		toastr.warning(
			"Deseja realmente remover o programa e todos os registros equivalente?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteProgram', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
			'', 
			{
				"tapToDismiss": false, 
				"timeOut": 0, 
				"extendedTimeOut": 0
			}
		);
	}
});