function LoginCtrl($scope, $http, $location, $rootScope){

	$scope.user = { name:'', password: '', friends: []};

	function renderLogin(response, status){
        console.log(response);
        $rootScope.userGlobalId = response._id;
        $location.path('/users');
	}

    function renderRegister(response){
        $location.path('/users/'+response.id);
    }

	$scope.Login = function (){
		$http.post('/login', JSON.stringify($scope.user))
	      	 .success(renderLogin)
            .error(function(error){
            alert(error);
        });
	}

	$scope.Register = function (){
		$http.post('/people', JSON.stringify($scope.user))
		    .success(renderRegister);
	}

}