import "@/style/Main.scss"

interface props{
    children: any
}

function index(props: props){

    return(
        <main className="min-w-screen min-h-screen flex items-center justify-center p-10">
            {props.children}
        </main>
    )
}

export default index;