﻿//var app = angular.module("bookingApp", []);
app.controller("SignUp", ['$scope', '$http', '$timeout', '$location', '$rootScope', '$routeParams', 'bookingService', '$window', function ($scope, $http, $timeout, $location, $rootScope, $routeParams, bookingService, $window) {
    //debugger;
    $scope.username = "";
    $scope.Email = "";
    $scope.Password = "";
    $scope.IsVisible = false;
    var booluserexist = false;

    $scope.signin = function () {
        $location.path('/signin');
    }

    $scope.submitTheForm = function (form) {
        debugger;

        if (form.$invalid === true) {
            if (form.username.$invalid === true) {
                $scope.IsVisible = true;
                $scope.MessageText = "Name field cannot be blank";
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000)
                form.username.$touched = true;
                form.username.$setTouched();
                return false;
            }
            if (form.email.$invalid === true) {
                $scope.IsVisible = true;
                $scope.MessageText = "Email field cannot be blank";
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000)
                form.email.$touched = true;
                form.email.$setTouched();   
                return false;
            }            
            if (form.password.$invalid === true) {
                form.password.$touched = true;
                form.password.$setTouched();
            }
            return false;
        }

        $scope.IsVisible = true;
        $scope.MessageText = "Checking availability"

        //Checking User Existence//
        var apirequest = bookingService.CheckUserExist($scope.Email);
        apirequest.then(function (response) {
            //debugger;
            if (response.data === "true") {
                $scope.MessageText = "User is already exist";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                    return false;
                }, 1000)
            }
            else {
                var dataobject = {
                    Id: -1,
                    Name: $scope.username,
                    Address: "aaa",
                    Email: $scope.Email,
                    Telephone: "123654789",
                    PostCode: "a",
                    Website: "a",
                    County: "aaa",
                    Town: "aaaaa",
                    Description: "aa", 
                    //UniqueReference:"4254b8fb-09f0-48e7-9f76-3516d1fc91c4",
                    Password: $scope.Password,
                    CreationDate: "2017-05-22T05:55:21.9148617+00:00"
                }
                $rootScope.LoginEmail = $scope.Email;
                $rootScope.LoginUsername = $scope.username;
                var apirequest = bookingService.SignUp(dataobject);
                apirequest.then(function (response) {
                    if (response.data.Success === true) {
                        // alert(response.data.ReturnObject.AuthToken);
                        $rootScope.SignUpCompanyId = response.data.ReturnObject.CompanyId;
                        $window.sessionStorage.setItem('userInfo-token', response.data.ReturnObject.AuthToken);
                        $scope.IsVisible = true;
                        $scope.MessageText = "Saving Data";
                        $timeout(function () {
                            $scope.MessageText = "Your Details saved.";
                            $timeout(function () {
                                $scope.IsVisible = false;
                                $location.path('/wizard');
                            }, 800)
                        }, 1000)
                    }
                })
            }
        })


        //var data = JSON.stringify(dataobject);

        //$http.post("SignUp/postdata", { json: data }).success(function (data) {
        //    //debugger;
        //    $scope.IsVisible = true;
        //    $scope.MessageText = "Checking availability";
        //    if(data.success==true){
        //        $scope.IsVisible = true;
        //        $scope.MessageText ="Saving Data"
        //        $scope.msg = "Post Data Submitted Successfully!";

        //        $timeout(function () { $scope.MessageText = "Your Details saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);

        //        $location.path('/wizard');
        //    }
        //    //else if(data.success=="UserExits")
        //    //{
        //    //    $scope.IsVisible = true;
        //    //    $scope.MessageText = "Saving Data"
        //    //    $scope.msg = "Post Data Submitted Successfully!";

        //    //    $timeout(function () { $scope.MessageText = "User alreay exist"; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
        //    //}
        //})
        //.error(function (e) {             
        //    alert('Error!');              
        //});



    }
}
]);