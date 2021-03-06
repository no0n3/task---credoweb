'use strict';

(function() {
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'authService', '$location', '$controller'];

    function LoginController($scope, authService, $location, $controller) {
        angular.extend(this, $controller('BaseController', {$scope: $scope}));

        $scope.loading = false;
        $scope.user = {};

        $scope.login = function(form) {
            if (form.email.$valid && form.password.$valid) {
                $scope.loading = true;

                authService
                    .login({
                        email : $scope.user.email,
                        password : $scope.user.password
                    })
                    .then(function(resp) {
                        if (true === resp.data.success) {
                            $location.path('/');
                        } else {
                            $scope.loading = false;
                        }
                    }, function() {
                        $scope.loading = false;
                    });
            }
        };

        $scope.goToSignup = function() {
            $location.path('/sign-up');
        };
    }
})();
