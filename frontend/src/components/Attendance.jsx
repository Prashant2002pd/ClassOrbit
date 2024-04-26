import { useEffect,useState } from "react"
import axios from 'axios'
import { Switch, button } from "@material-tailwind/react";

export function Attendance(){
const  [students, setStudents] = useState([])
    useEffect( () => {
        axios.get('https://class-orbit.vercel.app/').then((res)=>{
                
                if(res.status==200){
                   setStudents(res.data)
                }
            })
    },[])

  
    return (
      
       students.map((student,key)=>{
          return(
              <div className=" border-2 border-black rounded-md m-2 p-2" key={key}>{student.name}  - {student.gender} - {student.age}
              <Switch defaultChecked onChange={(e)=>{sendAttendance(student._id,e.target.checked)}}/>

              </div>
          )
      })
     
      
      )

  
      

}


const sendAttendance = async (studentId, status) => {
    try {
        await axios.post('https://class-orbit.vercel.app/attnedance', {
            studentId: studentId,
            isPresent: status
        }).then((data)=>{
           
        })
    } catch (error) {
        console.error(`Error sending data for student ID ${studentId}:`, error);
    }
}



        
    