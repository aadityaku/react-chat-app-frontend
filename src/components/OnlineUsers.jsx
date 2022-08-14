import React,{useState} from 'react'

const OnlineUsers = ({selectUser,data,username,checkUnseen}) => {

  return (
    <div className="w-100">
              
                <h4 className='text-center mb-3'>Online Users</h4>

              <ul className="list-group">
                {
                  data && Object.keys(data).map((user,index) => username !== user && (
                    <li style={{cursor:"pointer"}} className='list-group-item list-group-item-action border-0 mb-1'
                     key={index}
                     onClick={() => selectUser(user)}>
                     <span className='me-2'><img src={`https://picsum.photos/30/30?random=${index}`} className='rounded-circle' alt="dempo" /></span>
                     <span className='m2-2'>{user}</span>
                     <span className='text-success float-end small mt-1 fw-bold'>online 
                     {
                      checkUnseen(user) !== 0 && <span className='badge rounded-pill bg-success mx-2 ms-1'>
                      {checkUnseen(user)}
                      </span>
                     }
                     
                     </span>
                     

                     </li>
                  ))
                }
                
              </ul>
            </div>
  )
}

export default OnlineUsers