(
    function () {
        'use strict';
        angular.module('areaCentroCosto')
            .controller('areaCentroCostoCtrl', [
                '$location', '$log', 'areaCentroCostoService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
                function ($location, $log, areaCentroCostoService, localStorageService, utilService, $uibModal, viewConfig) {
                    var scope = this;

                    scope.varnab = $location.search();
                    scope.dataInfo = {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                        idInstancia: scope.varnab.idInstancia
                    };

                    scope.frmData = {
                        add: utilService.operation.add,
                        update: utilService.operation.update,
                        nameModalInsertArea: "Nueva Area",
                        nameModalInsertCentro: "Nuevo Centro de Costo",
                        nameModalUpdateArea: "Editar Area",
                        nameModalUpdateCentro: "Editar Centro de Costo",
                        areaCentroCosto: {
                            list: {
                                filtroAreaCentro: {
                                    request: {
                                        tipOpera: 2,
                                        idEmpare: "",
                                        // pNoArea:"",
                                        // pNoCentroCosto:0
                                    }
                                },
                                buscarAreaCentro: {
                                    request: {
                                        tipOpera: 0,
                                        idEmpare: null,
                                        pNoCentroCosto: null,
                                        pNoArea: null,
                                    }
                                }
                            }
                        },
                        modal: {
                            save: {
                                whatOperation: 0,
                                checkGenerateKey: false,
                                title: "",
                                title2: "",
                                response: {
                                    AreaCosto: {}
                                }
                            },
                            delete: {
                                title: "Mensaje del Sistema",
                                content: "¿Está seguro que desea eliminar este registro?",
                                areaCentroCostoDeleteRequest: {
                                    idEmpare: 0,
                                    noare: "",
                                    nocen: ""
                                }
                            }
                        }
                    };
                    scope.listarInicial = function () {
                        scope.frmData.areaCentroCosto.list.buscarAreaCentro.request.pNoArea = null;
                        scope.frmData.areaCentroCosto.list.buscarAreaCentro.request.pNoCentroCosto = null;
                        scope.listarContenido(true);
                    }
                    //Buscar el request
                    scope.lsAreaCentroCosto = [];
                    scope.arregloPrueba = [];
                    scope.listarContenidoFiltro = function (tecla) {
                        scope.contenidoArea = scope.frmData.areaCentroCosto.list.buscarAreaCentro.request.pNoArea
                        scope.contenidoCentro = scope.frmData.areaCentroCosto.list.buscarAreaCentro.request.pNoCentroCosto
                       try {
                        if (scope.contenidoArea.trim() === "") {
                            scope.contenidoArea = null;
                        }   
                       } catch (error) {
                           
                       }
                       try {
                        if (scope.contenidoCentro.trim() === "") {
                            scope.contenidoCentro = null;
                        }
                       } catch (error) {
                           
                       }
                        
                        if (tecla == 13) {
                            if (scope.contenidoArea == null && scope.contenidoCentro == null) {
                                scope.frmData.areaCentroCosto.list.buscarAreaCentro.request.pNoArea = null;
                                scope.frmData.areaCentroCosto.list.buscarAreaCentro.request.pNoCentroCosto = null;
                                scope.listarContenido(true);
                            } else {
                                scope.listarContenido(false);
                            }
                        }
                    };
                    scope.listarContenido = function (estado) {
                        scope.espacioArea = estado;
                        scope.espacioCentro = estado;
                        areaCentroCostoService.listarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCosto.list.buscarAreaCentro.request, function (result) {
                            scope.lsAreaCentroCosto = result.listaCentroxArea;
                            scope.totalItems = scope.lsAreaCentroCosto.length;
                            var rowIndex = 1, rowSubIndex = 1;
                            for (var i = 0; i < scope.totalItems; i++) {
                                var obj = scope.lsAreaCentroCosto[i];
                                if (obj.idArea == obj.idEmpare) {
                                    obj.dad = true;
                                    obj.index = rowIndex;
                                    rowSubIndex = 1;
                                    obj.subindex = rowSubIndex;
                                    rowIndex++;
                                } else {
                                    obj.dad = false;
                                    obj.index = rowIndex;
                                    obj.subindex = rowSubIndex;
                                    rowSubIndex++;
                                }
                            }
                            if (scope.lsAreaCentroCosto.length == 0) {
                                toastr.remove();
                                toastr.info('Vacío', 'Listado', viewConfig.toastConfig);
                            }
                        },
                            function (error) {
                                console.error(error);
                            });

                    };
                    //Paginacion
                    /*variables para paginar*/
                    scope.currentPage = 1;
                    scope.numPerPage = 10;
                    scope.paginate = function (value) {
                        var begin, end, index;
                        begin = (scope.currentPage - 1) * scope.numPerPage;
                        end = begin + scope.numPerPage;
                        index = scope.lsAreaCentroCosto.indexOf(value);
                        return (begin <= index && index < end);

                    };
                    //Registrar y actualizar
                    //Boton registrar

                    scope.onFoundAreaCentroCosto = function (idEmpare, openModalSaveCallback) {
                        scope.frmData.areaCentroCosto.list.filtroAreaCentro.request.idEmpare = idEmpare;

                        areaCentroCostoService.listarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCosto.list.filtroAreaCentro.request, function (response) {
                            if (response.estado == 1) {
                                if (response.listaCentroxArea.length > 0) {
                                    scope.frmData.modal.save.response.AreaCosto = response.listaCentroxArea[0];


                                    /*validacion para separar modal*/
                                    if (scope.frmData.modal.save.response.AreaCosto.idEmpare == scope.frmData.modal.save.response.AreaCosto.idArea) {
                                        scope.frmData.modal.save.isArea = true;
                                    } else if (scope.frmData.modal.save.response.AreaCosto.idEmpare != scope.frmData.modal.save.response.AreaCosto.idArea) {
                                        scope.frmData.modal.save.isArea = false;
                                    }
                                    /*end*/
                                }

                                openModalSaveCallback(scope.frmData.modal.save);
                            } else {
                                console.error("Error: " + response.mensaje);
                            }
                        },
                            function (failure) {
                                console.error("Error: " + failure);
                            });
                    };
                    scope.onSaveAreaCentroCosto = function (whatOperation, idEmpare) {
                        scope.openModalSave(whatOperation, idEmpare,
                            function (idEmpare) {
                                scope.onFoundAreaCentroCosto(idEmpare, function (dataModal) {
                                    var modalInstance = $uibModal.open({
                                        templateUrl: 'src/components/areaCentroCosto/areaCentroCostoCrud/areaCentroCostoSave/areaCentroCostoSave.template.html',
                                        controller: 'areaCentroCostoSaveController as ctrl',
                                        backdrop: 'static',
                                        resolve: {
                                            dataModal: function () {

                                                return dataModal;
                                            }
                                        }
                                    });

                                    modalInstance.result.then(function (areaCentroCostoSaved) {
                                        scope.listarContenido(true);
                                    });
                                });
                            });
                    };

                    scope.onSaveCentroCosto = function (whatOperation, idEmpare) {
                        scope.openModalSave(whatOperation, idEmpare,
                            function (idEmpare) {
                                scope.onFoundAreaCentroCosto(idEmpare, function (dataModal) {
                                    var modalInstance = $uibModal.open({
                                        templateUrl: 'src/components/areaCentroCosto/areaCentroCostoCrud/areaCentroCostoSave/areaCentroCostoSave.template.html',
                                        controller: 'areaCentroCostoSaveController as ctrl',
                                        backdrop: 'static',
                                        resolve: {
                                            dataModal: function () {
                                                scope.frmData.modal.save.isArea = false;
                                                return dataModal;
                                            }
                                        }
                                    });

                                    modalInstance.result.then(function (areaCentroCostoSaved) {
                                        scope.listarContenido(true);
                                    });
                                });
                            });
                    };
                    scope.openModalSave = function (whatOperation, idEmpare, foundAreaCentroCostoCallback) {
                        if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                            if (whatOperation == scope.frmData.add) {


                                scope.frmData.modal.save.whatOperation = scope.frmData.add;
                                scope.frmData.modal.save.checkGenerateKey = true;
                                scope.frmData.modal.save.title = scope.frmData.nameModalInsertArea;
                                scope.frmData.modal.save.title2 = scope.frmData.nameModalInsertCentro;
                                scope.frmData.modal.save.response.AreaCosto = {};

                                scope.frmData.modal.save.isArea = true;
                            } else if (whatOperation == scope.frmData.update) {

                                scope.frmData.modal.save.whatOperation = scope.frmData.update;
                                scope.frmData.modal.save.title = scope.frmData.nameModalUpdateArea;
                                scope.frmData.modal.save.title2 = scope.frmData.nameModalUpdateCentro;


                            }

                            foundAreaCentroCostoCallback(idEmpare);
                        }
                    };


                    //Eliminar
                    //Boton eliminar de la tabla
                    scope.onEliminarAreaCentroCosto = function (idEmpare, are, cen) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'src/components/areaCentroCosto/areaCentroCostoCrud/areaCentroCostoDelete/areaCentroCostoDelete.template.html',
                            controller: 'areaCentroCostoDeleteController as areaCentroCostoDeleteCtrl',
                            size: 'sm',

                            resolve: {
                                dataModal: function () {
                                    scope.frmData.modal.delete.areaCentroCostoDeleteRequest.idEmpare = idEmpare;
                                    scope.frmData.modal.delete.areaCentroCostoDeleteRequest.noare = are;
                                    scope.frmData.modal.delete.areaCentroCostoDeleteRequest.nocen = cen;
                                    return scope.frmData.modal.delete;
                                }
                            }
                        });

                        modalInstance.result.then(function (ilEliminado) {
                            $log.debug("Eliminado: " + ilEliminado);

                            if (ilEliminado >= 1) {
                                scope.onRemoveACC();
                            }
                        },
                            function () {
                                $log.debug("Modal eliminar minimizado");
                                scope.listarContenido(true);
                            });

                    };

                    scope.onRemoveACC = function () {
                        for (var i = 0; i < scope.lsAreaCentroCosto.length; i++) {
                            if (scope.lsAreaCentroCosto[i].idEmpare == scope.frmData.modal.delete.areaCentroCostoDeleteRequest.idEmpare) {
                                scope.lsAreaCentroCosto.splice(i, 1);
                                break;
                            }
                        }
                    };
                    //Cargar inmediatamente después de cargar una página
                    scope.listarContenido(true);

                    /*variables para enviar los valores para asignar*/
                    scope.dataCrudBolsaEmpresa = { idEmpare: null, idPadre: null };
                    /*Modal mantenimiento de bolsa usuario*/
                    scope.modalBolsaEmpresa = function (idEmpare, idPadre) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'src/components/areaCentroCosto/areaCentroCostoCrud/bolsaAreaCentroCosto/bolsaAreaCentroCosto.template.html',
                            controller: 'bolsaAreaCentroCostoController as ctrl',
                            keyboard: false,
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {
                                dataCrudBolsaEmpresa: function () {
                                    scope.dataCrudBolsaEmpresa.idEmpare = idEmpare;
                                    scope.dataCrudBolsaEmpresa.idPadre = idPadre;
                                    return scope.dataCrudBolsaEmpresa;
                                }
                            }
                        });

                        modalInstance.result.then(function () {
                            // scope.listaUsuario();
                            // console.log('Modal cerrado');
                        }, function () {
                            // scope.listaUsuario();
                            // console.log('Cancelar');
                        });
                    };

                }
            ]);

    })();
