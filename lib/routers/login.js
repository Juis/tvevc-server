Router.map(function() {

    this.route('login', {
            path: '/login',
            onBeforeAction: function() {
                document.querySelector('body').classList.add('bar-none');
                this.next();
            },

            onStop: function() {
                document.querySelector('body').classList.remove('bar-none');
            }
        }
    );

});