import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Pause, PlayArrow, Stop } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteTimerById } from '../../../redux/actions/timerActions';
import ComfirmationModal from '../../Shared/Modals/ComfirmationModal';

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
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDeleteTimer = () => {
    dispatch(deleteTimerById(timer.id));
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      <Grid container>
        <Grid item md={3}>
          <IconButton className={classes.btnPlay}>
            <PlayArrow />
          </IconButton>
          <IconButton className={classes.btnPlay} disabled>
            <Pause />
          </IconButton>
          <IconButton className={classes.btnPlay} disabled>
            <Stop />
          </IconButton>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h3">00:05:45</Typography>
        </Grid>
        <Grid item md={6}>
          <TextField label="Comment" fullWidth type="text" variant="outlined" />
        </Grid>
      </Grid>
      <div className={classes.actionWrapper}>
        <ComfirmationModal
          triggerBtn={{ type: 'deleteBtn', text: 'Delete timer' }}
          title={`Are you sure you want to delete this timer?`}
          action={handleDeleteTimer}
        />
        <div>
          <Button variant="outlined" color="primary">
            Save timer
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnMarginLeft}
          >
            Add
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default Timer;
