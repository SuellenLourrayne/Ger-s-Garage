import { Link, useLocation } from 'react-router-dom';
import React, {useEffect,useState} from "react";
import Axios from 'axios';
import './styles.css';

/************** TRUST LEVEL INFO ***************

1 => Administrator
2 => Staff
3 => Client
4 => Administrator && Staff
5 => All

************** TRUST LEVEL INFO ***************/

const SideBarItem = ({ item, active }) => {
    let trustMultiple = 100;

    //verify user trust level
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [idUser, setIdUser] = useState(params.get("u"));
    const [idUserTrust, setIdUsertrust] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        Axios.post('http://localhost:3002/api/Users', { idUser: idUser, idUserTrust: idUserTrust }).then((response) => {
            if(response.data.message)
                console.log(response.data.message);
            else {
                setIdUsertrust(response.data[0].idUserTrust);
                setName(response.data[0].name);
            }
        })
        .catch(error => console.error(`Error: ${error}`));
    };
    

    if(idUserTrust == 1 || idUserTrust == 2) { trustMultiple = 4 };
    if(idUserTrust == item.trust || trustMultiple == item.trust || item.trust == 5) {
        return (
            
            <Link 
                to={item.path+location.search} 
                className={active ? 'sidebar-item-active' : 'sidebar-item'} >
                    <img 
                        src={item.icon}
                        alt={`icon-${item.icon}`}
                        className='sidebar-item-icon' />
                    <span className='sidebar-item-label'>{item.title}</span>
            </Link>
        
        )
    }
    else
        return "";
  
}
export default SideBarItem;
