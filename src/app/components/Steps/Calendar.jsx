import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import {setDataDates} from './../../../redux/Slices/datesSlices'
import Button from "../ui/Button";
import Select from "../ui/Select";
import Label from "../ui/Label";
import Card from "../ui/Card";
import Alert from "../ui/Alert";

const Calendar = ({sprint}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [feedback, setFeedback] = useState(null);
  const dispatch = useDispatch();

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
      const [hours, minutes] = selectedTime.split(':').map(Number);
      selectedDate.setHours(hours, minutes, 0, 0);
      const utcDate = selectedDate.toISOString();
      dispatch(setDataDates(utcDate))
      sprint(5)
    } else {
      setFeedback("Por favor seleccioná una fecha y hora.");
    }
  };

  return (
    <Card className="mx-auto w-full p-5 sm:p-7">
        <p className="text-lg font-semibold text-accent">Paso 4</p>
      <h1 className="mb-6 text-center text-2xl font-bold">Seleccioná tu fecha y horario</h1>
      {feedback ? <Alert variant="danger" role="alert" className="mb-4">{feedback}</Alert> : null}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fecha">Fecha</Label>
          <DatePicker
            id="fecha"
            selected={selectedDate}
            onChange={handleDateChange}
            className="field-control w-full rounded-sm px-3"
            minDate={new Date()}
            placeholderText="Seleccioná una fecha"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <Label htmlFor="horario">Horario</Label>
          <Select
            id="horario"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="">Seleccioná una hora</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Confirmar
        </Button>
      </form>
    </Card>
  );
};

export default Calendar;
