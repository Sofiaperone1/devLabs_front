import React, {useState} from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs'; // Asegúrate de importar dayjs

interface DateSelectorProps {
  setValue: (name: string, value: any) => void; // Recibimos setValue desde el formulario
  resetDate: boolean; // Agrega la propiedad resetDate
}

const DateSelector: React.FC<DateSelectorProps> = ({ setValue, resetDate }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (newDate: Dayjs | null) => {
    setValue('date', newDate ? newDate.toDate() : null);
    setSelectedDate(newDate); // Actualiza el estado local de la fecha
  };

  // Restablecer la fecha cuando 'resetDate' cambie a 'true'
  React.useEffect(() => {
    if (resetDate) {
      setSelectedDate(null); // Restablece la fecha al valor inicial
    }
  }, [resetDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Selecciona una fecha"
        value={selectedDate}
        onChange={handleDateChange}
        format="DD-MM-YYYY"
        slotProps={{ textField: { fullWidth: true } }}
        minDate={dayjs()} // Bloquea las fechas pasadas
      />
    </LocalizationProvider>
  );
};


export default DateSelector;
