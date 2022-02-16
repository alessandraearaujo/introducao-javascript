var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click",function(event) {

    //Previne o comportamento padrão de enviar o formulário e limpar os campos
    event.preventDefault();

    //Criar os parâmetros do paciente no form
    var form = document.querySelector("#form-adiciona");

    //Extrair os dados do paciente no formulário
    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);

    if (erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }

    //Adicionar a linha dentro da tabela
    adicionaPacienteNaTabela(paciente);
    form.reset();

});

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function validaPaciente(paciente) {
    //Array que pode trazer um ou mais erros
    var erros = [];
    if(paciente.nome.length == 0) erros.push("NOME DO PACIENTE é um campo obrigatório");
    if(paciente.peso.length == 0) erros.push("PESO DO PACIENTE é um campo obrigatório");
    if(paciente.altura.length == 0) erros.push("ALTURA DO PACIENTE é um campo obrigatório");
    if((paciente.gordura.length == 0)) erros.push("% DE GORDURA DO PACIENTE é um campo obrigatório");
    if(!validaPeso(paciente.peso)) erros.push("O peso é inválido!");
    if(!validaAltura(paciente.altura)) erros.push("A altura é inválida!");

    return erros;
}

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

