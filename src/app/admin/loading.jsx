

const Loading = ({status}) =>{

    if(status === 'succeeded') return null

    if(status === 'failed') {
        return(
        <div className="flex flex-col m-auto justify-center items-center text-center p-6 h-auto bg-gray-50 border rounded-md">
           <img 
                src="https://ecuador.patiotuerca.com/assets/errors/images/error_500_503.svg"
                width="300" 
                alt="Cargando" 
                className="mb-4 animate-spin-slow"
            />
            <p className="text-gray-700 font-semibold text-lg">Ups! Algo salio mal</p>
        </div>
        )
    }
    else return (
        <div className="flex flex-col m-auto justify-center items-center text-center p-6 h-auto bg-gray-50 border rounded-md">
            <img 
            src="https://cdn.pixabay.com/animation/2023/03/26/11/12/11-12-37-996_512.gif" 
            width="300" 
            alt="Cargando" 
            className="mb-4 animate-spin-slow"
            />
            <p className="text-gray-700 font-semibold text-lg">Cargando datos...</p>
        </div>
    )
}

export default Loading;

