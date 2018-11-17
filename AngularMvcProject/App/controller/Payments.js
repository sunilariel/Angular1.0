app.controller("paymentsController", ['$scope', '$http', '$routeParams', '$filter', '$timeout', '$location', 'bookingService', '$rootScope', '$route',
    function ($scope, $http, $routeParams, $filter, $timeout, $location, bookingService, $rootScope, $route) {

        //Redirection to different pages////
        $scope.redirecttoCustomer = function () {
            $location.path("/customer/" + $routeParams.CompanyId);
        }

        $scope.redirectToCalendar = function () {
            $location.path("/Calendar/" + $routeParams.CompanyId);
        }

        $scope.RedirecttoStaff = function () {
            $location.path("/Setting/" + $routeParams.CompanyId);
        }
        $scope.redirecttodashboard = function () {
            $location.path("/dashboard/" + $routeParams.CompanyId);
        }

        $scope.redirecttoNotifications = function () {
            $location.path("/Payments/" + $routeParams.CompanyId);
            angular.element(document.querySelector("#redirecttonotificationsactive")).removeClass('active');
            angular.element(document.querySelector("#redirecttonotificationsactive")).addClass('active');
        }
        $scope.redirecttoServices = function () {
            debugger;
            $location.path("/Services/" + $routeParams.CompanyId);
            debugger
            $scope.init();
            var tttt = angular.element(document.querySelector("#redirecttoservicesactive"));
            tttt.addClass('active');
            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');
            debugger;
            angular.element(document.querySelector(".row_section")).removeClass('hidden');
            $scope.showAllServicesDiv = true;
            $scope.hidecategoryList = false;
            ////hidecategoryList
            ////$scope.showAddServiceDiv = true;
            //$scope.showAllServicesDiv = true;
            ////$scope.EditServiceDiv = true;
            ////$scope.showCategoryServicesDiv = true;
            //$scope.hidecategoryList = true;
            ////$scope.showcategoryList = true;           
        }

        $scope.RedirecttoReport = function () {
            $location.path("/BuisnessReports/" + $routeParams.CompanyId);
            angular.element(document.querySelector("#active-business")).addClass('active');
            angular.element(document.querySelector("#active-resource")).removeClass('active');
            angular.element(document.querySelector("#active-service")).removeClass('active');
            angular.element(document.querySelector("#active-customer")).removeClass('active');
        }

        $scope.RedirecttoResourceReport = function () {
            $location.path("/ResourceReports/" + $routeParams.CompanyId);
            angular.element(document.querySelector("#active-business")).removeClass('active');
            angular.element(document.querySelector("#active-resource")).addClass('active');
            angular.element(document.querySelector("#active-service")).removeClass('active');
            angular.element(document.querySelector("#active-customer")).removeClass('active');
        }

        $scope.RedirecttoServiceReport = function () {
            $location.path("/ServiceReports/" + $routeParams.CompanyId);
            angular.element(document.querySelector("#active-business")).removeClass('active');
            angular.element(document.querySelector("#active-resource")).removeClass('active');
            angular.element(document.querySelector("#active-service")).addClass('active');
            angular.element(document.querySelector("#active-customer")).removeClass('active');
        }

        $scope.RedirecttoCustomerReport = function () {
            $location.path("/CustomerReports/" + $routeParams.CompanyId);
            angular.element(document.querySelector("#active-business")).removeClass('active');
            angular.element(document.querySelector("#active-resource")).removeClass('active');
            angular.element(document.querySelector("#active-service")).removeClass('active');
            angular.element(document.querySelector("#active-customer")).addClass('active');
        }
        $scope.leftSideClick = function () {
            //angular.element(document.querySelector(".left_sidebar")).addClass('hidden');
            //$scope.custom = $scope.custom === false ? true : false;

            var state = $(this).data('state');

            state = !state;
            if (state) {

                $(".left_sidebar").addClass("show-leftbar");
            }
            else {
                $(".left_sidebar").removeClass("show-leftbar");
            }
            $(this).data('state', state);

            $scope.isActive = !$scope.isActive;
            //angular.element(document.querySelector(".left_sidebar")).removeClass('hijhko');

            //angular.element(document.querySelector(".left_sidebar")).css("display", "block");

        }
        $scope.init = function () {
            $scope.IsAdmin = bookingService.IsAdmin();
            //$scope.custom = true;


            $(".left_sidebar").removeClass("show-leftbar");
            var tttt = angular.element(document.querySelector("#redirecttoservicesactive"));
            tttt.addClass('active');
            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');

            //Get All Services of particular CompanyId//
            var responsedata = bookingService.GetCompanySmsPackges($routeParams.CompanyId);
            responsedata.then(function (response) {

                $scope.AllServices = [];
                $scope.AllServices = response.data;


            });
            var CompanyDetails = bookingService.GetCompanyDetails($routeParams.CompanyId);
            CompanyDetails.then(function (response) {

                $scope.companyEmail = response.data.Email;
            });
        }

        $scope.showServicePage = function () {
            debugger;
            angular.element(document.querySelector(".row_section")).removeClass('hidden');
            $scope.showAllServicesDiv = true;
            $scope.hidecategoryList = false;
            //$scope.init();
        }
        $scope.showServiceCPage = function () {
            debugger;
            $scope.init();
            angular.element(document.querySelector(".row_section")).removeClass('hidden');
            $scope.showAllServicesDiv = true;
            $scope.hidecategoryList = false;
            $scope.showCategoryServicesDiv = true;
            $scope.ServiceDividedByCategory = null;
            //$scope.init();
        }

        $scope.ShowCategoryService = function (item) {
            debugger;
            $scope.init();
            angular.element(document.querySelector(".row_section")).addClass('hidden');
            //angular.element(document.querySelector("#allservice")).removeClass("selected");
            $scope.CategoryName = item.Name;
            $scope.CategoryId = item.Id;
            var responsedata = bookingService.GetAllServiceForCategory(item.Id, $routeParams.CompanyId);
            responsedata.then(function (response) {

                if (response.data.length > 0) {
                    $scope.ServiceDividedByCategory = [];
                    $scope.ServiceDividedByCategory = response.data;
                }
                else {
                    $scope.ServiceDividedByCategory = [];
                    $scope.CategoryId = item.Id;
                    $scope.CategoryName = item.Name;
                }
            });

            $scope.showAddServiceDiv = true;
            $scope.showAllServicesDiv = true;
            $scope.EditServiceDiv = true;
            $scope.showCategoryServicesDiv = false;
        }

        $scope.showcategorypopups = function myfunction() {
            $scope.CategoryName = "";
            return !$scope.showcategorypopup;

        }

        $scope.EditService = function (item) {
            alert("You will be contacted soon");

        }

        $scope.Logout = function () {

            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }

    }]);

