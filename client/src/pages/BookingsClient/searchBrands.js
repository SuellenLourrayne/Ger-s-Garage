import React from "react";

export default function SearchBrands(props) {
const searchBrands = (props) => {
const {lists, list} = props;

if(list.length > 0) {
    return (
        list.map(Brands => {
        console.log(Brands);
        return (
                <option key={Brands.idBrand} id={Brands.idBrand} >
                    {Brands.description}
                </option>
        )
        })
    )
}
else {
}
}
return (
    
    searchBrands(props)
                
)
}
