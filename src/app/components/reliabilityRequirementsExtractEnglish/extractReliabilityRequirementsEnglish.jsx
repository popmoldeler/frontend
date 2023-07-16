import {  criarTextoAcaoEnvio,
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
  } from "./reliabilityInfosToTextEnglish";
  
  
  export default function ExtractReabilityRequirementsEnglish({
      mission,
      options
  }) {
  
   // ================================================== v
  
  // Método auxiliar para descobrir o nome do constituinte de um elemento
  const getConstituent = (item, itemId, origin, process) => {
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
            const participants = origin.getElementsByTagName("bpmn:participant");
            for (var k = 0; k < participants.length; k++) {
                const participant = participants.item(k);
                if (participant.attributes.processRef) {
                    if (participant.attributes.processRef.value === poolId) {
                        return participant.attributes.name.value;
                    }
                }
            }
        }
    }
    return '';
  }
  
  const getActivityByEvent = (flows, event) => {
    let activity = "";
      for (let v of flows) {
        if(v.getAttribute("sourceRef") === event){
          activity = v.getAttribute("targetRef");
           break;
        }
      }
    return activity;
  }
  const getEventStartIdByActivity = (subProcess, idActivity) => {
       for (let v of subProcess) {
        if(v.getAttribute("id") === idActivity){
          let start = v.getElementsByTagName("bpmn:startEvent");
            if (start.length > 0) {      
                  const startEventId = start[0].getAttribute("id");
                  return startEventId;
            }
        }
      }
  }
  
  const getGatwayIdByEventStartId = (flows, startEventId)=> {
    let gatewayId = "";
    for (let v of flows) {
      if(v.getAttribute("sourceRef") === startEventId){
        gatewayId = v.getAttribute("targetRef");         
        break;
      }
    }
    return gatewayId;
  }
  
  const getNameSequenceByGateWay = (flows, gatewayId) => {
  let names = [];
    for (let v of flows) {
      if(v.getAttribute("sourceRef") === gatewayId){
        names.push(v.getAttribute("name"))         
      }
    }
    return names;
  }

  
