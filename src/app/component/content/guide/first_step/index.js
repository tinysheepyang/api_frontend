(function() {
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
     * @function [安装引导页step one] [Installation step one page]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  CommonResource [注入通用接口服务] [inject common API service]
     * @service  $state [注入路由服务] [inject $state service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('danlan')
        .config(['$stateProvider','RouteHelpersProvider', function($stateProvider,helper) {
            $stateProvider
                .state('guide.first_step', {
                    url: '/first_step',
                    template: '<first></first>',
                    auth: true // 页面权限，值为true时在未登录状态可以显示页面，默认为假 When the value is true, the page can be displayed without login. The default is false
                });
        }])
        .component('first', {
            templateUrl: 'app/component/content/guide/first_step/index.html',
            controller: firstCtroller
        })
    firstCtroller.$inject = ['$scope', 'CommonResource', '$state', '$filter', 'CODE'];
    
    function firstCtroller($scope, CommonResource, $state, $filter, CODE) {
        var vm = this;
        vm.data = {
            fun: {
                init: null 
            }
        }
        /**
         * @function [初始化功能函数，检测是否已安装，若已安装则跳转首页] [Initialize, check whether it is installed, if it is installed, jump home page]
         */
        vm.data.fun.init = function() {
            $scope.$emit('$WindowTitleSet', { list: [$filter('translate')('00211'),$filter('translate')('00212')] });
            CommonResource.Install.Config().$promise.then(function(data) {
                if (data.statusCode == CODE.COMMON.SUCCESS) {
                    $state.go('index');
                }
            });
        }
        vm.data.fun.init();
    }
})();