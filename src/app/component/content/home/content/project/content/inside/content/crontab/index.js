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
     * @function [crontab内页相关服务js] [api page related services js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  HomeProject_Common_Service [注入HomeProject_Service服务] [Injection HomeProject_Common_Service service]
     */
    angular.module('danlan')
        .config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside.crontab', {
                    url: '/crontab',
                    template: '<home-project-inside-crontab power-object="$ctrl.data.info.powerObject"></home-project-inside-crontab>',
                    resolve: helper.resolveFor('ACE_EDITOR')
                });
        }])
        .component('homeProjectInsideCrontab', {
            templateUrl: 'app/component/content/home/content/project/content/inside/content/crontab/index.html',
            bindings: {
                powerObject: '<'
            },
            controller: homeProjectInsideCrontabController
        })

    homeProjectInsideCrontabController.$inject = ['$scope', '$state', 'HomeProject_Common_Service'];

    function homeProjectInsideCrontabController($scope, $state, HomeProject_Common_Service) {
        var vm = this;
        vm.data = {
            service: {
                home: HomeProject_Common_Service,
            },
            info: {
                status: 0
            },
            fun: {
                init: null
            },
            assistantFun: {
                init: null
            }
        }

        /**
         * @function [辅助初始化功能函数] [Auxiliary initialization]
         */
        vm.data.assistantFun.init = function () {
            vm.data.service.home.envObject.fun.resetObject();
            // switch ($state.current.name) {
            //     case 'home.project.inside.crontab.list':
            //     case 'home.project.inside.crontab.edit': {
            //         vm.data.service.home.apiTestObject.fun.clear();
            //         break;
            //     }
            // }
            switch ($state.current.name) {
                case 'home.project.inside.crontab.list':
                case 'home.project.inside.crontab.edit': {
                    vm.data.info.status = 0;
                    break;
                }
                default: {
                    vm.data.info.status = -1;
                    break;
                }
            }
        }

        /**
         * @function [路由转换函数，检测是否该显示环境变量] [A route conversion function that detects whether the environment variable is displayed]
         */
        $scope.$on('$stateChangeSuccess', function () {

            vm.data.assistantFun.init();
        });

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = (function () {
            vm.data.assistantFun.init();
        })()
    }
})();