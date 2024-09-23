

const AlertComponent = ({text, message,number}) => {

    

    return(
        <div className="max-w-sm mx-auto mt-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{text}</strong>
                <span className="block sm:inline">{message}</span>
                <p>numero de turno: </p>
                <strong>{number}</strong>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Cerrar</title>
                        <path d="M14.348 5.652a1 1 0 00-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.828 8.586l-3.757 3.758a1 1 0 101.414 1.414L10 9.828l3.758 3.758a1 1 0 001.414-1.414L11.172 8.586l3.176-3.176z"/>
                    </svg>
                </span>
            </div>
        </div>
    )
}

export default AlertComponent;