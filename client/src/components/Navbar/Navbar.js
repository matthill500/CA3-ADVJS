import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { AppBar, Tab, Tabs, Typography, Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import decode from 'jwt-decode';
import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({'type': 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        //JWT
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp *1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    return (
    <AppBar>   
        <Tabs>
            <Link to="/" style={{textDecoration:'none', color:'white'}}>
            <Tab label="Home" />
            </Link>
            <Link to="/Form" style={{textDecoration:'none', color:'white'}}>
                <Tab label="Create Article" />
            </Link>
            {user ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end', flex:1, width: '400px',}}>
                    <Box mx="1.5em">
                    <Avatar style={{marginTop:'0.19em'}} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    </Box>
                    <Typography variant="h5" style={{marginTop:'0.3em',}} margin={5}>{user.result.name}</Typography>
                   
                         <Tab label="Logout" onClick={logout} />
                  
                </div>
            ) : (
                <div>
                <Link to="/auth" style={{textDecoration:'none', color:'white'}}>
                    <Tab label="Login" />
                </Link>
            </div>
            )}
           
        </Tabs>
    </AppBar>
    )
}

export default Navbar;