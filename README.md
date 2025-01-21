# CreateCurriculum
Projeto focado na criação de uma aplicação responsável por gerar um currículo do tipo pdf com base em um determinado template, usando para isso informações passada pelo usuário.

# Divisão
O projeto é divido nos seguintes pontos:
- **Front-End**: O front-end foi desenvolvido e executado em react-js, sendo responsável por captar e tratar todos os dados que o usuário irá interagir.
- **Back-End**: O back-end foi desenvolvido e exeutado em node-js, utilizando o express para administrar todas as chamadas que o front-end irá utilizar, além disso, ele conta com a função de captar as informações passadas pelo front-end para gerar um pdf de acordo com o template, trazendo ao final de tudo isso um arquivo em pdf, que será exibido pelo usuário.

# Instalação
Para realizar a instalação, deve primeiro ter o nodejs instalado na máquina, após isso deve executar o seguintes códigos na pasta raiz.
```javascript
//Código utilizado para instalar os pacotes front-end e back-end
npm run install:all

//Código Utilizado para executar ambos os pacotes ao mesmo tempo
npm run dev: all

//Código utilizado caso deseje executar apenas o pacote front-end
npm run dev:frontend

//Código utilizado caso deseje executar apenas o pacote back-end
npm run dev:backend
```