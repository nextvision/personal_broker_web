$(function () {
    /* botoes do tour */
    $('.tour').hide();
    $('#pano-tour1').show();

     /* PANO */
     $(".btn-360").click(function(event){

        event.preventDefault();
        
        var cl = $(this).attr('id');
        console.log(cl)

        $('.tour').hide();
        $('#pano-'+cl).show();

    })
})