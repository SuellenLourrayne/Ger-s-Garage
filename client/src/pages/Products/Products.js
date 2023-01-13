import React, {useEffect,useState} from "react";
import Axios from 'axios';
import './Products.css';
import DisplayProducts from './DisplayProducts';

function Products () {
    const [list, setList] = useState('');

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        Axios.get('http://localhost:3002/api/Products', { }).then((response) => {
            const fullData = response.data;
            setList(fullData);
            if(response.data.message)
                console.log(response.data.message);
        })
        .catch(error => console.error(`Error: ${error}`));
    };
    
    return (

        <DisplayProducts list={list} />
        
    );
  }

  export default Products;

