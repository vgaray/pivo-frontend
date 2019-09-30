(function() {
    'use strict';
    angular.module('gestionHorario')
        .controller('horarioDeleteController', ['localStorageService', '$location', 'gestionHorarioService', '$uibModalInstance', 'idHorario', 'viewConfig',
            function(localStorageService, $location, gestionHorarioService, $uibModalInstance, idHorario, viewConfig) {
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
                scope.modal = { title: 'Eliminar Grupo Horario', content: '¿Desea Eliminar el Registro?'}
                scope.horarioRequest = { idHorario: idHorario };
                /**
                 * function para eliminar  horario
                 */
                scope.eliminaHorario = function() {
                    gestionHorarioService.eliminaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        if (result.estado == 1 && result.resultado == 1) {
                            scope.ok();
                            toastr.success(result.mensaje, 'Eliminar Horario', viewConfig.toastConfig);
                        } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                            toastr.error("No se puede eliminar, revise sus datos", "Error", viewConfig.toastConfig);
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
