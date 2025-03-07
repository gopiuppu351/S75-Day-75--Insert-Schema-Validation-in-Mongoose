const mongoose = require("mongoose");
const { type } = require("os");

let connectToMDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://gopiuppu:Gopiu@batch2411cluster.xa8nb.mongodb.net/MERN2411?retryWrites=true&w=majority&appName=Batch2411Cluster");
        console.log("Successfully connected to MDB");
        insertDataIntoDB();
    }catch(err){
        console.log("Unable to connect to MDB");
    }; 
};

let studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Z][a-zA-Z ]{1,29}$/.test(v);
          },
          message: props => `${props.value} is not a valid firstName!`
        },
        required: [true, 'User firstName required']
      },
      lastName: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Z][a-zA-Z ]{1,29}$/.test(v);
          },
          message: props => `${props.value} is not a valid lastName!`
        },
        required: [true, 'User lastName required']
      },
    age:{
        type: Number,
        required: [true, "Age is mandatory"],
        min:[18, "Too early to create account"],
        max:[80, "Too late to create account"]
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'email is  mandatory.']
      },
    gender:{
        type: String,
        lowercase: true,
        enum: ["male" , "female"],
    },
    batchCode:String,
});

let Student = new mongoose.model("student",studentSchema,"students");

let insertDataIntoDB = async()=>{

    try{
        let gopi = new Student({
            firstName:"Gopi",
            lastName:"Uppu",
            age:"29",
            email:"gopi@gmail.com",
            gender:"male",
            batchCode:"mern2411",
        });
        //await gopi.save();
        let krishnaSri = new Student({
            firstName:"Krishna Sri",
            lastName:"Kopuri",
            age:"22",
            email:"krishnasri@gmail.com",
            gender:"female",
            batchCode:"mern2411",
        })
        //await krishnaSri.save();
        let rama = new Student({
            firstName:"Rama",
            lastName:"Akula",
            age:"28",
            email:"ramaakula@gmail.com",
            gender:"FEMALE",
            batchCode:"mern2411",
        })
        //await rama.save();

        Student.insertMany([gopi, krishnaSri, rama])
        
        console.log("Inserted data into db Successfully")
    }catch(err){
        console.log("Unable to insert data into db")
        console.log(err)
    }

    

}



connectToMDB();