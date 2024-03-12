import {criarTextoAcaoEnglish,
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
    let solutionsArray = []; // Array para armazenar as soluções
    
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
            
            solutionsArray.push(txtSolve); // Adiciona a solução ao array
          } else {
            isFinal = true;
          }
        } else {
          isFinal = true;
        }
        count++;
      }
      
      // Formata as soluções
      solution += ", then " + solutionsArray.slice(0, -1).join(", ") + (solutionsArray.length > 1 ? " and " : "") + solutionsArray[solutionsArray.length - 1];
      
      solutions.push(solution);
    }
  });
  
  return solutions;
}

const getResolutionsForProblems = (falhas, flows, origin) => {
  let SolutionsForFailures = [];
  
  falhas.map(v => {
    let msg = getMessageFlowByName(flows, v);   
    if(msg){ 
    let isFinal = false;
    let solution = "";
    let count = 0;
    let target = "";
    let solutionsArray = []; // Array para armazenar as soluções
    
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
            
            solutionsArray.push(txtSolve); // Adiciona a solução ao array
          } else {
              isFinal = true;
          }
      } else {
        isFinal = true;
      }
      count++;
    }      
    
    // Formata as soluções
    solution = solutionsArray.slice(0, -1).join(", ") + (solutionsArray.length > 1 ? " and " : "") + solutionsArray[solutionsArray.length - 1];
    
    SolutionsForFailures.push(solution);
   }
  });
  
  return SolutionsForFailures;
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
  
    return taskNames;
  };
  
  console.log(mission)
  // Consulta string do arquivo bpmn da visão detalhada da missão
  const xmlString = mission.detailed_view.file_text;
      
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
          //['Class', 'SoS_NFR'],
          //['Subject', 'SoS'],
          ['Source Constituent', originPoolConstituent], 
          ['Target Constituent', destinyPoolConstituent],          
          ['Moment of failure', failMoment],
          ['Failure(s)', fails.join(",")],
          ['Failure(s) solution', solution.join(". ")],
          ['Textual action', criarTextoAcaoEnvio(originPoolConstituent, destinyPoolConstituent, failMoment, fails, solution)],
          ['Traceability', rastreability],
        );

      // Adiciona marcação para diferenciar visualmente o próximo requisito
      requirements.push(['---------------', '---------------'])  
  
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
  let solutionForFailures = "";

  const attachedToRef = boundaryEvent.attributes.attachedToRef.value;
  const attachedToElement = origin.getElementById(attachedToRef);

  // Verificar se o elemento associado é do tipo 'serviceTask'
  if (attachedToElement.tagName === 'bpmn:serviceTask') {
      // Se for uma 'serviceTask', pule para a próxima iteração do loop
      continue;
  }

  // Verificar se o elemento associado é do tipo 'userTask'
  if (attachedToElement.tagName === 'bpmn:userTask') {
    // Se for uma 'userTask', pule para a próxima iteração do loop
    continue;
  }

  // Verificar se o elemento associado é do tipo 'manualTask'
  if (attachedToElement.tagName === 'bpmn:manualTask') {
  // Se for uma 'manualTask', pule para a próxima iteração do loop
  continue;
  }

  // Verificar se o elemento associado é do tipo 'businessRuleTask'
  if (attachedToElement.tagName === 'bpmn:businessRuleTask') {
    // Se for uma 'businessRuleTask', pule para a próxima iteração do loop
    continue;
  }

  // Verificar se o elemento associado é do tipo 'scriptTask'
  if (attachedToElement.tagName === 'bpmn:scriptTask') {
    // Se for uma 'scriptTask', pule para a próxima iteração do loop
    continue;
  }

  // Verificar se o elemento associado é do tipo 'callActivity'
  if (attachedToElement.tagName === 'bpmn:callActivity') {
    // Se for uma 'callActivity', pule para a próxima iteração do loop
    continue;
  }

  // Adicionado condição para verificar se é uma 'sendTask' ou 'receiveTask'
  if (
    attachedToElement.tagName === "bpmn:sendTask" ||
    attachedToElement.tagName === "bpmn:receiveTask"
  ) {
    // Verifica se há uma associação de interoperabilidade (messageFlow) entre a tarefa e outros elementos
    const hasMessageFlow = Array.from(messageFlows).some((messageFlow) => {
      const sourceRef = messageFlow.getAttribute("sourceRef");
      const targetRef = messageFlow.getAttribute("targetRef");
      return sourceRef === attachedToRef || targetRef === attachedToRef;
    });

    if (!hasMessageFlow) {
      // Se não houver associação de interoperabilidade, pule para a próxima iteração do loop
      continue;
    }
  }

  const errorEventDefinition = boundaryEvent.getElementsByTagName("bpmn:errorEventDefinition");
  if (errorEventDefinition.length > 0) {      
      const originRef = boundaryEvent.getAttribute("attachedToRef");
      const eventId = boundaryEvent.getAttribute("id");
      const errorId = errorEventDefinition[0].getAttribute("id");

      const tipo_interacao = isSendTask(attachedToElement) ? 'sending' : 'receiving';

      // Função auxiliar para verificar se o elemento é um 'sendTask'
      // Se for diferente, será recebimento
      function isSendTask(element) {
        return element.tagName === 'bpmn:sendTask';
      }
      
      // Recupera o elemento
      const originItem = origin.getElementById(originRef);
      let originName = originItem.attributes.name.value;   
      
      for (let messageFlow of messageFlows) {
        const targetRef = messageFlow.getAttribute("targetRef");
        const sourceRef = messageFlow.getAttribute("sourceRef");
      
        if (sourceRef === originRef || targetRef === originRef) {
          messageFlowId = messageFlow.getAttribute("id");
      
          if (messageFlow.getAttribute("sourceRef") === originRef) {
            originPoolConstituent = getConstituent(originItem, originRef, origin, process);
      
            const itemDestinyName = messageFlow.getAttribute("targetRef");
            const itemDestiny = origin.getElementById(itemDestinyName);
      
            // Verificar se é um evento de início, intermediário de recebimento, envio ou fim de envio
            if (itemDestiny.tagName === "bpmn:startEvent" || itemDestiny.tagName === "bpmn:intermediateCatchEvent") {
              // Obter o "participant" associado ao evento de início ou intermediário de recebimento
              destinyPoolConstituent = getConstituent(itemDestiny, itemDestinyName, origin, process);
            } else if (itemDestiny.tagName === "bpmn:intermediateThrowEvent") {
              // Obter o "participant" associado ao evento intermediário de envio de mensagem
              destinyPoolConstituent = getConstituent(itemDestiny, itemDestinyName, origin, process);
            } else if (itemDestiny.tagName === "bpmn:endEvent") {
              // Obter o "participant" associado ao evento de fim de envio de mensagem
              destinyPoolConstituent = getConstituent(itemDestiny, itemDestinyName, origin, process);
            } else {
              destinyPoolConstituent = itemDestinyName.includes("Activity") ? getConstituent(itemDestiny, itemDestinyName, origin, process) : itemDestiny.attributes.name.value;
            }
          } else {
            const itemDestinyName = messageFlow.getAttribute("sourceRef");
            const itemDestiny = origin.getElementById(itemDestinyName);
      
            // Verificar se é um evento de início, intermediário de recebimento, envio ou fim de envio
            if (itemDestiny.tagName === "bpmn:startEvent" || itemDestiny.tagName === "bpmn:intermediateCatchEvent") {
              // Obter o "participant" associado ao evento de início ou intermediário de recebimento
              originPoolConstituent = getConstituent(itemDestiny, itemDestinyName, origin, process);
            } else if (itemDestiny.tagName === "bpmn:intermediateThrowEvent") {
              // Obter o "participant" associado ao evento intermediário de envio de mensagem
              originPoolConstituent = getConstituent(itemDestiny, itemDestinyName, origin, process);
            } else if (itemDestiny.tagName === "bpmn:endEvent") {
              // Obter o "participant" associado ao evento de fim de envio de mensagem
              originPoolConstituent = getConstituent(itemDestiny, itemDestinyName, origin, process);
            } else {
              originPoolConstituent = itemDestinyName.includes("Activity") ? getConstituent(itemDestiny, itemDestinyName, origin, process) : itemDestiny.attributes.name.value;
            }
      
            destinyPoolConstituent = getConstituent(originItem, originRef, origin, process);
              
            }
          }
      }

      confiabilityId = `${eventId} - ${errorId} - ${originRef}`;
      failMoment = `${originName}`;// (${originRef})`; //com o ${eventId} do tipo ${errorId}`;               
      fails = getNameSequenceByGateWay(sequenceFlows, getGatwayIdByEventStartId(sequenceFlows, getEventStartIdByActivity(subProcess, getActivityByEvent(sequenceFlows, eventId))));
      solution = getSolutions(fails, sequenceFlows, origin);
      solutionForFailures = getResolutionsForProblems(fails, sequenceFlows, origin);
      let rastreability = ''
      if(originPoolConstituent && destinyPoolConstituent){
        rastreability = `From ${originPoolConstituent} to ${destinyPoolConstituent} when ${originName}`
      }

      // Verifica se há falhas e soluções disponíveis
      //const failsText = fails.length > 0 ? fails.join(",") : "Falha(s) não especificadas";
      //const solutionText = solution.length > 0 ? solution.join(". ") : "Soluções não especificadas";

       // Adiciona apenas se houver falhas ou soluções
       if (fails.length > 0 || solution.length > 0) {
        // Organiza os requisitos com base no tipo de interação (envio ou recebimento)
        const momentoFalha = `Moment for failure occurrence during the ${tipo_interacao} message`;
        const falhas = `Which failures occur during the ${tipo_interacao} message`;
        const solucaoFalhas = `How to resolve failures during the ${tipo_interacao} message`;
        const rastreabilidade = `Traceability`;

        const formatarListaDeFalhas = (fails) => {
          if (fails.length === 0) {
            return "No faults identified";
          } else if (fails.length === 1) {
            return fails[0];
          } else {
            const listaDeFalhas = fails.slice(0, -1).join(", ") + " e " + fails.slice(-1);
            return listaDeFalhas;
          }
        };

        const formatarListaDeSolucoes = (solutions) => {
        if (solutions.length === 0) {
          return "No solution identified";
        } else if (solutions.length === 1) {
          return solutions[0];
        } else {
          const listaDeSolucoes = solutions.join(". ");
          return listaDeSolucoes;
        }
      };


      // Variável que irá armazenar todas infos textuais do requisito específico do messageFlow, inicializada com campos Defaults
      requirements.push(
        ['ID', '---'],
        ['Class', 'Fault Tolerance'],
        ['Subject', '---'],
        ['Source Constituent', originPoolConstituent], 
        ['Target Constituent', destinyPoolConstituent],   
        [momentoFalha, failMoment],
        [falhas, formatarListaDeFalhas(fails)],
        [solucaoFalhas, formatarListaDeSolucoes (solution)],
        ['Action', criarTextoAcaoEnglish(originPoolConstituent, destinyPoolConstituent, failMoment, tipo_interacao, fails, solutionForFailures)],         
        [rastreabilidade, rastreability],
      );

    // Adiciona marcação para diferenciar visualmente o próximo requisito
    requirements.push(['------------------------------------------------------------------------------------------', '------------------------------------------------------------------------------------------'])  

  }  
}
}
                

  return requirements;
};