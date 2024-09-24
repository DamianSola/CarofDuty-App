import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTurns,fetchTurnById, getByNumber, getByDate, getByCustomer} from '../../../redux/Slices/turnSlice'
import Pagination from "../Pagination";
import ModalTurn from './ModalTurn'

const ShowTurns = () => {

    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [itemsPerPage] = useState(8);
    const [day, setDay] = useState(null)
    const [open, setOpen] = useState(false)


    const dispatch = useDispatch()
    const {turns,allTurns,turnById, status} = useSelector(state => state.turn)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = turns.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredCustomer = (e) => {
        
        let {value} = e.target;
      
        let byCustomer =  allTurns.filter((data) =>
            data.customer.name.toLowerCase().includes(value.toLowerCase())
        )
        dispatch(getByCustomer(byCustomer))
    }

    const filteredNumber = (e) => {
        let {value} = e.target;
        let byNumber = value ? allTurns.filter((data) => data.turnNumber == value) : allTurns
        dispatch(getByNumber(byNumber))
    }

    const filteredDate = (e) => {
        let date = new Date().toISOString().slice(0, 10);
        let {value} = e.target;
        console.log(date)
    }

    const detailTurn = (data) => {
        // console.log(data)
        dispatch(fetchTurnById(data))
        setOpen(true)
    }


    useEffect(() => {
        dispatch(getAllTurns())
        let date = new Date().toISOString().slice(0, 10);
        setDay(date)
    },[day])

    if(status === 'loading') return <di>cargando...</di>
    
    return(

        <div>
{/* 
            <div className="flex flew-row">
            </div> */}
            {!turnById ? null : <ModalTurn  isOpen={open} onClose={setOpen} turn={turnById}/>}
            

            <ul className='py-8'>

                <Pagination itemsPerPage={itemsPerPage} totalItems={turns.length} paginate={paginate}/>

                <div className="flex flex-row p-4 mb-2 bg-white rounded-lg shadow-md text-left">
                    <aside className="flex-1 font-bold text-lg text-gray-600 md:mb-0 max-w-40 px-2">Número
                        <input
                        type="text"
                        placeholder="Buscar numero..."
                        onChange={filteredNumber}
                        className="w-full p-2 border text-xs rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        />
                    </aside>
                    <aside className="flex-1 font-bold text-lg text-gray-600 mb-2 md:mb-0 max-w-60 px-2">Cliente
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        onChange={filteredCustomer}
                        className="w-full p-2 border text-xs rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        />
                    </aside>
                    <aside className="flex-1 font-bold text-lg text-gray-600 mb-2 md:mb-0 max-w-60 px-2">fecha
                    <input
                        type="text"
                        placeholder="Buscar dia..."
                        onChange={filteredDate}
                        className="w-full p-2 border text-xs rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        />
                    </aside>
                    <aside className="flex-1 font-bold text-lg text-gray-800 mb-2 md:mb-0 max-w-40">Dia: {setDay}</aside>

                </div>
                    {currentItems ? currentItems.map((turn, index) => {
                    return (
                        <div className="flex flex-col md:flex-row bg-white hover:bg-gray-100 p-4 mb-2 rounded-lg shadow-md" key={index}>
                            <div className="flex-1 font-bold text-lg text-blue-600 mb-2 md:mb-0 max-w-40">
                                {turn.turnNumber}
                            </div>
                            <aside className="flex-1 text-gray-600 mb-2 md:mb-0 max-w-60">
                                {turn.customer.name} 
                            </aside>
                            <aside className="flex-1 text-gray-500 ">
                            {new Date(turn.date).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                            
                            </aside>
                            <div className="flex-wrap">
                                <button className='simple-button text-red-500 ' onClick={() => detailTurn(turn._id)}>ver detalles</button>
                            </div>
                        </div>
                    );
                }):
                <div className="flex flex-col md:flex-row bg-white hover:bg-gray-100 p-4 mb-2 rounded-lg shadow-md">
                    vacío
                </div>}
            </ul>
        </div>
    )
}

export default ShowTurns;