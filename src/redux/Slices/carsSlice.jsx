import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la URL base de la API
const apiUrl = 'http://localhost:3000'

// Crear una acción asincrónica para obtener todas las marcas de autos
export const getAllCars = createAsyncThunk('cars/getAllCars', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}car`);
  return response.data; // Esto es lo que se guardará en el estado global
});


const postCar = async (data) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}car`, data);
    return res;
  } catch (error) {
    return error.response;
  }
}



const CarSlice = createSlice({
  name: 'car',
  initialState: {
    cars: [],
    status: 'idle',
    error: null,
    allCars: []
  },
  reducers: {
    filterByBrand: (state, action) => {
      if(action.payload == 'all') state.cars = state.allCars;
      else state.cars = state.allCars.filter(e => e.brand._id === action.payload);
    },
    addNewCar: (state, action) => {

      postCar(action.payload)
      .then(res => {
        alert(res.data.message)
      })

    },

    deleteCar: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cars = action.payload;
        state.allCars = action.payload
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {filterByBrand, addNewCar, deleteCar} = CarSlice.actions;

export default CarSlice.reducer;