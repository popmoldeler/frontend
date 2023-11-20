import React from 'react';

// Ação textual 
function criarTextoAcao(constituinte_origem, constituinte_destino, momento_falha, falha, solucao_falha) {
    const combinedArray = falha.map((fail, index) => {
        return fail + ", então " + solucao_falha[index];
      });
    return `Durante a interoperabilidade do ${constituinte_origem} para o ${constituinte_destino}, quando ${momento_falha} ao ocorrer ${combinedArray.join(" ")}`;
}

export {
    criarTextoAcao
};