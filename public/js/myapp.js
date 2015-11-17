var myapp = new Framework7({
    material:true ,
    materialPageLoadDelay:1 ,
    materialRipple:true
});

console.log('Welcome to trade bazaar');

var $$ = Dom7;

var mainView = myapp.addView('.view-main',{
    dynamicNavbar:true
});

myapp.onPageInit('about', function(page) {
    console.log('about.html opened');
    //do what ypu want to do when about.html page opens
});


