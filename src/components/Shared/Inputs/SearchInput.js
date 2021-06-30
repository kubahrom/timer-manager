import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';

const SearchInput = ({
  searchQuery,
  handleChangeSearchQuery,
  clearSearchQuery,
}) => {
  return (
    <FormControl hiddenLabel={true} fullWidth={true}>
      <FilledInput
        variant="filled"
        id="filled-searchbar"
        type="text"
        color="primary"
        placeholder="Search project"
        disableUnderline={true}
        value={searchQuery}
        onChange={e => handleChangeSearchQuery(e)}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        endAdornment={
          searchQuery !== '' && (
            <InputAdornment position="end">
              <IconButton onClick={() => clearSearchQuery()}>
                <Close />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};

export default SearchInput;
