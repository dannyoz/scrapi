var page = require('webpage').create();
page.open('http://www.sainsburys.co.uk/shop/gb/groceries/fruit-veg', function() {
	var content = page.content;
  	console.log('Content: ' + content);
	phantom.exit();
});
