import React, { useState, useEffect } from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import Filebase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { postArticle, updateArticle } from '../../actions/articles';


const Form = ({currentId, setCurrentId}) => {
    const [articleData, setArticleData] = useState({
        title: '',
        body: '',
        imageFile: ''
    });
    const article = useSelector((state) => currentId ? state.articles.find((a) => a._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(article) setArticleData(article);
    }, [article])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
        dispatch(updateArticle(currentId, {...articleData, name: user?.result?.name }));
        reset();
        }else{
        dispatch(postArticle({...articleData, name: user?.result?.name }));
        reset();
        }
    }
    const reset = () => {
        setCurrentId(null);
        setArticleData({
            title: '',
            body: '',
            imageFile: ''
        });
    }

    if(!user){
        return(
           <Paper className={classes.paper}>
               <Typography variant="h5" align="center">You are not logged in.</Typography>
           </Paper> 
        );
    }

    return(
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h5">{currentId ? 'Editing': 'Creating'} Article</Typography>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={articleData.title} onChange={(e) => setArticleData({...articleData, title: e.target.value})} />
                    <TextField name="body" variant="outlined" label="Body" fullWidth value={articleData.body} onChange={(e) => setArticleData({...articleData, body: e.target.value})} />
                    <div className={classes.fileInput}>
                    <Filebase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setArticleData({...articleData, imageFile: base64})} />
                    </div>
                  
                         <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={reset} fullWidth>Reset</Button>
                </form>
            </Paper>
    )
}

export default Form;