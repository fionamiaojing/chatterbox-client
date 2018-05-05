// YOUR CODE HERE:
var app = {
  init: function() {},
  server: 'http://parse.sfm8.hackreactor.com',
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com',
      type: 'GET',
      contentType: 'application/json',
      // success: function (data) {
      //   console.log('chatterbox: Message received');
      // },
      // error: function (data) {
      //   // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      //   console.error('chatterbox: Failed to receive message', data);
      // }
    });
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  renderMessage: function(message) {
    $('<div>'+message+'</div>').appendTo('#chats');
  },
  clearMessages: function() { 
    $('#chats').empty();
  },
  renderRoom: function(room) {
    $('<option>'+room+'</option>').appendTo('#roomSelect');
  },
};

