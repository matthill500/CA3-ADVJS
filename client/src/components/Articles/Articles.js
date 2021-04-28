import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Article from './Article/Article'
import useStyles from './styles';
const Articles = ({ setCurrentId, setViewCurrentId }) => {
    const articles = useSelector((state) => state.articles);
    const classes = useStyles();
    return(
       !articles.length ? <CircularProgress /> : (
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
               {articles.map((article) =>(
                <Grid key={article._id} item xs={12} sm={6}>
                    <Article article={article} setViewCurrentId={setViewCurrentId} setCurrentId={setCurrentId} />
                </Grid>
               ))}

           </Grid>
       )
    )
}

export default Articles;