import mongoose from 'mongoose';
import articleMessage from '../models/articleMessage.js';

export const getArticles = async (req, res) => {
    try{

    const articleMessages = await articleMessage.find();

    res.status(200).json(articleMessages);

    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const postArticle = async (req, res) => {
    const article = req.body;

    const newArticle = new articleMessage({...article, author: req.userId, createdAt: new Date().toISOString()});

    try{
        
    await newArticle.save();

    res.status(201).json(newArticle);

    }catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateArticle = async (req, res) => {
    const { id: _id } = req.params;
    const article = req.body;

    console.log(req.params);

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no article with that id');

    const updatedArticle = await articleMessage.findByIdAndUpdate(_id, { ...article, _id}, {new:true});

    res.json(updatedArticle);
}

export const deleteArticle = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no article with that id');

    await articleMessage.findByIdAndRemove(id);

    res.json({message: 'article deleted succesfully'});

}

export const likeArticle = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'unauthenticated!'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no article with that id');

    const article = await articleMessage.findById(id);

    const index = article.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        article.likes.push(req.userId);
    }else{
        article.likes = article.likes.filter((id) => id !== String(req.userId));
    }

    const updatedArticle = await articleMessage.findByIdAndUpdate(id, article, {new: true});

    res.json(updatedArticle);
}
