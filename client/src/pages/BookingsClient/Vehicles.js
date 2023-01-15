import React, {useState , useEffect} from "react"
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    ModalFooter,
    } from "reactstrap"
import SearchBrands from "./searchBrands";
import SearchVehicles from "./searchVehicles";

export default function Vehicle() {
    const [modal, setModal] = useState(false);
    const [list2, setList2] = useState('');
    const [list3, setList3] = useState('');

    const toggleModal = () => setModal(!modal);

    //get user info
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [idUserLogged, setIdUserLogged] = useState(params.get("u"));

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
            idUser: idUserLogged,
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

    const getVehicles = () => {
        Axios.post('http://localhost:3002/api/Vehicles', { idUser: idUserLogged }).then((response) => {
            if(response.data.message)
                console.log(response.data.message);
            else {
                const fullData = response.data;
                setList3(fullData);
            }
        })
        .catch(error => console.error(`Error: ${error}`));
    };

    useEffect(() => {
        getBrands();
        getVehicles();
    }, []);    

    function onChangeHandlerEngineType (e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id'); 
        setIdEngineType(option); 
    }

    function onChangeHandlerBrand (e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id'); 
        setIdBrand(option); 
    }

    function onChangeHandlerVehicleType (e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id'); 
        setIdType(option); 
    }

    return(
        <>
        <div className="d-flex justify-content-end" style={{marginBottom: "15px"}}>
            <Button color="success" onClick={handleShow}>New Vehicle</Button>
        </div>

        <SearchVehicles list={list3} />
        
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
                        id="idVehicleType"
                        name="idVehicleType"
                        type="select"
                        onChange={(e)=> { onChangeHandlerVehicleType(e) }}
                        >
                            <option>
                            Choose an option
                            </option>
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
                        onChange={(e)=> { onChangeHandlerBrand(e) }}
                        >
                        <option>
                        Choose an option
                        </option>
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
                        onChange={(e)=> { onChangeHandlerEngineType(e) }}
                        > 
                        <option>
                        Choose an option
                        </option>
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
        </>
    );
}