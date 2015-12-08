// Display messages retrieved from the parse server
// Setup a way to refresh the displayed messages (either automatically or with a button).
// Be careful to use proper escaping on any user input. Since you're
// Allow users to select a username and send messages
// Allow users to create rooms and enter existing rooms
// Allow users to 'befriend' other users by clicking on their username
// Display all messages sent by friends in bold
// Complete the Backbone intro (you have access to this repo on GitHub)

var app = { 
  init: function(){
    var data = this.fetch;
    _.each(data, function(message){

    });
  },

  server: 'https://api.parse.com/1/classes/chatterbox',
  rooms: [],

  send: function (message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(message),    //because the spec is parsing
      success: function(data){return data;}
    })
  },

  fetch: function(){
    var result;
    var getData = function(data) {
    	result = data.results;
    };
    $.ajax({
      url: this.server,
      type: 'GET',
      success: function(data) {
        console.log(data);
        getData(data);
      }
    });
    return result;
  },

  clearMessages: function(){
    $('#chats').children().remove();
  },

  addMessage: function(message){
    //add a paragraph that contains the text of the message
    $('#chats').append('<p><span class="username" onClick="app.addFriend()">'+message.username+'</span>: '+message.text+'</p>');
  },

  addRoom: function(roomname){
    $('#roomSelect').append('<p>'+roomname+'</p>');
  },

  addFriend: function(){
    return true;

  },

  handleSubmit: function(msg){
    var message = {
      username: 'test',
      text: $(msg)
    }
    this.send(message);
    this.addMessage(message);
    return true;
  }
};

$(function(){
  $('#send .submit').on('click', function(){
    var msg = $('#message').val();
    app.handleSubmit(msg);
  }); 
});
