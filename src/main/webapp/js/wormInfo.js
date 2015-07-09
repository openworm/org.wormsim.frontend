$(function() {
  var wormInfoSubmit = $("#worm-info-submit");

  wormInfoSubmit.click(function() {
    wormInfoSubmit.button('loading');
    $.ajax({
      url: '/wormInfo',
      type: 'post',
      dataType: 'json',
      data: $('form#worm-info-form').serialize(),
      success: function() {
        document.location.reload(true);
      },
      error: function(xhr) {
        if(xhr.status === 200) {
          document.location.reload(true);
        } else {
          $('.worm-info.alert').fadeIn();
          wormInfoSubmit.button('reset');
        }
      }
    });
  });
});
