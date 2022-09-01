import {Toolbar,Stack,Paper,Button,TextField,IconButton,Typography,Box,Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { styled } from '@mui/material/styles';
import { db } from '../firebase-config.js';
import {collection,addDoc,onSnapshot,doc,deleteDoc } from 'firebase/firestore';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {removeCurrTopic} from '../features/topicSlice';
import {setCurrSubject,removeCurrSubject} from '../features/subjectSlice';


const Item = styled(Paper)(() => ({
    backgroundColor: '#00B894',
    padding: '.2rem 1rem',
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    alignItems : 'center',
    justifyContent : "space-between",
}));

function Home() {

    const dispatch = useDispatch();
    const subjectsCollectionRef = collection(db, "subjects");

    const[subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState("");

    const addSubject = async()=>{
        if(newSubject === "") alert("subject name cannot be null")
        else{
        await addDoc(subjectsCollectionRef,{
            name : newSubject,
        })
        }
        setNewSubject('');
    }

    const getAllSubjects = async()=>{
        onSnapshot(collection(db, "subjects"), (snapshot)=>{
        setSubjects(snapshot.docs.map(
            (doc)=>({...doc.data(),id: doc.id})
        ));
        });
    }

    const handleSelect = (subName)=>{
        // dispatch(removeCurrSubject());
        dispatch(setCurrSubject(subName));
    }

    const deleteSub = async (Sub)=>{
        const delSub = doc(db, "subjects",Sub.id);
        await deleteDoc(delSub);
    }
    
  useEffect(()=>{
    getAllSubjects();
    dispatch(removeCurrTopic());
    dispatch(removeCurrSubject());
    // eslint-disable-next-line
  },[]);

  return (
    <div className="App">
      <Box sx={{display: 'flex', flexDirection:{ md:'row', sm:'row', xs:'column'} , justifyContent:'space-between', alignItems:'flex-start'}} >
        
        {/* list of subjects */}

        <Toolbar>
            <Stack direction="column" spacing={2}>
                <Typography padding='0 .7rem' display='flex' alignItems='center' variant='h6'>All Your Subjects<KeyboardDoubleArrowDownIcon/> </Typography>
                <Divider/>
                {
                subjects.map((sub,i)=>{
                    return(
                        <Item key={i}>
                            <Link to={'/subjects/'+sub.name} sx={{textDecoration: 'none'}} onClick={()=>handleSelect(sub.name)}>
                                <Typography variant='subtitle1' sx={{color: 'white', textDecoration: 'none'}}>
                                    {sub.name}
                                </Typography>
                            </Link>
                            <IconButton onClick={()=>{deleteSub(sub)}}>
                                <DeleteIcon />
                            </IconButton>
                        </Item>
                    )
                })
                }

                {/* add new subject */}

                <TextField size='small' id="outlined-basic" label="subject name" variant="outlined" value={newSubject} onChange={(e)=>{setNewSubject(e.target.value)}}/>
                <Button size="medium" variant='outlined' onClick={()=>{addSubject()}}>Add New Subject</Button>

            </Stack>
          
        </Toolbar>

        <Box sx={{width:'80%', display: 'flex', flexDirection: 'column' , gap:'2rem' , justifyContent:'center', alignItems:'center'}}>
            <Typography variant='h3' sx={{fontStyle:'italic'}} >Manage All Your Notes With Hello Notes</Typography>
            <img width={'70%'} src="https://www.notion.so/cdn-cgi/image/format=auto,width=1080,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png" alt="" />
        </Box>

      </Box>
    </div>
  );
}

export default Home;
