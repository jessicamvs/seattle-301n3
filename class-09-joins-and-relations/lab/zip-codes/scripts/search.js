// (function(module) {

  var search = {};

  search.populateFilters = function() {
    webDB.execute('SELECT city, state FROM zips', function(rows) {
      console.log(rows);
      if(rows.length) {
        rows.forEach(function(ele) {
           $('#city-select').append('<option value="' + ele.city + '">' + ele.city + '</option>');
        })

        rows.forEach(function(ele) {
           $('#state-select').append('<option value="' + ele.state + '">' + ele.state + '</option>');
        })


      };
    })
  };

  search.populateFilters();

  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here


// })(window)
