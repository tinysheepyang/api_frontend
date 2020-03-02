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
     * @function [检测确认密码以及原密码是否相同指令js] [Check the confirmation password and whether the original password is the same instruction js]
     
     */
    angular.module('danlan.directive')

    .directive('passwordConfirmDirective', [function() {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, elem, attrs, ngModel) {
                var data = {
                    info:{
                        origin:elem.inheritedData("$formController")[attrs.passwordConfirmDirective]
                    },
                    fun: {
                        init: null, 
                        origin: null, 
                        current: null 
                    }
                }

                /**
                 * @function [当前密码监听函数] [The current password listener function]
                 * @param    {[type]}   _default [当前输入密码 The currently entered password]
                 * @return   {[type]}            [当前输入密码 The currently entered password]
                 */
                data.fun.current = function(_default) {
                    ngModel.$setValidity("passwordConfirmDirective", _default === data.info.origin.$viewValue);
                    return _default;
                }

                /**
                 * @function [原始密码监听函数] [The original password listener function]
                 * @param    {[type]}   _default [当前输入密码 The currently entered password] 
                 * @return   {[type]}            [当前输入密码 The currently entered password]
                 */
                data.fun.origin = function(_default) {
                    ngModel.$setValidity("passwordConfirmDirective", _default === ngModel.$viewValue);
                    return _default;
                }

                /**
                 * @function [初始化功能函数] [initialization]
                 */
                data.fun.init = (function() {
                    ngModel.$parsers.push(data.fun.current);
                    data.info.origin.$parsers.push(data.fun.origin);
                })()

            }
        };
    }]);
})();
