const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const indexRoutes = require('./routes/index');
const path = require('path');
const PostForSale=require("./models/PostForSale");
const adminRoutes = require('./routes/admin');

const mongoURL='mongodb+srv://mn6220586:ru3SjDvePCY2mgIZ@real-estate.gksxram.mongodb.net/all-data?retryWrites=true&w=majority&appName=Real-Estate'


const app = express();

// Use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));


// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

// Serve the form page
app.get('/post-for-sale', (req, res) => {
    res.render('postForSale');
});


app.post('/submit-form', (req, res) => {
  const { title, description, price, location } = req.body;

  // Handle file upload if an image is included
  let imageFile = req.files.image; // Assuming input file field is named 'image'

  // Create a new instance of PostForSale model
  const newPost = new PostForSale({
      title,
      description,
      price: parseInt(price), // Convert price to number
      location,
      // Store file path in the database 
      imagePath: imageFile ? `/uploads/${imageFile.name}` : null 
  });

  // Save to MongoDB
  newPost.save()
      .then(savedPost => {
          // Move the uploaded file to a specific directory
          if (imageFile) {
              imageFile.mv(path.join(__dirname, 'uploads', imageFile.name), (err) => {
                  if (err) {
                      console.error('Error saving image:', err);
                      return res.status(500).send('Error saving image');
                  }
                  console.log('Image saved successfully');
                  res.send('Post saved successfully');
              });
          } else {
              res.send('Post saved successfully (without image)');
          }
      })
      .catch(err => {
          console.error('Error saving post:', err);
          res.status(500).send('Error saving post');
      });
});

// Connect to MongoDB and start the server
mongoose.connect(mongoURL)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
})
.catch(err => console.error(err));
   
