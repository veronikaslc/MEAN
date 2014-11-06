function HeaderCtrl($scope, $http, $rootScope){

    $scope.$watch('userGlobalId', function(newvalue, oldvalue){
        if (angular.isDefined($rootScope.userGlobalId)) {
            getUser();
        }
    }, true);

    function renderServicesget(response) {
        $scope.globusername = response.name;
    }

    function  getUser(){
        $http.get('/people/'+$rootScope.userGlobalId)
            .success(renderServicesget);
    }





}