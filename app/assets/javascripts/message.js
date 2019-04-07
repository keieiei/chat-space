$(function(){
  function buildHTML(message){
    if (message.image_url == null){
    var html = `<div class='main_info'>
                   <div class='main_info_message'>
                    <p class='main_info_message_user'>
                    ${message.user_name}
                    </p>
                    <p class='main_info_message_time_stamp'>
                    ${message.created_at}
                    </p>
                  </div>
                  <p class='main_info_message_img'>${message.content}</p>
                 </div>`
    }else{
    var html = `<div class='main_info'>
                   <div class='main_info_message'>
                    <p class='main_info_message_user'>
                    ${message.user_name}
                    </p>
                    <p class='main_info_message_time_stamp'>
                    ${message.created_at}
                    </p>
                  </div>
                  <p class='main_info_message_img'>${message.content}</p>
                  <img src="${message.image_url}",class="lower-message__image">
                 </div>`
    }
    return html;
  }
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
      var html = buildHTML(message);
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
});
