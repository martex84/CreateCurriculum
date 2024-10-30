import Link from "next/link";
import Layout from "./layoutReact"

export default function Home() {
  return (
    <Layout>
      <Link href={{
        pathname: "/GerarCurriculo"
      }} style={{ color: "#fff" }}>
        Criar Curriculo
      </Link>
    </Layout>
  );
}
