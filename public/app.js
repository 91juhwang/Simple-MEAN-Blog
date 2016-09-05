angular.module('flapperNews', [])
.factory("posts", [function(){
	var obj = {
		posts: [{title: "post 1", link:"df", upvotes: 0}]
	};
	return obj;
}])
.controller('MainCtrl', [
	"$scope",
	"posts", 
	function($scope, posts){
	  $scope.posts = posts.posts; 

	  $scope.addPost = function() {
	  	if ($scope.title == "" || $scope.title == null) { return alert("Please enter the title")}
	  	$scope.posts.push({
	  		title: $scope.title, 
	  		link: $scope.link,
	  		upvotes: 0
	  	});
	  	$scope.title = "";
	  	$scope.link = "";
	  }

	  $scope.incrementUpvotes = function(post) {
	  	post.upvotes += 1
	  }
	}
]);