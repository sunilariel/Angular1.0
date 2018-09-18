﻿app.controller('ServiceReportsController', ['$scope', '$routeParams', '$location', 'bookingService','$rootScope', function ($scope, $routeParams, $location, bookingService,$rootScope) {

    //Redirection to different tab section//
    $scope.RedirecttoBuisnessReport = function () {
        
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }
    //$scope.RedirecttoResourceReport = function () {
    //    $location.path("/ResourceReports/" + $routeParams.CompanyId);
    //}
    //$scope.RedirecttoServiceReport = function () {
    //    $location.path("/ServiceReports/" + $routeParams.CompanyId);
    //}
    //$scope.RedirecttoCustomerReport = function () {
    //    $location.path("/CustomerReports/"+ $routeParams.CompanyId);
    //}

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

    $scope.redirecttoCustomer = function () {
        $location.path("/customer/" + $routeParams.CompanyId);
    }
    $scope.redirectToCalendar = function () {
        $location.path("/Calendar/" + $routeParams.CompanyId);
    }

    $scope.redirecttodashboard = function () {
        $location.path("/dashboard/" + $routeParams.CompanyId);
    }
    $scope.RedirecttoStaff = function () {
        $location.path("/Setting/" + $routeParams.CompanyId);
    }
    $scope.redirecttoServices = function () {
        $location.path("/Services/" + $routeParams.CompanyId);
        angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');
        angular.element(document.querySelector("#redirecttoservicesactive")).addClass('active');
    }

    $scope.GetTimeFrame = function (TimeFrame) {
        debugger;
        var ReportCount=false;
        $scope.ServiceReportsloader = true;
        if (TimeFrame == "today") {
            $scope.ServiceTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.ServiceTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.ServiceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.ServiceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {
            $scope.ServiceTimeFrame = true;
            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }
        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        $scope.ServiceReport = [];

        if ($scope.allservicechecked == true) {
            var apirequest = bookingService.getServicesData($routeParams.CompanyId);
            $scope.Services = "";
            apirequest.then(function (response) {
                if (response.data.length != 0)
                {
                    angular.forEach(response.data, function (value, key) {
                        $scope.Services = value.Id + "," + $scope.Services;
                    })
                    $scope.commaSeperatedServiceIds = $scope.Services.substring(0, $scope.Services.length - 1)

                    var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.commaSeperatedServiceIds, firstDay, lastDay);
                    apireportrequest.then(function (response) {
                   
                  
                        angular.forEach(response.data, function (value, key) {
                            ReportCount=true;
                            $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£"+value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations +"%" });
                            $scope.ServiceReportsloader = false;
                        })
                        if (ReportCount==false) {
                            $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                            $scope.ServiceReportsloader = false;
                        }
                    })
                }
                else {
                  
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }


            })

        }
        else {
            if($scope.SelectedService!=null){
            var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedService, firstDay, lastDay);
            apireportrequest.then(function (response) {               
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
            }
            else {
                $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                $scope.ServiceReportsloader = false;
            }
        }
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
        //$scope.custom = true;


        $(".left_sidebar").removeClass("show-leftbar");
        $scope.hidethisServiceReport = {
            hide: true
        };
        $scope.showthisServiceReport = {
            show: true,
        };
        angular.element(document.querySelector("#active-business")).removeClass('active');
        angular.element(document.querySelector("#active-resource")).removeClass('active');
        angular.element(document.querySelector("#active-service")).addClass('active');
        angular.element(document.querySelector("#bookinhMgt-paymentMainTab")).removeClass('active');

        var tttt = angular.element(document.querySelector("#servicereportactive"));
        tttt.addClass('active');
        debugger;
        $scope.ServiceExist=true;
        $scope.toggle = true;
        var ReportCount = 0;
        //var apirequest = bookingService.getServicesData($routeParams.CompanyId);
        //apirequest.then(function (response) {
        //    if(response.data.length !=0)
        //    {
        //        $scope.ServiceReportsloader = true;
        //    }
        //    else {
        //        $scope.ServiceReportsloader = false;
        //    }
        //})
        //$scope.ServiceReportsloader = true;
        $scope.ServiceTimeFrame = false;
        $scope.allservicechecked = false;
        $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.Years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        $scope.Date = [];
        for (var i = 1; i <= 31; i++) {
            $scope.Date.push(i);

        }
        $scope.time = "thismonth";      
        var date = new Date();
        $scope.Services = "";
        $scope.ServiceReport = [];
        $scope.ListofServices = [];
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;

        $scope.SelectedStartMonth = $scope.Months[date.getMonth()];
        $scope.SelectedStartYear = date.getFullYear().toString();
        $scope.SelectedStartDate = date.getDate().toString();

        var EndDate = new Date(date);
        EndDate.setDate(date.getDate() + 15);

        $scope.SelectedEndMonth = $scope.Months[EndDate.getMonth()];
        $scope.SelectedEndYear = EndDate.getFullYear().toString();
        $scope.SelectedEndDate = (EndDate.getDate()).toString();


               
        var apirequest=bookingService.getServicesData($routeParams.CompanyId);
        apirequest.then(function (response) {
            if (response.data.length != 0) {
                $scope.ServiceReportsloader = true;
            angular.forEach(response.data, function (value, key) {
                $scope.ListofServices.push({ "Id": value.Id, "Service": value.Name });                            
            })
            $scope.SelectedService = response.data[0].Id.toString();
       
            $scope.ServiceReport = [];
            var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedService, firstDay, lastDay);
            apireportrequest.then(function (response) {           
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
            }
            else
            {
                $scope.ServiceExist = false;
                $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                $scope.ServiceReportsloader = false;
            }
        })
    
    }


    $scope.reportsClick = function () {
        //$scope.showreportsClick = {
        //    show: true
        //};
        //$scope.hidereportsClick = {
        //    hide: true
        //};
        var tttt = angular.element(document.querySelector("#reportsClick_active"));
        tttt.addClass('active');
        angular.element(document.querySelector("#servicereportactive")).removeClass('active');
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }

    $scope.GetTimeFrameReports = function () {       
        var ReportCount = false;
       
        $scope.ServiceReport = [];

        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        var apirequest = bookingService.getServicesData($routeParams.CompanyId);
        apirequest.then(function (response) {
            if (response.data.length != 0) {
                $scope.ServiceReportsloader = true;
                angular.forEach(response.data, function (value, key) {
                    $scope.Services = value.Id + "," + $scope.Services;
                })
                $scope.commaSeperatedServiceIds = $scope.Services.substring(0, $scope.Services.length - 1)

                var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.commaSeperatedServiceIds, firstDay, lastDay);
                apireportrequest.then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                        $scope.ServiceReportsloader = false;
                    })
                    if (ReportCount == false) {
                        $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                        $scope.ServiceReportsloader = false;
                    }
                })

            }
            else {
                $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                $scope.ServiceReportsloader = false;
            }
        })
    }

    $scope.GetAllServicesReport=function(checked)
    {
        
        var ReportCount = false;
        $scope.allservicechecked = true;
      
        $scope.ServiceReport = [];
        if(checked==true)
        {
            var apirequest=bookingService.getServicesData($routeParams.CompanyId);
            apirequest.then(function (response) {
                if (response.data.length != 0) {
                    $scope.ServiceReportsloader = true;
                    angular.forEach(response.data, function (value, key) {
                        $scope.Services = value.Id + "," + $scope.Services;
                    })

                    $scope.commaSeperatedServiceIds = $scope.Services.substring(0, $scope.Services.length - 1)

                    var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.commaSeperatedServiceIds, $scope.StartDate, $scope.EndDate);
                    apireportrequest.then(function (response) {

                        angular.forEach(response.data, function (value, key) {
                            ReportCount = true;
                            $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                            $scope.ServiceReportsloader = false;
                        })
                        if (ReportCount == false) {
                            $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                            $scope.ServiceReportsloader = false;
                        }
                    })
                }
                else {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }

            })
        }
        else {
            if($scope.SelectedService!=null){
                $scope.allservicechecked = false;
            var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedService, $scope.StartDate, $scope.EndDate);
            apireportrequest.then(function (response) {
                
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
            }
            else {
                $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                $scope.ServiceReportsloader = false;
            }
        }
    }

    $scope.ServiceChange = function (Id) {
        
        var ReportCount = false;
        $scope.ServiceReportsloader = true;
        $scope.ServiceReport = [];
        var apireportrequest = bookingService.GetServiceReportsBetweenDates($routeParams.CompanyId, Id, $scope.StartDate, $scope.EndDate);
        apireportrequest.then(function (response) {
          
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£"+value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations +"%" });
                    $scope.ServiceReportsloader = false;
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                    $scope.ServiceReportsloader = false;
                }
            })
    }

    $scope.GetServiceReportByOrder = function (Field) {
        var ReportCount = false;
        $scope.toggle = !$scope.toggle;
        //if ($scope.toggle == true) {
        //    $scope.Order = "ASC";
        //}
        //else {
        //    $scope.Order = "DESC";
        //}
        $scope.ServiceReport = [];
        if ($scope.allservicechecked == true) {
            var apireportrequest = bookingService.GetServiceReportsBetweenDatesByOrder($routeParams.CompanyId, $scope.commaSeperatedServiceIds, $scope.StartDate, $scope.EndDate, $scope.toggle, Field);
            apireportrequest.then(function (response) {
                $scope.ServiceReport = [];
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });                    
                }
            })
        }
        else {
            var apireportrequest = bookingService.GetServiceReportsBetweenDatesByOrder($routeParams.CompanyId, $scope.SelectedService, $scope.StartDate, $scope.EndDate, $scope.toggle, Field);
            apireportrequest.then(function (response) {
                $scope.ServiceReport = [];
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ServiceReport.push({ "Service": value.ServiceName, "Category": value.CategoryName, "Booking": value.TotalBookings, "Revenue": "£" + value.TotalConfirmedRevenue, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%" });
                })
                if (ReportCount == false) {
                    $scope.ServiceReport.push({ "Service": "", "Category": "", "Booking": "", "Revenue": "No Records to display", "Cancellations": "", "CancellationRate": "" });
                }
            })
        }
    }
    $scope.Logout = function () {
        $rootScope.IsLoggedInUser = false;
        var apirequest = bookingService.SignOut();
        sessionStorage.removeItem('userInfo-token');
        $location.path("/signin");
    }

}])