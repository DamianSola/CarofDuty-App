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
        <div className='p-4 bg-gray-200'>
            <span className='text-sm text-blue-500'>{seeBrand && seeBrand}</span>
            <form onSubmit={HandleSubmit} className='md:flex-wrap items-center py-4' onChange={(e) => handleChange(e)}>
                <label className='label' >nombre</label>
                <input type="text" name="name"  className='input' required/>
                <label className='label'>tipo de auto</label>
                <select className='select' name="type"  onChange={(e) => handleChange(e)} required>
                    <option  value={null}>---seleccionar---</option>
                    <option  value="auto">auto</option>
                    <option  value="camioneta">camioneta</option>
                </select>
                <br/>
                <label className='label'>motor</label>
                <input  className='input' type="text" name="motor" required/>
                <label className='label'>marca</label>
                <select
                className='select' 
                id="options" name="brand"  onChange={(e) => handleChange(e)} required>
                    <option  value={null}>---seleccionar---</option>
                  
                {brand.brands && brand.brands.map((marca, index) => {
                    return <option value={marca._id} key={index}>{marca.name}</option>
                })}
            </select>
            {error && <p className='message-error'>{error}</p>}
            <br/>
            <button type='submit' className='simple-button text-blue-500'>agregar auto</button>
            </form>
        </div>
    )
}

export default AddCar;