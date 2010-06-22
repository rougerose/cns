<?php

function array_merge_($array1, $array2) {
    return array_merge((array)$array1,(array)$array2);
}

function initiale($texte) {
    $texte = utf8_decode($texte);
    $texte = substr($texte,0,1);
    $texte = strtr($texte,
     "\xe1\xc1\xe0\xc0\xe2\xc2\xe4\xc4\xe3\xc3\xe5\xc5".
     "\xaa\xe7\xc7\xe9\xc9\xe8\xc8\xea\xca\xeb\xcb\xed".
     "\xcd\xec\xcc\xee\xce\xef\xcf\xf1\xd1\xf3\xd3\xf2".
     "\xd2\xf4\xd4\xf6\xd6\xf5\xd5\x8\xd8\xba\xf0\xfa\xda".
     "\xf9\xd9\xfb\xdb\xfc\xdc\xfd\xdd\xff\xe6\xc6\xdf\xf8",
     "aAaAaAaAaAaAacCeEeEeEeEiIiIiIiInNo".
     "OoOoOoOoOoOoouUuUuUuUyYyaAso");
    $texte = utf8_encode($texte);
    return $texte;
}



?>