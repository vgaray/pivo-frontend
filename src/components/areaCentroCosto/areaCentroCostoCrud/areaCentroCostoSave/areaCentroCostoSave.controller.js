angular.module('areaCentroCosto')
.controller('areaCentroCostoSaveController', [
    '$location', '$log', 'areaCentroCostoService', '$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService',
    function ($location, $log, areaCentroCostoService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService) {
        var scope = this;

        scope.varnab = $location.search();
        scope.dataInfo = {
            codUsuario: localStorageService.get("codUsuario"),
            token: localStorageService.get("token"),
            idInstancia: scope.varnab.idInstancia
        }

        scope.nombreAreaLista = [];
        scope.thereIsError = false;
        scope.firstLoad = true;
        scope.checkGenerateKey = dataModal.checkGenerateKey;

        /*validamos el tipo de modal*/
        scope.validarModal = dataModal.isArea;
        scope.frmData = {
            nameModal: dataModal.title,
            nameModal2: dataModal.title2,
            comboArea: {
                idEmpare: dataModal.response.AreaCosto.idEmpare,
                noArea: dataModal.response.AreaCosto.noArea,
                noCentroCosto: dataModal.response.AreaCosto.noCentroCosto,
                idArea: dataModal.response.AreaCosto.idArea,
            },
            area: {
                idEmpare: dataModal.response.AreaCosto.idEmpare,
                idPadre: dataModal.response.AreaCosto.idPadre,
                noArea: dataModal.response.AreaCosto.noArea,
                noCentroCosto: dataModal.response.AreaCosto.noCentroCosto,
                pNombreArea: dataModal.response.AreaCosto.pNombre,
                pNombreCentroCosto: dataModal.response.AreaCosto.pNombre,
                idArea: dataModal.response.AreaCosto.idArea,
                title: dataModal.title,
                title2: dataModal.title2,
            },

            areaCentroCosto: {
                entity: dataModal.response.AreaCosto,
                save: {
                    request: {}
                },

                buscar: {
                    request: {}
                },
                cargarCombo: {
                    request: {}
                }
            },
            areaCentroCostoSaved: {}
        }

        //Visible
        scope.menuState = {}
        scope.menuState.showArea = true;
        scope.menuState.showAI = false;
        scope.menuState.showAE = true;
        scope.menuState.showCentro = true;
        scope.menuState.showCI = false;
        scope.menuState.showCE = true;


        scope.visualizarAlBsucar = function () {
            if (dataModal.whatOperation == 1) {
                scope.menuState.showArea = true;
                scope.menuState.showCentro = true;
                scope.menuState.showAE = false;
                scope.menuState.showAI = true;
                scope.menuState.showCI = true;
                scope.menuState.showCE = false;

            } else if (dataModal.whatOperation == 2) {
                //Buscando Area
                if (scope.frmData.area.noCentroCosto == "") {
                    scope.menuState.showArea = true;
                    scope.menuState.showCentro = false;

                    scope.menuState.showAE = true;
                    scope.menuState.showAI = false;

                }
                //Buscando CentroCosto
                else {
                    scope.menuState.showArea = false;
                    scope.menuState.showCentro = true;
                    scope.menuState.showCI = false;
                    scope.menuState.showCE = true;
                }
            }
        }


        scope.listarNombreArea = function () {
            scope.frmData.areaCentroCosto.cargarCombo.request.tipOpera = 1;
            scope.frmData.areaCentroCosto.cargarCombo.request.idEmpare = null;
            areaCentroCostoService.listarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCosto.cargarCombo.request, function (result) {
                if (result.estado == 1) {

                    scope.frmData.comboArea = { idArea: 0, noArea: "Seleccione una Area" };
                    scope.nombreAreaLista = [scope.frmData.comboArea];
                    scope.nombreAreaLista = scope.nombreAreaLista.concat(result.listaCentroxArea);
                    if (dataModal.response.AreaCosto.idArea !== undefined && dataModal.response.AreaCosto.idArea != 0) {
                        scope.frmData.comboArea = {
                            idArea: dataModal.response.AreaCosto.idArea,
                            noArea: dataModal.response.AreaCosto.noArea
                        };
                    }

                } else if (result.estado == 0 || result.estado == -1) {
                    console.error('Error: ' + result.mensaje);
                }

                scope.frmData.areaCentroCosto.save.request.idEmpare = scope.frmData.nombre.idEmpare;
            },
                function (error) {
                    console.error('Error: ' + error);
                });
        }


        //Cargar para Area
        scope.matchingAreaSave = function () {

            scope.frmData.areaCentroCosto.save.request.idPadre = scope.frmData.area.idPadre;
            scope.frmData.areaCentroCosto.save.request.pNombre = scope.frmData.areaCentroCosto.entity.pNombreArea;

        }
        scope.varAreaEdi = 0;
        scope.matchingAreaParaEditar = function () {
            scope.frmData.areaCentroCostoSaved.idEmpare = scope.frmData.areaCentroCosto.entity.idEmpare;
            scope.frmData.areaCentroCostoSaved.pNombre = scope.frmData.areaCentroCosto.entity.noArea;
            scope.frmData.areaCentroCostoSaved.idPadre = null;

            if (scope.frmData.areaCentroCostoSaved.pNombre == undefined) {
                scope.varAreaEdi = 1;
            }
        }

        //Cargar para Centro de Costo
        scope.variable = 0;
        scope.matchingCentroCostoSave = function () {

            scope.frmData.areaCentroCosto.save.request.idPadre = scope.frmData.comboArea.idArea;
            scope.frmData.areaCentroCosto.save.request.pNombre = scope.frmData.areaCentroCosto.entity.pNombreCentroCosto;
            if (scope.frmData.areaCentroCosto.save.request.idPadre == 0) {
                scope.variable = 1;
            }

        }
        scope.varCentroEdi = 0;
        scope.matchingCentroCostoParaEditar = function () {
            scope.frmData.areaCentroCostoSaved.idEmpare = scope.frmData.areaCentroCosto.entity.idEmpare;
            scope.frmData.areaCentroCostoSaved.pNombre = scope.frmData.areaCentroCosto.entity.noCentroCosto;
            scope.frmData.areaCentroCostoSaved.idPadre = scope.frmData.comboArea.idArea;
            if (scope.frmData.areaCentroCostoSaved.pNombre == undefined) {
                scope.varCentroEdi = 1;
            } else if (scope.frmData.areaCentroCosto.save.request.idPadre == 0) {
                scope.varCentroEdi = 2;
            }

        }



        scope.saveCentroCosto = function (dismissModalCallback) {
            if (scope.thereIsError) {
                toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
            } else {
                scope.matchingCentroCostoSave();
                scope.matchingCentroCostoParaEditar();

                if (dataModal.whatOperation == utilService.operation.add && scope.variable == 0) {
                    areaCentroCostoService.insertarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCosto.save.request, function (result) {
                        if (result.insertar == 1) {

                            dismissModalCallback(scope.frmData.areaCentroCostoSaved);
                            toastr.remove();
                            toastr.success('Registro exitoso', 'Acción realizada', viewConfig.toastConfig);

                        } else if (result.insertar == 0 || result.insertar == -1) {
                            if (result.validar == "El campo nombre no puedo ir vacio.") {
                                toastr.error('No se guardar un Centro de Costo si no tiene nombre', 'Error', viewConfig.toastConfig);
                                console.error(result.mensaje);
                                dismissModalCallback(null);
                            } else if (result.validar == "El nombre de Centro Costo ya existe.") {
                                scope.act = true;
                                scope.dis = true;
                                //  toastr.error('El nombre del Centro de Costo ya existe', 'Error', viewConfig.toastConfig);
                                // console.error(result.mensaje);
                                //   dismissModalCallback(null);
                            }

                        }

                    },
                        function (error) {
                            console.error('Error: ' + error);
                        });
                } else if (dataModal.whatOperation == utilService.operation.add && scope.variable == 1) {
                    toastr.error('Seleccione un área', 'Error', viewConfig.toastConfig);
                    $uibModalInstance.close();
                } else if (dataModal.whatOperation == utilService.operation.update && scope.varCentroEdi == 0) {
                    areaCentroCostoService.actualizarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCostoSaved,
                        function (response) {
                            if (response.actualizado == 1) {
                                dismissModalCallback(scope.frmData.areaCentroCostoSaved);
                                toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);

                            } else if (response.actualizado == 0 || response.actualizado == -1) {
                                if (response.validar == "El nombre del Centro de Costo que desea actualizar ya existe.") {
                                    scope.act = true;
                                    scope.dis = true;
                                    // toastr.error('El nombre del Centro de Costo ya existe dentro del area', 'Error', viewConfig.toastConfig);
                                    // /*console.error( result.mensaje );*/
                                    // dismissModalCallback(null);
                                }
                            }
                        },
                        function (failure) {
                            console.error("Error: " + failure);
                        });
                } else if (dataModal.whatOperation == utilService.operation.update && scope.varCentroEdi == 1) {
                    toastr.error('Nombre de Centro de Costo no puedes estar vacio', 'Error', viewConfig.toastConfig);
                    $uibModalInstance.close();
                } else if (dataModal.whatOperation == utilService.operation.update && scope.varCentroEdi == 2) {
                    toastr.error('Seleccione un área', 'Error', viewConfig.toastConfig);
                    $uibModalInstance.close();
                }



            }
        }
        ///////////////areaValidar///////////////////////////////////
        scope.act = false;
        scope.dis = true;
        scope.changeAreaReg = function () {
            if (scope.frmData.areaCentroCosto.entity.pNombreArea == null) {
                scope.act = false;
                scope.dis = true;
            }
            else {
                scope.act = false;
                scope.dis = false;
            }
        }
        scope.tempArea = dataModal.response.AreaCosto.noArea;
        scope.changeAreaAct = function () {
            if (scope.frmData.areaCentroCosto.entity.noArea == null || scope.frmData.areaCentroCosto.entity.noArea == scope.tempArea) {
                scope.act = false;
                scope.dis = true;
            }
            else {
                scope.act = false;
                scope.dis = false;
            }
        }
        scope.chageCentroReg = function () {
            if (scope.frmData.areaCentroCosto.entity.pNombreCentroCosto == null || scope.frmData.comboArea.idArea <= 0) {
                scope.act = false;
                scope.dis = true;
            scope.chageCentroAct();
            }
            else {
                scope.act = false;
                scope.dis = false;
            }
        }
        //////////////////////////////
        scope.tempIdComboArea = dataModal.response.AreaCosto.idArea;
        scope.tempCentro = dataModal.response.AreaCosto.noCentroCosto;
        scope.chageCentroAct = function () {
            if (scope.frmData.areaCentroCosto.entity.noCentroCosto != null && scope.frmData.comboArea.idArea >0 ) {
                scope.dis = false;
                scope.act = false;
                if (scope.frmData.areaCentroCosto.entity.noCentroCosto == scope.tempCentro &&
                    scope.frmData.comboArea.idArea == scope.tempIdComboArea) {
                    scope.act = false;
                    scope.dis = true;
                }
            }
            else{
                scope.act = false;
                scope.dis = true;
            }
        }
        //////////////////////////////////////////
        scope.saveArea = function (dismissModalCallback) {
            if (scope.thereIsError) {
                toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
            } else {

                scope.matchingAreaSave();
                scope.matchingAreaParaEditar();


                if (dataModal.whatOperation == utilService.operation.add) {
                    areaCentroCostoService.insertarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCosto.save.request, function (result) {
                        if (result.insertar == 1) {
                            if (scope.frmData.areaCentroCosto.save.request.idPadre == null) {

                                scope.frmData.areaCentroCostoSaved.noArea = scope.frmData.areaCentroCosto.save.request.pNombre;

                            }

                            dismissModalCallback(scope.frmData.areaCentroCostoSaved);
                            scope.frmData.areaCentroCostoSaved.noArea == "";
                            toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);
                            scope.frmData.areaCentroCosto.entity.pNombreArea = "";
                            scope.listarNombreArea();

                        } else if (result.insertar == 0 || result.insertar == -1) {
                            if (result.validar == "El campo nombre no puedo ir vacio.") {
                                toastr.error('Nombre de Area no puedes estar vacio', 'Error', viewConfig.toastConfig);
                                console.error(result.mensaje);
                                //dismissModalCallback( null );
                            } else if (result.validar == "El nombre de Area ya existe.") {
                                scope.act = true;
                                scope.dis = true;
                                console.error(result.mensaje);
                                //dismissModalCallback( null );
                            }
                            // $uibModalInstance.close();
                        }
                    },
                        function (error) {
                            console.error('Error: ' + error);
                        });
                } else if (dataModal.whatOperation == utilService.operation.update && scope.varAreaEdi == 0) {
                    // scope.validarModal=true;
                    areaCentroCostoService.actualizarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCostoSaved,
                        function (response) {
                            if (response.actualizado == 1) {
                                if (scope.frmData.areaCentroCostoSaved.idPadre == null) {
                                    scope.frmData.areaCentroCostoSaved.noArea = scope.frmData.areaCentroCostoSaved.pNombre;
                                }
                                dismissModalCallback(scope.frmData.areaCentroCostoSaved);
                                toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);

                            } else if (response.actualizado == 0 || response.actualizado == -1) {
                                if (response.validar == "El nombre de Area que desea actualizar ya existe.") {
                                    //toastr.error('El nombre del area ya existe', 'Error', viewConfig.toastConfig);
                                    /*console.error( result.mensaje );*/
                                    scope.act = true;
                                    scope.dis = true;
                                    //dismissModalCallback(null);
                                }
                            }
                        },
                        function (failure) {
                            console.error("Error: " + failure);
                        });
                } else if (dataModal.whatOperation == utilService.operation.update && scope.varAreaEdi == 1) {
                    toastr.error('Nombre de Area no puedes estar vacio', 'Error', viewConfig.toastConfig);
                    $uibModalInstance.close();
                }
            }
        }

        scope.onSaveArea = function () {
            scope.saveArea(function (areaCentroCostoSaved) {
                $uibModalInstance.close(areaCentroCostoSaved);
            });
        }
        scope.onSaveCentroCosto = function () {
            scope.saveCentroCosto(function (areaCentroCostoSaved) {
                $uibModalInstance.close(areaCentroCostoSaved);
            });
        }

        scope.onFoundAreaCentroCosto = function () {
            scope.frmData.areaCentroCosto.buscar.request.idEmpare = scope.frmData.areaCentroCosto.entity.idEmpare;
            areaCentroCostoService.listarAreaCentroCosto(scope.dataInfo).post({}, scope.frmData.areaCentroCosto.buscar.request, function (result) {
                if (result.estado == 1) {
                    if (result.existeEx) {
                        $log.warn("Existe!");
                        scope.thereIsError = true;
                    } else {
                        $log.debug("No existe!");
                        scope.thereIsError = false;
                    }

                    $log.debug(scope.thereIsError ? "Hay errores en el formulario" : "No hay errores");
                } else {
                    $log.error(result.mensaje);
                }
            },
                function (error) {
                    $log.error(error);
                })
        }


        scope.cancel = function () {

            //  $uibModalInstance.dismiss( 'cancel' );
            $uibModalInstance.close();
        }

        scope.onLoadPage = function () {
            scope.visualizarAlBsucar();
            scope.listarNombreArea();
        }

        scope.onLoadPage();
    }
]);
