// YOUR CODE HERE:
var app = {
  
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  
  username: window.location.search.split('=')[1],
  
  init: function() {
  
    $(document).ready(function() {
        
      $('.username').on('click', function(event) {
        this.addClass('friend');
      });
      
      $('.submitMessage').on('click', function(event) {
        var message = {};
        message.text = $.get('input').val();
        message.username = window.location.search.split('=')[1];
        message.roomname = 'lobby';
        this.renderMessage(message);
        this.send(message); 
      });
    });
  },

  eventHandlers: function (event) {
    $('document').on('submit', '#refresh', function(event) {
      event.preventDefault();
    }); 
  },
  
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  send: function(message) {
    
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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
  
  clearMessages: function() { 
    $('#chats').empty();
  },
  
  renderMessage: function(message) {
    var name = message.username;
    var text = message.text;
    var room = message.roomname;
    
    $('<section class="messageContent"><a class=username>'+name+'</a><div>'+text+'</div></section>').appendTo('#chats');
  },
  renderRoom: function(room) {
    $('<option>'+room+'</option>').appendTo('#roomSelect');
  },
};

app.init();

