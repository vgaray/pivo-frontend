angular.module('centralExterna')
    .controller('centralExternaCtrl', [
        '$location', '$log', 'centralExternaService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, centralExternaService, localStorageService, utilService, $uibModal, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.frmData = {
                add: utilService.operation.add,
                update: utilService.operation.update,
                nameModalInsertCentral: "Nueva Central Externa",
                nameModalUpdateCentral: "Editar Central Externa",
                titulo: "Lista Central Externa",
                centralExterna: {
                    lista: {
                        request: {
                            pIdEmpresa: null,
                            pOpcion: null
                        }
                    },
                    modal: {
                        delete: {
                            title: "Mensaje del Sistema",
                            content: "¿Está seguro que desea eliminar este registro?",
                            request: {
                                idEmpresa: 0,
                                noEmpresa: ""
                            }
                        },
                        save: {
                            response: {
                                central: {}
                            }
                        }
                    }
                }
            }
            
            //Listar Central Externa
            scope.lscentralExterna = [];
            scope.listarCentralExterna = function() {
                scope.frmData.centralExterna.lista.request.pIdEmpresa = null;
                scope.frmData.centralExterna.lista.request.pOpcion = 1;
                centralExternaService.listarCentralExterna(scope.dataInfo).post({}, scope.frmData.centralExterna.lista.request, function(result) {
                        scope.lscentralExterna = result.centralExternaList;
                        if (scope.lscentralExterna.length == 0) {
                            scope.validaGrilla = true;
                            scope.validaVacio = false;
                            console.log("Lista vacia");
                        } else {
                            scope.validaGrilla = false;
                            scope.validaVacio = true;
                        }
                    },
                    function(error) {
                        console.error(error);
                    });
            };
            //Modal Save
            scope.listaTemporal = [];
            scope.onFoundCentral = function(idEmpresa, openModalSaveCallback) {
                scope.frmData.centralExterna.lista.request.pIdEmpresa = idEmpresa;
                scope.frmData.centralExterna.lista.request.pOpcion = 2;
                centralExternaService.listarCentralExterna(scope.dataInfo).post({}, scope.frmData.centralExterna.lista.request, function(response) {
                        if (response.estado == 1) {
                            scope.listaTemporal = response.centralExternaList;
                            if (scope.listaTemporal.length == 1) {
                                scope.frmData.centralExterna.modal.save.response.central = response.centralExternaList[0];
                            } else if (scope.listaTemporal.length == 0 && scope.listaTemporal.length > 1) {
                                scope.frmData.centralExterna.modal.save.response.central = null;
                            }
                            openModalSaveCallback(scope.frmData.centralExterna.modal.save);
                        } else {
                            console.error("Error: " + response.mensaje);
                        }

                    },
                    function(failure) {
                        console.console.error("Error: " + failure);
                    });
            }

            scope.onSaveCentral = function(whatOperation, idEmpresa) {
                scope.openModalSave(whatOperation, idEmpresa,
                    function(idEmpresa) {
                        scope.onFoundCentral(idEmpresa, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/centralExterna/centralExternaCrud/centralExternaSave/centralExternaSave.template.html',
                                controller: 'centralExternaSaveController as Ctrl',
                                backdrop: 'static',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(centralSaved) {
                                scope.listarCentralExterna();
                            });
                        });
                    });
            }

            scope.openModalSave = function(whatOperation, idEmpresa, foundCentralCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.centralExterna.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.centralExterna.modal.save.title = scope.frmData.nameModalInsertCentral;
                        scope.frmData.centralExterna.modal.save.response.central = {};
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.centralExterna.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.centralExterna.modal.save.title = scope.frmData.nameModalUpdateCentral;

                    }

                    foundCentralCallback(idEmpresa);
                }
            }


            //Eliminar Cental Externa
            scope.onEliminarCentralExterna = function(idEmpresa, noEmpresa) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/centralExterna/centralExternaCrud/centralExternaDelete/centralExternaDelete.template.html',
                    controller: 'centralExternaDeleteController as Ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.centralExterna.modal.delete.request.idEmpresa = idEmpresa;
                            scope.frmData.centralExterna.modal.delete.request.noEmpresa = noEmpresa;
                            return scope.frmData.centralExterna.modal.delete;
                        }
                    }
                });

                modalInstance.result.then(function(ilEliminado) {
                        $log.debug("Eliminado: " + ilEliminado);

                        if (ilEliminado >= 1) {
                            scope.onRemoveCE();
                        }
                    },
                    function() {
                        $log.debug("Modal eliminar minimizado");
                        scope.listarCentralExterna();
                    });

            };

            scope.onRemoveCE = function() {
                for (var i = 0; i < scope.lscentralExterna.length; i++) {
                    if (scope.lscentralExterna[i].idEmpresa == scope.frmData.centralExterna.modal.delete.request.idEmpresa) {
                        scope.lscentralExterna.splice(i, 1);
                        break;
                    }
                }
            };
            
            //Cargar en un Inicio
            scope.onload = function() {
                scope.listarCentralExterna();
            };
            scope.onload();
        }
    ]);
