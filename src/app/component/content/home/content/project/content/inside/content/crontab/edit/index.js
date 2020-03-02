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
                .state('home.project.inside.crontab.edit', {
                    url: '/edit?groupID?childGroupID?grandSonGroupID?taskID?type',
                    template: '<home-project-inside-crontab-edit></home-project-inside-crontab-edit>',
                    resolve: helper.resolveFor('JQUERY', 'WANG_EDITOR', 'MARKDOWN')
                });
        }])
        .component('homeProjectInsideCrontabEdit', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/crontab/edit/index.html',
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
            info: {
                template: {
                    envModel: []
                },

                time: {
                    "month": "",
                    "day": "",
                    "week": "",
                    "hour": "",
                    "minute": "",
                    "second": "",
                    "starttime": "",
                    "endtime": "",
                    "day_of_week": "",
                    "runtime": ""
                },

                input: {
                    submited: false
                },


                timer: {
                    fun: null
                },
                filter: {
                    taskList: $filter('translate')('01220010'),
                    returnTodetails: $filter('translate')('01220011'),
                },
                script: {},
                group: {
                    parent: [],
                    child: []
                },
                reset: {
                    projectID: $state.params.projectID,
                    groupID: $state.params.groupID,
                    childGroupID: $state.params.childGroupID,
                    grandSonGroupID: $state.params.grandSonGroupID,
                    taskID: $state.params.taskID,
                }

            },
            current: {
                dateIllegal: false,
            },
            interaction: {
                response: {
                    taskInfo: {
                        projectID: $state.params.projectID,
                        groupID: $state.params.groupID,
                        childGroupID: $state.params.childGroupID,
                        grandSonGroupID: $state.params.grandSonGroupID,
                        taskName: '',
                        taskID: $state.params.taskID,
                        taskRemark: '',
                        userID: '0',
                        taskCycle: 0,
                        taskLoop: 0,
                        taskStatus: true,
                        caseList: [],
                        linkman: [],
                        type: '0', //执行类型
                        cycle: '0',
                        notification: '0',
                        jobid: '',
                        envID: '1',

                    },
                    query: null
                },
                request: {
                    projectID: $state.params.projectID,
                    taskID: $state.params.taskID,
                    groupID: $state.params.groupID,
                    grandSonGroupID: $state.params.grandSonGroupID,
                    childGroupID: $state.params.childGroupID,
                    type: $state.params.type
                }

            },
            fun: {
                init: null,
                load: null,
                requestProcessing: null,
                menu: null,

                refresh: null,
                change: {
                    group: null,
                    timerType: null,
                },
                linkmanList: {
                    add: null,
                    delete: null
                },

                last: {
                    linkman: null,
                },
                back: null,

            },
            assistantFun: {
                init: null,
                confirm: null,
                keep: null,
                quickEdit: null,
                edit: null
            }
        }

        var data = {
            cache: {
                child: '[]',
                grandson: '[]'
            }
        }


        vm.data.fun.bind = function (status, arg) {
            var template = {
                modal: {
                    query: vm.data.interaction.response.singalQuery,
                    resource: ApiManagementResource,
                    request: {
                        projectID: vm.data.interaction.request.projectID,
                        groupID: -1
                    }
                },
                uri: {
                    status: status || 'add',
                    groupID: vm.data.interaction.request.groupID,
                    grandSonGroupID: vm.data.interaction.request.grandSonGroupID,
                    childGroupID: vm.data.interaction.request.childGroupID,
                    caseID: vm.data.interaction.request.caseID,
                    connID: arg ? arg.item.connID : null
                }
            }
            $rootScope.ApiManagement_AutomatedTestCase_QiuckAddTestCaseModal(template.modal, function (callback) {
                if (callback) {
                    vm.data.service.cache.set(callback, 'testCaseInfo');
                    vm.data.interaction.response.taskInfo.caseList.push(callback);
                    $state.go('home.project.inside.crontab.edit', template.uri);
                }
            })
        }



        /**
         * @function [更改定时任务周期类型]
         */
        vm.data.fun.change.timerType = function () {
            if (vm.data.interaction.response.taskInfo.cycle == 0) {
                vm.data.interaction.response.taskInfo.taskCycle = 0;
            } else if (vm.data.interaction.response.taskInfo.cycle == 1) {
                vm.data.interaction.response.taskInfo.taskCycle = 1;
            } else {
                vm.data.interaction.response.taskInfo.taskCycle = 2;
            }
        }

        /**
         * @function [更改父分组] [Change parent grouping]
         */
        vm.data.fun.change.group = function (status) {
            switch (status) {
                case 'first-level': {
                    for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                        var val = vm.data.info.group.parent[i];
                        if (val.groupID == vm.data.interaction.response.taskInfo.groupID) {
                            vm.data.info.group.child = [{
                                groupID: -1,
                                groupName: '可选[二级菜单]',
                                childGroupList: []
                            }].concat(val.childGroupList);
                            vm.data.interaction.response.taskInfo.childGroupID = -1;
                            vm.data.interaction.response.taskInfo.grandSonGroupID = -1;
                            break;
                        }
                    }
                    break;
                }
                case 'second-level': {
                    for (var i = 0; i < vm.data.info.group.child.length; i++) {
                        var val = vm.data.info.group.child[i];
                        if (val.groupID == vm.data.interaction.response.taskInfo.childGroupID) {
                            vm.data.info.group.grandson = [{
                                groupID: -1,
                                groupName: '可选[三级菜单]'
                            }].concat(val.childGroupList);
                            vm.data.interaction.response.taskInfo.grandSonGroupID = -1;
                            break;
                        }
                    }
                    break;
                }
            }

        }


        /**
         * @function [最后一个请求参数 item 输入框内容改变功能函数] [The last linkman item input box contents change]
         */
        vm.data.fun.last.linkman = function (arg) {
            if (arg.$last) {
                vm.data.fun.linkmanList.add();
            }
        }

        /**
         * @function [添加联系人功能函数] [Add the linkman]
         */
        vm.data.fun.linkmanList.add = function () {
            var template = {
                item: {
                    "email": ""
                }
            }
            vm.data.interaction.response.taskInfo.linkman.push(template.item);
            vm.data.info.input.submited = false;
        }


        /**
         * @function [删除联系人功能函数] [Delete request]
         */
        vm.data.fun.linkmanList.delete = function (arg) {
            vm.data.interaction.response.taskInfo.linkman.splice(arg.$index, 1);
        }



        /**
         * @function [返回功能函数] [back]
         */
        vm.data.fun.back = function () {
            if (vm.data.info.reset.taskID) {
                $state.go('home.project.inside.crontab.list', {
                    'groupID': vm.data.info.reset.groupID,
                    'childGroupID': vm.data.info.reset.childGroupID,
                    'grandSonGroupID': vm.data.info.reset.grandSonGroupID,
                    'taskID': vm.data.info.reset.taskID
                });
            } else {
                $state.go('home.project.inside.crontab.list', {
                    'groupID': vm.data.info.reset.groupID,
                    'childGroupID': vm.data.info.reset.childGroupID,
                    'grandSonGroupID': vm.data.info.reset.grandSonGroupID
                });
            }
        }





        /**
         * @function [辅助确认功能函数] [Auxiliary confirmation]
         */
        vm.data.assistantFun.confirm = function () {
            var info = {
                projectID: vm.data.info.reset.projectID,
                groupID: vm.data.interaction.response.taskInfo.grandSonGroupID > 0 ? vm.data.interaction.response.taskInfo.grandSonGroupID : vm.data.interaction.response.taskInfo.childGroupID > 0 ? vm.data.interaction.response.taskInfo.childGroupID : vm.data.interaction.response.taskInfo.groupID,
                childGroupID: $state.params.childGroupID,
                grandSonGroupID: $state.params.grandSonGroupID,
                taskname: vm.data.interaction.response.taskInfo.taskName,
                taskID: vm.data.info.reset.taskID,
                taskRemark: vm.data.interaction.response.taskInfo.taskRemark,
                taskCycle: vm.data.interaction.response.taskInfo.cycle,
                caseList: JSON.stringify(vm.data.interaction.response.taskInfo.caseList),
                linkman: vm.data.interaction.response.taskInfo.linkman,
                userID: $cookies.get('id'), //用户更新id
                type: vm.data.interaction.response.taskInfo.type,
                notification: vm.data.interaction.response.taskInfo.notification,
                month: vm.data.info.time.month,
                day: vm.data.info.time.day,
                week: vm.data.info.time.week,
                hour: vm.data.info.time.hour,
                minute: vm.data.info.time.minute,
                second: vm.data.info.time.second,
                starttime: vm.data.info.time.starttime,
                endtime: vm.data.info.time.endtime,
                runtime: vm.data.info.time.runtime,
                envID: window.localStorage.getItem('ENV_DIRECTIVE_TABLE'),
                day_of_week: vm.data.info.time.day_of_week
            }


            var template = {
                linkman: [],

            };

            angular.copy(vm.data.interaction.response.taskInfo.linkman, template.linkman);



            vm.check = false;
            var i = 0;
            for (i = template.linkman.length - 1; i >= 0; i--) { //联系人 去除最后一行空白
                if (!template.linkman[i].email) {

                    if (!template.linkman[i].email || template.linkman[i].email.length == 0) {
                        template.linkman.splice(i, 1);
                    } else {
                        vm.check = true;
                    }
                }
            }



            if (!vm.check) {
                info.linkman = JSON.stringify(template.linkman, function (key, value) {
                    if (/(\$\$hashKey)|(mouseLeave)|(labelIsClick)|(headerID)/.test(key)) {
                        return undefined;
                    }
                    return value;
                });


            }

            return info;
        }



        /**
         * @function [发送存储请求时预处理功能函数] [Preprocessing when sending storage requests]
         */
        vm.data.fun.requestProcessing = function (arg) { //arg status:（0：继续添加 1：快速保存，2：编辑（修改/新增））arg status: (0: continue adding 1: fast save, 2: edit (modify / add))
            var template = {
                request: vm.data.assistantFun.confirm(),
                promise: null
            }

            if ($scope.editForm.$valid) {
                switch (arg.status) {
                    case 0: {
                        template.promise = vm.data.assistantFun.keep({
                            request: template.request
                        });
                        break;
                    }
                    case 1: {
                        template.promise = vm.data.assistantFun.quickEdit({
                            request: template.request
                        });
                        break;
                    }
                    case 2: {
                        template.promise = vm.data.assistantFun.edit({
                            request: template.request
                        });
                        break;
                    }
                }
            } else {
                $rootScope.InfoModal($filter('translate')('012100172'), 'error');
                vm.data.info.input.submited = true;
            }
            $scope.$emit('$translateferStation', {
                state: '$LoadingInit',
                data: {
                    promise: template.promise
                }
            });
            return template.promise;
        }

        /**
         * @function [辅助继续添加功能函数] [Auxiliary continues to add]
         */
        vm.data.assistantFun.keep = function (arg) {
            var template = {
                promise: null
            }
            template.promise = ApiManagementResource.Crontab.Add(arg.request).$promise;
            template.promise.then(function (response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS: {
                        $rootScope.InfoModal($filter('translate')('012100173'), 'success');
                        vm.data.interaction.response.taskInfo = {
                            projectID: vm.data.info.reset.projectID,
                            groupID: vm.data.info.reset.groupID == '-1' ? vm.data.info.group.parent[0].groupID : parseInt(vm.data.info.reset.groupID),

                        };
                        vm.data.info.group.child = JSON.parse(data.cache.child);
                        vm.data.info.group.grandson = JSON.parse(data.cache.grandson);
                        vm.data.interaction.response.taskInfo.childGroupID = parseInt(vm.data.info.reset.childGroupID) || -1;
                        vm.data.interaction.response.taskInfo.grandSonGroupID = parseInt(vm.data.info.reset.grandSonGroupID) || -1;

                        $scope.$broadcast('$ResetAceEditor_AmsEditor_Code_Ace_Editor_Js');

                        break;
                    }
                    case CODE.CRONTAB_API.ERROR: {
                        try {
                            $scope.editForm.uri.$invalid = true;
                        } catch (e) {}
                        vm.data.info.input.submited = true;
                        $rootScope.InfoModal($filter('translate')('012100172'), 'error');
                        break;
                    }
                }
            })
            return template.promise;
        }

        /**
         * @function [辅助快速保存功能函数] [Auxiliary fast save]
         */
        vm.data.assistantFun.quickEdit = function (arg) {
            var template = {
                promise: null
            }
            template.promise = ApiManagementResource.Crontab.Edit(arg.request).$promise;
            arg.request.envID = vm.data.interaction.response.taskInfo.envID;
            template.promise.then(function (response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS: {
                        $state.go('home.project.inside.crontab.list', {
                            'groupID': vm.data.info.reset.groupID,
                            'childGroupID': vm.data.info.reset.childGroupID,
                            'grandSonGroupID': vm.data.info.reset.grandSonGroupID,
                            'taskID': vm.data.info.reset.taskID
                        });
                        $rootScope.InfoModal($filter('translate')('012100173'), 'success');
                        break;
                    }
                    case CODE.CRONTAB_API.ERROR: {
                        try {
                            $scope.editForm.uri.$invalid = true;
                        } catch (e) {}
                        vm.data.info.input.submited = true;
                        $rootScope.InfoModal($filter('translate')('012100172'), 'error');
                    }
                }
            })
            return template.promise;
        }

        /**
         * @function [编辑功能函数] [edit]
         */
        vm.data.assistantFun.edit = function (arg) {
            var template = {
                promise: null
            }
            if (vm.data.info.reset.taskID && $state.params.type != 2) {
                $rootScope.CommonCrontabInputModal($filter('translate')('012100062'), '', '', {}, function (data) {
                    if (data.check) {
                        arg.request.updateDesc = data.desc;
                        arg.request.envID = vm.data.interaction.response.taskInfo.envID;
                        arg.request.jobid = vm.data.interaction.response.taskInfo.jobid;
                        console.log('arg.request-----------', arg.request);
                        ApiManagementResource.Crontab.Edit(angular.fromJson(arg.request)).$promise.then(function (response) {
                            switch (response.statusCode) {
                                case CODE.COMMON.SUCCESS: {
                                    $state.go('home.project.inside.crontab.list', {
                                        'groupID': vm.data.info.reset.groupID,
                                        'childGroupID': vm.data.info.reset.childGroupID,
                                        'grandSonGroupID': vm.data.info.reset.grandSonGroupID,
                                    });
                                    $rootScope.InfoModal($filter('translate')('012100175'), 'success');
                                    break;
                                }
                                case CODE.CRONTAB_API.ERROR: {
                                    try {
                                        $scope.editForm.uri.$invalid = true;
                                    } catch (e) {}
                                    vm.data.info.input.submited = true;
                                    $rootScope.InfoModal($filter('translate')('012100172'), 'error');
                                }
                            }
                        })
                    }
                });
            } else {
                console.log('arg.request------', arg.request);
                template.promise = ApiManagementResource.Crontab.Add(arg.request).$promise;
                template.promise.then(function (response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS: {
                            $state.go('home.project.inside.crontab.list', {
                                'groupID': vm.data.info.reset.groupID,
                                'childGroupID': vm.data.info.reset.childGroupID,
                                'grandSonGroupID': vm.data.info.reset.grandSonGroupID,
                            });
                            $rootScope.InfoModal($filter('translate')('012100173'), 'success');
                            break;
                        }
                        case CODE.CRONTAB_API.ERROR: {

                            vm.data.info.input.submited = true;
                            $rootScope.InfoModal($filter('translate')('012100256'), 'error');
                        }
                    }
                })
            }
            return template.promise;
        }

        $scope.$on('$SidebarFinish', function () {
            vm.data.fun.init();
        })
        $scope.$on('$stateChangeStart', function () {
            if (vm.data.info.timer.fun) {
                clearInterval(vm.data.info.timer.fun);
            }
        });

        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.assistantFun.init = function () {

            var taskGroup = GroupService.get();
            vm.data.info.group.parent = taskGroup;

            vm.data.info.script.type = '0';
            if (vm.data.interaction.response.taskInfo.groupID > 0) {
                for (var i = 0; i < vm.data.info.group.parent.length; i++) {
                    var val = vm.data.info.group.parent[i];
                    if (val.groupID == vm.data.interaction.response.taskInfo.groupID) {
                        vm.data.info.group.child = [{
                            groupID: -1,
                            groupName: '可选[二级菜单]',
                            childGroupList: []
                        }].concat(val.childGroupList);
                        vm.data.info.group.grandson = [{
                            groupID: -1,
                            groupName: '可选[三级菜单]'
                        }];
                        if (vm.data.interaction.response.taskInfo.childGroupID > 0) {
                            for (var childKey in val.childGroupList) {
                                var childVal = val.childGroupList[childKey];
                                if (childVal.groupID == vm.data.interaction.response.taskInfo.childGroupID) {
                                    vm.data.info.group.grandson = vm.data.info.group.grandson.concat(childVal.childGroupList);
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            } else {
                vm.data.info.group.child = [{
                    groupID: -1,
                    groupName: '可选[二级菜单]',
                    childGroupList: []
                }].concat(vm.data.info.group.parent[0].childGroupList);
                vm.data.info.group.grandson = [{
                    groupID: -1,
                    groupName: '可选[三级菜单]'
                }].concat(vm.data.info.group.child[0].childGroupList);
            }
            if (vm.data.info.reset.taskID || vm.data.interaction.response.taskInfo.groupID > 0) {
                vm.data.interaction.response.taskInfo.groupID = parseInt(vm.data.interaction.response.taskInfo.groupID);
                if (vm.data.interaction.response.taskInfo.childGroupID) {
                    vm.data.interaction.response.taskInfo.childGroupID = parseInt(vm.data.interaction.response.taskInfo.childGroupID);
                } else {
                    vm.data.interaction.response.taskInfo.childGroupID = -1;
                }
                if (vm.data.interaction.response.taskInfo.grandSonGroupID) {
                    vm.data.interaction.response.taskInfo.grandSonGroupID = parseInt(vm.data.interaction.response.taskInfo.grandSonGroupID);
                } else {
                    vm.data.interaction.response.taskInfo.grandSonGroupID = -1;
                }
            } else {
                vm.data.interaction.response.taskInfo.groupID = vm.data.info.group.parent[0].groupID;
                vm.data.interaction.response.taskInfo.childGroupID = -1;
                vm.data.interaction.response.taskInfo.grandSonGroupID = -1;
            }
            data.cache.child = JSON.stringify(vm.data.info.group.child);
            data.cache.grandson = JSON.stringify(vm.data.info.group.grandson);

            // 获取环境
            var template = {
                request: {
                    projectID: vm.data.interaction.response.taskInfo.projectID,
                    groupID: '',
                    userID: $cookies.get('id')
                }
            }

            if (vm.data.interaction.response.taskInfo.grandSonGroupID > 0) {
                template.request.groupID = vm.data.interaction.response.taskInfo.grandSonGroupID;
            } else if (vm.data.interaction.response.taskInfo.childGroupID > 0) {
                template.request.groupID = vm.data.interaction.response.taskInfo.childGroupID;
            } else {
                template.request.groupID = vm.data.interaction.response.taskInfo.groupID;
            }

            if (vm.data.interaction.response.taskInfo.groupID == -2) {
                $rootScope.global.ajax.Query_Env = ApiManagementResource.Env.Query(template.request);
                $rootScope.global.ajax.Query_Env.$promise.then(function (response) {
                    vm.data.service.home.envObject.object.model = response.envList || [];
                    vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                    $scope.$emit('$translateferStation', {
                        state: '$EnvInitReady',
                        data: {
                            status: 0
                        }
                    });
                })
            } else {
                if (vm.data.interaction.response.taskInfo.groupID == -1) {
                    $rootScope.global.ajax.Query_Env = ApiManagementResource.Env.Query(template.request);
                    $rootScope.global.ajax.Query_Env.$promise.then(function (response) {
                        vm.data.service.home.envObject.object.model = response.envList || [];
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;
                        $scope.$emit('$translateferStation', {
                            state: '$EnvInitReady',
                            data: {
                                status: 0
                            }
                        });
                    })
                } else {
                    $rootScope.global.ajax.Query_Env = ApiManagementResource.Env.Query(template.request);
                    $rootScope.global.ajax.Query_Env.$promise.then(function (response) {
                        vm.data.service.home.envObject.object.model = response.envList || [];
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

            return $rootScope.global.ajax.Query_Env.$promise;

        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function () {
            var template = {
                cache: {
                    group: GroupService.get()
                }
            }


            vm.data.info.group.parent = template.cache.group;

            if (template.cache.group) {
                if (vm.data.info.reset.taskID) {
                    //定时任务详情
                    console.log('vm.data.info.reset.taskID-----', vm.data.info.reset.taskID);
                    ApiManagementResource.Crontab.Detail({
                        taskID: vm.data.info.reset.taskID,
                        groupID: vm.data.info.reset.grandSonGroupID || vm.data.info.reset.childGroupID || vm.data.info.reset.groupID,
                        projectID: vm.data.info.reset.projectID
                    }).$promise.then(function (response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS: {
                                response = angular.fromJson(response.taskInfo);
                                vm.data.interaction.response.taskInfo.taskName = response.taskname;
                                vm.data.interaction.response.taskInfo.taskRemark = response.taskRemark;
                                vm.data.interaction.response.taskInfo.cycle = response.taskCycle;
                                vm.data.info.time.month = response.month || '';
                                vm.data.info.time.week = response.week || '';
                                vm.data.info.time.day = response.day || '';
                                vm.data.info.time.day_of_week = response.day_of_week || '';
                                vm.data.info.time.hour = response.hour || '';
                                vm.data.info.time.minute = response.minute || '';
                                vm.data.info.time.second = response.second || '';
                                vm.data.info.time.starttime = response.starttime || '';
                                vm.data.info.time.endtime = response.endtime || '';
                                vm.data.info.time.runtime = response.runtime || '';
                                vm.data.interaction.response.taskInfo.type = response.type;
                                vm.data.interaction.response.taskInfo.notification = response.notification;
                                vm.data.interaction.response.taskInfo.caseList = angular.fromJson(response.caseList);
                                vm.data.interaction.response.taskInfo.linkman = angular.fromJson(response.linkman);
                                vm.data.interaction.response.taskInfo.groupID = response.groupID;
                                vm.data.interaction.response.taskInfo.childGroupID = response.childGroupID;
                                vm.data.interaction.response.taskInfo.grandSonGroupID = response.grandSonGroupID;
                                vm.data.interaction.response.taskInfo.envID = response.envID;
                                vm.data.interaction.response.taskInfo.jobid = response.jobid;
                                console.log('taskInfo-------', response);


                            }
                        }
                    });

                    var template = {
                        request: {
                            projectID: vm.data.interaction.response.taskInfo.projectID,
                            userID: $cookies.get('id')
                        }
                    }
                    $rootScope.global.ajax.Query_Env = ApiManagementResource.Env.Query(template.request);
                    $rootScope.global.ajax.Query_Env.$promise.then(function (response) {
                        vm.data.service.home.envObject.object.model = response.envList || [];
                        vm.data.info.template.envModel = vm.data.service.home.envObject.object.model;

                        $scope.$emit('$translateferStation', {
                            state: '$EnvInitReady',
                            data: {
                                status: 0
                            }
                        });
                    });
                } else {
                    vm.data.assistantFun.init();
                    $scope.$emit('$windowTitle', {
                        taskName: $filter('translate')('012170')
                    });
                    vm.data.interaction.response.taskInfo.linkman = [{
                        "email": ""
                    }];


                }

            }

        }
        vm.data.interaction.response.taskInfo.userID = $cookies.get('id');
        vm.data.fun.init();
    }
})();