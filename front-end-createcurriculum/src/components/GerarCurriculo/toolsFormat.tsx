import { FaBold, FaListOl, FaListUl } from "react-icons/fa"
import { TiposFormatacao, templateTipoFormatacao } from "@/interface/createPdfFile"
import { generateInputOutput } from "@/genericFunctions"
import { GenerateInputOutput } from "@/interface/genericFunctions"

interface Props {
    id: string,
    editando: boolean | undefined,
    visibilidadeCampos: {
        negrito: boolean,
        listaOrdenada: boolean,
        listaNOrdenada: boolean
    },
    functionPrincipal(idCampo: string, valor: string): void,
    functionAlterarView(idCampo: string, salvarDadosInput: boolean): void
}

const tiposFormatacao: TiposFormatacao = {
    NEGRITO: "NEGRITO",
    LISTA_ORDENADA: "LISTA_ORDENADA",
    LISTA_N_ORDENADA: "LISTA_N_ORDENADA"
}


export default function ToolsFormat(props: Props) {

    // if(props.editando) console.log(props)

    function formataValor(tipo: string, idCampo: string): string {

        let valorCaptado = captureValue(idCampo);

        let valorFormatado = "";

        let objetoTipoFormatacao: GenerateInputOutput | undefined = undefined;

        switch (tipo) {
            case tiposFormatacao.NEGRITO:
                objetoTipoFormatacao = generateInputOutput(templateTipoFormatacao.NEGRITO);
                break;

            case tiposFormatacao.LISTA_ORDENADA:
                objetoTipoFormatacao = generateInputOutput(templateTipoFormatacao.LISTA_ORDENADA);
                break;

            case tiposFormatacao.LISTA_N_ORDENADA:
                objetoTipoFormatacao = generateInputOutput(templateTipoFormatacao.LISTA_N_ORDENADA);
                break;
        }

        if (objetoTipoFormatacao) {
            if (valorCaptado.valorSelecionado.includes(objetoTipoFormatacao.input) || valorCaptado.valorSelecionado.includes(objetoTipoFormatacao.output)) {
                let valorVerificacao = valorCaptado.valorSelecionado.split(objetoTipoFormatacao.input);

                valorCaptado.valorSelecionado = valorCaptado.valorSelecionado.replaceAll(objetoTipoFormatacao.input, "");
                valorCaptado.valorSelecionado = valorCaptado.valorSelecionado.replaceAll(objetoTipoFormatacao.output, "");

                if (valorVerificacao[0]) {
                    valorFormatado = objetoTipoFormatacao.input + valorCaptado.valorSelecionado + objetoTipoFormatacao.output
                }
                else {
                    valorFormatado = valorCaptado.valorSelecionado;
                }


            }
            else {
                valorFormatado = objetoTipoFormatacao.input + valorCaptado.valorSelecionado + objetoTipoFormatacao.output
            }
        }


        return valorCaptado.valorOriginal.inicial + valorFormatado + valorCaptado.valorOriginal.final
    }

    function captureValue(idCampo: string) {
        let objetoRetorno = {
            valorOriginal: {
                inicial: "",
                final: "",
            },
            valorSelecionado: ""
        }

        const campo = document.getElementById(idCampo) as HTMLInputElement;

        const inicioSelecao = campo.selectionStart;
        const fimSelecao = campo.selectionEnd;

        if (typeof inicioSelecao === "number" && typeof fimSelecao === "number") {
            objetoRetorno.valorOriginal.inicial = !inicioSelecao ? "" : campo.value.substring(0, inicioSelecao);
            objetoRetorno.valorOriginal.final = campo.value.substring(fimSelecao, campo.value.length);
            objetoRetorno.valorSelecionado = campo.value.substring(inicioSelecao, fimSelecao);
        }

        return objetoRetorno
    }

    return (
        <div className="flex justify-between">
            <div className="flex gap-3 p-2 pl-0 text-2xl">
                {props.visibilidadeCampos.negrito &&
                    <button className="svg-button"
                        title="Negrito"
                        onClick={() => props.functionPrincipal(props.id, formataValor(tiposFormatacao.NEGRITO, props.id))}
                    >
                        <FaBold></FaBold>
                    </button>
                }
                {
                    props.visibilidadeCampos.listaOrdenada &&
                    <button className="svg-button"
                        title="Lista Ordenada"
                        onClick={() => props.functionPrincipal(props.id, formataValor(tiposFormatacao.LISTA_ORDENADA, props.id))}
                    >
                        <FaListOl></FaListOl>
                    </button>
                }
                {
                    props.visibilidadeCampos.listaNOrdenada &&
                    <button className="svg-button"
                        title="Lista Não Ordenada"
                        onClick={() => props.functionPrincipal(props.id, formataValor(tiposFormatacao.LISTA_N_ORDENADA, props.id))}
                    >
                        <FaListUl></FaListUl>
                    </button>
                }
            </div>
            <div className="flex justify-center items-center">
                <button className="miniButton" style={{ visibility: props.editando ? "visible" : "hidden" }}
                    onClick={() => props.functionAlterarView(props.id, true)}>
                    Confirmar Edição
                </button>
            </div>
        </div>
    )
}