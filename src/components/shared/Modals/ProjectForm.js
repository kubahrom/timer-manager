import { useState, useEffect } from 'react';
import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { LabelImportant } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewProject,
  updateProject,
} from '../../../redux/actions/projectActions';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  form: {
    flexDirection: 'column',
  },
  submitBtn: {
    marginTop: 16,
    marginBottom: 16,
  },
}));

const ProjectForm = ({ closeModal, btnText, name, edit, id }) => {
  const [projectName, setProjectName] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [nameError, setNameError] = useState(false);
  const classes = useStyles();
  const { uid } = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      setProjectName(name);
    }
  }, [name]);

  const handleNameChange = e => {
    setProjectName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (projectName === '') {
      setNameError(true);
    } else if (edit) {
      dispatch(updateProject({ id, name: projectName }, closeModal));
      setDisableBtn(true);
    } else {
      const testProject = {
        id: uuidv4(),
        name: projectName,
        owner: uid,
        shared: [],
        created: Date.now(),
      };
      dispatch(createNewProject(testProject, closeModal));
      setDisableBtn(true);
    }
  };
  return (
    <form onSubmit={e => handleSubmit(e)} className={classes.form}>
      <TextField
        name="name"
        fullWidth
        type="text"
        label="Project name"
        variant="outlined"
        value={projectName}
        onChange={handleNameChange}
        error={nameError}
        helperText={nameError && 'Name of the project is required'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelImportant color={nameError ? 'error' : 'primary'} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        className={classes.submitBtn}
        disabled={disableBtn}
      >
        {btnText}
      </Button>
    </form>
  );
};
export default ProjectForm;
