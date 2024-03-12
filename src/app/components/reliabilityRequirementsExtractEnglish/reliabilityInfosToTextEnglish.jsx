import React from 'react';

// Textual Action
const criarTextoAcaoEnglish = (origin, destination, failureTime, interactionType, failures, solutions) => {
    let actionText = `During the ${interactionType} message from ${origin} to ${destination}, when ${failureTime}, `;
    
    for (let i = 0; i < failures.length; i++) {
        actionText += `when ${failures[i]} occurs, then ${solutions[i]}`;
        if (i !== failures.length - 1) {
            actionText += "; ";
        }
    }
    
    return actionText;
};

export {
    criarTextoAcaoEnglish
};
