# CreateCurriculum

CreateCurriculum é uma aplicação focada na geração de **currículos em PDF** a partir de um template estruturado.

A proposta do projeto é permitir que qualquer pessoa consiga **gerar um currículo bem formatado de forma rápida**, sem precisar se preocupar com formatação manual de documentos.

O usuário apenas informa seus dados e a aplicação se responsabiliza por estruturar e gerar o arquivo final em PDF.

---

# Objetivo do Projeto

O projeto nasce com a proposta de ser mais do que apenas um gerador de PDF.

A ideia é evoluir para um **produto voltado a pessoas que estão buscando emprego**, oferecendo uma forma simples e rápida de criar currículos bem estruturados.

Entre os objetivos estão:

- Facilitar a criação de currículos profissionais
- Reduzir o tempo gasto com formatação de documentos
- Possibilitar a evolução do projeto com novos templates e funcionalidades

---

# Versão 2.0 em Desenvolvimento

Atualmente o projeto público representa a **base da aplicação**.

Uma **versão 2.0 está em desenvolvimento em um repositório privado**, onde novas funcionalidades e melhorias estruturais estão sendo implementadas antes de serem disponibilizadas publicamente.

Essa nova versão tem como objetivo:

- Evoluir a arquitetura do projeto
- Melhorar a experiência de uso
- Permitir a expansão do sistema com novas funcionalidades
- Transformar a aplicação em um produto mais completo

Conforme as funcionalidades forem finalizadas e estabilizadas, elas serão integradas ao repositório público.

---

# Estrutura do Projeto

O projeto é dividido em duas partes principais.

## Front-end

O **front-end** é responsável pela interação com o usuário e pela coleta das informações necessárias para a criação do currículo.

Tecnologias utilizadas:

- React
- Typescript

Funções principais:

- Interface de preenchimento de dados
- Validação das informações fornecidas pelo usuário
- Comunicação com o back-end
- Exibição do PDF gerado

---

## Back-end

O **back-end** é responsável por processar as informações enviadas pelo front-end e gerar o arquivo PDF.

Tecnologias utilizadas:

- Node.js
- Express
- Puppeteer

Funções principais:

- Receber os dados enviados pelo front-end
- Renderizar o template do currículo
- Gerar o arquivo PDF
- Retornar o arquivo gerado para o usuário

---

# Instalação

Para executar o projeto localmente é necessário possuir o **Node.js** instalado na máquina.

Após clonar o repositório, execute os comandos abaixo na pasta raiz do projeto.

## Instalar dependências

Instala todas as dependências do **front-end** e **back-end**.

```
npm run install:all
```

## Executar o projeto completo

Executa **front-end e back-end simultaneamente**.

```
npm run dev:all
```

## Executar apenas o front-end

```
npm run dev:frontend
```

## Executar apenas o back-end

```
npm run dev:backend
```

---

# Evolução do Projeto

O CreateCurriculum está sendo desenvolvido de forma incremental, com foco em:

- melhoria contínua da arquitetura
- evolução das funcionalidades
- aprimoramento da experiência do usuário

Novas versões e funcionalidades serão adicionadas conforme o projeto evoluir.
