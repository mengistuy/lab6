const express=require('express');
const morgan=require('morgan')
const Joi=require('joi')
const app=express();


//middleware
//app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(express.json())

const grades=[
                {id:1,name:"Asaad",course:"cs572",grade:95},
                {id:2,name:"aaaa",course:"cs572",grade:99},
                {id:3,name:"bbbb",course:"cs572",grade:93}
            ];

app.get('/api/grades',(req,res)=>{
    res.send(grades);
});

app.post('/api/grades',(req,res)=>{
    validate(req,res)
    const grade={
            id:grades.length+1,
            name:req.body.name,
            course:req.body.course,
            grade:req.body.grade
    };
    grades.push(grade);
    res.send(grades);
});
app.put('/api/grade/:id',(req,res)=>{
    validate(req,res)
    const grade={
            name:req.body.name,
            course:req.body.course,
            grade:req.body.grade
    };
    //grades.push(grade);
    const found=grades.find(g=>g.id===parseInt(req.params.id))
        if(found)
             res.send(grade);
        else
             res.status(404).send("Not found")
});

app.delete('/api/grade/:id',(req,res)=>{
    validate(req,res)
    const grade={
            name:req.body.name,
            course:req.body.course,
            grade:req.body.grade
    };
   
    const index=grades.indexOf(grade);
    if(index)
    {
        res.send(grade);
    }
         
    else
         res.status(404).send("Not found")
});


app.listen(8080);

function validate(req,res)
{
    const schema=Joi.object().keys({
        name:Joi.string().min(1).required(),
        course:Joi.string().min(1).required(),
        grade:Joi.number().min(0).max(100).required()
    });

    const result=Joi.validate(req.body,schema);
    if(result.error)
        return console.log(res.status(400).send(result.error.details[0].message));
}

// const grade={
//     "id":grades.length+1,
//     "name":req.body.name,
//     "course":req.body.course,
//     "grade":req.body.grade
// };