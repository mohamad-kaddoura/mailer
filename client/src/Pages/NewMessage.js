import { Box, Button, TextField } from "@mui/material";
import { SendMessage } from "../API/Messages";
import { useGlobalContext } from "../GlobalContext";

export default function NewMessage(){
    const [value,setValue] = useGlobalContext();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('recipient');
        let subject = data.get('subject');
        let content = data.get('content');
        SendMessage(email,subject,content);
        setValue({...value,page:"1"});
    }
    return (
    <>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
            required
            id="recipient"
            name="recipient"
            label="Recipient"
            defaultValue=""
            variant="filled"
            sx={{width: "100%"}}
            />
            <TextField
            required
            id="subject"
            name="subject"
            label="Subject"
            defaultValue=""
            variant="filled"
            sx={{width: "100%"}}
            />
            <TextField
            multiline
            required
            id="content"
            name="content"
            label="Body"
            defaultValue=""
            variant="filled"
            rows={10}
            sx={{width: "100%"}}
            />
            <Button
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            >Send E-Mail</Button>
        </Box>

    </>);
}