import React from "react";

export default function SearchVehiclesRegistered(props) {
const searchVehiclesRegistered = (props) => {
const {lists, list} = props;

if(list.length > 0) {
    return (
        list.map(VehiclesRegistered => {
        console.log(VehiclesRegistered);
        return (
                <option key={VehiclesRegistered.idVehicleDetail} id={VehiclesRegistered.idVehicleDetail} >
                    {VehiclesRegistered.name}
                </option>
        )
        })
    )
}
else {
}
}
return (
    
    searchVehiclesRegistered(props)
                
)
}
