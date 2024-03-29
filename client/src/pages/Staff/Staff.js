import React, {useEffect,useState} from "react";
import Axios from 'axios';
import './Staff.css';
import DisplayStaff from './DisplayStaff';

function Staff () {
    const [list, setList] = useState('');

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        Axios.post('http://localhost:3002/api/Users', { idUser: "", idUserTrust: 2 }).then((response) => {
            const fullData = response.data;
            setList(fullData);
            if(response.data.message)
                console.log(response.data.message);
        })
        .catch(error => console.error(`Error: ${error}`));
    };
    
    return (

        <DisplayStaff list={list} />
        
    );
  }

  export default Staff;

