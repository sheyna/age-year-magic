import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function handleSubmit(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
  e.preventDefault();
  console.log(e);
}

function CensusMenu() {
  const [state, setState] = React.useState({
    usCensus: true,
    usCensus1890: false,
    kansasCensus: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { usCensus, usCensus1890, kansasCensus } = state;
  const error = [usCensus, usCensus1890, kansasCensus].filter((v) => v).length !== 2;

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Add Census Records to Result</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={usCensus} onChange={handleChange} name="usFederalCensus" />
            }
            label="U.S. Federal Census"
          />
          <FormControlLabel
            control={
              <Checkbox checked={usCensus1890} onChange={handleChange} name="usFederalCensus1890" />
            }
            label="1890 U.S. Federal Census"
          />
          <FormControlLabel
            control={
              <Checkbox checked={kansasCensus} onChange={handleChange} name="kansasStateCensus" />
            }
            label="Kansas State Census"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      <Button variant='contained' type='submit'>Update Results</Button>
      <Button variant='text'>Cancel</Button>
    </form>
  );
}

export default CensusMenu;
