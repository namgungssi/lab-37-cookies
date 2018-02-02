import React from 'react';
import {Link} from 'react-router-dom';



class Dashboard extends React.Component {
  render() {

    return (
     <ul>
       <li><Link to='/login'>Login</Link></li>
       <li><Link to='/signup'>Signup</Link></li>
     </ul>
    )
  }
}



export default Dashboard;
