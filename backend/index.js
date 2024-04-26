const express=require('express');
const {Students}=require('./DB')
const cors =require('cors')
const app=express();
app.use(cors())
app.use(express.json())
app.get(('/'), (req,res)=>{
    Students.find()
        .then((data) =>{
            res.json(data);
        })
        .catch((err)=>console.log(err))
})
//add a student  
app.post('/student',(req,res)=>{
    let student = {
        name: req.body.name,
        age: req.body.age,
        gender : req.body.gender,
        address: req.body.address
    }
    Students.create(student)
     .then(()=>{
         res.status(201).json(student);
     }).catch((error)=>{
         res.status(400).send("Unable to add the information");
     })
});

//update  
app.put("/students/:id",(req,res)=>{
    Students.findByIdAndUpdate(req.params.id ,{$set:req.body} )
    .then(()=>{
        res.status(200).send("Data is updated")
    }).catch((error)=>{
        res.status(404).send("The data with given ID was not found.")
    })
})

//delete  
app.delete('/students/:id',(req,res)=>{
    Students.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.status(200).send('Student has been deleted')
    }).catch((error)=>{
        res.status(404).send("ID could not be found.");
    })
})

app.post('/attnedance',async (req,res)=>{
    const date=new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      
    const student = await Students.findOne({
        _id: req.body.studentId, 
        'attendence.date': formattedDate 
    }, {
        'attendence.$': 1 // This will return only the matching attendance entry
    })

    if(student){
        Students.updateOne(
            {
                _id: req.body.studentId, // Assuming you use _id as the student identifier
                'attendence.date': formattedDate // Find the attendance entry by date
            },
            {
                $set: {
                    'attendence.$.isPresent': req.body.isPresent // Update the status
                }
            }
        ).then(()=>{
        res.send("Already attended today");

        })
    }else{
        Students.updateOne({_id:req.body.studentId},{$push:{attendence:{date:formattedDate,isPresnt:req.body.isPresent}}})
        .then((data)=>{res.send(data)})
    }
    
    
})

app.post('/Fees',(req,res)=>{
    Students.findByIdAndUpdate({_id:req.body.id},{$push:{fees:{$each:[{month:req.body.month,paid:req.body.paid}],$position:0}}})
    .then(()=>{
        res.send("Fee added")
    })
})


app.listen(3001,()=>{console.log("Server is running on 3001")})