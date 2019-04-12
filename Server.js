// Express application to perform CRUD operations with MongoDb
var  express  =  require("express");
var  DeptModel  =  require("./models/deptModel");
var bodyParser = require("body-parser");

var  app  = express();
app.use(bodyParser.urlencoded({extended : false}));
 

app.get("/",  function(req, res)
{	     
    DeptModel.find(function(err,result)
    {  
        var data  = {};
        data.depts = result;    
        res.render( "depts.ejs" , data);
    });     
});


app.get("/create",  function(req, res)
{	     
    res.render( "create.ejs" , null);
});

app.post("/create",  function(req, res)
{	     
    var modelObj = new  DeptModel();
	modelObj.deptno  = parseInt(req.body.t1);
	modelObj.dname  = req.body.t2;
	modelObj.loc  = req.body.t3;

    modelObj.save( function(err)
    {
        console.log("New Dept is added to database");
        res.redirect("/");
    });	 
});



app.get("/edit/:id",  function(req, res)
{	     
    var  dno  = parseInt(  req.params.id );
    DeptModel.findOne({deptno:dno}, function(err, result)
    {  
        var data  = {};
        data.deptObj = result;    
        res.render( "edit.ejs" , data);
    });  
    
});

app.post("/edit",  function(req, res)
{	     
    var obj = {};
	obj.deptno  = parseInt(req.body.t1);
	obj.dname  = req.body.t2;
	obj.loc  = req.body.t3;

    DeptModel.findOneAndUpdate({deptno:obj.deptno}, obj, function(err)
    {
        console.log("Dept is updated to database");
        res.redirect("/");
    });		 
});

app.get("/delete/:id",  function(req, res)
{	     
    var  dno  = parseInt(  req.params.id );
   DeptModel.findOneAndRemove({deptno:dno}, function(err)
    {  
        console.log("Dept is deleted from  database");
        res.redirect("/");	 
    });  
    
});

app.listen(3002);
console.log("Server started.   http://localhost:3002/");