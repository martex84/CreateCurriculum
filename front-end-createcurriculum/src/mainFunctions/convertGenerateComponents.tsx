import { generateInputOutput } from "@/genericFunctions";
import { ObjectViewComponentes, templateTipoFormatacao } from "@/interface/createPdfFile";
import { renderToString } from "react-dom/server";

function gerarListaInterna(start: number, tipo: string) {
    const objetoCss = {
        ordenada: {
            listStyle: "decimal",
        },
        nOrdenada: {
            listStyle: "disc"
        }
    }

    const tipoFormatado = Object.keys(templateTipoFormatacao).find((value, index) => {
        const valorFormatado = value as keyof typeof templateTipoFormatacao;

        if (templateTipoFormatacao[valorFormatado] === tipo) {
            return valorFormatado
        }
    })

    if (!tipoFormatado) return;

    let css = {};

    if (tipoFormatado === "LISTA_ORDENADA") {
        Object.assign(css, objetoCss.ordenada);

        return (<ol type="1" start={start} style={css}></ol>)
    }
    else if (tipoFormatado === "LISTA_N_ORDENADA") {
        Object.assign(css, objetoCss.nOrdenada);
        return (<ul style={css}></ul>);
    }
    else return
}

/**
 * 
 * @param start Recebe o número que irá iniciar a contagem da lista
 * @param valorCampo Recebe o valor do campo para gerar a lista
 * @param listaAtual 
 * @returns 
 */
function criacaoLista(start: number, valorCampo: string) {
    const campoInicial = gerarListaInterna(start, valorCampo);

    let valorTratado = renderToString(campoInicial).replaceAll(`</${valorCampo}>`, "");
    valorTratado = valorTratado.replaceAll(`<${valorCampo}>`, "");

    return valorTratado
}


export default function (valorTexto: string) {
    if (!valorTexto) return ("")

    let valorFormatado = valorTexto;
    let valorTemporario = "";


    if (!valorTexto) return "";

    valorFormatado.split("\n").forEach((paragrafo) => {

        if (paragrafo.includes(templateTipoFormatacao.LISTA_N_ORDENADA) || paragrafo.includes(templateTipoFormatacao.LISTA_ORDENADA)) {
            valorTemporario += paragrafo;
            return
        }

        if (!paragrafo) {
            valorTemporario += "</br>"
        }
        else {
            valorTemporario += `<p>${paragrafo}</p>`
        }
    })

    valorFormatado = valorTemporario;
    valorTemporario = "";

    let contagem = {
        atual: 0,
    }

    for (let letra of valorFormatado) {
        let valorInterno = letra;
        if (valorInterno === " ") {
            contagem.atual++

            if (contagem.atual > 1) {
                valorInterno = valorInterno.replace(" ", "&nbsp");
            }
        }

        if (!(valorInterno === " " || valorInterno === "&nbsp") && contagem.atual > 0) contagem.atual = 0;
        valorTemporario += valorInterno;
    }

    if (valorTemporario) {
        valorFormatado = valorTemporario;
    }

    Object.keys(templateTipoFormatacao).forEach((key) => {
        let contagem = 0;

        let valorObjeto = templateTipoFormatacao[key as keyof typeof templateTipoFormatacao];

        let objectSearch = generateInputOutput(valorObjeto);

        if (!(valorFormatado.includes(objectSearch.input) && valorFormatado.includes(objectSearch.output))) {
            return;
        }
        debugger
        switch (valorObjeto) {
            case templateTipoFormatacao.NEGRITO:
                valorTemporario = "";

                valorFormatado.split(objectSearch.input).forEach(input => {
                    if (!input.includes(objectSearch.output)) {
                        valorTemporario += input;
                        return
                    }

                    input.split(objectSearch.output).forEach((output, index) => {
                        if (index === 0) {
                            valorTemporario += renderToString(<span style={{ fontWeight: "bolder" }}>{output}</span>);
                        }
                        else {
                            valorTemporario += output
                        }
                    })
                })

                valorFormatado = valorTemporario;

                break;

            case templateTipoFormatacao.LISTA_ORDENADA:
            case templateTipoFormatacao.LISTA_N_ORDENADA:
                {
                    let listaAtual = "";
                    let campoInicial = undefined;

                    if (valorObjeto === templateTipoFormatacao.LISTA_ORDENADA) {
                        listaAtual = "ol"
                    }
                    else if (valorObjeto === templateTipoFormatacao.LISTA_N_ORDENADA) {
                        listaAtual = "ul"
                    }
                    else return;

                    let arrayLista = valorFormatado.split(objectSearch.input).filter((item) => item);

                    if (!arrayLista) return;

                    if (arrayLista.length === 0) {
                        valorFormatado += criacaoLista(1, valorObjeto);
                    }



                    arrayLista.forEach((input, indexInput) => {
                        const campoLista = renderToString(<li>{"{Alt}"}</li>);
                        let criacaoCampo = "";
                        if (indexInput === 0) {
                            valorFormatado = "";
                        }

                        if (!input.includes(objectSearch.output)) {
                            valorFormatado += input
                            return;
                        }

                        if (contagem === 0) {
                            valorFormatado += criacaoLista(contagem + 1, valorObjeto);
                        }

                        contagem++;

                        const valoresOutput = input.split(objectSearch.output).filter(item => item);

                        valoresOutput.forEach((output, indexOutput) => {
                            if (indexOutput === 0) {
                                valorFormatado += campoLista.replaceAll("{Alt}", output);
                            }
                            else {
                                if (output.includes("</p>") || output.includes("</br>")) {
                                    valorFormatado += `</${listaAtual}>`
                                    contagem = 0;
                                }

                                valorFormatado += output;

                                if (indexInput !== arrayLista.length - 1) {
                                    valorFormatado += criacaoLista(contagem + 1, valorObjeto);
                                }
                            }
                        })

                        if (indexInput === arrayLista.length - 1 && valoresOutput.length === 1) {
                            valorFormatado += `</${listaAtual}>`
                        }

                    })
                }
                break;
        }
    })
    return valorFormatado;
}