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

const RegisterForm = ({
  handleSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  policyAgreement,
  setPolicyAgreement,
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
                  Sign up
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
                      <Grid container direction="row" spacing={2}>
                        <Grid item sm={6}>
                          <TextField
                            label="First Name"
                            variant="outlined"
                            type="text"
                            color="primary"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            fullWidth={true}
                            required
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            label="Last Name"
                            variant="outlined"
                            type="text"
                            color="primary"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            fullWidth={true}
                            required
                          />
                        </Grid>
                      </Grid>
                    </Grid>
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
                            checked={policyAgreement}
                            onChange={() =>
                              setPolicyAgreement(!policyAgreement)
                            }
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label={
                          // <span>
                          //   <span>I agree to the terms of the</span>
                          //   <Link to="/agreement-and-policy">
                          //     Registration Agreement and Policy
                          //   </Link>
                          // </span>
                          'I agree to the terms of the Registration Agreement and Policy'
                        }
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
                        Sign up
                      </Button>
                    </Grid>
                    <Grid item>
                      <Box pb={5}>
                        <Grid container justify="flex-end">
                          <Grid item>
                            <Link to="/login">
                              <Typography variant="subtitle1" color="initial">
                                Already have an account? Sign in
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

export default RegisterForm;
