import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const localUrl = "http://localhost:3001/"
// process.env.NEXT_PUBLIC_API_URL
// const apiUrl = process.env.NEXT_PUBLIC_API_URL || localUrl;

export const postNewTurn = createAsyncThunk(
    'turn/post',
    async (data) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}turn/`, data);
      return response.data;
    }
  );

const brandSlice = createSlice({
    name: 'TurnDates',
    initialState: {
      car: null,
      services:[],
      servicesCount:0,
      customer: null,
      date: null,
      products: [],
      status: 'idle',
      response: null,
      error: null
    },
    reducers: {

        setDatesCar: (state, action) => {
            state.car = action.payload;
        },

        setProducts: (state, action) => {
            state.products = action.payload;
        },

        setDatesServices: (state, action) => {
            state.services =  action.payload;
        },

        setDateCustomer : (state, action) => {
            state.customer = action.payload;
        },

        setDataDates : (state, action) => {
          state.date = action.payload;
        },

        setAllState: (state) => {
          state.car = null;
          state.services = [];
          state.servicesCount = 0;
          state.customer = null;
          state.date = null;
          state.products = [];
          state.status = 'idle';
          state.response = null;
          state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(postNewTurn.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postNewTurn.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.response = action.payload;
          })
          .addCase(postNewTurn.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error;
          })
    }
    
});

export const {setDatesCar, setAllState, 
  setProducts,setDatesServices,setDateCustomer, setDataDates} = brandSlice.actions;

export default brandSlice.reducer