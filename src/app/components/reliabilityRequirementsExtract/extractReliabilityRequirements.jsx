import {criarTextoAcao,
  } from "./reliabilityInfosToText";
  
  
  export default function ExtractReabilityRequirements({
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
      let solution = "Para " + v;
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
              
              solution += count === 0 ? ", será necessário " + txtSolve : " e " + txtSolve;
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
          rastreability = `Do ${originPoolConstituent} para ${destinyPoolConstituent} ao ${originName}`
        }
        // Variável que irá armazenar todas infos textuais do requisito específico do messageFlow, inicializada com campos Defaults
        requirements.push(
          ['ID da Interoperabilidade', messageFlowId],
          ['ID da Tolerância a Falha', confiabilityId],
          ['Constituinte de Origem', originPoolConstituent], 
          ['Constituinte de Destino', destinyPoolConstituent],          
          ['Momento da Falha', failMoment],
          ['Falha(s)', fails.join(",")],
          ['Solução da(s) Falha(s)', solution.join(". ")],
          ['Ação textual', criarTextoAcao(originPoolConstituent, destinyPoolConstituent, failMoment, fails, solution)],
          ['Rastreabilidade', rastreability],
        );

      // Adiciona marcação para diferenciar visualmente o próximo requisito
      requirements.push(['---------------', '---------------'])  
  
    }  
  }
  
                  
  
    return requirements;
  };