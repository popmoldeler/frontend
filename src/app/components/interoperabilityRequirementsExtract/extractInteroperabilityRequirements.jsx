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
} from "./interoperabilityInfosToText";

export default function ExtractInteroperabilityRequirements({
    mission,
    options
}) {
    // Método auxiliar para descobrir o nome do constituinte de um elemento
    const getConstituent = (item, itemId, origin, process) => {
        var returnValue = "";
        for (var i = 0; i < process.length; i++) {
            const pool = process.item(i);
            const poolId = pool.attributes.id.value;
            const poolElements = pool.getElementsByTagName(item.tagName);
            // Para cada task da pool, validar se o elemento pertence a ela
            var isHere = false;
            for (var j = 0; j < poolElements.length; j++) {
                const task = poolElements.item(j);
                if (task.attributes.id.value === itemId) {
                    isHere = true;
                    break;
                }
            }
            if (isHere) {
                returnValue = getConstituentAux("bpmn:participant", poolId, origin);

                if (returnValue === "") {
                    returnValue = getConstituentAux("participant", poolId, origin);
                }

                if (returnValue === "") {
                    returnValue = getConstituentAux("bizagi:participant", poolId, origin);
                }
            }
        }
        return returnValue;
    }
    //Método auxiliar para tratar arquivos do bizagi
    const getConstituentAux = (tagName, poolId, origin) => { 
        const participants = origin.getElementsByTagName(tagName);
        for (var k = 0; k < participants.length; k++) {
            const participant = participants.item(k);
            if (participant.attributes.processRef) {
                if (participant.attributes.processRef.value === poolId) {
                    return participant.attributes.name.value;
                }
            }
        }
        return "";
    }

    // Metodo auxiliar para descobrir o nome do Repositorio caso exista
    // Input o repositorio envia dados ao elemento, dados internos, leitura 
    const getDataStoreAssociationInput = (item, origin) => {
        const dataInputAssociation = item.getElementsByTagName("bpmn:dataInputAssociation");
        const dataStores = origin.getElementsByTagName("bpmn:dataStoreReference");
        for (var i = 0; i < dataInputAssociation.length; i++) {
            const targetRef = dataInputAssociation.item(i);
            const repositoryElementId = targetRef.getElementsByTagName("bpmn:targetRef").item(0).textContent;
            for (var j = 0; j < dataStores.length; j++) {
                const dataStore = dataStores.item(j);
                if (dataStore.attributes.id.value === repositoryElementId) {
                    return dataStore.attributes.name.value;
                }
            }
        }
        var returnValue = getDataStoreAssociationInputAux(item, origin, "");
        if (returnValue === "-") {
            returnValue = getDataStoreAssociationInputAux(item, origin, "bizagi:");
        }
        return returnValue;
    }

    //Método auxiliar para tratar arquivos do bizagi
     const getDataStoreAssociationInputAux = (item, origin, prefix) => {
        const dataInputAssociation = item.getElementsByTagName(`${prefix}dataInputAssociation`);
        const dataStores = origin.getElementsByTagName(`${prefix}dataStoreReference`);
        for (var i = 0; i < dataInputAssociation.length; i++) {
            const targetRef = dataInputAssociation.item(i);
            const repositoryElementId = targetRef.getElementsByTagName(`${prefix}targetRef`).item(0).textContent;
            for (var j = 0; j < dataStores.length; j++) {
                const dataStore = dataStores.item(j);
                if (dataStore.attributes.id.value === repositoryElementId) {
                    return dataStore.attributes.name.value;
                }
            }
        }
        return "-";
     }
    
    // Output o repositorio recebe dados do elemento, origem externa, armazenamento
    const getDataStoreAssociationOutput = (item, origin) => {
        const dataOutputAssociation = item.getElementsByTagName("bpmn:dataOutputAssociation");
        const dataStores = origin.getElementsByTagName("bpmn:dataStoreReference");
        for (var i = 0; i < dataOutputAssociation.length; i++) {
            const targetRef = dataOutputAssociation.item(i);
            const repositoryElementId = targetRef.getElementsByTagName("bpmn:targetRef").item(0).textContent;
            for (var j = 0; j < dataStores.length; j++) {
                const dataStore = dataStores.item(j);
                if (dataStore.attributes.id.value === repositoryElementId) {
                    return dataStore.attributes.name.value;
                }
            }
        }
        var returnValue = getDataStoreAssociationOutputAux(item, origin, "");
        if (returnValue === "-") {
            returnValue = getDataStoreAssociationOutputAux(item, origin, "bizagi:");
        }
        return returnValue;
    }

    //Método auxiliar para tratar arquivos do bizagi
    const getDataStoreAssociationOutputAux = (item, origin, prefix) => {
        const dataOutputAssociation = item.getElementsByTagName(`${prefix}dataOutputAssociation`);
        const dataStores = origin.getElementsByTagName(`${prefix}dataStoreReference`);
        for (var i = 0; i < dataOutputAssociation.length; i++) {
            const targetRef = dataOutputAssociation.item(i);
            const repositoryElementId = targetRef.getElementsByTagName(`${prefix}targetRef`).item(0).textContent;
            for (var j = 0; j < dataStores.length; j++) {
                const dataStore = dataStores.item(j);
                if (dataStore.attributes.id.value === repositoryElementId) {
                    return dataStore.attributes.name.value;
                }
            }
        }
        return "-";
    }

    // Metodo auxiliar para descobrir o nome do contrato caso exista / (Input) pois o contrato sempre é lido
    const getDataInput = (item, origin) => {
        const dataAssociation = item.getElementsByTagName("bpmn:dataInputAssociation");
        const dataObjects = origin.getElementsByTagName("bpmn:dataObjectReference");
        for (var i = 0; i < dataAssociation.length; i++) {
            const targetRef = dataAssociation.item(i);
            const repositoryElementId = targetRef.getElementsByTagName("bpmn:sourceRef").item(0).textContent;
            for (var j = 0; j < dataObjects.length; j++) {
                const dataObject = dataObjects.item(j);
                if (dataObject.attributes.id.value === repositoryElementId) {
                    return dataObject.attributes.name.value;
                }
            }
        }
        var returnValue = getDataInputAux(item, origin, "");
        if (returnValue === "") {
            returnValue = getDataInputAux(item, origin, "bizagi:");
        }
        return returnValue;
    }

    //Método auxiliar para tratar arquivos do bizagi
    const getDataInputAux = (item, origin, prefix) => {
        const dataAssociation = item.getElementsByTagName(`${prefix}dataInputAssociation`);
        const dataObjects = origin.getElementsByTagName(`${prefix}dataObjectReference`);
        for (var i = 0; i < dataAssociation.length; i++) {
            const targetRef = dataAssociation.item(i);
            const repositoryElementId = targetRef.getElementsByTagName(`${prefix}sourceRef`).item(0).textContent;
            for (var j = 0; j < dataObjects.length; j++) {
                const dataObject = dataObjects.item(j);
                if (dataObject.attributes.id.value === repositoryElementId) {
                    return dataObject.attributes.name.value;
                }
            }
        }
        return "";
    }

    // Metodo para verificar multiplicidade para definir a quantidade de mensagens
    const getMultiplicity = (item, isParticipant) => {
        var activitySendMultiplicity = '';
        if (isParticipant) {
            activitySendMultiplicity = item.getElementsByTagName("bpmn:participantMultiplicity");
        } else {
            activitySendMultiplicity = item.getElementsByTagName("bpmn:multiInstanceLoopCharacteristics");
        }
        if (activitySendMultiplicity.length === 1) {
            return  "várias mensagens";
        } 
        activitySendMultiplicity = getMultiplicityAux(item, isParticipant, "");
        if (activitySendMultiplicity.length === 1) {
            return  "várias mensagens";
        } 

        activitySendMultiplicity = getMultiplicityAux(item, isParticipant, "bizagi:");
        if (activitySendMultiplicity.length === 1) {
            return  "várias mensagens";
        } 

        return  "uma mensagem";
    }

    //Método auxiliar para tratar arquivos do bizagi
    const getMultiplicityAux = (item, isParticipant, prefix) => {
        var activitySendMultiplicity = '';
        if (isParticipant) {
            activitySendMultiplicity = item.getElementsByTagName(`${prefix}participantMultiplicity`);
        } else {
            activitySendMultiplicity = item.getElementsByTagName(`${prefix}multiInstanceLoopCharacteristics`);
        }
        return activitySendMultiplicity;
    }

    // Metodo para verificar o acoplamento de um evento de borda de tempo
    const getBoundaryTimerEvent = (item, origin) => {
        const boundaryEvents = origin.getElementsByTagName("bpmn:boundaryEvent");
        for (var i = 0; i < boundaryEvents.length; i++) {
            const boundaryEvent = boundaryEvents.item(i);
            if (boundaryEvent.attributes.attachedToRef.value === item.attributes.id.value) {
                const getTimerEventDefinition = boundaryEvent.getElementsByTagName("bpmn:timerEventDefinition");
                if (getTimerEventDefinition.length === 1) {
                    return boundaryEvent.attributes.name.value;
                }
            }
        }
        var returnValue = getBoundaryTimerEventAux(item, origin, "");
        if (returnValue === "-") {
            returnValue = getBoundaryTimerEventAux(item, origin, "bizagi:");
        }
        return returnValue;
    }

    //Método auxiliar para tratar arquivos do bizagi
    const getBoundaryTimerEventAux = (item, origin, prefix) => {
        const boundaryEvents = origin.getElementsByTagName(`${prefix}boundaryEvent`);
        for (var i = 0; i < boundaryEvents.length; i++) {
            const boundaryEvent = boundaryEvents.item(i);
            if (boundaryEvent.attributes.attachedToRef.value === item.attributes.id.value) {
                const getTimerEventDefinition = boundaryEvent.getElementsByTagName(`${prefix}timerEventDefinition`);
                if (getTimerEventDefinition.length === 1) {
                    return boundaryEvent.attributes.name.value;
                }
            }
        }
        return "-";
    }

    // Metodo para verificar o acoplamento de um evento de borda de erro
    const getBoundaryErrorEvent = (item, origin) => {
        const boundaryEvents = origin.getElementsByTagName("bpmn:boundaryEvent");
        for (var i = 0; i < boundaryEvents.length; i++) {
            const boundaryEvent = boundaryEvents.item(i);
            if (boundaryEvent.attributes.attachedToRef.value === item.attributes.id.value) {
                const getTimerEventDefinition = boundaryEvent.getElementsByTagName("bpmn:errorEventDefinition");
                if (getTimerEventDefinition.length === 1) {
                    return true;
                }
            }
        }
        var returnValue = getBoundaryErrorEventAux(item, origin, "");
        if (!returnValue) {
            returnValue = getBoundaryErrorEventAux(item, origin, "bizagi:");
        }
        return returnValue;
    }

    //Método auxiliar para tratar arquivos do bizagi
    const getBoundaryErrorEventAux = (item, origin, prefix) => {
        const boundaryEvents = origin.getElementsByTagName(`${prefix}boundaryEvent`);
        for (var i = 0; i < boundaryEvents.length; i++) {
            const boundaryEvent = boundaryEvents.item(i);
            if (boundaryEvent.attributes.attachedToRef.value === item.attributes.id.value) {
                const getTimerEventDefinition = boundaryEvent.getElementsByTagName(`${prefix}errorEventDefinition`);
                if (getTimerEventDefinition.length === 1) {
                    return true;
                }
            }
        }
        return false;
    }

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
            );

            compactRequirements.push(
                ['ID', messageFlow.attributes.id.value],
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
            var newDataObjectName = '';

            // Primeiramente as infos do elemento que realiza o envio (originRef)
            const originRef = messageFlow.attributes.sourceRef.value;

            // Realiza o split para verificar o tipo de elemento
            const originSplit = originRef.split('_');

            // Recupera o elemento
            const originItem = origin.getElementById(originRef);
            originName = originItem.attributes.name.value;

            if (originSplit[0] == "Id") {
                var newSplit = originItem.tagName.replace(/([A-Z])/g, ' $1').split(" ");
                switch (newSplit[1]) {
                    case 'Task':
                        originSplit[0] = 'Activity';
                        break;
                    default:
                        originSplit[0] = newSplit[1];
                }
            }
        
            // Verifica o tipo de elemento de envio
            switch (originSplit[0]) {
                case 'Activity':
                    // Descobrir constituinte de envio para cada pool executar uma iteracao
                    originPoolConstituent = getConstituent(originItem, originRef, origin, process);
                    // Verificar multiplicidade
                    quantityMessagesSent = getMultiplicity(originItem, false);
                    // Verificar associação com dataObj
                    dataObjectName = getDataInput(originItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            requirements.push(["Restrições de tempo para envio da mensagem", criarTextoRestricaoTempoEnvioMensagem(getBoundaryTimerEvent(originItem, origin))]);
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            requirements.push(["Falha durante o envio da mensagem", (getBoundaryErrorEvent(originItem, origin) ? criarTextoFalhaEnvioMensagem() : "-")]);
                            // Verificar associação com dataStore
                            requirements.push(["Origem dos dados durante o envio da mensagem", criarTextoOrigemDadosDuranteEnvio(getDataStoreAssociationInput(originItem, origin))]);
                            // Impossível possuir fluxo privado para envio
                            requirements.push(["Fluxo de envio de mensagem de modo privado", "-"]);
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
                            requirements.push(["Origem dos dados durante o envio da mensagem", criarTextoOrigemDadosDuranteEnvio(getDataStoreAssociationInput(originItem, origin))]);
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirements.push(["Restrições de tempo para envio da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirements.push(["Falha durante o envio da mensagem", "-"]);
                            // Impossível possuir fluxo privado para envio
                            requirements.push(["Fluxo de envio de mensagem de modo privado", "-"]);
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
                    // Constiuinte de envio é o própio elemento 
                    originPoolConstituent = originItem.attributes.name.value;
                    // Muda o valor da variável para inserção de texto estático no lugar do nome do constiuinte no campo ação
                    isSendPool = true;
                    // Verificar multiplicidade no participante está em uma tag interna então basta fazer o get
                    quantityMessagesSent = getMultiplicity(originItem, true);
                    switch (options) {
                        case 'detailed':
                            // Verificar tipo de piscina, se existir processRef, a piscina tem um fluxo definido, se não, ela é privada
                            if (!originItem.attributes.processRef) {
                                requirements.push(["Fluxo de envio de mensagem de modo privado", criarTextoFluxoEnvioMensagemPrivado()]);
                            } else {
                                requirements.push(["Fluxo de envio de mensagem de modo privado", "-"]);
                            }
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirements.push(["Restrições de tempo para envio da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirements.push(["Falha durante o recebimento da mensagem", "-"]);
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

            // Verifica o tipo de elemento de recebimento
            switch (destinySplit[0]) {
                case 'Activity':
                    // Descobrir constituinte de recebimento
                    destinyPoolConstituent = getConstituent(destinyItem, destinyRef, origin, process);
                    // Verificar multiplicidade
                    quantityMessagesReceive = getMultiplicity(destinyItem, false);
                    // Verificar associação com dataObj
                    newDataObjectName = getDataInput(destinyItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar a existencia de um acoplamento de um Evento de borda tempo
                            requirements.push(["Restrições de tempo para recebimento da mensagem", criarTextoRestricaoTempoRecebimentoMensagem(getBoundaryTimerEvent(destinyItem, origin))]);
                            // Verificar a existencia de um acoplamento de um Evento de borda erro
                            requirements.push(["Falha durante o recebimento da mensagem", (getBoundaryErrorEvent(destinyItem, origin) ? criarTextoFalhaRecebimentoMensagem() : "-")]);
                            // Verificar associação com dataStore
                            requirements.push(["Destino dos dados durante o recebimento da mensagem", criarTextoDestinoDadosDuranteRecebimento(getDataStoreAssociationOutput(destinyItem, origin))]);
                            // Impossível possuir fluxo privado para recebimento
                            requirements.push(["Fluxo de recebimento de mensagem de modo privado", "-"]);
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
                    newDataObjectName = getDataInput(destinyItem, origin);
                    switch (options) {
                        case 'detailed':
                            // Verificar associação com dataStore
                            requirements.push(["Destino dos dados durante o recebimento da mensagem", criarTextoDestinoDadosDuranteRecebimento(getDataStoreAssociationOutput(destinyItem, origin))]);
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirements.push(["Restrições de tempo para recebimento da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirements.push(["Falha durante o recebimento da mensagem", "-"]);
                            // Impossível possuir fluxo privado para recebimento
                            requirements.push(["Fluxo de recebimento de mensagem de modo privado", "-"]);
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
                    // O constituinte é o própio elemento de recebimento
                    destinyPoolConstituent = destinyItem.attributes.name.value;
                    // Verificar multiplicidade no participante está em uma tag interna então basta fazer o get
                    quantityMessagesReceive = getMultiplicity(destinyItem, true);
                    switch (options) {
                        case 'detailed':
                            // Verificar tipo de piscina, se existir processRef, a piscina tem um fluxo definido, se não, ela é privada
                            if (!destinyItem.attributes.processRef) {
                                requirements.push(["Fluxo de recebimento de mensagem de modo privado", criarTextoFluxoRecebimentoMensagemPrivado()]);
                            } else {
                                requirements.push(["Fluxo de recebimento de mensagem de modo privado", "-"]);
                            }
                            // Impossível possuir evento de borda de tempo, então adiciona vazio
                            requirements.push(["Restrições de tempo para recebimento da mensagem", "-"]);
                            // Impossível possuir evento de borda de erro, então adiciona vazio
                            requirements.push(["Falha durante o recebimento da mensagem", "-"]);
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
                    requirements.push(['Quantidade de mensagens enviadas', criarTextoQuantidadeMensagensEnviadas(originPoolConstituent, destinyPoolConstituent, quantityMessagesSent)]);
                    requirements.push(['Quantidade de mensagens recebidas por um mesmo constituinte', criarTextoQuantidadeMensagensRecebidas(originPoolConstituent, destinyPoolConstituent, quantityMessagesReceive)]);
                    requirements.push(['Ação', criarTextoAcao(originPoolConstituent, destinyPoolConstituent, (isSendPool ? "envio de informações (processo de envio independente)" : originName))]);
                    requirements.push(["Condição da interoperabilidade", criarTextoCondicaoInteroperabilidade(dataObjectName)]);
                    requirements.push(['Rastreabilidade', criarTextoRastreabilidade(originSplit[0], originName, destinySplit[0], destinyName)]);
                    // Adiciona marcação para diferenciar visualmente o próximo requisito
                    requirements.push(['---------------', '---------------']);
                    break;
                case 'compact':
                    temporaryCompactInfos["CONDICOES_ENVIO"].push(criarTextoQuantidadeMensagensEnviadas(originPoolConstituent, destinyPoolConstituent, quantityMessagesSent));
                    temporaryCompactInfos["CONDICOES_RECEBIMENTO"].push(criarTextoQuantidadeMensagensRecebidas(originPoolConstituent, destinyPoolConstituent, quantityMessagesReceive));
                    compactRequirements.push(["Condição da interoperabilidade", criarTextoCondicaoInteroperabilidade(dataObjectName)]);
                    compactRequirements.push(['Descrição textual detalhada', criarTextoRequisitoDetalhado(criarTextoAcao(originPoolConstituent, destinyPoolConstituent, (isSendPool ? "envio de informações (processo de envio independente)" : originName)), temporaryCompactInfos)]);
                    compactRequirements.push(['Rastreabilidade', criarTextoRastreabilidade(originSplit[0], originName, destinySplit[0], destinyName)]);
                    // Adiciona marcação para diferenciar visualmente o próximo requisito
                    compactRequirements.push(['---------------', '---------------']);
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