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



function DrawerMenu() {
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
      sx={{width: 250}}
      role="presentation"
      // onClick={toggleDrawer('left', false)}
      // onKeyDown={toggleDrawer('left', false)}
    >

    <CensusMenu/>
    <Button onClick={toggleDrawer('left', true)}>Update</Button>
      
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
