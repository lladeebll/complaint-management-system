import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



const SearchComponent = (props) => {

    return (
        <InputGroup className="w-100 mr-0">
        <InputGroup.Text className="bg-dark text-white">
                <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl placeholder="Search complaint ..." onChange={props.nameChange} />  
        </InputGroup>    
         
     );   
}


export default SearchComponent;