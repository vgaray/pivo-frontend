(
    function() {
        'use strict';
        angular.module('listaNegra')
            .controller('listaNegraCrudController', ['localStorageService', '$location', 'listaNegraService', '$uibModalInstance', 'pk_numero', 'viewConfig',
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
                        nombreNuevo: "Nuevo Número",
                        nombreEditar: "Editar Número"
                    };
                    scope.pk_numero = pk_numero;
                    /*Variables Request lista negra*/
                    scope.listaNegra = { nuTelefo: pk_numero, noDescri: null, coTipllam: null, ilActivo: true }
                        /*Tipo de Llamadas*/
                    scope.tipoLlamadas = [
                        { id: 1, nombre: 'Todas' },
                        { id: 2, nombre: 'Entrantes' },
                        { id: 3, nombre: 'Salientes' }
                    ];

                    // scope.validaTipoLlamada = function() {
                    //     if (scope.listaNegra.coTipllam == "Todas") {

                    //     }
                    // };

                    /**
                     * [insertaListaNegra agregar numero a la lista negra]
                     * @return {[type]} [description]
                     */
                    scope.insertaListaNegra = function() {
                        if (pk_numero == null || pk_numero == undefined) {
                            (scope.listaNegra.noDescri == null) ? scope.listaNegra.noDescri = "" : scope.listaNegra.noDescri; 
                            scope.listaNegra.coTipllam = parseInt(scope.listaNegra.coTipllam);
                            listaNegraService.insertaListaNegra(scope.dataInfo).post({}, scope.listaNegra, function(result) {
                                if (result.estado == 1) {
                                    scope.ok();
                                    toastr.success(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                } else if (result.estado == 0) {
                                    toastr.warning(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                } else if (result.estado == -1) {
                                    toastr.error(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                }
                            }, function(error) {
                                console.log('error ' + error);
                            })
                        }
                    };
                    /**
                     * [editaListaNegra agregar numero a la lista negra]
                     * @return {[type]} [description]
                     */
                    scope.editaListaNegra = function() {
                        if (pk_numero != null || pk_numero != undefined) {
                            listaNegraService.editaListaNegra(scope.dataInfo).post({}, scope.listaNegra, function(result) {
                                if (result.estado == 1) {
                                    scope.ok();
                                    toastr.success(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                } else if (result.estado == 0) {
                                    toastr.warning(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                } else if (result.estado == -1) {
                                    toastr.error(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                                }
                            }, function(error) {
                                console.log('error ' + error);
                            })
                        }

                    };
                    /*lista por id*/
                    scope.listPorNumListaNegra = [];
                    scope.listaPorNumListaNegra = function() {
                        if (pk_numero != null || pk_numero != undefined) {
                            listaNegraService.listaListaNegra(scope.dataInfo).post({}, scope.listaNegra, function(result) {
                                if (result.estado == 1) {
                                    scope.listPorNumListaNegra = result.listasNegras;
                                    for (var i = 0; i < scope.listPorNumListaNegra.length; i++) {
                                        scope.listaNegra.nuTelefo = scope.listPorNumListaNegra[i].nuTelefo;
                                        scope.listaNegra.noDescri = scope.listPorNumListaNegra[i].noDescri;
                                        scope.listaNegra.coTipllam = scope.listPorNumListaNegra[i].coTipllam;
                                        if (scope.listaNegra.coTipllam == "Todas") {
                                            scope.listaNegra.coTipllam = 1;
                                        } else if (scope.listaNegra.coTipllam == "Entrantes") {
                                            scope.listaNegra.coTipllam = 2;
                                        } else if (scope.listaNegra.coTipllam == "Salientes") {
                                            scope.listaNegra.coTipllam = 3;
                                        }
                                        scope.listaNegra.ilActivo = scope.listPorNumListaNegra[i].ilActivo;
                                    }

                                }
                            }, function(error) {
                                console.log('error ' + error);
                            })
                        }
                    };
                    scope.listaPorNumListaNegra();
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
            ])
    })();
