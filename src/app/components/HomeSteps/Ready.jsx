

const Ready = ({step}) => {

    const handleSubmit = () => {
        step(1)
    }
    return(
    <div className="p-6 min-h-svh items-center text-center">

        <h1 className="text-2xl text-gray-700 text-bold p-4">Listo!</h1>
        <img className="m-auto"
        src="https://cdn.icon-icons.com/icons2/1506/PNG/512/emblemok_103757.png" alt="ok" width='80'/>
        <p className="p-6">Podes cheackear los datos a tu derecha. Si todo esta bien, hacé click en <strong>sacar turno</strong></p>
        <button  className="w-1/3 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
        >
            Revisar
        </button>
    </div>)
}

export default Ready;