function formatarTags(valorOriginal, tipoFormatacao) {
  let valorFormatado = "";
  let arrayValores = [];

  if(valorOriginal){
    switch (tipoFormatacao) {
        case "b":
            arrayValores = valorOriginal.split(`{/${tipoFormatacao}}`);
    
            arrayValores.forEach(separacaoInicial => {
                separacaoInicial.split(`{${tipoFormatacao}}`).forEach((separacaoFinal,index) => {
                    if(index === 1){
                        valorFormatado+= separacaoFinal;
                    }
                    if(index === 2){
                        valorFormatado+= `<span style={font-weight: bolder;}>${separacaoFinal}</span>`
                    }
                })
            })
          break;
      }
  }

  return valorFormatado;
}

export default formatarTags;
