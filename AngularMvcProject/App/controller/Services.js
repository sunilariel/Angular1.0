app.controller("servicesController", ['$scope', '$http', '$routeParams', '$filter', '$timeout', '$location', 'bookingService', '$rootScope', '$route',
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
        $scope.redirecttoServices = function () {
            //debugger;
            $location.path("/Services/" + $routeParams.CompanyId);
            //debugger;
            $scope.init();
            var tttt = angular.element(document.querySelector("#redirecttoservicesactive"));
            tttt.addClass('active');
            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');
            //debugger;
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
        $scope.redirecttoNotifications = function () {
            $location.path("/Payments/" + $routeParams.CompanyId);
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
        $scope.init = function () {
            $scope.IsAdmin = bookingService.IsAdmin();

            $(".left_sidebar").removeClass("show-leftbar");
            var tttt = angular.element(document.querySelector("#redirecttoservicesactive"));
            tttt.addClass('active');
            angular.element(document.querySelector("#redirecttostaffactive")).removeClass('active');

            $scope.showAddServiceDiv = true;
            $scope.showCategoryServicesDiv = true;

            if (servicenameform.ServiceName.value == "") {
                $scope.showAllServicesDiv = true;
            }
            else {
                $scope.showAllServicesDiv = false;
            }


            //$scope.CategoryCheckedCount = 0;
            $scope.EditServiceDiv = true;
            $scope.ShowDeletePopUp = false;

            $scope.ColourCode = "#f0c2c1";
            $scope.BorderColourCode = "1px solid #e59190";

            $scope.ServiceColourList = [{ "BackgroundColour": "Red", "ColourCode": "#f0c2c1", "BorderColourCode": " 1px solid #e59190" },
            { "BackgroundColour": "Light gray", "ColourCode": "#e1e0e2", "BorderColourCode": "1px solid  #a9a8a9" },
            { "BackgroundColour": "Green", "ColourCode": "#cae79e", "BorderColourCode": "1px solid  #7bc40d" },
            { "BackgroundColour": "Light blue", "ColourCode": "#bbe6e1", "BorderColourCode": "1px solid  #55bfb3" },
            { "BackgroundColour": "Maroon", "ColourCode": "#e6dbcb", "BorderColourCode": "1px solid  #c4a981" },
            { "BackgroundColour": "Deep sky blue", "ColourCode": "#b5cedb", "BorderColourCode": "1px solid  #4484a4" },
            { "BackgroundColour": "Violet", "ColourCode": "#e1c6e1", "BorderColourCode": "1px solid #b597e8" },
            { "BackgroundColour": "Yellow", "ColourCode": "#f3e7ae", "BorderColourCode": "1px solid  #d4b825" },
            { "BackgroundColour": "Orange", "ColourCode": "#fadeb3", "BorderColourCode": "1px solid  #f2a836" },
            ]

            //angular.element(document.querySelector("#allservice")).addClass("selected");


            var CompanyId = $routeParams.CompanyId;
            var responsedata = bookingService.GetCategories(CompanyId);
            responsedata.then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.Categories = [];
                    $scope.Categories = response.data;
                    $scope.CategoriesCount = response.data.length;
                }
                else {
                    $scope.Categories = [];
                    $scope.CategoriesCount = 0;
                }
            });

            //Get All Services of particular CompanyId//
            var responsedata = bookingService.GetAllService($routeParams.CompanyId);
            responsedata.then(function (response) {

                $scope.AllServices = [];
                $scope.AllServices = response.data;


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

        //Show the AddService Section with staff name
        $scope.AddServicePopup = function () {


            angular.element(document.querySelector("#timeRequired")).addClass('ng-hide');
            angular.element(document.querySelector("#nameRequired")).addClass('ng-hide');
            angular.element(document.querySelector("#removeName-has-error")).removeClass('has-error');
            angular.element(document.querySelector("#removetime-has-error")).removeClass('has-error');

            $scope.hidecategoryList = {
                show: true,
                hide: true
            };
            $scope.ServiceName = "";
            $scope.ServiceCost = "";
            $scope.ServiceTime = "";
            $scope.BufferTime = "";
            $scope.ServiceDescription = "";

            var responsedata = bookingService.GetAllStaff($routeParams.CompanyId);

            responsedata.then(function (response) {
                var NameElement = document.createElement("label");
                NameElement.innerText = "All Staff";
                NameElement.className = "bold_bbName";
                $scope.staffList = [];
                $scope.staffList.push({ 'Id': "", 'CompanyId': "", 'UserName': "", 'staffName': NameElement.innerText, 'staffEmail': "" });
                for (var i = 0; i < response.data.length; i++) {
                    $scope.staffList.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }
            });

            //Hide the other div 
            $scope.showAddServiceDiv = false;
            $scope.showAllServicesDiv = true;
            $scope.showCategoryServicesDiv = true;
        }


        $scope.showAllServicePopup = function () {

            //debugger;
            angular.element(document.querySelector("#nameRequired")).addClass('ng-hide');
            angular.element(document.querySelector("#timeRequired")).addClass('ng-hide');
            $scope.init();
            if ($scope.ServiceDividedByCategory) {
                //debugger;

                var id = $scope.CategoryId;
                //var name = $scope.CategoryName
                //item = [];
                //item.id = id;
                //item.name = name;
                //$scope.ShowCategoryService(item);
                angular.element(document.querySelector(".row_section")).addClass('hidden');
                $scope.EditServiceDiv = true;
                $scope.showCategoryServicesDiv = false;
                $scope.showAddServiceDiv = true;
                $scope.CategoryId = id;
                $scope.showAllServicesDiv = true;

            }
            else if ($scope.AllServices) {

                angular.element(document.querySelector(".row_section")).addClass('hidden');
                $scope.showAllServicesDiv = false;
                $scope.showcategoryList = {
                    show: true,
                    hide: true
                };
                $scope.showCategoryServicesDiv = true;
                $scope.showAddServiceDiv = true;
                $scope.CategoryId = null;
                $scope.EditServiceDiv = true;
            }


            //$scope.init();
        }

        $scope.showServicePage = function () {
            //debugger;
            angular.element(document.querySelector(".row_section")).removeClass('hidden');
            $scope.showAllServicesDiv = true;
            $scope.hidecategoryList = false;
            //$scope.init();
        }
        $scope.showServiceCPage = function () {
            //debugger;
            $scope.init();
            angular.element(document.querySelector(".row_section")).removeClass('hidden');
            $scope.showAllServicesDiv = true;
            $scope.hidecategoryList = false;
            $scope.showCategoryServicesDiv = true;
            $scope.ServiceDividedByCategory = null;
            //$scope.init();
        }

        $scope.ShowCategoryService = function (item) {
            //debugger;
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

        //Updating Category Name//
        $scope.EditCategory = function (categoryName) {
            //debugger;

            var updatedcategory =
                {
                    "Id": $scope.CategoryId,
                    "CompanyId": $routeParams.CompanyId,
                    "Name": categoryName,
                    "CreationDate": "2017-07-04T05:49:29.2657661+00:00"
                }
            var responseresult = bookingService.UpdateCategory(updatedcategory);
            responseresult.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Saving Category Name."
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Category Name Saved"

                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    }, 500);
                }

            });

        }

        //Delete Category//

        $scope.DeleteCategory = function (item) {
            //debugger;
            //alert("delete");
            //var r = confirm("Are you sure you want to delete this item?");
            //if (r ==true) {
            //$scope.showAllServicesDiv = false;
            var responseresult = bookingService.DeleteCategory($routeParams.CompanyId, $scope.CategoryId);
            responseresult.then(function (response) {
                if (response.data.Success == true) {
                    $scope.MessageText = "Only Category will be deleted not the service."
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Category Deleted."
                        $timeout(function () {
                            $scope.IsVisible = false;
                            $scope.init();
                            $route.reload();
                            angular.element(document.querySelector(".row_section")).removeClass('hidden');
                            $scope.showAllServicesDiv = true;
                            $scope.hidecategoryList = false;
                            $scope.showCategoryServicesDiv = true;
                            $scope.ServiceDividedByCategory = null;
                        }, 500)
                    }, 800);

                }

            });
            //}
            //else {
            //    $scope.init();
            //    angular.element(document.querySelector(".row_section")).removeClass('hidden');
            //    $scope.showAllServicesDiv = true;
            //    $scope.hidecategoryList = false;
            //    $scope.showCategoryServicesDiv = true;
            //    $scope.ServiceDividedByCategory = null;
            //    //debugger;
            //    $route.reload();
            //}          
        }



        $scope.AddCategory = function () {

            var CurrentDate = new Date();
            var data = {
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "Name": $scope.CategoryName,
                "CreationDate": CurrentDate
            }
            var response = bookingService.AddCategory(data);

            response.then(function (response) {
                if (response.data.Success == true) {

                    var CompanyId = $routeParams.CompanyId;
                    var responsedata = bookingService.GetCategories(CompanyId);
                    responsedata.then(function (response) {
                        if (response.data.length > 0) {
                            $scope.Categories = [];
                            $scope.Categories = response.data;
                            $scope.CategoriesCount = response.data.length;
                        }
                    })

                    $scope.MessageText = "Adding new Category";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Added new Category";
                        $timeout(function () {
                            $scope.IsVisible = false;
                            $scope.showcategorypopup = false;
                            $scope.CategoryName = "";
                        }, 800)
                    }, 1000);
                }
            });
        }


        $scope.CategoryCancel = function () {
            $scope.showcategorypopup = false
            $scope.CategoryName = "";
        }

        $scope.GetColour = function (Colour, ColourCode, BorderColourCode) {

            $scope.ColourCode = ColourCode;
            $scope.BorderColourCode = BorderColourCode;
            $scope.Colour = Colour;
        }



        $scope.SaveService = function (form) {
            //debugger;
            if ($scope.servicenameform.$invalid) {
                angular.element(document.querySelector("#nameRequired")).removeClass('ng-hide');
                //angular.element(document.querySelector("#nameRequired")).removeClass('help-block');
                //angular.element(document.querySelector("#nameRequired")).addClass('has-error-service');

                //alert("dhdhddh");

            }
            if ($scope.servicedetailform.ServiceTime.$invalid) {
                angular.element(document.querySelector("#timeRequired")).removeClass('ng-hide');
            }
            if (servicenameform.ServiceName.value == "") {
                $scope.MessageText = "Service name cannot be empty!";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            if (servicedetailform.ServiceTime.value == "") {
                $scope.MessageText = "Service time cannot be empty!";
                $scope.ServiceTime = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            if (servicedetailform.ServiceTime.value == 0 || servicedetailform.ServiceTime.value.includes(".")) {
                $scope.MessageText = "Service time cannot be zero or decimal!";
                $scope.ServiceTime = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            if (isNaN(servicedetailform.ServiceTime.value)) {
                $scope.MessageText = "Service time should be number!";
                $scope.ServiceTime = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            if (isNaN(servicenameform.ServiceCost.value)) {
                $scope.MessageText = "Service Cost should be number!";
                $scope.ServiceCost = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }

            for (var i = 0; i < $scope.staffList.length; i++) {
                if ($scope.staffList[i].confirmed == true) {
                    $scope.StaffAssigned = true;
                    break;
                }
                else {
                    $scope.StaffAssigned = false;
                }
            }
            if ($scope.StaffAssigned == false) {

                $scope.MessageText = "At Least one staff should be assigned!";
                $scope.IsVisible = true;
                $timeout(function () {

                    $scope.IsVisible = false;
                }, 1000)
                return false;

            }
            var service = {
                "Id": "",
                "CompanyId": $routeParams.CompanyId,
                "Name": $scope.ServiceName,
                "Description": $scope.ServiceDescription,
                "CategoryName": "",
                "CategoryId": null,
                "DurationInMinutes": $scope.ServiceTime,
                "DurationInHours": 0,
                "Cost": $scope.ServiceCost,
                "Currency": "",
                "Colour": $scope.ColourCode,
                "Buffer": $scope.BufferTime,
                "CreationDate": "2017-06-26T11:08:28.4943519+00:00"
            }

            var responsedata = bookingService.AddServices(service);



            responsedata.then(function (response) {
                //debugger;
                if (response.data.ReturnObject.ServiceId == 0) {
                    //if (response.data.Message.includes("Already Exists")) {
                        $scope.MessageText = "Service Already Exists";
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                    //}
                }
                else {
                    $scope.ServiceId = response.data.ReturnObject.ServiceId;

                    //Assign Staff to Service
                    angular.forEach($scope.staffList, function (value, key) {

                        if (value.staffName != "All Staff" && value.confirmed == true) {
                            var CurrentDate = new Date();
                            var requestdata = {
                                "Id": "",
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": value.Id,
                                "ServiceId": $scope.ServiceId,
                                "CreationDate": CurrentDate
                            }
                            var responseresult = bookingService.AssignStafftoService(requestdata);
                            responseresult.then(function (response) {

                            })
                        }
                    });


                    //Assign Category to Service
                    angular.forEach($scope.Categories, function (value, key) {
                        if (value.hasOwnProperty("Confirmed") == true) {
                            if (value.Confirmed == true) {
                                //var responsedata = bookingService.AssignCategoryToService($scope.ServiceId, value.Id);\                                                            
                                //var responsedata = bookingService.UpdateService(updatedservice);
                                var responsedata = bookingService.AssignCategorytoService($routeParams.CompanyId, $scope.ServiceId, value.Id);
                                responsedata.then(function (response) {
                                    if (response.data.Success == true) {
                                        $scope.MessageText = "Service Saved";
                                        $scope.IsVisible = true;
                                        $timeout(function () {

                                            $scope.IsVisible = false;
                                        }, 1000);

                                        //Empty the value in element//
                                        $scope.ServiceName = "";
                                        $scope.ServiceTime = "";
                                        $scope.ServiceCost = "";
                                        $scope.BufferTime = "";
                                        angular.element(document.querySelector("#nameRequired")).addClass('ng-hide');
                                        $scope.ServiceDescription = "";
                                    }
                                })

                            }
                        }

                    });
                    $scope.showcategoryList = {
                        show: true,
                        hide: true
                    };
                    $scope.init();
                }




                //if (response.data.Success == false) {
                //    //debugger;
                //    if (response.data.Message.includes("Already Exists")) {
                //        $scope.MessageText = "Service Already Exists";
                //        $scope.IsVisible = true;
                //        $timeout(function () {
                //            $scope.IsVisible = false;
                //        }, 1000)
                //    }
                //}
                //if (response.data.Success == true) {
                //    //debugger;

                //    $scope.ServiceId = response.data.ReturnObject.ServiceId;

                //    //Assign Staff to Service
                //    angular.forEach($scope.staffList, function (value, key) {

                //        if (value.staffName != "All Staff" && value.confirmed == true) {
                //            var CurrentDate = new Date();
                //            var requestdata = {
                //                "Id": "",
                //                "CompanyId": $routeParams.CompanyId,
                //                "EmployeeId": value.Id,
                //                "ServiceId": $scope.ServiceId,
                //                "CreationDate": CurrentDate
                //            }
                //            var responseresult = bookingService.AssignStafftoService(requestdata);
                //            responseresult.then(function (response) {

                //            })
                //        }
                //    });


                //    //Assign Category to Service
                //    angular.forEach($scope.Categories, function (value, key) {
                //        if (value.hasOwnProperty("Confirmed") == true) {
                //            if (value.Confirmed == true) {
                //                //var responsedata = bookingService.AssignCategoryToService($scope.ServiceId, value.Id);\                                                            
                //                //var responsedata = bookingService.UpdateService(updatedservice);
                //                var responsedata = bookingService.AssignCategorytoService($routeParams.CompanyId, $scope.ServiceId, value.Id);
                //                responsedata.then(function (response) {
                //                    if (response.data.Success == true) {
                //                        $scope.MessageText = "Service Saved";
                //                        $scope.IsVisible = true;
                //                        $timeout(function () {

                //                            $scope.IsVisible = false;
                //                        }, 1000);

                //                        //Empty the value in element//
                //                        $scope.ServiceName = "";
                //                        $scope.ServiceTime = "";
                //                        $scope.ServiceCost = "";
                //                        $scope.BufferTime = "";
                //                        $scope.ServiceDescription = "";
                //                    }
                //                })

                //            }
                //        }

                //    });
                //    $scope.showcategoryList = {
                //        show: true,
                //        hide: true
                //    };
                //    $scope.init();
                //}
            })

            angular.element(document.querySelector(".row_section")).addClass('hidden');


        }


        $scope.EditService = function (item) {
            //debugger;

            $scope.hidecategoryList = {
                show: true,
                hide: true
            };
            $scope.ServiceId = item.Id;
            $scope.ServiceName = item.Name;
            $scope.ServiceCost = item.Cost;
            $scope.UpdateServiceTime = item.DurationInMinutes;
            $scope.ServiceDescription = item.Description;
            $scope.BufferTime = item.Buffer;

            //Get Colour Code of Service//
            angular.forEach($scope.ServiceColourList, function (value, key) {
                if (value.ColourCode == item.Colour) {
                    $scope.ColourCode = value.ColourCode;
                    $scope.BorderColourCode = value.BorderColourCode;
                }
            })

            //Get all Staff assigned to particular Service.
            var responsedata = bookingService.GetAllStaff($routeParams.CompanyId);

            responsedata.then(function (response) {
                var NameElement = document.createElement("label");
                NameElement.innerText = "All Staff";
                NameElement.className = "bold_bbName";

                $scope.staffList = [];
                if (response.data.length > 0) {
                    $scope.staffList.push({ 'Id': "", 'CompanyId': "", 'UserName': "", 'staffName': NameElement.innerText, 'staffEmail': "" });
                }
                for (var i = 0; i < response.data.length; i++) {
                    $scope.staffList.push({ 'Id': response.data[i].Id, 'CompanyId': response.data[i].CompanyId, 'UserName': response.data[i].UserName, 'staffName': response.data[i].FirstName, 'staffEmail': response.data[i].Email });
                }

                //Get Assigned Staff to Service//
                var responseresult = bookingService.GetEmployeeAssignedtoService($scope.ServiceId);
                responseresult.then(function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        angular.forEach($scope.staffList, function (value, key) {
                            if (value.Id == response.data[i].Id) {
                                value.confirmed = true;
                            }
                        })
                    }
                    if ($scope.staffList.length == response.data.length + 1) {
                        $scope.staffList[0].confirmed = true;
                    }
                });


            });


            //Get All Categories assigned to service//
            var response = bookingService.GetCategoriesAssignedToService($routeParams.CompanyId, $scope.ServiceId);
            response.then(function (response) {
                $scope.CategoryCheckedCount = response.data.length;
                for (var i = 0; i < response.data.length; i++) {
                    angular.forEach($scope.Categories, function (value, key) {
                        if (response.data[i].Id == value.Id) {
                            value.Confirmed = true;
                        }
                    })
                }
            })


            $scope.EditServiceDiv = false;
            $scope.showAddServiceDiv = true;
            $scope.showCategoryServicesDiv = true;
            $scope.showAllServicesDiv = true;

        }

        //Update Service//

        $scope.updateService = function () {
            //debugger;

            if ($scope.ServiceName == "") {
                $scope.MessageText = "Service name cannot be zero!";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            var UpdatedServiceTime = $("#UpdateServiceTime").val();

            if ($scope.UpdateServiceTime == "" || UpdatedServiceTime.indexOf(".") > 0 || $scope.UpdateServiceTime == 0) {
                if ($scope.UpdateServiceTime == "0" || UpdatedServiceTime.indexOf(".") > 0) {
                    $scope.MessageText = "Service Time cannot be zero or decimal!";
                }
                else {
                    $scope.MessageText = "Service time cannot be empty!";
                }
                $scope.UpdateServiceTime = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            if (isNaN($scope.UpdateServiceTime)) {
                $scope.MessageText = "Service time should be number!";
                $scope.UpdateServiceTime = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }
            if (isNaN($scope.ServiceCost)) {
                $scope.MessageText = "Service Cost should be number!";
                $scope.ServiceCost = "";
                $scope.IsVisible = true;
                $timeout(function () {
                    $scope.IsVisible = false;
                }, 1000);
                return false;
            }

            var CurrentDate = new Date();
            var UpdatedService =
                {
                    "Id": $scope.ServiceId,
                    "CompanyId": $routeParams.CompanyId,
                    "Name": $scope.ServiceName,
                    "Description": $scope.ServiceDescription,
                    "CategoryName": "",
                    "CategoryId": null,
                    "DurationInMinutes": $scope.UpdateServiceTime,
                    "DurationInHours": "",
                    "Cost": $scope.ServiceCost,
                    "Currency": "",
                    "Colour": $scope.ColourCode,
                    "Buffer": $scope.BufferTime,
                    "CreationDate": "2017-07-05T05:21:50.3448321+00:00"
                }
            $scope.UpdatedServiceCopy = {
                "Id": $scope.ServiceId,
                "CompanyId": $routeParams.CompanyId,
                "Name": $scope.ServiceName,
                "Description": $scope.ServiceDescription,
                "CategoryName": "",
                "CategoryId": null,
                "DurationInMinutes": $scope.UpdateServiceTime,
                "DurationInHours": "",
                "Cost": $scope.ServiceCost,
                "Currency": "",
                "Colour": $scope.ColourCode,
                "Buffer": $scope.BufferTime,
                "CreationDate": "2017-07-05T05:21:50.3448321+00:00"
            }
            var result = bookingService.UpdateService(UpdatedService);
            result.then(function (response) {
                if (response.data.Success == true) {
                    //debugger;
                    if ($scope.ServiceDividedByCategory != null) {
                        $scope.ServiceDividedByCategory[0].Cost = $scope.UpdatedServiceCopy.Cost;
                        $scope.ServiceDividedByCategory[0].Name = $scope.UpdatedServiceCopy.Name;
                        $scope.ServiceDividedByCategory[0].DurationInMinutes = $scope.UpdatedServiceCopy.DurationInMinutes;
                    }

                    $scope.MessageText = "Saving Service";
                    $scope.IsVisible = true;
                    $timeout(function () {
                        $scope.MessageText = "Service Saved";
                        $scope.init();
                        $timeout(function () {
                            $scope.IsVisible = false;
                        }, 1000)
                        $scope.EditServiceDiv = false;
                        $scope.showAddServiceDiv = true;
                        $scope.showCategoryServicesDiv = true;
                        $scope.showAllServicesDiv = true;
                    }, 500)
                }
            });

            //var response = bookingService.GetCategoriesAssignedToService($routeParams.CompanyId, $scope.ServiceId);
            ////debugger;
            //response.then(function (response) {
            //    $scope.CategoryCheckedCount = response.data.length;
            //    for (var i = 0; i < response.data.length; i++) {
            //        angular.forEach($scope.Categories, function (value, key) {
            //            if (response.data[i].Id == value.Id) {
            //                value.Confirmed = true;
            //            }
            //        })
            //    }
            //})

        }


        //Delete Service//
        $scope.DeleteService = function () {

            var result = bookingService.DeleteService($scope.ServiceId);
            result.then(function (response) {
                if (response.data.Success == true) {
                    $scope.IsVisible = true;
                    $scope.MessageText = "Deleting Service";
                    $timeout(function () {

                        $scope.MessageText = "Service Deleted";
                        $scope.ShowDeletePopUp = false;
                        $timeout(function () {
                            $scope.IsVisible = false;
                            $scope.init();
                            $scope.showcategoryList = {
                                show: true,
                                hide: true
                            };
                        }, 1000)
                    }, 800)

                }

            })

        }


        //Assigned/Deassigned Staff to Service
        $scope.AssignedStafftoService = function (item) {
            //debugger;
            if (item.confirmed == true) {
                if (item.staffName == "All Staff") {
                    for (var i = 0; i < $scope.staffList.length; i++) {
                        $scope.staffList[i].confirmed = true;
                        if (i > 0) {
                            var CurrentDate = new Date();
                            var requesteddata = {
                                "Id": "",
                                "CompanyId": $routeParams.CompanyId,
                                "EmployeeId": $scope.staffList[i].Id,
                                "ServiceId": $scope.ServiceId,
                                "CreationDate": CurrentDate
                            }
                            var result = bookingService.AssignStafftoService(requesteddata);
                            result.then(function (response) {
                                if (response.data.Success == true) {
                                    $scope.MessageText = "Assigning  All staff to services";
                                    $scope.IsVisible = true;
                                    $timeout(function () {
                                        $scope.MessageText = "Service Saved";
                                        $timeout(function () {
                                            $scope.IsVisible = false;
                                        }, 1000)
                                    }, 800)
                                }
                            });
                        }
                    }
                }
                else {
                    var CurrentDate = new Date();
                    var requesteddata = {
                        "Id": "",
                        "CompanyId": $routeParams.CompanyId,
                        "EmployeeId": item.Id,
                        "ServiceId": $scope.ServiceId,
                        "CreationDate": CurrentDate
                    }

                    var result = bookingService.AssignStafftoService(requesteddata);
                    result.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Assigning staff to services";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Service Saved";
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000)
                            }, 800)
                        }
                    })
                }
            }
            else {
                if (item.staffName == "All Staff") {
                    for (var i = 0; i < $scope.staffList.length; i++) {
                        $scope.staffList[i].confirmed = false;
                        if (i > 0) {
                            var result = bookingService.DeAssignedStaffToService($routeParams.CompanyId, $scope.staffList[i].Id, $scope.ServiceId);
                            result.then(function (response) {
                                if (response.data.Success == true) {
                                    $scope.MessageText = "Unassigning All staff to services";
                                    $scope.IsVisible = true;
                                    $timeout(function () {
                                        $scope.MessageText = "Service Saved";
                                        $timeout(function () {
                                            $scope.IsVisible = false;
                                        }, 1000)
                                    }, 800)
                                }
                            });
                        }
                    }
                }
                else {
                    var result = bookingService.DeAssignedStaffToService($routeParams.CompanyId, item.Id, $scope.ServiceId);
                    result.then(function (response) {
                        if (response.data.Success == true) {
                            $scope.MessageText = "Unassigning staff to services";
                            $scope.IsVisible = true;
                            $timeout(function () {
                                $scope.MessageText = "Service Saved";
                                $timeout(function () {
                                    $scope.IsVisible = false;
                                }, 1000)
                            }, 800)
                        }
                    })
                }
            }

            $scope.staffchecked(item);
        }

        //Assign Category to Service While Updating//

        $scope.AssignCategorytoService = function (category) {
            $scope.CategoryConfirmedCount();

            if (category.Confirmed == true) {
                var responsedata = bookingService.AssignCategorytoService($routeParams.CompanyId, $scope.ServiceId, category.Id);
                responsedata.then(function (response) {
                    if (response.data.Success == true) {
                        $scope.MessageText = "Assigning Service to category";
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.MessageText = "Service Saved";
                            $timeout(function () {
                                $scope.IsVisible = false;
                            }, 500)
                        }, 1000);
                    }
                })
            }
            else {
                var responsedata = bookingService.DeAllocateCategoryFromService($routeParams.CompanyId, $scope.ServiceId, category.Id);
                responsedata.then(function (response) {
                    if (response.data.Success == true) {
                        $scope.MessageText = "Removing Service to category";
                        $scope.IsVisible = true;
                        $timeout(function () {
                            $scope.MessageText = "Service Saved";
                            $timeout(function () {
                                $scope.IsVisible = false;
                            }, 500)
                        }, 1000);
                    }
                })
            }
        }

        //Get Categories Count//
        $scope.CategoryConfirmedCount = function () {

            $scope.CategoryCheckedCount = 0;
            angular.forEach($scope.Categories, function (value, key) {
                if (value.Confirmed == true) {
                    $scope.CategoryCheckedCount = $scope.CategoryCheckedCount + 1;

                }
            });
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

        //Checked and unchecked service provider in add service section//

        $scope.staffchecked = function (item) {
            if (item.staffName == "All Staff") {
                if (item.confirmed == true) {
                    angular.forEach($scope.staffList, function (value, key) {
                        value.confirmed = true;
                    });
                }
                else {
                    angular.forEach($scope.staffList, function (value, key) {
                        value.confirmed = false;
                    });
                }
            }
            else {
                for (var i = 1; i < $scope.staffList.length; i++) {
                    if ($scope.staffList[i].confirmed == true) {
                        $scope.staffList[0].confirmed = true;
                    }
                    else {
                        $scope.staffList[0].confirmed = false;
                        break;
                    }
                }
            }
        }

        $scope.Logout = function () {

            $rootScope.IsLoggedInUser = false;
            var apirequest = bookingService.SignOut();
            sessionStorage.removeItem('userInfo-token');
            $location.path("/signin");
        }


    }]);

