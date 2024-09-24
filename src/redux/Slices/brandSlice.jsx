import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Define la URL base de la API

// Crear una acción asincrónica para obtener todas las marcas de autos
export const getAllBrandCars = createAsyncThunk('brand/getAllBrandCars', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}brand`);
  return response.data; // Esto es lo que se guardará en el estado global
});

const postBrand = (data) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}brand`, data)
  .then(res => res).catch(error => error.response);
}

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addNewBrand: (state, action) => {

      postBrand(action.payload)
      .then(res => {
        console.log(res.data.message)
        alert(res.data.message)
      })
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrandCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBrandCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(getAllBrandCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {addNewBrand} = brandSlice.actions;


export default brandSlice.reducer;
