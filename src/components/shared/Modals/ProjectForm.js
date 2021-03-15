import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { LabelImportant } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  form: {
    flexDirection: 'column',
  },
  submitBtn: {
    marginTop: 16,
    marginBottom: 16,
  },
}));

const ProjectForm = () => {
  const classes = useStyles();
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <form onSubmit={e => handleSubmit(e)} className={classes.form}>
      <TextField
        name="name"
        required
        fullWidth
        type="text"
        label="Project name"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelImportant color="primary" />
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
      >
        Add new project
      </Button>
    </form>
  );
};
export default ProjectForm;
