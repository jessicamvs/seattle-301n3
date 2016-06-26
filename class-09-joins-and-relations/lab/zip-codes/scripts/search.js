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
    // webDB.execute('SELECT DISTINCT city FROM zips ORDER BY city ASC;', function(rows) {
    //   console.log(rows.length);
      if(rows.length) {
        rows.forEach(function(ele) {
          $('#city-select').append('<option value="' + ele.city + '">' + ele.city + '</option>');
        });
      };
    // });
  };

  search.stateSelect = function() {
    $('#state-select').on('change', function() {
      console.log($('option [value="city"]'));
      $('#selectCity').siblings().remove();

      console.log(this.value);
      webDB.execute('SELECT city FROM zips WHERE state = "'+ this.value + '" ORDER BY city ASC;', function(rows) {
        search.populateCities(rows);
      });
    })
  }




  search.populateStates();
  search.stateSelect();
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here


// })(window)
