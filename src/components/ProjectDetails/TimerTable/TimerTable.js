import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import EditTimerMenu from './EditTimerMenu';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  table: {
    minWidth: 600,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 16,
  },
  settings: {
    color: theme.palette.action.disabled,
    '&:hover': {
      color: theme.palette.action.active,
    },
  },
  tableHeadRow: {
    '& th': {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      padding: 8,
    },
  },
  tableRow: {
    '& td': {
      padding: 8,
    },
  },
  tableCellDate: {
    width: 120,
  },
  tableCellLength: {
    width: 160,
  },
  tableCellName: {
    width: 160,
  },
  tableCellEdit: {
    width: 20,
  },
  totalWrapper: {
    paddingTop: 24,
  },
  totalTime: {
    color: theme.palette.text.secondary,
  },
  test: {
    padding: 8,
  },
}));

const TimerTable = ({ timers }) => {
  const { firstName, lastName } = useSelector(state => state.user.user);
  const classes = useStyles();
  const totalTime = timers.reduce((acc, cur) => acc + cur.lastValue, 0);

  const getTimerLength = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const hoursModulo = timeInSeconds % 3600;
    const minutes = Math.floor(hoursModulo / 60);
    const seconds = hoursModulo % 60;
    const hoursString = hours > 0 ? hours + ' h ' : '';
    const minutesString = minutes > 0 ? minutes + ' min ' : '';
    const secondsString = seconds > 0 ? seconds + ' sec' : '';
    return hoursString + minutesString + secondsString;
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      <div className={classes.titleWrapper}>
        <Typography variant="h5" component="h2">
          Completed timers
        </Typography>
        <IconButton>
          <Settings className={classes.settings} />
        </IconButton>
      </div>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              <TableCell>Date</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>From</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timers.map(timer => (
              <TableRow key={timer.id} className={classes.tableRow}>
                <TableCell className={classes.tableCellDate}>
                  {new Date(timer.start.toDate()).toLocaleDateString()}
                </TableCell>
                <TableCell className={classes.tableCellLength}>
                  {getTimerLength(timer.lastValue)}
                </TableCell>
                <TableCell className={classes.tableCellName}>
                  {firstName} {lastName}
                </TableCell>
                <TableCell>{timer.comment}</TableCell>
                <TableCell className={classes.tableCellEdit}>
                  <EditTimerMenu timerId={timer.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" component="h3" className={classes.totalWrapper}>
        <span className={classes.totalTime}>Total time: </span>
        {getTimerLength(totalTime)}
      </Typography>
    </Paper>
  );
};

export default TimerTable;
