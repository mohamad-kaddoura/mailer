import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Container } from '@mui/material';
import { ReadMessage } from '../API/Messages';
import { useGlobalContext } from '../GlobalContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Message(props) {
  const [open, setOpen] = React.useState(false);
  const [global,setGlobal] = useGlobalContext();

  const handleClickOpen = () => {
    if (!props.email.read)
      ReadMessage(props.email.message_id);
    setOpen(true);
  };

  const handleClose = () => {
    global.updateEmails();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        View Message
      </Button>
      <Dialog
      fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.email.subject}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* We put our email content here! */}
        <Container sx={{margin: 0, paddingTop:2, width: "100%"}}>
            <Box m={2} pt={2}>
                <Typography variant="h5" color="text.primary">
                    {"From: " + `${props.email.first_name} ${props.email.last_name}` }
                </Typography>
            </Box>
            
            <Divider />
            <Box m={2} pt={1}>
                <Typography>
                    {props.email.content}
                </Typography>
            </Box>
           
        </Container>
        
              
      </Dialog>
    </div>
  );
}
