import React, {useEffect,useState} from "react";
import Axios from 'axios';
import './Clients.css';
import DisplayClients from './DisplayClients';

function Clients () {
    const [list, setList] = useState('');

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        Axios.post('http://localhost:3002/api/Users', { idUserTrust: 3 }).then((response) => {
            const fullData = response.data;
            setList(fullData);
            if(response.data.message)
                console.log(response.data.message);
        })
        .catch(error => console.error(`Error: ${error}`));
    };
    
    return (

        <DisplayClients list={list} />
        
    );
  }

  export default Clients;

