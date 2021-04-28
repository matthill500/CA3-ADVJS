import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    title: String,
    body: String,
    name: String,
    author: String,
    imageFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const articleMessage = mongoose.model('ArticleMessage', articleSchema);

export default articleMessage;
