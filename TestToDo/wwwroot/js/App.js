var app = app || {};
var ENTER_KEY = 13;

$(function () {
	var TasksViews = new app.TasksView();

	$(document).ready(function () {
		TasksViews.render();
		$("#add-input").on("keyup", function (event) {
			if (event.keyCode === ENTER_KEY) {
				event.preventDefault();
				if ($("#add-input").val().trim() != '') {
					var task = new app.Task({
						title: $("#add-input").val().trim()
					});
					console.log(task.toJSON());
					$("#add-input").val('');
					app.tasksCollection.add(task);

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
			}
		});
	});
});