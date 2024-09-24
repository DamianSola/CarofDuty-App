import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addNewCar} from './../../../redux/Slices/carsSlice'

const AddCar = ({open, brand}) => {

    const dispatch = useDispatch()
    const {status} = useSelector(state => state.car)

    const [input, setInput] = useState({})
    const [seeBrand, setSeeBrand] = useState(null)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        let {name, value} = e.target;

        setInput({...input, [name]:value })

        if(name === 'brand'){
           let show = brand.brands.find(e => e._id === value)
           setSeeBrand(show.name)
           setError(null)
        }
       
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        if(!input.brand) return setError('seleccionar marca')
        
        dispatch(addNewCar(input))
        setInput({})
    }
 

    return(
        <div className='p-6 bg-white rounded-lg shadow-md max-w-96 m-auto'>
        {/* Marca seleccionada */}
            <span className='block text-lg text-blue-600 font-medium mb-4'>
            {seeBrand && seeBrand}
            </span>
      
        {/* Formulario */}
            <form onSubmit={HandleSubmit} className='space-y-4' onChange={(e) => handleChange(e)}>
            
            {/* Nombre */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>Nombre</label>
                    <input 
                    type="text" 
                    name="name" 
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                    required
                    />
                </div>
        
            {/* Tipo de auto */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>Tipo de auto</label>
                    <select 
                    name="type"  
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                    onChange={(e) => handleChange(e)} 
                    required
                    >
                    <option value={null}>--- Seleccionar ---</option>
                    <option value="auto">Auto</option>
                    <option value="camioneta">Camioneta</option>
                    </select>
                </div>
        
            {/* Motor */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>Motor</label>
                    <input 
                    type="text" 
                    name="motor" 
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                    required
                    />
                </div>
        
            {/* Marca */}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>Marca</label>
                    <select 
                    id="options" 
                    name="brand"  
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                    onChange={(e) => handleChange(e)} 
                    required
                    >
                    <option value={null}>--- Seleccionar ---</option>
                    {brand.brands && brand.brands.map((marca, index) => (
                        <option value={marca._id} key={index}>{marca.name}</option>
                    ))}
                    </select>
                </div>
        
            {/* Error Message */}
                {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        
            {/* Botón */}
                <div className='flex justify-center'>
                    <button 
                    type='submit' 
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300'
                    >
                    Agregar Auto
                    </button>
                </div>
            </form>
        </div>
      
    )
}

export default AddCar;