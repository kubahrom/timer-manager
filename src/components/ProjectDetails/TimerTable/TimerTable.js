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
import { Edit, Settings } from '@material-ui/icons';
import { useSelector } from 'react-redux';

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
  tableHeadCell: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  tableCell: {
    width: 150,
  },
  tableCellEdit: {
    width: 20,
  },
}));

const TimerTable = ({ timers }) => {
  const { firstName, lastName } = useSelector(state => state.user.user);
  const classes = useStyles();

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
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Date</TableCell>
              <TableCell className={classes.tableHeadCell}>Length</TableCell>
              <TableCell className={classes.tableHeadCell}>From</TableCell>
              <TableCell className={classes.tableHeadCell}>Comment</TableCell>
              <TableCell className={classes.tableHeadCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timers.map(timer => (
              <TableRow key={timer.id}>
                <TableCell className={classes.tableCell}>
                  {new Date(timer.start.toDate()).toLocaleDateString()}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {getTimerLength(timer.lastValue)}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {firstName} {lastName}
                </TableCell>
                <TableCell>{timer.comment}</TableCell>
                <TableCell className={classes.tableCellEdit}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TimerTable;
