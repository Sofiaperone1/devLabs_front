import React, {useEffect,useState} from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs'; // Asegúrate de importar dayjs

interface DateSelectorProps {
  setValue: (name: string, value: any) => void;
  resetDate: boolean;
  initialDate?: string; // Añadimos la prop initialDate como opcional
}

const DateSelector: React.FC<DateSelectorProps> = ({ setValue, resetDate, initialDate }) => {
  // Inicializamos selectedDate con la fecha inicial si existe
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(() => 
    initialDate ? dayjs(initialDate) : null
  );

  // Efecto para manejar la fecha inicial cuando cambia
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(dayjs(initialDate));
    }
  }, [initialDate]);

  const handleDateChange = (newDate: Dayjs | null) => {
    setValue('date', newDate ? newDate.toDate() : null);
    setSelectedDate(newDate);
  };

  // Efecto para manejar el reseteo de la fecha
  useEffect(() => {
    if (resetDate) {
      setSelectedDate(null);
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
        minDate={dayjs()}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
