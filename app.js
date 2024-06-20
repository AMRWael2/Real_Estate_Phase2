const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const app = express();
const port = 3000;

// Middleware for live reload
app.use(connectLiveReload());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Real Estate' });
});
app.get('/index.ejs', (req, res) => {
    res.render('index'); // Render index.ejs
});
app.get('/', (req, res) => {
    res.render('Dashboard2'); // Render index.ejs
});

app.get('/com.ejs', (req, res) => {
    res.render('com'); // Render com.ejs
});
app.get('/Apartments.ejs', (req, res) => {
    res.render('Apartments', { title: 'Real Estate' }); // Render com.ejs
});
app.get('/contactUs.ejs', (req, res) => {
    res.render('contactUs'); // Render com.ejs
});
app.get('/Login1.ejs', (req, res) => {
    res.render('Login1'); // Render com.ejs
});
app.get('/Signup1.ejs', (req, res) => {
    res.render('Signup1'); // Render com.ejs
});
app.get('/Villas.ejs', (req, res) => {
    res.render('Villas', { title: 'Real Estate' }); // Render com.ejs
});
app.get('/aboutUs.ejs', (req, res) => {
    res.render('aboutUs'); // Render com.ejs
});
app.get('/map.ejs', (req, res) => {
    res.render('map'); // Render com.ejs
});
app.get('/ScheduleMeeting.ejs', (req, res) => {
    res.render('ScheduleMeeting'); // Render com.ejs
});
app.get('/feedback.ejs', (req, res) => {
    res.render('feedback'); // Render com.ejs
});

app.get('/sell.ejs', (req, res) => {
    res.render('sell'); // Render com.ejs
});
app.get('/sellRequests.ejs', (req, res) => {
    res.render('sellRequests'); // Render com.ejs
});
app.get('/postForSale.ejs', (req, res) => {
    res.render('postForSale'); // Render index.ejs
});








// MongoDB connection
mongoose.connect("mongodb+srv://RealStateProject:realstate1@databrs.fu7gdx6.mongodb.net/?retryWrites=true&w=majority&appName=DATABRS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });

        // Setting up livereload
        const liveReloadServer = livereload.createServer();
        liveReloadServer.watch(path.join(__dirname, 'public'));

        liveReloadServer.server.once("connection", () => {
            setTimeout(() => {
                liveReloadServer.refresh("/");
            }, 100);
        });
    })
    .catch((err) => {
        console.log(err);
    });
