// BASIC SET UP
//1.. require all thing

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");

const MONGO_URL ="mongodb://127.0.0.1:27017/traveller";

const Listing=require("./models/listing.js");



// 5...connectded db or find error

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

// 4..database connection 

async function main() {
    await mongoose.connect(MONGO_URL)
    
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


// 3...send response will desplay on screen

app.get("/",(req,res)=>{
    res.send("hi i am root");
});



// index route
app.get("/listings",async(req,res)=>{
  const allListings= await Listing.find({});
  res.render("Listings/index.ejs",{allListings});
});

// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
});


// show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// create route
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})


// edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

// update route
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
})


// delete route
app.delete("/listings/:id",async (req,res)=>{
     let {id} = req.params;
     let deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     res.redirect("/listings");
});





// app.get("/testListing",async(req,res)=>{
//      let sampleListing = new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//      })

// await sampleListing.save();
// console.log("sample was saved");
// res.send("successful testing");

// });

// 2...listen to port 

   app.listen(8080,()=>{
    console.log("listening port");
});