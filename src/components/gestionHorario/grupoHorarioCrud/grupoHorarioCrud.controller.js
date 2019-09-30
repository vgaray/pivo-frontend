(function () {
    'use strict';
    angular.module('gestionHorario')
        .controller('grupoHorarioController', ['gestionHorarioService', 'localStorageService', '$location', '$uibModalInstance', 'idGrupoHorario', 'viewConfig',
            function (gestionHorarioService, localStorageService, $location, $uibModalInstance, idGrupoHorario, viewConfig) {
                var scope = this;
                /**
                 * variables para pasar por el header del servicio
                 * @type {[type]}
                 */
                scope.varnab = $location.search();
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                };
                scope.cambiarNombreGuion = function () {
                    scope.grupoHorarioRequest.nomGrupoHor = scope.grupoHorarioRequest.nomGrupoHor.replace(" ", "-");
                    scope.grupoHorarioRequest.nomGrupoHor = scope.grupoHorarioRequest.nomGrupoHor.trim();
                }
                /*Grupo Horario*/
                scope.grupoHorarioRequest = { idGrupoHor: idGrupoHorario, nomGrupoHor: null };
                /**
                 * nombres generales para el modal
                 */
                scope.modal = { nombreNuevo: 'Nuevo Grupo Horario', nombreEditar: 'Editar Grupo Horario' };
                scope.raGrupoHorario = function () {
                    if (scope.grupoHorarioRequest.nomGrupoHor == null || scope.grupoHorarioRequest.nomGrupoHor == "") {

                    } else {
                        var raGrupoHorarioPromise = new Promise((resolve, reject) => {
                            if (scope.grupoHorarioRequest.idGrupoHor == null) {
                                resolve("registra");
                            } else {
                                reject("actualiza");
                            }
                        });
                        raGrupoHorarioPromise
                            .then((message) => {
                                gestionHorarioService.insertaGrupoHorario(scope.dataInfo).post({}, scope.grupoHorarioRequest, function (result) {
                                    if (result.estado == 1 && result.resultado == 1) {
                                        toastr.remove();
                                        toastr.success('registro exitoso', 'Accion realizada', viewConfig.toastConfig);
                                        $uibModalInstance.close();
                                    } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                                        toastr.error("Ya existe este grupo de horario", "Error", viewConfig.toastConfig);
                                    }
                                }, function (error) {
                                    console.log("error" + error);
                                });
                                console.log("mensaje promise:" + message);
                            })
                            .catch((message) => {
                                gestionHorarioService.editaGrupoHorario(scope.dataInfo).post({}, scope.grupoHorarioRequest, function (result) {
                                    if (result.estado == 1 && result.resultado == 1) {
                                        toastr.remove();
                                        toastr.success('actualización exitosa', 'Accion realizada', viewConfig.toastConfig);
                                        $uibModalInstance.close();
                                    } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                                        toastr.remove();
                                        toastr.error("Grupo Horario ya existente", "Error", viewConfig.toastConfig);
                                    }
                                }, function (error) {
                                    console.log("error" + error);
                                })
                            });
                    }

                }
                scope.listPorIdGrupoHorario = [];
                scope.listaPorIdGrupoHorario = function () {
                    if (idGrupoHorario == null) {
                    } else {
                        gestionHorarioService.listaPorIdGrupoHorario(scope.dataInfo).post({}, scope.grupoHorarioRequest, function (result) {
                            if (result.estado == 1) {
                                scope.listPorIdGrupoHorario = result.listaPorIdGrupoHorario;

                                for (var i = 0; i < scope.listPorIdGrupoHorario.length; i++) {
                                    scope.grupoHorarioRequest.idGrupoHor = scope.listPorIdGrupoHorario[i].idGrupoHor;
                                    scope.grupoHorarioRequest.nomGrupoHor = scope.listPorIdGrupoHorario[i].nomGrupoHor;

                                }
                            } else if (result.estado == -1 || result.estado == 0) {
                                toastr.error("No se puede mostrar grupo horario, revise sus datos", "Error", viewConfig.toastConfig);
                            }
                        }, function (error) {
                            console.log("error" + error);
                        })
                    }

                };
                scope.listaPorIdGrupoHorario();
                // scope.onload();
                // scope.onload=function(){

                // }
                /**
                 * [ok para cerrar el modal ejecutandose la funcion eliminar]
                 * @return {[type]} [description]
                 */
                scope.ok = function () {
                    $uibModalInstance.close();
                };
                /**
                 * [cancel cancela la eliminacion del usuario]
                 * @return {[type]} [description]
                 */
                scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };


            }
        ]);
})();
