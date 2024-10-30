"use client"

import { FormEvent, useEffect, useRef, useState } from "react";
import Dados from "@/components/GerarCurriculo/Dados"
import Escolhas from "@/components/GerarCurriculo/Escolhas"
import Imagem from "@/components/GerarCurriculo/Imagem"
import Layout from "../../app/layoutReact"
import { ObjectParameter, ObjectValues, templateObjectValues } from "@/interface/createPdfFile"
import convertGenerateComponents from "@/mainFunctions/convertGenerateComponents";
import { error } from "console";



function Index() {

    const nomeIdFile = "uploadFile";
    const inputFile = useRef<HTMLInputElement | null>(null);
    const templateDadosSalvos = {...templateObjectValues};

    const [opcaoEscolhida, setOpcaoEscolhida] = useState<string>("");
    const [imagemCarregada, setImagemCarregada] = useState<string>("");
    const [mensagemErroImagem, setMensagemErroImagem] = useState<string>("Carregue uma imagem para utilizar no currículo");
    const [parteAtualPreenchimento, setParteAtualPreenchimento] = useState<number>(1);
    const [dadosSalvos, setDadosSalvos] = useState<ObjectValues>({...templateDadosSalvos});
    const [arquivoPdf, setArquivoPdf] = useState<string>("");
    const [mostrarPdf, setMostrarPdf] = useState<boolean>(false);

    function teste(){
        const data = new Date();
        console.log(`${data.toLocaleDateString()} : ${data.toLocaleTimeString()}`)
        console.log(dadosSalvos.objectParameter)
    }

    useEffect(()=>{
        setDadosSalvos({...templateDadosSalvos});
    },[opcaoEscolhida])

    function uploadFileImage() {
        const refCarregada = inputFile.current;

        if (refCarregada) {
            refCarregada.click();
        }
    }

    async function salvarLocalImagem(event: FormEvent<HTMLInputElement>) {
        const valorEvento = event.currentTarget;
        let imagemEncontrada = false;

        if (valorEvento && valorEvento.files) {
            const file = valorEvento.files[0];

            if (file?.type.includes("image")) {

                await convertBlobTo64(file).then((resolve) => {

                    if (typeof resolve === "string") {
                        setImagemCarregada(resolve);

                        imagemEncontrada = true;
                    }
                });

            }
        }

        if (!imagemEncontrada) {
            setMensagemErroImagem("Falha o carregar a imagem!");
        }
        else {
            setMensagemErroImagem("Imagem carregada com sucesso!");
        }
    }

    async function convertBlobTo64(arquivo: Blob | undefined) {
        const reader = new FileReader();

        if (!arquivo) return;

        reader.readAsDataURL(arquivo);

        return new Promise((resolve, reject) => {
            try {
                reader.onloadend = () => {
                    let retorno = reader.result;

                    if (retorno) {
                        resolve(retorno)
                    }
                    else {
                        resolve("")
                    }
                }
            } catch (error) {
                reject(new Error(""))
            }
        })
    }

    async function captarArquivoFile() {
        let objetoMockInterno: ObjectParameter | undefined = undefined;
        
        if(dadosSalvos?.objectParameter){
            objetoMockInterno = JSON.parse(JSON.stringify(dadosSalvos.objectParameter));
        }
        
        try {

            if (!objetoMockInterno) throw new Error("Falha ao tentar localizar dados salvos");

            const keys = Object.keys(objetoMockInterno);

            keys.forEach(key => {
                const keyTratada = key as keyof typeof objetoMockInterno;

                if(keys.find(key => key === "foto")){
                    if(keyTratada === "foto"){
                        return
                    }
                }
                else{
                    throw new Error(`Falha ao tentar localizar a key [foto]`);
                }

                if(keyTratada !== "contato"){
                    objetoMockInterno[keyTratada] = convertGenerateComponents(objetoMockInterno[keyTratada] ? objetoMockInterno[keyTratada] : "")

                }
            })
            
            objetoMockInterno.foto = imagemCarregada;

            let configFetch: RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                cache: "default",
                body: JSON.stringify(objetoMockInterno)
            }

            const link = "http://localhost:3001/criarTemplate";

            const response = await fetch(link, configFetch);

            const valor = await response.json();
           
            if (valor) {
                if (valor.isError) {
                    throw valor.messageError;
                }

                if (valor.arquivo) {

                    let valorConvertido = encodeURI(valor.arquivo);

                    const responseFile = await fetch(`data:application/pdf;base64,${valorConvertido}`);

                    const blobValor = await responseFile.blob();

                    const url = URL.createObjectURL(blobValor);

                    setArquivoPdf(url);

                    setMostrarPdf(true);
                }
            }
            else {
                throw Error("Erro na captura do objeto!");
            }

        } catch (error) {
            alert("Falha na geração do arquivo PDF!");
        }
    }



    return (
        <Layout>
            <div className="ctn-main-gerar-arquivo">
                {mostrarPdf ?

                    <div className="min-h-full w-full flex flex-col gap-y-5 items-center">
                        <button className="buttonMain" onClick={() => { setMostrarPdf(false) }}>Voltar</button>

                        <embed className="embedPdfFile" src={`${arquivoPdf}`} type="application/pdf" />
                    </div>

                    :

                    <>
                        <div className="flex flex-col justify-between h-full w-72">
                            <Escolhas opcaoEscolhida={opcaoEscolhida} setOpcaoEscolhida={setOpcaoEscolhida} />
                            <div>
                                <input ref={inputFile} id={nomeIdFile} type="file" style={{ display: "none" }}
                                    onChangeCapture={(event) => { salvarLocalImagem(event) }} />
                            </div>
                            <Imagem imagem={imagemCarregada} uploadFileImage={uploadFileImage} mensagemErroMensagem={mensagemErroImagem} />
                        </div>
                        <div className="flex flex-col gap-y-8 justify-between h-full">
                            <Dados
                                opcaoEscolhida={opcaoEscolhida}
                                parteAtualPreenchimento={parteAtualPreenchimento}
                                setParteAtualPreenchimento={setParteAtualPreenchimento}
                                setDadosSalvos={setDadosSalvos}
                                getDadosSalvos={dadosSalvos}
                            />
                            <div className="flex items-center justify-center">
                                <button
                                    disabled={opcaoEscolhida ? false : true}
                                    className="buttonMain"
                                    onClick={async () => { await captarArquivoFile() }}
                                >Gerar</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}

export default Index;