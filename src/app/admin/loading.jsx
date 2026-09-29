import Spinner from "../components/ui/Spinner";
import Alert from "../components/ui/Alert";

const Loading = ({status}) => {
    if(status === 'succeeded') return null

    if(status === 'failed') {
        return(
        <Alert variant="danger" role="alert" className="m-auto p-6 text-center">
            <p className="text-lg font-semibold">Algo salió mal</p>
        </Alert>
        )
    }
    return (
        <Spinner label="Cargando datos..." />
    )
}

export default Loading;
