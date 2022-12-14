import React from 'react'

const MessageContainer = ({sendMessage,handleGoBack,onChange,value,receiver,username,sortNames,groupMessage,setMedia}) => {
  
  // let messages = groupMessage ? groupMessage[sortNames(username,receiver)]:[];
  const messages = groupMessage ? groupMessage[sortNames(username,receiver)]:[null];
  console.log(messages);
  
  return (
    <div className='card'>
    <div className='card-header bg-primary text-white fw-bold'>

        <img src="https://img.icons8.com/ios-glyphs/30/000000/circled-left.png" onClick={() => handleGoBack()} alt="" />

      {receiver}</div>
    <div className='card-body' style={{height:"300px",overflow:"auto"}}>
       <ul className='nav flex-column'>
       
       {(messages?.length) > 0 ? messages.map((msg,index) => (
          <li className='nav-item nav-link' key={index} style={{
            display:"flex",
            flexDirection:(username === msg.receiver)? "row": "row-reverse",
          }}>
              {/* <div className="profile-pic">
                <img src="https://picsum.photos/50/50" alt="" />
        </div> */}
        
              {( msg.message !== '') ? <div className="badge bg-success px-2">{msg.message}</div> : null}
              {msg.media && msg.media.image ? <img alt={msg.media.name} src={msg.media.content}className="d-block" width='100%' height="auto"/> : null}
          </li>
       )) : null} 
       </ul>
    </div> 
    <div className='card-footer p-0'>
    <form onSubmit={(e) => sendMessage(e)} className='d-flex'>
        <textarea placeholder='Type something...' className="form-control rounded-0" style={{flex:1}}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        />        
        <input type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            console.log(reader.result)
            setMedia({
              image:true,
              content:reader.result,
              name:file.name
            })
          }
          reader.error = function(error){
            console.log(error)
          }
        }}

        className='form-control' style={{flex:0.3}}/>
        <button type="submit"  className='btn btn-success rounded-0' >
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-sent.png" alt="" />
        </button>
    </form>
    </div>
</div> 
  )
}

export default MessageContainer