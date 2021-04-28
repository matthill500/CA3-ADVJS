import React, { useState, useEffect } from 'react';
import { Container, Toolbar, Grid} from '@material-ui/core';

import { withRouter, Switch, Route} from "react-router-dom";
import { useDispatch}  from 'react-redux';
import { getArticles } from './actions/articles';
import Articles from './components/Articles/Articles';
import Form from './components/Form/Form';
import ViewArticle from './components/Articles/Article/ViewArticle';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [viewCurrentId, setViewCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, [currentId, dispatch]);
    return(
      <>   
        <Container maxWidth="lg">
          <Navbar />
           <Toolbar />

           </Container>

           <Container>
         
           <Grid container justify="center" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
                <Switch>
                    <Route path="/" render={(props) => <Articles {...props} setCurrentId={setCurrentId} setViewCurrentId={setViewCurrentId} />} exact />
                    <Route path="/Form" render={(props) => <Form {...props} currentId={currentId} setCurrentId={setCurrentId} />} />
                    <Route path="/viewArticle" render={(props) => <ViewArticle {...props} viewCurrentId={viewCurrentId} />} />
                    <Route path="/Auth" render={(props) => <Auth />} />
                </Switch>
            </Grid>
           </Grid>

       </Container>
    </>
    )
}

export default withRouter(App);