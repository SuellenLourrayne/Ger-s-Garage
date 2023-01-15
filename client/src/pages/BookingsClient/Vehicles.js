import React, {useState , useEffect} from "react"
import Axios from 'axios';
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
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    ModalFooter,
    } from "reactstrap"
import SearchBrands from "./searchBrands";

export default function Vehicle() {
    const [open, setOpen] = useState('0');
    const [modal, setModal] = useState(false);
    const [editButton, setEditButton] = useState(true);
    const [list2, setList2] = useState('');

    const toggleModal = () => setModal(!modal);

    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }

    //show or hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //constants to create or update users
    const [vehicleName, setVehicleName] = useState("");
    const [idType, setIdType] = useState("");
    const [idBrand, setIdBrand] = useState("");
    const [idEngineType, setIdEngineType] = useState("");
    const [license, setLicense] = useState("");

    //clean constants after updated
    function clean (){
        setVehicleName("");
        setIdType("");
        setIdBrand("");
        setIdEngineType("");
        setLicense("");
    }

    //create vehicle function
    const HandleSubmitNew = (event) => {
        Axios.post('http://localhost:3002/api/NewVehicle', {
            vehicleName: vehicleName,
            idType: idType,
            idBrand: idBrand,
            idEngineType: idEngineType,
            license: license,
        }).then(alert("Vehicle "+vehicleName+" Created."),handleClose());

        clean();
        window.location.reload(true);
    };

    const getBrands = () => {
        Axios.get('http://localhost:3002/api/Brands', {  }).then((response) => {
            if(response.data.message)
                console.log(response.data.message);
            else {
                const fullData = response.data;
                setList2(fullData);
            }
        })
        .catch(error => console.error(`Error: ${error}`));
    };

    useEffect(() => {
        getBrands();
    }, []);    

    return(
        <>
        <div className="d-flex justify-content-end" style={{marginBottom: "15px"}}>
            <Button color="success" onClick={handleShow}>New Vehicle</Button>
        </div>
        <Accordion open={open} toggle={toggle}>
            <AccordionItem>
            <AccordionHeader targetId="1">
                    <div className="booking-info d-flex justify-content-between">
                        <div>Vehicle Name</div>
                        <div>Vehicle Type</div>
                        <div>Brand</div>
                    </div>
                </AccordionHeader>
            <AccordionBody accordionId="1">
                    <Row md="2">
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
                        disabled={editButton}
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
                        disabled={editButton}
                        >
                            <option>
                            Vehicle Type
                            </option>
                        </Input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row md="3">

                    <Col>
                    <FormGroup>
                        <Label>
                        Brand:
                        </Label>
                        <Input
                        id="brand"
                        name="brand"
                        type="select"
                        disabled={editButton}
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
                        disabled={editButton}
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
                        Engine Type:
                        </Label>
                        <Input
                        id="engineType"
                        name="engineType"
                        type="select"
                        disabled={editButton}
                        >
                            <option>
                            Engine Type
                            </option>
                        </Input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <div>
                        {editButton? (
                            <Button color="info" onClick={() => setEditButton(!editButton)}>Edit</Button>
                        ) : 
                        (
                        <div className="d-flex justify-content-between">
                        <Button color="success" onClick={() => setEditButton(!editButton)}>Save</Button>
                        <Button color="danger" onClick={() => setEditButton(!editButton)}>Delete</Button>
                        </div>
                        )}
                        
                    </div>

                    {/* MODAL SPACE */}
                    <div>
                    <Modal isOpen={show} toggle={handleClose}>
                        <ModalHeader>New Vehicle</ModalHeader>
                            <ModalBody>
                            <Form>
                            <FormGroup>
                        <Label>
                        Vehicle Name:
                        </Label>
                        <Input
                        id="vehicleName"
                        name="vehicleName"
                        type="textArea"
                        placeholder='Vehicle Name'
                        onChange={(e)=> { setVehicleName(e.target.value) }}
                        >
                            
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                        Vehicle Type:
                        </Label>
                        <Input
                        id="vehicleType"
                        name="vehicleType"
                        type="select"
                        onChange={(e)=> { setIdType(e.target.value) }}
                        >
                            <option id="1">
                            Car
                            </option>
                            <option id="2">
                            Motorbike
                            </option>
                            <option id="3">
                            Small Bus
                            </option>
                            <option id="4">
                            Small Van
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                        Brand:
                        </Label>
                        <Input
                        id="brand"
                        name="brand"
                        type="select"
                        onChange={(e)=> { setIdBrand(e.target.value) }}
                        >
                        <SearchBrands list={list2} /> 
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                        Licence:
                        </Label>
                        <Input
                        id="licence"
                        name="licence"
                        type="textArea"
                        onChange={(e)=> { setLicense(e.target.value) }}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{width: "100%"}}>
                        Engine Type:
                        </Label>
                        <Input
                        id="engineType"
                        name="engineType"
                        type="select"
                        onChange={(e)=> { setIdEngineType(e.target.value) }}
                        >
                        <option id="1">
                        Diesel
                        </option>
                        <option id="2">
                        Petrol
                        </option>
                        <option id="3">
                        Hybrid
                        </option>
                        <option id="4">
                        Eletric
                        </option>
                        </Input>
                    </FormGroup>
                            </Form>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="success" onClick={HandleSubmitNew}>
                                Save
                            </Button>{' '}
                            <Button color="secondary" onClick={toggleModal}>
                                Cancel
                            </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
            </AccordionBody>
            </AccordionItem>
        </Accordion>
        </>
    );
}