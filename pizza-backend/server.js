import axios from 'axios'
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'


const app = express();

app.use(express.json());

app.use(cors()) // 👈 Add this line

const server = new MongoClient("mongodb+srv://chandu:chandu@cluster0.slhu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

async function databaseconnect() {
    await server.connect()
}
databaseconnect();

const db = server.db('reviews')

const db1 = server.db('pizza')



const collection = db.collection('userreviews')

const pizzainfo = db1.collection('pizzainfo')

app.post('/reviews', async (req, res) => {
   await collection.insertMany([{
        n: req.body.username,
        r: req.body.description
    }])
    res.send("data received")
})

app.post('/insert', async (req, res) => {
  await collection.insertMany([{

  }])
})

app.get('/getreviews', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.json(data)
})

// GET /likes/:pizzaId
app.get("/likes/:pizzaId", async (req, res) => {
    try {
      const { pizzaId } = req.params;
      const doc = await pizzainfo.findOne({ _id: pizzaId });
      res.json({ count: doc?.count || 0 });
    } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ error: "Failed to fetch likes" });
    }
  });
  
  // POST /likes/:pizzaId
  app.post("/likes/:pizzaId", async (req, res) => {
    try {
      const { pizzaId } = req.params;
      const { newCount } = req.body;

      const result = await pizzainfo.updateOne(
        { _id: pizzaId },
        { $set: { count: newCount } },
        { upsert: true }
      );

      res.status(200).json({ message: "Count updated", count: newCount });
    } catch (error) {
      console.error("Error updating count:", error);
      res.status(500).json({ error: "Failed to update count" });
    }
});

  // GET /top-pizzas
  app.get('/top-pizzas', async (req, res) => {
    try {
      // Fetch top 3 pizzas based on the 'count' (likes), sorted in descending order
      const topPizzas = await pizzainfo.find().sort({ count: -1 }).limit(3).toArray();
      res.json(topPizzas);  // Send the result as JSON
    } catch (error) {
      console.error('Error fetching top pizzas:', error);
      res.status(500).json({ error: 'Failed to fetch top pizzas' });
    }
  });
  

  

app.listen(3000)
