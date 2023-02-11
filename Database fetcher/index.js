const {getData,addData,removeData,updateData,getDataId}=require('./mongo')
var express = require('express');
var app = express();
const port=8080;
// // set the view engine to ejs
app.set('view engine', 'ejs');

const bodyParser=require('body-parser')

const EncParser=bodyParser.urlencoded({extended:false});
// // use res.render to load up an ejs view file

//logics





// // index page
app.get('/', function(req, res) {
  // run().catch(console.dir);
  res.render('pages/index');
});

// // about page
app.get('/studentDetails', function(req, res) {
  res.render('pages/about');
});


app.get('/PersonList',async (req,res)=>{
  const data=await getData().catch(console.dir);
  console.log(data);
  if(data.length==0)
  {
    res.render('pages/search',{flag:false,dataList:data});
  }
  else{
     res.render('pages/search',{flag:true,dataList:data});
  }
  
})

app.get('/deleteCard/:id',async(req,res)=>{
  let s=req.params;
  console.log(s);
  const response=await removeData(s.id);
  setTimeout(()=>{
    res.redirect('/PersonList')
  },500)
})
app.post('/AddPerson',EncParser,async (req,res)=>{

    const data=req.body;
    const response=await addData(data);
    setTimeout(()=>{
      res.redirect('/studentDetails')
    },1000)
    
})

app.get('/editCard/:id',async (req,res)=>{
  const dataId=req.params.id;
  // console.log(dataId)
  const data=await getDataId(dataId);
  console.log(data);
  res.render('pages/EditCard',{userFormData:data[0]});
  // res.end();
})

app.post('/EditPerson/:id',EncParser,async (req,res)=>{
  const dataId=req.params.id;
  const dataBody=req.body;
  await updateData(dataId,dataBody);
  // console.log(data);
  res.redirect('/PersonList')
})
app.listen(port,()=>{
    console.log(`listning to ${port}`)
    console.log(`http://localhost:${port}/`)
});