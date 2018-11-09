app.controller("staffController", ['$scope', '$http', '$routeParams', '$filter', '$timeout', '$location', 'bookingService', '$rootScope', '$route',
    function ($scope, $http, $routeParams, $filter, $timeout, $location, bookingService, $rootScope, $route) {





        $scope.showstaffpopup = false;
        //Redirection//

        $scope.redirecttoCustomer = function () {
            $location.path("/customer/" + $routeParams.CompanyId);
        }
        $scope.redirectToCalendar = function () {
            $location.path("/Calendar/" + $routeParams.CompanyId);
        }
        $scope.RedirecttoStaff = function () {
            ////debugger;
            $scope.init();
            $location.path("/Setting/" + $routeParams.CompanyId);

            angular.element(document.querySelector("#staff-DetailsTAb")).addClass('hidden');
            angular.element(document.querySelector(".tabs-_section")).removeClass('hidden');

            angular.element(document.querySelector("#redirecttostaffactive")).addClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('active');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('hidden');


            angular.element(document.querySelector("#staffhourslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('active');

            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('active');

            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('hidden');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('active');

        }
        $scope.showAllStaff = function () {

            ////debugger;
            $location.path("/Setting/" + $routeParams.CompanyId);

            angular.element(document.querySelector("#staff-DetailsTAb")).addClass('hidden');
            angular.element(document.querySelector(".tabs-_section")).removeClass('hidden');

            angular.element(document.querySelector("#redirecttostaffactive")).addClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('active');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('hidden');


            angular.element(document.querySelector("#staffhourslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('active');

            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('active');

            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('hidden');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('active');

        }

        $scope.redirecttodashboard = function () {
            ////debugger;
            $location.path("/dashboard/" + $routeParams.CompanyId);
        }
        $scope.redirecttoServices = function () {
            $location.path("/Services/" + $routeParams.CompanyId);
            var tttt = angular.element(document.querySelector("#redirecttoservicesactive"));
            tttt.addClass('active');
            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');
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
            ////debugger;

            $(".left_sidebar").removeClass("show-leftbar");
            //$scope.custom = true;
            var tttt = angular.element(document.querySelector("#redirecttostaffactive"));
            tttt.addClass('active');
            $scope.thisstaffhideshow = {
                show: true,
                hide: true
            };
            $scope.ShowDeletePopUp = false;
            $scope.isvisibleMenuiconBar = true;
            $scope.IsVisibleAddNewStaffPopUp = false;

            //$scope.alldaystatus = true;

            $scope.startdate = $filter('date')(new Date(), "dd MMM yyyy");
            $scope.enddate = $filter('date')(new Date(), "dd MMM yyyy");

            //Use Wizard Controller to get AllStaffList through api//
            var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
            StaffResult.then(function (response) {
                $scope.ListofStaff = [];
                $scope.ListofStaff = response.data;
                $scope.TotalNoOfStaff = $scope.ListofStaff.length;


                // $scope.StartTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

                $scope.StartTime = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];
                $scope.EndTime = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];

                // $scope.EndTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

                //if (response.data.length > 0) {
                //    $scope.EditStaff(response.data[0]);

                //}
            });
            var CompanyDetails = bookingService.GetCompanyDetails($routeParams.CompanyId);
            CompanyDetails.then(function (response) {

                $scope.companyEmail = response.data.Email;
            });

            var getOpeningHoursResponse = bookingService.GetOpeningHours($routeParams.CompanyId);
            getOpeningHoursResponse.then(function (response) {
                $scope.businessHourInfo = response.data;
            });
        }

        //paging start//

        ////debugger;
        //$scope.currentPage = 0;
        //$scope.pageSize = 5;
        //$scope.ListofStaff = [];
        //$scope.q = '';
        //$scope.getData = function () {
        //    return $filter('filter')($scope.ListofStaff, $scope.q)
        //}

        //$scope.numberOfPages = function () {
        //    return Math.ceil($scope.getData().length / $scope.pageSize);
        //}

        ////for (var i = 0; i < 1; i++) {
        ////    $scope.ListofStaff.push("item " + i);
        ////}

        //paging end//



        $scope.IsVisibleAddNewStaffPopUps = function myfunction(form) {
            $scope.StaffEmail = "";
            $scope.StaffName = "";
            $scope.staffMobileNo = "";
            form.StaffName.$untouched = true;
            form.StaffName.$setUntouched();
            form.StaffName.$setPristine();
            form.StaffEmail.$untouched = true;
            form.StaffEmail.$setUntouched();
            form.StaffEmail.$setPristine();
            form.staffMobileNo.$untouched = true;
            form.staffMobileNo.$setUntouched();
            form.staffMobileNo.$setPristine();
            return !$scope.IsVisibleAddNewStaffPopUp;

        }
        //$scope.filterValue = function ($event) {
        //    if (isNaN(String.fromCharCode($event.keyCode))) {
        //        $event.preventDefault();
        //    }
        //};
        //Add Staff//
        $scope.AddStaff = function (form) {
            //debugger;
            $scope.ph_numbr = /^\+?\d{10}$/;
            $scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (form.$invalid == true) {
                if (form.StaffName.$invalid == true) {
                    form.StaffName.$setTouched();
                    angular.element(document.querySelector("#StaffName_color")).removeClass('ng-hide');
                    return false;
                }
            }
            if (form.$invalid == true) {
                if (form.staffMobileNo.$invalid == true) {
                    if ($scope.ph_numbr = /^\+?\d{10}$/) {
                        form.staffMobileNo.$setTouched();
                        
                        angular.element(document.querySelector("#staffMobileNo_color")).removeClass('ng-hide');
                        return false;
                        
                    }
                    
                   
                }
            }
            angular.element(document.querySelector("#staffMobileNo_color")).addClass('ng-hide');
            if (form.$invalid == true) {
                if (form.StaffEmail.$invalid == true) {
                    form.StaffEmail.$setTouched();
                    return false;
                }
            }
           


            var CurrentDate = new Date();
            var requestedstaff = {
                
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "UserName": $scope.StaffEmail,
                "Password": "",
                "FirstName": $scope.StaffName,
                "LastName": $scope.LastName,
                "Address": "",
                "Email": $scope.StaffEmail,
                "TelephoneNo": $scope.staffMobileNo,
                "CreationDate": CurrentDate,
                "Description": $scope.Description
            }

            var result = bookingService.AddStaff(requestedstaff);
            result.then(function (response) {
                //debugger;
                //if (response.data.Success == true) {
                if (response.data.ReturnObject.EmloyeeId == 0) {
                    //alert("Staff already exists!");
                    form.staffEmail = focus;
                    $scope.MessageText = "Staff already exists!";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 800)
                    }, 1000)
                }

                //if (response.data.Success == true) {
                else {
                    //debugger;
                    //$scope.StaffId= response.data.ReturnObject.EmloyeeId;
                    $scope.MessageText = "Adding new Staff";
                    $scope.IsVisible = true;
                    //$scope.init();
                    $timeout(function () {
                        $scope.MessageText = "New Staff Added";
                        $timeout(function () {
                            $scope.IsVisible = false;
                            $scope.IsVisibleAddNewStaffPopUp = false;

                            //Clear the form elements value//
                            $scope.StaffEmail = "";
                            $scope.StaffName = "";
                            form.StaffName.$setUntouched();
                            form.StaffName.$untouched = true;

                            var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                            StaffResult.then(function (response) {
                                $scope.ListofStaff = [];
                                $scope.ListofStaff = response.data;
                                $scope.EditStaff(response.data[0]);
                                $scope.TotalNoOfStaff = $scope.ListofStaff.length;
                            });
                        }, 1000);
                    }, 800)


                    //////////////////////

                    //Set Working hours in Staff Section in MileStone_4//
                    $scope.WorkingHours = [{ "Day": "Monday", "StartTime": "08:00 AM", "EndTime": "08:00 PM", "Available": true, "NameOfDay": 1 },
                    { "Day": "Tuesday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 2 },
                    { "Day": "Wednesday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 3 },
                    { "Day": "Thursday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 4 },
                    { "Day": "Friday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": true, "NameOfDay": 5 },
                    { "Day": "Saturday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": false, "NameOfDay": 6 },
                    { "Day": "Sunday", "StartTime": "08:00 AM", "EndTime": "05:00 PM", "Available": false, "NameOfDay": 0 }
                    ]

                    angular.forEach($scope.WorkingHours, function (value, key) {
                        bool = true;
                        if (value.Available == true) {
                            bool = false;
                        }
                        var CurrentDate = new Date();
                        var workinghours =
                            {
                                "Id": 1,
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": response.data.ReturnObject.EmloyeeId,
                                "Start": value.StartTime,
                                "End": value.EndTime,
                                "NameOfDay": value.NameOfDay,
                                "NameOfDayAsString": value.Day,
                                "IsOffAllDay": bool,
                                "CreationDate": CurrentDate
                            }
                        var result = bookingService.SetEmployeeWorkingHours(workinghours);
                    });
                    $route.reload();
                }
                //$route.reload();
            })

        }
        $scope.StaffCancel = function (form) {

            $scope.StaffEmail = "";
            $scope.StaffName = "";
            $scope.staffMobileNo = "";
            form.StaffName.$untouched = true;
            form.StaffName.$setUntouched();
            form.StaffName.$setPristine();
            form.StaffEmail.$untouched = true;
            form.StaffEmail.$setUntouched();
            form.StaffEmail.$setPristine();
            form.staffMobileNo.$untouched = true;
            form.staffMobileNo.$setUntouched();
            form.staffMobileNo.$setPristine();
            $scope.IsVisibleAddNewStaffPopUp = false

        }





        //$scope.ShowStaffTabs = function () {
        //    //debugger;
        //    alert("hgvjhvj");
        //    $scope.hidestaffdetails = {
        //        show: true,
        //        hide: true
        //    };
        //    //$scope.hideTabsLinkShowStaffTabs = {
        //    //    show: true,
        //    //    hide: true
        //    //};
        //}


        $scope.StaffDetailsLink = function () {
            ////debugger;
            $scope.hideStaffDetailsLink = {
                show: true,
                hide: true
            };
            //$scope.hideTabsLink = {
            //    show: true,
            //    hide: true
            //};
            angular.element(document.querySelector("#staff_details")).removeClass('hidden');
            angular.element(document.querySelector("#staff_details")).addClass('active');

            angular.element(document.querySelector("#staff-hours")).addClass('hidden');
            angular.element(document.querySelector("#staff-services")).addClass('hidden');
            angular.element(document.querySelector("#staff-break")).addClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('hidden');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('hidden');

            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('active');

            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');

            angular.element(document.querySelector("#sideIconDetailClickDetails")).addClass('active');
            angular.element(document.querySelector("#sideIconDetailClickService")).addClass('active');
            angular.element(document.querySelector("#sideIconServiceClickService")).removeClass('active');
            angular.element(document.querySelector("#staff-services")).removeClass('active');



            angular.element(document.querySelector("#sideIconWHoursClickWHours")).removeClass('active');

            angular.element(document.querySelector("#sideIconBreaksClickBreaks")).removeClass('active');
            angular.element(document.querySelector("#sideIconDetailClickWHours")).addClass('active');
            angular.element(document.querySelector("#sideIconDetailClickBreaks")).addClass('active');




            angular.element(document.querySelector("#sideIconDetailClickTimeOff")).addClass('active');

            angular.element(document.querySelector("#sideIconTimeOffClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconTimeOffClickDetails")).removeClass('active');



        }

        $scope.sideIconDetailClick = function () {


            $scope.hideStaffDetailsLink = {
                show: true,
                hide: true
            };
            angular.element(document.querySelector("#StaffDetailsLink")).addClass('active');
            angular.element(document.querySelector("#StaffServicesLink")).removeClass('active');
            angular.element(document.querySelector("#StaffHoursLink")).removeClass('active');
            angular.element(document.querySelector("#StaffBreakLink")).removeClass('active');
            angular.element(document.querySelector("#StaffTimeOffLink")).removeClass('active');




            angular.element(document.querySelector("#sideIconDetailClickDetails")).addClass('active');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('active');

            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('active');


            angular.element(document.querySelector("#sideIconDetailClickWHours")).addClass('hidden');

            angular.element(document.querySelector("#staffhourslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('active');

            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('active');

            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('hidden');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('active');

            angular.element(document.querySelector("#staff_details")).removeClass('hidden');
            angular.element(document.querySelector("#sideIconTimeOffClickDetails")).removeClass('active');


        }

        $scope.StaffServicesLink = function () {
            ////debugger;
            $scope.hideStaffServicesLink = {
                show: true,
                hide: true
            };
            //$scope.hideTabsLink = {
            //    show: true,
            //    hide: true
            //};
            angular.element(document.querySelector("#staff-services")).removeClass('hidden');
            angular.element(document.querySelector("#staff-services")).addClass('active');

            angular.element(document.querySelector("#staff_details")).addClass('hidden');
            angular.element(document.querySelector("#staff-hours")).addClass('hidden');
            angular.element(document.querySelector("#staff-break")).addClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('hidden');

            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');

            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('hidden');

            angular.element(document.querySelector("#sideIconTimeOffClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconDetailClickService")).removeClass('active');
            angular.element(document.querySelector("#sideIconServiceClickService")).addClass('active');
            angular.element(document.querySelector("#sideIconBreaksClickBreaks")).removeClass('active');
            angular.element(document.querySelector("#sideIconWHoursClickWHours")).removeClass('active');
            angular.element(document.querySelector("#sideIconServicesClickWHours")).addClass('active');
            angular.element(document.querySelector("#sideIconServicesClickTimeOff")).addClass('active');


        }

        $scope.sideIconServicesClick = function () {


            $scope.hideStaffServicesLink = {
                show: true,
                hide: true
            };

            angular.element(document.querySelector("#StaffDetailsLink")).removeClass('active');
            angular.element(document.querySelector("#StaffServicesLink")).addClass('active');
            angular.element(document.querySelector("#StaffHoursLink")).removeClass('active');
            angular.element(document.querySelector("#StaffBreakLink")).removeClass('active');
            angular.element(document.querySelector("#StaffTimeOffLink")).removeClass('active');



            angular.element(document.querySelector("#sideIconDetailClickDetails")).removeClass('active');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('hidden');

            angular.element(document.querySelector("#sideIconServiceClickService")).addClass('active');
            angular.element(document.querySelector("#sideIconDetailClickService")).removeClass('active');

            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('hidden');

            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffhourslinkactive")).addClass('hidden');

            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('hidden');


            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('active');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('hidden');

            angular.element(document.querySelector("#staff-services")).removeClass('hidden');
        }

        $scope.StaffHoursLink = function () {
            ////debugger;
            $scope.hideStaffHoursLink = {
                show: true,
                hide: true
            };
            //$scope.hideTabsLink = {
            //    show: true,
            //    hide: true
            //};

            angular.element(document.querySelector("#staff-hours")).removeClass('hidden');
            angular.element(document.querySelector("#staff-hours")).addClass('active');

            angular.element(document.querySelector("#staff_details")).addClass('hidden');
            angular.element(document.querySelector("#staff-services")).addClass('hidden');
            angular.element(document.querySelector("#staff-break")).addClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('hidden');

            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#staffhourslinkactive")).addClass('active');

            angular.element(document.querySelector("#sideIconWHoursClickWHours")).addClass('active');

            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');

            angular.element(document.querySelector("#sideIconDetailClickWHours")).removeClass('hidden');
            angular.element(document.querySelector("#sideIconDetailClickWHours")).removeClass('active');

            angular.element(document.querySelector("#sideIconBreaksClickWHours")).removeClass('active');
            angular.element(document.querySelector("#sideIconServicesClickWHours")).removeClass('active');
            angular.element(document.querySelector("#sideIconTimeOffClickWHours")).removeClass('active');



        }

        $scope.sideIconWHoursClick = function () {


            $scope.hideStaffHoursLink = {
                show: true,
                hide: true
            };

            angular.element(document.querySelector("#StaffDetailsLink")).removeClass('active');
            angular.element(document.querySelector("#StaffServicesLink")).removeClass('active');
            angular.element(document.querySelector("#StaffHoursLink")).addClass('active');
            angular.element(document.querySelector("#StaffBreakLink")).removeClass('active');
            angular.element(document.querySelector("#StaffTimeOffLink")).removeClass('active');



            angular.element(document.querySelector("#sideIconDetailClickDetails")).removeClass('active');
            angular.element(document.querySelector("#sideIconServicesClickWHours")).removeClass('active');
            angular.element(document.querySelector("#staff-hours")).removeClass('hidden');
            angular.element(document.querySelector("#staff_details")).removeClass('active');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');
            angular.element(document.querySelector("#sideIconWHoursClickWHours")).addClass('active');

            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffhourslinkactive")).addClass('active');
            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#sideIconDetailClickWHours")).removeClass('hidden');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('hidden');

            angular.element(document.querySelector("#sideIconBreaksClickWHours")).removeClass('active');
            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('active');


            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('active');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('hidden');
            angular.element(document.querySelector("#sideIconTimeOffClickWHours")).removeClass('active');
            angular.element(document.querySelector("#sideIconDetailClickWHours")).removeClass('active');

        }

        $scope.StaffBreakLink = function () {
            ////debugger;
            $scope.hideStaffBreakLink = {
                show: true,
                hide: true
            };
            //$scope.hideTabsLink = {
            //    show: true,
            //    hide: true
            //};

            angular.element(document.querySelector("#staff-break")).removeClass('hidden');
            angular.element(document.querySelector("#staff-break")).addClass('active');

            angular.element(document.querySelector("#staff_details")).addClass('hidden');
            angular.element(document.querySelector("#staff-services")).addClass('hidden');
            angular.element(document.querySelector("#staff-hours")).addClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('hidden');

            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('active');
            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('hidden');

            angular.element(document.querySelector("#sideIconBreaksClickBreaks")).addClass('active');

            angular.element(document.querySelector("#sideIconBreaksClickTimeOff")).addClass('active');

            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');





            angular.element(document.querySelector("#sideIconDetailClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconServicesClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconWHoursClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconTimeOffClickTimeOff")).removeClass('active');

            angular.element(document.querySelector("#sideIconDetailClickBreaks")).removeClass('active');
            angular.element(document.querySelector("#sideIconServicesClickBreaks")).removeClass('active');
            angular.element(document.querySelector("#sideIconWHoursClickBreaks")).removeClass('active');
            angular.element(document.querySelector("#sideIconTimeOffClick")).removeClass('active');




        }

        $scope.sideIconBreaksClick = function () {
            $scope.hideStaffBreakLink = {
                show: true,
                hide: true
            };


            angular.element(document.querySelector("#StaffDetailsLink")).removeClass('active');
            angular.element(document.querySelector("#StaffServicesLink")).removeClass('active');
            angular.element(document.querySelector("#StaffHoursLink")).removeClass('active');
            angular.element(document.querySelector("#StaffBreakLink")).addClass('active');
            angular.element(document.querySelector("#StaffTimeOffLink")).removeClass('active');




            angular.element(document.querySelector("#sideIconDetailClickDetails")).removeClass('active');
            angular.element(document.querySelector("#sideIconDetailClickBreaks")).removeClass('active');
            angular.element(document.querySelector("#staff-break")).removeClass('hidden');

            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');

            angular.element(document.querySelector("#sideIconBreaksClickWHours")).addClass('active');
            angular.element(document.querySelector("#sideIconBreaksClickBreaks")).addClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('active');

            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffhourslinkactive")).addClass('hidden');

            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('active');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('hidden');
        }

        $scope.StaffTimeOffLink = function () {
            ////debugger;
            $scope.hideStaffTimeOffLink = {
                show: true,
                hide: true
            };
            //$scope.hideTabsLink = {
            //    show: true,
            //    hide: true
            //};
            angular.element(document.querySelector("#staff-timeoff")).removeClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('active');

            angular.element(document.querySelector("#staff_details")).addClass('hidden');
            angular.element(document.querySelector("#staff-hours")).addClass('hidden');
            angular.element(document.querySelector("#staff-break")).addClass('hidden');
            angular.element(document.querySelector("#staff-services")).addClass('hidden');

            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('active');
            angular.element(document.querySelector("#sideIconTimeOffClickTimeOff")).addClass('active');
            angular.element(document.querySelector("#sideIconTimeOffClickDetails")).addClass('active');

            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');
            angular.element(document.querySelector("#sideIconDetailClickDetails")).removeClass('active');

            angular.element(document.querySelector("#sideIconDetailClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconServicesClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconWHoursClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconBreaksClickTimeOff")).removeClass('active');
        }

        $scope.sideIconTimeOffClick = function () {
            $scope.hideStaffTimeOffLink = {
                show: true,
                hide: true
            };
            angular.element(document.querySelector("#StaffDetailsLink")).removeClass('active');
            angular.element(document.querySelector("#StaffServicesLink")).removeClass('active');
            angular.element(document.querySelector("#StaffHoursLink")).removeClass('active');
            angular.element(document.querySelector("#StaffBreakLink")).removeClass('active');
            angular.element(document.querySelector("#StaffTimeOffLink")).addClass('active');



            angular.element(document.querySelector("#sideIconBreaksClickTimeOff")).removeClass('active');
            angular.element(document.querySelector("#sideIconDetailClickTimeOff")).removeClass('active');

            angular.element(document.querySelector("#sideIconDetailClickDetails")).removeClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');

            angular.element(document.querySelector("#sideIconTimeOffClickWHours")).addClass('active');

            angular.element(document.querySelector("#sideIconTimeOffClickTimeOff")).addClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).addClass('hidden');
            angular.element(document.querySelector("#stafftimeOfflinkactive")).addClass('active');

            angular.element(document.querySelector("#stafftimeOfflinkactive")).removeClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffserviceslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffhourslinkactive")).addClass('hidden');
            angular.element(document.querySelector("#staffbreaklinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffhourslinkactive")).removeClass('active');
            angular.element(document.querySelector("#staffserviceslinkactive")).removeClass('active');

            angular.element(document.querySelector("#staff-timeoff")).removeClass('hidden');
            angular.element(document.querySelector("#sideIconServicesClickTimeOff")).removeClass('active');

            angular.element(document.querySelector("#sideIconServicesClickTimeOff")).removeClass('active');
        }




        $scope.EditStaff = function (item) {
            //debugger;


            angular.element(document.querySelector(".tabs-_section")).addClass('hidden');
            angular.element(document.querySelector("#staff-DetailsTAb")).removeClass('hidden');
            angular.element(document.querySelector("#StaffDetailsLink")).addClass('active');
            angular.element(document.querySelector("#sideIconDetailClickDetails")).addClass('active');

            angular.element(document.querySelector("#sideIconTimeOffClickDetails")).removeClass('active');
            angular.element(document.querySelector("#staffdetailsLinkactive")).removeClass('active');


            angular.element(document.querySelector("#StaffServicesLink")).removeClass('active');
            angular.element(document.querySelector("#StaffHoursLink")).removeClass('active');
            angular.element(document.querySelector("#StaffBreakLink")).removeClass('active');
            angular.element(document.querySelector("#StaffTimeOffLink")).removeClass('active');




            angular.element(document.querySelector("#staff-services")).addClass('hidden');
            angular.element(document.querySelector("#staff-hours")).addClass('hidden');
            angular.element(document.querySelector("#staff-break")).addClass('hidden');
            angular.element(document.querySelector("#staff-timeoff")).addClass('hidden');



            angular.element(document.querySelector("#staff_details")).removeClass('hidden');
            angular.element(document.querySelector("#staff_details")).addClass('active');



            $scope.StaffId = item.Id;
            $scope.staffName = item.FirstName;
            $scope.LastName = item.LastName;
            $scope.staffEmail = item.Email;
            $scope.staffMobileNo = item.TelephoneNo;

            //Active and DeActive tab in Staff Section
            //var tabelement1 = angular.element(document.querySelector("#StaffDetailsLink"));
            //tabelement1.addClass('active');
            ////var divelement1 = angular.element(document.querySelector("#staff_details"));
            ////divelement1.addClass('active');
            //var tabelement2 = angular.element(document.querySelector("#StaffServicesLink"));
            //tabelement2.removeClass('active');
            //var tabelement3 = angular.element(document.querySelector("#StaffHoursLink"));
            //tabelement3.removeClass('active');
            //var tabelement4 = angular.element(document.querySelector("#StaffBreakLink"));
            //tabelement4.removeClass('active');
            //var tabelement5 = angular.element(document.querySelector("#StaffTimeOffLink"));
            //tabelement5.removeClass('active');

            //angular.element(document.querySelector("#staff_details")).removeClass('active');
            //angular.element(document.querySelector("#staff-break")).removeClass('active');
            //angular.element(document.querySelector("#staff-hours")).removeClass('active');
            //angular.element(document.querySelector("#staff-timeoff")).removeClass('active');
            //angular.element(document.querySelector("#staff-services")).removeClass('active');

            var ServiceResult = bookingService.GetAllServiceStatus($routeParams.CompanyId, item.Id);
            ServiceResult.then(function (response) {

                var NameElement = document.createElement("label");
                NameElement.innerText = "All Services";
                NameElement.className = "bold_bbName";

                var CostElement = document.createElement("label");
                CostElement.innerText = "Cost";
                CostElement.className = "bold_bb";

                var DurationElement = document.createElement("label");
                DurationElement.innerText = "Duration";
                DurationElement.className = "bold_bb";

                $scope.ListofAllServices = [];
                if (response.data.length > 0) {
                    //var tttt = angular.element(document.querySelector("#Name"));
                    //tttt.addClass('active');
                    ////debugger;
                    $scope.ListofAllServices.push({ "Id": "", "CompanyId": $routeParams.CompanyId, "Name": NameElement.innerText, "CategoryName": "", "CategoryId": "", "DurationInMinutes": DurationElement.innerText, "Cost": CostElement.innerText, "Currency": "", "CreationDate": new Date() })
                    ////debugger;
                }
                angular.forEach(response.data, function (value, key) {
                    $scope.ListofAllServices.push({ "Id": value.Id, "CompanyId": value.CompanyId, "Name": value.Name, "CategoryName": value.CategoryName, "CategoryId": value.CategoryId, "DurationInMinutes": value.DurationInMinutes, "Cost": "$" + value.Cost, "Currency": value.Currency, "CreationDate": new Date(), "Confirmed": value.Confirmed })
                    //  $scope.EmployeeServiceCount = response.data.length;
                });
                if (response.data.length > 0) {
                    $scope.EmployeeServiceCount = response.data[0].AllocatedServiceCount;
                }
                else {
                    $scope.EmployeeServiceCount = 0;
                }

                for (var i = 1; i < $scope.ListofAllServices.length; i++) {
                    if ($scope.ListofAllServices[i].Confirmed == true) {
                        $scope.ListofAllServices[0].Confirmed = true;
                    }
                    else {
                        $scope.ListofAllServices[0].Confirmed = false;
                        break;
                    }
                }
            });
            $scope.GetTimeOffDetail(item.Id);
            $scope.GetWorkingHoursOfEmployee(item.Id);



            ///BreakTimeHours//
            var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(item.Id);
            BreakTimeHours.then(function (response) {
                ////debugger;
                $scope.listofBreakingHours = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Id": response.data[i].Id, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                }

                //}
            })

        }

        //Delete Staff by using wizard Controller DeleteStaff method by api
        $scope.DeleteStaff = function () {
            ////debugger;
            var result = bookingService.DeleteStaff($scope.StaffId);
            result.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Deleting Staff.";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff Deleted.";
                        //$timeout(function () {
                        //    $scope.IsVisible = false;
                        //    $scope.ShowDeletePopUp = false;
                        //    var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                        //    StaffResult.then(function (response) {
                        //        $scope.ListofStaff = [];
                        //        $scope.ListofStaff = response.data;
                        //        if (response.data.length > 0) {
                        //            $scope.EditStaff(response.data[0]);

                        //        }
                        //        else {
                        //            $route.reload();
                        //        }
                        //        $scope.TotalNoOfStaff = $scope.ListofStaff.length;
                        //    });
                        //}, 1000)
                    }, 800)
                }
                $route.reload();
            });

        }

        $scope.UpdateStaff = function () {
            //debugger;
            var CurrentDate = new Date();
            if ($scope.StaffId != null) {
                var requestedStaff =
                    {
                        "Id": $scope.StaffId,
                        "CompanyId": $routeParams.CompanyId,
                        "UserName": $scope.staffEmail,
                        "Password": "",
                        "FirstName": $scope.staffName,
                        "LastName": $scope.LastName,
                        "Address": "",
                        "Email": $scope.staffEmail,
                        "TelephoneNo": $scope.staffMobileNo,
                        "CreationDate": CurrentDate,
                        "Description": $scope.Description
                    }
                var responseresult = bookingService.UpdateStaff(requestedStaff);
                responseresult.then(function (response) {
                    if (response.data.Success == true) {
                        $scope.IsVisible = true;
                        $scope.MessageText = "Saving Staff Details";
                        $timeout(function () {
                            $scope.MessageText = "Staff Details Saved";
                            $timeout(function () {
                                var StaffResult = bookingService.GetAllStaff($routeParams.CompanyId);
                                StaffResult.then(function (response) {
                                    $scope.ListofStaff = [];
                                    $scope.ListofStaff = response.data;
                                    $scope.TotalNoOfStaff = $scope.ListofStaff.length;
                                });
                                $scope.IsVisible = false;
                            }, 1000)
                        }, 800)
                    }
                });
            }
        }

        $scope.AssignServicetoEmployee = function (item) {

            ////debugger;
            if (item.Confirmed == true) {
                //Assigned All Service to Staff
                if (item.Name == "All Services") {
                    // angular.forEach($scope.ListofAllServices, function (value, key) {
                    for (var i = 0; i < $scope.ListofAllServices.length; i++) {
                        if (i > 0) {
                            $scope.ListofAllServices[i].Confirmed = true;
                            var requestedservice = {
                                "Id": "",
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": $scope.StaffId,
                                "ServiceId": $scope.ListofAllServices[i].Id,
                                "CreationDate": new Date()
                            }

                            var responseresult = bookingService.AssignedServicetoStaff(requestedservice);
                            responseresult.then(function (response) {
                                if (response.data.Success == true) {
                                    $scope.MessageText = "Assigning all Service to Staff.";
                                    $scope.IsVisible = true;
                                    $timeout(function () {
                                        $scope.MessageText = "Staff services saved.";
                                        $scope.GetAllocatedStaffServiceCount();
                                        $timeout(function () {
                                            $scope.IsVisible = false;
                                        }, 1000)
                                    }, 800)
                                }
                            })
                        }
                    }
                }
                else {
                    //Assign Service to Staff
                    var requestedservice = {
                        "Id": "",
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": $scope.StaffId,
                        "ServiceId": item.Id,
                        "CreationDate": new Date()
                    }
                    var responseresult = bookingService.AssignedServicetoStaff(requestedservice);
                    responseresult.then(function (response) {
                        $scope.MessageText = "Assigning Service to Staff.";
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.MessageText = "Staff services saved.";
                            $scope.GetAllocatedStaffServiceCount();
                            $timeout(function () {
                                $scope.IsVisible = false;
                            }, 1000)
                        }, 500)
                    })
                }
            }
            else {
                //UnAssign All Service to Staff
                if (item.Name == "All Services") {
                    // angular.forEach($scope.ListofAllServices, function (value, key) {
                    for (var i = 0; i < $scope.ListofAllServices.length; i++) {
                        if (i > 0) {
                            $scope.ListofAllServices[i].Confirmed = false;

                            var responseresult = bookingService.UnAssignServicetoStaff($routeParams.CompanyId, $scope.StaffId, $scope.ListofAllServices[i].Id);
                            responseresult.then(function (response) {
                                if (response.data.Success == true) {
                                    $scope.MessageText = "Unassigning all Service to Staff.";
                                    $scope.IsVisible = true;
                                    $timeout(function () {
                                        $scope.MessageText = "Staff services saved.";
                                        $scope.GetAllocatedStaffServiceCount();
                                        $timeout(function () {
                                            $scope.IsVisible = false;
                                        }, 1000)
                                    }, 500)
                                }
                            })
                        }
                    }

                }
                else {
                    //Unassign Service to Staff//
                    var responseresult = bookingService.UnAssignServicetoStaff($routeParams.CompanyId, $scope.StaffId, item.Id);
                    responseresult.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Removing Service from Staff.";
                            $scope.IsVisible = true;

                            $timeout(function () {
                                $scope.MessageText = "Staff services saved.";
                                $scope.GetAllocatedStaffServiceCount();
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000)
                            }, 500)
                        }
                    })
                }
            }


            for (var i = 1; i < $scope.ListofAllServices.length; i++) {
                if ($scope.ListofAllServices[i].Confirmed == true) {
                    $scope.ListofAllServices[0].Confirmed = true;
                }
                else {
                    $scope.ListofAllServices[0].Confirmed = false;
                    break;
                }
            }

        }

        //Get Allocated Staff Service Count//
        $scope.GetAllocatedStaffServiceCount = function () {
            ////debugger;
            var ServiceResult = bookingService.GetAllServiceStatus($routeParams.CompanyId, $scope.StaffId);
            ServiceResult.then(function (response) {
                $scope.EmployeeServiceCount = response.data[0].AllocatedServiceCount != null ? response.data[0].AllocatedServiceCount : 0;
            });
        }





        $scope.EnabledDisabledDay = function (timeInfo) {
            ////debugger;
            angular.forEach($scope.WorkingHours, function (value, key) {
                if (timeInfo.Day == value.Day) {
                    var CurrentDate = new Date();


                    if (timeInfo.Available == false) {
                        var workinghours =
                            {
                                "Id": 1,
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": $scope.StaffId,
                                "Start": value.StartTime,
                                "End": value.EndTime,
                                "NameOfDay": value.NameOfDay,
                                "NameOfDayAsString": value.Day,
                                "IsOffAllDay": false,
                                "CreationDate": CurrentDate
                            }
                        var result = bookingService.SetEmployeeWorkingHours(workinghours);
                        result.then(function (response) {
                            if (response.data.Success == true) {
                                //Geting Break Hours.As days are enabled/disabled//
                                var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee($scope.StaffId);
                                BreakTimeHours.then(function (response) {
                                    ////debugger;
                                    $scope.listofBreakingHours = [];
                                    for (var i = 0; i < response.data.length; i++) {
                                        $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                                    }
                                })
                                $scope.MessageText = "Saving Staff Working Hours";
                                $scope.IsVisible = true;
                                $timeout(function () {
                                    $scope.MessageText = "Staff working hours saved"
                                    $timeout(function () {
                                        $scope.IsVisible = false;
                                    }, 1000);
                                }, 800);
                            }
                        });

                        value.Available = true;
                    }
                    else {
                        var workinghours =
                            {
                                "Id": 1,
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": $scope.StaffId,
                                "Start": value.StartTime,
                                "End": value.EndTime,
                                "NameOfDay": value.NameOfDay,
                                "NameOfDayAsString": value.Day,
                                "IsOffAllDay": true,
                                "CreationDate": CurrentDate
                            }
                        var result = bookingService.SetEmployeeWorkingHours(workinghours);
                        result.then(function (response) {
                            if (response.data.Success == true) {
                                //Geting Break Hours.As days are enabled/disabled//
                                var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee($scope.StaffId);
                                BreakTimeHours.then(function (response) {
                                    ////debugger;
                                    $scope.listofBreakingHours = [];
                                    for (var i = 0; i < response.data.length; i++) {
                                        $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                                    }
                                })
                                $scope.MessageText = "Saving Staff Working Hours";
                                $scope.IsVisible = true;
                                $timeout(function () {
                                    $scope.MessageText = "Staff working hours saved"
                                    $timeout(function () {
                                        $scope.IsVisible = false;
                                    }, 1000);
                                }, 800);
                            }
                        });
                        value.Available = false;
                    }
                }
            });



        }

        //Set Enable and disable working Time
        $scope.SetEmployeeWorkingTime = function (timedetail) {
            ////debugger;
            var CurrentDate = new Date();
            var workinghours =
                {
                    "Id": 1,
                    "CompanyId": $routeParams.CompanyId,
                    "EmployeeId": $scope.StaffId,
                    "Start": timedetail.StartTime,
                    "End": timedetail.EndTime,
                    "NameOfDay": timedetail.NameOfDay,
                    "NameOfDayAsString": timedetail.Day,
                    "IsOffAllDay": false,
                    "CreationDate": CurrentDate
                }
            // $scope.CurrentWorkingHourData = workinghours;
            var result = bookingService.SetEmployeeWorkingHours(workinghours);
            //  //debugger;
            result.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Saving Staff Working Hours";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff working hours saved"
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000);
                    }, 800);
                }
            });
        }

        //Get Working Hours of Employee//
        $scope.GetWorkingHoursOfEmployee = function (EmployeeId) {
            //debugger
            var result = bookingService.GetWorkingHoursofEmployee(EmployeeId);
            result.then(function (response) {
                $scope.WorkingHours = [];
                angular.forEach(response.data, function (value, key) {
                    var available = false;
                    if (value.IsOffAllDay == false) {
                        available = true;
                    }
                    $scope.WorkingHours.push({ "Id": value.Id, "EmployeeId": value.EmployeeId, "Day": value.NameOfDayAsString, "StartTime": value.Start, "EndTime": value.End, "Available": available, "NameOfDay": value.NameOfDay });
                })
            });
        }

        //Set Time Off//
        $scope.AddtimeOff = function () {
            ////debugger;
            var StartDate = new Date($scope.startdate);
            var EndDate = new Date($scope.enddate);


            if ($scope.StartoffTime != null) {
                var hours = Number($scope.StartoffTime.match(/^(\d+)/)[1]);
                var minutes = Number($scope.StartoffTime.match(/:(\d+)/)[1]);
                var AMPM = $scope.StartoffTime.match(/\s(.*)$/)[1];
                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                var startHours = hours.toString();
                var startMinutes = minutes.toString();
                if (hours < 10) startHours = "0" + startHours;
                if (minutes < 10) startMinutes = "0" + startMinutes;

                var StartTimeHour = parseInt(startHours);

                var hours = Number($scope.EndoffTime.match(/^(\d+)/)[1]);
                var minutes = Number($scope.EndoffTime.match(/:(\d+)/)[1]);
                var AMPM = $scope.EndoffTime.match(/\s(.*)$/)[1];
                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                var endHours = hours.toString();
                var endMinutes = minutes.toString();
                if (hours < 10) endHours = "0" + endHours;
                if (minutes < 10) endMinutes = "0" + endMinutes;

                var EndTimeHour = parseInt(endHours);

            }

            if (StartDate > EndDate) {
                $scope.MessageText = "Start date cannot be greater than end date.";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 800);
                return false;
            }
            if (StartDate.getDate() == EndDate.getDate() && StartDate.getMonth() == EndDate.getMonth() && StartDate.getYear() == EndDate.getYear() && StartTimeHour >= EndTimeHour) {
                $scope.MessageText = "End time cannot be greater or equal to start time.";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 800);
                return false;
            }
            var timeOff = {
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": $scope.StaffId,
                "StartDate": $scope.startdate,
                "EndDate": $scope.enddate,
                "StartTime": $scope.StartoffTime,
                "EndTime": $scope.EndoffTime,
                "CreationDate": new Date(),
                "IsOffAllDay": $scope.alldaystatus
            }
            var result = bookingService.AddtimeOff(timeOff);
            result.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Saving TimeOff";
                    $scope.IsVisible = true;

                    $timeout(function () {
                        $scope.MessageText = "TimeOff Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                            angular.element(document.querySelector('#timeoffPopUp')).css('display', 'None');
                            $scope.isVisibleTimeOffPopup = true;
                            $scope.GetTimeOffDetail($scope.StaffId);

                        }, 1000)
                    }, 800)
                }
            });
        }


        $scope.$watch("startdate", function (newvalue, oldvalue) {
            $scope.enddate = newvalue;
        });

        $scope.AddtimeoffPopup = function () {
            // //debugger;
            $scope.startdate = new Date();
            var currentDate = $scope.startdate;
            var currentDay = currentDate.getDay();
            angular.forEach($scope.WorkingHours, function (value, key) {
                if (value.NameOfDay == currentDay) {
                    $scope.StartoffTime = value.StartTime;
                    $scope.EndoffTime = value.EndTime;
                }
            });
            // $scope.StartoffTime = "08:00 AM";
            //$scope.EndoffTime = "05:00 PM";
            $scope.alldaystatus = true
        }



        $scope.SetEmployeeBreakTime = function (time) {
            ////debugger;

            var BreakTime = {
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": time.EmployeeId,
                "DayOfWeek": time.DayOfWeek,
                "Start": time.StartEndTime[0].Start,
                "End": time.StartEndTime[0].End,
                "CreationDate": new Date()
            }
            var apirequest = bookingService.AddEmployeeBreakTime(BreakTime);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    ////debugger;
                    var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(time.EmployeeId);
                    BreakTimeHours.then(function (response) {
                        ////debugger;
                        $scope.listofBreakingHours = [];
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                        }
                    })


                    $scope.MessageText = "Saving staff breaks";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "staff breaks saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 800)
                }
            });
        }

        $scope.UpdateTimeOff = function () {
            ////debugger;
            var UpdatedTimeoff = {
                "Id": $scope.TimeOffId,
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": $scope.StaffId,
                "StartDate": $scope.EditStartDate,
                "EndDate": $scope.EditEndDate,
                "StartTime": $scope.EditStartoffTime,
                "EndTime": $scope.EditEndoffTime,
                "CreationDate": new Date(),
                "IsOffAllDay": $scope.alldaystatus
            }

            var apirequest = bookingService.UpdateTimeOff(UpdatedTimeoff);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Saving Timeoff";
                    $scope.IsVisible = true;
                    $scope.GetTimeOffDetail($scope.StaffId);
                    angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'none');
                    $timeout(function () {
                        $scope.MessageText = "Timeoff Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 800)
                }
            })
        }

        $scope.EditTimeOff = function (item) {
            ////debugger;
            angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'block');
            $scope.TimeOffId = item.Id;
            var StartDateTime = item.Start.split('T');
            var EndDateTime = item.End.split('T');
            $scope.EditStartDate = $filter('date')(StartDateTime[0], 'dd MMM yyyy');
            $scope.EditEndDate = $filter('date')(EndDateTime[0], 'dd MMM yyyy');
            $scope.alldaystatus = item.IsOffAllDay;

            var Time = StartDateTime[1].split(":");
            var Stime = new Date(1970, 5, 6, Time[0], Time[1], Time[2]);
            var FormatedTime = $filter('date')(Stime, 'hh:mm a')
            $scope.EditStartoffTime = FormatedTime;

            var Time = EndDateTime[1].split(":");
            var Stime = new Date(1970, 5, 6, Time[0], Time[1], Time[2]);
            var FormatedTime = $filter('date')(Stime, 'hh:mm a')
            $scope.EditEndoffTime = FormatedTime;


        }


        $scope.Deletetimeoff = function () {
            ////debugger;
            var apirequest = bookingService.DeleteTimeOff($scope.TimeOffId);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Deleting TimeOff";
                    $scope.IsVisible = true;

                    angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'none');
                    $timeout(function () {
                        $scope.MessageText = "TimeOff Deleted";
                        $scope.GetTimeOffDetail($scope.StaffId);
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 700)
                    }, 1000)
                }
            })
        }

        $scope.CloseEditTimeOffModel = function () {
            ////debugger;
            angular.element(document.querySelector('#UpdatetimeoffPopUp')).css('display', 'none');
        }


        $scope.GetTimeOffDetail = function (Id) {
            ////debugger;
            var result = bookingService.GetTimeOffDetail(Id);
            result.then(function (response) {
                $scope.timeOffDetail = response.data;
            });
        }

        $scope.AddBreak = function (item) {
            ////debugger;
            var BreakTime = {

                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": item.EmployeeId,
                "DayOfWeek": item.DayOfWeek,
                "Start": "1:00 PM ",
                "End": "2:00 PM",
                "CreationDate": new Date()
            }
            // $scope.SetEmployeeBreakTime(BreakTime);


            var apirequest = bookingService.AddEmployeeBreakTime(BreakTime);
            apirequest.then(function (response) {
                if (response.data.Success == true) {
                    ////debugger;
                    //var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(item.EmployeeId);
                    //BreakTimeHours.then(function (response) {
                    //    //debugger;
                    //    $scope.listofBreakingHours = [];
                    //    for (var i = 0; i < response.data.length; i++) {
                    //        $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                    //    }
                    //})
                    $scope.GetBreakHours(item.EmployeeId);

                    $scope.MessageText = "Saving staff break";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "staff break saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 800)
                }
            });
        }
        //Update BreakTime of Employee
        $scope.UpdateBreakTime = function (time, status) {
            ////debugger;
            var UpdatedbreakTime = {
                "Id": time.Id,
                "CompanyId": $routeParams.CompanyId,
                "EmployeeId": $scope.StaffId,
                "DayOfWeek": time.DayOfWeek,
                "Start": time.Start,
                "End": time.End,
                "CreationDate": new Date()
            }
            var ApiRequest = bookingService.UpdateBreakTime(UpdatedbreakTime, status);
            ApiRequest.then(function (response) {
                if (response.data.Success == true) {

                    $scope.MessageText = "Saving staff break";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "staff breaks saved";
                        $scope.GetBreakHours($scope.StaffId); $scope.listofBreakingHours
                        $timeout(function () {

                            $scope.IsVisible = false;
                        }, 1000)
                    }, 500)
                }
            })
        }



        //Delete BreakTime of Employee//
        $scope.DeleteBreakTime = function (Id) {
            ////debugger;
            var requestapi = bookingService.DeleteBreak(Id);
            requestapi.then(function (response) {
                if (response.data.Success == true) {
                    $scope.GetBreakHours($scope.StaffId);
                    $scope.MessageText = "Saving Staff Breaks";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Staff Breaks Saved";
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 800)
                    }, 1000)
                }

            })
        }



        $scope.GetBreakHours = function (Id) {
            ////debugger;
            var BreakTimeHours = bookingService.GetBreakTimeHoursofEmployee(Id);
            BreakTimeHours.then(function (response) {
                ////debugger;
                $scope.listofBreakingHours = [];
                for (var i = 0; i < response.data.length; i++) {
                    $scope.listofBreakingHours.push({ "EmployeeId": response.data[i].EmployeeId, "Id": response.data[i].Id, "Available": response.data[i].Available, "CompanyId": response.data[i].CompanyId, "Day": response.data[i].Day, "DayOfWeek": response.data[i].DayOfWeek, "CreationDate": response.data[i].CreationDate, "StartEndTime": response.data[i].StartEndTime });
                }
            })
        }

        $scope.Logout = function () {
            ////debugger;
            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }




        $scope.SetWorkingHours = function (timedata) {
            //debugger;
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


//app.filter('startFrom', function () {
//    return function (input, start) {
//        start = +start; //parse to int
//        //return input.slice(start);
//        return input.slice(start);
//    }
//});

app.filter('startFrom', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});