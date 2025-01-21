import fs from "fs";

async function log(message){

    const data = new Date();

    const nomeArquivo = `log_${data.getDate()}_${data.getMonth() + 1}_${data.getFullYear()}.txt`;

    const nomePastaLog = "log";

    const caminhoArquivo = "./" + nomePastaLog + "/" + nomeArquivo;
    
    const mensagem = `[${data.toLocaleDateString()} : ${data.toLocaleTimeString()}] --` + `${message}--\n`;

    console.log(mensagem)

    try{
        if(!fs.existsSync("./" + nomePastaLog)){
            fs.mkdirSync("./" + nomePastaLog);
        }
    
        let valorArquivo = "";
    
        if(fs.existsSync(caminhoArquivo)){
            valorArquivo =  fs.readFileSync(caminhoArquivo).toString();
        }

        fs.writeFileSync(caminhoArquivo,valorArquivo + mensagem);
    }
    catch(error){
        console.log("Falha ao tentar salvar o log localmente!")
    }
}

export default log;