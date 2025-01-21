import { dadosInformacao, dadosInformacaoTemplate, PaginaAtual, paginaAtual } from "@/interface/pagesComponents";
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { useState } from "react";
import { realizarCopiaProfunda } from "../../genericFunctions"

interface Props {
    mudarPagina(pagina: keyof PaginaAtual): void
}

export default function TelaInicial(props: Props) {
    const [statusCampos, setStatusCampos] = useState<dadosInformacao>(dadosInformacaoTemplate);

    function alterarStatusCampo(campo: keyof dadosInformacao) {
        const objetoStatusCampo: dadosInformacao = realizarCopiaProfunda(statusCampos);

        objetoStatusCampo[campo] = !statusCampos[campo];

        setStatusCampos(objetoStatusCampo);
    }


    return (
        <div className="w-full h-full flex flex-col justify-between items-center">
            <div id="containerNomePagina" className="flex items-center justify-center w-full flex-col gap-3 mb-10">
                <h1 className="titulo-main text-2xl md:text-5xl"><span>Cr</span>iador de <span>C</span>urrículo</h1>
                <h3 className="titulo-main text-xl md:text-3xl">Facilitando a criação do seu currículo</h3>
            </div>

            <div className="min-w-full">
                <div id="containerDescricao" className="container-main wordColorMain mb-10 w-full">
                    <div className="relative">
                        <h1 className="titulo-campos mb-10">Descrição</h1>

                        <div className="flex align-middle justify-end absolute top-0 right-0">
                            <button onClick={() => { alterarStatusCampo("descricao") }}>
                                {!statusCampos.descricao ?
                                    <FaAngleDown className="text-4xl" /> :
                                    <FaAngleUp className="text-4xl" />
                                }

                            </button>
                        </div>
                    </div>

                    <div>
                        {!statusCampos.descricao &&
                            <div className="flex flex-col gap-5">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, atque vel! Ut officia, commodi quis doloremque similique ea, odit eligendi earum ducimus iusto natus aliquid aut quibusdam ad vero necessitatibus.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, atque vel! Ut officia, commodi quis doloremque similique ea, odit eligendi earum ducimus iusto natus aliquid aut quibusdam ad vero necessitatibus.</p>
                            </div>
                        }
                    </div>
                </div>

                <div id="contatinerInstrucao" className="container-main wordColorMain mb-10 w-full">

                    <div className="relative">
                        <h1 className="titulo-campos mb-10">Instrução</h1>

                        <div className="flex align-middle justify-end absolute top-0 right-0">
                            <button onClick={() => { alterarStatusCampo("instrucao") }}>
                                {statusCampos.instrucao ?
                                    <FaAngleDown className="text-4xl" /> :
                                    <FaAngleUp className="text-4xl" />
                                }

                            </button>
                        </div>
                    </div>

                    <div>
                        {statusCampos.instrucao &&
                            <div className="flex flex-col gap-5">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, atque vel! Ut officia, commodi quis doloremque similique ea, odit eligendi earum ducimus iusto natus aliquid aut quibusdam ad vero necessitatibus.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, atque vel! Ut officia, commodi quis doloremque similique ea, odit eligendi earum ducimus iusto natus aliquid aut quibusdam ad vero necessitatibus.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <button className="buttonMain"
                onClick={() => {
                    props.mudarPagina("paginaGeracaoCurriculo");
                }}>Iniciar</button>
        </div>
    )
}