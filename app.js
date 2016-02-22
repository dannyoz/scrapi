"use strict";

const express   = require('express');
const curl      = require('curlrequest');
const jsdom     = require("jsdom");
const cheerio   = require('cheerio');

var path         = require('path')
var childProcess = require('child_process')
var phantomjs    = require('phantomjs')
var binPath      = phantomjs.path
var scraperjs    = require('scraperjs');

const app    = express();
const port   = 3000;
const server = app.listen(port);


app.get('/', (req, res) => {
    res.json({
    	data : "data"
    });
});

app.get('/test', (req, res) => {

	request('http://www.sainsburys.co.uk/shop/gb/groceries').then((html) =>{

		console.log(html)

		jsdom.env(
		  	html,
		  	["http://code.jquery.com/jquery.js"],
		  	function (err, window) {

		  		var $        = window.$,
		  			document = window.document,
		  			navItems = $(".mainNav li"),
		  			list     = [];


		  		navItems.each(function(){
		  			var text = $(this).find('a').html();
		  			list.push(text);
		  		});

		  		res.json({
		  			main_navigation : list
		  		});

		    	
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

app.get('/gethomepage', (req, res) => {

	request('http://www.sainsburys.co.uk/shop/gb/groceries').then((html) =>{

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

app.get('/navigation', (req,res) =>{

	console.log('navigation');

	scraperjs.DynamicScraper.create('https://news.ycombinator.com/')
		.scrape(function($) {
			return $(".title a").map(function() {
				return $(this).text();
			}).get();
		})
		.then(function(news) {
			console.log(news);
		})

	res.send({
    	data : true
    });

});

app.get('/example', (req, res) =>{

	console.log('example');

	var childArgs = [
	  path.join(__dirname, 'phantom-script.js'),
	  'some other argument (passed to phantomjs script)'
	];
	 
	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
	  // handle results
	  console.log(err, stdout, stderr);
	});

	res.send({
		example : true
	});

});


let request = (url) =>{

	console.log(url)

	var options = {
        url : url,
        method : 'get'
    };

    let ajaxPromise = new Promise((resolve,reject) =>{

    	 curl.request(options,(err,response) => {

	        if(!err){
	            resolve(response);
	        } else {
	            reject(err);
	        }
	    });

    });

    return ajaxPromise;

};





console.log("Express server listening on port ", port);
//request('http://www.sainsburys.co.uk/webapp/wcs/stores/servlet/gb/groceries');