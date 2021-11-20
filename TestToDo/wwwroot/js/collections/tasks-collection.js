var app = app || {};

(function () {
	var Tasks = Backbone.Collection.extend({
		url: 'https://localhost:44381/api/Tasks'
	});

	app.tasksCollection = new Tasks();
})();