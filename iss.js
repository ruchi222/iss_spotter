const request = require('request');

 // error can be set if invalid domain, user is offline, etc.
// const fetchMyIP = function(callback) {
//   request('https://api.ipify.org?format=json', (error, response, body) => {
//     // error can be set if invalid domain, user is offline, etc.
//   if (error) {
//     callback(error, null);
//     return;
//   }
//   // if non-200 status, assume server error
//   if (response.statusCode !== 200) {
//     const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//     callback(Error(msg), null);
//     return;
//   }

//   // if we get here, all's well and we got the data

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

// module.exports = { fetchMyIP };

// const fetchCoordsByIP = function(ip, callback) {
//     request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
//       if (error) {
//         callback(error, null);
//         return;
//       }
  
//       if (response.statusCode !== 200) {
//         callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
//         return;
//       }
  
//       const { latitude, longitude } = JSON.parse(body).data;
  
//       callback(null, { latitude, longitude });
//     });
//   };
  
//   // Don't need to export the other function since we are not testing it right now.
//   module.exports = { fetchCoordsByIP };

// const fetchISSFlyOverTimes = function(coords, callback) {
//     const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
//     request(url, (error, response, body) => {
//       if (error) {
//         callback(error, null);
//         return;
//       }
  
//       if (response.statusCode !== 200) {
//         callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//         return;
//       }
  
//       const passes = JSON.parse(body).response;
//       callback(null, passes);
//     });
//   };
  
//   // Don't need to export the other functions since we are not testing them right now.
//   module.exports = { fetchISSFlyOverTimes };

const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
          return callback(error, null);
        }
    
        fetchCoordsByIP(ip, (error, loc) => {
          if (error) {
            return callback(error, null);
          }
    
          fetchISSFlyOverTimes(loc, (error, nextPasses) => {
            if (error) {
              return callback(error, null);
            }
    
            callback(null, nextPasses);
          });
        });
      });
    };
