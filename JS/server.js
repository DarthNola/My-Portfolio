const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();
const app = express();
const port = process.env.PORT
const conectionString = process.env.ConectionString
mongoose.connect(conectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// app.use(express.static('public'));

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

