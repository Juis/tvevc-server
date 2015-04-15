Template.notifyUpdate.rendered = function(){
	var notify_id = Router.current().params._id;
	if(notify_id !== null){
		document.querySelector("#notify_id").value = this.data.collection._docs['_map'][notify_id]['_id'];//programSearch[0]['_id'];
		document.querySelector("#notify_name").value = this.data.collection._docs['_map'][notify_id]['description'];//programSearch[0]['name'];
		document.querySelector("#notify_date_start").value = this.data.collection._docs['_map'][notify_id]['date_begin'];//programSearch[0]['description'];
		document.querySelector("#notify_date_end").value = this.data.collection._docs['_map'][notify_id]['date_end'];//programSearch[0]['description'];
	}
}

Template.notifyUpdate.events({
	'submit #notifyForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || form.target[2].value === '' || form.target[3].value === ''){
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			Meteor.call('updateNotify', [222, form.target[0].value, form.target[1].value, form.target[2].value, form.target[3].value]);
			toastr.success("Notificacao atualizada com sucesso.", '', {"progressBar": true});
		}
	},

	"change input[type='file']": function(event,template){
	    var files = event.target.files;
	    if(files.length === 0){
	      return;
	    }
	    var file = files[0];
	    if(file.size > (3*100000)){
	    	toastr.warning("A logomarca ultrapassou o limite de 3mb.", '', {"progressBar": true});
	    }else{
		    var fileReader = new FileReader();
		    fileReader.onload = function(event){
		      Session.set('getupFormImgBase64', (event.target.result)? event.target.result : 'undefined');
		    };
		    fileReader.readAsDataURL(file);
		}
  	}
});