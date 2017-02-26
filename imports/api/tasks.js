/*import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    Tasks.insert({
      text,
      createdAt: new Date(),
    });
  },
  'tasks.delete'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
});
