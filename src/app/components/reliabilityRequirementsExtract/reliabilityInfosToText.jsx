import React from 'react';

// Ação textual 
const criarTextoAcao = (origem, destino, momentoFalha, tipoInteracao, falhas, solucoes) => {
    let textoAcao = `Durante o ${tipoInteracao} de mensagem do ${origem} para ${destino}, quando ${momentoFalha}, `;
    
    for (let i = 0; i < falhas.length; i++) {
        textoAcao += `ao ocorrer ${falhas[i]}, então ${solucoes[i]}`;
        if (i !== falhas.length - 1) {
            textoAcao += "; ";
        }
    }
    
    return textoAcao;
};

export {
    criarTextoAcao
};