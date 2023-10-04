import express from 'express';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));

const port = 4000;

const connectToDB = async () => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    return client.db("my-react-app-db");
}

app.get('/api/recipes', async (req, res) => {
    const db = await connectToDB();
    const recipes = await db.collection('recipes').find({}).toArray();
    res.json(recipes);
});

app.post('/api/addRecipe', async (req, res) => {
    const db = await connectToDB();
    const result = await db.collection("recipes").insertOne(req.body);
    if (result.acknowledged) {
        res.json({ message: "Recipe added successfully!" });
    } else {
        res.json({ message: "Error adding recipe." });
    }
});

app.post('/api/removeRecipe', async (req, res) => {
    console.log("Attempting to remove recipe with name:", req.body.recipeName);
    const db = await connectToDB();
    const result = await db.collection("recipes").deleteOne({ name: req.body.recipeName });
    console.log("Deletion result:", result);

    if (result.deletedCount > 0) {
      res.json({ message: "Recipe removed successfully!" });
    } else {
      res.json({ message: "Error removing recipe or recipe not found." });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
