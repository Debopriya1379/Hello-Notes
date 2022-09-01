import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Container,Grid,Card,CardContent,CardHeader,CardActions,IconButton,Typography,Modal,Box,TextField,TextareaAutosize,Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import {collection,deleteDoc,doc,onSnapshot,updateDoc} from 'firebase/firestore';
import { db } from '../firebase-config';
import {setCurrNote,removeCurrNote} from '../features/noteSlice';


const style1 = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'black',
    color: 'whitesmoke',
    border: '1px solid #e1e1e1',
    boxShadow: 24,
    p: 4,
};

const style2 ={
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

export default function TopicWiseAllNotes() {

    const currNote = useSelector(state=> state.CurrNote.note)
    console.log(currNote.title)
    const currTopic = useSelector(state => state.CurrTopic.topic)
    const dispatch = useDispatch()
    const{subName} = useParams()
    const [TopicWiseAllNote, setTopicWiseAllNote] = useState([])

    const [updateNoteTitle, setUpdateNoteTitle] = useState("");
    const [updateNote, setUpdateNote] = useState("");

    const [openRead, setOpenRead] = React.useState(false);

    const OpenReadNote = (note) =>{
        dispatch(setCurrNote(note))
        setOpenRead(true)
    };
    const CloseReadNote = () => {
        dispatch(removeCurrNote())
        setOpenRead(false)
    };

    const [openUpdate, setOpenUpdate] = React.useState(false);

    //////////////////////////////////////////////////////////////////////////////// bug here (not getting the currNote properly)
    const OpenUpdateNote = (note) =>{
        dispatch(setCurrNote(note))

        // console.log(currNote)

        setUpdateNoteTitle(currNote.title)
        setUpdateNote(currNote.desc)
        setOpenUpdate(true)
    };
    /////////////////////////////////////////////////////////////////////////////////

    const CloseUpdateNote = () => {
        dispatch(removeCurrNote())
        setOpenUpdate(false)
    };

    const getNotes = ()=>{
        onSnapshot(collection(db, "AllNotes", subName+"-"+currTopic, 'Notes'), (snapshot)=>{
            setTopicWiseAllNote(snapshot.docs.map(
              (doc)=>({...doc.data(),id: doc.id})
            ));
        });
    }

    const updateCurrNote = async()=>{
        const currNoteDoc = doc(db, "AllNotes", subName+"-"+currTopic, 'Notes',currNote.id)
        const updatedNote = {title : updateNoteTitle, desc : updateNote}
        await updateDoc(currNoteDoc,updatedNote)
        CloseUpdateNote()
        dispatch(removeCurrNote())
    }   

    const deleteNote =(note)=>{
        const delNote = doc(db, "AllNotes", subName+"-"+currTopic, 'Notes', note.id);
        deleteDoc(delNote);
    }

    useEffect(()=>{
        getNotes();
        // eslint-disable-next-line
    },[currTopic])

    return (
        <Container maxWidth='xl'>
            <Grid container direction="row" spacing={1} sx={{overflowY:'auto', height:'630px'}}>
                {(TopicWiseAllNote.length !== 0) &&
                    (TopicWiseAllNote.map((Note,i)=>{
                        return(
                            <Grid item key={i}>
                                <Card sx={{ width: 320 , height: 250, backgroundColor:'#00B894', color:'white', display:'flex',flexDirection:'column', justifyContent:'space-between' }}>
                                    <CardHeader title={Note.title} />
                                    <CardContent>
                                        <Typography variant="body2">
                                            {Note.desc.substr(1,200)}...
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton onClick={()=>{OpenUpdateNote(Note)}}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={()=>{deleteNote(Note)}}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton onClick={()=>{OpenReadNote(Note)}}>
                                            <AspectRatioIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }))
                }
            </Grid>
            <Modal
                open={openRead}
                onClose={CloseReadNote}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {currNote.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {currNote.desc}
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openUpdate}
                onClose={CloseUpdateNote}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Note
                    </Typography>
                    <TextField 
                        sx={{width:'80%'}} 
                        size='small' 
                        id="outlined-basic" 
                        label="title" 
                        variant="outlined" 
                        value={updateNoteTitle} 
                        onChange={e=>setUpdateNoteTitle(e.target.value)}
                    />
                    <TextareaAutosize 
                        style={{minWidth:'80%', minHeight:'300px', padding:'1rem'}} 
                        id="outlined-basic" 
                        placeholder='type note' 
                        variant="outlined"
                        value={updateNote}
                        onChange={e=>{setUpdateNote(e.target.value)} }
                    />
                    <Button 
                        size="medium" 
                        variant="contained"
                        color="success"
                        onClick={()=>updateCurrNote()}
                        >
                        Update Note
                    </Button>                     
                </Box>
            </Modal>
        </Container>
    )
}
