
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();
const app = express();
const port = process.env.PORT
const conectionString = 'mongodb+srv://nola:mongoProject255@contactdetails.1wqxh6d.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(conectionString);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  message: String,
});

const Contact = mongoose.model('ContactDetails', contactSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

app.use(express.static('public'));

// Your existing route for serving index.html
app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', function(error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Whoops! File not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
});

app.post('/save-contact', async (req, res) => {
  const contactData = req.body;

  try {
    
    await Contact.create(contactData);
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save contact.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

