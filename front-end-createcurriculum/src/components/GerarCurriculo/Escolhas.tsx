interface props {
    opcaoEscolhida: string,
    setOpcaoEscolhida(valor: string): void;
}

import "@/style/GerarArquivo.scss"
import Image from "next/image";
import { ChangeEvent } from "react";

function Escolhas(props: props) {

    const valorPadraoOption = "-";

    const constantes = {
        TIPO_1: "Tipo Simples"
    }

    function alterarEscolhaTemplate(event: ChangeEvent<HTMLSelectElement>) {
        const valorEscolhido = event.target.value;
        if (valorEscolhido && valorEscolhido !== props.opcaoEscolhida) {
            props.setOpcaoEscolhida(valorEscolhido === valorPadraoOption ? "" : valorEscolhido);
        }
    }

    return (
        <div className="container-main flex flex-col gap-y-3 mb-10">
            <div>
                <h2 className="titulo-campos">
                    Lista de curriculos
                </h2>
            </div>
            <div className="flex items-center justify-center">
                <select name="selectTipoCurriculo" id="selectTipoCurriculo"
                    value={props.opcaoEscolhida}
                    onChange={(e) => alterarEscolhaTemplate(e)}
                >
                    <option id="1">{valorPadraoOption}</option>
                    <option id="2">{constantes.TIPO_1}</option>
                </select>
            </div>
            <div className="flex items-center justify-center">
                <div className="container-previsualizacao">
                    {props.opcaoEscolhida ?
                        <div className="size-full">
                            <img alt="Imagem do curriculo escolhido" className="size-auto" src="/TemplateCurriculo.jpg" />
                        </div>
                        :
                        <div className="size-full flex items-center justify-center">
                            <h2>Escolha um currículo</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Escolhas;