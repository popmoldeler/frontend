import React from 'react';


function criarTextoAcaoEnglish(constituinte_origem, constituinte_destino, momento_falha, falha, solucao_falha) {
    const combinedArray = falha.map((fail, index) => {
        return fail + ", then " + solucao_falha[index];
      });
    return `During the interoperability of ${constituinte_origem} to the ${constituinte_destino}, when ${momento_falha} upon occurrence ${combinedArray.join(" ")}`;
}

export {
    criarTextoAcaoEnglish,
};