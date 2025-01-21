"use client"

import Layout from "./layoutReact"
import TelaInicial from "../pages/TelaInicial";
import GerarCurriculo from "../pages/GerarCurriculo"
import { PaginaAtual } from "@/interface/pagesComponents";
import { ReactElement, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa"

export default function Home() {

  const [valorPaginaAtual, setValorPaginaAtual] = useState<ReactElement>(<TelaInicial mudarPagina={mudarPagina} />)
  const [menuflutuante, setmenuFlutuante] = useState<boolean>(false);



  function mudarPagina(key: keyof PaginaAtual) {
    switch (key) {
      case "paginaInicial":
        setValorPaginaAtual(<TelaInicial mudarPagina={mudarPagina} />)
        break;

      case "paginaGeracaoCurriculo":
        setValorPaginaAtual(<GerarCurriculo />)
        break;
    }
  }



  useEffect(() => {
    console.log(valorPaginaAtual)
  }, [valorPaginaAtual])

  return (
    <Layout>
      <main className="min-w-screen min-h-screen flex items-center justify-between flex-col">
        <div id="header" className="w-full flex items-center justify-between rounded-b-3xl text-3xl">
          <div>
            <h1>CrC</h1>
          </div>
          <div className="relative">
            <button
              className="flex items-center justify-center buttonMenu"
              onClick={() => setmenuFlutuante(!menuflutuante)}
            ><FaBars /></button>
            {menuflutuante && <div className="menuFlutuante text-base"
              onMouseLeave={() => setmenuFlutuante(menuflutuante && false)}
            >
              <ul>
                <li
                  onClick={() => mudarPagina("paginaInicial")}
                >Home</li>
                <li
                  onClick={() => mudarPagina("paginaGeracaoCurriculo")}
                >Gerar Documento</li>
              </ul>
            </div>}
          </div>
        </div>
        <div id="body" className="w-full">
          {valorPaginaAtual}
        </div>
        <div id="footer" className="w-full rounded-t-3xl flex items-center justify-center">
          Desenvolvido por Marcelo Teixeira - 2025
        </div>
      </main>
    </Layout>
  );
}
