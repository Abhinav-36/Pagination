import styles from "./Pagination.module.css"

export default function PageButtons({currentPage,updatePage,totalpages}){

    const handleprev = ()=>{
        if(currentPage > 1){
            updatePage(prev => prev-1)
        }
        
    }

    const handlenext = ()=>{
        if(totalpages !== currentPage){
            updatePage(prev => prev+1)
        }
    }

    return(
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems: "center",
            margin: "20px",
            gap: "10px",
            height:"50px"
        }}>
            <button type="button" onClick={handleprev} >Previous</button>
            <div className={styles.pageno} >{currentPage}</div>
            <button type="button" onClick={handlenext}>Next</button>
        </div>
    )
}