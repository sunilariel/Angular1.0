/// <reference path="dashboard.js" />
//var app = angular.module('MyApp', [])
app.controller('dashboardController', ['$scope', '$timeout', '$window', '$http', '$routeParams', '$filter', '$location', 'bookingService', '$rootScope', '$route',
    function ($scope, $timeout, $window, $http, $routeParams, $filter, $location, bookingService, $rootScope, $route) {
        //This will hide the DIV by default.
        $scope.procedures = [
            {
                definition: 'Monday',
                show: false,
                choice: []
            },
            {
                definition: 'Tuesday',
                show: false,
                choice: []
            },
            {
                definition: 'Wednesday',
                show: false,
                choice: []
            },
            {
                definition: 'Thursday',
                show: false,
                choice: []
            },
            {
                definition: 'Friday',
                show: false,
                choice: []
            },
            {
                definition: 'Saturday',
                show: false,
                choice: []
            },
            {
                definition: 'Sunday',
                show: false,
                choice: []
            }
        ];

        $scope.MessageText = "";
        $scope.IsVisible = false;
        $scope.choices = [];
        $scope.showcustomer = false;


        //Redirection
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
        $scope.redirecttoNotifications = function () {
            $location.path("/Notifications/" + $routeParams.CompanyId);
            angular.element(document.querySelector("#redirecttonotificationsactive")).removeClass('active');
            angular.element(document.querySelector("#redirecttonotificationsactive")).addClass('active');
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




        $scope.addNewChoice = function (procedure) {
            ////debugger;
            $scope.IsVisible = true;
            $scope.MessageText = "Saving Staff breaks..";
            var newItemNo = procedure.choice.length + 1;

            procedure.choice.push([{ 'id': 'choice' + newItemNo }]);
            $timeout(function () { $scope.MessageText = "Staff breaks saved."; $timeout(function () { $scope.IsVisible = false; }, 1000) }, 500);
        };
        $scope.showPopup = function (procedure) {
            procedure.show = true;
        };
        $scope.hidePopup = function (procedure) {
            procedure.show = false;
        };
        $scope.removeChoice = function (procedure) {
            ////debugger;
            $scope.IsVisible = true;
            var lastItem = procedure.choice.length - 1;
            procedure.choice.splice(lastItem);
            $scope.MessageText = "Saving Staff breaks..";
            $timeout(function () {
                $scope.MessageText = "Staff breaks saved."; $timeout(function () { $scope.IsVisible = false; }, 1000)
            }, 500);
        };

        $scope.showCustomerpopup = function () {
            ////debugger;
            $scope.showcustomer != $scope.showcustomer;
        };

        $scope.init = function () {
            ////debugger;
            $(".left_sidebar").removeClass("show-leftbar");
            //$scope.custom = true;
            $scope.showdashboardloader = true;
            $scope.AppointmentSchedule = [];
            $scope.MessageText = "Fetching Data...";
            $scope.IsVisible = true;







            var apirequestWeeksRevenue = bookingService.GetCurrentWeeksRevenueSummary($routeParams.CompanyId);
            apirequestWeeksRevenue.then(function (response) {
                ////debugger;
                var CurrentDate = new Date();
                var first = (CurrentDate.getDate() + 1) - CurrentDate.getDay();
                var last = first + 6;
                $scope.WeekFirstDate = new Date(CurrentDate.setDate(first));
                $scope.WeekLastDate = new Date(CurrentDate.setDate(last));
                $scope.WeekRevenueSummary = response.data;


                //Get Weeks Activity Summary//
                var apirequestWeeksActivity = bookingService.GetWeeksActivitySummary($routeParams.CompanyId);
                apirequestWeeksActivity.then(function (response) {
                    $scope.WeekActivityList = [];
                    $scope.WeekActivityList = response.data;

                    //Get Week Schedule Summary//
                    var apirequestWeeksSchedule = bookingService.GetWeeksSchedule($routeParams.CompanyId);
                    apirequestWeeksSchedule.then(function (response) {
                        $scope.ListofWeekSchedule = [];
                        $scope.ListofWeekSchedule = response.data;
                        $scope.IsVisible = false;
                        $scope.showdashboardloader = false;
                    })
                })


            })
            var GetStaffProvider = bookingService.GetStaffData($routeParams.CompanyId);
            GetStaffProvider.then(function (response) {
                ////debugger;
                $scope.Provider = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.Provider.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }
            });

            $scope.StatusList = [{ Status: "No Label", "Value": 1 },
            { Status: "Pending", "Value": 2 },
            { Status: "Confirmed", "Value": 3 },
            { Status: "Done", "Value": 4 },
            { Status: "Paid", "Value": 6 },
            { Status: "NoShow ", "Value": 5 },
            { Status: "RunningLate", "Value": 7 }
            ]

            var CompanyDetails = bookingService.GetCompanyDetails($routeParams.CompanyId);
            CompanyDetails.then(function (response) {

                $scope.companyEmail = response.data.Email;
            });

            var getOpeningHoursResponse = bookingService.GetOpeningHours($routeParams.CompanyId);
            getOpeningHoursResponse.then(function (response) {
                $scope.businessHourInfo = response.data;
            });

            $scope.appointmentDetailisVisible = false;
            angular.element(document.querySelector("#UpdateDashboardAppointmentPopup")).css("display", "none");
        }

        $scope.DashboardAppointmentDetail = function (item) {
            ////debugger;  //1111
            $scope.AppointmentStartDate = item.BookingStartDate;
            $scope.AppointmentEndDate = new Date(item.BookingStartDate).setMinutes(item.BookingDuration, 0, 0);
            $scope.AppointmentProvider = item.EmployeeName;
            $scope.AppointmentService = item.ServiceName;
            $scope.AppointmentServiceCost = item.BookingCost;
            $scope.AppointmentEmployeeId = item.EmployeeId;
            $scope.AppointmentServiceId = item.ServiceId;
            $scope.ServiceTime = item.BookingDuration;
            $scope.UpdatedStatus = item.BookingStatusDisplay;
            $scope.StatusId = item.BookingStatus;
            $scope.AppointmentBookingId = item.BookingId;
            $scope.CustomerName = item.CustomerNames[0];
            $scope.CustomerId = item.CustomerIds[0];
            var apirequest = bookingService.GetCustomerById($scope.CustomerId);
            apirequest.then(function (response) {
                ////debugger;
                $scope.CustomerName = response.data.FirstName;
                $scope.CustomerEmail = response.data.Email;
                $scope.CustomerTelephone = response.data.TelephoneNo.substring(2, response.data.TelephoneNo.length);
                $scope.Code = response.data.TelephoneNo.substring(0, 2);
                $scope.CustomerAddress = response.data.Address;

                $scope.dt = appointmentdate;
            })
            $scope.appointmentDetailisVisible = !$scope.appointmentDetailisVisible;
            var date = $scope.AppointmentStartDate.split("T");
            var appointmentdate = new Date(date[0]);
            var time = date[1].split(":");
            var appointmenttime = new Date(1997, 4, 5, time[0], time[1], time[2]);
            $scope.timeoption = $filter('date')(appointmenttime, 'h:mm a');
            $scope.dt = appointmentdate;
        }

        $scope.UpdateStatus = function (item) {
            ////debugger;
            var status = $scope.StatusValue;
            $scope.UpdatedStatus = item.Status;
            var SetStatus = bookingService.SetStatusofAppointment(item.Status, $scope.AppointmentBookingId);
            SetStatus.then(function (response) {
                if (response.data.Success == true) {

                    $scope.MessageText = "Updating Appointment Label";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Appointment Label Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                            $scope.init();
                            //var apirequestWeeksSchedule = bookingService.GetWeeksSchedule($routeParams.CompanyId);
                            //apirequestWeeksSchedule.then(function (response) {
                            //    $scope.ListofWeekSchedule = [];
                            //    $scope.ListofWeekSchedule = response.data;
                            //    $scope.IsVisible = false;
                            //})
                        }, 800)
                    }, 1000)
                }
            })
        }


        $scope.DeleteAppointment = function (item) {

            if (item != null) {
                $scope.DashboardAppointmentDetail(item);
                var apirequest = bookingService.DeleteAppointment($scope.AppointmentBookingId);
            }
            else {
                var apirequest = bookingService.DeleteAppointment($scope.AppointmentBookingId);
            }


            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Deleting Appointment";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Appointment Deleted";
                        $timeout(function () {
                            $scope.appointmentDetailisVisible = false;
                            $scope.IsVisible = false;
                            $scope.init();
                            angular.element(document.querySelector("#UpdateDashboardAppointmentPopup")).css("display", "none");
                        }, 800)
                    }, 1000)
                }
            })
            angular.element(document.querySelector("#DashboardAppointmentDetails")).removeClass('hidden');
            angular.element(document.querySelector("#UpdateDashboardAppointmentDetails")).addClass('hidden');
        }


        $scope.showhideUpdateAppointment = function (item) {
            $scope.init();
            angular.element(document.querySelector("#DashboardAppointmentDetails")).removeClass('hidden');
            angular.element(document.querySelector("#UpdateDashboardAppointmentDetails")).addClass('hidden');
        }


        $scope.EditAppointment = function (item) {
            ////debugger;



            $scope.DashboardAppointmentDetail(item);
            angular.element(document.querySelector("#DashboardAppointmentDetails")).addClass('hidden');
            angular.element(document.querySelector("#UpdateDashboardAppointmentDetails")).removeClass('hidden');


            $scope.appointmentDetailisVisible = false;
            $scope.Status = $scope.UpdatedStatus;
            $scope.selectedprovider = $scope.AppointmentEmployeeId.toString();
            $scope.selectedservice = $scope.AppointmentServiceId.toString();
            $scope.price = $scope.AppointmentServiceCost;
            $scope.time = $scope.ServiceTime;
            var date = $scope.AppointmentStartDate.split("T");
            var appointmentdate = new Date(date[0]);
            var time = date[1].split(":");
            var appointmenttime = new Date(1997, 4, 5, time[0], time[1], time[2]);
            $scope.timeoption = $filter('date')(appointmenttime, 'h:mm a');
            $scope.dt = appointmentdate;
            // $scope.ServiceDetail($scope.AppointmentServiceId);
            $scope.GetAllocateServiceToEmployee($scope.AppointmentEmployeeId);
            $scope.ServiceId = $scope.AppointmentServiceId;
            $scope.UpdateAppointmentId = $scope.AppointmentBookingId;
            $scope.count = 0;
            $scope.notes = "";

            //$scope.EmployeeId = $scope.AppointmentEmployeeId;
        }


        $scope.GetAllocateServiceToEmployee = function (EmployeeId) {
            ////debugger;

            $scope.EmployeeId = EmployeeId;
            $scope.EmployeeServices = [];
            var EmployeeServices = bookingService.GetAllocatedServicetoEmployee($routeParams.CompanyId, EmployeeId);

            EmployeeServices.then(function (result) {
                ////debugger;

                $scope.EmployeeServices = result.data;

                // $scope.selectedservice = $scope.EmployeeServices[0].Id;
                //Get Staff Appointment working hours ///
                $scope.AppointmentSchedule = [];
                var resultAppontmentWorkingHours = bookingService.GetAppointmentWorkingHours(EmployeeId);
                resultAppontmentWorkingHours.then(function (response) {

                    angular.forEach(response.data, function (value, key) {
                        if (value.IsOffAllDay == true) {
                            $scope.AppointmentSchedule.push(value.NameOfDay);
                        }
                    });
                });

            }), function () {
                alert('Error in getting post records');
            };
        }

        $scope.ServiceDetail = function (SelectedServiceId) {
            ////debugger;
            $scope.ServiceId = SelectedServiceId;
            var SelectedService = bookingService.GetSelectedService(SelectedServiceId);
            SelectedService.then(function (response) {
                ////debugger;
                $scope.price = response.data.Cost;
                $scope.time = response.data.DurationInMinutes;
                $scope.ServicePriceTimeDetailIsVisible = true;
                // $scope.today();

                $scope.timeInfoFrom = [];
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                RequestValues = {
                    CompanyId: $routeParams.CompanyId,
                    ServiceId: $scope.ServiceId,
                    EmployeeId: $scope.EmployeeId,
                    DateofBooking: $filter('date')($scope.dt, "dd-MM-yyyy"),
                    Day: days[$scope.dt.getDay()],
                }
                $scope.timeslotsloading = true;
                var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
                result.then(function (response) {
                    if (response.data.Value != null) {
                        for (var i = 0; i < response.data.Value.length; i++) {
                            var date = response.data.Value[i].Start.split(":");
                            var datetime = new Date(1970, 0, 1, date[0], date[1], date[2]);
                            var time = $filter('date')(datetime, 'h:mm a');
                            $scope.timeInfoFrom.push(time);
                        }
                        $scope.timeoption = $scope.timeInfoFrom[0];
                    }
                    $scope.timeslotsloading = false;
                });

            });
        }

        $scope.UpdateAppointment = function () {
            ////debugger;
            var appointment =
                {
                    "Id": $scope.UpdateAppointmentId,
                    "CompanyId": $routeParams.CompanyId,
                    "ServiceId": $scope.selectedservice,
                    "EmployeeId": $scope.selectedprovider,
                    "CustomerIdsCommaSeperated": $scope.CustomerId,
                    "StartHour": $scope.timeoption,
                    "StartMinute": "",
                    "EndHour": 0,
                    "EndMinute": $scope.time,
                    "IsAdded": true,
                    "Message": "",
                    "Notes": $scope.notes,
                    "CustomerIds": [$scope.CustomerId],
                    "Start": $scope.dt,
                    "End": $scope.dt,
                }

            var apirequest = bookingService.UpdateAppointment(appointment);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    $scope.appointmentDetailisVisible = true;
                    $scope.init();
                    $route.reload();
                }
                if (response.data.Success == false) {
                    if (response.data.Message == "Booking Cannot Be Added , Not Free Slot Available.") {
                        $scope.MessageText = "Not Free Slot Available";
                        $scope.IsVisible = true;
                        $timeout(function () {

                            $scope.IsVisible = false;
                        }, 1000)
                    }
                }
            })
        }

        //DateTime Picker
        $scope.today = function () {
            $scope.dt = new Date();
        };

        //  $scope.today();
        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };


        //bookingMgt-settings
        //bookingMgt-reports
        //$scope.bookingMgtsettings = function () {




        //    var state = $(this).data('state');
        //    state = !state;
        //    if (state) {

        //        $("#bookingMgt-settings").addClass("open");
        //    }
        //    else {
        //        $("#bookingMgt-settings").removeClass("open");
        //    }
        //    $(this).datas('state', state);
        //    $scope.isActive = !$scope.isActive;            
        //}
        //$scope.bookingMgtreports = function () {
        //    alert("seytuy");
        //    angular.element(document.querySelector("#bookingMgt-settings")).addClass('open');
        //}

        //bookingMgt-settings_new

        $scope.EditDatePicker = function () {
            ////debugger;
            if ($scope.count == 0) {
                $scope.count = $scope.count + 1;
                $scope.today();
            }
        }

        //Disable weekend selection
        $scope.disabled = function (date, mode) {
            return (mode == 'day' && (date.getDay() == $scope.AppointmentSchedule[0] || date.getDay() == $scope.AppointmentSchedule[1] || date.getDay() == $scope.AppointmentSchedule[2] || date.getDay() == $scope.AppointmentSchedule[3] || date.getDay() == $scope.AppointmentSchedule[4] || date.getDay() == $scope.AppointmentSchedule[5] || date.getDay() == $scope.AppointmentSchedule[6]));
        };

        $scope.open = function () {
            $timeout(function () {
                $scope.opened = true;
            });
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };


        $scope.$watch("dt", function (newValue, oldValue) {
            ////debugger;
            $scope.timeInfoFrom = [];
            if (newValue != null && oldValue != null) {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                RequestValues = {
                    CompanyId: $routeParams.CompanyId,
                    ServiceId: $scope.ServiceId,
                    EmployeeId: $scope.EmployeeId,
                    DateofBooking: $filter('date')(newValue, "dd-MM-yyyy"),
                    Day: days[newValue.getDay()],
                }
                $scope.timeslotsloading = true;
                var result = bookingService.GetFreeBookingSlotsForEmployee(RequestValues);
                result.then(function (response) {
                    if (newValue != oldValue) {
                        if (response.data.Value != null) {
                            for (var i = 0; i < response.data.Value.length; i++) {
                                var date = response.data.Value[i].Start.split(":");
                                var datetime = new Date(1970, 0, 1, date[0], date[1], date[2]);
                                var time = $filter('date')(datetime, 'h:mm a');
                                $scope.timeInfoFrom.push(time);
                            }
                        }
                        $scope.timeslotsloading = false;
                    }
                });
            }
        });

        $scope.Logout = function () {
            //////debugger;
            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }


        $scope.SetWorkingHours = function (timedata) {
            ////debugger;
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

        $scope.switchOnOff = function (item) {
            //debugger;
            for (var i = 0; i < $scope.businessHourInfo.length; i++) {
                if (item.NameOfDay == $scope.businessHourInfo[i].NameOfDay) {
                    if (item['IsOpen'] == true) {
                        $scope.businessHourInfo[i].IsOffAllDay = true;
                        $scope.businessHourInfo[i].IsOpen = false;

                        var buisnesshour = {
                            Id: "",
                            CompanyId: $routeParams.CompanyId,
                            Start: item.Start,
                            End: item.End,
                            NameOfDay: item.NameOfDay,
                            IsOffAllDay: true,
                            CreationDate: new Date(),
                        }
                    }
                    else {
                        $scope.businessHourInfo[i].IsOffAllDay = false;
                        $scope.businessHourInfo[i].IsOpen = true;

                        var buisnesshour = {
                            Id: "",
                            CompanyId: $routeParams.CompanyId,
                            Start: item.Start,
                            End: item.End,
                            NameOfDay: item.NameOfDay,
                            IsOffAllDay: false,
                            CreationDate: new Date(),
                        }
                    }
                    break;
                }
            }
            var apirequest = bookingService.SetCompanyWorkingHours(buisnesshour);
            apirequest.then(function (response) {
                //debugger;
                if (response.data.Success == true) {
                    $scope.MessageText = "Saving buisness Hours";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Buisness Hours Saved"
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 800);

                    var GetOpeningHoursResponse = bookingService.GetOpeningHours($routeParams.CompanyId);
                    GetOpeningHoursResponse.then(function (response) {
                        $scope.businessHourInfo = response.data;
                    })
                }
            })
        }

    }]);
