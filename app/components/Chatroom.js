import React from 'react';
import {Link} from 'react-router';
import ChatroomStore from '../stores/ChatroomStore' ;
import ChatroomrActions from '../actions/ChatroomActions';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = ChatroomStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ChatroomStore.listen(this.onChange);
    ChatroomActions.getSystemTime();
  }

  componentWillUnmount() {
    ChatroomStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return(

        <div className="box-b">
          <div id='in'>
            <div id="chat_box_content">
              <div id="friend_sent">
                <div id="come_time">22:00</div>
                <div className="arrow_box"><div id="text">測試測試</div></div>
              </div>

              <div id="myself_sent">
                <div id="sent_time">22:01</div>
                <div className="arrow_box1"><div id="text">測試測試</div></div>
              </div>

              <div id="friend_sent">
                <div id="come_time">22:00</div>
                <div className="arrow_box"><div id="text">測試測試</div></div>
              </div>

              <div id="myself_sent">
                <div id="sent_time">22:01</div>
                <div className="arrow_box1"><div id="text">測試測試</div></div>
              </div>

              <div id="friend_sent">
                <div id="come_time">22:00</div>
                <div className="arrow_box"><div id="text">測試測試</div></div>
              </div>

              <div id="myself_sent">
                <div id="sent_time">22:01</div>
                <div className="arrow_box1"><div id="text">測試測試</div></div>
              </div>

              <div id="friend_sent">
                <div id="come_time">22:00</div>
                <div className="arrow_box"><div id="text">測試測試</div></div>
              </div>

              <div id="myself_sent">
                <div id="sent_time">22:01</div>
                <div className="arrow_box1"><div id="text">測試測試</div></div>
              </div>

            </div>
          </div>
          
            <div id="chat_input">
              <textarea id='textinput'></textarea>
              <input id="sent" type="submit"/>
            </div>

        </div>

    );
  }
}

export default Chatroom;
