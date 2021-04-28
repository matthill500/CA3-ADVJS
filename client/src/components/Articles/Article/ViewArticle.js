import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

const ViewArticle = ({viewCurrentId}) => {
    const [articleData, setArticleData] = useState({
        author:'',
        title: '',
        body: '',
        imageFile: ''
    });
    const article = useSelector((state) => viewCurrentId ? state.articles.find((a) => a._id === viewCurrentId) : null);
    const classes = useStyles();

    useEffect(() => {
        if(article) setArticleData(article);
    }, [article])
    return(
        <>
        <Grid container alignItems="stretch" spacing={3}>
            <Grid item xs={8} sm={8}>
            <Typography variant="h4">{articleData.title}</Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
            <Typography variant="h5">Author: {articleData.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography variant="p">{articleData.body}</Typography>
            </Grid>
        </Grid>
       </>
    )
}

export default ViewArticle;