app.service("News", ['$http', function($http) {
  this.getNews = function(var) {
    // should this get an api method instead?
    // return $http.get("https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.title="+var+"&q.enriched.url.enrichedTitle.docSentiment=|type=positive,score=>0.5|&return=enriched.url.url,enriched.url.title", {
    //   params: {
    //     apikey: 
    //   }
    // })
    return $http.get("/api/route", function() {
      
    })
  }
}])