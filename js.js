$(document).ready(function() {
	var myModel = new YoutubeModel();
	var myView = new YoutubeView(myModel);

	$('.go-button').on('click', function() {
		console.log('Button clicked');
		myView.search();
	});
});

// state object
var state = {
searchTerm: "",
results: []
};

var YoutubeModel = function(){
	this.getRequest = function(showResults) {
		// cal to API
		// set some params
		var params = {
			part: 'snippet',
			q: state.searchTerm,
			maxResults: 5,
			key: 'AIzaSyBcHFW3bqFau0HKNVQWHMaJ9-StZxMeVXc'
		};
		url = 'https://www.googleapis.com/youtube/v3/search';

		// the actual call
		$.getJSON(url, params, function(data) {
			console.log('sucess');
			state.items = data.items;
			showResults();
		});
	};
}

YoutubeModel.prototype.getSearchTerm = function() {
	state.searchTerm = $('.text').val();
};

var YoutubeView = function(model){
	this.model = model;
	this.search = function () {
		this.model.getSearchTerm();
		this.model.getRequest(this.showResults);
	};
	this.showResults = function() {
		// prints results to page
		// clear out search-results div first
		$('.search-results').empty();
		// start the print of each video
		// thumb, url link, description
		for (item in state.items) {
			var videoId = state.items[item].id.videoId;
			var videoURL = 'https://www.youtube.com/watch?v=' + videoId;
			var item = state.items[item].snippet;
			$('.search-results').append("<div class='video-card'>" + "<div class='top-section'>" + "<p class='title'>" + item.title + "</p>" + "<p class='description'>" + item.description + "</p>" + "</div>" + "<a href='" + videoURL + "'>" + "<img src='" + item.thumbnails.medium.url + "'>" + "</a>" + "<div>");
		};
	};
}
