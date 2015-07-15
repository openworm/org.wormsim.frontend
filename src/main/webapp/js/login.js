$(function() {
  var loginSubmit = $("#login-submit");

  loginSubmit.click(function() {
    loginSubmit.button('loading');
    $.ajax({
      url: '/login',
      type: 'post',
      dataType: 'json',
      data: $('form#login-form').serialize(),
      success: function(data, textStatus, xhr) {
        document.location.reload(true);
      },
      error: function(xhr) {
        if(xhr.status === 200) {
          document.location.reload(true);
        } else {
          loginSubmit.button('reset');
          var loginAlert = $('.login.alert');
          loginAlert.fadeIn();
          loginAlert.fadeOut(2500,"swing");
        }
      }
    });
  });
});
