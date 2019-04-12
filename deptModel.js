var mongoose  = require("mongoose");

mongoose.connect('mongodb://localhost:27017/testDb', {useNewUrlParser:true}, function(err)
{
    console.log("Mongoose connected to database.");
});

//Define a schema
var Schema = mongoose.Schema;

var DeptModelSchema = new Schema(
    {       
        deptno: Number, 
        dname : String, 	
        loc  : String
    }, 
    { versionKey: false  } );

   
var DeptModel = mongoose.model('depts', DeptModelSchema );
module.exports = DeptModel; 

