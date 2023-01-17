import React, {useEffect,useState} from "react";
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { BrowserRouter as Router  } from 'react-router-dom';
import Vehicle from "./Vehicles"
import {Row,
        Col,
        NavItem,
        NavLink,
        Nav,
        TabContent,
        TabPane,
        Button,
        FormGroup,
        Input,
        Label,
        InputGroup,
        } from "reactstrap"

import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

import './BookingsClient.css';
import SearchVehiclesRegistered from "./searchVehiclesRegistered";

function BookingsClient () {
    const [tab, setTab] = useState("1")
    const [editProfile, setEditProfile] = useState(true);

    //new booking constants    
    const [idVehicleDetail, setIdVehicleDetail] = useState("");
    const [idBookingType, setIdBookingType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [coments, setComents] = useState("");

    //clean constants 
    function clean (){
        setIdVehicleDetail("");
        setIdBookingType("");
        setDate("");
        setTime("");
        coments("");
    }

    //get user info
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idUser = params.get("u");
    const [idUserTrust, setIdUsertrust] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [list, setList] = useState('');

    const getInfo = () => {
        Axios.post('http://localhost:3002/api/Users', { idUser: idUser, idUserTrust: idUserTrust }).then((response) => {
            if(response.data.message)
                console.log(response.data.message);
            else {
                setIdUsertrust(response.data[0].idUserTrust);
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setPhone(response.data[0].phone);
            }
        })
        .catch(error => console.error(`Error: ${error}`));
    };

    useEffect(() => {
        getInfo();
        getVehicles();
    }, []);    

    //create booking function
    const HandleSubmitNew = (event) => {
        Axios.post('http://localhost:3002/api/NewBooking', {
            idClient: idUser,
            idVehicleDetail: idVehicleDetail,
            idBookingType: idBookingType,
            date: date,
            time: time,
            coments: coments,
        }).then(alert("Booking Created."),window.location.reload(true));

        clean();
    };

    //update profile function
    const HandleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateUser', {
            idUser: idUser,
            name: name,
            email: email,
            phone: phone,
            password: password,
        }).then(setEditProfile(!editProfile),alert("Profile Updated."));

        clean();
    };
    
    function onChangeHandlerIdVehicleDetail (e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id'); 
        setIdVehicleDetail(option); 
    }
    
    function onChangeHandlerBookingType (e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id'); 
        setIdBookingType(option); 
    }

    const getVehicles = () => {
        Axios.post('http://localhost:3002/api/Vehicles', { idUser: idUser }).then((response) => {
            if(response.data.message)
                console.log(response.data.message);
            else {
                const fullData = response.data;
                setList(fullData);
            }
        })
        .catch(error => console.error(`Error: ${error}`));
    };

  return(
    <Router>
        <div className='BookingsClient-container'>
            <SideBar menu={sidebar_menu} />
            <div className='BookingsClient-body'>
                <div className='BookingList-content'>
                    <div className='BookingList-content-container'>
                        <div className='BookingList-content-header'>
                            <h2>Bookings</h2>
                        </div>
                    </div>
                    <Row md="2" className='container'>
                                <Col md="8">
                    <div className='BookingList-content-container'>
                        <div>
                            
                            <Nav tabs>
                                <NavItem className="linkNames">
                                <NavLink
                                    active={tab === "1"? (true) : (false)}
                                    onClick={() => setTab("1")}
                                >
                                    <h3>New Booking</h3>
                                </NavLink>
                                </NavItem>
                                <NavItem className="linkNames">
                                </NavItem>
                                <NavItem className="linkNames">
                                <NavLink
                                    active={tab === "2"? (true) : (false)}
                                    onClick={() => setTab("2")}
                                >
                                    <h3>Vehicles</h3>
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={tab} className="containerClient">

                                {/* NEW BOOKINGS */}
                                <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                    <Row md="2">
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Vehicle Name:
                                        </Label>
                                        <Input
                                        id="vehicleName"
                                        name="vehicleName"
                                        type="select"
                                        placeholder='Vehicle Name'
                                        onChange={(e)=> { onChangeHandlerIdVehicleDetail(e); }}
                                        >
                                        <option>
                                        Choose an option
                                        </option>
                                        <SearchVehiclesRegistered list={list} /> 
                                        </Input>
                                    </FormGroup>
                                    </Col>                                    
                                    <Col>
                                    <FormGroup>
                                        <Label style={{width: "100%"}}>
                                        Type of Booking:
                                        </Label>
                                        <Input
                                        id="bookingType"
                                        name="bookingType"
                                        type="select"
                                        onChange={(e)=> { onChangeHandlerBookingType(e) }}
                                        >
                                            <option id="0">
                                            Choose an option
                                            </option>
                                            <option id="1">
                                            Annual Service
                                            </option>
                                            <option id="2">
                                            Major Service
                                            </option>
                                            <option id="3">
                                            Repair or Fault
                                            </option>
                                            <option id="4">
                                            Major Repair
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>                                    
                                </Row>
                                <hr/>
                                <Row md="2">
                                <Col>
                                    <FormGroup>
                                        <Label>
                                        Date:
                                        </Label>
                                        <Input
                                        id="date"
                                        name="date"
                                        type="Date"
                                        onChange={(e)=> { setDate(e.target.value) }}
                                        >
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Time:
                                        </Label>
                                        <InputGroup>
                                        <Input
                                        id="time"
                                        name="time"
                                        type="time"
                                        onChange={(e)=> { setTime(e.target.value) }}
                                        >
                                        </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                <FormGroup>
                                    <Label for="exampleText" className="booking-info">
                                    Customer Comments:
                                    </Label>
                                    <Input
                                    id="coments"
                                    name="coments"
                                    type="textarea"
                                    onChange={(e)=> { setComents(e.target.value) }}
                                    />
                                </FormGroup>
                                </Row>
                                </Col>
                                </Row>
                                <div className="d-flex justify-content-center">
                                <Button color="success" onClick={HandleSubmitNew} >Create Booking</Button>
                                </div>
                                </TabPane>

                                {/* VEHICLES */}
                                <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <Vehicle />
                                    </Col>
                                </Row>
                                </TabPane>
                            </TabContent>

                                {/* PROFILE */}
                        </div>
                </div>
                                </Col>
                                <Col md="4">
                                <div className='BookingList-content-container'>
                                    <div>
                                        <div>
                                            <h2>Profile</h2>
                                            
                                            <FormGroup>
                                            <Label for="name">
                                            Name:
                                            </Label>
                                            <Input
                                            id="name"
                                            name="name"
                                            type="textArea"
                                            disabled={editProfile}
                                            defaultValue={name}
                                            onChange={(e)=> { setName(e.target.value) }}
                                            />
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="name">
                                            Email:
                                            </Label>
                                            <Input
                                            id="email"
                                            name="emal"
                                            type="textArea"
                                            disabled={editProfile}
                                            defaultValue={email}
                                            onChange={(e)=> { setEmail(e.target.value) }}
                                            />
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="name">
                                            Phone Number:
                                            </Label>
                                            <Input
                                            id="phone"
                                            name="phone"
                                            type="textArea"
                                            disabled={editProfile}
                                            defaultValue={phone}
                                            onChange={(e)=> { setPhone(e.target.value) }}
                                            />
                                            </FormGroup>
                                            <FormGroup>
                                            <Label for="password">
                                            Password:
                                            </Label>
                                            <Input
                                            id="password"
                                            name="password"
                                            type="textArea"
                                            placeholder="********"
                                            disabled={editProfile}
                                            onChange={(e)=> { setPassword(e.target.value) }}                                            
                                            />
                                            </FormGroup>
                                            {editProfile? (<Button color="info" onClick={() => setEditProfile(!editProfile)}>Edit</Button>) :
                                            (<Button color="success" onClick={HandleSubmitUpdate} >Save</Button>)}
                                        </div>
                                    </div>
                                </div>
                                </Col>
                            </Row>
                </div>
            </div>
        </div>
        
    </Router>
  )
}

export default BookingsClient;