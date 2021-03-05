import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import PasswordInput from '../../Shared/Inputs/PasswordInput';

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRemeberMe,
  invalidLogin,
}) => {
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
                        onChange={e => setEmail(e.target.value)}
                        fullWidth={true}
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
                        fullWidth={true}
                        size="large"
                      >
                        Sign in
                      </Button>
                    </Grid>
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
