<?php
// ecran de securite spip
@include_once dirname(__FILE__).'/ecran_securite.php';


// menu langue
$forcer_lang=true;

############## COUTEAU SUISSE : LAME PERSO #################
// Installation d'une nouvelle lame pour les intertitres supplémentaires
$GLOBALS['mes_outils']['intertitres'] = array(
	'nom'         => 'Intertitres',
	'description' => 'Raccourcis suppl&eacute;mentaires pour les intertitres. Syntaxe :
	<ul>
	<li><code>{{{*...*}}}</code> pour un intertitre de niveau 1 (<code><h2></code>);</li> 
	<li><code>{{{**...**}}}</code> intertitre de niveau 2 (<code><h3></code>);</li> 
	<li><code>{{{***...***}}}</code> intertitre de niveau 3 (<code><h4></code>) ;</li> 
	<li><code>{{{****...****}}}</code> intertitre de niveau 4 (<code><h5></code>) ;</li> 
	<li><code>{{{*****...*****}}}</code> intertitre de niveau 5 (<code><h6></code>).</li>
	</ul>',
	'auteur'      => 'christophe le drean',
	'categorie'   => 'typo-racc',
	'pipeline:pre_propre'   => 'intertitres_pre',
	'pipeline:BT_toolbox' => 'mise_evidence_BarreTypo',
);
// Fonction de remplacement
function intertitres_rempl($texte) {
    // on cherche uniquement les raccourcis de la forme {{{* *}}}, le raccourcis standard {{{ }}} sera traité par spip
    preg_match_all(',(\{\{\{)(\*+)(.*?)(\*+)(\}\}\}),',$texte,$resultat);
    $nbtitres += count($resultat[0]);
    if ($nbtitres!==0) {
        for($i=0; $i<$nbtitres; $i++) {
            $niveau = strlen($resultat[2][$i]);
            $titre = $resultat[3][$i];
            // on decale de 1 ({{{** = h3) puisque que l'on demarre a partir de h2
            $ajout = 1;
            // pour {{{* qui est équivalent au raccourcis standard on efface l'asterisque afin qu'il soit traité par spip
            if ($niveau == 1) {
                $intertitreDebutStandard = $resultat[1][$i];
                $intertitreFinStandard = $resultat[5][$i];
                $texte = str_replace($resultat[0][$i],"$intertitreDebutStandard$titre$intertitreFinStandard",$texte);
            }
            $niveau += $ajout;
            $intertitreDebut = "<h".$niveau." class=\"spip\">";
            $intertitreFin = "</h".$niveau.">\n\n";
            $texte = str_replace($resultat[0][$i],"$intertitreDebut$titre$intertitreFin",$texte);
        }
    }
    return $texte;
}
// Fonction de pipeline
function intertitres_pre($texte) {
	if (strpos($texte, '{{{*')===false) return $texte;
	// appeler intertitres_rempl() une fois que certaines balises ont ete protegees
	return cs_echappe_balises('', 'intertitres_rempl', $texte);
}
// Fonction indiquant le nouveau raccourci
function intertitres_raccourcis() {
	return 'Intertitres supplémentaires : <b>{{{*intertitre*}}}</b>';
}
// Aide le Couteau Suisse a calculer la balise #INTRODUCTION
function intertitres_nettoie($texte) {
	return preg_replace(',\{\{\{\**(.*?)\**\}\}\},', "$1", $texte);
}
$GLOBALS['cs_introduire'][] = 'intertitres_nettoie';

// Fonction qui renvoie une ligne de tableau entre <tr></tr>
// afin de l'inserer dans la Barre Typo V2, si elle est presente
function intertitres_BarreTypo($tr) {
    //if (!isset($GLOBALS['mes_outils']['intertitres']))	intertitres_installe();
    // on démarre à 2, le premier niveau étant le raccourcis standard de spip
    for ($b = 2 ; $b < 6; $b++) {
        $asterisque .= '*';
        $res[] = "<a title=\"Intertitre $b\" href=\"javascript:barre_inserer('{{{{$asterisque}','{$asterisque}}}}',@@champ@@)\"><span class=\"cs_BT\">Intertitre {$b}</span></a>";
    }
    $res = join (' ',$res);
    return $tr.'<tr><td><p style="margin:0; line-height:1.8em;">'."Intertitres"."&nbsp;$res</p></td></tr>";
}
############## FIN LAME PERSO COUTEAU SUISSE #################





?>