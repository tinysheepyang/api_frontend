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
     * @function [项目内页模块相关js] [Project inside page module related js]
     * @version  3.0.2
     * @service  $scope [注入作用域服务] [Injection scope service]
     * @service  ApiManagementResource [注入接口管理接口服务] [inject ApiManagement API service]
     * @service  $state [注入路由服务] [Injection state service]
     * @service  ProjectService [注入ProjectService服务] [Injection ProjectService service]
     * @constant CODE [注入状态码常量] [inject status code constant service]
     */
    angular.module('danlan')
        .config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper) {
            $stateProvider
                .state('home.project.inside', {
                    url: '/inside?projectName?projectID',
                    template: '<home-project-inside></home-project-inside>',
                    resolve: helper.resolveFor('CLIPBOARD')
                });
        }])
        .component('homeProjectInside', {
                templateUrl: 'app/component/content/home/content/project/content/inside/index.html',
                controller: homeProjectInsideController
            })

    homeProjectInsideController.$inject = ['$scope', 'ApiManagementResource', '$state', 'ProjectService', 'CODE'];

    function homeProjectInsideController($scope, ApiManagementResource, $state, ProjectService, CODE) {

        var vm = this;
        var code = CODE.COMMON.SUCCESS;
        vm.info = {
            apiName: '',
            groupName: '',
            edit: true,
            projectID: $state.params.projectID
        };
        vm.projectDetail = {
            projectName: $state.params.projectName
        }
        vm.data = {
            info: {
                shrinkObject: {},
                powerObject: {}
            },
            fun: {
                init: null,
            }
        }

        /**
         * @function [初始化功能函数] [initialization]
         */
        vm.data.fun.init = function() {
            $scope.$emit('$Home_ShrinkSidebar',{shrink:false});
            ProjectService.detail.set(null);
            ApiManagementResource.Project.Detail({ projectID: vm.info.projectID }).$promise.then(function(data) {
                if (code == data.statusCode) {
                    vm.data.info.powerObject.edit = (data.userType < 3);
                    ProjectService.detail.set(data);
                    $scope.$broadcast('$initProjectInfo');
                }
            })
        }
        vm.data.fun.init();

        /**
         * @function [路由转换重置项目信息] [The route translation resets the project information]
         */
        $scope.$on('$stateChangeStart', function() {
            ProjectService.detail.set({ reset: true });
        });
    }
})();
