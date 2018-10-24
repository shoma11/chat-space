$(function(){
  // HTMLを作成するメソッド
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="message_image" src="${message.image_url}">`:"";
    var html = `<div class="message" data-message-id="${message.id}">
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
      $(".form__submit").attr("disabled",false);
    })
  })
  // 自動更新機能
  $(function(){
  setInterval(autoUpdate, 3000);
  });
  function autoUpdate() {
    var url = window.location.href;
    if (url.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message').last().data('message-id');
        $.ajax({
        url: url,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          messages.forEach(function(message) {
          var html = buildHTML(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          });
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
    else {
      clearInterval(autoUpdate);
      }
  };
})
