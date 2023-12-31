import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CensusMenu from './CensusMenu';

// css
import './DrawerMenu.css';

import options from '../typeOptions';

function DrawerMenu(props: { 
  censusOptions: options; 
  handleCheckboxChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined; update: () => void; 
}) {

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
    >

      <CensusMenu
        cancel={toggleDrawer('left', false)}
        censusOptions={props.censusOptions}
        handleCheckboxChange={props.handleCheckboxChange}
        update={(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
            e.preventDefault();
            toggleDrawer('left', false);
            props.update();
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
