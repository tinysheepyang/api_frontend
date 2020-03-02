(function () {
    'use strict';
    /**
     * @name danlan open source，blued开源版本
     * @link https://www.danlan.com
     * @package danlan
     * @author www.danlan.com 蓝城兄弟信息技术有限公司 2015-2018

     * danlan，业内领先的Api接口管理及测试平台，为您提供最专业便捷的在线接口管理、测试、维护以及各类性能测试方案，帮助您高效开发、安全协作。
     * 如在使用的过程中有任何问题，可通过[图片]http://help.danlan.com寻求帮助
     *
     * 注意！blued开源版本遵循GPL V3开源协议，仅供用户下载试用，禁止“一切公开使用于商业用途”或者“以blued开源版本为基础而开发的二次版本”在互联网上流通。
     * 注意！一经发现，我们将立刻启用法律程序进行维权。
     * 再次感谢您的使用，希望我们能够共同维护国内的互联网开源文明和正常商业秩序。
     *
     * @function [crontab修改模块相关js] [api modify module related js]
     * @version  3.2.0
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootscope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     * @constant HTTP_CONSTANT [注入HTTP相关常量集] [inject HTTP related constant service]
     */
    angular.module('danlan')
        .config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.crontab.history', {
                    url: '/resultlist?taskID?groupID?childGroupID?grandSonGroupID',
                    template: '<home-project-inside-crontab-history></home-project-inside-crontab-history>',
                    resolve: helper.resolveFor('JQUERY', 'WANG_EDITOR', 'MARKDOWN')
                });
        }])
        .component('homeProjectInsideCrontabHistory', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/crontab/history/index.html',
            controller: indexController
        })

    indexController.$inject = ['$cookies', '$scope', '$rootScope', 'ApiManagementResource', '$state', 'GroupService', 'Cache_CommonService', 'HomeProject_Common_Service', '$filter', 'CODE', 'HTML_LAZYLOAD'];

    function indexController($cookies, $scope, $rootScope, ApiManagementResource, $state, GroupService, Cache_CommonService, HomeProject_Common_Service, $filter, CODE, HTML_LAZYLOAD) {
        var vm = this;
        vm.data = {
            constant: {
                lazyload: HTML_LAZYLOAD[1]
            },
            service: {
                home: HomeProject_Common_Service,
                cache: Cache_CommonService
            },
            showObject: {
                reportType: 1
            },
            info: {
                filter: {
                    taskList: $filter('translate')('01220010'),
                    returnTodetails: $filter('translate')('01220011'),
                },
                reset: {
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID,
                    grandSonGroupID: $state.params.grandSonGroupID,
                    taskID: $state.params.taskID,
                },
                pagination: {
                    maxSize: 5,
                    logCount: 0
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    page: 1,
                    pageSize: 15
                },
            },
            authorityObject: {
                operate: true
            },
            mainObject: {
                item: {
                    operate: true
                }
            },
            list: [],
            fun: {
                init: null,
                load: null,
                download: null,
                showMore: null,
                back: null,
                delete: null,
                pageChange: null
            },

        }

        var data = {
            cache: {
                child: '[]',
                grandson: '[]'
            }
        }


        /** 
         * @function [删除历史记录] [deletehistory]
         */
        vm.data.fun.deleteHistory = function (arg) {
            var template = {
                request: {
                    projectID: $state.params.projectID,
                    identification: arg.item.identification,
                    taskID: arg.item.task,
                    key: arg.item.key, //历史记录排序顺序
                    userID: $cookies.get('id')
                }
            }

            $rootScope.EnsureModal($filter('translate')('012100187'), false, $filter('translate')('012100231'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.DeleteHistory(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    vm.data.list.splice(arg.$index, 1);
                                    $rootScope.InfoModal($filter('translate')('012100188'), 'success');
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100233'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });


        }

        /**
         * @function [查看定时任务关联用例] [bind]
         */
        vm.data.fun.bind = function (status, arg) {
            var template = {
                modal: {
                    resource: ApiManagementResource,
                    request: {
                        projectID: $state.params.projectID,
                        taskID: $state.params.taskID,
                        userID: $cookies.get('id'),
                        identification: arg.item.identification,
                    }
                },
                uri: {
                    status: status || 'add',
                    groupID: vm.data.info.reset.groupID,
                    grandSonGroupID: vm.data.info.reset.grandSonGroupID,
                    childGroupID: vm.data.info.reset.childGroupID,
                    projectID: $state.params.projectID,
                    taskID: $state.params.taskID
                }
            }
            $rootScope.ApiManagement_AutomatedCrontab_RelevanceTestCaseModal(template.modal, function (callback) {
                if (callback) {
                    vm.data.service.cache.set(callback, 'testCaseInfo');
                    vm.data.interaction.response.taskInfo.caseList.push(callback);
                    $state.go('home.project.inside.crontab.edit', template.uri);
                }
            })
        }

        /** 
         * @function [下载文档] [download]
         */
        vm.data.fun.download = function (arg) {
            var template = {
                modal: {
                    status: 'report',
                    title: $filter('translate')('012100268'),
                    request: {
                        projectID: $state.params.projectID,
                        identification: arg.item.identification,
                        taskID: arg.item.task,
                        key: arg.item.key, //历史记录排序顺序
                        userID: $cookies.get('id')
                    }
                }
            }

            if (arg.type == 'error') {
                template.modal.request.type = arg.type;
            }

            $rootScope.ExportModal(template.modal, function (callback) {
                if (callback) {
                    //

                }
            });
        }

        /**
         * @function [展示更多功能函数] [showmore]
         */
        vm.data.fun.showMore = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            vm.data.list[arg.$index].clickMore = true;
        }


        /**
         * @function [返回功能函数] [back]
         */
        vm.data.fun.back = function () {
            $state.go('home.project.inside.crontab.list', {
                'groupID': vm.data.info.reset.groupID,
                'childGroupID': vm.data.info.reset.childGroupID,
                'grandSonGroupID': vm.data.info.reset.grandSonGroupID
            });

        }


        // $scope.$on('$SidebarFinish', function () {
        //     vm.data.fun.init();
        // })

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function () {
            var template = {
                request: {
                    projectID: $state.params.projectID,
                    groupID: vm.data.info.reset.grandSonGroupID || vm.data.info.reset.childGroupID || vm.data.info.reset.groupID,
                    taskID: $state.params.taskID,
                    userID: $cookies.get('id'),
                    page: vm.data.interaction.request.page,
                    pageSize: vm.data.interaction.request.pageSize
                }
            }

            $rootScope.global.ajax.Query_Api = ApiManagementResource.Crontab.History(template.request);
            $rootScope.global.ajax.Query_Api.$promise.then(function (response) {
                vm.data.list = response.historyList || [];
                vm.data.info.pagination.logCount = response.historyCount || 0;

            })




        }
        // vm.data.fun.init();

        /**
         * @function [页面更改功能函数] [Page change function]
         */
        vm.data.fun.pageChange = function () {
            $scope.$broadcast('$LoadingInit');
        }
    }
})();