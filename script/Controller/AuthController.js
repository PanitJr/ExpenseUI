(function(){

  angular
       .module('auth')
       .controller('AuthController', [
                   'apiService','$cookies','$location','$log', '$q','$rootScope','$mdDialog',
          AuthController
       ]);


  function AuthController(apiService,$cookies,$location,$log , $q,$rootScope,$mdDialog) {
    var self = this;
    self.email = null;
    self.password = null;
    self.data = {};
    self.login = login;
    self.logout = logout;
    self.setLayout = setLayout;
    self.confirm =  {};

    var body = {
      layout:'views/layout/layout.html',
      login:'views/auth/login.html'
    };

    window.loginGoogle = loginGoogle;

    function login()
    {
      apiService.post('login',{ "u":self.email,"p":self.password})
      .then(
        function(response){
          var result = response.data;
          if(result.success)
          {
            self.data = result.data;
            $cookies.put('auth_token',result.data.token);

            setLayout();
          }
          else{
            self.error_massage = result.error_massage;
          }
        }
      );
    }

    function loginGoogle(googleUser) {
      var profile = googleUser.getBasicProfile();
      if(profile){

          apiService.post('logingoogle', {"u": profile.getEmail(),"Fname":profile.getGivenName(),"Lname":profile.getFamilyName()})
            .then(
                function (response) {
                  console.log(response);
                  var result = response.data;
                  if (result.success) {
                      gapi.auth2.getAuthInstance().signOut();
                    //self.data = result.data;
                        $cookies.put('auth_token', result.data.token);
                        $rootScope.permissions= result.data.permissions;
                    setLayout();
                  }
                  else {
                     // gapi.auth2.getAuthInstance().signOut();
                    self.error_massage = result.error_massage;
                     // window.location.reload();
                  }
                }
            );
      }else{
        self.error_massage = result.error_massage;
      }
    }

      self.showConfirm = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
           self.confirm = $mdDialog.confirm()
              .title('Would you like to delete your debt?')
              .textContent('All of the banks have agreed to forgive you your debts.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Please do it!')
              .cancel('Sounds like a scam');

          $mdDialog.show(self.confirm).then(function() {
              logout();
          }, function() {

          });
      };

    function logout()
    {
        //  var auth2 = gapi.auth2.getAuthInstance();
        $cookies.remove('auth_token');
        //console.log('User signed out.');
        //window.location.reload();
        setLayout();
    }

    function setLayout()
    {
      if(typeof $cookies.get('auth_token') !=="undefined")
      {
        apiService.authpost("current_user",{})
        .success(function(result){
          //$rootScope.username = result.data.user.name;
            //console.debug('user',result.data.user);
          self.data = result.data.user;
          setLayoutWithName("layout");
        })
        .error(function(error){
            //setLayoutWithName("layout");
          setLayoutWithName("login");
        });
      }
      else{
          //setLayoutWithName("layout");
        setLayoutWithName("login");
      }
    }


    function setLayoutWithName(name)
    {
      if($rootScope._body != body[name]){
        $rootScope._body = body[name];
      }
    }
  }

})();
