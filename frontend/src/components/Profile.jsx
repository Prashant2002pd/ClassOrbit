
import React from 'react'
import { PiSignpostFill } from "react-icons/pi"
import { RiAddCircleFill, RiArrowDropLeftLine, RiStoreFill, RiBarChartFill, RiUser2Fill } from "react-icons/ri";
import { Button } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import {
    useLocation,
    useNavigate
  } from "react-router-dom";

  import axios from 'axios'


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";



export function Profile(){
    const student = useLocation().state;
    
    return(
        <>
        <div className=" grid grid-flow-col min-h-screen place-content-center ">
            <MainContent  student={student}/>
            
        </div>
    </>
    )
}


function MainContent({student}) {
    
    const [activeTab, setActiveTab] = React.useState("dashboard");
    const data = [
        {
            label: "Attendance",
            value: "dashboard",
            icon: <RiBarChartFill/>,
            desc: <Attendance Attendance={student.attendence}/>,
        },
        {
            label: "Fees",
            value: "profile",
            icon: <PiSignpostFill/>,
            desc: <Fees student={student}/>,
        },
        
    ];
    return (
        <div>
            <div className='grid gap-4 grid-flow-col bg-white p-6 border-2 rounded-xl'>
                <div className=''>
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" size='xxl' alt="avatar" className='border-4 border-base-primary ' />
                </div>
                <div className='grid gap-2'>
                   <div className='grid gap-2 pb-10'>
                   <h1 className='font-semibold text-2xl'>{student.name}</h1>
                    <h2 className='font-semibold text-md'>age: {student.age}</h2>
                    <h2 className='font-semibold text-md'>gender: {student.gender}</h2>
                    <h2 className='font-semibold text-md'>Address: {student.address}</h2>


                   </div>
                   
                    <div className='flex gap-4 py-4'>
            <button className='bg-base-secondary border-2 border-base-accent hover:bg-base-accent hover:text-gray-5 rounded-full py-2 px-6 place-items-center text-gray-10 text-md flex gap-4'><RiUser2Fill className='text-2xl'/> Connect</button>
                    
                        
                    </div>
                </div>
            </div>
            <div className=''>
                <div className=' text-center'>
                    <Tabs value={activeTab}>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 px-64"
                            indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                            }}
                        >
                            {data.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    className={activeTab === value ? "text-gray-900" : ""}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {data.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    {desc}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>



            </div>
        </div>
    )


}
function Attendance({ Attendance }) {
   
    return (
            Attendance.map((data,key)=>{
                return(
                    <div key={key} className=' border-2 border-black m-2 p-2 rounded-md'>
                        {data.date} {data.isPresent ? 'Present' : 'Absent'}
                    </div>
                )
            })
        
    )
}
function Fees({ student }) {
    let navigate=useNavigate();
    
    const date = new Date();
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    return(
        <div>
            {
                student.fees.length!=0 ? student.fees[0].month===monthName ? "" : FeesMonth({monthName, student}) : FeesMonth({monthName, student})
            }
            {
                student.fees.map((data,key)=>{
                    return(
                        <div key={key} className=' border-2 border-black m-2 p-2 rounded-md'>
                           {data.month} {data.paid ?  "Yes" : "No"}
                        </div>
                    )
                })
            }
        </div>
    )

    function FeesMonth({monthName, student}){
        return(
            <div className=' border-2 border-black m-2 p-2 rounded-md'>
                {monthName}
                <button onClick={()=>{handilClick(student._id)}} className='m-2 p-1 bg-blue-500 border-2 border-black rounded-md'>paid</button>
            </div>
        )
    }

    function handilClick(_id){
    
        axios.post('https://class-orbit-frontend.vercel.app/Fees',{id:_id,month:monthName,paid:true}).
        then(()=>{
            navigate('/Students')
        })
    }
}











