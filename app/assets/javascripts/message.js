$(function () {
  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="message">` +
        `<div class="message__info">` +
        `<div class="message__info__name">` +
        message.user_name +
        `</div>` +
        `<div class="message__info__date">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="message__text">` +
        `<p class="message__text__content">` +
        message.content +
        `</p>` +
        `<img src="` + message.image + `" class="message__text__image" >` +
        `</div>` +
        `</div>`
    } else if (message.content) {
      var html = `<div class="message">` +
        `<div class="message__info">` +
        `<div class="message__info__name">` +
        message.user_name +
        `</div>` +
        `<div class="message__info__date">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="message__text">` +
        `<p class="message__text__content">` +
        message.content +
        `</p>` +
        `</div>` +
        `</div>`
    } else if (message.image) {
      var html = `<div class="message">` +
        `<div class="message__info">` +
        `<div class="message__info__name">` +
        message.user_name +
        `</div>` +
        `<div class="message__info__date">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="message__text">` +
        `<img src="` + message.image + `" class="message__text__image" >` +
        `</div>` +
        `</div>`
    };
    return html;
  }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function (data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('form')[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('input').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
  })
})
