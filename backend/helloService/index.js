
const express = require('express');
require('dotenv').config()
var cors = require('cors')


const app = express();
app.use(cors())


app.use(express.json());
app.get('/', (req,res)=>{
    res.send({msg: 'Hello World'})
})
app.get('/health', (req,res)=>{
    res.send({status: 'OK'})
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.post('/trip', (req, res) => {
  const { title, location, date } = req.body;

  // For now just return what was sent (later we’ll save to DB in Phase 2)
  res.json({
    message: "Trip added successfully",
    trip: { title, location, date }
  });
});

app.get('/trip', (req, res) => {
  res.json([
    { title: "Sample Trip", location: "Test City", date: "2025-01-01" }
  ]);
});
