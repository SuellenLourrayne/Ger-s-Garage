import React from "react";

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
