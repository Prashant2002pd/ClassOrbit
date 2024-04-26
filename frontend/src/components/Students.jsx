import { useEffect,useState } from "react"
import axios from 'axios'
import {
    useNavigate
  } from "react-router-dom";

export function Students(){
    const navigate = useNavigate();
const  [students, setStudents] = useState([])
    useEffect( () => {
        axios.get('https://class-orbit-frontend.vercel.app/').then((res)=>{
              
                if(res.status==200){
                   setStudents(res.data)
                }
            })
    },[])

    return (
            students.map((student,key)=>{
                return(
                    <div className=" border-2 border-black rounded-md m-2 p-2" key={key} onClick={()=>{
                        
                        navigate("/Profile",{state: student})
                    }}>{student.name}  - {student.gender} - {student.age}</div>
                )
            })
            )
        }
    