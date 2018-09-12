'use strict'

const express       = require('express')
const bodyParser    = require('body-parser')

const PORT          = process.env.PORT || 3013
const HOST          = 'localhost'
const DEFAULT_COLORS= ['RED','GREEN','BLUE']


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


var colors = [].concat(DEFAULT_COLORS);

// GET - To fetch all colors
app.get('/colors', function(req,res,next){
    res.json({
        results: colors
    })
})


//POST -  Add new color to colors array
app.post('/colors', function(req, res,next){
    
    if(typeof req.body.color === 'string'){
       let color = req.body.color.trim().toUpperCase();
       console.log(color);
       if(color && colors.indexOf(color) < 0){
           colors.push(color);

           return res.status(201).send({
                results:colors
            });
       }
    }
    res.status(400).send();
});


app.listen(PORT,HOST);

console.log('Listening on %s:%d...', HOST || '*', PORT);

module.exports = app;
