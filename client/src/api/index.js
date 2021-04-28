import axios from 'axios';

const API = axios.create({baseURL: 'https://articles-project.herokuapp.com' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})


export const fetchArticles = () => API.get('/articles');

export const postArticle = (newArticle) =>  API.post('/articles', newArticle);

export const updateArticle = (id, updatedArticle) => API.patch(`/articles/${id}`, updatedArticle);

export const deleteArticle = (id) => API.delete(`/articles/${id}`, deleteArticle);

export const likeArticle = (id) => API.patch(`/articles/${id}/likeArticle`);

export const login = (formData) => API.post('/user/login', formData);

export const register = (formData) => API.post('/user/register', formData);