const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/middleware");
const { body, validationResult } = require("express-validator");
const firebase = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  DocumentReference,
} = require("firebase-admin/firestore");


const db = getFirestore();
router.get(
  "/getalldata",
  

  async (req, res) => {
    try{
      const citiesRef = db.collection("Events");
      const snapshot = await citiesRef.get();
      const data= snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
      res.json(data)
      // res.json(alldata)

    }catch(err){
      console.log(err.message)

    }
    
  }
);

router.post("/addEvent", 
// fetchuser, 
async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const Events = db.collection("Events");
    await Events.add({
      title: title,
      description: description,
      image: image,
    });
    
    res.status(200).send({ msg: "sucessfully sent " });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.put('/updateEvent/:id',fetchuser,async(req,res)=>{
    try{
      const Events = db.collection("Events");
      const { title, description, image } = req.body;
      const Card={}
      if(title){Card.title=title}
      if(description){Card.description=description}
      if(image){Card.image=image}
  
      await Events.doc(req.params.id).update(Card)
      res.send({msg:"done"})
    }catch(e){
      res.status(500).send({ error: e.message });
    }
  })

  router.delete('/deleteEvents/:id',async(req,res)=>{
    try{
      const Cards = db.collection("Events");
      
  
     const cardcheck= await  Cards.doc(req.params.id).delete();
     if(!cardcheck){
      return res.status(404).send("not found")
     }
    //  if(cardcheck.user.toString() !==req.user.id){
    //   return res.status(401).send("seriously??trying to hack me ")
    //  }
      res.send({msg:"done"})
    }catch(e){
      res.status(500).send({ error: e.message });
    }
  })


  module.exports=router