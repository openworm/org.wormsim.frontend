$(function() {
    $("#login-submit").click(function() {
        $('#login-submit').button('loading');
        $.ajax({
            url: '/org.wormsim.frontend/login',
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
                    $('#login-submit').button('reset');
                    $('.login.alert').fadeIn();
                    $('.login.alert').fadeOut(2500,"swing");
                }

            }
        });
    });

});