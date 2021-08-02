import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 32,
  },
  icon: {
    fontSize: 200,
    color: theme.palette.action.disabledBackground,
  },
  text: {
    color: theme.palette.action.disabled,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
    textAlign: 'center',
  },
}));

const NoFilteredProjects = ({ clearSearchQuery }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h5" component="h3" className={classes.text}>
        No project match your filter.
      </Typography>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => clearSearchQuery()}
      >
        Clear filter
      </Button>
    </div>
  );
};

export default NoFilteredProjects;
