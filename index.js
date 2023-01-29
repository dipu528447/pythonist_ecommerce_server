const express= require('express');
const cors=require('cors');
const app=express();
require('dotenv').config()
// const jwt=require('jsonwebtoken');
const port=process.env.PORT || 5000;
app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.npxgfi0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const products = client.db("pythonist-ecommerce").collection("products");
    const orders = client.db("pythonist-ecommerce").collection("orders");
    app.get('/',async(req,res)=>{
      res.send('hello world')
    })
    app.get('/products',async (req,res)=>{
      
      const cursor=products.find({});
      const result=await cursor.toArray();
      // console.log(result);
      res.send(result)
    })
    app.post('/addOrder', async (req, res) => {
      const newProduct = req.body;
      // console.log(newProduct)
      const result = await orders.insertOne(newProduct);
      res.send(result);
    });
    app.delete('/removeToCart/:id', async(req,res)=>{
      const id=req.params.id;
      console.log(id)
      const filter={productId:id}
      const result=await orders.deleteOne(filter);
      res.send(result)
    })
  }
  catch(error){
    console.log(error)
  }
}
run().catch(err=>console.log(err))
app.listen(port,()=>{
  console.log('server is running')
})

