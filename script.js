// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map').setView([9.1450,40.4897], 6);

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'apikey',
  username: 'anakiki15'
});

// Initialze source data
var regionSource = new carto.source.Dataset('eth_region_2013');

var regionStyle = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #826DBA;
  polygon-opacity: 0.3;
  ::outline {
    line-color: #6a46c9;
    line-width: 2;
    line-opacity: 0.2;
  }
}
`);

// Add style to the data
var regionLayer = new carto.layer.Layer(regionSource, regionStyle, {});


/*
*Begin layer two
*/

// Initialze source data
var railwaysSource = new carto.source.Dataset('railways');

// Create style for the data
var railwaysStyle = new carto.style.CartoCSS(`
#layer {
  line-width: 5;
  line-color: #c84c5d;
  line-opacity: 1;
}
`);

// Add style to the data
var railwaysLayer = new carto.layer.Layer(railwaysSource, railwaysStyle);

/*
*Begin layer three
*/

// Initialze source data
var roadSource = new carto.source.Dataset('roads');

// Create style for the data
var roadsStyle = new carto.style.CartoCSS(`
#layer {
  line-width: 1.5;
  line-color: #535655;
  line-opacity: 1;
}
`);

// Add style to the data
var roadsLayer = new carto.layer.Layer(roadSource, roadsStyle);

/*
*Begin layer four
*/

// Initialze source data
var placesSource = new carto.source.Dataset('places_1')

// Create style for the data
var placeStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 4;
  marker-fill: pink;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
}
`);

// Add style to the data
var placesLayer= new carto.layer.Layer(placesSource, placeStyle, {
  featureClickColumns: ['name', 'type']
}
                                      );

var popup = L.popup();
placesLayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>'+ event.data['name'] +'<h1>';
   content += '<h2>' + event.data['type'] + '</h2>';
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});
/*
*Begin layer five
*/

// Initialze source data
var pointsSource = new carto.source.SQL('SELECT * FROM points');

// Create style for the data
var pointsStyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 3;
  marker-fill: #4deeb3;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
  marker-line-width: 0;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

// Add style to the data
var pointsLayer = new carto.layer.Layer(pointsSource, pointsStyle, {
  featureClickColumns: ['type']
});

var popup = L.popup();
pointsLayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>'+ event.data['type'] +'<h1>';
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// Add the data to the map as a layer
client.addLayers([regionLayer, railwaysLayer, roadsLayer, pointsLayer, placesLayer]);
client.getLeafletLayer().addTo(map);

/*
 * checkboxes
 */

var element = document.querySelector('.fuel-checkbox');
element.addEventListener('change', function (e) {
 console.log('Fuel was clicked', e.target.checked);
    if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'fuel'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.tower-checkbox');
element.addEventListener('change', function (e) {
 console.log('Tower was clicked', e.target.checked);
    if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'tower'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.hotel-checkbox');
element.addEventListener('change', function (e) {
  console.log('Hotel was clicked', e.target.checked);
    if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'hotel'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.hospital-checkbox');
element.addEventListener('change', function (e) {
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Hospital was clicked', e.target.checked);
  
  if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'hospital'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.school-checkbox');
element.addEventListener('change', function (e) {
  console.log('School was clicked', e.target.checked);
    if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'school'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.university-checkbox');
element.addEventListener('change', function (e) {
 console.log('University was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'university'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.pharmacy-checkbox');
element.addEventListener('change', function (e) {
 console.log('Pharmacy was clicked', e.target.checked);
    if(e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'pharmacy'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.place_of_worship-checkbox');
element.addEventListener('change', function (e) {
 console.log('Place of Worship was clicked', e.target.checked);
    if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'place_of_worship'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.police-checkbox');
element.addEventListener('change', function (e) {
 console.log('Police was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'police'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.bus_station-checkbox');
element.addEventListener('change', function (e) {
 console.log('Bus Station was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'bus_station'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.ruins-checkbox');
element.addEventListener('change', function (e) {
 console.log('Ruins was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'ruins'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.atm-checkbox');
element.addEventListener('change', function (e) {
  console.log('Atm was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'atm'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.bank-checkbox');
element.addEventListener('change', function (e) {
  console.log('Bank was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'bank'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.restaurant-checkbox');
element.addEventListener('change', function (e) {
  console.log('Restaurant was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'restaurant'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.cafe-checkbox');
element.addEventListener('change', function (e) {
  console.log('Cafe was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'cafe'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.doctor-checkbox');
element.addEventListener('change', function (e) {
  console.log('Doctor was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'doctors'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.supermarket-checkbox');
element.addEventListener('change', function (e) {
  console.log('Supermarket was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'supermarket'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.bus_stop-checkbox');
element.addEventListener('change', function (e) {
  console.log('Bus Stop was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'bus_stop'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.telephone-checkbox');
element.addEventListener('change', function (e) {
  console.log('Telephone was clicked', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'telephone'");
  }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});
var element = document.querySelector('.government');
element.addEventListener('change', function (e) {
  console.log('Government', e.target.checked);
   if (e.target.checked) {
    pointsSource.setQuery("SELECT * FROM points WHERE type = 'government'");
   }
  else {
    pointsSource.setQuery("SELECT * FROM points");
  }
});

