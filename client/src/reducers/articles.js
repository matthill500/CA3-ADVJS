export default (articles = [], action) => {
    switch (action.type){
        case 'GET_ALL':
        return action.payload;
        case 'POST':
        return [...articles, action.payload];
        case 'UPDATE':
        case 'LIKE':
        return articles.map((article) => article._id === action.payload._id ? action.payload : article);
        case 'DELETE':
        return articles.filter((article) => article._id !== action.payload);
        default:
        return articles;
    }
}