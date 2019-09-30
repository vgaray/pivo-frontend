angular.module('fax')
    .controller('faxSaveController', [
        '$location', '$log', 'faxService','$uibModalInstance', 'planMarcacionService', 'localStorageService', 'dataModal', 'viewConfig', 'utilService','$timeout',
        function($location, $log, faxService, $uibModalInstance, planMarcacionService, localStorageService, dataModal, viewConfig, utilService,$timeout) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.thereIsError = false;
            scope.varValidacion = true;

            scope.varNoFaxVirtual=false;
            scope.varNoCorreoAsociado=false;
            scope.varPasswordFax=false;
            scope.varIdExtension=false;

            scope.frmData = {
                nameModal: dataModal.title,
                btnHabilitar: dataModal.btnHabilitar,
                fax: {
                    entity: dataModal.response.fax,
                    mensajeValida: "",
                    save: {
                        request: {},
                        response:{
                            existe:0
                        }
                    },
                    buscar: {
                        request: {}
                    }                                     
                },
                faxSaved: {}
            }

            //Validacion de Boton Guardar
            scope.validaTodo = function() {
                    if (scope.frmData.fax.entity.noFaxVirtual== null) {
                        scope.varNoFaxVirtual = false;
                    } else {
                        scope.varNoFaxVirtual = true;
                    }                    
                scope.validaCorreo();
            }
            scope.validaCorreo = function() {
                if (scope.frmData.fax.entity.noCorreoAsociado== null) {
                    scope.varNoCorreoAsociado = false;
                } else {
                    scope.varNoCorreoAsociado = true;
                }
                scope.validaPassword();
            }            
            scope.validaPassword= function() {
                if (scope.frmData.fax.entity.passwordFax== null) {
                    scope.varPasswordFax = false;
                } else {
                    scope.varPasswordFax = true;
                }
                scope.validaAnexo();
            }                
            scope.validaAnexo = function() {
                if (scope.frmData.fax.entity.idExtension== null) {
                    scope.varIdExtension = false;
                } else {
                    scope.varIdExtension = true;
                }
                scope.validaBotonHab();
            }       

            scope.validaBotonHab= function(){
                if(scope.varNoFaxVirtual==true && scope.varNoCorreoAsociado==true && scope.varPasswordFax==true && scope.varIdExtension==true){
                    scope.varValidacion=false;
                }else{
                    scope.varValidacion=true;
                }                                          
            }
                      

            //Insertar
            scope.onSaveFax = function() {
                scope.saveFax(function(faxSaved) {
                    $uibModalInstance.close(faxSaved);
                });
            }

            scope.varibleValidar = 0;
            scope.matchingFaxSave = function() {
                if (dataModal.whatOperation == utilService.operation.add) {
                    scope.frmData.fax.save.request.idFax = null;
                }else{
                    scope.frmData.fax.save.request.idFax = scope.frmData.fax.entity.idFax;
                }
                scope.frmData.fax.save.request.noFaxVirtual = scope.frmData.fax.entity.noFaxVirtual;
                scope.frmData.fax.save.request.noCorreoAsociado = scope.frmData.fax.entity.noCorreoAsociado;
                scope.frmData.fax.save.request.unCallerId = scope.frmData.fax.entity.unCallerId;
                scope.frmData.fax.save.request.noCallerId =  scope.frmData.fax.entity.noCallerId;
                scope.frmData.fax.save.request.passwordFax =  scope.frmData.fax.entity.passwordFax;
                scope.frmData.fax.save.request.idExtension =  scope.frmData.fax.entity.idExtension;                         

                if (scope.frmData.fax.save.request.noFaxVirtual==null  || scope.frmData.fax.entity.noCorreoAsociado ==null ||
                 scope.frmData.fax.entity.passwordFax ==null || scope.frmData.fax.entity.idExtension ==null) {
                    scope.varibleValidar = 1;
                }
            }

            //Metodo de insertar y actualizar
            scope.disableButtonSave= false;
            scope.saveFax = function(dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.varibleValidar = 0;
                    scope.matchingFaxSave();
                    // scope.matchingFaxParaEditar();

                    if (scope.varibleValidar == 0) {
                        faxService.insertarFax(scope.dataInfo).post({}, scope.frmData.fax.save.request, function(result) {                            
                            scope.disableButtonSave= true;
                            if (result.estado == 1) {                                
                                dismissModalCallback(scope.frmData.fax.save.request);
                                toastr.remove();
                                toastr.success('Fax guardado correctamente', 'Acción realizada', viewConfig.toastConfig);

                            } else if (result.estado == 0 || result.estado == -1) {
                                console.log('No se registro Fax');
                            }
                        },
                        function(error) {
                            console.error('Error: ' + error);
                        });
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1  ) {
                        toastr.remove();
                        toastr.error('No acepta valores vacios o erroneos', 'Error', viewConfig.toastConfig);
                    } 

                }
            }
    

            // Listar combo Anexo
            scope.lsAnexo=[];
            scope.listarComboAnexo = function() {
                planMarcacionService.listarAnexo(scope.dataInfo).post({}, {}, function(result) {
                    if (result.estado == 1) {                            
                            scope.lsAnexo = result.listado;                         
                    } else if (result.estado == 0 || result.listado == -1) {
                        console.error('Error: ' + result.mensaje);
                    }                      
                },
                function(error) {
                    console.error('Error: ' + error);
                })
            };    
                                                        
            scope.cancel = function() {

                $uibModalInstance.close();
            }
            scope.onLoadPage = function() {   
                scope.listarComboAnexo();      
                if(dataModal.whatOperation == utilService.operation.update){
                    scope.varValidacion=false;
                    scope.disableButtonSave=false;
                    scope.varNoFaxVirtual=true;
                    scope.varNoCorreoAsociado=true;
                    scope.varPasswordFax=true;
                    scope.varIdExtension=true;                                                                             
                }         
            }
            scope.onLoadPage();
        }
]);