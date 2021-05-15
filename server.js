const express= require("express"); //We don't have to give it a file path because it is already in node_modules
const morgan= require("morgan");//Calling in Morgan Middleware
const hostname= "localhost";
const port= 3000;

//Calling the express() function which will return an Express server application that will be available to us under the variable name app. 
const app= express();
app.use(morgan("dev")); //Configure Morgan to log additional information to the screen. Morgan will log the request information and headers for us.
app.use(express.json());  //This is used when server receives requests, this will place it into JavaScript properties that we can use. 

//Set properties on response objects for all the routing methods in this path.
//Path with the /campsites will then use this routing method.
app.all("/campsites", (req, res, next) => {
    res.statusCode= 200;
    res.setHeader("Content-Type", "text/plain");
    next(); //Pass control of the application routing to the next routing method after this one.
});

app.get("/campsites", (req,res)=> {
    res.end("Will send all the campsites to you");  //Just shows that we can access this code for now
});

app.post("/campsites", (req,res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put("/campsites", (req,res)=> {
    res.statusCode= 403;
    res.end("PUT operation not supported on /campsites");
});

app.delete("/campsites", (req, res)=> {
    res.end("Deleting all campsites");
});

app.get("/campsites/:campsiteId", (req, res)=> {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you.`);
});

app.post("/campsites/:campsiteId", (req,res) => {
    res.statusCode= 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put("/campsites/:campsiteId", (req,res)=> {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.delete("/campsites/:campsiteId", (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//Using Express.static to serve files from the public folder
//__dirname is special to Node. Whenever you use __dirname, it refers to the absolute path of the current directory of the file that it is in.
app.use(express.static(__dirname + "/public")); 

//We will setup the server so it returns the same response for any request. 
//We can do this by using the use() method. Use() method takes a callback function, which calls a middleware function.
//middleware function in Express has three parameters: req (request object), res(responce object), and next (which is a function)
app.use((req,res)=> {
    //console.log(req.headers); //Don't need this code anymore because Morgan will display this for us.
    res.statusCode= 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

//Use app.listen to create a server and start listening to it.
app.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}: ${port}/`);
});