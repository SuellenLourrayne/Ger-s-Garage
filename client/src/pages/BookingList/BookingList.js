import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
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

import './BookingList.css';

function BookingList () {
    const [open, setOpen] = useState('0');
    const [statusEdit, setStatusEdit] = useState(true);
    const [list, setList] = useState([]);
    
    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }
    


    ;

  
    return(
        <Router>
          <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-body'>
                <div className='BookingList-content'>
                    <div className='BookingList-content-container'>
                        <div className='BookingList-content-header'>
                                <h2>Welcome User Name</h2>
                        </div>
                    </div>
                    <div className='BookingList-content-container'>
                        Today's Bookings

                        <div>
                        <Accordion open={open} toggle={toggle}>
                            <AccordionItem>
                            <AccordionHeader targetId="1">
                                    <div className="booking-info d-flex justify-content-between">
                                        <div>Customer Name</div>
                                        <div>Booking Type</div>
                                        <div>Time</div>
                                    </div>
                                </AccordionHeader>
                            <AccordionBody accordionId="1">
                                <Row md="3">
                                    <Col>
                                    <FormGroup>
                                        <Label>
                                        Licence:
                                        </Label>
                                        <Input
                                        id="license"
                                        name="license"
                                        type="textArea"
                                        disabled={true}
                                        >
                                            <option value="0">Selecione uma opção</option>
                                            {list.map(list => (<option key={list.license} value={list.license}>{list.license}</option>))}
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
                                        disabled={true}
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
                                        Date:
                                        </Label>
                                        <Input
                                        id="date"
                                        name="date"
                                        type="Date"
                                        disabled={true}
                                        >
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
                                        <Input
                                        id="engineType"
                                        name="engineType"
                                        type="select"
                                        disabled={true}
                                        >
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
                                        <Input
                                        id="status"
                                        name="status"
                                        type="select"
                                        disabled={statusEdit}
                                        >
                                            <option>
                                                Status
                                            </option>
                                        </Input>
                                        <Button onClick={() => setStatusEdit(!statusEdit)}>{statusEdit? (<>Edit</>): (<>Save</>)}</Button>
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
                                    disabled={true}
                                    />
                                </FormGroup>
                                </Row>

                            </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </Router>
    )
  }

  export default BookingList;

