interface PaginaAtual{
    paginaInicial: boolean,
    paginaGeracaoCurriculo: boolean
}

interface dadosInformacao{
    descricao: boolean,
    instrucao: boolean
}

const paginaAtual = ()=>{
    const dadosPadrao : PaginaAtual = {
        paginaGeracaoCurriculo: false,
        paginaInicial: false
    };

    return dadosPadrao;
}

const dadosInformacaoTemplate : dadosInformacao = {
    descricao: false,
    instrucao: false
}

export{
    paginaAtual,
    dadosInformacaoTemplate
}

export type{
    PaginaAtual,
    dadosInformacao
}