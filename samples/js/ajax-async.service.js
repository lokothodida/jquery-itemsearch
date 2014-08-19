var AjaxAsyncExampleService = function(options) {
  var $form = options.form;
  var ajaxUrl = 'js/data.json';

  var filterResults = function(term, results) {
    return results.filter(function(result) {
      // we will do a case-insensitive search
      var lowerCaseTitle = result.title.toLowerCase();
      var lowerCaseTerm  = term.toLowerCase();

      return (lowerCaseTitle.search(lowerCaseTerm) > -1);
    });
  }

  this.performQuery = function(term) {
    // get the data
    $.ajax({
      url: ajaxUrl,
      dataType: 'json',
      success: function(json) {
        // filter the json data results
        var results = filterResults(term, json);

        // set the results for the form
        $form.setResults(results);
      }
    });

    return false; // flags itemSearch to say this is an asynchronous query
  };
};
