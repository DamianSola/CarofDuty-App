'use client'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import AddCar from './../admin/AddCars'
import AddBrand from './../admin/AddBrand'
import ShowCars from './../admin/ShowCars'
import AddProduct from './../admin/AddProduct'
import ShowProducts from './../admin/ShowProducts'
// import ShowBrand from './../admin/ShowBrand'
import ShowService from './../admin/ShowServices'
import ShowTurns from '../admin/Showturns';
import BrandHome from '../BrandHome/BrandHome';



const DashSection = ({title, date}) => {

    const [add, setAdd] = useState(false)
    const [see, setSee] = useState(false)
    // console.log(date)

    return(
        <section className="font-semibold rounded-md my-2 p-2 w-auto flex-col bg-white shadow-md hover:bg-gray-100 transition-colors">
            <div className='block justify-between items-center py-4 '>
            
                <h1  className="text-xl font-bold mb-4">{title}</h1>
                <aside className='flex items-center'>
                    {/* <p className='px-2 mx-2 text-sm'>{date.count} datos</p> */}
                    <button className='simple-button' 
                        onClick={() => setSee(!see) + setAdd(false)}>
                        {see ? "ocultar" : "ver"}
                    </button>
                    {title !== 'turnos' &&
                    <button className='simple-button' 
                        onClick={() => setAdd(!add) + setSee(false)}>
                        {add ? "ocultar" : "agregar"}
                    </button>}
                </aside>
              
            </div>
            {
                title == 'Autos' ? add && <AddCar open={add} brand={date}/> :
                title == 'Marcas' ? add && <AddBrand open={add}/> : 
                title == 'Servicios' ? add && <div>No disponible</div> : 
                title == 'Productos'? add && <AddProduct apen={add}/> : null
            }
            {
                title == 'Autos' ? see && <ShowCars brand={date} close={() => setSee(false)}/> :
                title == 'Marcas' ? see && <BrandHome brand={date} close={() => setSee(false)}/> :
                title == 'Servicios' ? see && <ShowService close={() => setSee(false)}/> :
                title == 'Productos'? see && <ShowProducts close={() => setSee(false)}/> :
                title == 'Turnos' ? see && <ShowTurns/> : null
            }
        </section>
    )
}

export default DashSection;