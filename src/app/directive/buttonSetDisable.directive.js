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
     * @function [提交表单禁用button按钮指令js] [Submit form to disable button button instruction JS]
     
     * @param    buttonSetDisableDirective [绑定设置回调函数] [Binding setting callback function]
     */
    angular.module('danlan.directive')

    .directive('buttonSetDisableDirective', [function() {
        return {
            restrict: 'AE',
            scope: {
                buttonSetDisableDirective: '&' 
            },
            link: function($scope, elem, attrs, ctrl) {
                var data = {
                    fun: {
                        init: null, 
                        btnFun: null 
                    }
                }
                /**
                 * @function [按钮相关功能函数] [Button related function]
                 */
                data.fun.btnFun = function() {
                    var template = {
                        promise: $scope.buttonSetDisableDirective()
                    }
                    elem.prop('disabled', true);
                    if (template.promise) {
                        template.promise.finally(function() {
                            elem.prop('disabled', false);
                        })
                    } else {
                        elem.prop('disabled', false);
                        $scope.$apply();
                    }
                }

                /**
                 * @function [初始化功能函数] [Initialization]
                 */
                data.fun.init = (function() {
                    elem.bind(attrs.buttonFunction || 'click', data.fun.btnFun);
                })()
            }
        };
    }]);
})();
