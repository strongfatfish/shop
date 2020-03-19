import React, {useEffect} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Header from "./components/Header";
import Goods from "./pages/Goods";
import Seller from "./pages/Seller";
import Ratings from "./pages/Ratings";
import Nav from "./components/Nav";
import './style/App.scss'
import {resData} from "./store/actionCreators";
import Loading
    from "./components/Loading";
function App() {
    const loading = useSelector(state => state.data.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resData('/api/data'))
    },[dispatch]);
    if (loading) {
        return <Loading/>
    }
    return (
            <Router >
                <Header />
                <Nav/>
                <Switch>
                    <Route path='/' exact render={()=><Redirect to='/goods'/>}/>
                    <Route path='/goods' component={Goods} />
                    <Route path='/ratings' component={Ratings}/>
                    <Route path='/seller' component={Seller} />
                </Switch>
            </Router>
    )
}

export default App