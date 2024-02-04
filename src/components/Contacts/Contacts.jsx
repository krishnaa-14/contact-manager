import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'; 
import Typography from '@mui/material/Typography'; 

const Contacts = ({contacts, onContactClick}) => {
    return (
        <div>
            <List>
                {contacts && contacts.map(contact => (
                    <ListItem key={contact.id} onClick={() => onContactClick(contact.id)}>
                        <ListItemText primary={contact.name} secondary={contact.email} />
                        <ListItemSecondaryAction>
                            <Typography variant="body2">{contact.mobile}</Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Contacts;
