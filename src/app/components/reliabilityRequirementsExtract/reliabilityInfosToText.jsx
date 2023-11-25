import React from 'react';

// Ação textual 
function criarTextoAcao(constituinte_origem, constituinte_destino, momento_falha, tipo_interacao, falha, solucao_falha) {
    const combinedArray = falha.map((fail, index) => {
        return fail + ", então " + solucao_falha[index];
      });

      let tipoAcao = '';
      if (tipo_interacao === 'envio') {
          tipoAcao = 'envio de mensagem';
      } else if (tipo_interacao === 'recebimento') {
          tipoAcao = 'recebimento de mensagem';
      }
  
    return `Durante o ${tipoAcao} do ${constituinte_origem} para o ${constituinte_destino}, quando ${momento_falha} ao ocorrer ${combinedArray.join(" ")}`;
}

export {
    criarTextoAcao
};