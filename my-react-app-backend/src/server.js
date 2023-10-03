import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));

const port = 4000;

// Serve React app for all non-API routes
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/api/recipes', async (req, res) => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("my-react-app-db");

    const recipes = await db.collection('recipes').find({}).toArray();
    res.json(recipes);
});


app.post('/api/addRecipe', async (req, res) => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("my-react-app-db");

    const result = await db.collection("recipes").insertOne(req.body);
    if (result.acknowledged) {
        res.json({ message: "Recipe added successfully!" });
    } else {
        res.json({ message: "Error adding recipe." });
    }
});

app.post('/api/removeRecipe', async (req, res) => {
    const recipeName = req.body.name;  // Get the name from the request body
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("my-react-app-db");
  
    const result = await db.collection("recipes").deleteOne({ name: recipeName });
  
    if (result.deletedCount > 0) {
      res.json({ message: "Recipe removed successfully!" });
    } else {
      res.json({ message: "Error removing recipe or recipe not found." });
    }
  }); 


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
