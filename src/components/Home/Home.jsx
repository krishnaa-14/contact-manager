import React, {useState, useEffect} from 'react';
import Contacts from '../Contacts/Contacts';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';

const Home = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [contactdialog, setContactDialogOpen] = useState(false);
    const [contact, setContact] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [contacts, setContacts] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '987-654-3210' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', mobile: '555-555-5555' },
    ])

    const fetchContacts = async () => {
        try{
            const response = await fetch('http://localhost:8080/api/v1/student');
            const data = await response.json();
            console.log(data);
            setContacts(data);
        }
        catch{
            console.error('Failed to fetch contacts');
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [])


    const onContactClick = (contactId) => {
        const currentContact = contacts.filter(contact => contact.id === contactId);
        setContact(currentContact[0]);
        setContactDialogOpen(true);
    }

    const handleAddContact = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email, 
                    mobile,
                })
            })

            if(response.ok) {
                const data = await response.json();
                console.log(data);
                setContacts(prevContacts => [...prevContacts, data]);
                setDialogOpen(false);
                // window.location.reload();
                
            }
            else {
                console.error('Failed to add contact');
            }
        }
        catch(error) {
            console.error('Failed to add contact', error);
        }

    }

    const deleteContact = (contactId) => {
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);
        setContacts(updatedContacts);
        setContactDialogOpen(false);
    }

    return (
        <div className="container">
            <div className="header">
                <Typography variant="h6" style={{fontWeight: 'bold'}}>Contacts</Typography>
                <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}> Create Contact</Button>
            </div>
            {dialogOpen && (
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} style={{width: '100vw', margin: '0 auto'}}>
                    <DialogTitle>
                        Add New Contact
                    </DialogTitle>
                    <DialogContent>
                        <TextField label="Name" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)}/>
                        <TextField label="Email" fullWidth margin="dense" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <TextField label="Mobile" fullWidth margin="dense" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={() => setDialogOpen(false)}> Cancel </Button>
                        <Button variant="contained" color="primary" onClick={handleAddContact}> Save </Button>
                    </DialogActions>
                </Dialog>
            )}
            {
                contactdialog && (
                    <Dialog open={contactdialog} onClose={() => setContactDialogOpen(false)} style={{width: '100vw', margin: '0 auto'}}>
                    <DialogContent style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <Box style={{display:"flex", flexDirection: "row", gap: 4}}>
                            <Typography variant="h6">Name:</Typography>
                            <Typography variant="h6">{contact.name}</Typography>
                        </Box>
                        <Box style={{display:"flex", flexDirection: "row", gap: 4}}>
                            <Typography variant="h6">Email:</Typography>
                            <Typography variant="h6">{contact.email}</Typography>
                        </Box>
                        <Box style={{display:"flex", flexDirection: "row", gap: 4}}>
                            <Typography variant="h6">Mobile:</Typography>
                            <Typography variant="h6">{contact.mobile}</Typography>
                        </Box>
                    </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary">Close</Button>
                            <Button variant="contained" color="primary" onClick={() => deleteContact(contact.id)}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <Contacts contacts={contacts} onContactClick={onContactClick}/>
        </div>
    )
}

export default Home;