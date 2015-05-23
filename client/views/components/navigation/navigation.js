Template.navigation.rendered = function () {
	$(".button-collapse").sideNav();
};

Template.navigation.helpers({
    'admin': function(){
        return (Meteor.userLevel !== undefined && Meteor.userLevel !== '2')? false : true;
    }
});