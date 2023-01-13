import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Vehicle from "./Vehicles"
import {Row,
        Col,
        NavItem,
        NavLink,
        Nav,
        TabContent,
        TabPane,
        Card,
        CardTitle,
        CardText,
        Button,
        FormGroup,
        Input,
        Label,
        InputGroup,
        Accordion,
        AccordionItem,
        AccordionHeader,
        AccordionBody,

        } from "reactstrap"

import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

import './BookingsClient.css';

function BookingsClient () {
    const [tab, setTab] = useState("1")
    const [open, setOpen] = useState('0');
    const [statusEdit, setStatusEdit] = useState(true);
    const [editProfile, setEditProfile] = useState(true)
    
    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }
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
                    <Row md="2">
                                <Col md="8">
                    <div className='BookingList-content-container'>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            Bookings
                        </div>
                    </div>
                        <div>
                            
                            <Nav tabs>
                                <NavItem className="linkNames">
                                <NavLink
                                    active={tab == "1"? (true) : (false)}
                                    onClick={() => setTab("1")}
                                >
                                    <h3>New Booking</h3>
                                </NavLink>
                                </NavItem>
                                <NavItem className="linkNames">
                                <NavLink
                                    active={tab == "2"? (true) : (false)}
                                    onClick={() => setTab("2")}
                                >
                                    <h3>Bookings</h3>
                                </NavLink>
                                </NavItem>
                                <NavItem className="linkNames">
                                <NavLink
                                    active={tab == "3"? (true) : (false)}
                                    onClick={() => setTab("3")}
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
                                    <Row md="3">
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Vehicle Name:
                                        </Label>
                                        <Input
                                        id="vehicleName"
                                        name="vehicleName"
                                        type="textArea"
                                        placeholder='Vehicle Name'
                                        >
                                            
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Vehicle Type:
                                        </Label>
                                        <Input
                                        id="vehicleType"
                                        name="vehicleType"
                                        type="select"
                                        
                                        >
                                            <option>
                                            vehicleType
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Brand:
                                        </Label>
                                        <Input
                                        id="brand"
                                        name="brand"
                                        type="select"
                                        
                                        >
                                            <option>
                                            Brand
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Licence:
                                        </Label>
                                        <Input
                                        id="licence"
                                        name="licence"
                                        type="select"
                                        
                                        >
                                            <option>
                                            Licence
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label style={{width: "100%"}}>
                                        Booking Required:
                                        </Label>
                                        <Input
                                        id="bookingRequired"
                                        name="bookingRequired"
                                        type="select"
                                        
                                        >
                                            <option>
                                            Booking Required:
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Engine Type:
                                        </Label>
                                        <Input
                                        id="engineType"
                                        name="engineType"
                                        type="select"
                                        
                                        >
                                            <option>
                                                Engine Type
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
                                    
                                    />
                                </FormGroup>
                                </Row>
                                </Col>
                                </Row>
                                <div className="d-flex justify-content-center">
                                <Button color="success">Create Booking</Button>
                                </div>
                                </TabPane>

                                {/* BOOKINGS */}
                                <TabPane tabId="2">
                                <Accordion open={open} toggle={toggle}>
                                    <AccordionItem>
                                    <AccordionHeader targetId="1">
                                            <div className="booking-info d-flex justify-content-between">
                                                <div>Vehicle Name</div>
                                                <div>Booking Required</div>
                                                <div>Time</div>
                                                <div>Status</div>
                                            </div>
                                        </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                            <Row md="3">
                                            <Col>
                                            <FormGroup>
                                                <Label>
                                                Vehicle Name:
                                                </Label>
                                                <Input
                                                id="vehicleName"
                                                name="vehicleName"
                                                type="textArea"
                                                placeholder='Vehicle Name'
                                                >
                                                    
                                                </Input>
                                            </FormGroup>
                                            </Col>
                                            <Col>
                                            <FormGroup>
                                                <Label>
                                                Vehicle Type:
                                                </Label>
                                                <Input
                                                id="vehicleType"
                                                name="vehicleType"
                                                type="select"
                                                
                                                >
                                                    <option>
                                                    vehicleType
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            </Col>
                                            <Col>
                                            <FormGroup>
                                                <Label>
                                                Brand:
                                                </Label>
                                                <Input
                                                id="brand"
                                                name="brand"
                                                type="select"
                                                
                                                >
                                                    <option>
                                                    Brand
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            </Col>
                                            <Col>
                                            <FormGroup>
                                                <Label>
                                                Licence:
                                                </Label>
                                                <Input
                                                id="licence"
                                                name="licence"
                                                type="select"
                                                
                                                >
                                                    <option>
                                                    Licence
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            </Col>
                                            <Col>
                                            <FormGroup>
                                                <Label style={{width: "100%"}}>
                                                Booking Required:
                                                </Label>
                                                <Input
                                                id="bookingRequired"
                                                name="bookingRequired"
                                                type="select"
                                                
                                                >
                                                    <option>
                                                    Booking Required:
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            </Col>
                                            <Col>
                                            <FormGroup>
                                                <Label>
                                                Engine Type:
                                                </Label>
                                                <Input
                                                id="engineType"
                                                name="engineType"
                                                type="select"
                                                
                                                >
                                                    <option>
                                                        Engine Type
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
                                                >
                                                </Input>
                                                </InputGroup>
                                            </FormGroup>
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                                </TabPane>

                                {/* VEHICLES */}
                                <TabPane tabId="3">
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
                                            placeholder="Dark Sabrina"
                                            disabled={editProfile}
                                            
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
                                            placeholder="darksabrina@gmail.com"
                                            disabled={editProfile}
                                            
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
                                            placeholder="4002-8922"
                                            disabled={editProfile}
                                            
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
                                            
                                            />
                                            </FormGroup>
                                            {editProfile? (<Button color="info" onClick={() => setEditProfile(!editProfile)}>Edit</Button>) :
                                            (<Button color="success" onClick={() => setEditProfile(!editProfile)}>Save</Button>)}
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