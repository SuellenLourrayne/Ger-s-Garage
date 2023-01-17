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


export default function DisplayClient(props) {

    //set active element
    const [activeElement, setActiveElement] = useState(-1);
    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

    //show or hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //constants to create or update user
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
    }).then(alert("Client updated."),updateActiveElement(-1));

    clean();
    };

    //create user function
    const HandleSubmitNew = (event) => {
        Axios.post('http://localhost:3002/api/Register', {
        name: name,
        email: email,
        phone: phone,
        password: password,
        idUserTrust: 3,
        }).then(alert("Client "+name+" Created."),handleClose());

        clean();
        window.location.reload(true);
    };

    const displayClient = (props) => {
        const {lists, list} = props;

        if(list.length > 0) {
            return (
            list.map(client => {
                console.log(client);
                return (

                <ListGroup key={client.idUser} className="group">
                    <ListGroupItem>
                        <div className="d-flex justify-content-between d-flex align-items-center">
                            <div className="p-2">
                                <Input id={client.idUser} name="name" type="text" 
                                    disabled={!(client.idUser === activeElement)} 
                                    defaultValue={client.name}
                                    onChange={(e)=> { setName(e.target.value); setIdUser(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="w-50 p-2">
                                <Input id={client.idUser} name="email" type="email" 
                                disabled={!(client.idUser === activeElement)} 
                                defaultValue={client.email}
                                onChange={(e)=> { setEmail(e.target.value); setIdUser(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                <Input id={client.idUser} name="phone" type="text" 
                                disabled={!(client.idUser === activeElement)} 
                                defaultValue={client.phone}
                                onChange={(e)=> { setPhone(e.target.value); setIdUser(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                {!(client.idUser === activeElement)? 
                                    <Button color="primary" onClick={()=> updateActiveElement(client.idUser)} >Edit</Button> : <Button color="success" onClick={handleSubmitUpdate}>Save</Button>
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
                    <div className='Client-content'>
                        <div className='Client-content-container'>
                            <div className='Client-content-header'>
                                <h2>Clients</h2>
                            </div>
                        </div>
                        <div className='Client-content-container'>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    No client registered.
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
                <div className='Client-content'>
                    <div className='Client-content-container'>
                        <div className='Client-content-header'>
                            <h2>Clients</h2>
                        </div>
                    </div>
                    <div className='Client-content-container'>
                        <div className="d-flex justify-content-between">
                            <p className="text-center">Name</p>
                            <p className="w-50 text-center">Email</p>
                            <p className="text-center">Phone Number</p>
                            <Button color="success" onClick={handleShow}>New Client</Button>
                            <Modal isOpen={show} toggle={handleClose} >
                                <ModalHeader>New Client</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="name">
                                                Client Name
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
                                    <Button color="secondary" onClick={handleClose} >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div>
                            {displayClient(props)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Router>
    )
}