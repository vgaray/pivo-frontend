(function() {
    'use strict';
    angular.module('gestionHorario')
        .controller('grupoHorarioDeleteController', ['localStorageService', '$location', 'gestionHorarioService', '$uibModalInstance', 'idGrupoHorario', 'viewConfig',
            function(localStorageService, $location, gestionHorarioService, $uibModalInstance, idGrupoHorario, viewConfig) {
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
                scope.modal = { title: 'Eliminar Grupo Horario', content: '¿Desea Eliminar Registro?'}
                scope.grupoHorarioRequest = { idGrupoHor: idGrupoHorario };
                /**
                 * function para eliminar  horario
                 */
                scope.eliminaGrupoHorario = function() {
                    gestionHorarioService.eliminaGrupoHorario(scope.dataInfo).post({}, scope.grupoHorarioRequest, function(result) {
                        if (result.estado == 1 && result.resultado == 1) {
                            scope.ok();
                            toastr.success('Eliminación exitosa', 'Acción realizada', viewConfig.toastConfig);
                        } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                            toastr.error("Horario asignado a este grupo de horario", "Error", viewConfig.toastConfig);
                        }
                    }, function(error) {
                        console.log("error" + error);
                    })
                };
                /**
                 * [ok para cerrar el modal ejecutandose la funcion eliminar]
                 * @return {[type]} [description]
                 */
                scope.ok = function() {
                    $uibModalInstance.close();
                };
                /**
                 * [cancel cancela la eliminacion del usuario]
                 * @return {[type]} [description]
                 */
                scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };


            }
        ]);
})();
