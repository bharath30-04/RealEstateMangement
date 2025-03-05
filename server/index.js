/*const express=require("express");
const app=express();
const {Client}=require("pg");
const cors=require("cors");
const multer=require("multer");
const path = require('path');
const upload=multer({dest:'upload'});
const db= new Client(
{ user:"postgres",
host:"localhost",
database:"project",
password:"24682468",
port:5432
}
);

app.use(cors());
app.use(express.json());

db.connect()
.then(()=>
{ console.log("database connected successfully")}
)
.catch((err)=>
{console.log("error in connecting the database")}
);







app.get("/search",async (req,res)=>
{ const result1= await db.query("select * from cards;");
	res.send(result1.rows);
});

app.get("/agent",async (req,res)=>
{ const result1= await db.query("select * from agents;");
	res.send(result1.rows);
});

app.post("/addagent",async (req,res)=>
{ 	const {name,password,email,pincode,phone,address,photo}=req.body;
const result=await db.query("insert into agents(name,password,email,pin,phone,address,img)values($1,$2,$3,$4,$5,$6,$7)",[name,password,email,pincode,phone,address,photo]);
});

app.post("/addproperty",async (req,res)=>
{ 	const {adentId,propertyName,specifications,cost,mode,doorNo,streetName,townCityName,state,pincode,ownerName,ownerPhoneNumber}=req.body;
const result=await db.query("insert into property(id,name,specifications,cost,mode,doorno,street,city,state,pin,ownername,ownerphone)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",[adentId,propertyName,specifications,cost,mode,doorNo,streetName,townCityName,state,pincode,ownerName,ownerPhoneNumber]);
});


app.listen(5000,()=>{console.log("server is running on port 5000")});
*/






/*const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Database configuration
const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: '24682468',
  port: 5432
});

app.use(cors());
app.use(express.json());

db.connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error in connecting the database', err);
  });

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.get('/search', async (req, res) => {
  const result1 = await db.query('SELECT * FROM cards;');
  res.send(result1.rows);
});

app.get('/agent', async (req, res) => {
  const result1 = await db.query('SELECT * FROM agents;');
  res.send(result1.rows);
});

app.post('/addagent', upload.single('photo'), async (req, res) => {
  const { name, password, email, pincode, phone, address } = req.body;
  const photo = req.file.buffer; // Buffer of the uploaded file

  try {
    await db.query(
      'INSERT INTO agents (name, password, email, pin, phone, address,image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, password, email, pincode, phone, address, photo]
    );
    res.status(201).send('Agent added successfully');
  } catch (error) {
    console.error('Error in posting the data', error);
    res.status(500).send('Error in posting the data');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


*/

const express = require("express");
const app = express();
const { Client } = require("pg");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session =require("express-session");

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "project",
  password: "24682468",
  port: 5432,
});


app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
console.log("dorname",__dirname);
app.use('/upload', express.static(path.join(__dirname, 'upload')));

/*app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }
}));*/
// Ensure upload directory exists
const uploadDir = "upload";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Connect to the PostgreSQL database
db.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

// Handle file upload errors
const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send("Multer error: " + err.message);
  } else if (err) {
    res.status(500).send("Internal server error: " + err.message);
  } else {
    next();
  }
};

// Add a property and upload images
app.post("/addproperty", upload.array("photos", 10), handleError, async (req, res) => {
  console.log("Request body:", req.body); // Log the body content for debugging
  console.log("Uploaded files:", req.files); // Log files to see if any files are uploaded

  const {
    agentId,
    property_id,
    propertyName,
    specifications,
    cost,
    mode,
    doorNo,
    streetName,
    townCityName,
    state,
    pincode,
    ownerName,
    ownerPhoneNumber,
  } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const photos = req.files.map((file) => file.filename);

    const result = await db.query(
      "INSERT INTO property (id, p_id, name, specifications, cost, mode, doorno, street, city, state, pin, ownername, ownerphone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [
        agentId,
        property_id,
        propertyName,
        specifications,
        cost,
        mode,
        doorNo,
        streetName,
        townCityName,
        state,
        pincode,
        ownerName,
        ownerPhoneNumber,
      ]
    );


    for (const photo of photos) {
      await db.query(
        "INSERT INTO images (id, img) VALUES ($1, $2)",
        [property_id, photo]
      );
    }
     const photo=req.files[0].filename;
    await db.query("insert into cards(id,pin,location,cost,mode,img)values($1,$2,$3,$4,$5,$6)",[property_id,pincode,townCityName,cost,mode,photo]);
   


    res.status(201).send("Property added successfully with images");
  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).send("Error adding property");
  }
});

