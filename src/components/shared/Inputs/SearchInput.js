import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';

const SearchInput = () => {
  return (
    <FormControl hiddenLabel={true} fullWidth={true}>
      <FilledInput
        variant="filled"
        id="filled-searchbar"
        type="text"
        color="primary"
        placeholder="Search project"
        disableUnderline={true}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <Close />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchInput;
