import * as React from "react";

import { criarTextoAcao } from "./interoperabilityInfosToText";

export default function ExtractInteroperabilityRequirements({
    mission,
    options
}) {
    console.log('missão', mission.mission_processes[2]);
    
    const xmlString =
        mission.mission_processes[2].constituent_process.file_text;

    const source = new DOMParser().parseFromString(xmlString, "text/xml");

    console.log('source', source);
    
    const messageFlows = source.getElementsByTagName("bpmn:messageFlow");
    console.log('length', messageFlows.length);

    const firstItem = messageFlows.item(0);
    const sourceRef = firstItem.attributes.sourceRef.value;
    const targetRef = firstItem.attributes.targetRef.value;
    console.log('sourceRef', sourceRef);
    console.log('targetRef', targetRef);

    const sourceItem = source.getElementById(sourceRef);
    console.log('sourceItem', sourceItem.attributes);
    
    const targetItem = source.getElementById(targetRef);
    console.log('targetItem',targetItem.attributes);

};