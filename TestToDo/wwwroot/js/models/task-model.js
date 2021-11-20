var app = app || {};

(function () {
	app.Task = Backbone.Model.extend({
		defaults: {
			id: 0,
			title: '',
			completed: ''
		}
	});
})();