import * as React from 'react';
import { useState } from 'react'

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
// type:
import options from '../typeOptions';

function CensusMenu(props: {
    update: React.FormEventHandler<HTMLFormElement> | undefined; censusOptions: options; 
    handleCheckboxChange: ((event: React.ChangeEvent<
      HTMLInputElement>, checked: boolean) => void) | undefined; 
      cancel: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }) {

  const [censusOptions, setCensusOptions] = useState<options>({
    showUSCensuses: props.censusOptions.showUSCensuses,
    show1890Census: props.censusOptions.show1890Census,
    showKansasCensus: props.censusOptions.showKansasCensus
  });

  const handleChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    setCensusOptions({
      ...censusOptions,
      [event.target.name]: event.target.checked,
    });
    props.handleCheckboxChange(censusOptions);
  };

  return (
    <form onSubmit={props.update}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Add Census Records to Result</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={censusOptions.showUSCensuses} onChange={handleChange} name="showUSCensuses" />
            }
            label="U.S. Federal Census"
          />
          <FormControlLabel
            control={
              <Checkbox checked={censusOptions.show1890Census} onChange={handleChange} name="show1890Census" />
            }
            label="1890 U.S. Federal Census"
          />
          <FormControlLabel
            control={
              <Checkbox checked={censusOptions.showKansasCensus} onChange={handleChange} name="showKansasCensus" />
            }
            label="Kansas State Census"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      <Button 
        variant='contained' 
        type='submit' 
      >
        Update Results
      </Button>
      <Button 
        variant='text' 
        onClick={props.cancel}
      >
          Cancel
      </Button>
    </form>
  );
}

export default CensusMenu;
