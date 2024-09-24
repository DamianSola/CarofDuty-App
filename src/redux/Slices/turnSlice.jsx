import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Define la URL base de la API

// Crear una acción asincrónica para obtener todas las marcas de autos
export const getAllTurns = createAsyncThunk('turn/getAllTurns', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}turn`);
  return response.data; // Esto es lo que se guardará en el estado global
});


export const fetchTurnById = createAsyncThunk(
    'turn/fetchById',
    async (turnId, thunkAPI) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}turn/${turnId}`);
      return response.data;
    }
  );

// const getTurnById = async (id) => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}turn/${id}`);
//       return res;
//     } catch (error) {
//       return error.response;
//     }
// }

const getTurnByNumber = async (id) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}turn?turnNumber"${id}`);
      return res;
    } catch (error) {
      return error.response;
    }
}

const turnSlice = createSlice({
  name: 'turns',
  initialState: {
    turns: [],
    status: 'idle',
    error: null,
    allTurns: [],
    turnByNumber: {},
    turnById: null
  },
  reducers: {

    getByDate: (state,action) => {
        state.turns = action.payload;
    },

    // getOne: async (state,action) => {
    //     const myTurn = await getTurnById(action.payload)
    //     state.turnById =  myTurn.data
    // },

    getByNumber: (state,action) => {
        state.turns = action.payload;
    },

    getByCustomer: (state,action) => {
        state.turns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTurns.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTurns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allTurns = action.payload;
        state.turns = action.payload;
      })
      .addCase(getAllTurns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTurnById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Cuando la petición es exitosa
      .addCase(fetchTurnById.fulfilled, (state, action) => {
        state.turnById = action.payload;
        state.loading = false;
      })
      // Cuando la petición falla
      .addCase(fetchTurnById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {getOne, getByNumber, getByDate, getByCustomer} = turnSlice.actions;


export default turnSlice.reducer;
