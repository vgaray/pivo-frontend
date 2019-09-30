"use strict";

angular.module('login')
.controller('mensajeController', ['localStorageService','pedidoService', '$location', '$log', '$timeout', 'viewConfig', '$uibModalInstance','idRecibido','idMensaje',
    function (localStorageService,pedidoService, $location, $log, $timeout, viewConfig, $uibModalInstance,idRecibido,idMensaje) {
        var scope = this;
        ;
        scope.dataInfo =
            {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
            }
        scope.frmData = {
                name_page_title: "Cambio de Contraseña",
                content: "",
                PedidoCliente: {
                    listar:
                    {
                        request: {
                            idCliente:idRecibido

                        },
                        response: {

                        }
                    },
                    eliminar:{
                        request:{

                        },
                        response:{

                        }
                    },
                    insertar:{
                        request:{

                        },
                        response:{

                        }
                    }
                }
            }
            
             scope.evaluaTipo=function(){
                 if(idRecibido==1)
                 {
                    scope.frmData.content="Se ha procesado al cambio de contraseña";
                    $timeout(function () { 
                        scope.cancel();
                     }, 2500);
                 }
                 if(idRecibido==2)
                 {
                    scope.frmData.content="fallo en envío de enlace"
                    $timeout(function () { 
                        scope.cancel();
                     }, 2500);
                 }
                 if(idRecibido==3)
                 {
                    scope.frmData.content="Se ha enviado el link de confirmación al correo enlazado";
                    $timeout(function () { 
                        scope.cancel();
                     }, 2500);
                 }
                 if(idRecibido==4)
                 {
                    scope.frmData.content=idMensaje;
                    $timeout(function () { 
                        scope.cancel();
                     }, 2500);
                 }
                 if(idRecibido==5)
                 {
                    scope.frmData.content=idMensaje;
                    $timeout(function () { 
                        scope.cancel();
                     }, 2500);
                 }                    
             }
             scope.evaluaTipo();
         scope.cancel = function () {
                $uibModalInstance.close();
            }

      
        }
    ]);