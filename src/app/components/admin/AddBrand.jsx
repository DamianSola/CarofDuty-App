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
        <div>
            <h1>Agregar marca de auto</h1>
            <form onSubmit={handleSubmit} onChange={handleChange} className='md:flex-wrap items-center'>
                <article>
                    <label className='label'>name:</label>
                    <input className='input' type='text' name="name"  required/>
                    {error.name && <p className='message-error'>{error.name}</p>}
                </article>

               <article>
                    <label className='label'>image url:</label>
                    <input className='input' type="url" name="image" required/>
                    {error.image && <p className='message-error'>{error.image}</p>}
               </article>
               
               <button type="submit" className='simple-button text-blue-500 mx-4'>agregar marca</button>
            </form>
        </div>
    )
}

export default AddBrand;