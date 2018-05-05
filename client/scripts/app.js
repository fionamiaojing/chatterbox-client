// YOUR CODE HERE:
var app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  
app.username = window.location.search.split('=')[1];

app.roomname = $('#roomSelect option:selected' ).text();

app.friends = {};

app.inited = false;
  
app.init = function() {
  
  if (app.inited) {
    return;
  }
  app.inited = true;
  $(document).ready(function() {
    
    $('#send').on('submit', function(event) {
      event.preventDefault();
      app.handleSubmit();
    });
  });
  
};

app.fetch = function() {
  thisapp = this;
  var filter = {'order': '-createdAt'};
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: filter,
    contentType: 'application/json',
    success: function (data) {
      
      thisapp.clearMessages();
      
      for (var message of data['results']) {
        thisapp.renderMessage(message);
      }
      $('form').removeClass('spinner');
      $('img').remove();
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};
  
app.send = function(message) {
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      $('form').addClass('spinner');
      $('form').append('<img>');
      $('img').attr('src', 'images/spiffygif_46x46.gif');
      app.fetch();
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
  
app.clearMessages = function() { 
  $('#chats').empty();
};
  
app.renderMessage = function(message) {
  var name = message.username;
  var text = message.text;
  var room = message.roomname;
  
  var divClass = $('<div>', {'class': 'chat'});
  var nameClass = $('<a>', {'class': 'username', 'text': name});
  var textContent = $('<div>', {'text': text});
  
  if (name in app.friends) {
    nameClass.addClass('friend');
  }
  
  divClass.append(nameClass);
  divClass.append(textContent);
  
  $('#chats').append(divClass);
  
  $('.username').on('click', function() {
    var username = $(this).text();
    app.handleUsernameClick(username);
    app.fetch();
  });
};
  
app.renderRoom = function(room) {
  $('<option>' + room + '</option>').appendTo('#roomSelect');
};

app.handleUsernameClick = function(username) {
  this.friends[username] = true;
};

app.handleSubmit = function() {
  var message = {};
  message.username = this.username;
  message.text = $('input').val();
  message.roomname = this.roomname;

  this.send(message);
};

app.init();
