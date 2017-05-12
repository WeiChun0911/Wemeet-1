import React from 'react';
import {Link} from 'react-router';
import FriendListStore from '../stores/FriendListStore';
import FriendListActions from '../actions/FriendListActions';

class FriendList extends React.Component {
  constructor(props){
    super(props);
    this.state = FriendListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FriendListStore.listen(this.onChange);  
  }

  componentWillUnmount() {
    FriendListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    //好友名單上限資料
    /*
    let friendonline = this.state.characters.map((character) => {
      return (
      <div id="firiend_person">
        <div id="circle1">
          <img id="friend_image" src={character.img}></img>
        </div>
        <div id="friend_name">安
        </div>
      </div>
      )
    });

    //好友名單離線資料
    let friendoff = this.state.characters.map((character) => {
      return (
      <div id="firiend_person">
        <div id="circle1">
          <img id="friend_image" src={character.img}></img>
        </div>
        <div id="friend_name">安
        </div>
      </div>
      )
    });*/

    return (
      <div id="friendlist">
        <div id="online">
          <div id='text'>正在線上：</div>
          <a href="chatroom"><div id="friend_person">
          <div id="circle1"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">安</div>
          </div></a>

          <a href="chatroom"><div id="friend_person">
          <div id="circle1"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">安</div>
          </div></a>

          <a href="chatroom"><div id="friend_person">
          <div id="circle1"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">安</div>
          </div></a>

          <a href="chatroom"><div id="friend_person">
          <div id="circle1"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">安</div>
          </div></a>


          <a href="chatroom"><div id="friend_person">
          <div id="circle1"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">安</div>
          </div></a>


          <a href="chatroom"><div id="friend_person">
          <div id="circle1"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">安</div>
          </div></a>
    
        </div>

        <div id="off">
          <div id='text'>離線：</div>
          <a href="chatroom"><div id="friend_person">
          <div id="circle2"><img id="friend_image" src="../img/logo_user.png"></img></div>
          <div id="friend_name">煩</div>
          </div></a>
        </div>
      </div>
    );
  }
}

export default FriendList;

/*
map:一個for-each循环，和Jade和Handlebars中的类似，
但在这里你可以将结果分配给一个变量，然后你就可以在JSX里使用它了，
就和用其它变量一样。它在React中很常见，你会经常用到。

Link组件：当指定合适的href属性时会渲染一个链接标签，
它还知道链接的目标是否可用，从而给链接加上active的类。
如果你使用React Router，你需要使用Link模块在应用内部进行导航。
*/