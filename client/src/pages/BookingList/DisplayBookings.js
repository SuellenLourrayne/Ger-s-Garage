import React, { useState } from "react";
import Axios from 'axios';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    InputGroup,
  } from 'reactstrap';


export default function DisplayBooking(props) {

    //set active element
    const [activeElement, setActiveElement] = useState(-1);
    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

    //verify user trust level
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [idUser, setIdUser] = useState(params.get("u"));

    //constants to create or update users
    const [idClient, setIdClient] = useState("");
    const [idStaff, setIdStaff] = useState("");
    const [idUserTrust, setIdUserTrust] = useState("");
    const [idBooking, setIdBooking] = useState("");
    const [name, setName] = useState("");
    const [bookingType, setBookingType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [license, setLicense] = useState("");
    const [status, setStatus] = useState("");
    const [coments, setComents] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [engine, setEngine] = useState("");
    const [brand, setTiBrand] = useState("");

    //clean constants after updated
    function clean (){
        setIdClient("");
        setIdStaff("");
        setIdUserTrust("");
        setIdBooking("");
        setName("");
        setBookingType("");
        setDate("");
        setTime("");
        setLicense("");
        setStatus("");
        setComents("");
        setVehicle("");
        setEngine("");
        setTiBrand("");
    }
    
    //update user function
    const handleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateBooking', {
        idBooking: idBooking,
        idBookingStatus: status,
    }).then(alert("Status updated."),updateActiveElement(-1));

    clean();
    };

    const [open, setOpen] = useState('0');
    const [statusEdit, setStatusEdit] = useState(true);
    
    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }

    function onChangeHandler (e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id'); 
        setStatus(option); 
      }

    const displayBooking = (props) => {
        const {lists, list} = props;

        if(list.length > 0) {
            return (
            list.map(booking => {
                console.log(booking);
                return (
                
                    <Accordion open={open} toggle={toggle} key={booking.idBooking} >
                        <AccordionItem>
                            <AccordionHeader targetId={booking.idBooking}>
                                <div className="booking-info d-flex justify-content-between">
                                    <div className="p-2">
                                    <Input id="name" name="name" type="text" 
                                        disabled={true}
                                        defaultValue={booking.name}
                                    ></Input>
                                    </div>
                                    <div className="p-2">
                                    <Input id="bookingType" name="bookingType" type="text" 
                                        disabled={true}
                                        defaultValue={booking.bookingType}
                                    ></Input>
                                    </div>
                                    <div className="p-2">
                                    <Input id="time" name="time" type="text" 
                                        disabled={true}
                                        defaultValue={booking.time}
                                    ></Input>
                                    </div>
                                </div>
                            </AccordionHeader>
                            <AccordionBody accordionId={booking.idBooking} >
                                <Row md="3">
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Licence:
                                        </Label>
                                        <Input id="license" name="license" type="textArea" 
                                        disabled={true}
                                        defaultValue={booking.license}
                                        ></Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Brand:
                                        </Label>
                                        <Input id="brand" name="brand" type="textArea" 
                                        disabled={true}
                                        defaultValue={booking.brand}
                                        ></Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Date:
                                        </Label>
                                        <Input id="date" name="date" type="textArea"
                                        disabled={true}
                                        defaultValue={booking.date}
                                        ></Input>
                                    </FormGroup>
                                    </Col>
                                </Row>

                                <Row md="3">
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Engine Type:
                                        </Label>
                                        <Input id="engineType" name="engineType" type="textArea" 
                                        disabled={true}
                                        defaultValue={booking.engine}
                                        ></Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Status:
                                        </Label>
                                        <InputGroup>
                                            <Input id={booking.idBooking} name="status" type="select" 
                                            disabled={!(booking.idBooking === activeElement)}               
                                            onChange={(e)=> { onChangeHandler(e); setIdBooking(e.target.id) }}                              
                                            ><option>
                                                {booking.status}
                                            </option>
                                            <option id="1">
                                                Booked 
                                            </option>
                                            <option id="2">
                                            	In Service 
                                            </option>
                                            <option id="3">
                                            	Fixed / Completed 
                                            </option>
                                            <option id="4">
                                            	Collected 
                                            </option>
                                            <option id="5">
                                            	Unrepairable / Scrapped 
                                            </option>
                                            </Input>
                                            {!(idUser == booking.idClient)? 
                                            <div>
                                            {!(booking.idBooking === activeElement)? 
                                            <Button color="primary" onClick={()=> updateActiveElement(booking.idBooking)} >Edit</Button> : <Button color="success" onClick={handleSubmitUpdate}>Save</Button>
                                            } </div> : <></>
                                            }
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
                                        <Input id="coments" name="coments" type="textarea" 
                                        disabled={true} 
                                        defaultValue={booking.coments}
                                        />
                                    </FormGroup>
                                </Row>

                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>

                )
            })
            )
        }
        else {
        <Router>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    No booking registered.
                                </div>
                            </div>

        </Router>
        }
    }
    return (
    <Router>

            {displayBooking(props)}

    </Router>
    )
}