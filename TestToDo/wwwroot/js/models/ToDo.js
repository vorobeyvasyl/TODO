
var Task = Backbone.Model.extend({		
	defaults: {
		id: 0,
		title: '',
		completed: ''
	}
});

var Tasks = Backbone.Collection.extend({
	url: 'https://localhost:44381/api/Tasks'
});

var tasksCollection = new Tasks();

var TaskView = Backbone.View.extend({
	model: new Task(),
	tagName: 'div',
	initialize: function () {
		this.template = _.template($('.task-templete').html());
	},
	events: {
		'click .edit-task': 'edit',
		'click .update-task': 'update',
		'change .form-check-input':'update',
		'click .cancel-edit': 'cancel',
		'click .delete-task': 'delete',
		'keyup .task-update-input':'update'
	},
	edit: function () {
		this.$('.edit-task').hide();
		this.$('.delete-task').hide();
		this.$('.update-task').show();
		this.$('.cancel-edit').show();
		this.$('.form-check-input').addClass('none');
		var title = this.$('.form-check-label').html().trim();
		this.$('.form-check-label').html('<input type="text" class="form-control task-update-input" value="'+title+'"/>')
	},
	update: function (event) {
		if (event.type == 'keyup' && event.keyCode != 13) {
			return;
		}
		if (this.$(".task-update-input").length>0) {
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

var TasksView = Backbone.View.extend({
	model: tasksCollection,
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
			self.$el.append((new TaskView({ model: task })).render().$el);
		});
		return this;
	}
});

var TasksViews = new TasksView();

$(document).ready(function () {
	TasksViews.render();
	$("#add-input").on("keyup", function (event) {		
		if (event.keyCode === 13) {			
			event.preventDefault();			
			var task = new Task({
				title: $("#add-input").val().trim()
			});
			console.log(task.toJSON());
			$("#add-input").val('');
			tasksCollection.add(task);

			task.save(null, {
				success: function (response) {
					console.log('Successfully saved task, id=' + response.toJSON().id)
				},
				error: function () {
					console.log('Failed to save Task');
				},
				complete: function () {
					console.log('complete');
				}
			});
		}
	});
});