(function () {
	var app = angular.module('areviaBlog', ['ModelCore']);

	// Blog Controller 
	app.controller('BlogController', [ '$http', function($http) {
		var blog = this;
		blog.articles = [];
		blog.comments = [];
		blog.requestData = [];
		$http.get('/AngularBlog/js/posts.json').success(function(data) {
			blog.articles = data;
		});
		blog.doClick = function(id) {
			blog.currentArticle = blog.articles[id-1];
		};
	} ]);

	app.controller('CommentFormController', ['$scope', function($scope) {
		app.factory("Comments",function(ModelCore) {
			return ModelCore.instance({
    $type : "Users", //Define the Object type
    $pkField : "idUser", //Define the Object primary key
    $settings : {
    	urls : {
    		base : "http://myapi.com/users/:idUser",
    	}
    },
    $myCustomMethod : function(info) { //yes you can create and apply your own custom methods
    	console.log(info);
    }
});
			$scope.comment = [
			{
				email:"",
				lastname:"",
				firstname:"",
				message:""
			}];
			$scope.submit = function() {
				$scope.comment.email.push(this.email);
				$scope.comment.lastname.push(this.lastname);
				$scope.comment.firstname.push(this.firstname);
				$scope.comment.message.push(this.message);
			};
		} ]);

	})();