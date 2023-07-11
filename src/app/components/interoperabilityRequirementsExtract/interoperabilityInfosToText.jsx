function createTextAction(constituinteOrigem, constituinteDestino, rotuloConstituinteOrigem) {
    return `${constituinteOrigem} should interoperate with ${constituinteDestino} to ${rotuloConstituinteOrigem}`;
}

function createTextConditionInteroperability(rotuloObjetoDados) {
    if (rotuloObjetoDados === "") {
        return "-";
    }
    return `There is an agreement for formalizing the message defined in: ${rotuloObjetoDados}`;
}

function createTextQuantityMessagesSent(constituinteOrigem, constituinteDestino, quantidadeMensagensEnvio) {
    return `${constituinteOrigem} send ${quantidadeMensagensEnvio} to ${constituinteDestino}`;
}

function createTextRestrictionTimeSendMessage(rotuloEventoTempoEnvio) {
     if (rotuloEventoTempoEnvio === "-") {
        return rotuloEventoTempoEnvio;
    }
    return `The message will be sent during ${rotuloEventoTempoEnvio}`;
}

function createTextOriginDataDuringSend(rotuloNomeRepositorioLeitura) {
    if (rotuloNomeRepositorioLeitura === "-") {
        return rotuloNomeRepositorioLeitura;
    }
    return `Data is fetched from a data repository: ${rotuloNomeRepositorioLeitura}`;
}

function createTextFailSendingMessage() {
    return `If a failure occurs during interoperability, message transmission is stopped and error handling is performed.`;
}

function createTextFlowSendMessagePrivate() {
    return `The sending of the message is carried out independently`;
}

function createTextQuantityMessagesReceived(constituinteOrigem, constituinteDestino, quantidadeMensagensRecebimento) {
    return `${constituinteDestino} receive ${quantidadeMensagensRecebimento} from ${constituinteOrigem}`;
}

function createTextRestrictionTimeReceiptMessage(rotuloEventoTempoRecebimento) {
     if (rotuloEventoTempoRecebimento === "-") {
        return rotuloEventoTempoRecebimento;
    }
    return `Message receipt will be performed for ${rotuloEventoTempoRecebimento}`;
}

function createTextDestinationDataDuringReceipt(rotuloNomeRepesitorioArmazenamento) {
    if (rotuloNomeRepesitorioArmazenamento === "-") {
        return rotuloNomeRepesitorioArmazenamento;
    }
    return `Data is stored in a data repository: ${rotuloNomeRepesitorioArmazenamento}`;
}

function createTextFailureReceiptMessage() {
    return `If a failure occurs during interoperability, message reception is stopped and error handling is performed.`;
}

function createTextFlowReceiptMessagePrivate() {
    return `Receiving the message is carried out independently`;
}

function createTextTraceability(tipoElementoOrigem, rotuloConstituinteOrigem, tipoElementoDestino, rotuloConstituinteDestinho) {
    return `${tipoElementoOrigem}(${rotuloConstituinteOrigem})/${tipoElementoDestino}(${rotuloConstituinteDestinho})`;
}

function createTextDetailedRequirement(textoAcao, temporaryCompactInfos) {
    const textoCondicoesEnvio = temporaryCompactInfos['SEND_CONDITIONS'].join(", ");
    const textoCondicoesRecebimento = temporaryCompactInfos['RECEIVE_CONDITIONS'].join(", ");
    return `${textoAcao}, considering for sending that ${textoCondicoesEnvio}; and considering for receive that ${textoCondicoesRecebimento}.`;
}

export {
    createTextAction,
    createTextConditionInteroperability,
    createTextQuantityMessagesSent,
    createTextRestrictionTimeSendMessage,
    createTextOriginDataDuringSend,
    createTextFailSendingMessage,
    createTextFlowSendMessagePrivate,
    createTextQuantityMessagesReceived,
    createTextRestrictionTimeReceiptMessage,
    createTextDestinationDataDuringReceipt,
    createTextFailureReceiptMessage,
    createTextFlowReceiptMessagePrivate,
    createTextTraceability,
    createTextDetailedRequirement,
};