var app = app || {};

(function () {
	app.TasksView = Backbone.View.extend({
		model: app.tasksCollection,
		el: '.tasks-list',
		initialize: function () {
			var self = this;
			this.model.on('add', this.render, this);
			this.model.on('change', function () {
				self.render();
			}, this);
			this.model.on('remove', this.render, this);

			this.model.fetch({
				success: function (response) {
					_.each(response.toJSON(), function (item) {
						console.log('Get item ' + item.id)
					})
				},
				error: function () {
					console.log('Failed to get Tasks');
				},
				complete: function () {
					console.log('complete');
				}
			});
		},
		render: function () {
			var self = this;
			this.$el.html('');
			_.each(this.model.toArray(), function (task) {
				self.$el.append((new app.TaskView({ model: task })).render().$el);
			});
			return this;
		}
	});
})();