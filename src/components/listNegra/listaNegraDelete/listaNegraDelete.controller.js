(
    function() {
        'use strict';
        angular.module('listaNegra')
            .controller('listaNegraDeleteController', ['localStorageService', '$location', 'listaNegraService', '$uibModalInstance', 'pk_numero', 'viewConfig',
                function(localStorageService, $location, listaNegraService, $uibModalInstance, pk_numero, viewConfig) {

                    /**/
                    var scope = this;
                    /*variables para el request header*/
                    scope.varnab = $location.search();
                    scope.dataInfo = {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                        idInstancia: scope.varnab.idInstancia
                    }

                    scope.modal = {
                        title: 'Información del sistema',
                        content: '¿Estás seguro que deseas eliminar el número '
                    };

                    /* variables para eliminar*/
                    scope.listaNegra = { nuTelefo: pk_numero };
                        /**
                         * [eliminarNumero description]
                         * @return {[type]} [description]
                         */
                    scope.eliminarNumero = function() {
                        listaNegraService.eliminaListaNegra(scope.dataInfo).post({}, scope.listaNegra, function(result) {
                            if (result.estado == 1) {
                                scope.ok();
                                toastr.success(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                console.log(result.mensaje);

                            } else if (result.estado == -1) {
                                toastr.error("No se puede eliminar", "Lista Negra", viewConfig.toastConfig);
                                console.log(result.mensaje);
                            }
                        }, function(error) {
                            console.log("error " + error);
                        })
                        console.log(scope.listaNegra);
                    };

                    /**
                     * Mensaje del modal
                     * Contiene el número que se desea eliminar.
                     */
                    scope.mensajeModal = function() {
                        scope.mensajeCompleto = scope.modal.content + scope.listaNegra.nuTelefo + "?";
                        console.log(scope.mensajeCompleto);
                    }

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

                    scope.mensajeModal();
                }
            ])
    })();
