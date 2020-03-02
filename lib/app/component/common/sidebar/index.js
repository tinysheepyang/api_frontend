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
     * @function [侧边栏组件] [Sidebar components]
     * @version  3.1.6
     * @service  $scope [注入作用域服务] [inject scope service]
     * @service  $filter [注入过滤器服务] [inject filter service]
     * @extend {object} authorityObject 权限类{edit}
     * @extend {object} funObject 第一部分功能集类{showVar,btnGroupList{edit:{fun,key,class,showable,icon,tips},sort:{default,cancel,confirm:{fun,key,showable,class,icon,tips}}}}
     * @extend {object} sortObject 排序信息{sortable,groupForm}
     * @extend {object} mainObject 主类{level,extend,query,baseInfo:{name,id,child,fun:{edit,delete},parentFun:{addChild}}}
     */

    angular.module('danlan').component('sidebarCommonComponent', {
        templateUrl: 'app/component/common/sidebar/index.html',
        controller: indexController,
        bindings: {
            shrinkObject: '<',
            mainObject: '<',
            powerObject: '<',
            pluginList: '<'
        }
    });

    indexController.$inject = ['$scope', '$state', 'NavbarService'];

    function indexController($scope, $state, NavbarService) {
        var vm = this;
        vm.data = {
            info: {
                current: null
            },
            service: {
                default: NavbarService
            },
            fun: {
                shrink: null
            }
        };
        vm.data.fun.initMenu = function (arg) {
            if ($state.current.name.indexOf(arg.item.sref) > -1) {
                vm.data.info.current = arg.item;
                if (arg.item.childList) {
                    vm.data.service.default.info.navigation = {
                        query: vm.mainObject.baseInfo.navigation || [{ name: arg.item.name }]
                    };
                    for (var $index = 0; $index < arg.item.childList.length; $index++) {
                        var val = arg.item.childList[$index];
                        if ($state.current.name.indexOf(val.sref) > -1) {
                            vm.data.service.default.info.navigation.current = val.name;
                            break;
                        }
                    }
                } else {
                    vm.data.service.default.info.navigation = {
                        query: vm.mainObject.baseInfo.navigation || null,
                        current: arg.item.name
                    };
                }
            }
        };
        vm.data.fun.shrink = function () {
            vm.shrinkObject.isShrink = !vm.shrinkObject.isShrink;
            if (vm.mainObject.baseFun && vm.mainObject.baseFun.shrink) {
                vm.mainObject.baseFun.shrink();
            }
        };
        vm.data.fun.menu = function (arg, status) {
            if (arg.item.disable) return;
            if (!arg.item.href) {
                arg.item.back = false;
                vm.data.info.current = arg.item;
                if (arg.item.childList) {
                    switch (arg.item.status) {
                        case 'un-spreed':
                            {
                                break;
                            }
                        default:
                            {
                                vm.shrinkObject.isShrink = false;
                                break;
                            }
                    }
                    vm.data.service.default.info.navigation = {
                        query: vm.mainObject.baseInfo.navigation || [{ name: arg.item.name }],
                        current: arg.item.childList[0].name
                    };
                } else {
                    switch (status) {
                        case 'child':
                            {
                                vm.data.service.default.info.navigation.current = arg.item.name;
                                break;
                            }
                        default:
                            {
                                vm.data.service.default.info.navigation = {
                                    query: vm.mainObject.baseInfo.navigation || null,
                                    current: arg.item.name
                                };
                                break;
                            }
                    }
                }
            }
            if (arg.item.childSref) {
                if (arg.item.otherChildSref && $state.params.companyHashKey) {
                    $state.go(arg.item.otherChildSref, arg.item.otherParams);
                } else {
                    $state.go(arg.item.childSref, arg.item.params);
                }
            } else if (arg.item.sref) {
                $state.go(arg.item.sref, arg.params);
            } else {
                window.open(arg.item.href);
            }
        };
    }
})();