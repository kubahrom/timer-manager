import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Paper,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  deleteTimerById,
  updateTimer,
} from "../../../redux/actions/timerActions";
import ComfirmationModal from "../../Shared/Modals/ComfirmationModal";
import { motion } from "framer-motion";
import clsx from "clsx";
import firebase from "../../../firebase/firebase";
import {
  getHoursMinutesSecondsFromSeconds,
  getTimeInSeconds,
} from "../../../utils/calculateTime";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  btnsWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginBottom: 8,
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: 8,
    },
  },
  actionWrapper: {
    paddingTop: 16,
    display: "flex",
    justifyContent: "space-between",
  },
  btnMarginLeft: {
    marginLeft: 8,
  },
  counterWrapper: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "center",
      padding: 16,
    },
  },
  lightBtn: {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
  },
  timeInput: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 8,
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "calc((100% - 16px) /3)",
    },
  },
  timeInputMiddle: {
    [theme.breakpoints.up("sm")]: {
      margin: "0 8px",
    },
  },
}));

const ManualTimer = ({ timer }) => {
  const [comment, setComment] = useState("");
  const [time, setTime] = useState({ hours: "", minutes: "", seconds: "" });
  const dispatch = useDispatch();
  const classes = useStyles();

  const timerDetailVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const handleTimeChange = ({ target: { name, value } }) => {
    if (name === "minutes" || name === "seconds") {
      if (value > 60 || isNaN(value)) return;
      setTime({
        ...time,
        [name]: value === "" ? "" : parseInt(value).toString(),
      });
    } else {
      const regex = /^[0-9\b]{0,6}$/;
      if (value === "" || regex.test(value)) {
        setTime({
          ...time,
          [name]: value === "" ? "" : parseInt(value).toString(),
        });
      }
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDeleteTimer = () => {
    dispatch(deleteTimerById(timer.id));
  };

  const handleSaveTimer = () => {
    dispatch(
      updateTimer({
        id: timer.id,
        lastValue: getTimeInSeconds(
          isNaN(parseInt(time.hours)) ? 0 : parseInt(time.hours),
          isNaN(parseInt(time.minutes)) ? 0 : parseInt(time.minutes),
          isNaN(parseInt(time.seconds)) ? 0 : parseInt(time.seconds)
        ),
        comment,
      })
    );
  };

  const handleAddTimer = () => {
    const timeInSeconds = getTimeInSeconds(
      isNaN(parseInt(time.hours)) ? 0 : parseInt(time.hours),
      isNaN(parseInt(time.minutes)) ? 0 : parseInt(time.minutes),
      isNaN(parseInt(time.seconds)) ? 0 : parseInt(time.seconds)
    );
    if (timeInSeconds === 0) return;
    dispatch(
      updateTimer({
        id: timer.id,
        isRunning: false,
        lastValue: timeInSeconds,
        isOpen: false,
        comment,
        start: firebase.firestore.Timestamp.fromDate(new Date()),
      })
    );
  };

  useEffect(() => {
    setComment(timer.comment);
    const timeValues = getHoursMinutesSecondsFromSeconds(timer.lastValue);
    setTime({
      hours: timeValues.hours || "",
      minutes: timeValues.minutes || "",
      seconds: timeValues.seconds || "",
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Paper
      elevation={4}
      className={classes.paper}
      component={motion.div}
      variants={timerDetailVariants}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={6} className={classes.btnsWrapper}>
          <FormControl variant="outlined" className={classes.timeInput}>
            <OutlinedInput
              placeholder="0"
              value={time.hours}
              onChange={handleTimeChange}
              name="hours"
              type="text"
              endAdornment={
                <InputAdornment position="end">hour</InputAdornment>
              }
              labelWidth={0}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            className={clsx(classes.timeInput, classes.timeInputMiddle)}
          >
            <OutlinedInput
              placeholder="0"
              value={time.minutes}
              onChange={handleTimeChange}
              name="minutes"
              type="text"
              endAdornment={<InputAdornment position="end">min</InputAdornment>}
              labelWidth={0}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.timeInput}>
            <OutlinedInput
              placeholder="0"
              value={time.seconds}
              onChange={handleTimeChange}
              name="seconds"
              type="text"
              endAdornment={<InputAdornment position="end">sec</InputAdornment>}
              labelWidth={0}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            label="Comment"
            fullWidth
            type="text"
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
          />
        </Grid>
      </Grid>
      <div className={classes.actionWrapper}>
        <ComfirmationModal
          triggerBtn={{ type: "deleteBtn", text: "Delete" }}
          title={`Are you sure you want to delete this manual time record?`}
          action={handleDeleteTimer}
        />
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSaveTimer()}
            className={classes.lightBtn}
          >
            Save values
          </Button>
          <Button
            variant="contained"
            color="primary"
            // disabled={differenceInSeconds === 0}
            className={classes.btnMarginLeft}
            onClick={() => handleAddTimer()}
          >
            Add
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default ManualTimer;
