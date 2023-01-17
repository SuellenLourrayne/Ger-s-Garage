import React, { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
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

import './Profile.css';

function Profile () {
    const [editProfile, setEditProfile] = useState(true);
  
    //constants to update user
    const [idUser, setIdUser] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    //clean constants after updated
    function clean (){
      setIdUser("");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    }

    //update user function
    const HandleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateUser', {
        idUser: idUser,
        name: name,
        email: email,
        phone: phone,
        password: password,
    }).then(setEditProfile(!editProfile),alert("Profile updated."),updateActiveElement(-1));

    clean();
    };

    //set active element
    const [activeElement, setActiveElement] = useState(-1);
    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

  return(
    <Router>
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />

            <div className='dashboard-body'>
            <div className='Profile-content'>
            <div className='Profile-content-container'>
              <div className='Profile-content-header'>
                <h2>Profile</h2>
              </div>
            </div>
            <div className='Profile-content-container'>
            <Row md="2">
                                    <Col>                                            
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
                                            </Col>
                                            <Col>
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
                                            </Col>
                                            </Row>
                                            <Row md="2">
                                              <Col>
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
                                            </Col>
                                            <Col>
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
                                            </Col>
                                            </Row>
                                            <Row>
                                            {editProfile? (<Button color="info" onClick={() => setEditProfile(!editProfile)}>Edit</Button>) :
                                            (<Button color="success" onClick={HandleSubmitUpdate} >Save</Button>)}
                                            </Row>
                                        </div>
            </div>
            </div>
        </div>
    </Router>
  )
}

export default Profile;