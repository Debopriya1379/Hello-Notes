import React,{useState,useEffect} from 'react'
import {Container,Stack,Typography,TextField,Button,IconButton,Divider,Card} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { styled } from '@mui/material/styles';
import {useParams} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import {collection,addDoc,onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import { db } from '../firebase-config';
import {setCurrTopic,removeCurrTopic} from '../features/topicSlice';



const Item = styled(Card)(() => ({
    // backgroundColor: 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)',
    backgroundColor : '#4D61C0',
    padding: '.2rem 1rem',
    display: 'flex',
    alignItems : 'center',
    justifyContent : "space-between",
    textAlign: 'center',
    color: 'black',
    cursor: 'pointer',

}));


export default function Sidebar() {

    const{subName} = useParams()
    const dispatch = useDispatch()
    const currTopic = useSelector(state => state.CurrTopic.topic)
    
    const topicsCollectionRef = collection(db,'AllTopics', subName, 'Topics');
    const [newTopic, setNewTopic] = useState("")
    const [topics, setTopics] = useState([]);


    const addNewTopic = async()=>{
        if(newTopic === "") alert("Topic name cannot be null")
        else{
            await addDoc(topicsCollectionRef,{
                name : newTopic,
            })
        }
        setNewTopic('');
    }

    const getAllTopics = ()=>{
        onSnapshot(collection(db, 'AllTopics', subName, 'Topics'), (snapshot)=>{
            setTopics(snapshot.docs.map(
              (doc)=>({...doc.data(), id: doc.id})
            ));
        });
    }

    const handleDelete = async(Top)=>{
        const delTopic = doc(db, 'AllTopics', subName, 'Topics', Top.id)
        const delTopicAllNotes = doc(db, "AllNotes", subName+"-"+currTopic)
        await deleteDoc(delTopic)
        await deleteDoc(delTopicAllNotes)
        dispatch(removeCurrTopic())

    }

    const handleSelect = (topicName)=>{
        // dispatch(removeCurrTopic())
        dispatch(setCurrTopic(topicName))
    }

    useEffect(()=>{
        getAllTopics();
        // eslint-disable-next-line
    },[]);


    return (
        <Container maxWidth='lg' sx={{overflowY:'auto', height:'aut0'}}>
            <Stack direction="column" spacing={2}>
                <Typography padding='0 .7rem' display='flex' alignItems='center' variant='h6'>All {subName} topics <KeyboardDoubleArrowDownIcon/> </Typography>
                <Divider/>
                {topics.length !== 0 ?
                    topics.map((top,i)=>{
                        return(
                            <Item key={i} onClick={(e)=>{handleSelect(top.name,e.target)}}>
                                <Typography sx={{fontFamily: 'sans-serif', color:'white'}} variant='subtitle1'>{top.name}</Typography>
                                <IconButton onClick={()=>{handleDelete(top)}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Item>
                        ) 
                    })
                    : <Typography padding='0 .7rem' display='flex' alignItems='center' variant='p'>No topic created yet</Typography>
                }

                {/* add new subject */}

                <TextField size='small' id="outlined-basic" label="topic name" variant="outlined" value={newTopic} onChange={(e)=>{setNewTopic(e.target.value)}}/>
                <Button size="medium" variant='outlined' onClick={()=>{addNewTopic()}}>Add New Topic</Button>

            </Stack>
        </Container>
    )
}
