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
	
	// ********************************************************************
	//  Pages index de la rubrique Liens : 
	//  affichage des descriptifs des sites
	//	inspiré de http://jqueryfordesigners.com/jquery-look-tim-van-damme/
	// ********************************************************************
	$("#index .sites").each(function(){
		var $liens = $(this).find("dt > a"),
			idLiens = $liens.map(function(){ return this.hash; }).get().join(","),
			$panneaux = $(idLiens);
		
		$panneaux.hide();
		
		// on applique le style lié au javascript quand il est activé
		$(this).removeClass("jq-off").addClass("jq-on");
		
		$liens.click(function(){
			var lien = this,
				$lien = $(this);
			
			if ($lien.is('.on')) {
				return false;
			}
			
			$liens.removeClass("on");
			$lien.addClass("on");
			$panneaux.filter(":visible").slideUp("fast");
			$panneaux.filter(lien.hash).slideDown(700);
			
		});
		// le descriptif s'affiche si l'url comporte l'id correspondant
		$liens.filter(window.location.hash ? '[hash=' + window.location.hash + ']' : '').click();
	});
	
	
	
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