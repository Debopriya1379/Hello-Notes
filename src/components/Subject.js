import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Container,Divider,Grid,Typography,} from '@mui/material'
import NotesContainer from './NotesContainer';
import Sidebar from './Sidebar';


export default function Subject() {

    const{subName} = useParams()
    const currTopic = useSelector(state => state.CurrTopic.topic)

    return (
        <Container maxWidth='xl'>
            <Typography variant='h5'>{subName}/{currTopic} </Typography>
            <Divider/>
            <br />
            <Grid container spacing={1}>
                <Grid item lg={3} md={4} sm={12} xs={12}>
                    <Sidebar/>    
                </Grid>
                <Grid item lg={9} md={8} sm={12} xs={12}>
                    <NotesContainer/>
                </Grid>
            </Grid>
        </Container>
    )
}
