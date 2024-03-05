import {
    criarTextoAcao,
    criarTextoCondicaoInteroperabilidade,
    criarTextoQuantidadeMensagensEnviadas,
    criarTextoRestricaoTempoEnvioMensagem,
    criarTextoOrigemDadosDuranteEnvio,
    criarTextoFalhaEnvioMensagem,
    criarTextoFluxoEnvioMensagemPrivado,
    criarTextoQuantidadeMensagensRecebidas,
    criarTextoRestricaoTempoRecebimentoMensagem,
    criarTextoDestinoDadosDuranteRecebimento,
    criarTextoFalhaRecebimentoMensagem,
    criarTextoFluxoRecebimentoMensagemPrivado,
    criarTextoRastreabilidade,
    criarTextoRequisitoDetalhado,
} from "./interoperabilityInfosToTextPortuguese";

import {
    getConstituent,
    getDataStoreAssociationInput,
    getDataStoreAssociationOutput,
    getDataInput,
    getMultiplicity,
    getBoundaryTimerEvent,
    getBoundaryErrorEvent
} from "./extractInteroperabilityAuxiliaryMethods";

export default function ExtractInteroperabilityRequirementsPortuguesePortuguese({
    mission,
    options
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
            requirementsPortuguese.push(
                ['ID', messageFlow.attributes.id.value],
                ['Classe', 'Interoperabilidade'],
            );

            compactRequirementsPortuguese.push(
                ['ID', messageFlow.attributes.id.value],
                ['Classe', 'Interoperabilidade'],
            );

            var temporaryCompactInfos = {
                'CONDICOES_ENVIO': [],
                'CONDICOES_RECEBIMENTO': [],
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
                    quantityMessagesSent = getMultiplicity(originItem, false, false);
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(originItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            requirementsPortuguese.push(["Restrições de tempo para envio da mensagem", criarTextoRestricaoTempoEnvioMensagem(getBoundaryTimerEvent(originItem, origin))]);
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            requirementsPortuguese.push(["Falha durante o envio da mensagem", (getBoundaryErrorEvent(originItem, origin) ? criarTextoFalhaEnvioMensagem() : "-")]);
                            // Verificar associação com dataStore
                            requirementsPortuguese.push(["Origem dos dados durante o envio da mensagem", criarTextoOrigemDadosDuranteEnvio(getDataStoreAssociationInput(originItem, origin))]);
                            // Impossível possuir fluxo privado para envio
                            requirementsPortuguese.push(["Fluxo de envio de mensagem de modo privado", "-"]);
                        case 'compact':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            if (getBoundaryTimerEvent(originItem, origin) !== "-") {
                                temporaryCompactInfos["CONDICOES_ENVIO"].push(criarTextoRestricaoTempoEnvioMensagem(getBoundaryTimerEvent(originItem, origin)));
                            }
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            if (getBoundaryErrorEvent(originItem, origin)) {
                                temporaryCompactInfos["CONDICOES_ENVIO"].push(getBoundaryErrorEvent(originItem, origin));
                            }
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationInput(originItem, origin) !== "-") {
                                temporaryCompactInfos["CONDICOES_ENVIO"].push(criarTextoOrigemDadosDuranteEnvio(getDataStoreAssociationInput(originItem, origin)));
                            }
                        default:
                            break;
                    }
                    break;
                case 'Event':
                    // Descobrir constituinte de envio
                    originPoolConstituent = getConstituent(originItem, originRef, origin, process);
                    // Quantidade de mensagens recebidas sempre será 1, pois não tem multiplicidade
                    quantityMessagesSent = "uma mensagem";
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(originItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar associação com dataStore
                            requirementsPortuguese.push(["Origem dos dados durante o envio da mensagem", criarTextoOrigemDadosDuranteEnvio(getDataStoreAssociationInput(originItem, origin))]);
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirementsPortuguese.push(["Restrições de tempo para envio da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirementsPortuguese.push(["Falha durante o envio da mensagem", "-"]);
                            // Impossível possuir fluxo privado para envio
                            requirementsPortuguese.push(["Fluxo de envio de mensagem de modo privado", "-"]);
                            break;
                        case 'compact':
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationInput(originItem, origin) !== "-") {
                                temporaryCompactInfos["CONDICOES_ENVIO"].push(criarTextoOrigemDadosDuranteEnvio(getDataStoreAssociationInput(originItem, origin)));
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
                    quantityMessagesSent = getMultiplicity(originItem, true, false);
                    switch (options) {
                        case 'detailed':
                            // Verificar tipo de piscina, se existir processRef, a piscina tem um fluxo definido, se não, ela é privada
                            if (!originItem.attributes.processRef) {
                                requirementsPortuguese.push(["Fluxo de envio de mensagem de modo privado", criarTextoFluxoEnvioMensagemPrivado()]);
                            } else {
                                requirementsPortuguese.push(["Fluxo de envio de mensagem de modo privado", "-"]);
                            }
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirementsPortuguese.push(["Restrições de tempo para envio da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirementsPortuguese.push(["Falha durante o recebimento da mensagem", "-"]);
                            break;
                        case 'compact':
                            if (!originItem.attributes.processRef) {
                                temporaryCompactInfos["CONDICOES_ENVIO"].push(criarTextoFluxoEnvioMensagemPrivado());
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
                    quantityMessagesReceive = getMultiplicity(destinyItem, false, false);
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(destinyItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            requirementsPortuguese.push(["Restrições de tempo para recebimento da mensagem", criarTextoRestricaoTempoRecebimentoMensagem(getBoundaryTimerEvent(destinyItem, origin))]);
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            requirementsPortuguese.push(["Falha durante o recebimento da mensagem", (getBoundaryErrorEvent(destinyItem, origin) ? criarTextoFalhaRecebimentoMensagem() : "-")]);
                            // Verificar associação com dataStore
                            requirementsPortuguese.push(["Destino dos dados durante o recebimento da mensagem", criarTextoDestinoDadosDuranteRecebimento(getDataStoreAssociationOutput(destinyItem, origin))]);
                            // Impossível possuir fluxo privado para recebimento
                            requirementsPortuguese.push(["Fluxo de recebimento de mensagem de modo privado", "-"]);
                            break;
                        case 'compact':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            if (getBoundaryTimerEvent(destinyItem, origin) !== "-") {
                                temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push(criarTextoRestricaoTempoRecebimentoMensagem(getBoundaryTimerEvent(destinyItem, origin)));
                            }
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            if (getBoundaryErrorEvent(destinyItem, origin)) {
                                temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push((getBoundaryErrorEvent(destinyItem, origin) ? criarTextoFalhaRecebimentoMensagem() : "-"));
                            }
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationOutput(destinyItem, origin) !== "-") {
                                temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push(criarTextoDestinoDadosDuranteRecebimento(getDataStoreAssociationOutput(destinyItem, origin)));
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
                    quantityMessagesReceive = "uma mensagem";
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(destinyItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar associação com dataStore
                            requirementsPortuguese.push(["Destino dos dados durante o recebimento da mensagem", criarTextoDestinoDadosDuranteRecebimento(getDataStoreAssociationOutput(destinyItem, origin))]);
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirementsPortuguese.push(["Restrições de tempo para recebimento da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirementsPortuguese.push(["Falha durante o recebimento da mensagem", "-"]);
                            // Impossível possuir fluxo privado para recebimento
                            requirementsPortuguese.push(["Fluxo de recebimento de mensagem de modo privado", "-"]);
                            break;
                        case 'compact':
                            // Verificar associação com dataStore
                            if (getDataStoreAssociationOutput(destinyItem, origin) !== "-") {
                                temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push(criarTextoDestinoDadosDuranteRecebimento(getDataStoreAssociationOutput(destinyItem, origin)));
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
                    quantityMessagesReceive = getMultiplicity(destinyItem, true, false);
                    switch (options) {
                        case 'detailed':
                            // Verificar tipo de piscina, se existir processRef, a piscina tem um fluxo definido, se não, ela é privada
                            if (!destinyItem.attributes.processRef) {
                                requirementsPortuguese.push(["Fluxo de recebimento de mensagem de modo privado", criarTextoFluxoRecebimentoMensagemPrivado()]);
                            } else {
                                requirementsPortuguese.push(["Fluxo de recebimento de mensagem de modo privado", "-"]);
                            }
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirementsPortuguese.push(["Restrições de tempo para recebimento da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirementsPortuguese.push(["Falha durante o recebimento da mensagem", "-"]);
                            break;
                        case 'compact':
                            if (!destinyItem.attributes.processRef) {
                                temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push(criarTextoFluxoRecebimentoMensagemPrivado());
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            // Campos que necessitam informações de envio e recebimento para composição do texto
            switch (options) {
                case 'detailed':
                    requirementsPortuguese.push(['Quantidade de mensagens enviadas', criarTextoQuantidadeMensagensEnviadas(originPoolConstituent, destinyPoolConstituent, quantityMessagesSent)]);
                    requirementsPortuguese.push(['Quantidade de mensagens recebidas por um mesmo constituinte', criarTextoQuantidadeMensagensRecebidas(originPoolConstituent, destinyPoolConstituent, quantityMessagesReceive)]);
                    requirementsPortuguese.push(['Ação', criarTextoAcao(originPoolConstituent, destinyPoolConstituent, (isSendPool ? "envio de informações (processo de envio independente)" : originName))]);
                    requirementsPortuguese.push(["Informação da mensagem relacionada à interoperabilidade", messageFlowName]);
                    requirementsPortuguese.push(["Condição da interoperabilidade", criarTextoCondicaoInteroperabilidade(dataObjectName)]);
                    requirementsPortuguese.push(['Rastreabilidade', criarTextoRastreabilidade(originSplit[0], originName, destinySplit[0], destinyName)]);
                    // Adiciona marcação para diferenciar visualmente o próximo requisito
                    requirementsPortuguese.push(['---------------', '---------------']);
                    break;
                case 'compact':
                    temporaryCompactInfos["CONDICOES_ENVIO"].push(criarTextoQuantidadeMensagensEnviadas(originPoolConstituent, destinyPoolConstituent, quantityMessagesSent));
                    temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push(criarTextoQuantidadeMensagensRecebidas(originPoolConstituent, destinyPoolConstituent, quantityMessagesReceive));
                    compactRequirementsPortuguese.push(["Informação da mensagem relacionada à interoperabilidade", messageFlowName]);
                    compactRequirementsPortuguese.push(["Condição da interoperabilidade", criarTextoCondicaoInteroperabilidade(dataObjectName)]);
                    compactRequirementsPortuguese.push(['Descrição textual detalhada', criarTextoRequisitoDetalhado(criarTextoAcao(originPoolConstituent, destinyPoolConstituent, (isSendPool ? "envio de informações (processo de envio independente)" : originName)), temporaryCompactInfos)]);
                    compactRequirementsPortuguese.push(['Rastreabilidade', criarTextoRastreabilidade(originSplit[0], originName, destinySplit[0], destinyName)]);
                    // Adiciona marcação para diferenciar visualmente o próximo requisito
                    compactRequirementsPortuguese.push(['---------------', '---------------']);
                    break;
                default:
                    break;
            }
        };
    }

    // Variável que irá armazenar o texto de todos requisitos de interoperabilidade
    var requirementsPortuguese = [];

    var compactRequirementsPortuguese = [];
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
            return requirementsPortuguese;
        case 'compact':
            return compactRequirementsPortuguese;
        default:
            return '';
    }
};