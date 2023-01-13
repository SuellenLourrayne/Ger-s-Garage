import React, {useState} from "react"
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

export default function Vehicle() {
    const [open, setOpen] = useState('0');
    const [modal, setModal] = useState(false);
    const [editButton, setEditButton] = useState(true);

    const toggleModal = () => setModal(!modal);

    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }

    return(
        <>
        <div className="d-flex justify-content-end" style={{marginBottom: "15px"}}>
            <Button color="success" onClick={toggleModal}>New Vehicle</Button>
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
                    <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>Edit</ModalHeader>
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
                        
                        >
                            <option>
                            Vehicle Type
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
                        
                        >
                            <option>
                            Brand
                            </option>
                        </Input>
                    </FormGroup>
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
                    <FormGroup>
                        <Label style={{width: "100%"}}>
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
                            </Form>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="success" onClick={toggleModal}>
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