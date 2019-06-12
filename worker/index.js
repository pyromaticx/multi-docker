const keys = require('./keys');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


async function distance(lat1, lon1, lat2, lon2, unit) {
  return new Promise((resolve, reject)  => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      resolve(0);
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      resolve(dist);
    }
  });
}
app.use(bodyParser.json());
app.get('/distance', async (req, res) => {
  let r = req.body,
      lat1 = r.lat1,
      lat2 = r.lat2,
      lon1 = r.lon1,
      lon2 = r.lon2,
      unit = r.unit;

  let dist;
  try {
    dist = await distance(lat1, lon1, lat2, lon2, unit);
  } catch (e) {
    console.log(e);
  }
  if(dist || dist === 0) {
    res.status(200).json({
      result: dist, 
    });
  } else {
    res.status(503).json({
      error: "invalid data or unit"
    });
  }
});

app.listen(9001);