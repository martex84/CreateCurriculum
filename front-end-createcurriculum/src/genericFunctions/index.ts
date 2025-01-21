import { GenerateInputOutput } from "@/interface/genericFunctions";

function tratarValueInput(valorOriginal: string | undefined) {
  return valorOriginal ?? "";
}

function generateInputOutput(valor: string): GenerateInputOutput {
  let returnObject = {
    input: `{${valor}}`,
    output: `{/${valor}}`,
  };

  return returnObject;
}

function realizarCopiaProfunda(objeto: object){
  return(JSON.parse(JSON.stringify(objeto)))
}

function salvarValorEmObjeto(objetoOriginal: Record<string, any>, nomeCampo: string, valor: any){
  let valorSalvo = false;
  
  if(!(objetoOriginal && nomeCampo)) throw new Error(`Falha ao tentar localizar o campo [${nomeCampo}] ou o objeto [${JSON.stringify(objetoOriginal)}]`);

  Object.keys(objetoOriginal).forEach(key => {
    if(key === nomeCampo && !valorSalvo){
      objetoOriginal[nomeCampo] = valor;

      valorSalvo = true
    }
  })

  return valorSalvo;
}

export { tratarValueInput, generateInputOutput, realizarCopiaProfunda, salvarValorEmObjeto };
