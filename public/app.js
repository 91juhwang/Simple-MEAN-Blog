var app = angular.module('flapperNews', ["ui.router"])
// adding application configuration part. 

app.config([
	"$stateProvider",
	"$urlRouterProvider",
	function($stateProvider, $urlRouterProvider) {

		$stateProvider.state("home", {
			url: "/home",
			templateUrl: "/home.html",
			controller: "MainCtrl"
		})

		.state("posts", {
			url: "/posts/{id}",
			templateUrl: "/posts.html",
			controller: "PostsCtrl"
		})

		// redirecting back to home state, for bad url requests
		$urlRouterProvider.otherwise("home");
	}
])

// creating a provider (factory) to use it in the controller
app.factory("posts", [function(){
	var obj = {
		posts: []
	};
	return obj;
}])

app.controller('MainCtrl', [
	"$scope",
	"posts", 
	function($scope, posts){
	  $scope.posts = posts.posts; 

	  $scope.addPost = function() {
	  	if ($scope.title == "" || $scope.title == null) { return alert("Please enter the title")}
	  	$scope.posts.push({
	  		title: $scope.title, 
	  		link: $scope.link,
	  		upvotes: 0,
	  		comments: [
	  			{ author: "admin", body: "please add comments here", upvotes: 0}
	  		]
	  	});
	  	$scope.title = "";
	  	$scope.link = "";
	  }

	  $scope.incrementUpvotes = function(post) {
	  	post.upvotes += 1
	  }
	}
]);

app.controller("PostsCtrl", [
	"$scope",
	"$stateParams",
	"posts",
	function($scope, $stateParams, posts) {
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function() {
	  	if ($scope.body == "" || $scope.body == null) { return alert("Please enter the comment")}
	  	$scope.post.comments.push({
	  		author: "user",
	  		body: $scope.body, 
	  		upvotes: 0
	  	});
	  	$scope.body = "";
	  };

	  $scope.incrementUpvotes = function(comment) {
	  	comment.upvotes += 1
	  }
	}
])