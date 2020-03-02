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
     * @function [项目内页相关指令js] [The project is related to the instruction js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $state [注入$state服务] [inject state service]
     */

    angular.module('danlan').config(['$stateProvider', 'RouteHelpersProvider', function ($stateProvider, helper) {
        $stateProvider.state('home', {
            url: '/home',
            template: '<home></home>'
        });
    }]).component('home', {
        templateUrl: 'app/component/content/home/index.html',
        controller: indexController
    });
    indexController.$inject = ['$scope', '$state'];

    function indexController($scope, $state) {
        var vm = this;
        vm.data = {
            info: {
                shrinkObject: {},
                sidebarShow: null
            },
            fun: {
                $Home_ShrinkSidebar: null,
                init: null
            }
            /**
             * @function [初始化功能函数] [initialization]
             */
        };vm.data.fun.init = function (arg) {
            if (!/inside/.test(arg.key.toLowerCase())) {
                vm.data.info.sidebarShow = true;
            } else {
                vm.data.info.sidebarShow = false;
            }
        };

        /**
         * @function [设置侧边栏收缩功能函数] [Set the sidebar to shrink]
         */
        vm.data.fun.$Home_ShrinkSidebar = function (_default, arg) {
            vm.data.info.shrinkObject.isShrink = arg.shrink;
        };
        vm.data.fun.init({ key: window.location.href });
        $scope.$on('$stateChangeSuccess', function () {
            if (!/inside/.test($state.current.name.toLowerCase())) {
                vm.data.info.sidebarShow = true;
            } else {
                vm.data.info.sidebarShow = false;
            }
        });
        $scope.$on('$Home_ShrinkSidebar', vm.data.fun.$Home_ShrinkSidebar);
    }
})();