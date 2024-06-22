const express = require('express');
const loc = require('Localize');
const mongoose = require('mongoose');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const MeetingRequest=require("./models/schedule"); 
const Payment = require('./models/order'); 
 var moment=require('moment');
const schedule = require('./models/schedule');
 app.use(express.urlencoded({ extended: true }));

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
    res.render('index', { title: 'Real Estate' });
});

app.get('/Dashboard2.ejs', (req, res) => {
    res.render('Dashboard2', { title: 'Real Estate' });
});

app.get('/com.ejs', (req, res) => {
    res.render('com', { title: 'Real Estate' });
});

app.get('/Apartments.ejs', (req, res) => {
    res.render('Apartments', { title: 'Real Estate' });
});

app.get('/contactUs.ejs', (req, res) => {
    res.render('contactUs', { title: 'Real Estate' });
});

app.get('/Login1.ejs', (req, res) => {
    res.render('Login1', { title: 'Real Estate' });
});

app.get('/Signup1.ejs', (req, res) => {
    res.render('Signup1', { title: 'Real Estate' });
});

app.get('/Villas.ejs', (req, res) => {
    res.render('Villas', { title: 'Real Estate' });
});

app.get('/aboutUs.ejs', (req, res) => {
    res.render('aboutUs', { title: 'Real Estate' });
});

app.get('/map.ejs', (req, res) => {
    res.render('map', { title: 'Real Estate' });
});

app.get('/ScheduleMeeting.ejs', (req, res) => {
    res.render('ScheduleMeeting', { title: 'Real Estate' });
});

app.get('/feedback.ejs', (req, res) => {
    res.render('feedback', { title: 'Real Estate' });
});

app.get('/sell.ejs', (req, res) => {
    res.render('sell', { title: 'Real Estate' });
});

app.get('/sellRequests.ejs', (req, res) => {
    res.render('sellRequests', { title: 'Real Estate' });
});

app.get('/postForSale.ejs', (req, res) => {
    res.render('postForSale', { title: 'Real Estate' });
});



app.get('/page.ejs', (req, res) => {
    res.render('page', { title: 'Real Estate' });
});
app.get('/payment.ejs', (req, res) => {
    res.render('payment', { title: 'Real Estate' });
});
app.get('/orders.ejs',async (req, res) => {
    
        try {
          const orders = await Payment.find().exec();
          res.render('orders', { array: orders });
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
   
});
app.get('/schaduled.ejs', (req, res) => {


    MeetingRequest.find().then((data)=>{
        
        console.log(data)
        res.render('schaduled', {arr:data, moment:moment});
    }).catch((err)=>{
        console.log(err)
    
    })


   
});

app.get('/AdminVillas.ejs', (req, res) => {
    res.render('AdminVillas', { title: 'Real Estate' });
});

app.get('/customers.ejs', (req, res) => {
    res.render('customers', { title: 'Real Estate' });
});

app.get('/Mainindex.ejs', (req, res) => {
    res.render('Mainindex', { title: 'Real Estate' });
});




// MongoDB connection
mongoose.connect("mongodb+srv://RealStateProject:F2TP4UiebwSv2zKA@databrs.fu7gdx6.mongodb.net/?retryWrites=true&w=majority&appName=DATABRS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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



// POST route to handle form submission
app.post('/', async (req, res) => {
    // Convert meetingDate to UTC string
    const meetingDateUTC = new Date(req.body.meetingDate).toISOString();
    const { phoneNumber, meetingDate, meetingTime } = req.body;

    try {
        const existingRequest = await MeetingRequest.findOne({ $or: [{ phoneNumber }, { meetingDate: meetingDateUTC }] });

        if (existingRequest) {
            // Return an error response if the request already exists
            return res.status(400).json({ message: 'Meeting request already exists.' });
        }

        // Create a new meeting request
        const meetingRequest = new MeetingRequest({
            phoneNumber,
            meetingDate: meetingDateUTC,
            meetingTime
            
        });

        // Save the meeting request
        await meetingRequest.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// POST route to handle form submission for adding new meeting requests
app.post('/add', async (req, res) => {
    // Create a new meeting request based on form data
    const newMeetingRequest = new MeetingRequest({
        phoneNumber: req.body.phoneNumber,
        meetingDate: req.body.meetingDate,
        meetingTime: req.body.meetingTime,
      
    });

    try {
        // Save the new meeting request to the database
        await newMeetingRequest.save();
        res.redirect('/schaduled.ejs'); // Redirect to the home page or wherever appropriate
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/edit', async (req, res) => {
    const { id, phoneNumber, meetingDate, meetingTime } = req.body;

    try {
       
        await schedule.findByIdAndUpdate(id, { phoneNumber, meetingDate, meetingTime });
        res.redirect('/schaduled.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/remove/:id', (req, res) => {
    const p = req.params.id;

    schedule.findByIdAndDelete(p)
        .then((result) => {
            if (result) {
                res.redirect("/schaduled.ejs");
            } else {
                res.status(404).send('schaduled not found');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting schaduled');
        });
});





app.post('/payment', async (req, res) => {
    const { name, email, address, telephone, city, priceOption, cardName, cardNumber, expMonth, expYear, cvv } = req.body;

    const newPayment = new Payment({
        name,
        email,
        address,
        telephone,
        city,
        priceOption,
        cardName,
        cardNumber,
        expMonth,
        expYear,
        cvv
    });

    try {
        await newPayment.save();
        res.redirect('/payment.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/addOrder', async (req, res) => {
    // Create a new meeting request based on form data
    const p = new Payment({
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
      
    });

    try {
        // Save the new meeting request to the database
        await p.save();
        res.redirect('/orders.ejs'); // Redirect to the home page or wherever appropriate
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/editOrder', async (req, res) => {
    const { id, name, address, telephone } = req.body;

    try {
       
        await Payment.findByIdAndUpdate(id, { name, address, telephone });
        res.redirect('/orders.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/removeOrder', async (req, res) => {
    const orderId = req.body.id; 

    try {
       
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid ID format');
        }

        
        const deletedOrder = await Payment.findByIdAndRemove(orderId);

        if (!deletedOrder) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/orders.ejs'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error removing order'); 
    }
});




app.post('/removeorder/:id', (req, res) => {
    const p = req.params.id;

    Payment.findByIdAndDelete(p)
        .then((result) => {
            if (result) {
                res.redirect("/orders.ejs");
            } else {
                res.status(404).send('orders not found');
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error deleting orders');
        });
});
