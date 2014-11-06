function UsersCtrl($scope, $http, $rootScope){

    function renderServicesget(response) {
        $scope.users = response;
    }

    function renderServicesremove(response) {
        getList();
    }

    function renderServicesadd(response){
        alert('added');
    }

    function  getList(){
        $http.get('/people')
            .success(renderServicesget);
    }

    $scope.Remove = function (id){
        alert(id);
        $http.delete('/people/'+id)
            .success(renderServicesremove);
    }

    $scope.Add = function (id){
        $http.post('/people/add/'+$rootScope.userGlobalId, JSON.stringify({friendid: id}))
            .success(renderServicesadd);
    }

    getList();

}