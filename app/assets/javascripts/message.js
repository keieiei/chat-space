var loaded = false;
$(function(){
  function buildMessageHTML(message){
    var image = (message.image_url) ? '<img src="'+message.image_url+'" class="lower-message__image">':"";
    var html = '<div class= "main_info"  data-message-id = '+message.id+'>'+
                  '<div class= "main_info_message">'+
                   '<p class= "main_info_message_user" >'+
                      message.user_name +
                    '</p>'+
                    '<p class= "main_info_message_time_stamp">'+
                      message.created_at +
                    '</p>'+
                    '<p class= "main_info_message_img">'+
                      message.content +
                    '</p>'
                      +image+
                  '</div>'
                '</div>';
    return html
  }
  $('#new_message').off('submit')
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessageHTML(message);
      $('.main').append(html)
      $('.enter_messages_input-box_text').val('')
      $('.input-box_image_file').val('')
      $('.enter_messages_submit-btn').removeAttr('disabled');
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('errord');
      $('.enter_messages_submit-btn').removeAttr('disabled');
    })
  })
  var reloadMessages = function() {
    var last_message_id = $('.main_info').last().data('message-id');
    var group_id = $('.main').data('group-id');
    if(loaded) return ;
    $.ajax({
      url: "/groups/"+ group_id +"/api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(new_messages) {
      var insertHTML = '';
      new_messages.forEach(function(message) {
        insertHTML += buildMessageHTML(message);
      });
      $('.main').append(insertHTML);
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      clearInterval(timer);
      clearInterval(loadOne);
    });
    loaded = true;
  }; 
  var loadOne = function(){
    loaded = false;
  };
  setInterval(loadOne, 4900);
  timer = setInterval(reloadMessages, 5000); 
});
