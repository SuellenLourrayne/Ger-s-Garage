import React, { useState } from "react";
import Axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import {
FormGroup,
Label,
Input,
Button,
ListGroupItem,
ListGroup,
Form,
Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';


export default function DisplayStaff(props) {

    //set active element
    const [activeElement, setActiveElement] = useState(-1);
    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

    //show or hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //constanntes to create or update users
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
    const handleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateUser', {
        idUser: idUser,
        name: name,
        email: email,
        phone: phone,
        password: "",
    }).then(alert("Staff updated."),updateActiveElement(-1));

    clean();
    };

    //create user function
    const HandleSubmitNew = (event) => {
        Axios.post('http://localhost:3002/api/Register', {
        name: name,
        email: email,
        phone: phone,
        password: password,
        idUserTrust: 2,
        }).then(alert("Staff "+name+" Created."),handleClose());

        clean();
        window.location.reload(true);
    };

    const displayStaff = (props) => {
        const {lists, list} = props;

        if(list.length > 0) {
            return (
            list.map(staff => {
                console.log(staff);
                return (

                <ListGroup key={staff.idUser} className="group">
                    <ListGroupItem>
                        <div className="d-flex justify-content-between d-flex align-items-center">
                            <div className="p-2">
                                <Input id={staff.idUser} name="name" type="text" 
                                    disabled={!(staff.idUser === activeElement)} 
                                    defaultValue={staff.name}
                                    onChange={(e)=> { setName(e.target.value); setIdUser(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="w-50 p-2">
                                <Input id={staff.idUser} name="email" type="email" 
                                disabled={!(staff.idUser === activeElement)} 
                                defaultValue={staff.email}
                                onChange={(e)=> { setEmail(e.target.value); setIdUser(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                <Input id={staff.idUser} name="phone" type="text" 
                                disabled={!(staff.idUser === activeElement)} 
                                defaultValue={staff.phone}
                                onChange={(e)=> { setPhone(e.target.value); setIdUser(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                {!(staff.idUser === activeElement)? 
                                    <Button color="primary" onClick={()=> updateActiveElement(staff.idUser)} >Edit</Button> : <Button color="success" onClick={handleSubmitUpdate}>Save</Button>
                                }
                            </div>
                        </div>
                    </ListGroupItem>

                </ListGroup>

                )
            })
            )
        }
        else {
        <Router>
            <div className='dashboard-container'>
                <SideBar menu={sidebar_menu} />

                <div className='dashboard-body'>
                    <div className='Staff-content'>
                        <div className='Staff-content-container'>
                            <div className='Staff-content-header'>
                                <h2>Staff</h2>
                            </div>
                        </div>
                        <div className='Staff-content-container'>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    No staff registered.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
        }
    }
    return (
    <Router>
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-body'>
                <div className='Staff-content'>
                    <div className='Staff-content-container'>
                        <div className='Staff-content-header'>
                            <h2>Staff</h2>
                        </div>
                    </div>
                    <div className='Staff-content-container'>
                        <div className="d-flex justify-content-between">
                            <p className="text-center">Name</p>
                            <p className="w-50 text-center">Email</p>
                            <p className="text-center">Phone Number</p>
                            <Button color="success" onClick={handleShow}>New Staff</Button>
                            <Modal isOpen={show} toggle={handleClose} >
                                <ModalHeader>New Staff</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="name">
                                                Staff Name
                                            </Label>
                                            <Input id="name" name="name" type="textArea" onChange={(e)=> { setName(e.target.value) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">
                                                Email
                                            </Label>
                                            <Input id="email" name="email" type="email" onChange={(e)=> { setEmail(e.target.value) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="phone">
                                                Phone Number
                                            </Label>
                                            <Input id="phone" name="phone" type="textArea" onChange={(e)=> { setPhone(e.target.value) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">
                                                Password
                                            </Label>
                                            <Input id="password" name="password" type="password" onChange={(e)=> { setPassword(e.target.value) }} />
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={HandleSubmitNew} >Save</Button>
                                    <Button color="secondary" >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div>
                            {displayStaff(props)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Router>
    )
}