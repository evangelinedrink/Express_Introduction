const express= require("express"); //We don't have to give it a file path because it is already in node_modules
const morgan= require("morgan");//Calling in Morgan Middleware
const hostname= "localhost";
const port= 3000;

//Calling the express() function which will return an Express server application that will be available to us under the variable name app. 
const app= express();
app.use(morgan("dev")); //Configure Morgan to log additional information to the screen. Morgan will log the request information and headers for us.

//Using Express.static to serve files from the public folder
//__dirname is special to Node. Whenever you use __dirname, it refers to the absolute path of the current directory of the file that it is in.
app.use(express.static(__dirname + "/public")); 

//We will setup the server so it returns the same response for any request. 
//We can do this by using the use() method. Use() method takes a callback function, which calls a middleware function.
//middleware function in Express has three parameters: req (request object), res(responce object), and next (which is a function)
app.use((req,res)=> {
    res.statusCode= 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

//Use app.listen to create a server and start listening to it.
app.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}: ${port}/`);
});