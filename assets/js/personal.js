$(function () {
     /* PANO */
     $(".btn-360").click(function(event){

        event.preventDefault();
        
        var cl = $(this).attr('id');
        console.log(cl)

        $('.tour').hide();
        $('#pano-'+cl).show();

    })
})