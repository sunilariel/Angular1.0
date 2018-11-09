app.controller("SignIn", ['$scope', '$http', '$timeout', '$location', '$window', '$rootScope', function ($scope, $http, $timeout, $location, $window, $rootScope) {
    //debugger;    
    $scope.ShowSignInScreen = {
        show: true,
        hide: true
    };
    $scope.username = "";
    $scope.Email = "";
    $scope.Password = "";
    $scope.IsVisible = false;
    var booluserexist = false;
    $scope.RedirecttoForgotPassword = function () {        
        $scope.ShowForgotScreen = {
            show: true,
            hide: true
        };
    }
    $scope.BacktoSignInScreen = function () {   
        $location.path('/signin');
        $scope.ShowSignInScreen = {
            show: true,
            hide: true
        };
        
    }
    $scope.signupPage = function () {
        $location.path('/');
    }
    
    $scope.submitTheForm = function (form) {
        //debugger;
        if (form.$invalid == true) {            
            if (form.email.$invalid == true) {
                $scope.IsVisible = true;
                $scope.MessageText = "Email is reauired";
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000)
                form.email.$touched = true;
                form.email.$setTouched();
            }
            else if (form.password.$invalid == true) {
                $scope.IsVisible = true;
                $scope.MessageText = "Password is reauired";
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000)
                form.password.$touched = true;
                form.password.$setTouched();
            }
            return false;
        }

        var dataobject = {
            Id: 1,
            //Name: $scope.username,
            Address: "aaa",
            Email: $scope.Email,
            Telephone: "123654789",
            PostCode: "a",
            Website: "a",
            County: "aaa",
            Town: "aaaaa",
            Description: "aa",
            Password: $scope.Password,
            CreationDate: "2017-05-22T05:55:21.9148617+00:00"
        }

        var data = JSON.stringify(dataobject);
        $scope.IsVisible = true;
        $scope.MessageText = "Signing In"
        //$timeout(function () {
        //    $scope.IsVisible = false;
        //}, 2000)
        $http.post("SignIn/postdata", { json: data }).success(function (data) {
            //debugger;
            if (data.success == true) {

                $scope.msg = "Post Data Submitted Successfully!";
                $scope.companyId = data.CompanyId;
                $rootScope.IsLoggedInUser = true;

                //  $timeout(function () { $scope.MessageText = "Your Details saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
                $scope.IsVisible = false;
                $location.path("/dashboard/" + $scope.companyId);
                $window.sessionStorage.setItem('userInfo-token', data.Token);
            }
            else if (data.includes("System.Net.WebException: The remote server returned an error")) {
                $scope.MessageText = "Invalid Credentials.";
                $timeout(function () { $scope.IsVisible = false; }, 1000);

            }
        })
            .error(function (e) {
                alert('Error!');
                //$timeout(function () { $scope.messagetext = "Invalid Credentials."; }, 500);
            });
    }


    $scope.resetpassword = function (form) {
        alert("reset pswd");
        //debugger;
        var dataemail = {
            Email: $scope.Email,
        }
    }

}
]);


