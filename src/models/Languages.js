import mongoose from "mongoose";

const languageSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    bio:{type:String,required:true},
    logo:{type:String,required:true}
})
export default mongoose.model("Language",languageSchema);