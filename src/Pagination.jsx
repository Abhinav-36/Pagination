import { useEffect, useState } from "react";
import styles from "./Pagination.module.css"
import axios from "axios";

import PageButtons from "./Pagebuttons";

// id: "1",
// name: "Aaron Miles",
// email: "aaron@mailinator.com",
// role: "member"

const maxRecords = 10;

export default function Pagination(){
    const [data,setData] = useState([]);
    const [currentData,setCurrentData] = useState([]);
    const [totalpages,setTotalPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);


    useEffect( ()=>{
        async function fetchData(){
            let url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
            try {
                let res = await axios.get(url);
                if(res.status === 200){
                    // console.log(res.data);
                    setData(res.data)
                }
            } catch (error) {
                alert("failed to fetch data");
            }

        }
        fetchData();
    },[])

    

    useEffect(()=>{
        let startIdx  = (currentPage - 1) * maxRecords;
        let endIdx  = Math.min(currentPage*maxRecords,data.length);

        setCurrentData([...data].slice(startIdx,endIdx));
        setTotalPages(Math.ceil(data.length/maxRecords));
    },[currentPage,data])

    return(
        <div className={styles.container}>
            <h1 className={styles.heading}>Employee Data Table</h1>
            <table className={styles.table}>
                <thead className={styles.tableHeading}>
                    <tr >
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}> 
                    {
                        currentData.map((item)=>(
                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        ))
                    }
                </tbody>
                
            </table>
            <PageButtons totalpages={totalpages} updatePage={setCurrentPage} currentPage={currentPage}/>
        </div>
    );
}