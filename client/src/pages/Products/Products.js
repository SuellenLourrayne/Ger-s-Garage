import React, {useState} from "react";
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
    ListGroupItem,
    ListGroup,
    Form,
    Modal, ModalHeader, ModalBody, ModalFooter,
  } from 'reactstrap';

import './Products.css';

function Products () {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modalNew, setModalNew] = useState(false);
    const toggleNew = () => setModalNew(!modalNew);



  
    return(
        <Router>
          <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className='dashboard-body'>
                <div className='BookingList-content'>
                    <div className='BookingList-content-container'>
                        <div className='BookingList-content-header'>
                                <h2>Products</h2>
                        </div>
                    </div>
                    <div className='BookingList-content-container'>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                Products List
                            </div>
                            <Button color="success" onClick={toggleNew}>New Product</Button>
                            <Modal isOpen={modalNew} toggle={toggleNew}>
                                <ModalHeader toggle={toggleNew}>New Product</ModalHeader>
                                <ModalBody>
                                <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Product Name
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="ProductName"
                                    type="textArea"
                                    />
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Quantity
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="Quantity"
                                    type="number"
                                    />
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Buy Price
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="BuyPrice"
                                    type="textArea"
                                    />
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Sell Price
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="SeelPrice"
                                    type="textArea"
                                    />
                                </FormGroup>
                                </Form>
                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" onClick={toggleNew}>
                                    Save
                                </Button>{' '}
                                <Button color="secondary" onClick={toggleNew}>
                                    Cancel
                                </Button>
                                </ModalFooter>
                            </Modal>
                        </div>

                        <div>
                        <ListGroup>
                            <ListGroupItem>
                            <div className="d-flex justify-content-between d-flex align-items-center">
                                <div className="p-2">Product Name</div>
                                <div className="p-2">Quantity</div>
                                <div className="p-2">Buy Price</div>
                                <div className="p-2">Sell Price</div>
                                <div className="p-2"><Button color="primary" onClick={toggle}>Edit Product</Button></div>
                            </div>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
                                <ModalBody>
                                <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Product Name
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="ProductName"
                                    type="textArea"
                                    placeholder=""
                                    />
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Quantity
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="Quantity"
                                    type="number"
                                    placeholder=""
                                    />
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Buy Price
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="BuyPrice"
                                    type="textArea"
                                    placeholder=""
                                    />
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                    Sell Price
                                    </Label>
                                    <Input
                                    id="exampleEmail"
                                    name="SeelPrice"
                                    type="textArea"
                                    placeholder=""
                                    />
                                </FormGroup>
                                </Form>
                                </ModalBody>
                                <ModalFooter className="d-flex justify-content-between">
                                <Button color="danger" onClick={toggle}>
                                    Delete
                                </Button>
                                <div>
                                <Button color="primary" onClick={toggle}>
                                    Save
                                </Button>{' '}
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                                </div>
                                </ModalFooter>
                            </Modal>
                            </ListGroupItem>
                            
                        </ListGroup>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </Router>
    )
  }

  export default Products;

