const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://16112022:dsnRLkIBekv0L88r@cluster0.5dw8ra3.mongodb.net/chamanDb";
const client = new MongoClient(url);


const dbName = "chamanDb";

async function getData() {
    return new Promise(async (resolve,reject)=>{
        try {
            await client.connect();
            console.log("Connected correctly to server");
            const db = client.db(dbName);
            const col = db.collection("Class");
            const myDoc=await col.find({}).toArray();
            resolve(myDoc);
           } catch (err) {
            console.log(err.stack);
            reject(err);
        }
    
        finally {
           await client.close();
       }
    })
 }

async function removeData(eleId){    

        return new Promise(async (resolve,reject)=>{
            try {
                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(dbName);
                const col = db.collection("Class");
                console.log(eleId)
                const delData=await col.deleteOne({personId:parseInt(eleId) })
                console.log(delData)
                resolve(true)
            } catch (err) {
                reject(false)
                console.log(err.stack);
              
            }
    
            finally {
            await client.close();
        }
        })
   
 }
async function addData(PersonObj) {
    return new Promise(async (resolve,reject)=>{
        try {
            await client.connect();
            console.log("Connected correctly to server");
            const db = client.db(dbName);
            const col = db.collection("Class");
            console.log(PersonObj);
   
            const date=new Date();
            const personData={
               
               name:{
                   firstName:PersonObj.fName,
                   lastName:PersonObj.lName
               },
               personId:date.getTime(),
               DateOfBirth:PersonObj.dob,
               rollNo:PersonObj.rno,
               FathName:PersonObj.FathName
            }
   
            const addData=await col.insertOne(personData);
            resolve(true)
           } catch (err) {
            reject(false);
            console.log(err.stack);
        }
     
        finally {
           await client.close();
       }
    })
  }


module.exports={getData,addData,removeData};

