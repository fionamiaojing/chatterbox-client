// YOUR CODE HERE:
var app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  
app.username = window.location.search.split('=')[1];

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
    
    $('#roomSelect').change(function() {
      app.fetch();       
    });
    
    $('.addRoom').on('click', function(event) {
      var newRoomName = $('.newRoom').val();
      var newRoom = $('<option>', {'text': newRoomName});
      newRoom.appendTo('#roomSelect');
      $('.newRoom').val('');
    });
  });
  
};

app.fetch = function() {
  thisapp = this;
  var filter = {'order': '-createdAt'};
  
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: filter,
    contentType: 'application/json',
    success: function (data) {
      
      thisapp.clearMessages();     
      for (var message of data['results']) {
        console.log(thisapp.roomname);
        if ($('#roomSelect option:selected').text() === message['roomname']) {
          thisapp.renderMessage(message);
        }
        
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
  thisapp = this;
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      $('form').addClass('spinner');
      $('form').append('<img>');
      $('img').attr('src', 'images/spiffygif_46x46.gif');
      thisapp.fetch();
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
  });
};
  
app.renderRoom = function(room) {
  $('<option>' + room + '</option>').appendTo('#roomSelect');
};

app.handleUsernameClick = function(username) {
  this.friends[username] = true;
  app.send();
};

app.handleSubmit = function() {
  var message = {};
  message.username = this.username;
  message.text = $('.addMessage').val();
  message.roomname = $('#roomSelect option:selected').text();
  $('.addMessage').val('');
  
  this.send(message);
};

app.init();
