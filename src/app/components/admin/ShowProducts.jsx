const { useEffect, useState } = require("react")
const { useDispatch, useSelector } = require("react-redux")
import {getAllProducts,deleteOneProduct} from "./../../../redux/Slices/serviceSlice"

const ShowProducts = () => {

    const dispatch = useDispatch()
    const {products} = useSelector(s => s.service)

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) =>{
        const isConfirmed = window.confirm('¿Seguro que quieres eliminar?');
  
        if (isConfirmed) {
            dispatch(deleteOneProduct(id))
            
        } else {
            console.log('Eliminación cancelada');
        }
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(()=>{
        dispatch(getAllProducts())
    },[])


    return(
        <div>
            <div className="flex flex-col justify-center md:flex-row  p-4 mb-2">
                <div className="justify-center flex-1">nombre</div>
                <div className="justify-center flex-1">descripcion</div>
                <div className="justify-center flex-1">precio</div>
                <div className="justify-center flex-1">cantidad</div>
                <div className="justify-center flex-1">motor</div>
                <div className="justify-center flex-1">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>
            <ul className='table-list'>
                
                { filteredProducts ? filteredProducts.map(p => {
                    return <div key={p._id} className="flex flex-col justify-center md:flex-row bg-gray-100 p-4 mb-2 rounded-lg shadow-md">
                        <div className="justify-center flex-1 font-bold text-lg text-blue-600 mb-2 md:mb-0">{p.name}</div> 
                        <div className="justify-center flex-1  text-gray-500">{p.description}</div>
                        <div className="justify-center flex-1 text-gray-500">
                            <p>$ {parseFloat(p.price.$numberDecimal)}</p>
                        </div>
                        <div className="justify-center flex-1 text-gray-500">{p.stock}</div>
                        <div className="justify-center flex-1 text-gray-500">{p.motor.map(m => <p key={m}>{m}</p>)}</div>
                        <div className="items-center justify-center">
                        <button className='flex-1 simple-button text-red-500 bg-grey px-2 mx-2 ' onClick={() => handleDelete(p._id)}>eliminar</button>
                        </div>
                        {/* <button  className='text-blue-500 bg-grey px-2 mx-2 '>actualizar</button> */}
                    </div>}
                ):
                <li className='table-row'><span className='col'>No hay productos</span></li>}
            </ul>
        </div>
    )
}

export default ShowProducts;