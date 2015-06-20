$(document).ready(function() {

	$('.go-button').on('click', function() {
		console.log('Button clicked');
		getSearchTerm();
	});

});


function getSearchTerm() {
// called from click event

	var searchTerm = $('.text').val();
	getRequest(searchTerm);
};

function getRequest(searchTerm) {
// cal to API

	// set some params
	var params = {
		part: 'snippet',
		q: searchTerm,
		maxResults: 5,
		key: 'AIzaSyBcHFW3bqFau0HKNVQWHMaJ9-StZxMeVXc'
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	// the actual call
	$.getJSON(url, params, function(data) {
		console.log('sucess');
		showResults(data);
	});
};

function showResults(data) {
// prints results to page

	// clear out search-results div first
	$('.search-results').empty();
	// start the print of each video
	// thumb, url link, description
	for (item in data.items) {
		var videoId = data.items[item].id.videoId;
		var videoURL = 'https://www.youtube.com/watch?v=' + videoId;
		var item = data.items[item].snippet;
		$('.search-results').append("<div class='video-card'>" + "<div class='top-section'>" + "<p class='title'>" + item.title + "</p>" + "<p class='description'>" + item.description + "</p>" + "</div>" + "<a href='" + videoURL + "'>" + "<img src='" + item.thumbnails.medium.url + "'>" + "</a>" + "<div>");
	};

};