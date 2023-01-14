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


export default function DisplayStaff(props) {
const displayStaff = (props) => {
const {lists, list} = props;

if(list.length > 0) {
    return (
        list.map(Staff => {
        console.log(Staff);
        return (
                <option key={Staff.idUser} id={Staff.idUser} >
                    {Staff.name}
                </option>
        )
        })
    )
}
else {
}
}
return (
    
    displayStaff(props)
                
)
}
