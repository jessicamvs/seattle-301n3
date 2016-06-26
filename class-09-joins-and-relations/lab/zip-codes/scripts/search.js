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
      webDB.execute('SELECT latitude, longitude FROM zips WHERE zip="' + e.target.zipEntry.value + '";', function(rows) {
        console.log(rows);
        if (rows.length) {
          initMap(rows[0]);
        } else {
          $('form').append('<p class="red">*Invalid ZIP code.</p>');
        }
      });
      // .fail(function(error) {
      //   console.log(error);
      // });
    });
  };

  search.populateStates();
  search.stateSelect();
  search.zipSearch();
  // DONE: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here


// })(window)
