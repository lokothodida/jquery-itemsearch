var SimpleExampleService = function(options) {
  var data = [
    { title: 'PHP',     url: '#php' },
    { title: 'Python',  url: '#python' },
    { title: 'C++',     url: '#cplusplus' },
    { title: 'Java',    url: '#java' },
    { title: 'Scala',   url: '#scala' },
    { title: 'Ruby',    url: '#ruby' },
  ];

  this.performQuery = function(term) {
    // we will simply filter the results by whether the term occurs in the title
    var results = data.filter(function(result) {
      // we will do a case-insensitive search
      var lowerCaseTitle = result.title.toLowerCase();
      var lowerCaseTerm  = term.toLowerCase();

      return (lowerCaseTitle.search(lowerCaseTerm) > -1);
    });

    return results;
  };
};
