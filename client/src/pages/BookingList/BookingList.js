import React, {useEffect,useState} from "react";
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import './BookingList.css';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import DisplayBookings from './DisplayBookings';

function BookingList () {

    const [list, setList] = useState('');

    //get user info
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [idUser, setIdUser] = useState(params.get("u"));
    const [idUserTrust, setIdUsertrust] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getBooking();
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

    const getBooking = () => {
        //Administrator [view all bookings]
        if(idUserTrust == 1){
            Axios.post('http://localhost:3002/api/Bookings', { idUser: "", idUserTrust: idUserTrust }).then((response) => {
            const fullData = response.data;
            setList(fullData);
            if(response.data.message)
                console.log(response.data.message);
            })
            .catch(error => console.error(`Error: ${error}`));
        }

        //Staff [view bookings allocated to them]
    //    else if(idUserTrust == 2){

  //      }
        //Client [view bookings made by them]
      //  else if(idUserTrust == 3){

      //  }
    };

    
    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-body'>
                <div className='BookingList-content'>
                    <div className='BookingList-content-container'>
                        <div className='BookingList-content-header'>
                            <h2>Welcome {name}</h2>
                        </div>
                    </div>
                    <div className='BookingList-content-container'>
                        <div>
                            <DisplayBookings list={list} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default BookingList;