const getMessageFlowBySource = (flows, source) => {
  let msg = null;
  for (let v of flows) {
    if(v.getAttribute("sourceRef") === source){
      msg = v;
       break;
    }
  }
return msg;
}

  const getMessageFlowByName = (flows, name) => {
		let msg = null;
	  for (let v of flows) {
			if(v.getAttribute("name") === name){
				msg = v;
     		break;
    	}
    }
  return msg;
}

  const getSolutions = (falhas, flows, origin) => {
    let solutions = [];
    
    falhas.map(v => {
      let msg = getMessageFlowByName(flows, v);   
      if(msg){ 
      let isFinal = false;
      let solution = "To " + v;
      let count = 0;
      let target = "";
      
      while(!isFinal || count > 10){
        if (count !== 0) {
          msg = getMessageFlowBySource(flows, target);
        }
        if(msg){ 
            target = msg.getAttribute("targetRef");      	
                  
            //verificar se o target é gateway se for encerra, se nao continua
            if(!target.includes("Gateway")){
              
              //busco o item por id e pego o texto para formar solucao 
              const originItem = origin.getElementById(target);
              let txtSolve = originItem.attributes.name.value;
              
              solution += count === 0 ? ", will be necessary " + txtSolve : " and " + txtSolve;
            } else {
                isFinal = true;
            }
        } else {
          isFinal = true;
        }
        count++;
      }      
      solutions.push(solution);
     }
    });
    
    return solutions;
  }

  // Metodo para verificar o acoplamento de um evento de borda de erro
  const getBoundaryErrorEvent = (item, origin) => {
    const boundaryEvents = origin.getElementsByTagName("bpmn:boundaryEvent");
    const taskNames = [];
  
    for (var i = 0; i < boundaryEvents.length; i++) {
      const boundaryEvent = boundaryEvents.item(i);
      if (boundaryEvent.attributes.attachedToRef.value === item.attributes.id.value) {
        const getErrorEventDefinition = boundaryEvent.getElementsByTagName(
          "bpmn:errorEventDefinition"
        );
        if (getErrorEventDefinition.length === 1) {
          // Obter o nome da tarefa associada
          const taskName = item.attributes.name.value;
          taskNames.push(taskName);
        }
      }
    }
  
    return taskNames;
  };
  
  console.log(mission)
  // Consulta string do arquivo bpmn da visão detalhada da missão
  const xmlString = mission.mission_processes[0].constituent_process.file_text;
      
  // Realiza o parser do texto do arquivo para um htmlcollection
  const origin = new DOMParser().parseFromString(xmlString, "text/xml");

  // Regra para BPMN.IO - Consulta todos messageFlow (pontos de interoperabilidade)
  const messageFlows = origin.getElementsByTagName("bpmn:messageFlow");
  
  // Consulta todo conteúdo interno de uma pool // todas pools que possuem conteúdo são retornadas aqui
  const process = origin.getElementsByTagName("bpmn:process");

  const boundaryEvents = origin.getElementsByTagName("bpmn:boundaryEvent");

  const sequenceFlows= origin.getElementsByTagName("bpmn:sequenceFlow");
  const subProcess = origin.getElementsByTagName("bpmn:subProcess");
  
  // ================================================== v
  // Variável que irá armazenar o texto de todos requisitos de confiabilidade
  const requirements = [];


  for (let boundaryEvent of boundaryEvents) {
    let failMoment = '';
    let messageFlowId = '';
    let confiabilityId = '';
    let destinyPoolConstituent = ''
    let originPoolConstituent = ''
    let fails = [];
    let solution = "";

    const errorEventDefinition = boundaryEvent.getElementsByTagName("bpmn:errorEventDefinition");
    if (errorEventDefinition.length > 0) {      
        const originRef = boundaryEvent.getAttribute("attachedToRef");
        const eventId = boundaryEvent.getAttribute("id");
        const errorId = errorEventDefinition[0].getAttribute("id");
        
        // Recupera o elemento
        const originItem = origin.getElementById(originRef);
        let originName = originItem.attributes.name.value;   
        
        for (let messageFlow of messageFlows) {
          const targetRef = messageFlow.getAttribute("targetRef");
						const sourceRef = messageFlow.getAttribute("sourceRef");
        		if(sourceRef === originRef || targetRef === originRef){							
              messageFlowId = messageFlow.getAttribute("id");

              if(messageFlow.getAttribute("sourceRef") === originRef){
                originPoolConstituent = getConstituent(originItem, originRef, origin, process);                
                const itemDestinyName = messageFlow.getAttribute("targetRef");
                const itemDestiny = origin.getElementById(itemDestinyName);
                destinyPoolConstituent = itemDestinyName.includes("Activity") ? getConstituent(itemDestiny, itemDestinyName, origin, process) : itemDestiny.attributes.name.value;
              } else {              
                const itemDestinyName = messageFlow.getAttribute("sourceRef");
                const itemDestiny = origin.getElementById(itemDestinyName);
                originPoolConstituent = itemDestinyName.includes("Activity") ? getConstituent(itemDestiny, itemDestinyName, origin, process) : itemDestiny.attributes.name.value;
                destinyPoolConstituent = getConstituent(originItem, originRef, origin, process);
              	
              }
						}
        }

        confiabilityId = `${eventId} - ${errorId} - ${originRef}`;
        failMoment = `${originName}`;// (${originRef})`; //com o ${eventId} do tipo ${errorId}`;               
        fails = getNameSequenceByGateWay(sequenceFlows, getGatwayIdByEventStartId(sequenceFlows, getEventStartIdByActivity(subProcess, getActivityByEvent(sequenceFlows, eventId))));
        solution = getSolutions(fails, sequenceFlows, origin);
        let rastreability = ''
        if(originPoolConstituent && destinyPoolConstituent){
          rastreability = `To ${originPoolConstituent} for ${destinyPoolConstituent} at ${originName}`
        }
        // Variável que irá armazenar todas infos textuais do requisito específico do messageFlow, inicializada com campos Defaults
        requirements.push(
          ['Interoperability ID', messageFlowId],
          ['Fault Tolerance ID', confiabilityId],
          ['Class', 'SoS_NFR'],
          ['Subject', 'SoS'],
          ['Source Constituent', originPoolConstituent], 
          ['Destination Constituent', destinyPoolConstituent],          
          ['Moment of failure', failMoment],
          ['Failure(s)', fails.join(",")],
          ['ailure(s) solution', solution.join(". ")],
          ['Textual action', criarTextoAcaoEnvio(originPoolConstituent, destinyPoolConstituent, failMoment, fails, solution)],
          ['Traceability', rastreability],
        );

      // Adiciona marcação para diferenciar visualmente o próximo requisito
      requirements.push(['---------------', '---------------'])  
  
    }  
  }
  
    const getTasksWithBoundaryErrorEvent = (origin) => {
        const sendTasks = origin.getElementsByTagName("bpmn:sendTask");
        const receiveTasks = origin.getElementsByTagName("bpmn:receiveTask");
        const serviceTasks = origin.getElementsByTagName("bpmn:serviceTask");
    
        const tasksWithBoundaryErrorEvent = [];
    
        // Verificar sendTasks
        for (let i = 0; i < sendTasks.length; i++) {
            const sendTask = sendTasks.item(i);
            if (getBoundaryErrorEvent(sendTask, origin)) {
                tasksWithBoundaryErrorEvent.push(sendTask);
            }
        }
    
        // Verificar receiveTasks
        for (let i = 0; i < receiveTasks.length; i++) {
            const receiveTask = receiveTasks.item(i);
            if (getBoundaryErrorEvent(receiveTask, origin)) {
                tasksWithBoundaryErrorEvent.push(receiveTask);
            }
        }
    
        // Verificar serviceTasks
        for (let i = 0; i < serviceTasks.length; i++) {
            const serviceTask = serviceTasks.item(i);
            if (getBoundaryErrorEvent(serviceTask, origin)) {
                tasksWithBoundaryErrorEvent.push(serviceTask);
            }
        }
    
        return tasksWithBoundaryErrorEvent;
    };
  
    //==================================================== 
  
    const extractSubprocessData = (origin) => {
      const subprocesses = origin.getElementsByTagName("bpmn:subProcess");
      const subprocessData = [];
  
      for (let i = 0; i < subprocesses.length; i++) {
          const subprocess = subprocesses.item(i);
          const exclusiveGateway = subprocess.getElementsByTagName("bpmn:exclusiveGateway").item(0);
  
          if (exclusiveGateway) {
              const outgoingSequenceFlows = exclusiveGateway.getElementsByTagName("bpmn:sequenceFlow");
  
              for (let j = 0; j < outgoingSequenceFlows.length; j++) {
                  const sequenceFlow = outgoingSequenceFlows.item(j);
                  const targetRef = sequenceFlow.attributes.targetRef.value;
  
                  const intermediateCatchEvents = subprocess.getElementsByTagName("bpmn:intermediateCatchEvent");
                  const intermediateTimerEvents = subprocess.getElementsByTagName("bpmn:intermediateTimerEvent");
                  const sendTasks = subprocess.getElementsByTagName("bpmn:sendTask");
                  const manualTasks = subprocess.getElementsByTagName("bpmn:manualTask");
  
                  for (let k = 0; k < intermediateCatchEvents.length; k++) {
                      const intermediateCatchEvent = intermediateCatchEvents.item(k);
                      if (intermediateCatchEvent.attributes.id.value === targetRef) {
                          subprocessData.push(intermediateCatchEvent);
                      }
                  }
  
                  for (let k = 0; k < intermediateTimerEvents.length; k++) {
                      const intermediateTimerEvent = intermediateTimerEvents.item(k);
                      if (intermediateTimerEvent.attributes.id.value === targetRef) {
                          subprocessData.push(intermediateTimerEvent);
                      }
                  }
  
                  for (let k = 0; k < sendTasks.length; k++) {
                      const sendTask = sendTasks.item(k);
                      if (sendTask.attributes.id.value === targetRef) {
                          subprocessData.push(sendTask);
                      }
                  }
  
                  for (let k = 0; k < manualTasks.length; k++) {
                      const manualTask = manualTasks.item(k);
                      if (manualTask.attributes.id.value === targetRef) {
                          subprocessData.push(manualTask);
                      }
                  }
              }
          }
      }
  
      return subprocessData;
  };
  
    
  
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