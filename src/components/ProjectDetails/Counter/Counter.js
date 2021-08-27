import { makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { getHoursMinutesSecondsFromSeconds } from "../../../utils/calculateTime";

const useStyles = makeStyles((theme) => ({
  text: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "3.6rem",
    },
  },
  smallerText: {
    fontSize: "2.5rem",
  },
}));

const Counter = ({ timer }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const classes = useStyles();

  const handleNull = (number) => {
    return number <= 9 ? "0" + number : number;
  };

  useEffect(() => {
    const time = getHoursMinutesSecondsFromSeconds(timer);
    setHours(time.hours);
    setMinutes(time.minutes);
    setSeconds(time.seconds);
  }, [timer]);

  return (
    <Typography
      variant="h3"
      className={clsx(classes.text, hours > 999 ? classes.smallerText : "")}
    >
      {handleNull(hours)}:{handleNull(minutes)}:{handleNull(seconds)}
    </Typography>
  );
};

export default Counter;
