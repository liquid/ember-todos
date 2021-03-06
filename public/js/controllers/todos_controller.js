Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false /* TODO: Can weommit this? This is a model responsibility. */
      });

      // Clear the "New Todo" text field
      this.set('newTitle', ''); /* TODO: What is the initial value of newTitle before it gets reset? null or empty string? */

      // Save the new model
      /* TODO: What is the return value? Can we use the save() method's return value as a conditional to clear 'newTitle'? */
      /* TODO: What about validation? What if the model persistance fails? */
      todo.save();
    },
    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },
  },

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),


  /*
   * TODO: What are key, value arguments for? They are not used...
   * TODO: Where is everyProperty() coming from? It's not documented...
  */
  allAreDone: function(key, value) {
    /* this property is being used to populate the current value of the checkbox */
    if (value === undefined) {
      return !!this.get('length') && this.everyProperty('isCompleted', true);
    } else {
      /* the checkbox was used by a user and we should set the isCompleted property of each todo to this new value. */
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted'),

  completed: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
});
