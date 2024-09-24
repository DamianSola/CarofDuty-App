'use client'
import { configureStore,  getDefaultMiddleware } from '@reduxjs/toolkit'
import brandReducer  from './Slices/brandSlice.jsx';
import carsReducer from './Slices/carsSlice.jsx';
import datesReducer from './Slices/datesSlices.jsx'
import serviceSlice from './Slices/serviceSlice.jsx'
import turnSlice from './Slices/turnSlice.jsx'

export const store = configureStore({
  reducer:{
    brand: brandReducer,
    car: carsReducer,
    data : datesReducer,
    service: serviceSlice,
    turn: turnSlice
  }
})

