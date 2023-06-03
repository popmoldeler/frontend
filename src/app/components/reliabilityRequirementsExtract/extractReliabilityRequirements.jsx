import * as React from "react";
import { criarTextoAcaoEnvio } from "./reabilityInfosToText";
import { criarTextoAcaoRecebimento } from "./reabilityInfosToText";


export default function ExtractReabilityRequirements({
    mission,
    options
}) {
    console.log('missão', mission.mission_processes[2]);
    
    const xmlString =
        mission.mission_processes[2].constituent_process.file_text;

    const source = new DOMParser().parseFromString(xmlString, "text/xml");

    console.log('source', source);

    //Elementos da BPMN do meu trabalho
    
    const sendTask = source.getElementsByTagName("bpmn:sendTask"); //Tarefa de envio;
    const receiveTask = source.getElementsByTagName("bpmn:receiveTask"); //Tarefa de recebimento;
    const serviceTask = source.getElementsByTagName("bpmn:serviceTask"); //Tarefa de serviço;
    const boundaryEvent = source.getElementsByTagName("bpmn:boundaryEvent"); //Evento de borda;
    const errorEventDefinition = source.getElementsByTagName("bpmn:errorEventDefinition"); //Evento de erro;

    const subProcess = source.getElementsByTagName("bpmn:subProcess"); // SUBPROCESSO
    const exclusiveGateway = source.getElementsByTagName("bpmn:exclusiveGateway"); // Desvio exclusive
    const sequenceFlow = source.getElementsByTagName("bpmn:sequenceFlow"); // Rótulos dos fluxos
    const intermediateCatchEvent = source.getElementsByTagName("bpmn:intermediateCatchEvent"); //EV intermediario catch
    const timerEventDefinition = source.getElementsByTagName("bpmn:timerEventDefinition"); //Timer
    const messageEventDefinition = source.getElementsByTagName("bpmn:messageEventDefinition"); //message recebimento
    const manualTask = source.getElementsByTagName("bpmn:manualTask"); // Tarefa manual

    console.log('length', sendTask.length); //Tarefa de envio;                
    console.log('length', receiveTask.length); //Tarefa de recebimento;              
    console.log('length', serviceTask.length); //Tarefa de serviço;              
    console.log('length', boundaryEvent.length); //Evento de borda;           
    console.log('length', errorEventDefinition.length); //Evento de erro; 

    console.log('length', subProcess.length);  // SUBPROCESSO 
    console.log('length', exclusiveGateway.length); // Desvio exclusive
    console.log('length', sequenceFlow.length); // Rótulos dos fluxos
    console.log('length', intermediateCatchEvent.length); //EV intermediario catch
    console.log('length', timerEventDefinition.length);  //Timer
    console.log('length', messageEventDefinition.length); //message recebimento
    console.log('length', manualTask.length); // Tarefa manual

    // ========================================================================== sendTask

    // sendTask BPMN
    const itemsendTask = sendTask.item(0);
    const idsendTask = itemsendTask.attributes.id.value;
    const namesendTask = itemsendTask.attributes.name.value;
    const incomingsendTask = itemsendTask.attributes.incoming.value;
    const outgoingsendTask = itemsendTask.attributes.outgoing.value;
    console.log('idsendTask', idsendTask);
    console.log('namesendTask', namesendTask);
    console.log('incomingsendTask', incomingsendTask);
    console.log('outgoingsendTask', outgoingsendTask);

    //sendTask Source
    const itemIdsendTask = source.getElementById(idsendTask);
    const itemnamesendTask = source.getElementById(namesendTask);
    const itemincomingsendTask = source.getElementById(incomingsendTask);
    const itemoutgoingsendtask = source.getElementById(outgoingsendTask);
    console.log('itemIdsendTask', itemIdsendTask.attributes);
    console.log('itemnamesendTask', itemnamesendTask);
    console.log('itemincomingsendTask',itemincomingsendTask.attributes);
    console.log('itemoutgoingsendtask', itemoutgoingsendtask);

    // ========================================================================== receiveTask

    // receiveTask BPMN
     const itemreceiveTask = receiveTask.item(0);
     const idreceiveTask = itemreceiveTask.attributes.id.value;
     const namereceiveTask = itemreceiveTask.attributes.name.value;
     const incomingreceiveTask = itemreceiveTask.attributes.incoming.value;
     const outgoingreceiveTask = itemreceiveTask.attributes.outgoing.value;
     console.log('idreceiveTask', idreceiveTask);
     console.log('namereceiveTask', namereceiveTask);
     console.log('incomingreceiveTask', incomingreceiveTask);
     console.log('outgoingreceiveTask', outgoingreceiveTask);

     //receiveTask Source
     const itemIdreceiveTask = source.getElementById(idreceiveTask);
     const itemnamereceiveTask = source.getElementById(namereceiveTask);
     const itemincomingreceiveTask = source.getElementById(incomingreceiveTask);
     const itemoutgoingreceiveTask = source.getElementById(outgoingreceiveTask);
     console.log('itemIdreceiveTask', itemIdreceiveTask.attributes);
     console.log('itemnamereceiveTask', itemnamereceiveTask);
     console.log('itemincomingreceiveTask',itemincomingreceiveTask.attributes);
     console.log('itemoutgoingreceiveTask', itemoutgoingreceiveTask);

    // ========================================================================== serviceTask

    // serviceTask BPMN
    const itemserviceTask = serviceTask.item(0);
    const idserviceTask = itemserviceTask.attributes.id.value;
    const nameserviceTask = itemserviceTask.attributes.name.value;
    const incomingserviceTask = itemserviceTask.attributes.incoming.value;
    const outgoingserviceTask = itemserviceTask.attributes.outgoing.value;
    console.log('idserviceTask', idserviceTask);
    console.log('nameserviceTask', nameserviceTask);
    console.log('incomingserviceTask', incomingserviceTask);
    console.log('outgoingserviceTask', outgoingserviceTask);

    //serviceTask Source
    const itemIdserviceTask = source.getElementById(idserviceTask);
    const itemnameserviceTask = source.getElementById(nameserviceTask);
    const itemincomingserviceTask = source.getElementById(incomingserviceTask);
    const itemoutgoingserviceTask = source.getElementById(outgoingserviceTask);
    console.log('itemIdserviceTaskk', itemIdserviceTask.attributes);
    console.log('itemnameserviceTask', itemnameserviceTask);
    console.log('itemincomingserviceTask',itemincomingserviceTask.attributes);
    console.log('itemoutgoingserviceTask', itemoutgoingserviceTask);

    // ========================================================================== boundaryEvent

    // boundaryEvent BPMN
    const itemboundaryEvent = boundaryEvent.item(0);
    const idboundaryEvent = itemboundaryEvent.attributes.id.value;
    const attachedToRefboundaryEvent = itemboundaryEvent.attributes.attachedToRef.value;
    console.log('idboundaryEvent', idboundaryEvent);
    console.log('attachedToRefboundaryEvent', attachedToRefboundaryEvent);

    //boundaryEvent SOURCE 
    const itemIdboundary = source.getElementById(idboundaryEvent);
    console.log('itemIdboundary', itemIdboundary.attributes);
    const itemAttachedToRefboundary = source.getElementById(attachedToRefboundaryEvent);
    console.log('itemAttachedToRefboundary',itemAttachedToRefboundary.attributes);

    // ========================================================================== errorEventDefinition

    // errorEventDefinition BPMN
    const itemErrorEvent = errorEventDefinition.item(0);
    const idErrorEvent = itemErrorEvent.attributes.id.value;
    console.log('idErrorEvent', idErrorEvent);

    //errorEventDefinition SOURCE
    const itemIdErro = source.getElementById(idErrorEvent);
    console.log('itemIdErro', itemIdErro.attributes);
   
};