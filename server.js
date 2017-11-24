const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine', 'hbs');

app.use((req,res,next)=> {
    var time = new Date();
 var log =`${time}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log',log);

    next();
});

// app.use((req,res,next)=> {
// res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance page',
//     pageInfo  : 'Come back soon.',
//     pageDescription : 'This page is currently under maintenenance'
// })
// });



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.use(express.static(__dirname+"/public"));

hbs.registerPartials(__dirname+"/views/partial");

app.get('/',(req,res) => {
    //res.send('<h1>Hello Express!</h1>');
//     res.send({
//     name: 'Rishabh',
//     likes : [
//         'football', 'videogames', 'coding'
//     ]
// });
    res.render('home.hbs',{
    pageTitle : "Home page",
    welcomeMessage: 'Hello, Welcome to learning express! Lets make it successful!'
});
});

app.get('/about',(req,res)=> {
    res.render('about.hbs', {
        pageTitle : "About page"
})
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Bad request, page cannot be loaded.'
             });
});

app.listen(3000,()=> {
console.log("Server up on port 3000")});