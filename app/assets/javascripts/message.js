$(function(){
  // HTMLを作成するメソッド
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="message_image" src="${message.image_url}">`:"";
    var html = `<div class="message" id='${message.id}'>
                  <div class="message__user-name">
                  ${message.name}
                  </div>
                  <div class="message__date">
                  ${message.date}
                  </div>
                  <div class="message__content">
                  ${message.content}
                  ${image_url}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('#new_message')[0].reset();
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').attr("disabled",false);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight }, 'fast');
    })
    .fail(function(data){
      alert('入力してください');
    })
  })
})
