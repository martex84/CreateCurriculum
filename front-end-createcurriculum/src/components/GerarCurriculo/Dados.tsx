
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { ObjectParameter, ObjectValues, ObjectViewComponentes, templateIdCampos, templateObjectParameter, templateObjectViewComponentes, templateValueInputAtual, ValueInputAtual } from "@/interface/createPdfFile"
import { realizarCopiaProfunda, salvarValorEmObjeto, tratarValueInput } from "@/genericFunctions";
import ToolsFormat from "./toolsFormat";
import HTMLReactParser from "html-react-parser/lib/index";
import convertGenerateComponents from "@/mainFunctions/convertGenerateComponents";
import { useRef } from "react";

interface Props {
    opcaoEscolhida: string,
    parteAtualPreenchimento: number,
    setParteAtualPreenchimento(numero: number): void,
    setDadosSalvos(ObjectValues: ObjectValues): void,
    getDadosSalvos: ObjectValues
}

interface DadosInterfaceInput {
    objetoInterno: ObjectViewComponentes,
    copiaDadosSalvos: ObjectValues
}


function Dados(props: Readonly<Props>) {

    const constantes = {
        TIPO_1: "Tipo Simples"
    }

    const camposRef = {
        inputNome: useRef<HTMLInputElement | null>(null),
        textAreaFormacaoAcademica: useRef<HTMLTextAreaElement | null>(null),
        textAreaResumoProfissional: useRef<HTMLTextAreaElement | null>(null),
        inputIdiomas: useRef<HTMLInputElement | null>(null),
        textAreaCompetencias: useRef<HTMLTextAreaElement | null>(null),
        textAreaHistoricoProfissional: useRef<HTMLTextAreaElement | null>(null),
        textAreaCertificacoes: useRef<HTMLTextAreaElement | null>(null),
        inputTelefone: useRef<HTMLInputElement | null>(null),
        inputEmail: useRef<HTMLInputElement | null>(null),
        inputLinkdin: useRef<HTMLInputElement | null>(null),
    }

    function realizarCopiaInternaObjectValues(): DadosInterfaceInput {
        let objetoInterno: ObjectViewComponentes = { ...templateObjectViewComponentes };
        let copiaDadosSalvos: ObjectValues = { ...props.getDadosSalvos };

        return realizarCopiaProfunda({
            objetoInterno,
            copiaDadosSalvos
        });
    }

    function salvarDadosInputAtual(idCampo: string) {
        let copiaObjeto = realizarCopiaProfunda(props.getDadosSalvos) as ObjectValues;

        if (copiaObjeto.ValueInputAtual === undefined) copiaObjeto.ValueInputAtual = { ...templateValueInputAtual };

        if (copiaObjeto.objectParameter === undefined) copiaObjeto.objectParameter = { ...templateObjectParameter }

        const nomeInputSalvo = copiaObjeto.ValueInputAtual.nomeInput;

        if (nomeInputSalvo === undefined || nomeInputSalvo !== idCampo) {
            try {
                const documentoAtual = camposRef[idCampo as keyof typeof camposRef];

                if (!documentoAtual.current) return;

                let nomeCampo: string = ""

                let copiaId = realizarCopiaProfunda(templateIdCampos) as Record<string, any>;

                Object.keys(copiaId).forEach((key) => {
                    if (copiaId[key] === nomeInputSalvo) {
                        nomeCampo = key;
                    }
                })

                type idCampoType = typeof templateObjectParameter;

                if (nomeInputSalvo && nomeInputSalvo !== idCampo) {
                    const dadosObjectParameter = props.getDadosSalvos?.objectParameter

                    type typeIdCampo = keyof ObjectParameter;

                    if (!dadosObjectParameter) return;

                    let valorEncontrado = false;

                    if (!salvarValorEmObjeto(copiaObjeto.objectParameter, nomeCampo, copiaObjeto.ValueInputAtual.valorAnteriorInput)) {
                        if (!salvarValorEmObjeto(copiaObjeto.objectParameter.contato, nomeCampo, copiaObjeto.ValueInputAtual.valorAnteriorInput)) throw new Error("Falha ao tentar salvar os dados do campo")
                    }

                    props.setDadosSalvos(copiaObjeto)
                }
            } catch (error) {
                console.error(error)
            }
        }

    }

    function inverterValoresView(idCampos: string, salvarDadosInput?: boolean) {
        let objetoPrincipal = realizarCopiaInternaObjectValues();

        let objetoInterno = objetoPrincipal.objetoInterno;
        let copiaDadosSalvos = objetoPrincipal.copiaDadosSalvos;
        let copiaInputValor: ValueInputAtual = { ...templateValueInputAtual };
        let valorCaptado;

        switch (idCampos) {
            case templateIdCampos.certificacoes:
                objetoInterno.certificacoes = !copiaDadosSalvos.objectViewComponentes?.certificacoes;
                valorCaptado = copiaDadosSalvos.objectParameter?.certificacoes;

                break;
            case templateIdCampos.competencias:
                objetoInterno.compotencias = !copiaDadosSalvos.objectViewComponentes?.compotencias;
                valorCaptado = copiaDadosSalvos.objectParameter?.compotencias;

                break;
            case templateIdCampos.formacaoAcademica:
                objetoInterno.formacaoAcademica = !copiaDadosSalvos.objectViewComponentes?.formacaoAcademica;
                valorCaptado = copiaDadosSalvos.objectParameter?.formacaoAcademica;

                break;
            case templateIdCampos.historicoProfissinal:
                objetoInterno.historicoProfissinal = !copiaDadosSalvos.objectViewComponentes?.historicoProfissinal;
                valorCaptado = copiaDadosSalvos.objectParameter?.historicoProfissinal;

                break;
            case templateIdCampos.idiomas:
                objetoInterno.idiomas = !copiaDadosSalvos.objectViewComponentes?.idiomas;
                valorCaptado = copiaDadosSalvos.objectParameter?.idiomas;

                break;
            case templateIdCampos.resumoProfissional:
                objetoInterno.resumoProfissional = !copiaDadosSalvos.objectViewComponentes?.resumoProfissional;
                valorCaptado = copiaDadosSalvos.objectParameter?.resumoProfissional;

                break;
            case templateIdCampos.nome:
                objetoInterno.nome = !copiaDadosSalvos.objectViewComponentes?.nome;
                valorCaptado = copiaDadosSalvos.objectParameter?.nome

                break;
            case templateIdCampos.numero:
                if (objetoInterno.contato) {
                    objetoInterno.contato.numero = !copiaDadosSalvos.objectViewComponentes?.contato?.numero;
                    valorCaptado = copiaDadosSalvos.objectParameter?.contato.numero;

                }
                break;
            case templateIdCampos.email:
                if (objetoInterno.contato) {
                    objetoInterno.contato.email = !copiaDadosSalvos.objectViewComponentes?.contato?.email;
                    valorCaptado = copiaDadosSalvos.objectParameter?.contato.email;

                }
                break;
            case templateIdCampos.linkdin:
                if (objetoInterno.contato) {
                    objetoInterno.contato.linkdin = !copiaDadosSalvos.objectViewComponentes?.contato?.linkdin;
                    valorCaptado = copiaDadosSalvos.objectParameter?.contato.linkdin;

                }
                break;
        }

        copiaDadosSalvos.objectViewComponentes = objetoInterno;


        if (salvarDadosInput) {
            copiaInputValor.nomeInput = idCampos;
            copiaInputValor.valorAnteriorInput = valorCaptado;

            copiaDadosSalvos.ValueInputAtual = copiaInputValor;
        }

        props.setDadosSalvos(copiaDadosSalvos);
    }

    function salvaValores(idCampos: string, valor: string, salvarValorInput?: boolean) {
        let objetoInterno: ObjectParameter = { ...templateObjectParameter };
        let copiaDadosSalvos: ObjectValues = { ...props.getDadosSalvos };

        if (props.getDadosSalvos.objectParameter) {
            if (Object.keys(props.getDadosSalvos.objectParameter).length > 0) {
                objetoInterno = { ...props.getDadosSalvos.objectParameter };
            }
        }

        switch (idCampos) {
            case templateIdCampos.nome:
                objetoInterno.nome = valor;
                break;

            case templateIdCampos.certificacoes:
                objetoInterno.certificacoes = valor;
                break;

            case templateIdCampos.competencias:
                objetoInterno.compotencias = valor;
                break;

            case templateIdCampos.formacaoAcademica:
                objetoInterno.formacaoAcademica = valor;
                break;

            case templateIdCampos.historicoProfissinal:
                objetoInterno.historicoProfissinal = valor;
                break;

            case templateIdCampos.resumoProfissional:
                objetoInterno.resumoProfissional = valor;
                break;

            case templateIdCampos.idiomas:
                objetoInterno.idiomas = valor;
                break;
            case templateIdCampos.numero:
                objetoInterno.contato.numero = valor;
                break;
            case templateIdCampos.email:
                objetoInterno.contato.email = valor;
                break;
            case templateIdCampos.linkdin:
                objetoInterno.contato.linkdin = valor;
                break;
        }

        copiaDadosSalvos.objectParameter = objetoInterno;

        props.setDadosSalvos(copiaDadosSalvos);
    }

    function escolheCampo() {
        let camposRetorno = [];

        switch (props.opcaoEscolhida) {
            case constantes.TIPO_1:
                camposRetorno.push(
                    <div key={0}>
                        <div className="flex-col gap-y-4" style={props.parteAtualPreenchimento === 1 ? { display: "flex" } : { display: "none" }}>
                            <div className="flex flex-col gap-y-4">
                                <div>
                                    <ToolsFormat
                                        id={templateIdCampos.numero}
                                        functionPrincipal={salvaValores}
                                        editando={props.getDadosSalvos.objectViewComponentes?.contato?.numero}
                                        functionAlterarView={inverterValoresView}
                                        visibilidadeCampos={{
                                            listaOrdenada: false,
                                            negrito: true,
                                            listaNOrdenada: false
                                        }}
                                    />

                                    <label htmlFor={templateIdCampos.numero}>Telefone</label>

                                    <button
                                        className="size-full"
                                        onClick={() => {
                                            if (!props.getDadosSalvos.objectViewComponentes?.contato?.numero) {
                                                inverterValoresView(templateIdCampos.numero);
                                            }
                                        }}>

                                        {
                                            props.getDadosSalvos.objectViewComponentes?.contato?.numero ?

                                                <input type="text" id={templateIdCampos.numero} className="h-6 w-full text-left"
                                                    value={tratarValueInput(props.getDadosSalvos?.objectParameter?.contato?.numero)}
                                                    onChange={(event) => {
                                                        salvaValores(templateIdCampos.numero, event.target.value);
                                                    }}
                                                    onClick={() => salvarDadosInputAtual(templateIdCampos.numero)}
                                                    ref={camposRef.inputTelefone} />

                                                :

                                                <div className="containerViewText w-full min-h-6 max-h-6">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.contato?.numero)))}</div>

                                        }
                                    </button>
                                </div>

                                <div>
                                    <ToolsFormat
                                        id={templateIdCampos.email}
                                        functionPrincipal={salvaValores}
                                        editando={props.getDadosSalvos.objectViewComponentes?.contato?.email}
                                        functionAlterarView={inverterValoresView}
                                        visibilidadeCampos={{
                                            listaOrdenada: false,
                                            negrito: true,
                                            listaNOrdenada: false,
                                        }}
                                    />

                                    <label htmlFor={templateIdCampos.email}>E-mail</label>

                                    <button
                                        className="size-full"
                                        onClick={() => {
                                            if (!props.getDadosSalvos?.objectViewComponentes?.contato?.email)
                                                inverterValoresView(templateIdCampos.email);
                                        }}>
                                        {
                                            props.getDadosSalvos.objectViewComponentes?.contato?.email ?

                                                <input type="text" id={templateIdCampos.email} className="h-6 w-full text-left"
                                                    value={tratarValueInput(props.getDadosSalvos?.objectParameter?.contato?.email)}
                                                    onChange={(event) => {
                                                        salvaValores(templateIdCampos.email, event.target.value);
                                                    }}
                                                    onClick={() => salvarDadosInputAtual(templateIdCampos.email)}
                                                    ref={camposRef.inputEmail} />

                                                :

                                                <div className="containerViewText w-full min-h-6 max-h-6">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.contato.email)))}</div>

                                        }
                                    </button>
                                </div>
                                <div>
                                    <ToolsFormat
                                        id={templateIdCampos.linkdin}
                                        functionPrincipal={salvaValores}
                                        editando={props.getDadosSalvos.objectViewComponentes?.contato?.linkdin}
                                        functionAlterarView={inverterValoresView}
                                        visibilidadeCampos={{
                                            listaOrdenada: false,
                                            negrito: true,
                                            listaNOrdenada: false,
                                        }}
                                    />

                                    <label htmlFor={templateIdCampos.linkdin}>Linkedin</label>

                                    <button
                                        className="size-full"
                                        onClick={() => {
                                            if (!props.getDadosSalvos.objectViewComponentes?.contato?.linkdin)
                                                inverterValoresView(templateIdCampos.linkdin);
                                        }}>
                                        {
                                            props.getDadosSalvos.objectViewComponentes?.contato?.linkdin ?

                                                <input type="text" id={templateIdCampos.linkdin} className="w-full text-left min-h-6 max-h-6"
                                                    value={tratarValueInput(props.getDadosSalvos?.objectParameter?.contato?.linkdin)}
                                                    onChange={(event) => {
                                                        salvaValores(templateIdCampos.linkdin, event.target.value);
                                                    }}
                                                    onClick={() => salvarDadosInputAtual(templateIdCampos.linkdin)}
                                                    ref={camposRef.inputLinkdin}
                                                />

                                                :

                                                <div className="containerViewText w-full min-h-6 max-h-6">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.contato.linkdin)))}</div>

                                        }

                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.nome}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.nome}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: false,
                                        negrito: true,
                                        listaNOrdenada: false
                                    }}
                                />
                                <label htmlFor={templateIdCampos.nome}>Nome</label>
                                <button className="size-full"
                                    onClick={() => {
                                        if (!props.getDadosSalvos.objectViewComponentes?.nome) inverterValoresView(templateIdCampos.nome)
                                    }}>
                                    {
                                        props.getDadosSalvos?.objectViewComponentes?.nome ?
                                            <input type="text" id={templateIdCampos.nome} className="w-full text-left min-h-6 max-h-6"
                                                value={tratarValueInput(props.getDadosSalvos?.objectParameter?.nome)}
                                                onChange={(event) => {
                                                    salvaValores(templateIdCampos.nome, event.target.value);
                                                }}
                                                onClick={() => salvarDadosInputAtual(templateIdCampos.nome)}
                                                ref={camposRef.inputNome}
                                            />

                                            :

                                            <div className="containerViewText w-full min-h-6 max-h-6">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.nome)))}</div>
                                    }
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.idiomas}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.idiomas}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: false,
                                        negrito: true,
                                        listaNOrdenada: false
                                    }}
                                />
                                <label htmlFor={templateIdCampos.idiomas}>Idiomas</label>

                                <button className="size-full"
                                    onClick={() => {
                                        if (!props.getDadosSalvos.objectViewComponentes?.idiomas) inverterValoresView(templateIdCampos.idiomas)
                                    }}>
                                    {
                                        props.getDadosSalvos?.objectViewComponentes?.idiomas ?

                                            <input type="text" id={templateIdCampos.idiomas} className="w-full text-left min-h-6 max-h-6"
                                                value={tratarValueInput(props.getDadosSalvos?.objectParameter?.idiomas)}
                                                onChange={(event) => {
                                                    salvaValores(templateIdCampos.idiomas, event.target.value);
                                                }}
                                                onClick={() => salvarDadosInputAtual(templateIdCampos.idiomas)}
                                                ref={camposRef.inputIdiomas}
                                            />
                                            :

                                            <div className="containerViewText min-h-6 max-h-6">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.idiomas)))}</div>
                                    }
                                </button>
                            </div>

                        </div>

                        <div className="flex-col gap-y-4" style={props.parteAtualPreenchimento === 2 ? { display: "flex" } : { display: "none" }}>
                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.resumoProfissional}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.resumoProfissional}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: true,
                                        negrito: true,
                                        listaNOrdenada: true
                                    }}
                                />
                                <label htmlFor={templateIdCampos.resumoProfissional}>Resumo Profissional</label>

                                <button className="size-full"
                                    onClick={() => {
                                        if (!props.getDadosSalvos.objectViewComponentes?.resumoProfissional) inverterValoresView(templateIdCampos.resumoProfissional)
                                    }}>
                                    {
                                        props.getDadosSalvos?.objectViewComponentes?.resumoProfissional ?

                                            <textarea id={templateIdCampos.resumoProfissional} className="resize-none w-full text-left min-h-24 max-h-24"
                                                value={tratarValueInput(props.getDadosSalvos?.objectParameter?.resumoProfissional)}
                                                onChange={(event) => {
                                                    salvaValores(templateIdCampos.resumoProfissional, event.target.value);
                                                }}
                                                onClick={() => salvarDadosInputAtual(templateIdCampos.resumoProfissional)}
                                                ref={camposRef.textAreaResumoProfissional}
                                            />
                                            :

                                            <div className="containerViewText min-h-24 max-h-24">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.resumoProfissional)))}</div>

                                    }
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.formacaoAcademica}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.formacaoAcademica}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: true,
                                        negrito: true,
                                        listaNOrdenada: true
                                    }}
                                />
                                <label htmlFor={templateIdCampos.formacaoAcademica}>Formação Profissional</label>

                                <button className="size-full"
                                    onClick={() => {
                                        if (!props.getDadosSalvos.objectViewComponentes?.formacaoAcademica) inverterValoresView(templateIdCampos.formacaoAcademica)
                                    }}>
                                    {
                                        props.getDadosSalvos?.objectViewComponentes?.formacaoAcademica ?

                                            <textarea id={templateIdCampos.formacaoAcademica} className="resize-none w-full text-left min-h-24 max-h-24"
                                                value={tratarValueInput(props.getDadosSalvos?.objectParameter?.formacaoAcademica)}
                                                onChange={(event) => {
                                                    salvaValores(templateIdCampos.formacaoAcademica, event.target.value);
                                                }}
                                                onClick={() => salvarDadosInputAtual(templateIdCampos.formacaoAcademica)}
                                                ref={camposRef.textAreaFormacaoAcademica}
                                            />
                                            :

                                            <div className="containerViewText min-h-24 max-h-24">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.formacaoAcademica)))}</div>

                                    }
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.competencias}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.compotencias}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: true,
                                        negrito: true,
                                        listaNOrdenada: true
                                    }}
                                />
                                <label htmlFor={templateIdCampos.competencias}>Competências</label>

                                <button className="size-full"
                                    onClick={() => {
                                        if (!props.getDadosSalvos.objectViewComponentes?.compotencias) inverterValoresView(templateIdCampos.competencias)
                                    }}>
                                    {
                                        props.getDadosSalvos?.objectViewComponentes?.compotencias ?

                                            <textarea id={templateIdCampos.competencias} className="resize-none w-full text-left min-h-24 max-h-24"
                                                value={tratarValueInput(props.getDadosSalvos?.objectParameter?.compotencias)}
                                                onChange={(event) => {
                                                    salvaValores(templateIdCampos.competencias, event.target.value);
                                                }}
                                                onClick={() => salvarDadosInputAtual(templateIdCampos.competencias)}
                                                ref={camposRef.textAreaResumoProfissional}
                                            />
                                            :

                                            <div className="containerViewText min-h-24 max-h-24">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.compotencias)))}</div>

                                    }
                                </button>
                            </div>
                        </div>

                        <div className="flex-col gap-y-4" style={props.parteAtualPreenchimento === 3 ? { display: "flex" } : { display: "none" }}>
                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.historicoProfissinal}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.historicoProfissinal}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: true,
                                        negrito: true,
                                        listaNOrdenada: true
                                    }}
                                />
                                <label htmlFor={templateIdCampos.historicoProfissinal}>Histórico Profissional</label>
                                <div>
                                    <button className="size-full"
                                        onClick={() => {
                                            if (!props.getDadosSalvos.objectViewComponentes?.historicoProfissinal) inverterValoresView(templateIdCampos.historicoProfissinal)
                                        }}>
                                        {props.getDadosSalvos?.objectViewComponentes?.historicoProfissinal ?
                                            <textarea id={templateIdCampos.historicoProfissinal} className="size-full resize-none w-full text-left max-h-48 min-h-48"
                                                value={tratarValueInput(props.getDadosSalvos?.objectParameter?.historicoProfissinal)}
                                                onChange={(event) => {
                                                    salvaValores(templateIdCampos.historicoProfissinal, event.target.value);
                                                }}
                                                onClick={() => salvarDadosInputAtual(templateIdCampos.historicoProfissinal)}
                                                    ref={camposRef.textAreaHistoricoProfissional}
                                            />

                                            :

                                            <div className="containerViewText max-h-48 min-h-48">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.historicoProfissinal)))}</div>
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <ToolsFormat
                                    id={templateIdCampos.certificacoes}
                                    functionPrincipal={salvaValores}
                                    editando={props.getDadosSalvos.objectViewComponentes?.certificacoes}
                                    functionAlterarView={inverterValoresView}
                                    visibilidadeCampos={{
                                        listaOrdenada: true,
                                        negrito: true,
                                        listaNOrdenada: true
                                    }}
                                />
                                <label htmlFor={templateIdCampos.certificacoes}>Certificações</label>

                                <div>
                                    <button className="size-full"
                                        onClick={() => {
                                            if (!props.getDadosSalvos.objectViewComponentes?.certificacoes) inverterValoresView(templateIdCampos.certificacoes)
                                        }}>
                                        {
                                            props.getDadosSalvos?.objectViewComponentes?.certificacoes ?

                                                <textarea id={templateIdCampos.certificacoes} className="size-full resize-none w-full text-left max-h-48 min-h-48"
                                                    value={tratarValueInput(props.getDadosSalvos?.objectParameter?.certificacoes)}
                                                    onChange={(event) => {
                                                        salvaValores(templateIdCampos.certificacoes, event.target.value);
                                                    }} 
                                                    onClick={() => salvarDadosInputAtual(templateIdCampos.certificacoes)}
                                                    ref={camposRef.textAreaCertificacoes}
                                                    />
                                                :

                                                <div className="containerViewText max-h-48 min-h-48">{HTMLReactParser(convertGenerateComponents(tratarValueInput(props.getDadosSalvos?.objectParameter?.certificacoes)))}</div>

                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                break;

            default:
                return (undefined);
        }

        if (camposRetorno) {
            camposRetorno.push(
                <div className={`flex items-center ${props.parteAtualPreenchimento === 1 ? "justify-end" : "justify-between"}`} key={1}>
                    {props.parteAtualPreenchimento > 1 &&
                        <button onClick={() => { props.setParteAtualPreenchimento(props.parteAtualPreenchimento - 1) }}>
                            {/* <span style={props.parteAtualPreenchimento === 2 ? { display: "block" } : { display: "none" }}> */}
                            <span style={{ display: "block" }}>
                                <FaChevronCircleLeft className="svg-padrao text-xl" />
                            </span>
                        </button>
                    }
                    {props.parteAtualPreenchimento < 3 &&
                        <button onClick={() => { props.setParteAtualPreenchimento(props.parteAtualPreenchimento + 1) }}>
                            {/* <span style={props.parteAtualPreenchimento === 1 ? { display: "block" } : { display: "none" }}> */}
                            <span style={{ display: "block" }}>
                                <FaChevronCircleRight className="svg-padrao text-xl" />
                            </span>
                        </button>
                    }
                </div>
            )
        }

        return camposRetorno

    }

    return (
        <div className="container-main flex flex-col gap-y-5">
            <div>
                <h2 className="titulo-campos">
                    Preencha os dados para iniciar a criação
                </h2>
            </div>
            <div className="flex justify-between flex-col gap-y-5 container-dados">
                {escolheCampo()}
            </div>
        </div>
    )
}

export default Dados;