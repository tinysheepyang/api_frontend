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
     * @function [项目信息相关服务js] [Project information related services js]
     * @version  3.0.2
     */
    angular.module('danlan')
        .factory('ProjectService', ProjectFactory);

    ProjectFactory.$inject = []

    function ProjectFactory() {
        var data = {
            info: {
                detail: null,//project详情存储变量 [project details store variables]
                list:null//project列表存储变量 [The project list stores variables]
            },
            fun: {
                detail:{
                    get:null,
                    set:null
                },
                list:{
                    get:null,
                    set:null
                }
            }
        }
        /**
         * @function [获取project详情功能函数] [Get the project details function]
         */
        data.fun.detail.get=function(){
            return data.info.detail;
        }
        /**
         * @function [设置project详情功能函数] [Set the project details function]
         */
        data.fun.detail.set=function(request){
            data.info.detail=request;
        }
        /**
         * @function [获取project list功能函数] [Get the project list function function]
         */
        data.fun.list.get=function(){
            return data.info.list;
        }

        /**
         * @function [设置project list功能函数] [Set the project list function]
         */
        data.fun.list.set=function(request){
            data.info.list=request;
        }
        return data.fun;
    }
})();
