
import { useNavigate } from 'react-router-dom';
export function Home(){
    const navigate = useNavigate();
    return(
      <div className=" grid grid-flow-col place-content-center  h-28">
        <div className=" border-2 border-black rounded-md bg-slate-400 place-content-center m-2 p-2" onClick={()=>{
                    navigate("/Students")
            
        }}>Students</div>
        <div className=" border-2 border-black rounded-md bg-slate-400 place-content-center m-2 p-2" onClick={()=>{
          navigate("/AddStudent")
        }}>Add New Student</div>
        <div className=" border-2 border-black rounded-md bg-slate-400 place-content-center m-2 p-2" onClick={()=>{
          navigate("/Attendance")
        }}>Atendence</div>
      </div>
    )
  }