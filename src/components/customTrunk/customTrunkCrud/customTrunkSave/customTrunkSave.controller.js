angular.module("customTrunk").
controller('customTrunkSaveController', ['customTrunkService', '$state', '$location', 'localStorageService', 'viewConfig', '$uibModalInstance', 'dataModal', 'utilService',
    function(customTrunkService, $state, $location, localStorageService, viewConfig, $uibModalInstance, dataModal, utilService) {
        var scope = this;
        scope.varnab = $location.search();
        //llamando a las cabeceras del metodo restService
        scope.dataInfo = {
            codUsuario: localStorageService.get("codUsuario"),
            token: localStorageService.get("token"),
            idInstancia: scope.varnab.idInstancia
        }

        scope.thereIsError = false;
        scope.firstLoad = true;
        scope.check = dataModal.btnHabilitar;
        scope.nuEstado = 0;
        //variables request de la peticion de insercion

        scope.frmData = {
            nameModal: dataModal.title,
            btnHabilitar: dataModal.btnHabilitar,
            temporalIdCustomTrunk: dataModal.response.customTrunk.idCustomTrunk,
            temporalNoCustomTrunk: dataModal.response.customTrunk.noCustomTrunk,
            temporalNoDetalle: dataModal.response.customTrunk.noDetalle,
            temporalTiCustomTrunk: dataModal.response.customTrunk.tiCustomTrunk,
            customTrunk: {
                entity: dataModal.response.customTrunk,

                mensajeValida: "",
                save: {
                    request: {},
                    response: {
                        existe: 0
                    }
                },
                buscar: {
                    request: {
                        idCustomTrunk: 0
                    }
                }
            },
            customTrunkSaved: {}
        }

        scope.nuEstadoBoton=0;
        scope.onValidaBoton = function(){
      if(dataModal.whatOperation == utilService.operation.add){
            if(scope.frmData.customTrunk.entity.noCustomTrunk==null ||
               scope.frmData.customTrunk.entity.tiCustomTrunk==null||
               scope.frmData.customTrunk.entity.noDetalle==null){
            scope.nuEstadoBoton=1;
        }else {
            scope.nuEstadoBoton=0;
        }
      } 
      else if(dataModal.whatOperation == utilService.operation.update){
          scope.nuEstadoBoton=1;
        scope.temporalNoCustomTrunkUni=scope.frmData.temporalNoCustomTrunk;
        scope.temporalTiCustomTrunkUni=scope.frmData.temporalTiCustomTrunk;
        scope.temporalNoDetalleUni=scope.frmData.temporalNoDetalle;
        
        if(scope.frmData.customTrunk.entity.noCustomTrunk==scope.temporalNoCustomTrunkUni &&
        scope.frmData.customTrunk.entity.tiCustomTrunk==scope.temporalTiCustomTrunkUni &&
        scope.frmData.customTrunk.entity.noDetalle==scope.temporalNoDetalleUni
        ){
            scope.nuEstadoBoton=1;
        }else if(scope.frmData.customTrunk.entity.noCustomTrunk==null ||
               scope.frmData.customTrunk.entity.noDetalle==null){
            scope.nuEstadoBoton=1;
        }
        else {
            scope.nuEstadoBoton=0;
        }
      }
    }

        scope.cambiarNombreGuion = function() {
            if (scope.frmData.customTrunk.entity.noCustomTrunk == null || scope.frmData.customTrunk.entity.noCustomTrunk == "" ||
                scope.frmData.customTrunk.entity.noDetalle == null || scope.frmData.customTrunk.entity.noDetalle == "") {
                scope.estado = 0;
                scope.mensajeDup = "";
            } else {
                scope.frmData.customTrunk.entity.noCustomTrunk = scope.frmData.customTrunk.entity.noCustomTrunk.replace(" ", "-");
                scope.frmData.customTrunk.entity.noCustomTrunk = scope.frmData.customTrunk.entity.noCustomTrunk.trim();
                scope.compararTemporal();
            }
        }

        scope.tipoCustomTrunk = [{
                id: 1,
                nombre: 'SIP Trunk'
            },
            {
                id: 2,
                nombre: 'IAX Trunk'
            },
            {
                id: 3,
                nombre: 'Dundi Trunk'
            }
        ];

        //Insertar
        scope.onSaveCustomTrunk = function() {
            scope.saveCustomTrunk(function(customTrunkSaved) {
                $uibModalInstance.close(customTrunkSaved);
            });
        }
        //Cargar para customTrunk

        scope.varibleValidar = 0;
        scope.matchingCustomTrunkSave = function() {
            scope.frmData.customTrunk.save.request.nombre = scope.frmData.customTrunk.entity.noCustomTrunk;
            scope.frmData.customTrunk.save.request.tipo = scope.frmData.customTrunk.entity.tiCustomTrunk;
            scope.frmData.customTrunk.save.request.detalle = scope.frmData.customTrunk.entity.noDetalle;
        }
        scope.matchingCustomTrunkEditar = function() {
            scope.frmData.customTrunkSaved.idCustomTrunk = scope.frmData.customTrunk.entity.idCustomTrunk;
            scope.frmData.customTrunkSaved.nombre = scope.frmData.customTrunk.entity.noCustomTrunk;
            scope.frmData.customTrunkSaved.tipo = scope.frmData.customTrunk.entity.tiCustomTrunk;
            scope.frmData.customTrunkSaved.detalle = scope.frmData.customTrunk.entity.noDetalle;

        }


        //Nombre del tipo
        scope.nombreTipo = "";
        scope.obtenerNombreTipo = function() {
            for (i = 0; i < scope.tipoCustomTrunk.length; i++) {
                if (scope.frmData.customTrunk.entity.tiCustomTrunk == scope.tipoCustomTrunk[i].id) {
                    scope.nombreTipo = scope.tipoCustomTrunk[i].nombre;
                    i = scope.tipoCustomTrunk.length + 1;
                }
            }
        }
        //Validar Tipo
        scope.validarTipo= function(){
            if(scope.frmData.customTrunk.entity.tiCustomTrunk==null){
                scope.menvalTipo="*Campo Requerido";
                scope.mensajeDupDe="";
                scope.mensajeDup="";
                //toastr.error("Seleccione Tipo de Custom Trunk", 'Error', viewConfig.toastConfig);
                scope.flaTipo=1;
            }
            else {
                scope.menvalTipo="";
                scope.mensajeDupDe="";
                scope.mensajeDup="";
                //toastr.error("Seleccione Tipo de Custom Trunk", 'Error', viewConfig.toastConfig);
                scope.flaTipo=0;
            }
        }
        scope.estado = 0;
        scope.flaTipo= 0;
        scope.estadoDe = 0;
        scope.mensajeDup = "";
        scope.mensajeDupDe = "";
        //Metodo de insertar y actualizar
        scope.saveCustomTrunk = function(dismissModalCallback) {
            scope.obtenerNombreTipo();
            if (scope.thereIsError) {
                toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
            } else {
                scope.matchingCustomTrunkSave();
                scope.matchingCustomTrunkEditar();

                if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0) {
                    customTrunkService.insertaCustomTrunk(scope.dataInfo).post({}, scope.frmData.customTrunk.save.request, function(result) {
                            if (result.estado == 1) {
                                dismissModalCallback(scope.frmData.customTrunkSaved);
                                toastr.remove();
                                toastr.success('Troncal ' + scope.nombreTipo + ' Creada Correctamente', 'Acción realizada', viewConfig.toastConfig);

                            } else if (result.estado == 0) {
                                scope.estado = 1;
                                if(scope.frmData.customTrunk.save.request.nombre== ""){
                                 scope.mensajeDup = "*Campo requerido";                                   
                                }
                                else {
                                scope.mensajeDup = "*Nombre de Troncal '" + scope.frmData.customTrunk.entity.noCustomTrunk + "' ya existe";                                    
                                }
                                scope.estadoDe = 0;
                                scope.mensajeDupDe = "";

                            } else if (result.estado == 2) {
                                scope.estado = 0;
                                scope.mensajeDup = "";
                                scope.estadoDe = 1;
                                scope.mensajeDupDe = "*No se ha digitado el contexto requerido";

                            } else if (result.estado == 3) {
                                scope.estado = 0;
                                scope.mensajeDup = "";
                                scope.estadoDe = 1;
                                scope.mensajeDupDe = "*Se ha digitado una cantidad mayor de contextos requerido";
                            } else if (result.estado == 4) {
                                 scope.menvalTipo="*Campo Requerido";
                                 scope.mensajeDupDe="";
                                 scope.mensajeDup="";
                                 //toastr.error("Seleccione Tipo de Custom Trunk", 'Error', viewConfig.toastConfig);
                                 scope.flaTipo=1;
                            }else if (result.estado == -1) {
                                toastr.remove();
                                    toastr.error(result.mensaje, 'Error', viewConfig.toastConfig);
                                    scope.flaTipo= 0;
                            }
                        },
                        function(error) {
                            console.error('Error: ' + error);
                        });
                } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0) {
                    customTrunkService.actualizaCustomTrunk(scope.dataInfo).post({}, scope.frmData.customTrunkSaved, function(response) {
                            if (response.estado == 1) {
                                dismissModalCallback(scope.frmData.customTrunkSaved);
                                toastr.remove();
                                toastr.success('Troncal ' + scope.nombreTipo + ' Guardada Correctamente', 'Acción realizada', viewConfig.toastConfig);
                            } else if (response.estado == 0) {
                                scope.estado = 1;
                                scope.mensajeDup = "*Nombre de Troncal '" + scope.frmData.customTrunk.entity.noCustomTrunk + "' ya existe";
                                scope.estadoDe = 0;
                                scope.mensajeDupDe = "";
                            } else if (response.estado == 2) {
                                scope.estado = 0;
                                scope.mensajeDup = "";
                                scope.estadoDe = 1;
                                scope.mensajeDupDe = "*No se ha digitado el contexto requerido";
                            } else if (response.estado == 3) {
                                scope.estado = 0;
                                scope.mensajeDup = "";
                                scope.estadoDe = 1;
                                scope.mensajeDupDe = "*Se ha digitado una cantidad mayor de contextos requerido";
                            } else if (response.estado == -1) {
                                toastr.remove();
                                toastr.error('No se pudo actualizar el Custom Trunk', 'Error', viewConfig.toastConfig);
                                dismissModalCallback(null);
                            }
                        },
                        function(failure) {
                            console.error("Error: " + failure);
                        });
                }
            }
        }
        scope.compararTemporal = function() {
            if (dataModal.whatOperation == utilService.operation.add) {
                scope.nuEstado = 0;
            } else if (dataModal.whatOperation == utilService.operation.update) {

                if (scope.frmData.customTrunk.entity.noCustomTrunk == scope.frmData.temporalNoCustomTrunk &&
                    scope.frmData.customTrunk.entity.noDetalle == scope.frmData.temporalNoDetalle &&
                    scope.frmData.customTrunk.entity.tiCustomTrunk == scope.frmData.temporalTiCustomTrunk) {
                    scope.nuEstado = 1;
                } else {
                    scope.nuEstado = 0;
                }


            }
        }

        scope.cancel = function() {

            $uibModalInstance.close();
        }
        scope.onLoadPage = function() {
            scope.compararTemporal();
            scope.onValidaBoton();
        }
        scope.onLoadPage();
    }
]);
