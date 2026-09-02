# 📄 Create Curriculum

O **Create Curriculum** é uma aplicação completa para geração e exportação dinâmica de currículos em PDF a partir de templates customizáveis e dados estruturados.

O ecossistema é dividido em duas aplicações independentes que trabalham em conjunto:

- `back-end-create-curriculum`: Microsserviço Node.js responsável pelas regras de negócio, validações, geração de PDF e suíte de testes.
- `front-end-createcurriculum`: Aplicação Next.js/React responsável pela interface de usuário, formulários e pré-visualização.

---

## 🎯 Sobre o Projeto

A aplicação recebe informações enviadas pelo cliente no Frontend, valida os campos e regras do template selecionado, executando em seguida no Backend a conversão e renderização do documento em formato PDF através de um motor de processamento assíncrono.

---

## 🚀 Evolução da Arquitetura & O que há de novo na v1.5 (Backend)

Recentemente, o backend do projeto passou por uma refatoração profunda de arquitetura e padrões de código, migrando de um modelo clássico MVC para uma abordagem focada em escalabilidade, manutenibilidade e isolamento de regras de negócio.

### 🔍 Principais Mudanças Técnicas (v1.5):

- **Arquitetura Hexagonal (Ports & Adapters):** Desacoplamento total das regras de negócio (Casos de Uso/Domínio) dos detalhes de infraestrutura e frameworks (Express, Puppeteer, etc.).
- **Organização Feature-First:** Estruturação de pastas orientada a domínios e funcionalidades, facilitando a navegação, modularização e adição de novos templates no ecossistema.
- **Garantia de Qualidade & Testes Automatizados:** Implementação de suítes completas de **testes unitários** (validação de regras e componentes de domínio) e **testes de integração** (fluxos da API) utilizando **Jest**.
- **Observabilidade & Logs:** Sistema nativo de logs para rastreabilidade de eventos, requisições com sucesso e tratamento centralizado de exceções no servidor.

---

## 🛠️ Tech Stacks

### Backend (`back-end-create-curriculum`)

- **Linguagem & Runtime:** TypeScript / Node.js
- **Framework Web:** Express.js
- **Motor de Renderização PDF:** Puppeteer
- **Suíte de Testes:** Jest
- **Execução & Utils:** tsx, cross-env, auditjs

### Frontend (`front-end-createcurriculum`)

- **Framework:** Next.js / React.js
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS, Sass
- **Qualidade & Auditoria:** ESLint, auditjs

---

## 🗺️ Roadmap Futuro (Frontend)

Com a consolidação da infraestrutura e arquitetura do backend, as próximas etapas do projeto serão focadas no retrabalho do **Frontend**:

- [ ] **Evolução Arquitetural:** Adequação do Frontend para os padrões Hexagonal + Feature-First.
- [ ] **Sincronia de Contratos de API:** Alinhamento dos DTOs, mappers e esquemas de validação client-side com o backend v1.5.
- [ ] **Suíte de Testes de Interface:** Inclusão de testes unitários e de componentes (React Testing Library / Jest).
- [ ] **Refinamento de UI/UX:** Melhorias no design visual, responsividade e experiência na escolha e preenchimento dos templates de currículo.

---

## ⚙️ Como Executar os Projetos

Como o Frontend e o Backend são aplicações independentes, **é necessário instalar as dependências e iniciar cada uma separadamente em terminais distintos.**

### 1️⃣ Configuração e Execução do Backend

```bash
# Navegue até a pasta do backend
$ cd back-end-create-curriculum

# Instale as dependências
$ npm install

# Executar o servidor em modo de desenvolvimento
$ npm run dev

# Executar o build / produção
$ npm run build

# Executar todos os testes
$ npm run test

# Executar apenas testes unitários
$ npm run test:unit

# Executar apenas testes de integração (spec)
$ npm run test:spec

# Executar testes em modo watch
$ npm run test:watch

# Gerar relatório de cobertura de testes
$ npm run test:cov
```

### 2️⃣ Configuração e Execução do Frontend

Em outro terminal:

```bash
# Navegue até a pasta do frontend
$ cd front-end-createcurriculum

# Instale as dependências
$ npm install

# Executar a aplicação em modo de desenvolvimento
$ npm run dev
```
