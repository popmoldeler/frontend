import React from 'react';


function criarTextoAcaoEnglish(constituinte_origem, constituinte_destino, momento_falha, tipo_interacao, falha, solucao_falha) {
    const combinedArray = falha.map((fail, index) => {
        return fail + ", then " + solucao_falha[index];
      });

      let tipoAcao = '';
      if (tipo_interacao === 'envio') {
          tipoAcao = 'sending message';
      } else if (tipo_interacao === 'recebimento') {
          tipoAcao = 'receiving message';
      }

    return `During the ${tipoAcao} of ${constituinte_origem} to the ${constituinte_destino}, when ${momento_falha} upon occurrence ${combinedArray.join(" ")}`;
}

export {
    criarTextoAcaoEnglish,
};