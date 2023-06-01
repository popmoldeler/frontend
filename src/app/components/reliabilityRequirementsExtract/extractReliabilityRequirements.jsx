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

    //Elementos da BPMN do meu
    
    const sendTask = source.getElementsByTagName("bpmn:sendTask");
    const receiveTask = source.getElementsByTagName("bpmn:receiveTask");
    const serviceTask = source.getElementsByTagName("bpmn:serviceTask");
    const boundaryEvent = source.getElementsByTagName("bpmn:boundaryEvent");
    const errorEventDefinition = source.getElementsByTagName("bpmn:errorEventDefinition");

    console.log('length', sendTask.length);                 // Tarefa de envio;
    console.log('length', receiveTask.length);              //Tarefa de recebimento;
    console.log('length', serviceTask.length);              //Tarefa de serviço;
    console.log('length', boundaryEvent.length);            //Evento de borda;
    console.log('length', errorEventDefinition.length);     //Evento de erro (falha);

    // Const boundaryEvent
    const itemboundaryEvent = boundaryEvent.item(0);
    const idboundaryEvent = itemboundaryEvent.attributes.id.value;
    const attachedToRefboundaryEvent = itemboundaryEvent.attributes.attachedToRef.value;
    console.log('idboundaryEvent', idboundaryEvent);
    console.log('attachedToRefboundaryEvent', attachedToRefboundaryEvent);

    //Source boundaryEvent
    const itemIdboundary = source.getElementById(idboundaryEvent);
    console.log('itemIdboundary', itemIdboundary.attributes);
    const itemAttachedToRefboundary = source.getElementById(attachedToRefboundaryEvent);
    console.log('itemAttachedToRefboundary',itemAttachedToRefboundary.attributes);

    // Const errorEventDefinition
    const itemErrorEvent = errorEventDefinition.item(0);
    const idErrorEvent = itemErrorEvent.attributes.id.value;
    console.log('idErrorEvent', idErrorEvent);

    //Source errorEventDefinition
    const itemIdErro = source.getElementById(idErrorEvent);
    console.log('itemIdErro', itemIdErro.attributes);
   
};