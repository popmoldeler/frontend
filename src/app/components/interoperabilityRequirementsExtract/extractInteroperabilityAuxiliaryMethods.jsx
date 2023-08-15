// Método auxiliar para descobrir o nome do constituinte de um elemento
function getConstituent(item, itemId, origin, process) {
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
function getConstituentAux(tagName, poolId, origin) { 
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
function getDataStoreAssociationInput(item, origin) {
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
function getDataStoreAssociationInputAux(item, origin, prefix) {
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
function getDataStoreAssociationOutput(item, origin) {
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
function getDataStoreAssociationOutputAux(item, origin, prefix) {
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
function getDataInput(item, origin) {
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
function getDataInputAux(item, origin, prefix) {
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
function getMultiplicity(item, isParticipant, englishVersion) {
    var activitySendMultiplicity = '';
    if (isParticipant) {
        activitySendMultiplicity = item.getElementsByTagName("bpmn:participantMultiplicity");
    } else {
        activitySendMultiplicity = item.getElementsByTagName("bpmn:multiInstanceLoopCharacteristics");
    }
    if (activitySendMultiplicity.length === 1) {
        return  englishVersion ? "several messages" : "várias mensagens";
    } 
    activitySendMultiplicity = getMultiplicityAux(item, isParticipant, "");
    if (activitySendMultiplicity.length === 1) {
        return   englishVersion ? "several messages" : "várias mensagens";
    } 

    activitySendMultiplicity = getMultiplicityAux(item, isParticipant, "bizagi:");
    if (activitySendMultiplicity.length === 1) {
        return   englishVersion ? "several messages" : "várias mensagens";
    } 

    return   englishVersion ? "a message" : "uma mensagem";
}

//Método auxiliar para tratar arquivos do bizagi
function getMultiplicityAux(item, isParticipant, prefix) {
    var activitySendMultiplicity = '';
    if (isParticipant) {
        activitySendMultiplicity = item.getElementsByTagName(`${prefix}participantMultiplicity`);
    } else {
        activitySendMultiplicity = item.getElementsByTagName(`${prefix}multiInstanceLoopCharacteristics`);
    }
    return activitySendMultiplicity;
}

// Metodo para verificar o acoplamento de um evento de borda de tempo
function getBoundaryTimerEvent(item, origin) {
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
function getBoundaryTimerEventAux(item, origin, prefix) {
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
function getBoundaryErrorEvent(item, origin) {
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
function getBoundaryErrorEventAux(item, origin, prefix) {
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

export {
    getConstituent,
    getDataStoreAssociationInput,
    getDataStoreAssociationOutput,
    getDataInput,
    getMultiplicity,
    getBoundaryTimerEvent,
    getBoundaryErrorEvent
}