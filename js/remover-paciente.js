// Selecionar a tabela e adicionar um escutador de evento nela
var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event) {
    // Definir como alvo o pai do elemento que sofreu o duplo clique
    var alvoEvento = event.target;
    var paiDoAlvo = alvoEvento.parentNode;
    paiDoAlvo.remove();
});
