import { useState } from "react"
import axios from 'axios'


export function AddStudent(){
    const  [name, setName] = useState("")
    const  [age, setAge] = useState("")
    const  [address, setAddress] = useState("")
    const  [gender, setGender] = useState("")


    return(
        <div className=" flex place-content-center h-full w-full">
            <div className=" border-2 border-black rounded-md place-content-center grid grid-flow-row m-7 p-7">
            <h1>Add Student</h1>
            <input className="m-2 p-2 border-2 border-black rounded-md" type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
            <input className="m-2 p-2 border-2 border-black rounded-md" type="number"  placeholder="age" onChange={(e)=>{setAge(e.target.value)}}/>
            <input className="m-2 p-2 border-2 border-black rounded-md" type="text" placeholder="address" onChange={(e)=>{setAddress(e.target.value)}}/>
            <div className="m-2 p-2 border-2 border-black rounded-md">
            <label htmlFor="gender" >Gender:</label>
                <select name="gender" onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="">Please select one…</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    
                </select>
            </div>
            <button className="m-1 p-1 border-2 border-black rounded-md bg-blue-400" onClick={()=>{
                let data={
                    name : name ,
                    address:address,
                    age:age,
                    gender:gender
                    
                }
                axios.post('https://class-orbit.vercel.app/student',data)
                .then((res)=>{
                    if(res.status==201){
                        alert("Successfully added!")
                    }else{
                        alert("error in adding new student")
                    }
                })
            }}>Submit</button>

        </div>
        </div>
    )
}