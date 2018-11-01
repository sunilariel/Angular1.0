app.controller("CustomerReportsController", ['$scope', '$routeParams', '$location', 'bookingService', '$rootScope', '$timeout', function ($scope, $routeParams, $location, bookingService, $rootScope, $timeout) {
    //Redirection to different tab section//
    $scope.RedirecttoBuisnessReport = function () {

        $location.path("/BuisnessReports/:CompanyId");
    }
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


    $scope.ListofCustomers = [];

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
        debugger;
        $(".left_sidebar").removeClass("show-leftbar");
        $scope.hidethisCustomerReport = {
            hide: true
        };
        $scope.showthisCustomerReport = {
            show: true,
        };
        angular.element(document.querySelector("#active-business")).removeClass('active');
        angular.element(document.querySelector("#active-resource")).removeClass('active');
        angular.element(document.querySelector("#active-service")).removeClass('active');
        angular.element(document.querySelector("#bookinhMgt-paymentMainTab")).addClass('active');
        var tttt = angular.element(document.querySelector("#customerreportactive"));
        tttt.addClass('active');
        debugger;
        $scope.CustomerExists = true;
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

        $scope.CustomerIds = "";
        var customerhttprequest = bookingService.GetAllCustomer($routeParams.CompanyId);
        customerhttprequest.then(function (response) {
            debugger;
            if (response.data.length != 0) {
                $scope.CustomerReportLoader = true;
                for (var i = 0; i < response.data.length; i++) {
                    $scope.CustomerIds = response.data[i].Id + "," + $scope.CustomerIds;
                    $scope.ListofCustomers = response.data;
                }
                $scope.SelectedCustomer = $scope.ListofCustomers[0].Id.toString();
                $scope.CustomerReportIds = $scope.CustomerIds.substring(0, $scope.CustomerIds.length - 1);

                $scope.CustomerReportDetail = [];
                var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.SelectedCustomer, $scope.StartDate, $scope.EndDate);
                httprequest.then(function (response) {
                    debugger;
                    angular.forEach(response.data, function (value, key) {
                        $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                    })
                    $scope.CustomerReportLoader = false;
                })
            }
            else {
                $scope.CustomerReportDetail = [];
                $scope.CustomerExists = false;
                $scope.CustomerReportLoader = false;
                $scope.CustomerReportDetail.push({ "Customer": " ", "Bookings": "No Records to display", "Revenue": " " });
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
        angular.element(document.querySelector("#customerreportactive")).removeClass('active');
        $location.path("/BuisnessReports/" + $routeParams.CompanyId);
    }

    $scope.GetTimeFrame = function (TimeFrame) {
        debugger;
        $scope.CustomerReportLoader = true;
        $scope.BookingReport = [];

        if (TimeFrame == "today") {
            $scope.CustomerReportTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.CustomerReportTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.CustomerReportTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.CustomerReportTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {

            $scope.CustomerReportTimeFrame = true;
            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        $scope.CustomerReportDetail = [];
        if ($scope.CustomerExists == true) {
            if ($scope.allcustomerchecked == true) {
                var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
                httprequest.then(function (response) {
                    debugger;
                    if (Object.keys(response.data).length != 0) {
                        angular.forEach(response.data, function (value, key) {
                            $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                        })
                        $scope.CustomerReportLoader = false;
                    }
                    else {
                        $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                        $scope.CustomerReportLoader = false;
                    }
                })
            }
            else {
                var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.SelectedCustomer, $scope.StartDate, $scope.EndDate);
                httprequest.then(function (response) {
                    debugger;
                    if (Object.keys(response.data).length != 0) {
                        angular.forEach(response.data, function (value, key) {
                            $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                        })
                        $scope.CustomerReportLoader = false;
                    }
                    else {
                        $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                        $scope.CustomerReportLoader = false;
                    }
                })
            }
        }
        else {
            $scope.CustomerReportLoader = false;
            $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
        }
    }

    $scope.GetTimeFrameReports = function () {
        debugger;
        $scope.BookingReport = [];
        $scope.CustomerReportLoader = true;
        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;


        $scope.CustomerReportDetail = [];
        if ($scope.CustomerExists == true) {
            {
                if ($scope.allcustomerchecked == true) {
                    var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
                    httprequest.then(function (response) {
                        if (Object.keys(response.data).length != 0) {
                            angular.forEach(response.data, function (value, key) {
                                $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                            })
                            $scope.CustomerReportLoader = false;
                        }
                        else {
                            $scope.CustomerReportLoader = false;
                            $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                        }

                    })
                }
                else {
                    var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
                    httprequest.then(function (response) {
                        debugger;
                        if (Object.keys(response.data).length != 0) {
                            angular.forEach(response.data, function (value, key) {
                                $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                            })
                            $scope.CustomerReportLoader = false;
                        }
                        else {
                            $scope.CustomerReportLoader = false;
                            $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                        }
                    })
                }
            }
        }
        else {
            $scope.CustomerReportLoader = false;
            $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
        }


    }

    $scope.Logout = function () {
        $rootScope.IsLoggedInUser = false;
        var apirequest = bookingService.SignOut();
        sessionStorage.removeItem('userInfo-token');
        $location.path("/signin");
    }

    $scope.GetCustomerReportbyOrder = function (field) {
        debugger;
        $scope.toggle = !$scope.toggle;
        //if ($scope.toggle == true) {
        //    $scope.Order = "false";
        //}
        //else {
        //    $scope.Order = "true"
        //}
        $scope.CustomerReportDetail = [];
        if ($scope.allcustomerchecked == false) {
            var apirequest = bookingService.GetCustomerReportsBetweenDatesByOrder($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate, $scope.toggle, field);
            apirequest.then(function (response) {
                debugger;
                if (Object.keys(response.data).length != 0) {
                    $scope.CustomerReportDetail = [];
                    angular.forEach(response.data, function (value, key) {
                        $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                    })
                }
                else {
                    $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                }
            })
        }
        else {
            var apirequest = bookingService.GetCustomerReportsBetweenDatesByOrder($routeParams.CompanyId, $scope.SelectedCustomer, $scope.StartDate, $scope.EndDate, $scope.toggle, field);
            apirequest.then(function (response) {
                debugger;
                if (Object.keys(response.data).length != 0) {
                    $scope.CustomerReportDetail = [];
                    angular.forEach(response.data, function (value, key) {
                        $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                    })
                }
                else {
                    $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                }
            })
        }
    }

    $scope.GetAllCustomerReport = function (item) {
        debugger;
        $scope.CustomerReportDetail = [];
        $scope.CustomerReportsloader = true;
        var ReportCount = false;
        $scope.allcustomerchecked = item;
        if ($scope.ListofCustomers.length != 0) {
            if ($scope.allcustomerchecked == true) {

                var customerhttprequest = bookingService.GetAllCustomer($routeParams.CompanyId);
                customerhttprequest.then(function (response) {
                    debugger;
                    $scope.CustomerIds = "";
                    if (response.data.length != 0) {

                        $scope.CustomerReportLoader = true;
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.CustomerIds = response.data[i].Id + "," + $scope.CustomerIds;
                            $scope.ListofCustomers = response.data;
                        }

                        $scope.CustomerReportIds = $scope.CustomerIds.substring(0, $scope.CustomerIds.length - 1);

                        var apirequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.CustomerReportIds, $scope.StartDate, $scope.EndDate);
                        apirequest.then(function (response) {
                            angular.forEach(response.data, function (value, key) {
                                ReportCount = true;
                                $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                            })
                            if (ReportCount == false) {
                                $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                            }
                            $scope.CustomerReportLoader = false;
                        })
                    }
                })

            }
            else {
                var apirequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, $scope.SelectedCustomer, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                    })
                    if (ReportCount == false) {
                        $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                    }
                    $scope.CustomerReportLoader = false;
                })
            }
        }
    }

    $scope.CustomerChange = function (Id) {
        debugger;

        $scope.CustomerReportLoader = true;
        $scope.CustomerReportDetail = [];
        var ReportCount = false;
        var httprequest = bookingService.GetCustomerReportsBetweenDates($routeParams.CompanyId, Id, $scope.StartDate, $scope.EndDate);
        httprequest.then(function (response) {
            debugger;
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                $scope.CustomerReportDetail.push({ "Customer": value.Customer.FirstName, "Bookings": value.TotalBookings, "Revenue": "" + value.TotalConfirmedRevenue });
                $scope.CustomerReportLoader = false;
            })
            $scope.CustomerReportLoader = false;
            if (ReportCount == false) {
                $scope.CustomerReportDetail.push({ "Customer": "    ", "Bookings": "No Records to display", "Revenue": "    " });
                $scope.CustomerReportLoader = false;
            }
        })
    }



    $scope.SetWorkingHours = function (timedata) {
        debugger;
        var buisnesshour = {
            Id: "",
            CompanyId: $routeParams.CompanyId,
            Start: timedata.timeFrom,
            End: timedata.timeTo,
            NameOfDay: timedata.day,
            IsOffAllDay: timedata.available == true ? false : true,
            CreationDate: new Date(),
        }

        var apirequest = bookingService.SetCompanyWorkingHours(buisnesshour);
        apirequest.then(function (response) {
            if (response.data.Success == true) {
                $scope.MessageText = "Saving buisness Hours";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Buisness Hours Saved"
                    $timeout(function () {
                        $scope.IsVisible = false;
                    }, 1000)
                }, 800)
            }
        })
    }

    $scope.timeInfFrom = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];


    $scope.timeInfoTo = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];

    $scope.businessHourInfo = [{ 'day': 'Monday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 1 },
    { 'day': 'Tuesday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 2 },
    { 'day': 'Wednesday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 3 },
    { 'day': 'Thursday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 4 },
    { 'day': 'Friday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': true, 'NameOfDay': 5 },
    { 'day': 'Saturday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': false, 'NameOfDay': 6 },
    { 'day': 'Sunday', 'timeFrom': "08:00 AM", 'timeTo': "05:00 PM", 'available': false, 'NameOfDay': 0 },]

    $scope.switchOnOff = function (item) {
        debugger;
        for (var i = 0; i < $scope.businessHourInfo.length; i++)
        // if (item.day != "Sunday" && item.day != "Saturday") {
        {
            if (item.day == $scope.businessHourInfo[i].day) {
                if (item['available'] == true) {
                    $scope.businessHourInfo[i].available = false;

                    var buisnesshour = {
                        Id: "",
                        CompanyId: $routeParams.CompanyId,
                        Start: item.timeFrom,
                        End: item.timeTo,
                        NameOfDay: item.day,
                        IsOffAllDay: true,
                        CreationDate: new Date(),
                    }
                }
                else {
                    $scope.businessHourInfo[i].available = true;

                    var buisnesshour = {
                        Id: "",
                        CompanyId: $routeParams.CompanyId,
                        Start: item.timeFrom,
                        End: item.timeTo,
                        NameOfDay: item.day,
                        IsOffAllDay: false,
                        CreationDate: new Date(),
                    }
                }
                break;
            }
        }
        var apirequest = bookingService.SetCompanyWorkingHours(buisnesshour);
        apirequest.then(function (response) {
            debugger;
            if (response.data.Success == true) {
                $scope.MessageText = "Saving buisness Hours";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.MessageText = "Buisness Hours Saved"
                    $timeout(function () {
                        $scope.IsVisible = false;
                    }, 1000)
                }, 800)
            }
        })
    }





}])