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
     * @function [侧边栏（sidebar）相关服务js] [Sidebar (sidebar) related services js]
     * @version  3.0.2
     * @service  $state [注入路由服务] [Inject state service]
     */
    angular.module('danlan')
        .factory('SavbarService', SavbarService);

    SavbarService.$inject = ['$state']

    function SavbarService($state) {
        var data = {
            fun: {
                menu: null, 
                shrink:null,
            }
        }
        /**
         * @function [菜单功能函数] [menu]
         * @param    {[obj]}   arg [侧边栏信息 Sidebar information]
         */
        vm.data.fun.menu = function(arg) {
            if (arg.item.childSref) {
                $state.go(arg.item.childSref);
            } else if (arg.item.sref) {
                $state.go(arg.item.sref);
            } else {
                window.open(arg.item.href);
            }
        }

        /**
         * @function [收缩功能函数] [shrink]
         * @param    {[obj]}   arg [{shrinkObject:收缩信息 Shrink information}]
         */
        vm.data.fun.shrink = function(arg) {
            arg.shrinkObject.isShrink = !arg.shrinkObject.isShrink;
        }
        return data;
    }
})();
