import * as api from '../api';

export const register = (formData, history) => async (dispatch) => {
    try{
        const { data } = await api.register(formData);

        dispatch({type: 'AUTH', data});
        
        history.push('/')
    }catch(err){
        console.log(err);
    }
}

export const login = (formData, history) => async (dispatch) => {
    try{
        const { data } = await api.login(formData);

        dispatch({type: 'AUTH', data});

        history.push('/')
    }catch(err){
        console.log(err);
    }
}