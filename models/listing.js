const mongoose= require("mongoose");
const Schema= mongoose.Schema;

// make listing schema model

const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-pink-drink-in-a-wine-glass-on-a-table-8l45X115t9E",
        set:(v)=>v==="" ? "https://unsplash.com/photos/a-pink-drink-in-a-wine-glass-on-a-table-8l45X115t9E":v,
    },
    price:Number,
    location:String,
    country:String,

});
// make a model

const Listing=mongoose.model("Listing",listingSchema);
module.exports= Listing;
