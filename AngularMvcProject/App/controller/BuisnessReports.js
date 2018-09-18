app.controller('BuisnessReportsController', ['$scope', '$location', '$routeParams', 'bookingService', '$rootScope', function ($scope, $location, $routeParams, bookingService, $rootScope) {
    //Redirection to different tab section//
    //$scope.RedirecttoBuisnessReport = function () {
    //    $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    //}
    //$scope.RedirecttoResourceReport = function () {
    //    $location.path("/ResourceReports/" + $routeParams.CompanyId);
    //}
    //$scope.RedirecttoServiceReport = function () {
    //    $location.path("/ServiceReports/" + $routeParams.CompanyId);
    //}
    //$scope.RedirecttoCustomerReport = function () {
    //    $location.path("/CustomerReports/" + $routeParams.CompanyId);
    //}


    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }

    $scope.redirectToCalendar = function () {

        $location.path("/Calendar/" + $routeParams.CompanyId);
    }

    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }
    $scope.redirecttoServices = function () {
        $location.path("/Services/" + $routeParams.CompanyId);
        angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');
        angular.element(document.querySelector("#redirecttoservicesactive")).addClass('active');
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

    $scope.redirecttodashboard = function () {
        $location.path("/dashboard/" + $routeParams.CompanyId);
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
        debugger;
        //$scope.custom = true;
        $(".left_sidebar").removeClass("show-leftbar");
        $scope.hidereportsClicks = {
            show: true,
            hide: false
        };
        angular.element(document.querySelector("#active-business")).addClass('active');
        angular.element(document.querySelector("#active-resource")).removeClass('active');
        angular.element(document.querySelector("#active-service")).removeClass('active');
        angular.element(document.querySelector("#bookinhMgt-paymentMainTab")).removeClass('active');
        var tttt = angular.element(document.querySelector("#reportsClick_active"));
        tttt.addClass('active');
        $scope.BuisnessReportLoader = true;
        $scope.BookingReport = [];
        $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.Years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        $scope.Date = [];
        for (var i = 1; i <= 31; i++) {
            $scope.Date.push(i);

        }

        $scope.time = "thismonth";
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.SelectedStartMonth = $scope.Months[date.getMonth()];
        $scope.SelectedStartYear = date.getFullYear().toString();
        $scope.SelectedStartDate = date.getDate().toString();

        var EndDate = new Date(date);
        EndDate.setDate(date.getDate() + 15);

        $scope.SelectedEndMonth = $scope.Months[EndDate.getMonth()];
        $scope.SelectedEndYear = EndDate.getFullYear().toString();
        $scope.SelectedEndDate = (EndDate.getDate()).toString();


        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        var apirequest = bookingService.GetBusinessReport($routeParams.CompanyId, firstDay, lastDay);
        apirequest.then(function (response) {

            $scope.TotalBookings = response.data.TotalBookings;
            $scope.TotalRevenue = response.data.TotalRevenue;
            $scope.TotalCancellations = response.data.TotalCancellations;
            $scope.TotalBookingMadeExternally = response.data.TotalBookingMadeExternally;
            $scope.TotalBookingMadeInternally = response.data.TotalBookingMadeInternally;
            $scope.TotalEmailSent = response.data.TotalEmailSent;
            $scope.TotalMessagesSent = response.data.TotalMessagesSent;
            $scope.BookingReport.push({ "TotalBookings": response.data.TotalBookings, "TotalRevenue": response.data.TotalRevenue, "TotalCancellations": response.data.TotalCancellations, "TotalBookingMadeExternally": response.data.TotalBookingMadeExternally, "TotalBookingMadeInternally": response.data.TotalBookingMadeInternally, "TotalEmailSent": response.data.TotalEmailSent, "TotalMessagesSent": response.data.TotalMessagesSent })
            $scope.BuisnessReportLoader = false;
        })
    }


    //var tabelement1 = angular.element(document.querySelector("#businessreportactive"));
    //tabelement1.addClass('active');
    //angular.element(document.querySelector("#business_reportactive")).removeClass('active');

    $scope.RedirecttoBuisnessReport = function () {


        var tttt = angular.element(document.querySelector("#businessreportactive"));
        tttt.addClass('active');
        angular.element(document.querySelector("#reportsClick_active")).removeClass('active');
        $scope.hideRedirecttoBuisnessReport = {
            show: true,
            hide: false
        };
    }

    //$scope.RedirecttoResourceReport = function () { 
    //    var tttt = angular.element(document.querySelector("#ResourceReportactive"));
    //    tttt.addClass('active');       
    //}
    //$scope.RedirecttoServiceReport = function () {        
    //    $scope.hideRedirecttoServiceReport = {
    //        show: true,
    //        hide: false
    //    };        
    //}
    //$scope.RedirecttoCustomerReport = function () {                
    //    $scope.hideRedirecttoCustomerReport = {
    //        show: true,
    //        hide: false
    //    };        
    //}

    $scope.reportsClick = function () {
        $scope.hidereportsClick = {
            show: true,
            hide: false
        };
        $scope.hidereportsClicks = {
            show: false,
            hide: true
        };
        var tttt = angular.element(document.querySelector("#reportsClick_active"));
        tttt.addClass('active');

        angular.element(document.querySelector("#businessreportactive")).removeClass('active');
    }


    $scope.GetTimeFrame = function (TimeFrame) {
        $scope.BuisnessReportLoader = true;
        $scope.BookingReport = [];

        if (TimeFrame == "today") {
            $scope.CustomTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.CustomTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.CustomTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.CustomTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {

            $scope.CustomTimeFrame = true;
            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        var apirequest = bookingService.GetBusinessReport($routeParams.CompanyId, firstDay, lastDay);
        apirequest.then(function (response) {
            $scope.TotalBookings = response.data.TotalBookings;
            $scope.TotalRevenue = response.data.TotalRevenue;
            $scope.TotalCancellations = response.data.TotalCancellations;
            $scope.TotalBookingMadeExternally = response.data.TotalBookingMadeExternally;
            $scope.TotalBookingMadeInternally = response.data.TotalBookingMadeInternally;
            $scope.TotalEmailSent = response.data.TotalEmailSent;
            $scope.TotalMessagesSent = response.data.TotalMessagesSent;
            $scope.BookingReport.push({ "TotalBookings": response.data.TotalBookings, "TotalRevenue": response.data.TotalRevenue, "TotalCancellations": response.data.TotalCancellations, "TotalBookingMadeExternally": response.data.TotalBookingMadeExternally, "TotalBookingMadeInternally": response.data.TotalBookingMadeInternally, "TotalEmailSent": response.data.TotalEmailSent, "TotalMessagesSent": response.data.TotalMessagesSent })
            $scope.BuisnessReportLoader = false;
        })
    }

    $scope.GetTimeFrameReports = function () {

        $scope.BuisnessReportLoader = true;
        $scope.BookingReport = [];

        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        var apirequest = bookingService.GetBusinessReport($routeParams.CompanyId, firstDay, lastDay);
        apirequest.then(function (response) {
            $scope.TotalBookings = response.data.TotalBookings;
            $scope.TotalRevenue = response.data.TotalRevenue;
            $scope.TotalCancellations = response.data.TotalCancellations;
            $scope.TotalBookingMadeExternally = response.data.TotalBookingMadeExternally;
            $scope.TotalBookingMadeInternally = response.data.TotalBookingMadeInternally;
            $scope.TotalEmailSent = response.data.TotalEmailSent;
            $scope.TotalMessagesSent = response.data.TotalMessagesSent;
            $scope.BookingReport.push({ "TotalBookings": response.data.TotalBookings, "TotalRevenue": response.data.TotalRevenue, "TotalCancellations": response.data.TotalCancellations, "TotalBookingMadeExternally": response.data.TotalBookingMadeExternally, "TotalBookingMadeInternally": response.data.TotalBookingMadeInternally, "TotalEmailSent": response.data.TotalEmailSent, "TotalMessagesSent": response.data.TotalMessagesSent })
            $scope.BuisnessReportLoader = false;
        })
    }

    $scope.Logout = function () {
        $rootScope.IsLoggedInUser = false;
        var apirequest = bookingService.SignOut();
        sessionStorage.removeItem('userInfo-token');
        $location.path("/signin");
    }

}
])