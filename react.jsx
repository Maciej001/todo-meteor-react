 Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  Meteor.subscribe('tasks');
  
  Meteor.startup(function () {
    React.render(<App />, document.getElementById("render-target"));
  });
}


if (Meteor.isServer) {
  Meteor.publish("tasks", function(){
    return Tasks.find({
      $or: [
        { private: { $ne: true} },
        { owner: this.userId }
      ]
    });
  });
}

Meteor.methods({
  addTask(text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }
    
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  
  removeTask(taskId) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }
    
    Tasks.remove(taskId);
  },
  
  setChecked(taskId, setChecked) {
    const task = Tasks.find(taskId);
    
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }
    
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  
  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }
    
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});