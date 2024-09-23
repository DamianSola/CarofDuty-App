
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getAllServiceTypes, addNewProduct} from './../../../redux/Slices/serviceSlice'


const validate = (data) => {
    const imagePattern = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;

    switch (data.name) {
        case 'image':
            if (!imagePattern.test(data.value)) {
                return 'url de imagen invalida'
            }
            break;
        case 'description':
            if(!data.value || data.value.length  < 10){
                return 'dato invalido, minimo 10 palabras'
             }
            break;
        case 'name':
            if(!data.value || data.value.length < 3){
                return 'dato invalido, minimo 3 palabras'
            }
        break;
        case 'price':
            if(!data.value){
                return 'precio requerido, debe ser numero'
            }
            break;
        case 'stock':
            if(!data.value){
                return 'stock requerido, debe ser numero'
            }
            break;
        case 'serviceType':
            if(data.value.length !== 1){
                return 'debe elegir un tipo de servicio'
            }
            break;
        default:
            return null;
    }

}

const AddProduct = ({open, brand}) => {

    const dispatch = useDispatch()
    const {serviceTypes} = useSelector(state => state.service)
    const {brands} = useSelector(state => state.brand)

    const [input, setInput] = useState({
        name:'', image:'', Service_type:null, price: null, stock: null , motor: [], description:'', brandCar:[]
    })

    const [showBrand, setShowBrand] = useState([])


    const [error, setError] = useState({})

    // console.log(input)

    const handleChange = (e) => {
        let {name, value} = e.target;        

        if(name === "motor"){
          if(value !== "none"){
            if(!input.motor.includes(value)) setInput({...input, motor:[...input.motor,value] })
          }
        }else if(name === "brandCar"){
            if(value === "allBrands") {
              setInput({...input, brandCar: brands.brands.map(e => e._id)})
              setShowBrand(brands.brands)

            }else{
              let b = brands.brands.find(b => b._id === value)
              let include = input.brandCar.find(e => e === b._id)
              
              if(!include) {
                setInput({...input, brandCar:[...input.brandCar, b._id] })
                setShowBrand([...showBrand, b])
              }
            }

        }else setInput({...input, [name]:value })

        const validationError = validate({ name, value });
        setError((prevErrors) => ({
            ...prevErrors,
            [name]: validationError
        }));

    
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        const {name, image, Service_type, price, stock, motor, description} = error;
        // const updatedBrandCar = input.brandCar.map(brand => brand._id);
        // setInput({...input, brandCar: updatedBrandCar});
        // console.log(input.brandCar)
        // const arrayErrors = [name, image, ServiceType, price, stock, motor, description]
        // arrayErrors.find(e => !e )
        let result = dispatch(addNewProduct(input))
        console.log(result)
       
        setInput({name:'', image:'', ServiceType:null, price: null, stock: null , motor: [], description:'', brandCar:[]})
    }

    const removeMotor = (e) => {
        setInput({
            ...input,
            motor: input.motor.filter(motorItem => motorItem !== e)  
        });
    }

    const removeBrand = (e) => {
        setShowBrand([
            ...showBrand.filter(brandItem => brandItem._id !== e._id)
        ])
        setInput({
            ...input,
            brandCar: input.brandCar.filter(motorItem => motorItem !== e._id)
        });
    }

    useEffect(() => {
        dispatch(getAllServiceTypes())
    },[])

    return(
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Agregar Producto Nuevo</h1>
        
        <form onSubmit={handleSubmit} onChange={handleChange} className="grid grid-cols-2 gap-6">
          
          {/* Nombre del producto */}
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Nombre:</label>
            <input 
              className="input p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              type="text" 
              name="name" 
              required
            />
            {error.name && <p className="text-red-500 mt-2">{error.name}</p>}
          </article>
      
          {/* URL de la imagen */}
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">URL de la imagen:</label>
            <input 
              className="input p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              type="url" 
              name="image"
            />
            {error.image && <p className="text-red-500 mt-2">{error.image}</p>}
          </article>
      
          {/* Descripción */}
          <article className="col-span-2 flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Descripción:</label>
            <textarea 
              className="input p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              name="description" 
              rows="3"
              required
            />
            {error.description && <p className="text-red-500 mt-2">{error.description}</p>}
          </article>
      
          {/* Precio */}
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Precio:</label>
            <input 
              className="input p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              type="number" 
              step="0.01" 
              name="price" 
              required
            />
            {error.price && <p className="text-red-500 mt-2">{error.price}</p>}
          </article>
      
          {/* Cantidad */}
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Cantidad:</label>
            <input 
              className="input p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              type="number" 
              name="stock" 
              required
            />
            {error.stock && <p className="text-red-500 mt-2">{error.stock}</p>}
          </article>
      
          {/* Tipo de servicio */}
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Tipo de servicio:</label>
            <select 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              name="Service_type" 
              required
            >
              <option value="">-------</option>
              {serviceTypes && serviceTypes.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
            {error.ServiceType && <p className="text-red-500 mt-2">{error.ServiceType}</p>}
          </article>
      
          {/* Tipo de motor */}
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Motor:</label>
            <select 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              name="motor" 
              required
            >
              <option value='none'>seleccionar</option>
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
              {/* <option value="GNC">GNC</option> */}
            </select>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {input.motor.length > 0 && input.motor.map((e, index) => (
                <span 
                  key={index} 
                  onClick={() => removeMotor(e)} 
                  className="px-3 py-1 bg-gray-200 rounded-full cursor-pointer"
                >
                  {e} <span className="text-red-500">x</span>
                </span>
              ))}
            </div>
            {error.motor && <p className="text-red-500 mt-2">{error.motor}</p>}

          </article>
          <article className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">marca de auto:</label>
            <select 
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
              name="brandCar" 
              required
            >
              <option value='none'>seleccionar</option>
              <option value='allBrands'>todas las marcas</option>
              {brands.brands && brands.brands.map(b => {
                return <option key={b._id} value={b._id}>{b.name}</option>
              })}
            </select>
            </article>

            <div className="flex flex-wrap gap-4 mt-4">
                    {showBrand.length > 0 && showBrand.map((e, index) => (
                    <span 
                        key={index} 
                        onClick={() => removeBrand(e)} 
                        className="flex items-center space-x-2 bg-transparent border border-gray-300 rounded-full cursor-pointer px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                    <img 
                        src={e.image} 
                        alt={e.name} 
                        className="w-8 h-8 object-contain" 
                    />
                    <span className="text-gray-700">{e.name}</span>
                    <span className="text-red-500 font-bold hover:text-red-700">x</span>
                </span>
                ))}
            </div>
      
          {/* Botón de enviar */}
          <div className="col-span-2 text-center">
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
      
    )
}

export default AddProduct;