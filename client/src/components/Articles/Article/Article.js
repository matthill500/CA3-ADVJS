import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { Link } from "react-router-dom";
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deleteArticle, likeArticle} from '../../../actions/articles';
const Article = ({ article, setCurrentId, setViewCurrentId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    return(
        <Card className={classes.card}>
            <Link to="/viewArticle">
            <CardMedia className={classes.media} image={article.imageFile} onClick={() => setViewCurrentId(article._id)} title={article.title} />
            </Link>
            <div className={classes.overlay}>
                <Typography variant="h6">{article.name}</Typography>
                <Typography variant="body2">{moment(article.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === article?.author || user?.result?._id === article?.author) && (
            <div className={classes.overlay2}>
                <Link to="/Form">
                <Button style={{color:'white'}} size="small" onClick={()=> setCurrentId(article._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
                </Link>
            </div>
            )}
            <CardContent>
            <Typography className={classes.title} variant="h5" gutterBottom>{article.title}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likeArticle(article._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {article.likes.length}
                </Button>
                {(user?.result?.googleId === article?.author || user?.result?._id === article?.author) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deleteArticle(article._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                )}
                
            </CardActions>
        </Card>
    )
}

export default Article;