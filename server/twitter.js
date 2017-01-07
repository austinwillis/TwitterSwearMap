var Twitter = require('twitter');

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCWJ7bOg_76qbUCCS92UrKFxwo9TLIhCCk",
    authDomain: "twitterangerlevel.firebaseapp.com",
    databaseURL: "https://twitterangerlevel.firebaseio.com",
    storageBucket: "twitterangerlevel.appspot.com",
    messagingSenderId: "523715061517"
};
firebase.initializeApp(config);

var client = new Twitter({
    consumer_key: '7LKsPJ7ppmwatnCHFd0XHv3sX',
    consumer_secret: 'WnVQpzwrBxGYEdFxE3dclO3C492bphB9aqSxH3hoWdSEd7K11O',
    access_token_key: '128074217-vthMiSMZ94ZdTXT1cR6cyas5FCn5uJ0aUryA1uKX',
    access_token_secret: 'rNxwcD7p0jurPP7gYt9G2z0Ddwow5tPXGuX3hiEZwOhTr'
});

var params = {
    locations: '-125.95,24.41,-66.62,48.84'
};

setInterval(function() {
    var ref = firebase.database().ref('/tweets');
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            var record = data.val();
            if(record['time'] < new Date().getTime() - 10*60*1000)
            { ref.child(data.key).remove(); }
        });
    });
}, 1*60*1000);

var newTweets = [];

setInterval(function() {
    newTweets.forEach((update) => {
       firebase.database().ref('/tweets').push(update);
    });
    newTweets = [];
}, 60*1000);

var profanity = ['shit','fuck','damn','bitch','ass','piss','bastard','cunt','dick','pussy'];

function getCenter(arr) {
    var y = arr.map(function(a){ return a[0] });
    var x = arr.map(function(a){ return a[1] });
    var minX = Math.min.apply(null, x);
    var maxX = Math.max.apply(null, x);
    var minY = Math.min.apply(null, y);
    var maxY = Math.max.apply(null, y);
    return [(minX + maxX)/2, (minY + maxY)/2];
}

client.stream('statuses/filter', params,  function(stream) {
    stream.on('data', function(tweet) {
        if (containsProfanity(tweet.text)) {
            var coords = getCenter(tweet.place.bounding_box.coordinates[0]);
            var location = {};
            location.lat = coords[0];
            location.lng = coords[1];
            let update = { location: location, time: new Date().getTime() };
            newTweets.push(update);
        }
    });

    stream.on('error', function(error) {
        //console.log(error);
    });
});

function containsProfanity(text) {
    let profane = false;
    profanity.forEach(word => {
        if (text.indexOf(word) > -1)
            profane = true;
    });
    return profane;
}
