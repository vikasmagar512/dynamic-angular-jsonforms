/**
 * Login component
 * @class login
 * @example
 * <login></login>
 */
(function() {
  'use strict';
  angular.module('incosa').component('login', {
    templateUrl: 'partials/login.html',
    controllerAs: 'vm',
    controller: [
      '$window',
      '$location',
      'loginService',
      function LoginController($window, $location, loginService) {
        $window.document.title = 'Login | Incosa Solutions';
        var vm = this;
        //vm.phoneRegex = "^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
        vm.error = '';
        vm.loader = false;
        vm.newUserForm = false;
        vm.options = [{ name: "admin", id: 1 }, { name: "manager", id: 2 }, { name: "operator", id: 3 }, { name: "user", id: 4 }];
        vm.newrole = vm.options[1];

        loginService.setToken(); //Why token is fist fetched and set for later user?

        vm.userRegisForm = function(isNewRegForm){
          vm.newUserForm = isNewRegForm;
          vm.error = '';
          if(!isNewRegForm){
            clearSignUpForm()
          }
          //login.$invalid = isNewRegForm;
        }

        var clearSignUpForm = function(){
          vm.newusername = null
          vm.newemail = null
          vm.neworganization = null
          vm.neworganization = null
          vm.newphone = null
          vm.newpassword = null
          vm.newcpassword = null
        }

        vm.onSignUpSubmit = function(isValid){
          if (isValid) {
            if(vm.newcpassword!=vm.newpassword){
              vm.error = "password doesn't match"
            } else {
              var userDetails = {
                username: vm.newusername, email: vm.newemail, "enabled": true,
                attributes: {company: vm.neworganization , phone:vm.newphone, role: vm.newrole },
                credentials: [{
                             type: "password",
                             value: vm.newpassword,
                             temporary: false
                         }]
              }
              vm.setLoader(true);
              loginService.getAdminToken().then(
                function(resp) {
                  loginService.createUser(resp.data.access_token, userDetails).then(
                    function(res) {
                      vm.setLoader(false);
                      clearSignUpForm();
                      vm.newUserForm = true
                  }, function(err) {
                    debugger;
                    vm.setLoader(false);
                    vm.error = loginService.handleError(err);
                    clearSignUpForm();
                  })
                },
                function(error) {
                  debugger;
                  vm.setLoader(false);
                  vm.error = loginService.handleError(error);
                  clearSignUpForm();
                });
            }
          }
        }

        vm.onSubmit = function(isValid) {
          if (isValid) {
            vm.setLoader(true);
            loginService.validateUser(vm.username, vm.password).then(
              function(resp) {
                sessionStorage.setItem('token', resp.data.access_token);
                $location.path('/dashboard');
                vm.setLoader(false);
              },
              function(error) {
                vm.setLoader(false);
                vm.error = loginService.handleError(error);
              }
            );
          }
        };

        vm.setLoader = function(visibility) {
          vm.loader = visibility;
        };
      }
    ]
  });
})();
