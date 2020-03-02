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
     * @function [注册页相关指令js] [Registration page related instructions js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $rootScope [注入根作用域服务] [inject rootScope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject state service]
     * @service  md5 [注入md5服务] [inject md5 service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */

    angular.module('danlan').config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('register.default', {
            url: '/',
            auth: true,
            template: '<register-default></register-default>'
        });
    }]).component('registerDefault', {
        templateUrl: 'app/component/content/register/content/default/index.html',
        controller: registerDefaultController
    });

    registerDefaultController.$inject = ['$scope', '$rootScope', 'CommonResource', '$state', 'md5', '$filter', 'CODE'];

    function registerDefaultController($scope, $rootScope, CommonResource, $state, md5, $filter, CODE) {

        var vm = this;
        var code = CODE.COMMON.SUCCESS;
        vm.data = {
            info: {
                submited: false,
                eye: false,
                alert: $filter('translate')('03014')
            },
            interaction: {
                request: {
                    username: '',
                    password: '',
                    email: ''
                }
            },
            fun: {
                check: null,
                init: null,
                $destory: null,
                confirm: null,
                changeView: null
            }

            /**
             * @function [查重功能函数] [Check repeat]
             */
        };
        vm.data.fun.check = function () {
            var template = {
                request: {
                    username: vm.data.interaction.request.username
                }
            };
            if (template.request.username != '') {
                CommonResource.GuestRegister.Check(template.request).$promise.then(function (response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS: {
                            vm.data.info.unavailable = false;
                            vm.data.info.alert = $filter('translate')('03015');
                            break;
                        }
                        case CODE.USER.EXIST: {
                            vm.data.info.unavailable = true;
                            vm.data.info.alert = $filter('translate')('03016');
                            break;
                        }
                        default: {
                            vm.data.info.unavailable = true;
                            vm.data.info.alert = $filter('translate')('03014');
                            break;
                        }
                    }
                });
            } else {
                vm.data.info.unavailable = false;
            }
        };

        /**
         * @function [是否显示密码功能函数] [Whether to display the password]
         */
        vm.data.fun.changeView = function () {
            vm.data.info.eye = !vm.data.info.eye;
        };

        /**
         * @function [确认注册功能函数] [register]
         */
        vm.data.fun.confirm = function () {
            var template = {};
            if (!vm.data.info.unavailable) {
                if ($scope.registerForm.$valid) {
                    template.request = {
                        username: vm.data.interaction.request.username,
                        password: md5.createHash(vm.data.interaction.request.password),
                        email: vm.data.interaction.request.email
                    };
                    CommonResource.GuestRegister.Name(template.request).$promise.then(function (response) {
                        switch (response.statusCode) {
                            case CODE.COMMON.SUCCESS: {
                                $rootScope.InfoModal($filter('translate')('03017'), 'success', function (data) {
                                    $state.go('index');
                                });
                                break;
                            }
                            case CODE.USER.ILLIGLE_PASSWORD: {
                                $scope.registerPhoneForm.phonePassword.$invalid = true;
                                $rootScope.InfoModal($filter('translate')('03018'), 'error');
                                break;
                            }
                            default: {
                                vm.data.info.submited = true;
                                $rootScope.InfoModal($filter('translate')('03019'), 'error');
                                break;
                            }
                        }
                    });
                } else {
                    vm.data.info.submited = true;
                }
            }
        };

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function () {
            $scope.$emit('$WindowTitleSet', {
                list: [$filter('translate')('03020')]
            });
            $scope.$on('$stateChangeStart', vm.data.fun.$destory);
        }();
    }
})();