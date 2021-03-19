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

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 20,
    padding: 24,
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
  btnDelete: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  actionWrapper: {
    paddingTop: 16,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnMarginLeft: {
    marginLeft: 8,
  },
}));

const Timer = () => {
  const classes = useStyles();
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
        <Button variant="outlined" className={classes.btnDelete}>
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnMarginLeft}
        >
          Add
        </Button>
      </div>
    </Paper>
  );
};

export default Timer;
