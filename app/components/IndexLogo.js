import React from 'react';
import socketServerURL from '../config';

class IndexLogo extends React.Component {
  constructor(props){
    super(props);
  }
 
  render() {
    return(
        <div id="user_infro">
            <a href={socketServerURL}><img id='index_img' src='/img/index_logo2.png'></img></a>
        </div> 
    );
  }
}

export default IndexLogo;
