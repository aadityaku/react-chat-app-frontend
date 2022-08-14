

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import CreateUser from './components/CreateUser';
import OnlineUsers from './components/OnlineUsers';
import MessageContainer from './components/MessageContainer';
import { useRef } from 'react';
const socket = io(`http://localhost:8000`)
function App() {
  const [step,setStep]  = useState(1);
  const [username,setUserName] = useState('');
  const [users,setUsers] = useState({});
  const [message,setMessage] = useState("");
  const [receiver,setReceiver] = useState("");
  const [media,setMedia] = useState(null)
  const [groupMessage,setGroupMessage] = useState({});
  const receiverRef = useRef(null);

  const sortNames = (username1,username2) =>{
      return [username1,username2].sort().join('-');
  }

  const handleSubmit = () => {
    // console.log(username);
    socket.emit("new_user",username)
    // setUserName(username)
    setStep(2);
    
  }

  const selectUser = (name) =>{
    setReceiver(name)
    receiverRef.current = name;
    setStep(3)
  }
 
  const handleGoBack = () => {
    setStep(2);
  }

  const sendMessage = (e) =>{
    e.preventDefault();
    
    const data = 
      {
        sender:username,
        message,
        receiver,
        media,
        view:false,
      }
    socket.emit("send_message",data)
    setMessage("")

    const key = sortNames(username,receiver);
    const tempGroupMessage = {...groupMessage};
    if(key in tempGroupMessage){
      tempGroupMessage[key] = [...tempGroupMessage[key],{...data,view:false}];
    }
    else{
      tempGroupMessage[key] = [{...data,view:false}];
    }
    // console.log(groupMessage);
    setGroupMessage({...tempGroupMessage})
    if(media !== null){
      setMedia(null);
    } 
  }

  useEffect(() =>{
      socket.on("all_user",(user) => {
        // console.log([users]);
        setUsers(user)
        
      })
      socket.on("new_message",(data) => {
        setGroupMessage( prevGroupMsg => {
          const msg = {...prevGroupMsg};
          const key = sortNames(data.sender,data.receiver);

          if(receiverRef.current === data.sender){
            data.view = true;
          }
          if (key in msg) {
            msg[key] = [...msg[key],data]; 
          } 
          else{
            msg[key] = [data];
          }
          return {...msg};
        })
        console.log(groupMessage);
      });
      
  },[]);

// console.log(groupMessage);
 
  useEffect(() => {
    updateUnseenMsg();
  },[receiver]);
  

  const updateUnseenMsg = () =>{
    const key = sortNames(username,receiver);
    if(key in groupMessage){
      const msg = groupMessage[key].map((msg) => !msg.view ? {...msg,view:true}: msg);
      groupMessage[key] = [...msg];
    }
  }

  
  const checkUnseen = (user)=>{
    const key=sortNames(username,user);
    let unseenmsg=[];
    if(key in groupMessage){
      // groupMessage[key].filter((msg)=> msg.view === false);
      unseenmsg = groupMessage[key].filter((msg) => !msg.view );
    }
    return unseenmsg.length;
  }
  const goBottom = () =>{
    const el = document.querySelector(".card-body");
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }
  useEffect(() => {
    const key =sortNames(username,receiver);
    if(key in groupMessage){
      if(groupMessage[key].length > 0){
        goBottom();
      }
    }
  },[]);

  return (
    
    <div className="container">
      {/* <Abc/> */}
      <header className="container mx-auto py-4 text-center">
        <h2 className='text-white fw-bold'>Messanger App</h2>
      </header>
      <div className="card col-lg-5 mx-auto p-0">
        <div className="card-body">
          
            {step ===1 && <CreateUser handleSubmit={() => handleSubmit()} value={username} onChange={setUserName}/>}
          
            {step === 2 && <OnlineUsers checkUnseen={checkUnseen} selectUser={(name) => selectUser(name)} data={users} username={username}/>}
            {step === 3 && <MessageContainer receiver={receiver} sendMessage = {sendMessage} handleGoBack={handleGoBack} value={message} onChange={setMessage} groupMessage={groupMessage} sortNames={sortNames} username={username} setMedia={setMedia}/>}
          </div>
    </div>
    
    
      </div>
    
    
  );
}

export default App;
