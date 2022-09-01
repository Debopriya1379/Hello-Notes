import React, { useState } from 'react'
import {Container,Box,Button,Modal,Typography,TextField,TextareaAutosize} from '@mui/material'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {collection,addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import TopicWiseAllNotes from './TopicWiseAllNotes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(55%,500px)',
    height: 'min(70%,550px)',
    bgcolor: 'background.paper',
    border: '1px solid #322e2e',
    boxShadow: 24,
    p: 4,
    display : 'flex',
    flexDirection :'column',
    alignItems : 'center',
    gap: '1rem'
};

const btn_style ={
    position: 'fixed',
    bottom : '10%',
    right : '10%'
}

export default function NotesContainer() {

    const{subName} = useParams()
    const currTopic = useSelector(state => state.CurrTopic.topic)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [newNoteTitle, setnewNoteTitle] = useState("");
    const [newNote, setnewNote] = useState("");

    const notesCollectionRef = collection(db, "AllNotes", subName+"-"+currTopic, 'Notes');
    const addNewNote = async()=>{
        if(currTopic === ""){
            alert("select a topic")
            return;
        }
        if(newNoteTitle === "" || newNote=== "") alert("Note cannot be null")
        else{
            await addDoc(notesCollectionRef,{
                title : newNoteTitle,
                desc : newNote,
            })
            setnewNote('');
            setnewNoteTitle('');
            handleClose();
        }
    }
    

    return (
        <Container maxWidth='xl'>
            {/* <Box sx={{height:"75vh"}} bgcolor='red'> */}

                {/* topicwise all notes */}

                <TopicWiseAllNotes/>

                <Button variant='contained' color='success' onClick={handleOpen} sx={btn_style}>Take Note</Button>
                
                {/* add new note form */}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Note
                        </Typography>
                        <Typography variant='subtitle1'>{ currTopic !=="" ? "Topic : " +currTopic : "No selected Topic ! please select a topic first" }</Typography>
                        <TextField 
                            sx={{width:'80%'}} 
                            size='small' 
                            id="outlined-basic" 
                            label="title" 
                            variant="outlined" 
                            value={newNoteTitle} 
                            onChange={((e)=>{setnewNoteTitle(e.target.value)})}
                        />
                        <TextareaAutosize 
                            style={{minWidth:'80%', minHeight:'300px', padding:'1rem'}} 
                            id="outlined-basic" 
                            placeholder='type note' 
                            variant="outlined"
                            value={newNote}
                            onChange={((e)=>{setnewNote(e.target.value)})} 
                        />
                        <Button 
                            size="medium" 
                            variant="contained"
                            color="success"
                            onClick={()=>addNewNote()}
                            >
                             Add Note
                        </Button>                     
                    </Box>
                </Modal>

            {/* </Box> */}
        </Container>
    )
}
