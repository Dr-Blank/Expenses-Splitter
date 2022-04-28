import React, { useState } from 'react'
import xpng from './images/x.png';

const NamesButton = ({client, setSelectedClient, deleteClient}) => {

  const [isSelected,setIsSelected] = useState(false);

  const toggle = () => {
    if (isSelected){
      setIsSelected(false);
    }
    else{
      setIsSelected(true);
    }
      setSelectedClient({name:client.name,ethAddress:client.ethAddress});
  };

  // TODO:add ability to delete an user
  return (
    <div className="names_btn_container">
        <button 
            type="button" 
            onClick={toggle} 
            className={`btn btn-sm btn-primary names_btn ${isSelected ? "btn-success selected_user" : ""}`}>
                {client.name}
        </button>
        <span onClick={() =>deleteClient(client.ethAddress)}>
            <img className="delete_user" src={xpng} />
        </span>
    </div>
  )
}

export default NamesButton