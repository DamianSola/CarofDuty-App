'use client'
import {useState, useEffect} from "react"
import { useDispatch } from "react-redux";
import {setDateCustomer} from "./../../../redux/Slices/datesSlices"

const Step3 = ({sprint}) => {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        name: "", email:"" , phone:""
    })

    const handleChange = (e) => {
        let {name, value} = e.target

        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setDateCustomer(input))
        setInput({})
        sprint(4)
    }


    return (
        <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg border-2 border-gray-200 mb-6 mx-auto">
        <p className="text-lg font-semibold text-blue-600">Paso 3</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ingresa tus datos</h2>
        
      
        <form onSubmit={handleSubmit} onChange={handleChange}>

            <section className="w-full mb-4">
                <label className="block text-gray-600 font-medium mb-2">Nombre y Apellido</label>
                    <input className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="text" name='name'/>
            </section>
      
            <section className="w-full mb-4">
                <label className="block text-gray-600 font-medium mb-2">e-mail</label>
                    <input className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="text" name='email'/>
            </section>

            <section className="w-full mb-4">
                <label className="block text-gray-600 font-medium mb-2">telefono</label>
                    <input className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="text" name='phone'/>
            </section>
                <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    type="submit"
                >
                    Siguiente
                </button>
        </form>
       
    </div>
      
    )
}

export default Step3;