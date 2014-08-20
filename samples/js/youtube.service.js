/**
 * YouTube Search (API V3) service object
 * @package     jQuery itemSearch
 * @subpackage  YouTubeSearchService
 */
var YouTubeSearchService = function(options) {
  var options = $.extend({}, options);
  var key     = this.key;
  var params  = options.params || {};
  var url     = 'https://www.googleapis.com/youtube/v3/search';

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
   * @param  {String}             term
   * @return {Array{PlainObject}} results of query
   */
  this.performQuery = function(searchTerm) {
    // with no API key, an error should be shown
    if (!key) {
      var errorMessage = 'No YouTube API Key provided';
      alert(errorMessage);
      console.log(errorMessage);
    }

    var results = [];

    $.ajax({
      url: url,
      data: prepareQueryParams({q: searchTerm}),
      dataType: 'json',
      async: false,
      success: function(json) {
        if (json.items.length > 0) {
          // go through each result, formatting them for VideoSearch
          $.each(json.items, function(key, item) {
            formatResult(item, results);
          });
        }
      }
    });

    return results;
  };
};

/**
 * Sets the key for all YouTubeSearchService objects
 * @param  {String}  key
 * @return {Boolean} success of whether the key was set
 */
YouTubeSearchService.setKey = function(apiKey) {
  YouTubeSearchService.prototype.key = apiKey;
  return YouTubeSearchService.prototype.key == key;
};
