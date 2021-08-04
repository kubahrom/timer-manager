import { useState } from 'react';
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
import { motion } from 'framer-motion';

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

const Home = () => {
  const [mineProjectCheckbox, setMineProjectCheckBox] = useState(true);
  const [sharedProjectCheckbox, setSharedProjectCheckBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const classes = useStyles();

  const clearSearchQuery = () => {
    setSearchQuery('');
    setMineProjectCheckBox(true);
  };

  const handleChangeSearchQuery = e => {
    setSearchQuery(e.target.value);
  };

  const pageLoadVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <Container
      maxWidth="md"
      style={{ padding: 8 }}
      className={classes.container}
      component={motion.div}
      variants={pageLoadVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Box pb={2} pt={2}>
        <Typography variant="h3" component="h1">
          Your Projects
        </Typography>
      </Box>
      <Paper elevation={3} className={classes.paper}>
        <Grid container className={classes.gridContainer}>
          <Grid item sm={12} md={5} className={classes.gridItem}>
            <SearchInput
              searchQuery={searchQuery}
              clearSearchQuery={clearSearchQuery}
              handleChangeSearchQuery={handleChangeSearchQuery}
            />
          </Grid>
          <Grid item sm={6} md={4} className={classes.gridItem}>
            <div className={classes.checkboxWrapper}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mineProjectCheckbox}
                    color="primary"
                    name="mineProjects"
                    onChange={() =>
                      setMineProjectCheckBox(!mineProjectCheckbox)
                    }
                  />
                }
                label="Show mine projects"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sharedProjectCheckbox}
                    color="primary"
                    name="sharedProjects"
                    onChange={() =>
                      setSharedProjectCheckBox(!sharedProjectCheckbox)
                    }
                  />
                }
                label="Show shared projects"
              />
            </div>
          </Grid>
          <Grid item sm={6} md={3} className={classes.gridItem}>
            <ModalWithButton
              triggerBtn={{ text: 'Add new project', variant: 'outlined' }}
              title="Add a new project"
              fullWidthBtn={true}
              permanent={true}
            >
              <ProjectForm btnText="Add new project" />
            </ModalWithButton>
          </Grid>
        </Grid>
      </Paper>
      <ProjectList
        searchQuery={searchQuery}
        clearSearchQuery={clearSearchQuery}
        mineProjectCheckbox={mineProjectCheckbox}
      />
    </Container>
  );
};

export default Home;
