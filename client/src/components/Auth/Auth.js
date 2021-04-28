import React, {useState} from 'react'
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch} from 'react-redux';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {register, login} from '../../actions/auth';

import {useHistory} from 'react-router-dom';


const initState = {
firstName: '', 
lastName: '', 
email:'', 
password:''
}

export const Login = (props) => {
  console.log(props.isRegister);
    const classes =  useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState(initState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (evt) => {
      evt.preventDefault();
     
      if(isRegister){
        dispatch(register(formData, history))
      }else{
        dispatch(login(formData, history))
      }
    }
    const handleChange = (evt) => {
      console.log("here is the evt: "+evt);
      setFormData({...formData, [evt.target.name]: evt.target.value});
      console.log(formData);
    }
    const switchForm = () => {
      if(isRegister){
        setIsRegister(false);
      }else{
        setIsRegister(true);
      }
    }
    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
      try{
        dispatch({type: 'AUTH', data: {result, token}});
        history.push('/');
      }catch(err){
        console.log(err);
      }
    }
    const googleFailure = () => {
      console.log("sign in unsuccessful");
    }
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isRegister ? 'Reigster' : 'Sign in'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {isRegister && (
            <>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            onChange={handleChange}
            autoFocus
          />
          </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
            <FormControlLabel
            control={<Checkbox value="showPassword" color="primary" onChange={handleShowPassword} />}
            label="Show Password"
          />
    
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isRegister ? 'Register' : 'Sign in'}
          </Button>
            {!isRegister && (
               <GoogleLogin 
               clientId="45070815644-u9tnvc1i1857qh5mdmpef0co9ao33h9e.apps.googleusercontent.com"
               render={(renderProps) => (
                 <Button className={classes.googleButton} color="extended" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                   Google Login
                 </Button>
               )}
               onSuccess={googleSuccess}
               onFailure={googleFailure}
               cookiePolicy="single_host_origin"
             />
            )}

          <Grid container justify="flex-end">
            <Grid item style={{padding:'7px'}}>
              <Button onClick={switchForm} >
                {isRegister ? 'Already registered? Login here': 'Dont have an account? Register here'}
              </Button>
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
    )
}

export default Login;
