import React, { useState } from 'react'
import xpng from './images/x.png';

const NamesButton = ({client, setSelectedClient, deleteClient, activeContract}) => {

  const [isSelected,setIsSelected] = useState(false);

  const toggle = async () => {
    let checkIfMember = await activeContract.methods
    .isMember(client.ethAddress)
    .call();
    if(checkIfMember) {
      if (isSelected){
        setIsSelected(false);
      }
      else{
        setIsSelected(true);
      }
        setSelectedClient({name:client.name,ethAddress:client.ethAddress});
    }
    else{
      window.alert("Cannot choose this individual as their payment to join contract is pending.");
    }
    
  };

  // TODO:add ability to delete an user
  return (
    <div className="names_btn_container">
        <button 
            type="button" 
            onClick={toggle} 
            className={`names_btn ${isSelected ? "selected_user" : ""}`}>
                {client.name}
        </button>
        <span onClick={() =>deleteClient(client.ethAddress)}>
            <img className="delete_user" src={xpng} />
        </span>
    </div>
  )
}

export default NamesButton