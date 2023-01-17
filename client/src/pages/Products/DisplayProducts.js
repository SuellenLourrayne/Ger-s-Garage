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


export default function DisplayProducts(props) {

    //set active element
    const [activeElement, setActiveElement] = useState(-1);
    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

    //show or hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //constanntes to create or update products
    const [idItem, setIdItem] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [qtd, setQtd] = useState("");

    //clean constants after updated
    function clean (){
        setIdItem("");
        setDescription("");
        setCost("");
        setSellPrice("");
        setQtd("");
    }
    
    //update product function
    const handleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateProduct', {
        idItem: idItem,
        description: description,
        cost: cost,
        sellPrice: sellPrice,
        qtd: qtd,
    }).then(alert("Product updated."),updateActiveElement(-1));

    clean();
    };

    //create product function
    const HandleSubmitNew = (event) => {
        Axios.post('http://localhost:3002/api/NewProduct', {
        description: description,
        cost: cost,
        sellPrice: sellPrice,
        qtd: qtd,
        }).then(alert("Product "+description+" Created."),handleClose());

        clean();
        window.location.reload(true);
    };

    const displayProducts = (props) => {
        const {lists, list} = props;

        if(list.length > 0) {
            return (
            list.map(products => {
                console.log(products);
                return (

                <ListGroup key={products.idItem} className="group">
                    <ListGroupItem>
                        <div className="d-flex justify-content-between d-flex align-items-center">
                            <div className="w-50 p-2">
                                <Input id={products.idItem} description="description" type="text" 
                                    disabled={!(products.idItem === activeElement)} 
                                    defaultValue={products.description}
                                    onChange={(e)=> { setDescription(e.target.value); setIdItem(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                <Input id={products.idItem} description="cost" type="number" step=".01" 
                                disabled={!(products.idItem === activeElement)} 
                                defaultValue={products.cost}
                                onChange={(e)=> { setCost(e.target.value); setIdItem(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                <Input id={products.idItem} description="sellPrice" type="number" step=".01"
                                disabled={!(products.idItem === activeElement)} 
                                defaultValue={products.sellPrice}
                                onChange={(e)=> { setSellPrice(e.target.value); setIdItem(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                <Input id={products.idItem} description="qtd" type="number"
                                disabled={!(products.idItem === activeElement)} 
                                defaultValue={products.qtd}
                                onChange={(e)=> { setQtd(e.target.value); setIdItem(e.target.id) }}
                                ></Input>
                            </div>
                            <div className="p-2">
                                {!(products.idItem === activeElement)? 
                                    <Button color="primary" onClick={()=> updateActiveElement(products.idItem)} >Edit</Button> : <Button color="success" onClick={handleSubmitUpdate}>Save</Button>
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
                    <div className='Products-content'>
                        <div className='Products-content-container'>
                            <div className='Products-content-header'>
                                <h2>Products</h2>
                            </div>
                        </div>
                        <div className='Products-content-container'>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    No products registered.
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
                <div className='Products-content'>
                    <div className='Products-content-container'>
                        <div className='Products-content-header'>
                            <h2>Products</h2>
                        </div>
                    </div>
                    <div className='Products-content-container'>
                        <div className="d-flex justify-content-between">
                            <p className="w-25 text-center">Description</p>
                            <p className="text-center">Buy Price €</p>
                            <p className="text-center">Sell Price €</p>
                            <p className="text-center">Quantity</p>
                            <Button color="success" onClick={handleShow}>New Product</Button>
                            <Modal isOpen={show} toggle={handleClose} >
                                <ModalHeader>New Product</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="description">
                                                Description
                                            </Label>
                                            <Input id="description" description="description" type="textArea" onChange={(e)=> { setDescription(e.target.value) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="cost">
                                                Cost
                                            </Label>
                                            <Input id="cost" description="cost" type="number" step=".01" onChange={(e)=> { setCost(e.target.value) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="sellPrice">
                                                SellPrice
                                            </Label>
                                            <Input id="sellPrice" description="sellPrice" step=".01" type="number" onChange={(e)=> { setSellPrice(e.target.value) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="qtd">
                                                Quantity
                                            </Label>
                                            <Input id="qtd" description="qtd" type="number" onChange={(e)=> { setQtd(e.target.value) }} />
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
                            {displayProducts(props)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Router>
    )
}