$(function () {
    /* botoes do tour */
    $('.tour').hide();
    $('#pano-tour1').show();

     /* PANO */
     $(".btn-360").parent().click(function(event){

        event.preventDefault();
        
        var cl = $(this).children().attr('id');
        console.log(cl)

        $('.tour').hide();
        $('#pano-'+cl).show();

    });
    
    /* ======= Financiamento ======= */
    /* FINANCING DATA */
    var finan_valor = 100;
    var finan_meses = 10;
    var finan_taxa  = 10;

    /* SETTING INITIALS VALUES */
    function startFinan(){

        $('#numpad_valor_financiamento').val(finan_valor+" %");
        $('#valor_financiamento').slider('setValue', finan_valor);

        $('#numpad_tempo_financiamento').val(finan_meses+" anos");
        $('#tempo_financiamento').slider('setValue', finan_meses);
        
        financiamento();

    }

    /* FINANCIING NUMERIC KEYBOARD */
    // $('#numpad_valor_financiamento, #numpad_tempo_financiamento').numpad().on("change", function(vars){
        
    //     var pad_value = vars.target.value;
    //     var pad_id = vars.target.id;
        
    //     if(pad_id == "numpad_valor_financiamento"){
    //         $('#valor_financiamento').slider('setValue', pad_value);
    //     }else if(pad_id == "numpad_tempo_financiamento"){
    //         $('#tempo_financiamento').slider('setValue', pad_value);    
    //     }
        
    // });

    $("#valor_financiamento").slider({
        ticks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        //ticks_positions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        //ticks_snap_bounds: 200,
        formatter: function(value) {
            return 'Valor: ' + value;
        },
        ticks_tooltip: true,
        step: 5
    }).on('change', function(ev){
        originalVal = $('#valor_financiamento').data('slider').getValue();
        $('#numpad_valor_financiamento').val(originalVal+" %");
        financiamento()
    });

    $("#tempo_financiamento").slider({
        ticks: [1, 5, 10, 12, 24, 36, 48, 60],
        //ticks_positions: [12, 24, 36, 48, 60],
        //ticks_snap_bounds: 200,
        formatter: function(value) {
            return 'Valor: ' + value;
        },
        ticks_tooltip: true,
        //step: 0.01
    }).on('change', function(ev){
        originalVal = $('#tempo_financiamento').data('slider').getValue();
        $('#numpad_tempo_financiamento').val(originalVal+" anos");
        financiamento()
    });
    

    startFinan();

    function financiamento(){

        var valor_imovel = (100).toFixed(2);
        var valor_financiamento = ((parseInt($('#numpad_valor_financiamento').val()) / 100) * valor_imovel).toFixed(2);
        var pgto_meses = parseInt($('#numpad_tempo_financiamento').val());

        var PV = valor_financiamento;
        var n  = pgto_meses;
        var i  = finan_taxa / 100;
        var FV = 0;

        var montante = valor_financiamento * Math.pow((1 + i), n);
        
        /*
        console.log(valor_imovel)
        console.log(valor_financiamento)
        console.log(pgto_meses)
        console.log('-------------------')
         *for(a = 1; a <= n; a++){
            console.log(valor_financiamento+' * Math.pow(1 + '+i+'), '+a+' = '+(valor_financiamento * Math.pow((1 +i), a)).toFixed(2))
            console.log();
        }
        console.log('-------------------------------');
        /* */

        var primeira_parcela = ((valor_financiamento * Math.pow((1 + i), 1)).toFixed(2))//.replace(".","");
        var ultima_parcela   = ((valor_financiamento * Math.pow((1 + i), n)).toFixed(2))//.replace(".","");
        //console.log(primeira_parcela);
        //console.log(ultima_parcela);

        $('.finan_valor_financiado').val(valor_financiamento);
        $('.finan_taxa_juros').val((i*100)+' a.a.');
        $('.finan_primeira_parcela').val(primeira_parcela);
        $('.finan_ultima_parcela').val(ultima_parcela);

    }

    // $('.money').mask('R$ 000.000.000.000.000,00');
    /* ======= End Financiamento ======= */

})

angular.module('galeryApp', []).controller('personCtrl', function($scope, $http) {
    $http.get("assets/image-gallery/images.json").then(function (response) {
        $scope.galeryData = response.data.row;
    });
});