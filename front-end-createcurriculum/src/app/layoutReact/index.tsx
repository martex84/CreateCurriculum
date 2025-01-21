import "@/style/Main.scss"

interface props{
    children: any
}

function index(props: props){

    return(
        <>{props.children}</>
    )
}

export default index;