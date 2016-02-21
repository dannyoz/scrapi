"use strict";

const express   = require('express');
const curl      = require('curlrequest');
const jsdom     = require("jsdom");
const cheerio   = require('cheerio');


const app    = express();
const port   = 3000;
const server = app.listen(port);


app.get('/', (req, res) => {
    res.json({
    	data : "data"
    });
});

app.get('/test', (req, res) => {

	request('http://www.sainsburys.co.uk/shop/gb/groceries/fruit-veg').then((html) =>{

		console.log(html)

		jsdom.env(
		  	html,
		  	["http://code.jquery.com/jquery.js"],
		  	function (err, window) {

		  		var $        = window.$,
		  			document = window.document,
		  			navItems = $(".subNav");


		  		console.log(navItems.html());

		  		res.send($('body').html());

		    	
		  	}
		);

		//var $ = cheerio.load(html);

		// console.log($('.mainNav').text())


	}).catch((err) =>{
		console.log(err);
	});

    // res.send({
    // 	data : "data"
    // });

});


let request = (url) =>{

	console.log(url)

	var options = {
        url : url,
        method : 'get',
        encoding : 'ascii',
        verbose: true,
        headers : {
        	'Set-Cookie' : "sbrycookie1=630263751"
        }
    };

    let Prom1$e = new Promise((resolve,reject) =>{

    	 curl.request(options,(err,response) => {

	        if(!err){
	            resolve(response);
	        } else {
	            reject(err);
	        }
	    });

    });

    return Prom1$e;

};





console.log("Express server listening on port ", port);
//request('http://www.sainsburys.co.uk/webapp/wcs/stores/servlet/gb/groceries');