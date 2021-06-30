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
  errorFirstName,
  validateFirstName,
  validateFirstNameOnChange,
  lastName,
  errorLastName,
  validateLastName,
  validateLastNameOnChange,
  email,
  errorEmail,
  validateEmail,
  validateEmailOnChange,
  password,
  errorPassword,
  validatePassword,
  validatePasswordOnChange,
  policyAgreement,
  setPolicyAgreement,
  invalidRegister,
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
              {invalidRegister && (
                <Box pb={2}>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    align="center"
                    gutterBottom={true}
                  >
                    {invalidRegister}
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
                            fullWidth={true}
                            onBlur={() => validateFirstName()}
                            error={errorFirstName ? true : false}
                            onChange={e => validateFirstNameOnChange(e)}
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
                            fullWidth={true}
                            onBlur={() => validateLastName()}
                            error={errorLastName ? true : false}
                            onChange={e => validateLastNameOnChange(e)}
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
                        errorPassword={errorPassword}
                        validatePassword={validatePassword}
                        validatePasswordOnChange={validatePasswordOnChange}
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
