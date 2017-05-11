import React from 'react';
import {BrowserRouter as Router, Route , browserHistory } from 'react-router-dom';
import UserState from './UserState';
import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import FriendList from './FriendList';
import Meeting from './Meeting';

class App extends React.Component {
<<<<<<< HEAD
    render() {
        return (
        	<Router history={browserHistory}>
	            <div>
	                <UserState/>  
	                <Header/>
	                <Route exact={true} path="/" render = {()=>(
	                	<h1>佳怡~~~登入頁面就靠你了阿!</h1>
	                )}/>
	                <Route exact={true} path="/main" component={Main}/>	
	            </div>
            </Router>
        );
    }
=======
  render() {
    return (
      	<div>
      		<UserState />	
          <Header />
          <Menu />
          <RouteHandler />
          <FriendList />
      	</div>
    );
  }
>>>>>>> refs/remotes/origin/master
}
export default App;