app.get("/search",async (req,res)=>
{ const result1= await db.query("select * from cards;");
	res.send(result1.rows);
});

app.get("/agent",async (req,res)=>
{ const result1= await db.query("select * from agents;");
	res.send(result1.rows);
});






/*app.post("/addagent",async (req,res)=>
{ 	const {name,password,email,pincode,phone,address}=req.body;
   // const photos=req.files.filename;
   const photos = req.files.map((file) => file.filename);
   
    if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
    const result = await db.query("insert into agents(name,password,email,pin,phone,address,img)values($1,$2,$3,$4,$5,$6,$7)",[name,password,email,pincode,phone,address,photos[0]]);

     //const photos = req.files.map((file) => file.filename);
   
});*/

app.post("/register",async (req,res)=>
{   const{username,email,password,mode}=req.body;
     

    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
      console.log("already exist");
      
    } 
    else {
     await db.query("insert into users(username,email,password,mode)values($1,$2,$3,$4)",[username,email,password,mode]);
     }

});

/*app.get("/login",async (req,res)=>
{   const{email,password,mode}=req.query;
  const result1= await db.query("select * from users where (email=$1 and password=$2 and mode=$3);",[email,password,mode]);
  
      
        res.send(result1.rows);
  
  
});*/


// Import and use cookie-parser


// Login endpoint with session handling
app.get("/login", async (req, res) => {
  const { email, password, mode } = req.query;
console.log(mode);
  try {
    const result1 = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2 AND mode = $3",
      [email, password, mode]
    );

    if (result1.rows.length === 1) {
      // Set a cookie with user information
      res.cookie("user",JSON.stringify( {
        username: result1.rows[0].username,
        email: result1.rows[0].email,
        mode: result1.rows[0].mode,
      }), { httpOnly:true, maxAge: 24 * 60 * 60 * 1000 }); // 1-day expiration
        
      res.status(200).send(result1.rows);
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Server error");
  }
});

// Endpoint to get logged-in user details from cookies
/*app.get("/session", (req, res) => {
  const user = req.cookies.user;
  console.log(user);
  if (user) {
    res.json({ valid: true, user });
  } else {
    res.json({ valid: false });
  }
});
*/

// Start the server
app.get('/house',async(req,res)=>
{   const{pin,cost,location}=req.query;
    //console.log(pin);
    const result= await db.query('select img from images where id in (select p_id from property where (pin=$1 AND city=$2 AND cost=$3));',[pin,location,cost]);
   // console.log(result.rows[0].img);
        res.send(result.rows);
        
});

app.get('/houseData',async(req,res)=>
{   const{pin,cost,location}=req.query;
    //console.log(pin);
    const result= await db.query('select * from property where (pin=$1 AND city=$2 AND cost=$3);',[pin,location,cost]);
   // console.log(result.rows[0].img);
        console.log(result.rows);
        res.send(result.rows);
        
});




app.post("/addagent", upload.array("photo", 1), handleError, async (req, res) => {
  console.log("Request bodsetIsLoggedIn(true);y:", req.body); // Log the body content for debugging
  console.log("Uploaded files:", req.files); // Log files to see if any files are uploaded

  const {
  name,password,email,pincode,phone,address
  } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const photos = req.files.map((file) => file.filename);
    const result1= await db.query("insert into users(username,email,password,mode)values($1,$2,$3,$4)",[name,email,password,"agent"]); 

    const result = await db.query("insert into agents(name,password,email,pin,phone,address,img)values($1,$2,$3,$4,$5,$6,$7)",[name,password,email,pincode,phone,address,photos[0]]);
    res.status(201).send("Property added successfully with images");
    
    
    
  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).send("Error adding property");
  }
  
});
/*
project/
│
├── server/
|___src/agent/
│   ├──agent.jsx
│   
│

 */


/*app.get('/session',(req,res)=>{
    if(req.session.email)
    {   return res.json({valid:true,email:req.session.email})
    }
    else
    {   return res.json({valid:false})
    }
})
*/
















app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

