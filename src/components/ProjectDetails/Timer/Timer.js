import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
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
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  btnsWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 16,
    },
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'space-around',
    },
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
    [theme.breakpoints.only('sm')]: {
      marginRight: 24,
      marginLeft: 24,
      padding: 14,
    },
    [theme.breakpoints.only('xs')]: {
      padding: 14,
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
  counterWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
      padding: 16,
    },
  },
  lightBtn: {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
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

  const timerDetailVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

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
    const timerDate = timer.start === 0 ? 'start' : 'tempStart';
    dispatch(
      updateTimer({
        id: timer.id,
        [timerDate]: firebase.firestore.Timestamp.fromDate(new Date()),
        isRunning: true,
      })
    );
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
    setInterv(clearInterval(interv));
    setDifferenceInSeconds(0);
    setResetBtn(true);
    setPlayBtn(false);
    setPauseBtn(true);
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

  const runTimer = () => {
    const dateNow = new Date();
    const timerStart =
      timer.tempStart === 0 ? timer.start.toDate() : timer.tempStart.toDate();
    const difference = Math.floor((dateNow - new Date(timerStart)) / 1000);
    setDifferenceInSeconds(difference + timer.lastValue);
  };

  useEffect(() => {}, [timer]);

  useEffect(() => {
    setComment(timer.comment);
    setDifferenceInSeconds(timer.lastValue);
    if (timer.lastValue !== 0 || timer.isRunning === true) {
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
    <Paper
      elevation={4}
      className={classes.paper}
      component={motion.div}
      variants={timerDetailVariants}
    >
      <Grid container>
        <Grid item xs={12} sm={7} md={3} className={classes.btnsWrapper}>
          <Tooltip
            placement="top"
            title={
              !playBtn ? (differenceInSeconds === 0 ? 'Start' : 'Resume') : ''
            }
          >
            <span>
              <IconButton
                className={classes.btnPlay}
                disabled={playBtn}
                onClick={() => handleStartTimer()}
              >
                <PlayArrow />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip placement="top" title={!pauseBtn ? 'Pause' : ''}>
            <IconButton
              className={classes.btnPlay}
              disabled={pauseBtn}
              onClick={() => handlePauseTimer()}
            >
              <Pause />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title={!resetBtn ? 'Reset' : ''}>
            <span>
              <IconButton
                className={classes.btnPlay}
                disabled={resetBtn}
                onClick={() => handleResetTimer()}
              >
                <Stop />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={5} md={3} className={classes.counterWrapper}>
          <Counter timer={differenceInSeconds} />
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
          triggerBtn={{ type: 'deleteBtn', text: 'Delete timer' }}
          title={`Are you sure you want to delete this timer?`}
          action={handleDeleteTimer}
        />
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSaveTimer()}
            className={classes.lightBtn}
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
