/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tax = require('./tax.model');

exports.register = function(socket) {
  Tax.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tax.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tax:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tax:remove', doc);
}