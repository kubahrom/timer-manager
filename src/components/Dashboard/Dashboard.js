import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import SearchInput from '../Shared/Inputs/SearchInput';
import ModalWithButton from '../Shared/Modals/ModalWithButton';
import ProjectForm from '../Shared/Modals/ProjectForm';
import ProjectList from './ProjectList/ProjectList';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
  },
  paper: {
    borderRadius: 20,
    marginBottom: 16,
  },
  gridContainer: {
    padding: 16,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 8,
  },
  checkboxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Container
      maxWidth="md"
      style={{ padding: 8 }}
      className={classes.container}
    >
      <Box pb={2} pt={2}>
        <Typography variant="h3" component="h1">
          Your Projects
        </Typography>
      </Box>
      <Paper elevation={3} className={classes.paper}>
        <Grid container className={classes.gridContainer}>
          <Grid item sm={12} md={5} className={classes.gridItem}>
            <SearchInput />
          </Grid>
          <Grid item sm={6} md={4} className={classes.gridItem}>
            <div className={classes.checkboxWrapper}>
              <FormControlLabel
                control={
                  <Checkbox checked color="primary" name="mineProjects" />
                }
                label="Show mine projects"
              />
              <FormControlLabel
                control={
                  <Checkbox checked color="primary" name="sharedProjects" />
                }
                label="Show shared projects"
              />
            </div>
          </Grid>
          <Grid item sm={6} md={3} className={classes.gridItem}>
            <ModalWithButton
              triggerBtn={{ text: 'Add new project' }}
              title="Add a new project"
              fullWidthBtn={true}
              permanent={true}
            >
              <ProjectForm />
            </ModalWithButton>
          </Grid>
        </Grid>
      </Paper>
      <ProjectList />
    </Container>
  );
};

export default Dashboard;
