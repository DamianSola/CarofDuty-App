import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = 'http://localhost:3000'


const postNewTrun = async(data) => {

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}turn`, data);
        return res;
      } catch (error) {
        return error.response;
      }
}

const brandSlice = createSlice({
    name: 'TurnDates',
    initialState: {
      car: null,
      services:[],
      servicesCount:0,
      customer: null,
      date: null,
      products: []
    },
    reducers: {

        setDatesCar: (state, action) => {
            state.car = action.payload;
        },

        setProducts: (state, action) => {
            //aca se guardan los productos compatibles con el auto del usuario
            state.products = action.payload;
        },

        setDatesServices: (state, action) => {
            state.services =  action.payload;
            // state.services =  state.services.concat(action.payload);
        },

        setDateCustomer : (state, action) => {
            state.customer = action.payload;
        },

        setDataDates : (state, action) => {
            state.date = action.payload;
        },

        createNewTurn : (state, action) => {
            postNewTrun(action.payload)
            .then(res => {
                // console.log(res.data.message)
                res.status === 200 && alert(res.data.message, 'pronto te llegara una mail con todos los detalles')
            })        
        }
    },
    
});

export const {setDatesCar, setProducts,setDatesServices,setDateCustomer, setDataDates, createNewTurn} = brandSlice.actions;

export default brandSlice.reducer