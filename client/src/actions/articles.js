import * as api from '../api';

export const getArticles = () => async (dispatch) => {
    try{
        const { data } = await api.fetchArticles();
        console.log({data});
        dispatch({type:'GET_ALL', payload: data});
    
    }catch(error){
        console.log(error);
    }
}

export const postArticle = (article) => async (dispatch) => {
    try{
        const { data } = await api.postArticle(article);
     
        dispatch({type: 'POST', payload: data});

    }catch(error){
        console.log(error);
    }
}

export const updateArticle = (id, article) => async (dispatch) => {
    try{
        const { data } = await api.updateArticle(id, article);
        dispatch({type: 'UPDATE', payload: data});
    }catch(error){
        console.log(error);
    }
}

export const deleteArticle = (id) => async (dispatch) => {
    try{
        await api.deleteArticle(id);

        dispatch({type:'DELETE', payload:id})
    }catch(error){
        console.log(error);
    }
}

export const likeArticle = (id) => async (dispatch) => {
    try{
        const { data } = await api.likeArticle(id);
        dispatch({type: 'LIKE', payload: data});
    }catch(error){
        console.log(error);
    }
}