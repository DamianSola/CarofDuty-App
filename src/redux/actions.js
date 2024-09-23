// import axios from "axios";
// // const apiUrl = process.env.NEXT_PUBLIC_API_URL
// const apiUrl = 'http://localhost:3000'

// export const getAllBrandCars = () => {
//     return (dispatch) => {
//       axios.get(`${apiUrl}/brand`)
//         .then(response => {
//           dispatch({
//             type: 'GET_ALL_BRAND_CARS',
//             payload: response.data
//           });
//         })

//     };
//   };
  

// export const getAllCars = async () => {

//     let cars = await axios.get(`${apiUrl}/car`)
   
//     return cars;
// }

// export const getAllServices = (brand) => {
//     return (dispatch) => {
//         axios.get(`${apiUrl}/api/brand/${brand}`)
//         .then(response => {
//             dispatch({ type: 'GET_ALL_SERVICES', payload: response.data })
//         })
//     }
// }

