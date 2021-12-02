import {Link} from 'react-router-dom';
import React from 'react';
import ListItem from "./ListItem";
import { useEffect } from 'react';



const ComplaintList = ({actor,  list}) => {

    
    useEffect(() => {
        console.log(list);
    }, [list])
    return (
        <>
                {
                    list.complaints?.map((complaint)=>{
                        return (
                            <div className="container">
                                <div className="row flex-box">
                                    <Link className="col-8" to={`/home/complaint?id=${complaint['complaint ID: ']}`} className="text-decoration-none">
                                        <ListItem className="col-8" key={complaint['complaint ID: ']} complaint={complaint} />
                                    </Link>
                                </div>
                            </div>

                        )
                    })
                }
        </>
    )
}


export default ComplaintList;