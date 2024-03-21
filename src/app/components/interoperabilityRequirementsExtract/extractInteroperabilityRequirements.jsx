import {
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
} from "./interoperabilityInfosToText";

import {
    getConstituent,
    getDataStoreAssociationInput,
    getDataStoreAssociationOutput,
    getDataInput,
    getMultiplicity,
    getBoundaryTimerEvent,
    getBoundaryErrorEvent
} from "./extractInteroperabilityAuxiliaryMethods";

export default function ExtractInteroperabilityRequirements({
    mission,
    options,
    popName
}) {
    //Método que executa a extração de requisitos de acordo com o prefixo definido e o tipo de extração
    const runExtract = (origin, prefix) => {    
        // Regra para BPMN.IO - Consulta todos messageFlow (pontos de interoperabilidade)
        var messageFlows = origin.getElementsByTagName(`${prefix}messageFlow`);

        // Consulta todo conteúdo interno de uma pool // todas pools que possuem conteúdo são retornadas aqui
        const process = origin.getElementsByTagName(`${prefix}process`);

        // Cada messageFlow, gera um novo requisito, então executa o foreach para extrair as informações de cada requisito
        for (let messageFlow of messageFlows) {
            // Variável que irá armazenar todas infos textuais do requisito específico do messageFlow, inicializada com campos Defaults
            requirements.push(
                ['ID', messageFlow.attributes.id.value],
                ['Class', 'Interoperability'],
                ['Subject', `SoS - ${popName}`],
            );

            compactRequirements.push(
                ['ID', messageFlow.attributes.id.value],
                ['Class', 'Interoperability'],
                ['Subject', `SoS - ${popName}`],
            );

            var temporaryCompactInfos = {
                'SEND_CONDITIONS': [],
                'RECEIVE_CONDITIONS': [],
            };

            // Variáveis auxiliares para geração de texto
            var originPoolConstituent = '';
            var destinyPoolConstituent = '';
            var quantityMessagesSent = '';
            var quantityMessagesReceive = '';
            var originName = '';
            var destinyName = '';
            var isSendPool = false;
            var dataObjectName = '';
            var messageFlowName = '-'
            if (messageFlow.attributes.hasOwnProperty('name')) {
                messageFlowName = messageFlow.attributes.name.value;
            }

            // Variáveis auxiliares para geração de texto origem
            var textRestrictionTimeSendMessage = '-';
            var textFailSendingMessage = '-';
            var textOriginDataDuringSend = '-';
            var textFlowSendMessagePrivate = '-';

            // Variáveis auxiliares para geração de texto destino
            var textRestrictionTimeReceiptMessage = '-';
            var textFailureReceiptMessage = '-';
            var textDestinationDataDuringReceipt = '-';
            var textFlowReceiptMessagePrivate = '-'
             

            // Primeiramente as infos do elemento que realiza o envio (originRef)
            const originRef = messageFlow.attributes.sourceRef.value;

            // Realiza o split para verificar o tipo de elemento
            const originSplit = originRef.split('_');

            // Recupera o elemento
            const originItem = origin.getElementById(originRef);
            originName = originItem.attributes.name.value;

            if (originSplit[0] == "Id") {
                const newOriginSplit = originItem.tagName.replace(/([A-Z])/g, ' $1').split(" ");
                if(newOriginSplit.length === 1) {
                    originSplit[0] = newOriginSplit[0];
                } else if (newOriginSplit.length === 2) {
                    originSplit[0] = newOriginSplit[1];
                } else if (newOriginSplit.length === 3){
                    originSplit[0] = newOriginSplit[2];
                }
            }
        
            // Verifica o tipo de elemento de envio
            switch (originSplit[0]) {
                case 'Activity':
                case 'Task':
                    // Descobrir constituinte de envio para cada pool executar uma iteracao
                    originPoolConstituent = getConstituent(originItem, originRef, origin, process);
                    // Verificar multiplicidade
                    quantityMessagesSent = getMultiplicity(originItem, false, true);
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(originItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            textRestrictionTimeSendMessage = createTextRestrictionTimeSendMessage(getBoundaryTimerEvent(originItem, origin));                            
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            textFailSendingMessage = getBoundaryErrorEvent(originItem, origin) ? createTextFailSendingMessage() : "-";                            
                            // Verificar associação com dataStore
                            textOriginDataDuringSend = createTextOriginDataDuringSend(getDataStoreAssociationInput(originItem, origin));
                        case 'compact':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            if (getBoundaryTimerEvent(originItem, origin) !== "-") {
                                temporaryCompactInfos["SEND_CONDITIONS"].push(createTextRestrictionTimeSendMessage(getBoundaryTimerEvent(originItem, origin)));
                            }
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            if (getBoundaryErrorEvent(originItem, origin)) {
                                temporaryCompactInfos["SEND_CONDITIONS"].push(getBoundaryErrorEvent(originItem, origin));
                            }
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationInput(originItem, origin) !== "-") {
                                temporaryCompactInfos["SEND_CONDITIONS"].push(createTextOriginDataDuringSend(getDataStoreAssociationInput(originItem, origin)));
                            }
                        default:
                            break;
                    }
                    break;
                case 'Event':
                    // Descobrir constituinte de envio
                    originPoolConstituent = getConstituent(originItem, originRef, origin, process);
                    // Quantidade de mensagens recebidas sempre será 1, pois não tem multiplicidade
                    quantityMessagesSent = "a message";
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(originItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar associação com dataStore
                            textOriginDataDuringSend = createTextOriginDataDuringSend(getDataStoreAssociationInput(originItem, origin))
                            break;
                        case 'compact':
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationInput(originItem, origin) !== "-") {
                                temporaryCompactInfos["SEND_CONDITIONS"].push(createTextOriginDataDuringSend(getDataStoreAssociationInput(originItem, origin)));
                            }
                            break;
                        default:
                            break;
                    }
                
                    break;
                case 'Participant':
                case 'participant':
                    // Constiuinte de envio é o própio elemento 
                    originPoolConstituent = originItem.attributes.name.value;
                    // Muda o valor da variável para inserção de texto estático no lugar do nome do constiuinte no campo ação
                    isSendPool = true;
                    // Verificar multiplicidade no participante está em uma tag interna então basta fazer o get
                    quantityMessagesSent = getMultiplicity(originItem, true, true);
                    switch (options) {
                        case 'detailed':
                            // Verificar tipo de piscina, se existir processRef, a piscina tem um fluxo definido, se não, ela é privada
                            if (!originItem.attributes.processRef) {
                                textFlowSendMessagePrivate = createTextFlowSendMessagePrivate();
                            } 
                            break;
                        case 'compact':
                            if (!originItem.attributes.processRef) {
                                temporaryCompactInfos["SEND_CONDITIONS"].push(createTextFlowSendMessagePrivate());
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        
            // Depois as informações do elemento que realiza o recebimento (destinyRef)
            const destinyRef = messageFlow.attributes.targetRef.value;

            // Realiza o split para verificar o tipo de elemento
            const destinySplit = destinyRef.split('_');
    
            const destinyItem = origin.getElementById(destinyRef);
            destinyName = destinyItem.attributes.name.value;

            if (destinySplit[0] == "Id") {
                const newDestinySplit = destinyItem.tagName.replace(/([A-Z])/g, ' $1').split(" ");
                if(newDestinySplit.length === 1) {
                    destinySplit[0] = newDestinySplit[0];
                } else if (newDestinySplit.length === 2) {
                    destinySplit[0] = newDestinySplit[1];
                } else if (newDestinySplit.length === 3){
                    destinySplit[0] = newDestinySplit[2];
                }
            }

            // Verifica o tipo de elemento de recebimento
            switch (destinySplit[0]) {
                case 'Activity':
                case 'Task':
                    // Descobrir constituinte de recebimento
                    destinyPoolConstituent = getConstituent(destinyItem, destinyRef, origin, process);
                    // Verificar multiplicidade
                    quantityMessagesReceive = getMultiplicity(destinyItem, false, true);
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(destinyItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            textRestrictionTimeReceiptMessage = createTextRestrictionTimeReceiptMessage(getBoundaryTimerEvent(destinyItem, origin));
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            textFailureReceiptMessage = getBoundaryErrorEvent(destinyItem, origin) ? createTextFailureReceiptMessage() : "-";
                            // Verificar associação com dataStore
                            textDestinationDataDuringReceipt = createTextDestinationDataDuringReceipt(getDataStoreAssociationOutput(destinyItem, origin));
                            break;
                        case 'compact':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            if (getBoundaryTimerEvent(destinyItem, origin) !== "-") {
                                temporaryCompactInfos["RECEIVE_CONDITIONS"].push(createTextRestrictionTimeReceiptMessage(getBoundaryTimerEvent(destinyItem, origin)));
                            }
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            if (getBoundaryErrorEvent(destinyItem, origin)) {
                                temporaryCompactInfos["RECEIVE_CONDITIONS"].push((getBoundaryErrorEvent(destinyItem, origin) ? createTextFailureReceiptMessage() : "-"));
                            }
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationOutput(destinyItem, origin) !== "-") {
                                temporaryCompactInfos["RECEIVE_CONDITIONS"].push(createTextDestinationDataDuringReceipt(getDataStoreAssociationOutput(destinyItem, origin)));
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 'Event':
                    // Descobrir constituinte de recebimento
                    destinyPoolConstituent = getConstituent(destinyItem, destinyRef, origin, process);
                    // Quantidade de mensagens recebidas sempre será 1, pois não tem multiplicidade
                    quantityMessagesReceive = "a message";
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(destinyItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar associação com dataStore
                            textDestinationDataDuringReceipt =  createTextDestinationDataDuringReceipt(getDataStoreAssociationOutput(destinyItem, origin));
                            break;
                        case 'compact':
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationOutput(destinyItem, origin) !== "-") {
                                temporaryCompactInfos["RECEIVE_CONDITIONS"].push(createTextDestinationDataDuringReceipt(getDataStoreAssociationOutput(destinyItem, origin)));
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 'Participant':
                case 'participant':
                    // O constituinte é o própio elemento de recebimento
                    destinyPoolConstituent = destinyItem.attributes.name.value;
                    // Verificar multiplicidade no participante está em uma tag interna então basta fazer o get
                    quantityMessagesReceive = getMultiplicity(destinyItem, true, true);
                    switch (options) {
                        case 'detailed':
                            // Verificar tipo de piscina, se existir processRef, a piscina tem um fluxo definido, se não, ela é privada
                            if (!destinyItem.attributes.processRef) {
                                textFlowReceiptMessagePrivate = createTextFlowReceiptMessagePrivate(); 
                            }
                            break;
                        case 'compact':
                            if (!destinyItem.attributes.processRef) {
                                temporaryCompactInfos["RECEIVE_CONDITIONS"].push(createTextFlowReceiptMessagePrivate());
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }

            // Preenchimento dos campos do requisito de acordo com o formato desejado
            switch (options) {
                case 'detailed':
                    requirements.push(
                        ['Action', createTextAction(originPoolConstituent, destinyPoolConstituent, (isSendPool ? "information submission (independent submission process)" : originName))],
                        ["Interoperability-related message information", messageFlowName],
                        ["Interoperability condition", createTextConditionInteroperability(dataObjectName)],
                        ['Number of messages sent', createTextQuantityMessagesSent(originPoolConstituent, destinyPoolConstituent, quantityMessagesSent)],
                        ["Time restrictions for sending the message", textRestrictionTimeSendMessage],
                        ["Origin of the data when sending the message", textOriginDataDuringSend],
                        ["Error while sending the message", textFailSendingMessage],
                        ["Send Message Flow in Private Mode", textFlowSendMessagePrivate],
                        ['Number of messages received by the same constituent', createTextQuantityMessagesReceived(originPoolConstituent, destinyPoolConstituent, quantityMessagesReceive)],
                        ["Time restrictions for receive the message", textRestrictionTimeReceiptMessage],
                        ["Data destination during message reception", textDestinationDataDuringReceipt],
                        ["Error while message receive", textFailureReceiptMessage],
                        ["Receive Message Flow in Private Mode", textFlowReceiptMessagePrivate],
                        ['Traceability', createTextTraceability(originSplit[0], originName, destinySplit[0], destinyName)],
                        ['---------------', '---------------']
                    );
                    break;
                case 'compact':
                    temporaryCompactInfos["SEND_CONDITIONS"].push(createTextQuantityMessagesSent(originPoolConstituent, destinyPoolConstituent, quantityMessagesSent));
                    temporaryCompactInfos["RECEIVE_CONDITIONS"].push(createTextQuantityMessagesReceived(originPoolConstituent, destinyPoolConstituent, quantityMessagesReceive));
                    compactRequirements.push(
                        ["Interoperability-related message information", messageFlowName],
                        ["Interoperability condition", createTextConditionInteroperability(dataObjectName)],
                        ['Detailed textual description', createTextDetailedRequirement(createTextAction(originPoolConstituent, destinyPoolConstituent, (isSendPool ? "information submission (independent submission process)" : originName)), temporaryCompactInfos)],
                        ['Traceability', createTextTraceability(originSplit[0], originName, destinySplit[0], destinyName)],
                        ['---------------', '---------------']
                    );
                    break;
                default:
                    break;
            }
        };
    }

    // Variável que irá armazenar o texto de todos requisitos de interoperabilidade
    var requirements = [];

    var compactRequirements = [];
    // Consulta string do arquivo bpmn da visão detalhada da missão
    const xmlString = mission.detailed_view.file_text;

    // Realiza o parser do texto do arquivo para um htmlcollection
    const origin = new DOMParser().parseFromString(xmlString, "text/xml");
    
    runExtract(origin, "bpmn:");
    runExtract(origin, "bizagi:");
    runExtract(origin, "");
    
    // Retorna o array contendo todos dados para criação do CSV
    switch (options) {
        case 'detailed':
            return requirements;
        case 'compact':
            return compactRequirements;
        default:
            return '';
    }
};