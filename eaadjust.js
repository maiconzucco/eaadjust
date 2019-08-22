// ==UserScript==
// @namespace https://openuserjs.org/users/maicon.zucco
// @name EA adjust
// @description Ajuste de tamanho das divs exportadas pelo EA
// @copyright 2019, maicon.zucco (https://openuserjs.org/users/maicon.zucco)
// @license MIT
// @version 0.0.2
// @match         http://requisitos.jupiter.co.ao/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @resource      glyphicons http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css
// @resource      googleIcons https://fonts.googleapis.com/icon?family=Material+Icons
// @run-at        document-start
// @grant         GM_getResourceText
// @grant         GM_getResourceURL
// @grant         GM_addStyle
// ==/UserScript== 
// ==OpenUserJS== 
// @author maicon.zucco
// ==/OpenUserJS==
(function () {

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

  css += '.height100 {height: 100% !important;}' +
    '.icoFs{font-size: 15px;}' +
    '.divFont{' +
    'border: black solid 1px;' +
    'margin-bottom: 7px;' +
    'display: table;' +
    '}';

  var newCSS = GM_getResourceText("googleIcons");
  GM_addStyle(newCSS);

  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  }
  else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  }
  else if (typeof addStyle != "undefined") {
    addStyle(css);
  }
  else {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      heads[0].appendChild(node);
    }
    else {
      // no head yet, stick it whereever
      document.documentElement.appendChild(node);
    }
  }

  //var newCSS = GM_getResourceText ("glyphicons");
  //GM_addStyle (newCSS);

  function escondeExibeDetalhes(e) {
    var icone = e.target;
    var detalhes = $(icone).parent().find(".ObjectDetailsNotes:first");

    if ($(detalhes).is(":hidden")) {
      $(detalhes).show();
      $(icone).text("remove");
    }
    else {
      $(detalhes).hide();
      $(icone).text("add");
    }
  }

  function aumentaFonte(e) {
    var icone = e.target;
    var detalhes = $(icone).parent().parent().find(".ObjectDetailsNotes:first");

    var fontSize = parseInt($(detalhes).css('font-size').replace("px", ""));
    console.log(fontSize);
    fontSize++;
    $(detalhes).css('font-size', fontSize + "px");
  }

  function diminuiFonte(e) {
    var icone = e.target;
    var detalhes = $(icone).parent().parent().find(".ObjectDetailsNotes:first");

    var fontSize = parseInt($(detalhes).css('font-size').replace("px", ""));
    console.log(fontSize);
    fontSize--;
    $(detalhes).css('font-size', fontSize + "px");

  }

  $(".ObjectDetailsNotes:first").before($("<i>", {
    class: "icoEscondeDet material-icons",
    text: "remove",
    style: "cursor: default;"
  }).click(escondeExibeDetalhes));

  var divFont = $('<div>', {
      class: "divFont"
    }).append($("<span>", {
      text: "Fonte: ",
      style: "vertical-align:top;"
    }))
    .append($("<i>", {
      class: "icoFs icoMinusFont material-icons",
      text: "remove_circle",
      style: "cursor: default;"
    }).on('click', diminuiFonte))
    .append($("<i>", {
      class: "icoFs icoPlusFont material-icons",
      text: "add_circle",
      style: "cursor: default;"
    }).on('click', aumentaFonte));
  $(".ObjectDetailsNotes").before(divFont);
  $(".ObjectDetailsNotes").css('font-size', '14px');
  $(".ItemBody").addClass("height100");

  console.log($(".ObjectDetailsNotes"));

})();
