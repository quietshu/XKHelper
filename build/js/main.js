angular.module('searchService',[])
    .factory('SearchService', function() {
        String.prototype.trim = function() {　　
            return this.replace(/(^\s*)|(\s*$)/g, "");　　
        }
        var b = {
            time: ['四 8-9', '三 1-2'],
            category: [],
            keywords: '',
            courseID: 'HIST',
        };

        function matchCourse(specification, course) {
            if (specification.time) {
                if (specification.time.indexOf(course['时间'].trim()) == -1) {
                    return false;
                }
            }
            if (specification.keywords) {
                if (course['课程名称'].trim().indexOf(specification.keywords.trim()) == -1) {
                    return false;
                }
            }
            if (specification.courseID) {
                if (course['选课序号'].trim().indexOf(specification.courseID.trim()) == -1) {
                    return false;
                }
            }
            return true;
        }
        var service = {
            search: function(specification) {
                var result = [];
                if (specification.category.length > 0) {
                    specification.category.forEach(function(category) {
                        COURSE_DATA[category].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        })
                    })
                } else {
                    for (var i in COURSE_DATA) {
                        COURSE_DATA[i].forEach(function(course) {
                            if (matchCourse(specification, course)) {
                                result.push(course);
                            }
                        })
                    }
                }
                return result;
            }
        };
        return service;
    });

'use strict';
var starkAPP = angular.module('starkAPP', [
        'ngRoute',
        'ngAnimate',
        'routeStyles',
        'searchService'
    ])
    .config(['$compileProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $routeProvider, $locationProvider) {
            $routeProvider
                .when('/main/', {
                    templateUrl: '/html/main.html',
                    css: '/build/css/main.css'
                })
                .otherwise({
                    redirectTo: '/main/'
                });
        }
    ]);

//搜索结果
angular.module('starkAPP')
    .controller('resultController', ['$scope', 'SearchService',
        function($scope, SearchService) {
            // // body...
            // var b = {
            //     time: ['四 8-9', '三 1-2'],
            //     category: [],
            //     keywords: '',
            //     courseID: 'HIST',
            // };
            // $scope.result = SearchService.search(b);
        }
    ]);

//侧边搜索栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', 'SearchService',
        function($scope, SearchService, $timeout, $interval) {
            var b = {
                time: ['四 8-9', '三 1-2'],
                category: [],
                keywords: '',
                courseID: 'HIST',
            };
            $scope.$watch($scope.items, function(oldv, newv, scope) {
                console.log(oldv, newv);
            }, true);
            $scope.result = SearchService.search(b);
            $scope.items = ['123', '456'];
            $scope.items.push('123');
            $scope.items.push('123');
            $scope.items.push('123');
        }
    ]);

//课表
angular.module('starkAPP')
    .controller('mainController',['$scope', 'SearchService', 
        function ($scope, SearchService) {
        // body...
        $scope.selectedCourse = 1;
    }]);