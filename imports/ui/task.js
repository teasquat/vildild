import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import { Timestamps } from '../api/timestamps.js';

import './task.html';

function stopTimestamp(id) {
  Timestamps.update(id, {
    $set: {
      StopTime: new Date(),
    }
  });
}

Template.task.events({
  'click .toggle-time'() {

    //Stop other active task to not started
    active = Tasks.findOne({started: true})

    if (active && active._id != this._id) {

      if (active.currentTimestamp) {
        stopTimestamp(active.currentTimestamp);
      }

      Tasks.update(active._id, {
        $set: {
          started: false,
          currentTimestamp: null,
        },
      });
    }

    // Set the started property to the opposite of its current value
    if (this.started) {
      //Stop it and it's timestamp
      console.log(active)
      if (active.currentTimestamp) {
        stopTimestamp(this.currentTimestamp);
      }

      Tasks.update(this._id, {
        $set: {
          started: false,
          currentTimestamp: null,
        },
      });
    } else {
      //Start it and give it a timestamp
      var timestamp = Timestamps.insert({
        StartTime: new Date(),
        StopTime: null,
      })

      Tasks.update(this._id, {
        $set: {
          started: true,
          currentTimestamp: timestamp,
        },
      });
    }
  },
  'click .delete'() {
    Meteor.call('tasks.delete', this._id);
  },
});
