import React from 'react';

// SOMENTE ENVIO ****************************************

// Ação textual de envio
function criarTextoAcaoEnvio(constituinte_origem, constituinte_destino, momento_falha_envio, falha_envio, solucao_falha_envio) {
    return `Durante o envio de mensagem do ${constituinte_origem} para o ${constituinte_destino}, 
    quando ${momento_falha_envio} ao ocorrer ${falha_envio}, então ${solucao_falha_envio}`;
}

// Momento para ocorrência da falha durante o envio da mensagem
function criarTextoMomentoFalhaEnvio(momento_falha_envio, tarefa_envio_msg_com_ev_erro){
    return `${momento_falha_envio} é observada pela ${tarefa_envio_msg_com_ev_erro }`;
}

// Quais falhas que ocorrem durante o envio da mensagem
// AQUI PRECISA SER VERIFICADO O subprocesso_tratamento_excecao_envio = Realizar tratamento de exceção de envio
function criarTextoQuaisFalhasEnvio(falha_envio, rotulo_fluxo_sequencia, desvio_exclusivo, subprocesso_tratamento_excecao_envio){
    return `Cada ${falha_envio} é observada por cada ${rotulo_fluxo_sequencia} que sai do ${desvio_exclusivo} 
    do subprocesso cujo rótulo é ${subprocesso_tratamento_excecao_envio}`;
}

// Como resolver as falhas durante o envio da mensagem
// AQUI PRECISA SER VERIFICADO A ** TASK ** = pode ser de vários tipos
function criarTextoComoResolverFalhasEnvio(solucao_falha_envio, ev_interm_temporal, ev_interm_receb_msg, task, falha_envio){
    return `Cada ${solucao_falha_envio} é observada por cada ${ev_interm_temporal}, por cada ${ev_interm_receb_msg} e por cada
    ${task} após cada ${falha_envio}`;
}

//Rastreabilidadede de ENVIO
function CriarTextoRastreabilidadeEnvio(constituinte_origem,constituinte_destino,tarefa_envio_msg_com_ev_erro){
    return `Do ${constituinte_origem} para ${constituinte_destino} na ${tarefa_envio_msg_com_ev_erro}`; 
 }


// SOMENTE RECEBIMENTO ****************************************

// Ação textual de recebimento
function criarTextoAcaoRecebimento(constituinte_origem, constituinte_destino, momento_falha_recebimento, falha_recebimento, solucao_falha_recebimento) {
    return `Durante o recebimento de mensagem do ${constituinte_origem} para o ${constituinte_destino}, 
    quando ${momento_falha_recebimento} ao ocorrer ${falha_recebimento}, então ${solucao_falha_recebimento}`;
}

// Momento para ocorrência de falha durante o recebimento de mensagem Nº 1
function CriarTextoMomentoFalhaRecebimento1(momento_falha_recebimento, tarefa_recebimento_msg_com_ev_erro){
    return `${momento_falha_recebimento} é observa pela ${tarefa_recebimento_msg_com_ev_erro}`;
}

// Momento para ocorrência de falha durante o recebimento de mensagem Nº 2
function CriarTextoMomentoFalhaRecebimento2(momento_falha_recebimento,tarefa_servico_com_ev_erro,ev_interm_receb_msg, ev_inicio_receb_msg){
    return `${momento_falha_recebimento} é observada pela ${tarefa_servico_com_ev_erro}, cujo evento anterior é um
    ${ev_interm_receb_msg} ou ${ev_inicio_receb_msg}`;
}

// Quais falhas que ocorrem durante o recebimento da mensagem
function CriarTextoQuaisFalhasRecebimento (falha_recebimento,rotulo_fluxo_sequencia,desvio_exclusivo,subprocess_tratamento_excecao_recebimento){
    return `Cada ${falha_recebimento} é observada por cada ${rotulo_fluxo_sequencia} que sai do ${desvio_exclusivo} do subprocesso cujo rótulo é ${subprocess_tratamento_excecao_recebimento}`;
}

//Como resolver as falhas durante o recebimento da mensagem
//verificar os tipos de TAKS
function CriarTextoComoResolverFalhasRecebimento(solucao_falha_recebimento,ev_interm_receb_msg,task,falha_recebimento){
    return `Cada ${solucao_falha_recebimento} é observada por cada ${ev_interm_receb_msg} e por cada ${task} após cada ${falha_recebimento}`;
}

//Rastreabilidadede de recebimento
function CriarTextoRastreabilidadeRecebimento(constituinte_destino,constituinte_origem,tarefa_recebimento_msg_com_ev_erro,tarefa_servico_com_ev_erro){
    return `Do ${constituinte_destino} para ${constituinte_origem} na(o) ${tarefa_recebimento_msg_com_ev_erro} ou ${tarefa_servico_com_ev_erro}`;
}

function criarTextoTratamentoExcecaoEnvio() {
    return ``;
}

function criarTextoTratamentoExcecaoRecebimento() {
    return ``;
}

function criarTextoRequisitoConfiabilidadeDetalhado() {
    const textoAcaoEnvio = criarTextoAcaoEnvio();
    const textoAcaoRecebimento = criarTextoAcaoRecebimento();
    const textoTratamentoExcecaoEnvio = criarTextoTratamentoExcecaoEnvio();
    const textoratamentoExcecaoRecebimento = criarTextoTratamentoExcecaoRecebimento();
    return `Para cada ${textoAcaoEnvio} e ${textoAcaoRecebimento}, realizar ${textoTratamentoExcecaoEnvio} e ${textoratamentoExcecaoRecebimento}`;
}

export {
    criarTextoAcaoEnvio,
    criarTextoMomentoFalhaEnvio,
    criarTextoQuaisFalhasEnvio,
    criarTextoComoResolverFalhasEnvio,
    CriarTextoRastreabilidadeEnvio,
    criarTextoAcaoRecebimento,
    CriarTextoMomentoFalhaRecebimento1,
    CriarTextoMomentoFalhaRecebimento2,
    CriarTextoQuaisFalhasRecebimento,
    CriarTextoComoResolverFalhasRecebimento,
    criarTextoTratamentoExcecaoEnvio,
    criarTextoTratamentoExcecaoRecebimento,
    criarTextoRequisitoConfiabilidadeDetalhado
};