import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import { Pause, PlayArrow, Stop } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  deleteTimerById,
  updateTimer,
} from '../../../redux/actions/timerActions';
import ComfirmationModal from '../../Shared/Modals/ComfirmationModal';
import Counter from './Counter';
import firebase from '../../../firebase/firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  btnPlay: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    marginRight: 8,
    marginLeft: 8,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  actionWrapper: {
    paddingTop: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnMarginLeft: {
    marginLeft: 8,
  },
}));

const Timer = ({ timer }) => {
  const [comment, setComment] = useState('');
  const [playBtn, setPlayBtn] = useState(false);
  const [pauseBtn, setPauseBtn] = useState(true);
  const [resetBtn, setResetBtn] = useState(true);
  const [differenceInSeconds, setDifferenceInSeconds] = useState(0);
  const [interv, setInterv] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleDeleteTimer = () => {
    dispatch(deleteTimerById(timer.id));
  };

  const handleSaveTimer = () => {
    dispatch(
      updateTimer({
        id: timer.id,
        comment,
      })
    );
  };

  const handleStartTimer = () => {
    setPlayBtn(true);
    setPauseBtn(false);
    setResetBtn(false);
    setInterv(setInterval(runTimer, 1000));
    if (timer.start === 0) {
      dispatch(
        updateTimer({
          id: timer.id,
          start: firebase.firestore.Timestamp.fromDate(new Date()),
          isRunning: true,
        })
      );
    } else {
      dispatch(
        updateTimer({
          id: timer.id,
          tempStart: firebase.firestore.Timestamp.fromDate(new Date()),
          isRunning: true,
        })
      );
    }
  };

  const handlePauseTimer = () => {
    setInterv(clearInterval(interv));
    setPauseBtn(true);
    setPlayBtn(false);
    dispatch(
      updateTimer({
        id: timer.id,
        lastValue: differenceInSeconds,
        isRunning: false,
      })
    );
  };

  const handleResetTimer = () => {
    setResetBtn(true);
    setPlayBtn(false);
    setPauseBtn(true);
    setInterv(clearInterval(interv));
    setDifferenceInSeconds(0);
    dispatch(
      updateTimer({
        id: timer.id,
        start: 0,
        tempStart: 0,
        lastValue: 0,
        isRunning: false,
      })
    );
  };

  const handleAddTimer = () => {
    dispatch(
      updateTimer({
        id: timer.id,
        isRunning: false,
        lastValue: differenceInSeconds,
        isOpen: false,
        comment,
      })
    );
  };
  //TODO handleAddTimer -> isOpen: false

  const runTimer = () => {
    const dateNow = new Date();
    const timerStart =
      timer.tempStart === 0 ? timer.start.toDate() : timer.tempStart.toDate();
    const difference = Math.floor((dateNow - new Date(timerStart)) / 1000);
    setDifferenceInSeconds(difference + timer.lastValue);
  };

  useEffect(() => {
    setComment(timer.comment);
    setDifferenceInSeconds(timer.lastValue);
  }, [timer]);

  useEffect(() => {
    if (differenceInSeconds === 0) {
      setResetBtn(false);
    } else {
      setResetBtn(true);
    }
    if (timer.isRunning) {
      setPlayBtn(true);
      setPauseBtn(false);
      setInterv(setInterval(runTimer, 1000));
      runTimer();
    }
    return () => {
      setInterv(clearInterval(interv));
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Paper elevation={4} className={classes.paper}>
      <Grid container>
        <Grid item md={3}>
          <IconButton
            className={classes.btnPlay}
            disabled={playBtn}
            onClick={() => handleStartTimer()}
          >
            <PlayArrow />
          </IconButton>
          <IconButton
            className={classes.btnPlay}
            disabled={pauseBtn}
            onClick={() => handlePauseTimer()}
          >
            <Pause />
          </IconButton>
          <IconButton
            className={classes.btnPlay}
            disabled={resetBtn}
            onClick={() => handleResetTimer()}
          >
            <Stop />
          </IconButton>
        </Grid>
        <Grid item md={3}>
          <Counter timer={differenceInSeconds} />
        </Grid>
        <Grid item md={6}>
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
          triggerBtn={{ type: 'deleteBtn', text: 'Delete timer' }}
          title={`Are you sure you want to delete this timer?`}
          action={handleDeleteTimer}
        />
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSaveTimer()}
          >
            Save timer
          </Button>
          <Button
            variant="contained"
            color="primary"
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

export default Timer;
