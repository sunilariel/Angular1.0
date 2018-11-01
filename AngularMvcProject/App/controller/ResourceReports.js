app.controller("ResourceReportsController", ['$scope', '$location', 'bookingService', '$routeParams', '$timeout', function ($scope, $location, bookingService, $routeParams, $timeout) {

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
    //    $location.path("/CustomerReports/" + $routeParams.CompanyId);
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
    //$scope.RedirecttoReport = function () {
    //    alert("fgrdgre");
    //    $location.path("/ResourceReports/" + $routeParams.CompanyId);
    //}
    $scope.leftSideClick = function () {
        debugger;
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
        $scope.hidethisResourceReport = {
            hide: true
        };
        $scope.showthisResourceReport = {
            show: true,
        };

        angular.element(document.querySelector("#active-business")).removeClass('active');
        angular.element(document.querySelector("#active-resource")).addClass('active');
        angular.element(document.querySelector("#active-service")).removeClass('active');
        angular.element(document.querySelector("#bookinhMgt-paymentMainTab")).removeClass('active');

        var tttt = angular.element(document.querySelector("#resourcereportactive"));
        tttt.addClass('active');
        //$scope.toggle = true;
        var ReportCount = false;
        var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
        GetStaffProvider.then(function (response) {
            if (response.data.length != 0) {
                $scope.ResourcerReportsloader = true;
            }
            else {
                $scope.ResourcerReportsloader = false;
            }
        })



        //$scope.RedirecttoBuisnessReport = function () {
        //    $scope.hideRedirecttoBuisnessReport = {
        //        show: true,
        //        hide: false
        //    };
        //}

        //$scope.RedirecttoResourceReport = function () { 
        //    alert("xyz");
        //    $scope.hideRedirecttoResourceReport = {
        //        show: true,
        //        hide: false
        //    };       
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
            //$scope.showreportsClick = {
            //    show: true               
            //};       
            //$scope.hidereportsClick = {                
            //    hide: true
            //};
            var tttt = angular.element(document.querySelector("#reportsClick_active"));
            tttt.addClass('active');
            angular.element(document.querySelector("#resourcereportactive")).removeClass('active');
            $location.path("/BuisnessReports/" + $routeParams.CompanyId);
        }







        $scope.Resources = [];
        $scope.ResourceTimeFrame = false;
        $scope.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.Years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        $scope.Date = [];
        for (var i = 1; i <= 31; i++) {
            $scope.Date.push(i);

        }
        $scope.sortType = 'Bookings';
        $scope.sortreverse = false;
        $scope.AllResources = "";
        $scope.time = "thismonth";
        $scope.ResourcesList = "";
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        //Get All Staff for bind it to dropdown in reports//
        var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
        GetStaffProvider.then(function (response) {
            if (response.data.length != 0) {
                for (var i = 0; i < response.data.length; i++) {
                    $scope.Resources.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }
                $scope.SelectedResource = (response.data[0].Id).toString();
                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.Resources[0].Id, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {
                    $scope.ResourceReport = [];
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })
            }
            else {
                $scope.ResourceReport = [];
                $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                $scope.ResourcerReportsloader = false;
            }
        });

        //On it display records on monthly time frame//
        $scope.SelectedStartMonth = $scope.Months[date.getMonth()];
        $scope.SelectedStartYear = date.getFullYear().toString();
        $scope.SelectedStartDate = date.getDate().toString();

        var EndDate = new Date(date);
        EndDate.setDate(date.getDate() + 15);

        $scope.SelectedEndMonth = $scope.Months[EndDate.getMonth()];
        $scope.SelectedEndYear = EndDate.getFullYear().toString();
        $scope.SelectedEndDate = (EndDate.getDate()).toString();

    }

    $scope.GetTimeFrame = function (TimeFrame) {

        $scope.ResourceReport = [];
        $scope.ResourcerReportsloader = true;
        var ReportCount = false;
        if (TimeFrame == "today") {
            $scope.ResourceTimeFrame = false;
            var firstDay = new Date();
            var lastDay = new Date();
        }
        else if (TimeFrame == "thisweek") {
            $scope.ResourceTimeFrame = false;
            dt = new Date();
            var firstDay = new Date(dt.setDate(dt.getDate() - dt.getDay()));
            var lastDay = new Date(dt.setDate(dt.getDate() + 6 - dt.getDay()));
        }
        else if (TimeFrame == "thismonth") {
            $scope.ResourceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else if (TimeFrame == "thisyear") {
            $scope.ResourceTimeFrame = false;
            var date = new Date();
            var firstDay = new Date("1/1/" + date.getFullYear());
            var nextyear = date.getFullYear() + 1;
            var lastDay = new Date("1/1/" + nextyear)
        }
        else if (TimeFrame == "custom") {
            $scope.ResourceTimeFrame = true;

            var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
            var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));
        }
        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        if ($scope.Resources.length != 0) {
            if ($scope.allresourcechecked == true) {
                $scope.ResourcesList = "";

                angular.forEach($scope.Resources, function (value, Key) {
                    $scope.ResourcesList = value.Id + "," + $scope.ResourcesList;
                })
                $scope.AllResources = $scope.ResourcesList.substring(0, $scope.ResourcesList.length - 1);
                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })


            }
            else {

                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.Resources[0].Id, firstDay, lastDay);
                apirequest.then(function (response) {
                    $scope.ResourceReportData = [];
                    $scope.ResourceReportData = response.data;
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })
            }
        }
        else {
            $scope.ResourceReport = [];
            $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
            $scope.ResourcerReportsloader = false;
        }

    }

    $scope.GetAllResourcesReport = function (item) {

        $scope.ResourceReport = [];
        $scope.ResourcerReportsloader = true;
        var ReportCount = false;
        $scope.allresourcechecked = item;
        if ($scope.Resources.length != 0) {
            if ($scope.allresourcechecked == true) {
                var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
                GetStaffProvider.then(function (response) {
                    $scope.ResourcesList = "";
                    $scope.Resources = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.Resources.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                        $scope.ResourcesList = response.data[i].Id + "," + $scope.ResourcesList;
                    }
                    $scope.AllResources = $scope.ResourcesList.substring(0, $scope.ResourcesList.length - 1);

                    var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate);
                    apirequest.then(function (response) {
                        angular.forEach(response.data, function (value, key) {
                            ReportCount = true;
                            $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                        })
                        if (ReportCount == false) {
                            $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                        }
                        $scope.ResourcerReportsloader = false;
                    })
                })

            }
            else {
                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.Resources[0].Id, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })

            }
        }
        else {
            $scope.ResourceReport = [];
            $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
            $scope.ResourcerReportsloader = false;
        }
    }


    $scope.ResourceChange = function (Id) {

        $scope.ResourceReport = [];
        $scope.ResourcerReportsloader = true;
        var ReportCount = false;
        var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, Id, $scope.StartDate, $scope.EndDate);
        apirequest.then(function (response) {
            angular.forEach(response.data, function (value, key) {
                ReportCount = true;
                $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
            })
            if (ReportCount == false) {
                $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
            }
            $scope.ResourcerReportsloader = false;
        })
    }
    $scope.GetTimeFrameReports = function () {

        $scope.ResourceReport = [];
        var ReportCount = false;
        $scope.ResourcerReportsloader = true;
        $scope.BookingReport = [];

        var firstDay = new Date(parseInt($scope.SelectedStartYear), $scope.Months.indexOf($scope.SelectedStartMonth), parseInt($scope.SelectedStartDate));
        var lastDay = new Date(parseInt($scope.SelectedEndYear), $scope.Months.indexOf($scope.SelectedEndMonth), parseInt($scope.SelectedEndDate));

        $scope.StartDate = firstDay;
        $scope.EndDate = lastDay;
        if ($scope.Resources.length != 0) {
            if ($scope.allresourcechecked == true) {

                var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
                GetStaffProvider.then(function (response) {
                    $scope.ResourcesList = "";
                    $scope.Resources = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.Resources.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                        $scope.ResourcesList = response.data[i].Id + "," + $scope.ResourcesList;
                    }
                    $scope.AllResources = $scope.ResourcesList.substring(0, $scope.ResourcesList.length - 1);
                })
                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })
            }
            else {

                var apirequest = bookingService.GetResourceReportsBetweenDates($routeParams.CompanyId, $scope.SelectedResource, $scope.StartDate, $scope.EndDate);
                apirequest.then(function (response) {
                    angular.forEach(response.data, function (value, key) {
                        ReportCount = true;
                        $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                    })
                    if (ReportCount == false) {
                        $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                    }
                    $scope.ResourcerReportsloader = false;
                })
            }
        }
        else {
            $scope.ResourceReport = [];
            $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
            $scope.ResourcerReportsloader = false;
        }

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



    $scope.GetReportbyOrder = function (field) {
        debugger;
        $scope.toggle = !$scope.toggle;
        var ReportCount = false;
        //if ($scope.toggle == true) {
        //    $scope.Order = "ASC";
        //}
        //else {
        //    $scope.Order="DESC"
        //}
        $scope.ResourceReport = [];
        if ($scope.allresourcechecked == true) {
            var apirequest = bookingService.GetResourceReportsBetweenDatesinSortedOrder($routeParams.CompanyId, $scope.AllResources, $scope.StartDate, $scope.EndDate, $scope.toggle, field);
            apirequest.then(function (response) {
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                })
                if (ReportCount == false) {
                    $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                }
            })
        }
        else {
            var apirequest = bookingService.GetResourceReportsBetweenDatesinSortedOrder($routeParams.CompanyId, $scope.SelectedResource, $scope.StartDate, $scope.EndDate, $scope.toggle, field);
            apirequest.then(function (response) {
                angular.forEach(response.data, function (value, key) {
                    ReportCount = true;
                    $scope.ResourceReport.push({ "Resource": value.Employee.FirstName, "Bookings": value.TotalBookingsAssigned, "Revenue": "" + value.TotalRevenue, "Duration": value.DurationInHours, "Cancellations": value.TotalCancellations, "CancellationRate": value.PerntageOfTotalCancellations + "%", "Tasks": value.TotalBookingsCompleted })
                })
                if (ReportCount == false) {
                    $scope.ResourceReport.push({ "Resource": "", "Bookings": "", "Revenue": "", "Duration": "No Records to display", "Cancellations": "", "CancellationRate": "", "Tasks": "" })
                }
            })
        }
    }

}])