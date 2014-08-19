var AjaxSyncExampleService = function(options) {

  var ajaxUrl = 'js/data.json';

  var filterResults = function(term, results) {
    return results.filter(function(result) {
      // we will do a case-insensitive search
      var lowerCaseTitle = result.title.toLowerCase();
      var lowerCaseTerm  = term.toLowerCase();

      return (lowerCaseTitle.search(lowerCaseTerm) > -1);
    });
  };

  this.performQuery = function(term) {
    var results = [];

    $.ajax({
      url: ajaxUrl,
      dataType: 'json',
      async: false,
      success: function(json) {
        // filter the json data results
        results = filterResults(term, json);
      }
    });

    return results;
  };

};
