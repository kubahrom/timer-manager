import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
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
import PasswordInput from '../Shared/Inputs/PasswordInput';

const LoginForm = () => {
  //User inputs
  const [passwordT, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRemeberMe] = useState(false);

  const dispatch = useDispatch();

  //Testlogin
  const user = {
    email: 'testemail@email.cz',
    password: 'Test123456',
    firstName: 'John',
    lastName: 'Doee',
  };
  const handleLogin = () => {
    dispatch(loginUser(user));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <main className="form">
      <Grid container justify="center" className="form_wrapper">
        <Grid item xs={10} sm={10}>
          <Card elevation={12} style={{ borderRadius: 20 }} spacing={2}>
            <CardContent>
              <Box py={3}>
                <Typography variant="h1" color="initial" align="center">
                  Sign in
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={3} sm={10}>
                  <Grid item>
                    <TextField
                      label="Email Address *"
                      variant="outlined"
                      type="email"
                      color="primary"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item>
                    <PasswordInput
                      password={passwordT}
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
                  </Grid>
                </Grid>
              </form>
              <button onClick={handleLogin}>Login</button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
};

export default LoginForm;
