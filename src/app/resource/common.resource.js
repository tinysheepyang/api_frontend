(function () {
    'use strict';
    /**
     * @name danlan open source，blued开源版本
     * @link [图片]https://www.danlan.com
     * @package danlan
     * @author [图片]www.danlan.com 蓝城兄弟信息技术有限公司 2015-2018

     * danlan，业内领先的Api接口管理及测试平台，为您提供最专业便捷的在线接口管理、测试、维护以及各类性能测试方案，帮助您高效开发、安全协作。
     * 如在使用的过程中有任何问题，可通过[图片]http://help.danlan.com寻求帮助
     *
     * 注意！blued开源版本遵循GPL V3开源协议，仅供用户下载试用，禁止“一切公开使用于商业用途”或者“以blued开源版本为基础而开发的二次版本”在互联网上流通。
     * 注意！一经发现，我们将立刻启用法律程序进行维权。
     * 再次感谢您的使用，希望我们能够共同维护国内的互联网开源文明和正常商业秩序。
     *
     * @function [公用接口resource服务定义js] [Common API resource service definition js]
     
     * @service  $resource [注入$resource服务] [Inject the $resource service]
     * @constant serverUrl [注入前缀URL] [Inject the prefix URL]
     */
    angular.module('danlan.resource')

        .factory('CommonResource', CommonResource)

    CommonResource.$inject = ['$resource', 'serverUrl', '$cookies'];

    function CommonResource($resource, serverUrl, $cookies) {
        var data = {
            info: {
                api: [],
                method: 'POST',
                get: 'GET',
                post: 'POST',
                put: 'PUT',
                delete: 'DELETE',
                patch: 'PATCH'
            }
        }

        data.info.api['Install'] = $resource(serverUrl + 'Install/:operate', {

        }, {
            Config: {
                params: {
                    operate: 'checkConfig'
                },
                method: data.info.method
            },
            Check: {
                params: {
                    operate: 'checkoutEnv'
                },
                method: data.info.method
            },
            Post: {
                params: {
                    operate: 'start'
                },
                method: data.info.method
            },
        });
        data.info.api['Guest'] = $resource(serverUrl + 'Guest/:operate', {

        }, {
            Check: {
                params: {
                    operate: 'checkLogin'
                },
                method: data.info.method
            },
            Login: {
                params: {
                    operate: 'login'
                },
                method: data.info.method
            },
        });

        data.info.api['Index'] = $resource(serverUrl + 'Index/:operate', {

        }, {
            Allow: {
                params: {
                    operate: 'allowRegister'
                },
                method: data.info.method
            }
        });

        data.info.api['GuestRegister'] = $resource(serverUrl + 'Guest/:operate', {

            }, {
                Name: {
                    params: {
                        operate: 'register'
                    },
                    method: data.info.method
                },
                Check: {
                    params: {
                        operate: 'checkUserNameExist'
                    },
                    method: data.info.method
                },
                Forget: {
                    params: {
                        operate: 'forget'
                    },
                    method: data.info.method
                },
            }

        );

        data.info.api['User'] = $resource(serverUrl + 'User/:operate', {

        }, {
            LoginOut: {
                params: {
                    operate: 'logout'
                },
                method: data.info.method
            },
            Password: {
                params: {
                    operate: 'changePassword'
                },
                method: data.info.method
            },
            Info: {
                params: {
                    operate: 'getUserInfo'
                },
                method: data.info.method
            },
            Nickname: {
                params: {
                    operate: 'changeNickName'
                },
                method: data.info.method
            }
        });

        data.info.api['CustomCodePost'] = $resource(serverUrl + 'CustomCode/:operate', {

        }, {
            LoginOut: {
                params: {
                    operate: 'CustomCode_create'
                },
                method: data.info.method
            },
        });

        data.info.api['CustomCode'] = $resource(serverUrl + 'CustomCode/:codeID', {}, {
            Add: {
                method: data.info.post,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            },
            Edit: {
                params: {
                    // operate: 'edit',
                    // put参数传参需要这样写
                    codeID: '@codeID'
                },
                method: data.info.put,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
            Info: {
                method: data.info.get,
            },
            All: {

                method: data.info.get,
            },
            Delete: {
                method: data.info.delete,
            }
        });

        data.info.api['Message'] = $resource(serverUrl + 'Message/:operate', {

            }, {
                Query: {
                    params: {
                        operate: 'getMessageList'
                    },
                    method: data.info.method
                },
                Clean: {
                    params: {
                        operate: 'cleanMessage'
                    },
                    method: data.info.method
                },
                Read: {
                    params: {
                        operate: 'readMessage'
                    },
                    method: data.info.method
                },
                Delete: {
                    params: {
                        operate: 'delMessage'
                    },
                    method: data.info.method
                },
                UnReadNum: {
                    params: {
                        operate: 'getUnreadMessageNum'
                    },
                    method: data.info.method
                }
            }

        );

        return data.info.api;
    }
})();