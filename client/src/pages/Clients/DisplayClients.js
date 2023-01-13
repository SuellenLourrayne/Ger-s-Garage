import React, { useState } from "react";
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


export default function DisplayClients(props) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modalNew, setModalNew] = useState(false);
    const toggleNew = () => setModalNew(!modalNew);

    const displayClients = (props) => {
    const {lists, list} = props;

    if(list.length > 0) {
        return (
            list.map((clients,index) => {
                console.log(clients);
                return (

        <ListGroup key={clients.idUser}>
                        <ListGroupItem>
                        <div className="d-flex justify-content-between d-flex align-items-center">
                            <div className="p-2">{clients.name}</div>
                            <div className="p-2">{clients.email}</div>
                            <div className="p-2">{clients.phone}</div>
                            <div className="p-2"><Button color="primary" onClick={toggle}>Edit</Button></div>
                        </div>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Edit</ModalHeader>
                            <ModalBody>
                            <Form>
                            <FormGroup>
                                <Label for="name">
                                Client Name
                                </Label>
                                <Input
                                id="name"
                                name="name"
                                type="textArea"
                                placeholder=""
                                defaultValue={clients.name}
                                />
                                </FormGroup>
                            <FormGroup>
                                <Label for="email">
                                Email
                                </Label>
                                <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder=""
                                defaultValue={clients.email}
                                />
                                </FormGroup>
                            <FormGroup>
                                <Label for="phone">
                                Phone Number
                                </Label>
                                <Input
                                id="phone"
                                name="phone"
                                type="textArea"
                                placeholder=""
                                defaultValue={clients.phone}
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
                
                )
            })
        )
    }
    else {
        <Router>
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />

            <div className='dashboard-body'>
            <div className='Clients-content'>
                <div className='Clients-content-container'>
                    <div className='Clients-content-header'>
                        <h2>Client</h2>
                    </div>
                </div>
                <div className='Clients-content-container'>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            No clients registered.
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
          <div className='Clients-content'>
              <div className='Clients-content-container'>
                  <div className='Clients-content-header'>
                          <h2>Client</h2>
                  </div>
              </div>
              <div className='Clients-content-container'>
                  <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                          Client List
                      </div>
                      <Button color="success" onClick={toggleNew}>New Client</Button>
                      <Modal isOpen={modalNew} toggle={toggleNew}>
                          <ModalHeader toggle={toggleNew}>New Client</ModalHeader>
                          <ModalBody>
                          <Form>
                          <FormGroup>
                              <Label for="name">
                              Client Name
                              </Label>
                              <Input
                              id="name"
                              name="name"
                              type="textArea"
                              />
                              </FormGroup>
                          <FormGroup>
                              <Label for="email">
                              Email
                              </Label>
                              <Input
                              id="email"
                              name="email"
                              type="email"
                              />
                              </FormGroup>
                          <FormGroup>
                              <Label for="phone">
                              Phone Number
                              </Label>
                              <Input
                              id="phone"
                              name="phone"
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
    {displayClients(props)}
    </div>
            </div>
          </div>
      </div>
      </div>
    </Router>
)
}