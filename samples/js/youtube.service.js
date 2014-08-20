/**
 * jQuery itemSearch Service Object
 * YouTubeSearchService (YouTube Search API V3)
 * Version 0.2
 */
var YouTubeSearchService = function(options) {
  var options = $.extend({}, options);
  var key     = this.key;
  var params  = options.params || {};
  var url     = 'https://www.googleapis.com/youtube/v3/search';
  var $form   = options.form;

  /**
   * Fills in default settings for search query parameters
   * @param  {PlainObject} settings
   * @return {PlainObject} query parameters for ajax call
   */
  var prepareQueryParams = function(settings) {
    return $.extend({
      key: key,
      part: 'snippet',
      order: 'relevance',
      maxResults: '5',
      type: 'video',
    }, settings)
  };

  /**
   * format an individual result's object and add it to the results array
   * @param {PlainObject}        result
   * @param {Array{PlainObject}} results
   */
  var formatResult = function(result, results) {
    results.push({
      url: 'http://youtu.be/' + result.id.videoId,
      title: result.snippet.title,
      description: result.snippet.description,
      meta: {
        id: result.id.videoId,
        thumbnails : {
          m: result.snippet.thumbnails.medium.url
        },
        more: result.snippet
      }
    });
  };

  /**
   * Run query using search term and query parameters
   * @param  {String}  term
   * @return {Boolean} false, as this is an asynchronous request
   */
  this.performQuery = function(term) {
    console.log(term);
    // with no API key, an error should be shown
    if (!key) {
      alert('No YouTube API Key provided');
    }

    var results = [];

    // get the data
    $.ajax({
      url: url,
      data: prepareQueryParams({q: term}),
      dataType: 'json',
      success: function(json) {
        if (json.items.length) {
          $.each(json.items, function(key, item) {
            formatResult(item, results);
          });
        }
      },
      complete: function() {
        $form.setResults(results);
      }
    });

    return false;
  };
};

/**
 * Sets the key for all YouTubeSearchService objects
 * @param  {String}  key
 * @return {Boolean} success of whether the key was set
 */
YouTubeSearchService.setKey = function(apiKey) {
  YouTubeSearchService.prototype.key = apiKey;
  return YouTubeSearchService.prototype.key == apiKey;
};
