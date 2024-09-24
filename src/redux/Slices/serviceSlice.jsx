import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la URL base de la API
const apiUrl = 'http://localhost:3000'

// Crear una acción asincrónica para obtener todas las marcas de autos
export const getAllServiceTypes = createAsyncThunk('service/getAllServiceType', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}service-type`);
  return response.data; // Esto es lo que se guardará en el estado global
});

export const getAllProducts = createAsyncThunk('product/getAllproduct', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}product`);
  return response.data; // Esto es lo que se guardará en el estado global
});

  

const postProduct = async (data) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}product`, data);
    return res;
  } catch (error) {
    return error.response;
  }
}

const postService = async (data) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}service`, data);
    return res;
  } catch (error) {
    return error.response;
  }
}

const deleteService = async (id) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}service-type/${id}`);
    return res;
  } catch (error) {
    return error.response;
  }
}

const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}product/${id}`);
    return res;
  } catch (error) {
    return error.response;
  }
}



const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    serviceTypes: [],
    status: 'idle',
    error: null,
    products:[],
    cant: null
  },
  reducers: {
    addNewProduct: (state, action) => {

      postProduct(action.payload)
        .then(res => res.statusText)
    },

    deleteServiceType : (state, action ) => {
      state.serviceTypes = state.serviceTypes.filter(service => service._id !== action.payload)
      state.cant = state.cant-1
      deleteService(action.payload).then(res => res)
    },

    deleteOneProduct: (state, action ) => {
      state.products = state.products.filter(service => service._id !== action.payload)
      state.cant = state.cant-1
      deleteProduct(action.payload).then(res => res)
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllServiceTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.serviceTypes = action.payload.data;
        state.cant = action.payload.cant;
      })
      .addCase(getAllServiceTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const {deleteServiceType, deleteOneProduct,addNewProduct } = serviceSlice.actions;


export default serviceSlice.reducer;
