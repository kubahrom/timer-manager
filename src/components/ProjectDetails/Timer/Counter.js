import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

const Counter = ({ timer }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleNull = number => {
    return number <= 9 ? '0' + number : number;
  };

  useEffect(() => {
    const h = Math.floor(timer / 3600);
    setHours(h);
    const hoursModulo = timer % 3600;
    const min = Math.floor(hoursModulo / 60);
    setMinutes(min);
    const sec = hoursModulo % 60;
    setSeconds(sec);
  }, [timer]);

  return (
    <Typography variant="h3">
      {handleNull(hours)}:{handleNull(minutes)}:{handleNull(seconds)}
    </Typography>
  );
};

export default Counter;
