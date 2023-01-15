import React, { useState, useEffect } from "react";
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
  import SearchBrands from "./searchBrands";

  export default function SearchVehicles(props) {
    const [list2, setList2] = useState('');

    //set active element
    const [activeElement, setActiveElement] = useState(-1);
    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1);
    }

    //get user info
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [idUserLogged, setIdUserLogged] = useState(params.get("u"));

    //constants to create or update users
    const [idVehicleDetail, setIdVehicleDetail] = useState("");
    const [idType, setIdType] = useState("");
    const [idEngineType, setIdEngineType] = useState("");
    const [idBrand, setIdBrand] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [license, setLicense] = useState("");

    //clean constants 
    function clean (){
        setIdType("");
        setIdEngineType("");
        setIdBrand("");
        setVehicleName("");
        setLicense("");
    }
    
    const [open, setOpen] = useState('0');

    const toggle = (id) => {
        if (open === id) {
        setOpen();
        } else {
        setOpen(id);
        }
    }

    useEffect(() => {
        getBrands();
    }, [activeElement]);    

    //update user function
    const handleSubmitUpdate = (event) => {
        Axios.post('http://localhost:3002/api/UpdateVehicle', {
            idVehicleDetail: idVehicleDetail,
            idType: idType,
            idEngineType: idEngineType,
            idBrand: idBrand,
            vehicleName: vehicleName,
            license: license,
    }).then(alert("Vehicle updated."),updateActiveElement(-1));

    clean();
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

    const searchVehicles = (props) => {
        const {lists, list} = props;
        let count = 0;

        if(list.length > 0) {
            return (
            list.map(vehicle => {
                console.log(vehicle);
                count++;
                return (
                    <Accordion open={open} toggle={toggle} key={vehicle.idVehicleDetail}>
            <AccordionItem>
            <AccordionHeader targetId={vehicle.idVehicleDetail}>
                    <div className="vehicle-info d-flex justify-content-between">
                        <div className="p-2">
                            <Input id="count" name="count" type="text" disabled={true} defaultValue={"Vehicle "+count}></Input>
                        </div>
                    </div>
                </AccordionHeader>
            <AccordionBody accordionId={vehicle.idVehicleDetail}>
                    <Row md="2">
                    <Col>
                    <FormGroup>
                        <Label>
                        Vehicle Name:
                        </Label>
                        <Input
                        id={vehicle.idVehicleDetail}
                        name="vehicleName"
                        type="textArea"
                        disabled={!(vehicle.idVehicleDetail === activeElement)}  
                        defaultValue={vehicle.name}
                        onChange={(e)=> { setVehicleName(e.target.value); setIdVehicleDetail(e.target.id) }}
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
                        id={vehicle.idVehicleDetail}
                        name="vehicleType"
                        type="select"
                        disabled={!(vehicle.idVehicleDetail === activeElement)}  
                        defaultValue={vehicle.type}
                        onChange={(e)=> { onChangeHandlerVehicleType(e); setIdVehicleDetail(e.target.id) }}
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
                    </Col>
                    </Row>
                    <Row md="3">

                    <Col>
                    <FormGroup>
                        <Label>
                        Brand:
                        </Label>
                        <Input
                        id={vehicle.idVehicleDetail}
                        name="brand"
                        type="select"
                        disabled={!(vehicle.idVehicleDetail === activeElement)}  
                        defaultValue={vehicle.brand}
                        onChange={(e)=> { onChangeHandlerBrand(e); setIdVehicleDetail(e.target.id) }}
                        >
                        <SearchBrands list={list2} /> 
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label>
                        Licence:
                        </Label>
                        <Input
                        id={vehicle.idVehicleDetail}
                        name="licence"
                        type="textArea"
                        disabled={!(vehicle.idVehicleDetail === activeElement)}  
                        defaultValue={vehicle.license}
                        onChange={(e)=> { setLicense(e.target.value); setIdVehicleDetail(e.target.id) }}
                        >
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label style={{width: "100%"}}>
                        Engine Type:
                        </Label>
                        <Input
                        id={vehicle.idVehicleDetail}
                        name="engineType"
                        type="select"
                        disabled={!(vehicle.idVehicleDetail === activeElement)}  
                        defaultValue={vehicle.engine}
                        onChange={(e)=> { onChangeHandlerEngineType(e); setIdVehicleDetail(e.target.id) }}
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
                    </Col>
                    </Row>
                    <div>
                        {!(vehicle.idVehicleDetail === activeElement)?  (
                            <Button color="info" onClick={()=> updateActiveElement(vehicle.idVehicleDetail)} >Edit</Button>
                        ) : 
                        (
                        <div className="d-flex justify-content-between">
                        <Button color="success" onClick={handleSubmitUpdate} >Save</Button>
                        <Button color="danger" onClick={()=> updateActiveElement(-1)} >Delete</Button>
                        </div>
                        )}
                        
                    </div>

                    
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
                                No vehicle registered.
                            </div>
                        </div>

    </Router>
    }
}
return (
<Router>

        {searchVehicles(props)}

</Router>
)
}
