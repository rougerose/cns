$(document).ready(function(){


    // *************************************************
    //  simuler :hover sur un element 
    //  autre que <a> pour IE 6 et inférieur
    // *************************************************
    $("#menuPrincipal ul li").hover(
        function (){
            $(this).addClass("hover");
        },
        function (){
            $(this).removeClass("hover");
        }
    );


    // ********************************************************************
    //  Pages index : 
    //  ajustement de la hauteur de div#index > dl en fonction de 
    //  la hauteur de la liste des articles affichée
    // ********************************************************************
    if ($("#index dd").length > 0) { // on est bien dans la page index avec une liste d'articles
        // ajout d'une classe specifique
        $("#pageIndex").addClass("jquery-on");
        var BlocArticles = $("#index dl dd").height();
        var BlocIndex = $("#index dl").height();
        if (BlocArticles > BlocIndex) {
            if ($.browser.msie && $.browser.version == 6.0) {
                // test pour IE 6
                $("#index dl").css({'height': BlocArticles}); 
            }
            $("#index dl").css({'min-height': BlocArticles});
        }
    }
});