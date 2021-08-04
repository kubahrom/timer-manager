import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import PasswordInput from '../../Shared/Inputs/PasswordInput';

const useStyles = makeStyles(
  theme => ({
    demoAccountWrapper: {
      textAlign: 'center',
    },
    demoAccountBtn: {
      color: theme.palette.primary.light,
      borderColor: theme.palette.primary.light,
    },
  }),
  { index: 1 }
);

const LoginForm = ({
  handleSubmit,
  email,
  password,
  setPassword,
  rememberMe,
  setRemeberMe,
  invalidLogin,
  errorEmail,
  validateEmail,
  validateEmailOnChange,
  demoAccountLogin,
}) => {
  const classes = useStyles();

  return (
    <main className="form">
      <Grid container justify="center" className="form_wrapper">
        <Grid item xs={12} sm={10}>
          <Card elevation={12} style={{ borderRadius: 20 }} spacing={2}>
            <CardContent>
              <Box>
                <Typography
                  variant="h1"
                  color="initial"
                  align="center"
                  gutterBottom={true}
                >
                  Sign in
                </Typography>
              </Box>
              {invalidLogin && (
                <Box pb={2}>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    align="center"
                    gutterBottom={true}
                  >
                    {invalidLogin}
                  </Typography>
                </Box>
              )}
              <form onSubmit={handleSubmit}>
                <Grid item sm={10}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    spacing={3}
                  >
                    <Grid item>
                      <TextField
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        color="primary"
                        value={email}
                        fullWidth={true}
                        error={errorEmail ? true : false}
                        helperText={
                          errorEmail ? 'Invalid email address' : false
                        }
                        onBlur={() => validateEmail()}
                        onChange={e => validateEmailOnChange(e)}
                        required
                      />
                    </Grid>
                    <Grid item>
                      <PasswordInput
                        password={password}
                        setPassword={setPassword}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={() => setRemeberMe(!rememberMe)}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Remember me"
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                        size="large"
                      >
                        Sign in
                      </Button>
                    </Grid>
                    <div className={classes.demoAccountWrapper}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className={classes.demoAccountBtn}
                        onClick={demoAccountLogin}
                      >
                        Sign in with demo account
                      </Button>
                    </div>
                    <Grid item>
                      <Box pb={5}>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Link to="/forgot-password">
                              <Typography variant="subtitle1" color="initial">
                                Forgot password?
                              </Typography>
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link to="/register">
                              <Typography variant="subtitle1" color="initial">
                                Don't you have an account? Sign Up
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
};

export default LoginForm;
