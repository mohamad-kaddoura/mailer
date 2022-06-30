import React from 'react';
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import Message from './Message';

export default function MessageItem(props){
    return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>
            
            <Typography sx={!props.email.read && {fontWeight:"bold"}}>
            {(!props.email.read && <CircleIcon sx={{width:"10px",color:"red"}} /> )} {props.email.subject}
            </Typography>
          </React.Fragment>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.email.from}
              </Typography>
              {" — " + props.email.content.substring(0,16)+"..."}
            </React.Fragment>
          }
        />
        <Message email={props.email} />
    </ListItem>);
}