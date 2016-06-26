// (function(module) {

  var search = {};

  search.populateStates = function() {
    webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state ASC;', function(rows) {
      console.log(rows.length);
      if(rows.length) {
        rows.forEach(function(ele) {
          $('#state-select').append('<option value="' + ele.state + '">' + ele.state + '</option>');
        });
      };
    });
  };

  search.populateCities = function(rows) {
    if(rows.length) {
      rows.forEach(function(ele) {
        $('#city-select').append('<option value="' + ele.city + '">' + ele.city + '</option>');
      });
    };
  };

  search.stateSelect = function() {
    $('#state-select').on('change', function() {
      $('#selectCity').siblings().remove();
      console.log(this.value);
      webDB.execute('SELECT DISTINCT city FROM zips WHERE state = "' + this.value + '" ORDER BY city ASC;', function(rows) {
        search.populateCities(rows);
      });
    });
  };

  search.zipSearch = function() {
    $('form').on('submit', function(e) {
      e.preventDefault();
      console.log(e.target.zipEntry.value);
      webDB.execute('SELECT latitude, longitude, city FROM zips WHERE zip="' + e.target.zipEntry.value + '";', function(rows) {
        console.log(rows);
        console.log(rows[0]);
        if (rows.length) {
          var results = rows.map(function(ele) {
            return {
              lat: ele.latitude,
              lng: ele.longitude
            }
          })
          console.log(rows[0].city);
          initMap(results[0], rows[0].city);
        } else {
          $('form').append('<p class="red">*Invalid ZIP code.</p>');
        }
      });
    });
  };

  search.citySearch = function() {
    $('#city-select').on('change', function(e) {
      e.preventDefault();
      console.log(e.target.value);
      webDB.execute('SELECT latitude, longitude, city FROM zips WHERE city="' + e.target.value + '";', function(rows) {
          var results = rows.map(function(ele) {
            return {
              lat: ele.latitude,
              lng: ele.longitude
            }
          })
          results.forEach(function(ele) {
            // console.log(ele);
            initMap(ele, "lololol");
          })
      });
    });
  }

  search.populateStates();
  search.stateSelect();
  search.zipSearch();
  search.citySearch();
  // DONE: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here


// })(window)
