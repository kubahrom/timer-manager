import { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordInput = ({
  password,
  setPassword,
  errorPassword,
  validatePassword,
  validatePasswordOnChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <FormControl variant="outlined" fullWidth={true} required>
      <InputLabel
        htmlFor="outlined-adornment-password"
        color="primary"
        error={errorPassword ? true : false}
      >
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        label="Password*"
        onChange={
          setPassword ? e => handleChange(e) : e => validatePasswordOnChange(e)
        }
        onBlur={validatePassword && (() => validatePassword())}
        error={errorPassword ? true : false}
        color="primary"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelwidth={70}
      />
      {errorPassword && (
        <FormHelperText error>
          Password must be atleast 6 char length and contain 1 uppercase and 1
          number.
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordInput;
