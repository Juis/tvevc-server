Template.login.created = function () {
    //document.querySelector('body').classList.remove('snapjs-left');
};

Template.login.rendered = function () {
    //document.querySelector('.menu-content').style.transform = 'translate3d(0, 0, 0)';
    //document.querySelector('.menu-content').style.webkitTransform = "translate3d(0, 0, 0)";
    //document.querySelector('.new-password').style.display = 'none';
    //document.querySelector('.new-user').style.display = 'none';
};
Template.login.events({
    //'click #btn-register': function(){
    //    document.querySelector('.login').style.display = 'none';
    //    document.querySelector('.new-password').style.display = 'none';
    //    document.querySelector('.new-user').style.display = 'block';
    //},

    //'click #btn-password-recovery': function(){
    //    document.querySelector('.login').style.display = 'none';
    //    document.querySelector('.new-password').style.display = 'block';
    //    document.querySelector('.new-user').style.display = 'none';
    //},

	'submit #login-form' : function(event, template){
		event.preventDefault();
		var userId = User.findOne(
    		{
    			email:template.find('#login-email').value, 
    			password:CryptoJS.MD5(template.find('#login-password').value).toString()
    		},
            {$or: [{level: 1},{level: 2}]}
		);

		if(userId === undefined){
        	toastr.warning(
				"Ops, Login ou senha inválidos tente novamente.", 
				'', 
				{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
			);
		}else{
            Meteor.userLevel = userId.level;
			Meteor.userId2 = userId._id;
            //Meteor.setUserId(userId._id);
			Router.go('index');
		}
	},

    'click a.facebook': function(event) {
    	event.preventDefault();
        Meteor.loginWithFacebook({
        	
        }, function(err){
            if (err) {
            	toastr.warning(
					"Ops, Login ou senha inválidos tente novamente.", 
					'', 
					{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
				);
            }else{
            	var userId = User.findOne(
            		{
            			social_network_id:Meteor.userId(), 
            			social_network:1 // 1 => facebook, 2 => google
            		}
        		);

        		if(userId !== undefined){
        			Meteor.remote.setUserId(userId._id);
        			Router.go('list.programs');
        		}else{
                    var usersSearch = Meteor.users.findOne({_id:Meteor.userId()});

        			Meteor.remote.call(
        				'insertUser', 
        				[
        					111,
                            usersSearch.services.facebook.name,
                            usersSearch.services.facebook.email,
                            null,
                            '0',
                            null,
                            null,
                            1,
                            usersSearch._id,
                            usersSearch.services.facebook.picture
        				], 
        				function(error, result){
        					if(error){
				            	toastr.warning(
									"Ops, estamos melhorando o aplicativo, descupe o transtorno.", 
									'', 
									{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
								);
        					}else{
				            	toastr.success(
									"Aê, Seja bem vindo ao VTV.", 
									'', 
									{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
								);

				            	var userId = User.findOne(
				            		{
				            			social_network_id:Meteor.userId(), 
				            			social_network:1 // 1 => facebook, 2 => google
				            		}
				        		);

				            	Meteor.setUserId(userId._id);
				            	Router.go('list.programs');
        					}
        				}
    				);
        		}
            }
        });
    },

    'click a.google': function(event) {
    	event.preventDefault();
        Meteor.loginWithGoogle({}, function(err){
            if (err) {
            	toastr.warning(
					"Ops, Login ou senha inválidos tente novamente.", 
					'', 
					{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
				);
            }else{
            	var userId = User.findOne(
            		{
            			social_network_id:Meteor.userId(), 
            			social_network:2 // 1 => facebook, 2 => google
            		}
        		);

        		if(userId !== undefined){
        			Meteor.remote.setUserId(userId._id);
        			Router.go('list.programs');
        		}else{
                    var usersSearch = Meteor.users.findOne({_id:Meteor.userId()});

        			Meteor.remote.call(
        				'insertUser', 
        				[
        					111,
        					usersSearch.services.google.name,
        					usersSearch.services.google.email,
        					null,
        					'0',
                            null,
        					null,
        					2,
        					usersSearch._id,
                            usersSearch.services.google.picture
        				], 
        				function(error, result){
        					if(error){
				            	toastr.warning(
									"Ops, estamos efetuando manutenção no aplicativo, desculpe o transtorno.", 
									'', 
									{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
								);
        					}else{
				            	toastr.success(
									"Oba, seja bem vindo ao VTV.", 
									'', 
									{"progressBar": false, "positionClass": "toast-top-center", "showDuration": "100"}
								);

				            	var userId = User.findOne(
				            		{
				            			social_network_id:Meteor.userId(), 
				            			social_network:2 // 1 => facebook, 2 => google
				            		}
				        		);

				            	Meteor.setUserId(userId._id);
				            	Router.go('list.programs');
        					}
        				}
    				);
        		}
            }
        });
    }
});