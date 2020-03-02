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
     * @function [自定义代码列表内页相关指令js] [definecode management page related instructions js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  md5 [注入md5服务] [inject md5 service]
     * @service  NavbarService [注入NavbarService服务] [inject NavbarService service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('danlan')
        .config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider
                .state('home.customcode.list', {
                    url: '/list',
                    template: '<customcode-list></customcode-list>',
                });
        }])
        .component('customcodeList', {
            templateUrl: 'app/component/content/home/content/customcode/list/index.html',
            controller: indexController
        })

    indexController.$inject = ['$cookies', '$filter', '$rootScope', '$state', 'CommonResource', 'CODE'];

    function indexController($cookies, $filter, $rootScope, $state, CommonResource, CODE) {
        var vm = this;

        vm.codeList = [];

        vm.mainObject = {
            "list": [{
                "type": "btn",
                "btnList": [{
                    "icon": true
                }]
            }]
        };

        vm.data = {
            info: {
                id: '',
                name: '',
                key: '',
                function_name: '',
                content: '',
                userID: $cookies.get('id')
            },

            fun: {
                edit: null,
                delete: null,
                click: null,
                init: null,
            }
        };

        /**
         * @function [初始化功能函数]
         */
        vm.data.fun.init = function () {
            var template = {
                promise: null
            }

            template.promise = CommonResource.CustomCode.All().$promise;
            template.promise.then(function (response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS: {
                        vm.codeList = response.datalist;
                        break;
                    }
                    case CODE.COMMON.SERVER_ERROR: {
                        $rootScope.InfoModal($filter('translate')('012100193'), 'error');
                    }
                }
            })
            return template.promise;

        }

        vm.data.fun.click = function (arg) {
            arg = arg || {};
            if (arg.$event) {
                arg.$event.stopPropagation();
            }

            if (arg.item) {
                $state.go('home.customcode.edit', {
                    'codeID': arg.item.id
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

            if (!arg.item) {
                $state.go('home.customcode.edit', {

                });
            } else {
                $state.go('home.customcode.edit', {
                    'codeID': arg.item.id
                });
            }
        }

        /** 
         * 删除自定义方法
         */
        vm.data.fun.delete = function (arg) {

            if (arg.$event) {
                arg.$event.stopPropagation();
            }

            CommonResource.CustomCode.Delete({
                codeID: arg.item.id,
            }).$promise.then(function (response) {
                switch (response.statusCode) {
                    case CODE.COMMON.SUCCESS: {
                        vm.codeList.splice(arg.$index, 1);
                        break;
                    }
                    case CODE.COMMON.SERVER_ERROR: {
                        $rootScope.InfoModal($filter('translate')('012100192'), 'error');
                        $state.go('home.definecode.list');
                    }
                }
            });
        }

        vm.data.fun.init();

    }

})();