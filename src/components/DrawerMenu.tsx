import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Checkbox from '@mui/material/Checkbox';
// import dayjs from 'dayjs';
import CensusMenu from './CensusMenu';

// type
import options from '../typeOptions';

// css
import './DrawerMenu.css';


function DrawerMenu(props: { censusOptions: { showUSCensuses: boolean | undefined; show1890Census: boolean | undefined; showKansasCensus: boolean | undefined; }; handleCheckboxChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined; update: (arg0: options) => void; }) {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer =
    (anchor: 'left', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = () => (
    <Box
      sx={{width: 400}}
      role="presentation"
      className="drawer-box"
      // onClick={toggleDrawer('left', false)}
      // onKeyDown={toggleDrawer('left', false)}
    >

      <CensusMenu
        cancel={toggleDrawer('left', false)}
        censusOptions={props.censusOptions}
        handleCheckboxChange={props.handleCheckboxChange}
        update={(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
            e.preventDefault();
            props.update();
            toggleDrawer('left', false);
          }
        }
      />

      
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}>Customize Census list</Button>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default DrawerMenu;
