var app = app || {};

(function () {
	app.TaskView = Backbone.View.extend({
		model: new app.Task(),
		tagName: 'div',
		initialize: function () {
			this.template = _.template($('.task-templete').html());
		},
		events: {
			'click .edit-task': 'edit',
			'click .update-task': 'update',
			'change .form-check-input': 'update',
			'click .cancel-edit': 'cancel',
			'click .delete-task': 'delete',
			'keyup .task-update-input': 'update'
		},
		edit: function () {
			this.$('.edit-task').hide();
			this.$('.delete-task').hide();
			this.$('.update-task').show();
			this.$('.cancel-edit').show();
			this.$('.form-check-input').addClass('none');
			var title = this.$('.form-check-label').html().trim();
			this.$('.form-check-label').html('<input type="text" class="form-control task-update-input" value="' + title + '"/>')
		},
		update: function (event) {
			if (event.type == 'keyup' && event.keyCode != ENTER_KEY) {
				return;
			}
			if (this.$(".task-update-input").length > 0) {
				this.model.set('title', this.$('.task-update-input').val().trim());
			}
			if (this.$(".form-check-input").prop('checked')) {
				this.model.set('completed', 'checked');
			}
			else {
				this.model.set('completed', '');
			}
			this.model.save(null, {
				success: function (response) {
					console.log('Successfully UPDATED task with _id: ' + response.toJSON().id);
				},
				error: function (err) {
					console.log('Failed to update task!');
				}
			});
		},
		cancel: function () {
			TasksViews.render();
		},
		delete: function () {
			this.model.destroy();
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
})();