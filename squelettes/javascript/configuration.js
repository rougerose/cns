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
	
	// on est bien dans la page index avec une liste d'articles ?
	if ($("#index dd").length > 0) {
		// ajout d'une classe specifique
		$("#pageIndex").addClass("jquery-on");
		var blocArticles = $("#index dl dd").height(),
			blocIndex = $("#index dl").height(),
			// taille du blocContenu et tri du tableau obtenu en ordre décroissant
			blocContenu = $("#index dl div.blocContenu").map(function(){ return $(this).height(); }).get().sort(function(a,b){ return b - a })
			marge = 80;
			
		if (blocContenu[0] > blocIndex) {
			// test pour IE 6
			if ($.browser.msie && $.browser.version == 6.0) {
			$("#index dl").css({ 'height': blocContenu[0] + marge }); 
			}
		$("#index dl").css({ 'min-height': blocContenu[0] + marge });
		}
	}
	
	// ********************************************************************
	//	jQuery UI-tabs : 
	//  paramétrage du plugin activé préalablement dans spip
	// ********************************************************************
	$("#tabs").tabs();
	
	
	// ********************************************************************
	//	Agenda : 
	//  menu déroulants de tri par date et par catégorie
	//  
	// ********************************************************************
	$(".formulaire_agenda input[type='submit']").hide();
	$(".formulaire_agenda").change(function(){
		this.submit();
	});
});