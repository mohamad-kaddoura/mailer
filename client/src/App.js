import { useState, useEffect } from 'react';
import './App.css';
import {Tabs,Tab, Typography, Divider} from '@mui/material';
import {TabContext, TabPanel} from "@mui/lab";
import Home from './Pages/Home';
import Inbox from './Pages/Inbox';
import { useGlobalContext } from './GlobalContext';
import NewMessage from './Pages/NewMessage';
import { LoggedIn, Logout } from './API/Auth';
import SignIn from './Pages/SignIn';

function App() {
  const [value,setValue] = useGlobalContext();

  useEffect(()=>{
    (async () => {
      let res = await LoggedIn();
      if (res.logged_in) setValue({...value, user: res.user, authorized:true});
      else setValue({...value, authorized: false, user: undefined});
    })();
  },[]);

  const handleChange = async (e,v) => {
    if (v === "3"){
      let res = await Logout();
      setValue({...value, page: "0", authorized: false, user: undefined});
      return;
    }
    setValue({...value, page: v});
  }
  return (
    <>
      {!value.authorized && <SignIn />}
      {value.authorized && <>
        <Tabs
          value={value.page}
          onChange={handleChange}
          orientation='vertical'
          sx={{height:"100vh", backgroundColor:"#eeeeee", width: "300px"}}
        >
          <Typography padding={2} align="center" variant="h4">Mailer</Typography>
          <Divider />
          <Tab value="0" label="Home"/>
          <Divider />
          <Tab value="1" label="Inbox" />
          <Divider />
          <Tab value="2" label="New message" />
          <Divider />
          <Tab value="3" label="Logout" />
          <Divider />
        </Tabs>
        <div className="panel">
          <TabContext value={value.page}>
            <TabPanel value="0" sx={{padding:0}} children={<Home />}></TabPanel>
            <TabPanel value="1" sx={{
                padding: "0px 0px 4em 0px",
                borderTop: "2em solid #dddddd",
                borderLeft: "2em solid #dddddd",
                borderRight: "2em solid #dddddd",
                height: "calc(100vh - 6em)"
            }} children={<Inbox unread={value.unread} />}></TabPanel>
            <TabPanel value="2" children={<NewMessage />}></TabPanel>
          </TabContext>
        </div>
      </>}
    </>
  );
}

export default App;
