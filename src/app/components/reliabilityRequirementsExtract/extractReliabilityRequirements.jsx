import * as React from "react";
import { criarTextoAcaoEnvio } from "./reliabilityInfosToText";

//import React from 'react';
//import { useEffect, useState } from 'react';
//import { parseString } from 'xml2js';


export default function ExtractReabilityRequirements({
    mission,
    options
}) {

  const requirements = [];

  requirements.push(["ID", "TESTE"]);

    console.log('missão', mission.mission_processes[0]);
    
    const xmlString =
        mission.mission_processes[0].constituent_process.file_text;

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
    const itemAttachedToRefboundary = source.getElementById(attachedToRefboundaryEvent);
    console.log('itemIdboundary', itemIdboundary.attributes);
    console.log('itemAttachedToRefboundary',itemAttachedToRefboundary.attributes);

    // ========================================================================== errorEventDefinition

    // errorEventDefinition BPMN
    const itemErrorEvent = errorEventDefinition.item(0);
    const idErrorEvent = itemErrorEvent.attributes.id.value;
    console.log('idErrorEvent', idErrorEvent);

    //errorEventDefinition SOURCE
    const itemIdErro = source.getElementById(idErrorEvent);
    console.log('itemIdErro', itemIdErro.attributes);

    // ========================================================================== sequenceFlow

    // sequenceFlow BPMN
    const itemsequenceFlow = sequenceFlowDefinition.item(0);
    const idsequenceFlow = itemsequenceFlow.attributes.id.value;
    const namesequenceFlow = namesequenceFlow.attributes.name.value;
    const sourceRefsequenceFlow = sourceRefsequenceFlow.attributes.sourceRef.value;
    const targetRefsequenceFlow = targetRefsequenceFlow.attributes.targetRef.value;
    console.log('idsequenceFlow', idsequenceFlow);
    console.log('namesequenceFlow', namesequenceFlow);
    console.log('sourceRefsequenceFlow', sourceRefsequenceFlow);
    console.log('targetRefsequenceFlow', targetRefsequenceFlow);

    // sequenceFlow SOURCE
    const itemidsequenceFlow = source.getElementById(idsequenceFlow);
    const itemnamesequenceFlow = source.getElementById(namesequenceFlow);
    const itemsourceRefsequenceFlow  = source.getElementById(sourceRefsequenceFlow);
    const itemtargetRefsequenceFlow  = source.getElementById(targetRefsequenceFlow);
    console.log('itemidsequenceFlow', itemidsequenceFlow.attributes);
    console.log('itemnamesequenceFlow', itemnamesequenceFlow.attributes);
    console.log('itemsourceRefsequenceFlow', itemsourceRefsequenceFlow.attributes);
    console.log('itemtargetRefsequenceFlow', itemtargetRefsequenceFlow.attributes);

    // ========================================================================== subProcess

    // subProcess BPMN
    const itemsubProcess = subProcess.item(0);
    const idsubProcess = itemsubProcess.attributes.id.value;
    const namesubProcess = itemsubProcess.attributes.name.value;
    const incomingsubProcess = itemsubProcess.attributes.incoming.value;
    const outgoingsubProcessk = itemsubProcess.attributes.outgoing.value;
    console.log('idsubProcess', idsubProcess);
    console.log('namesubProcess', namesubProcess);
    console.log('incomingsubProcess', incomingsubProcess);
    console.log('outgoingsubProcessk', outgoingsubProcessk);

    // subProcess SOURCE
    const itemidsubProcess = source.getElementById(idsubProcess);
    const itemnamesubProcess = source.getElementById(namesubProcess);
    const itemincomingsubProcess  = source.getElementById(incomingsubProcess);
    const itemoutgoingsubProcessk  = source.getElementById(outgoingsubProcessk);

    console.log('itemidsubProcess', itemidsubProcess.attributes);
    console.log('itemnamesubProcess', itemnamesubProcess.attributes);
    console.log('itemincomingsubProcess', itemincomingsubProcess.attributes);
    console.log('itemoutgoingsubProcessk', itemoutgoingsubProcessk.attributes);

    // ================================================== carregar informações de dentro do subProces

    const extractSequenceFlowInformation = () => {
        // Vá até o SubProcess desejado (exemplo: ID do SubProcess = 'subProcessId')
        const subProcess = bpmnData.definitions.process[0].subProcess.find(sub => sub.$.id === 'subProcessId');
    
        if (subProcess) {
          // Vá até o Exclusive Gateway desejado (exemplo: ID do Exclusive Gateway = 'exclusiveGatewayId')
          const exclusiveGateway = subProcess.exclusiveGateway.find(gateway => gateway.$.id === 'exclusiveGatewayId');
    
          if (exclusiveGateway) {
            // Filtra os SequenceFlows conectados ao Exclusive Gateway
            const sequenceFlows = subProcess.sequenceFlow.filter(flow => flow.$.sourceRef === exclusiveGateway.$.id);
    
            sequenceFlows.forEach(sequenceFlow => {
              // Verifica o tipo do elemento de destino
              const destinationType = getElementType(sequenceFlow.$.targetRef);
    
              if (destinationType === 'SendTask' || destinationType === 'ManualTask' || destinationType === 'IntermediateCatchEvent') {
                // Extrai as informações desejadas do SequenceFlow
                const source = sequenceFlow.$.sourceRef;
                const target = sequenceFlow.$.targetRef;
                const name = sequenceFlow.$.name;
    
                console.log('SequenceFlow encontrado:');
                console.log('Source:', source);
                console.log('Target:', target);
                console.log('Name:', name);
              }
            });
          }
        }
      };

      const getElementType = (elementId) => {
        // Obtém o tipo do elemento com base no seu ID (você pode adaptar essa função para mapear seus IDs)
        // Exemplo: Obtém o tipo com base no prefixo do ID (SendTask_, ManualTask_, IntermediateCatchEvent_)
        if (elementId.startsWith('SendTask_')) {
          return 'SendTask';
        } else if (elementId.startsWith('ManualTask_')) {
          return 'ManualTask';
        } else if (elementId.startsWith('IntermediateCatchEvent_')) {
          return 'IntermediateCatchEvent';
        }
    
        return '';
      }    

  return requirements;
};