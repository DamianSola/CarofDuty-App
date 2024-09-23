

const AddButton = ({show, handleSubmitTrun}) => {

    const submit = () => {
        // show && handleSubmitTrun();
        handleSubmitTrun();
    }

    return(
        <div className="w-full justify-center p-6">
            <button onClick={submit}
                className={`px-4 py-2 text-center ${show ? 'bg-red-600 hover:ring-2 ring-blue-500 hover:bg-red-500':
                    'bg-gray-300'} text-xl font-semibold text-white rounded`}
                >Sacar turno</button>
        </div>
    )
}

export default AddButton;