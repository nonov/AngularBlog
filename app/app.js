(function () {
	var blog = angular.module('areviaBlog', []);

	// Blog Controller 
	blog.controller('BlogController', [ '$http', '$scope', '$log', function ($http,$scope,$log) {
		$scope.articles = {};
		$http.get('/AngularBlog/posts.json').success(function (data) {
			$scope.articles = data;
		});
		$scope.doClick = function (id) {
			$scope.currentArticle = $scope.articles[id-1];
			var post = {
				id: id
			};
			// Receive posts link to the current article
			$http.post('/AngularBlog/includes/displayPosts.php', post).success(function (response) {
				if(response.length > 0) {
					$log.log("tab plein");
					$scope.comments = response;
					$log.log("Post received !");
					$scope.tabvide = false;
				} else {
					$log.log("tab vide");
					$scope.tabvide = true;
				}
			});
		};
		$scope.addPost = function (id) {
			var com = {
				id: id,
				content: $scope.message,
				firstname: $scope.firstname,
				email: $scope.email
			};
			// Send post to BD
			$http.post('/AngularBlog/includes/insertPost.php', com).success(function (data) {
				$log.log("Post sent !");
				$scope.message = "";
				$scope.firstname = "";
				$scope.email = "";
				$scope.tabvide = false;
			});
			var post = {
				id: id
			};
			// Receive posts link to the current article
			$http.post('/AngularBlog/includes/displayPosts.php', post).success(function (response) {
				$scope.comments = response;
				$log.log("Post update !");
			});
		};
		// Waiting for a Drop
		$scope.$watch('files', function () {
			console.log("here");
			$scope.upload();
		});

		// When Image is Dropped
		$scope.upload = function () {

			if (files && files.length) {

				for (var i = 0; i < files.length; i++) {
					var file = files[i];

					$upload.upload({
						url: url,
						headers: {
							nom: file.name
						},
						file: file
					}).progress(function (evt) {
						var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
						console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
					}).success(function (data, status, headers, config) {
						console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
					});
				}
			}
		};
		$scope.addArticle = function () {
			var art = {
				title: $scope.title,
				img_path: $scope.files
			};

		};
	} ]);

})();