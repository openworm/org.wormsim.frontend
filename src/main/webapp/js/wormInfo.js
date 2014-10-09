$(function() {
    $("#worm-info-submit").click(function() {
        $("#worm-info-submit").button('loading');
        $.ajax({
            url: '/org.wormsim.frontend/wormInfo',
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
                    $("#worm-info-submit").button('reset');
                }
            }
        });
    });
});
