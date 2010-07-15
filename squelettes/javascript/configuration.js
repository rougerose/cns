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
	//	FAQ - Questions/Réponses
	// ********************************************************************
	$("dl.faq").each(function(){
		var $questions = $(this).find("dt"),
			icone = '<span class="ui-icon ui-icon-triangle-1-e" />',
			iconeE = 'ui-icon-triangle-1-e',
			iconeS = 'ui-icon-triangle-1-s';
		
		$questions.next("dd").hide();
		$questions.prepend(icone);
		
		$questions.click(function(){
			var test = '';
			if ($(this).is(".ouvert")) {
				test = 1;
			}
			$("dt.ouvert").removeClass("ouvert")
				.children("span").removeClass(iconeS).addClass(iconeE)
				.parent("dt").next("dd").slideUp("fast");
			
			if (test == 1) { return false }
			
			$(this).addClass("ouvert")
				.children("span").addClass(iconeS)
				.parent("dt").next("dd").slideDown("slow");
		});
	});
	
	// ********************************************************************
	//	Agenda : 
	//  menu déroulants de tri par date et par catégorie
	//  
	// ********************************************************************
	$(".formulaire_tri input[type='submit']").hide();
	$(".formulaire_tri select").change(function(){
		this.form.submit();
	});
});