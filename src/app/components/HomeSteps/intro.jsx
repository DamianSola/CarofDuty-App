

const Intro = ({step}) => {

    const handleSubmit = () => {
        step(1)
    }
    return(
    <div className="p-10 min-h-svh items-center text-center">

        <h1 className="text-2xl text-gray-700 text-semibold p-4 m-auto">Hacé el tramite en 4 pasos</h1>
        <button  className="w-full m-auto py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
        >
            Empecemos
        </button>
    </div>)
}

export default Intro;