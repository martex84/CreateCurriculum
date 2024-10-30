import Image from "next/image";

interface props {
    uploadFileImage(): void,
    imagem: string,
    mensagemErroMensagem: string
}

function Imagem(props: props) {
    return (
        <div className="container-main relative">
            <div className="container-button-carregamento-imagem">
                <button className="buttonSecundary absolute top-[-20px]"
                    onClick={props.uploadFileImage}
                >Carregar Foto</button>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-8 m-5 container-busca-imagem">
                <div className="container-pre-visualizacao-imagem">
                    {props.imagem &&
                        <Image width={200} height={200} className="size-full" src={props.imagem} alt="Imagem Carregada" />
                    }
                </div>
                <div className="container-mensagem-carregamento-imagem p-1 flex items-center justify-center">
                    <p className="text-sm text-center">{props.mensagemErroMensagem}</p>
                </div>
            </div>
        </div>
    )
}

export default Imagem;