// components/Calendar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import {setDataDates} from './../../../redux/Slices/datesSlices'

const Calendar = ({sprint}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const dispatch = useDispatch();
  


  // Horarios disponibles
  const availableTimes = [
    "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00",
    "16:00", "15:00"
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      // alert(`Fecha seleccionada: ${selectedDate.toLocaleDateString()}:${selectedTime}`);

      const [hours, minutes] = selectedTime.split(':').map(Number);

        // Ajustar la hora en la fecha seleccionada
      selectedDate.setHours(hours, minutes, 0, 0);  // Establece la hora, minutos, segundos y milisegundos

        // Convertir la fecha y hora ajustada a UT

        const utcDate = selectedDate.toISOString(); 

        dispatch(setDataDates(utcDate))
        sprint(5)
        
    } else {
      alert("Por favor selecciona una fecha y hora.");
    }
  };

  return (
    <div className="w-full border-2 mx-auto bg-white p-6 rounded-md shadow-md">
        <p className="text-lg font-semibold text-blue-600">Paso 4</p>
      <h1 className="text-2xl font-bold mb-4 text-center">Selecciona tu fecha y horario</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Fecha:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            minDate={new Date()}
            placeholderText="Selecciona una fecha"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Horario:</label>
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Selecciona una hora</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default Calendar;
