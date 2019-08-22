// ==UserScript==
// @name          EA adjust
// @namespace     http://jupiter.co.ao
// @description	  Ajuste de tamanho das divs exportadas pelo EA
// @author        Maicon Zucco
// @homepage      https://jupiter.co.ao
// @match         http://requisitos.jupiter.co.ao/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @resource      glyphicons http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css
// @resource      googleIcons https://fonts.googleapis.com/icon?family=Material+Icons
// @run-at        document-start
// @version       0.20180328074139
// @grant         GM_getResourceText
// @grant         GM_getResourceURL
// @grant         GM_addStyle
// ==/UserScript==
(function() {

    var css = [
	".ObjectDetailsNotes {",
	"    max-height: none !important;",
	"}",
    ".TableRow {",
    "    font-weight: bold;",
    "    font-size: 14px !important;",
    "    padding: 10px !important;",
    "}",
    ".TableRowBottomDashed {",
    "    background-color: transparent !important;",
    "}",
].join("\n");


    css += '.height100 {height: 100% !important;}'


   var newCSS = GM_getResourceText ("googleIcons");
   GM_addStyle (newCSS);



if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
    var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}

    //var newCSS = GM_getResourceText ("glyphicons");
    //GM_addStyle (newCSS);

function escondeExibeDetalhes (e){
    var icone = e.target;
    var detalhes = $(icone).parent().find(".ObjectDetailsNotes:first");

    if ($(detalhes).is(":hidden")){
      $(detalhes).show();
      $(icone).text("remove");
    }else {
      $(detalhes).hide();
      $(icone).text("add");
    }
}

$(".ObjectDetailsNotes:first").before($("<i>",{class: "icoEscondeDet material-icons",text:"remove", style: "cursor: default;"}));
//$(".ObjectDetailsNotes:first").before($("<img>",{src:"../../../../images/minus03.gif",class: "icoEscondeDet",align:"absmiddle"}));

$(".icoEscondeDet").click(escondeExibeDetalhes);

$(".ItemBody").addClass("height100");

})();