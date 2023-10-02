import express from 'express';
import bodyParser from 'body=parser';

const app = express();

const port = 5000;

let recipeData = [{name: "Pizza",}]

app.get('/api/Recipe', (req, res) => {
    console.log("api/recipes is working")
    res.json(recipeData);
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});