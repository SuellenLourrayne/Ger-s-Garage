import React, { useState } from "react";
import Axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
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

    //constants to create or update users
    const [idUser, setIdUser] = useState("");
    const [name, setName] = useState("");
    const [bookingType, setBookingType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [license, setLicense] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const [bookingComents, setComents] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [engine, setEngine] = useState("");
    const [brand, setTiBrand] = useState("");

    //clean constants after updated
    function clean (){
        setIdUser("");
        setName("");
        setBookingType("");
        setDate("");
        setTime("");
        setLicense("");
        setBookingStatus("");
        setComents("");
        setVehicle("");
        setEngine("");
        setTiBrand("");
    }
    
    //update user function
    const handleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateUser', {
        idUser: idUser,
        name: name,
        bookingType: bookingType,
        date: date,
    }).then(alert("Client updated."),updateActiveElement(-1));

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
                                    <Input id={booking.idBooking} name="name" type="text" 
                                        disabled={!(booking.idBooking === activeElement)} 
                                        defaultValue={booking.name}
                                        onChange={(e)=> { setName(e.target.value); setIdUser(e.target.id) }}
                                    ></Input>
                                    </div>
                                    <div className="p-2">
                                    <Input id={booking.idBooking} name="bookingtype" type="text" 
                                        disabled={!(booking.idBooking === activeElement)} 
                                        defaultValue={booking.bookingType}
                                        onChange={(e)=> { setBookingType(e.target.value); setIdUser(e.target.id) }}
                                    ></Input>
                                    </div>
                                    <div className="p-2">
                                    <Input id={booking.idBooking} name="time" type="text" 
                                        disabled={!(booking.idBooking === activeElement)} 
                                        defaultValue={booking.time}
                                        onChange={(e)=> { setTime(e.target.value); setIdUser(e.target.id) }}
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
                                        <Input id="license" name="license" type="textArea" disabled={true}>
                                        <option>
                                            License
                                        </option>
                                        
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Brand:
                                        </Label>
                                        <Input id="brand" name="brand" type="select" disabled={true}>
                                        <option>
                                            Brand
                                        </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Date:
                                        </Label>
                                        <Input id="date" name="date" type="Date" disabled={true}>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                </Row>

                                <Row md="3">
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Engine Type:
                                        </Label>
                                        <Input id="engineType" name="engineType" type="select" disabled={true}>
                                        <option>
                                            Engine Type
                                        </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                            Status:
                                        </Label>
                                        <InputGroup>
                                            <Input id="status" name="status" type="select" disabled={statusEdit}>
                                            <option>
                                                Status
                                            </option>
                                            </Input>
                                            <Button onClick={()=> setStatusEdit(!statusEdit)}>{statusEdit? (<>Edit</>): (<>Save</>)}</Button>
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
                                        <Input id="coments" name="coments" type="textarea" disabled={true} />
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