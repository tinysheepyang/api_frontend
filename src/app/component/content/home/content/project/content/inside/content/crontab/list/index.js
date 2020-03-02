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
     * @function [crontab列表模块相关js] [api list module related js]
     * @version  3.2.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $rootScope [注入根作用域服务] [Injection rootScope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  GroupService [注入GroupService服务] [Injection GroupService service]
     * @service  HomeProject_Common_Service [注入HomeProject_Service服务] [Injection HomeProject_Common_Service service]
     * @service  $filter [注入过滤器服务] [Injection filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('danlan')
        .config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.crontab.list', {
                    url: '/list?groupID?childGroupID?grandSonGroupID?search',
                    template: '<home-project-inside-crontab-list power-object="$ctrl.powerObject"></home-project-inside-crontab-list>'
                });
        }])
        .component('homeProjectInsideCrontabList', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/crontab/list/index.html',
            bindings: {
                powerObject: '<',
            },
            controller: homeProjectInsideCrontabListController
        })

    homeProjectInsideCrontabListController.$inject = ['$cookies', '$scope', '$rootScope', 'ApiManagementResource', '$state', 'GroupService', 'HomeProject_Common_Service', '$filter', 'CODE'];

    function homeProjectInsideCrontabListController($cookies, $scope, $rootScope, ApiManagementResource, $state, GroupService, HomeProject_Common_Service, $filter, CODE) {
        var vm = this;
        vm.data = {
            service: {
                home: HomeProject_Common_Service,
            },
            info: {
                more: parseInt(window.localStorage['PROJECT_MORETYPE']) || 1,
                template: {
                    envModel: []
                },
                sort: {
                    query: [{
                        name: $filter('translate')('012100224'),
                        asc: 0,
                        orderBy: 3
                    }, {
                        name: $filter('translate')('012100225'),
                        asc: 0,
                        orderBy: 1
                    }, {
                        name: $filter('translate')('012100226'),
                        asc: 0,
                        orderBy: 0
                    }, {
                        name: $filter('translate')('012100227'),
                        asc: 0,
                        orderBy: 2
                    }],
                    current: JSON.parse(window.localStorage['PROJECT_SORTTYPE'] || '{"orderBy":3,"asc":0}')
                },
                batch: {
                    address: [],
                    disable: false
                },
                filter: {
                    ascending: $filter('translate')('012100210'),
                    descending: $filter('translate')('012100211'),
                    updated: $filter('translate')('012100214'),
                    grouped: $filter('translate')('012100215'),
                    updatedTime: $filter('translate')('012100216'),
                    deleteTime: $filter('translate')('012100217'),
                }
            },
            interaction: {
                request: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID || -1,
                    childGroupID: $state.params.childGroupID,
                    grandSonGroupID: $state.params.grandSonGroupID,
                    tips: $state.params.search,
                    taskID: []
                },

            },
            fun: {
                init: null,
                search: null,
                sort: null,
                enter: null,
                batch: {
                    sort: null,
                    delete: null,
                    pause: null,
                    resume: null,
                    default: null,
                },
                history: null,
                showMore: null,
            },
            assistantFun: {
                init: null
            }
        }

        /**
         * 执行定时任务
         * @param {object} arg 请求
         */
        vm.data.fun.execute = function (arg) {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: arg.item.taskID
                }
            }

            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }

            $rootScope.CrontabExecuteModal($filter('translate')('012100184'), false, $filter('translate')('012100185'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Execute(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    $rootScope.InfoModal($filter('translate')('012100186'), 'success');
                                    $state.go('home.project.inside.crontab.list', {
                                        groupID: vm.data.interaction.request.groupID,
                                        childGroupID: vm.data.interaction.request.childGroupID,
                                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                                    });
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100266'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });
        }



        /**
         * 加载状态，发送请求
         * @param  {object} arg 请求
         * @return {promise}     请求promise
         */
        vm.data.fun.load = function (arg) {
            var template = {
                promise: null,
                request: arg.request
            }
            template.promise = ApiManagementResource.Api.Import(template.request).$promise.then(function (response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS: {
                        vm.data.assistantFun.init();
                    }
                    case '510000': {
                        $rootScope.InfoModal($filter('translate')('012100261'), 'success');
                        break;
                    }
                    default: {
                        $rootScope.InfoModal($filter('translate')('012100262'), 'error');
                        break;
                    }
                }
            })
            return template.promise;
        }

        /**
         * @function [搜索功能函数] [search]
         */
        vm.data.fun.search = function () {
            if ($scope.searchForm.$valid) {
                $state.go('home.project.inside.crontab.list', {
                    search: vm.data.interaction.request.tips
                });
            }

        }

        /**
         * @function [编辑函数] [edit]
         */
        vm.data.fun.edit = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                cache: GroupService.get()
            }
            if ((!template.cache) || (template.cache.length == 0)) {
                $rootScope.InfoModal($filter('translate')('012100229'), 'error');
            } else {
                if (!arg.item) {
                    $state.go('home.project.inside.crontab.edit', {
                        groupID: vm.data.interaction.request.groupID,
                        childGroupID: vm.data.interaction.request.childGroupID,
                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                    });
                } else {
                    $state.go('home.project.inside.crontab.edit', {
                        groupID: vm.data.interaction.request.groupID,
                        childGroupID: vm.data.interaction.request.childGroupID,
                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID,
                        taskID: arg.item.taskID
                    })
                }
            }
        }

        /**
         * @function [结果历史函数] [edit]
         */
        vm.data.fun.history = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }

            $state.go('home.project.inside.crontab.history', {
                groupID: vm.data.interaction.request.groupID,
                childGroupID: vm.data.interaction.request.childGroupID,
                grandSonGroupID: vm.data.interaction.request.grandSonGroupID,
                projectID: $state.params.projectID,
                taskID: arg.item.taskID
            })

        }


        /**
         * @function [排序功能函数] [sort]
         */
        vm.data.fun.sort = function (arg) {
            arg.item.asc = arg.item.asc == 0 ? 1 : 0;
            vm.data.info.sort.current = arg.item;
            window.localStorage.setItem('PROJECT_SORTTYPE', angular.toJson(arg.item));
            $scope.$broadcast('$LoadingInit', {
                boolean: true
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

            vm.data.service.home.envObject.object.model[arg.index].clickMore = true;
        }


        /**
         * @function [删除功能函数] [delete]
         */
        vm.data.fun.delete = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: '[' + arg.item.taskID + ']'
                }
            }


            $rootScope.EnsureModal($filter('translate')('012100176'), false, $filter('translate')('012100231'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Delete(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    vm.data.service.home.envObject.object.model.splice(arg.$index, 1);
                                    $rootScope.InfoModal($filter('translate')('012100177'), 'success');
                                    $state.go('home.project.inside.crontab.list', {
                                        groupID: vm.data.interaction.request.groupID,
                                        childGroupID: vm.data.interaction.request.childGroupID,
                                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                                    });
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
         * @function [暂停功能函数] [pause]
         */
        vm.data.fun.pause = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: arg.item.taskID
                }
            }


            $rootScope.CrontabPauseModal($filter('translate')('012100178'), false, $filter('translate')('012100180'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Pause(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    $rootScope.InfoModal($filter('translate')('012100179'), 'success');
                                    $state.go('home.project.inside.crontab.list', {
                                        groupID: vm.data.interaction.request.groupID,
                                        childGroupID: vm.data.interaction.request.childGroupID,
                                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                                    });
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100264'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });
        }


        /**
         * @function [启动功能函数] [start]
         */
        vm.data.fun.resume = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: arg.item.taskID
                }
            }


            $rootScope.CrontabResumeModal($filter('translate')('012100181'), false, $filter('translate')('012100182'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Resume(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    $rootScope.InfoModal($filter('translate')('012100183'), 'success');
                                    $state.go('home.project.inside.crontab.list', {
                                        groupID: vm.data.interaction.request.groupID,
                                        childGroupID: vm.data.interaction.request.childGroupID,
                                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                                    });
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100265'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });
        }


        /**
         * @function [查看详情功能函数] [see details]
         */
        vm.data.fun.enter = function (arg) {
            var template = {
                uri: {
                    groupID: vm.data.interaction.request.groupID,
                    childGroupID: vm.data.interaction.request.childGroupID,
                    grandSonGroupID: vm.data.interaction.request.grandSonGroupID,
                    taskID: arg.item.taskID
                },
                $index: vm.data.interaction.request.taskID.indexOf(arg.item.taskID)
            }
            if (vm.data.info.batch.disable) {
                arg.item.isClick = !arg.item.isClick;
                if (arg.item.isClick) {
                    vm.data.interaction.request.taskID.push(arg.item.taskID);
                    vm.data.info.batch.address.push(arg.$index);
                } else {
                    vm.data.interaction.request.taskID.splice(template.$index, 1);
                    vm.data.info.batch.address.splice(template.$index, 1);
                }
            } else {
                $state.go('home.project.inside.crontab.edit', template.uri);
            }
        }

        /**
         * @function [存储位置排序] [Storage location sort]
         */
        vm.data.fun.batch.sort = function (pre, next) {
            return pre - next;
        }

        /**
         * @function [默认切换函数] [Default switch function]
         */
        vm.data.fun.batch.default = function () {
            if (vm.data.service.home.envObject.object.model && vm.data.service.home.envObject.object.model.length > 0) {
                vm.data.info.batch.disable = true;
                angular.forEach(vm.data.info.batch.address, function (val, key) {
                    vm.data.service.home.envObject.object.model[val].isClick = false;
                })
                vm.data.info.batch.address = [];
                vm.data.interaction.request.taskID = [];
                $rootScope.InfoModal($filter('translate')('012100243'), 'success');
            } else {
                $rootScope.InfoModal($filter('translate')('012100244'), 'error');
            }
        }

        /**
         * @function [批量修改分组函数] [Batch modify grouping function]
         */
        vm.data.fun.batch.moveGroup = function () {
            var template = {
                modal: {
                    group: {
                        parent: GroupService.get(),
                        title: $filter('translate')('012100253')
                    },
                },
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    apiID: JSON.stringify(vm.data.interaction.request.apiID),
                    groupID: ''
                },
                loop: {
                    num: 0
                }
            }
            if (!template.modal.group.parent) {
                $rootScope.InfoModal($filter('translate')('012100254'), 'error');
                return;
            }
            $rootScope.ApiRecoverModal(template.modal, function (callback) {
                if (callback) {
                    template.request.groupID = callback.groupID;
                    ApiManagementResource.Api.Move(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function (val, key) {
                                        val = val - template.loop.num++;
                                        vm.data.service.home.envObject.object.model.splice(val, 1);
                                    })
                                    vm.data.info.batch.disable = false;
                                    vm.data.interaction.request.apiID = [];
                                    vm.data.info.batch.address = [];
                                    $rootScope.InfoModal($filter('translate')('012100255'), 'success');
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100256'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });
        }
        /**
         * @function [批量删除功能函数] [batch deletion]
         */
        vm.data.fun.batch.delete = function () {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: JSON.stringify(vm.data.interaction.request.taskID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.EnsureModal($filter('translate')('012100263'), false, $filter('translate')('012100235'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Delete(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function (val, key) {
                                        val = val - template.loop.num++;
                                        vm.data.service.home.envObject.object.model.splice(val, 1);
                                    })
                                    vm.data.interaction.request.taskID = [];
                                    vm.data.info.batch.address = [];
                                    vm.data.info.batch.disable = false;
                                    $rootScope.InfoModal($filter('translate')('012100177'), 'success');
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
         * @function [批量暂停功能函数] [batch deletion]
         */
        vm.data.fun.batch.pause = function () {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: JSON.stringify(vm.data.interaction.request.taskID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.CrontabPauseModal($filter('translate')('012100178'), false, $filter('translate')('012100180'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Pause(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    // angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function (val, key) {
                                    //     val = val - template.loop.num++;
                                    //     vm.data.service.home.envObject.object.model.splice(val, 1);
                                    // })
                                    vm.data.interaction.request.taskID = [];
                                    vm.data.info.batch.address = [];
                                    vm.data.info.batch.disable = false;
                                    $rootScope.InfoModal($filter('translate')('012100179'), 'success');
                                    $state.go('home.project.inside.crontab.list', {
                                        groupID: vm.data.interaction.request.groupID,
                                        childGroupID: vm.data.interaction.request.childGroupID,
                                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                                    });
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100264'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });
        }

        /**
         * @function [批量启动功能函数] [batch deletion]
         */
        vm.data.fun.batch.resume = function () {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    taskID: JSON.stringify(vm.data.interaction.request.taskID)
                },
                loop: {
                    num: 0
                }
            }
            $rootScope.CrontabResumeModal($filter('translate')('012100181'), false, $filter('translate')('012100182'), {}, function (callback) {
                if (callback) {
                    ApiManagementResource.Crontab.Resume(template.request).$promise
                        .then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    // angular.forEach(vm.data.info.batch.address.sort(vm.data.fun.batch.sort), function (val, key) {
                                    //     val = val - template.loop.num++;
                                    //     vm.data.service.home.envObject.object.model.splice(val, 1);
                                    // })
                                    vm.data.interaction.request.taskID = [];
                                    vm.data.info.batch.address = [];
                                    vm.data.info.batch.disable = false;
                                    $rootScope.InfoModal($filter('translate')('012100183'), 'success');

                                    $state.go('home.project.inside.crontab.list', {
                                        groupID: vm.data.interaction.request.groupID,
                                        childGroupID: vm.data.interaction.request.childGroupID,
                                        grandSonGroupID: vm.data.interaction.request.grandSonGroupID
                                    });
                                    break;
                                }
                                default: {
                                    $rootScope.InfoModal($filter('translate')('012100265'), 'error');
                                    break;
                                }
                            }
                        })
                }
            });
        }


        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.assistantFun.init = function () {
            var template = {
                request: {
                    projectID: vm.data.interaction.request.projectID,
                    groupID: vm.data.interaction.request.grandSonGroupID || vm.data.interaction.request.childGroupID || vm.data.interaction.request.groupID,
                    orderBy: vm.data.info.sort.current.orderBy,
                    asc: vm.data.info.sort.current.asc,
                    tips: vm.data.interaction.request.tips,
                    userID: $cookies.get('id')
                }
            }

            if (vm.data.interaction.request.groupID == -2) {
                $rootScope.global.ajax.Query_Api = ApiManagementResource.Trash.Query(template.request);
                $rootScope.global.ajax.Query_Api.$promise.then(function (response) {
                    vm.data.service.home.envObject.object.model = response.apiList || [];
                    vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                    $scope.$emit('$translateferStation', {
                        state: '$EnvInitReady',
                        data: {
                            status: 0
                        }
                    });
                })
            } else {
                if (vm.data.interaction.request.tips) {
                    $rootScope.global.ajax.Query_Api = ApiManagementResource.Crontab.Search(template.request);
                    $rootScope.global.ajax.Query_Api.$promise.then(function (response) {
                        vm.data.service.home.envObject.object.model = response.taskList || [];
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;

                        $scope.$emit('$translateferStation', {
                            state: '$EnvInitReady',
                            data: {
                                status: 0
                            }
                        });

                    })
                } else if (vm.data.interaction.request.groupID == -1) {
                    $rootScope.global.ajax.Query_Api = ApiManagementResource.Crontab.All(template.request);
                    $rootScope.global.ajax.Query_Api.$promise.then(function (response) {
                        vm.data.service.home.envObject.object.model = response.alltasklist || [];
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                        $scope.$emit('$translateferStation', {
                            state: '$EnvInitReady',
                            data: {
                                status: 0
                            }
                        });
                    })
                } else {
                    $rootScope.global.ajax.Query_Api = ApiManagementResource.Crontab.Query(template.request);
                    $rootScope.global.ajax.Query_Api.$promise.then(function (response) {
                        vm.data.service.home.envObject.object.model = response.taskList || [];
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                        $scope.$emit('$translateferStation', {
                            state: '$EnvInitReady',
                            data: {
                                status: 0
                            }
                        });
                    })
                }
            }
            return $rootScope.global.ajax.Query_Api.$promise;
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function (arg) {
            arg = arg || {};
            switch (arg.status) {
                case 'import': {
                    return vm.data.fun.load(arg)
                    break;
                }
                default: {
                    return vm.data.assistantFun.init();
                    break;
                }
            }
        }

        vm.$onInit = function () {
            $scope.$emit('$WindowTitleSet', {
                list: [$filter('translate')('012100267'), $state.params.projectName, 'Crontab开发管理']
            });
        }
    }
})();