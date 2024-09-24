import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addNewBrand } from '../../../redux/Slices/brandSlice';

const validate = (data) => {
    const imagePattern = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;

    switch (data.name) {
        case 'image':
            if (!data.value || !imagePattern.test(data.value)) {
                return 'url de imagen invalida'
            }
            break;
        case 'name':
            if(!data.value || data.value.length < 3){
                return 'dato invalido, minimo 3 palabras'
             }
            break;
        default:
            return null;
    }

}

const AddBrand = ({open, brand}) => {

    const dispatch = useDispatch()

    const [input, setInput] = useState({name:'', image:''})
    const [error, setError] = useState({})

    const handleChange = (e) => {
        let {name, value} = e.target;

        // console.log(name, value)

        setInput({...input, [name]:value })

        const validationError = validate({ name, value });
        setError((prevErrors) => ({
            ...prevErrors,
            [name]: validationError
        }));

    
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if(!error.name && !error.image){
            dispatch(addNewBrand(input))
            setInput({name:'', image:''})
        }
    }

    return(
        <div className='p-6 bg-white rounded-lg shadow-md max-w-96 m-auto'>
            {/* Título */}
            <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                Agregar Marca de Auto
            </h1>

            {/* Formulario */}
            <form 
                onSubmit={handleSubmit} 
                onChange={handleChange} 
                className='space-y-6' // Espacio entre los elementos del formulario
            >
    
    {/* Nombre */}
                <article>
                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    Nombre:
                </label>
                <input 
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                    type='text' 
                    name="name" 
                    required
                />
                {error.name && <p className='text-red-500 text-sm mt-2'>{error.name}</p>}
                </article>

                {/* URL de imagen */}
                <article>
                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    URL de Imagen:
                </label>
                <input 
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                    type='url' 
                    name="image" 
                    required
                />
                {error.image && <p className='text-red-500 text-sm mt-2'>{error.image}</p>}
                </article>

                {/* Botón */}
                <div className='flex justify-center'>
                <button 
                    type="submit" 
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300'
                >
                    Agregar Marca
                </button>
                </div>
            </form>
        </div>

    )
}

export default AddBrand;