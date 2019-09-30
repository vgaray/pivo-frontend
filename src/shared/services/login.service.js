(
    function () {
        'use strict';
        angular.module('pivo')
            .factory('loginService', function ($resource, ngResourceConfig) {
                var urlEvaluaInstancia = ngResourceConfig.baseURL + "instancia/evaluaInstancia";
                /*url para el oauth 2 logeo*/
                var urlOauth2 = ngResourceConfig.oauth2URL + "oauth/token";
                var urlActualizarPassword = ngResourceConfig.baseURL + "usuario/actualizarPassword"
                var loginResource = {
                    instancia: {
                        evaluarInstancia: function (dataInfo) {
                            return $resource(urlEvaluaInstancia, {}, {
                                post: {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'token': dataInfo.token,
                                        'codUsuario': dataInfo.codUsuario
                                    }
                                }
                            })
                        }
                    },
                    login: {
                        actualizarPass: function (dataInfo) {
                            return $resource(urlActualizarPassword, {}, {
                                post: {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'token': dataInfo.token,
                                        'codUsuario': dataInfo.codUsuario
                                    }
                                }
                            })
                        }
                    },
                    oauth2: {
                        loginOauth2: function (oauth2Data) {
                            return $resource(urlOauth2, { grant_type: oauth2Data.grant_type, username: oauth2Data.username, password: oauth2Data.password, client_id: oauth2Data.client_id }, {
                                post: {
                                    method: 'POST',
                                    headers: {
                                        "Authorization": "Basic " + oauth2Data.encode,
                                        "Content-type": "application/json",
                                        'Accept': 'application/json'
                                    }
                                }
                            })
                        }

                    }
                };

                var loginService = {
                    evaluaInstancia: loginResource.instancia.evaluarInstancia,
                    loginOauth2: loginResource.oauth2.loginOauth2,
                    actualizaPass: loginResource.login.actualizarPass
                };
                return loginService;

            });

    })();
