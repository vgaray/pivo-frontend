(
    function () {
        'use strict';
        angular.module('login')
            .controller('loginController', ['$location', '$state', '$http', '$httpParamSerializer', 'loginService', '$window', 'localStorageService', "viewConfig", '$uibModal',
                function ($location, $state, $http, $httpParamSerializer, loginService, $window, localStorageService, viewConfig, $uibModal) {
                    var scope = this;
                    scope.varnab = $location.search();
                    scope.paramsInfo = {
                        codUsuario: scope.varnab.codUsu,
                        token: scope.varnab.tokenUsu,
                    }
                    scope.Nullable = function () {
                        if (scope.paramsInfo.codUsuario != null && scope.paramsInfo.token!=null) {
                            scope.codUsuario = scope.paramsInfo.codUsuario.replace(" ", "+");
                            scope.ConfirmarPassword();
                        } else {
                            scope.codUsuario = "";
                        }
                    }
                    scope.dataInfo = { codUsuario: null, token: null };
                    scope.dataInfoPassword = { codUsuario: null, token: null };
                    scope.cantidadInstancia = 0;
                    /* variables parametradas para enviar por url*/
                    scope.dataUsuario = { username: "", password: "", usernameForget: "" };
                    /*clodificar el Authorization*/
                    scope.encoded = btoa("pivo-frontend:1234567890987654321");
                    scope.ActualizarPassword = {
                        request1:
                            {
                                pCodUsuario: null,
                                pNewPassword: null,
                                pConfirmacion: false,
                                pToken: ""
                            },
                        request2:
                            {
                                pCodUsuario: null,
                                pNewPassword: "",
                                pConfirmacion: true,
                                pToken: scope.varnab.tokenUsu
                            }
                    }
                    scope.validator = false;
                    scope.ConfirmarPassword = function () {
                        scope.dataInfoPassword.codUsuario = "***";
                        /*obtener el token*/
                        scope.dataInfoPassword.token = localStorageService.get("token")
                        if (scope.ActualizarPassword.request1.pCodUsuario == null && scope.ActualizarPassword.request1.pNewPassword == null) {
                            scope.validator = true;
                            scope.ActualizarPassword.request2.pCodUsuario=scope.codUsuario;
                            loginService.actualizaPass(scope.dataInfoPassword).post({}, scope.ActualizarPassword.request2, function (result) {
                              ;
                                if (result.estado == 1) {
                                     scope.verMensaje(5,result.mensaje);
                                }else{
                                    scope.verMensaje(4,result.mensaje);
                                }
                            }, function (error) {
                                console.log("error" + error);
                                $state.go('login');
                            })
                        }
                    }
                    scope.cambioPassword = function () {
                        scope.dataInfoPassword.codUsuario = "***";
                        /*obtener el token*/
                        scope.dataInfoPassword.token = localStorageService.get("token")
                            loginService.actualizaPass(scope.dataInfoPassword).post({}, scope.ActualizarPassword.request1, function (result) {
                                if (result.estado == 1) {
                                    scope.verMensaje(3);
                                }else{
                                    scope.verMensaje(2);
                                }
                            }, function (error) {
                                console.log("error" + error);
                                $state.go('login');
                            })
                    }
                    /**
                     * variables ng-model del login
                     */
                    /**
                     * [evaluaInstancia description]
                     * @return {[type]} [description]
                     */
                    scope.verMensaje = function (tipo,mensaje) {
                        ;
                        var modalInstance = $uibModal.open({
                            templateUrl: 'src/components/login/mensaje/mensaje.template.html',
                            controller: 'mensajeController as Ctrl',
                            backdrop: 'static',
                            keyboard: false,
                            resolve: {
                                idRecibido: function () {
                                    return tipo;
                                },idMensaje: function () {
                                    return mensaje;
                                }
                            }
                        });
                        modalInstance.result.then(function () {
                        });
                    }
                    scope.evaluaInstancia = function () {
                        localStorageService.set('codUsuario', scope.dataUsuario.username);
                        scope.dataInfo.codUsuario = scope.dataUsuario.username;
                        /*obtener el token*/
                        scope.dataInfo.token = localStorageService.get("token")
                        /*funcion para evaluar instancia*/
                        loginService.evaluaInstancia(scope.dataInfo).post({}, {}, function (result) {
                            ;
                            if (result.estado == 1) {
                                scope.cantidadInstancia = result.cantidad;
                                scope.tipoRol = result.tipoRol;
                                ;
                                if (scope.cantidadInstancia == 1 && scope.tipoRol == 2) {
                                    $state.go('principal.inicio', { idInstancia: result.idInstancia });
                                }
                                if(scope.tipoRol == 1) {http://localhost:3000/#!/principal/veterinarias
                                  
                                    $state.go('principal.administrarInstancias');
                                }
                                if(scope.tipoRol==3)
                                {
                                    $state.go('principal.veterinarias');
                                }
                                console.log(scope.cantidadInstancia);
                            }
                        }, function (error) {
                            console.log("error" + error);
                            $state.go('login');
                        })
                    };
                    /**
                     * [login logeo del usuario]
                     * @return {[type]} [description]
                     */
                    scope.login = function () {
                        scope.accCorrecto = null;
                        if (scope.dataUsuario.username != "" && scope.dataUsuario.password != "") {
                            scope.oauth2Data = {
                                grant_type: "password",
                                username: scope.dataUsuario.username,
                                password: scope.dataUsuario.password,
                                client_id: "pivo-frontend",
                                encode: scope.encoded
                            };
                            loginService.loginOauth2(scope.oauth2Data).post({}, {}, function (result) {
                                if (result.error == null && result.descripcionError == null) {
                                    localStorageService.set("token", result.accessToken);
                                    localStorageService.set("nombreUsuario", result.nombreUsuario);
                                    ;
                                    scope.evaluaInstancia();
                                } else {
                                    scope.accCorrecto = false;
                                }
                            }, function () {
                                console.log('error ' + error);
                            });
                        }
                        scope.accCorrecto = null;
                    };
                    scope.alerts = 'Usuario o contraseña incorrecta';

                    var loginCard = document.getElementById('card-login');
                    var loginChange = document.getElementById('card-replace-login');
                    scope.btnChangePassword = function () {
                        $(loginCard).addClass('selected');
                        $(loginChange).addClass('selected');
                    }
                    scope.loginBack = function () {
                        $(loginCard).removeClass('selected');
                        $(loginChange).removeClass('selected');
                        scope.ActualizarPassword.request1.pCodUsuario = "";
                        scope.ActualizarPassword.request1.pNewPassword = "";
                    }
                    var mdLogON = document.getElementById('ShowL');
                    scope.btnLogHide = function () {
                        $(mdLogON).removeClass('log');
                    }
                    scope.btnLogShow = function () {
                        $(mdLogON).addClass('log');
                    }
                    
                    scope.closeAlert = function () {
                        scope.accCorrecto = true;
                    };
                    scope.OnLoad = function () {
                        scope.Nullable();
                    }
                    scope.OnLoad();
                }
            ]);

    })();
