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
     * @function [编辑自定义代码内页相关指令js] [edit definecode management page related instructions js]
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
                .state('home.customcode.edit', {
                    url: '/edit/:codeID',
                    template: '<customcode-edit></customcode-edit>',
                });
        }])
        .component('customcodeEdit', {
            templateUrl: 'app/component/content/home/content/customcode/edit/index.html',
            controller: indexController
        })

    indexController.$inject = ['$cookies', '$rootScope', '$state', '$filter', 'CommonResource', 'CODE'];

    function indexController($cookies, $rootScope, $state, $filter, CommonResource, CODE) {
        var vm = this;
        var form = $('form');
        var code = $('code', form);
        var textarea = $('textarea', form);

        vm.mainObject = {
            list: [{
                "btnList": [{
                    "name": "返回函数列表",
                    "icon": true
                }]
            }, {
                "btnList": [{
                    "name": "保存",
                    "btn": true

                }]
            }]
        }

        vm.data = {
            info: {
                language: 'python',
                default: 'def danlan_globalFunction_():',
                functionName: '',
                functionKey: '',
                content: '',
                status: '',
                user: ''
            },
            reset: {
                codeID: $state.params.codeID,
            },
            fun: {
                loadLanguage: null,
                getDependenciesOfLanguage: null,
                editFunctionKey: null,
                init: null,
                back: null,
                confirm: null
            }
        }

        /**
         * @function [初始化功能函数]
         */
        vm.data.fun.init = function () {

            if (vm.data.reset.codeID) {
                CommonResource.CustomCode.Info({
                    codeID: vm.data.reset.codeID,
                }).$promise.then(function (response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS: {
                            response = response.data;
                            vm.data.info.functionName = response.name;
                            vm.data.info.functionKey = response.key;
                            vm.data.info.content = response.content;
                            vm.data.info.status = response.status;
                            vm.data.info.user = response.user;

                            textarea.oninput = function () {
                                var codeText = vm.data.info.content;

                                code.textContent = codeText;
                                vm.data.fun.highlightCode();

                                try {
                                    sessionStorage.setItem('test-code', codeText);
                                } catch (error) {
                                    // ignore sessionStorage errors
                                }
                            }

                            textarea.oninput();
                            break;
                        }
                        case CODE.COMMON.SERVER_ERROR: {
                            $rootScope.InfoModal($filter('translate')('012100191'), 'error');
                        }
                    }
                });
            } else {
                vm.data.info.content = vm.data.info.default+vm.data.info.functionKey + vm.data.info.content
                textarea.oninput = function () {
                    var codeText = this.value || vm.data.info.content;
                    code.textContent = codeText;
                    vm.data.fun.highlightCode();

                    try {
                        sessionStorage.setItem('test-code', codeText);
                    } catch (error) {
                        // ignore sessionStorage errors
                    }
                }
                textarea.oninput();
            }
        }

        /**
         * @function [返回功能函数] [back]
         */
        vm.data.fun.back = function () {
            $state.go('home.customcode.list', {
                'userID': $cookies.get('id')
            });
        }


        /** 
         * 编辑函数名称函数
         */
        vm.data.fun.editFunctionKey = function () {

            var key = vm.data.info.functionKey;
            var strs = new Array();
            strs = vm.data.info.content.split(':');
            var content = strs.pop();
            var tempStr = vm.data.info.default;

            tempStr = tempStr.slice(0, 26) + key + tempStr.slice(26);
            vm.data.info.content = tempStr + content;
        }

        /** 
         * 保存函数
         */
        vm.data.fun.confirm = function () {
            var template = {
                promise: null,
                request: {
                    name: vm.data.info.functionName,
                    key: vm.data.info.functionKey,
                    content: vm.data.info.content,
                    user: $cookies.get('id'),
                    codeID: vm.data.reset.codeID,
                    function_name: vm.data.info.functionName,
                    status: vm.data.info.status
                }
            }

            if (!template.request.codeID) {
                CommonResource.CustomCode.Add(template.request).$promise.then(function (response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS: {
                            $state.go('home.customcode.list', {
                                'userID': $cookies.get('id'),
                            });

                            $rootScope.InfoModal($filter('translate')('012100189'), 'success');
                            break;
                        }
                        case CODE.COMMON.SERVER_ERROR: {
                            $rootScope.InfoModal($filter('translate')('012100196'), 'error');
                        }
                    }
                });
            } else {
                CommonResource.CustomCode.Edit(template.request).$promise.then(function (response) {
                    switch (response.statusCode) {
                        case CODE.COMMON.SUCCESS: {
                            $state.go('home.customcode.list', {});

                            $rootScope.InfoModal($filter('translate')('012100195'), 'success');
                            break;
                        }
                        case CODE.COMMON.SERVER_ERROR: {
                            $rootScope.InfoModal($filter('translate')('012100194'), 'error');
                        }
                    }
                });
            }
        }

        /** 
         * 代码高亮显示函数
         */
        vm.data.fun.highlightCode = function () {
            var newCode = document.createElement('code');
            newCode.textContent = code.textContent;
            newCode.className = code.className;

            Prism.highlightElement(newCode);

            code.parentElement.replaceChild(newCode, code);
            code = newCode;
        }

        vm.data.fun.init();

    }
})();