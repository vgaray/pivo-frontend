angular.module('grupoDirectorio')
    .controller('grupoDirectorioSaveController', [
        '$location', '$log', 'grupoDirectorioService','$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService','$timeout',
        function($location, $log, grupoDirectorioService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService,$timeout) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.thereIsError = false;
            scope.varValidacion = true;

            scope.varNoNombre= false;

            scope.frmData = {
                nameModal: dataModal.title,
                btnHabilitar: dataModal.btnHabilitar,
                grupo: {
                    entity: dataModal.response.grupo,
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
                grupoSaved: {}
            }                             

            //Validacion de Boton Guardar
            scope.validaCampos = function() {
                if (scope.frmData.grupo.entity.noNombre== null) {
                    scope.varNoNombre = false;
                } else {
                    scope.varNoNombre = true;
                }                    
                scope.validaBotonHab();
            }

            scope.validaBotonHab= function(){
                if(scope.varNoNombre==true){
                    scope.varValidacion=false;
                }else{
                    scope.varValidacion=true;
                }    
            }

            //Insertar
            scope.onSaveGrupo = function() {
                scope.saveGrupo(function(grupoSaved) {
                    $uibModalInstance.close(grupoSaved);
                });
            }

            scope.varibleValidar = 0;
            scope.matchingGrupoSave = function() {
                
                scope.frmData.grupo.save.request.noNombre = scope.frmData.grupo.entity.noNombre;            

                if (scope.frmData.grupo.save.request.noNombre == null) {
                    scope.varibleValidar = 1;
                }
            }
            scope.matchingGrupoParaEditar = function() {
                scope.frmData.grupoSaved.idGrupo = scope.frmData.grupo.entity.idGrupo;
                scope.frmData.grupoSaved.noNombre = scope.frmData.grupo.entity.noNombre;                                        

                if (scope.frmData.grupoSaved.noNombre == null) {
                    scope.varibleValidar = 1;
                }
            }

            //Metodo de insertar y actualizar
            scope.disableButtonSave= false;
            scope.saveGrupo = function(dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.varibleValidar = 0;
                    scope.matchingGrupoSave();
                    scope.matchingGrupoParaEditar();

                    if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0) {
                        scope.disableButtonSave= true;
                        grupoDirectorioService.insertarGrupo(scope.dataInfo).post({}, scope.frmData.grupo.save.request, function(result) {
                                if (result.estado == 1) {

                                    dismissModalCallback(scope.frmData.grupoSaved);
                                    toastr.remove();
                                    toastr.success('Directorio creado correctamente', 'Acción realizada', viewConfig.toastConfig);

                                } else if (result.estado == 0 || result.estado == -1) {
                                    console.log('No se registro Grupo de Directorio');
                                }
                            },
                            function(error) {
                                console.error('Error: ' + error);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1  ) {
                        toastr.remove();
                        toastr.error('Los campos obligatorios no deben estar vacios', 'Error', viewConfig.toastConfig);
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0 ) {
                        scope.disableButtonSave= true;
                        grupoDirectorioService.actualizarGrupo(scope.dataInfo).post({}, scope.frmData.grupoSaved,
                            function(response) {
                                if (response.estado == 1) {
                                    dismissModalCallback(scope.frmData.grupoSaved);
                                    toastr.remove();
                                    toastr.success('Directorio actualizado correctamente', 'Acción realizada', viewConfig.toastConfig);

                                } else if (response.estado == -1) {
                                    toastr.remove();
                                    toastr.error('No se pudo Actualizar Grupo de Directorio', 'Error', viewConfig.toastConfig);
                                }
                            },
                            function(failure) {
                                console.error("Error: " + failure);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 1 ) {
                        toastr.remove();
                        toastr.error('Los campos obligatorios no deben estar vacios', 'Error', viewConfig.toastConfig);
                    } 
                }
            }

            scope.validacionDirectorio=false;           
            scope.onValidationNameDirectory = function () {          
                grupoDirectorioService.validarDirectorio(scope.dataInfo).post({}, scope.frmData.grupo.entity, 
                function (result) 
                {
                    if (result.estado == 1) 
                    {
                        if (result.existe==1) 
                        {
                            scope.validacionDirectorio= false;
                        }
                        else if (result.existe==0) 
                        {
                            scope.validacionDirectorio= true;
                        }
                    }
                    else 
                    {
                        return false;
                    }
                },
                function (error) 
                {
                    log.error(error);
                    return false;
                })
            }                

   
            scope.cambiarEspacios=function(){
                if(scope.frmData.grupo.entity.noNombre!= null){
                    scope.frmData.grupo.entity.noNombre = scope.frmData.grupo.entity.noNombre.split(" ").join("-");
                    scope.frmData.grupo.entity.noNombre = scope.frmData.grupo.entity.noNombre.trim();                
                }
            };                                          

            scope.cancel = function() {
                $uibModalInstance.close();
            }

            
            scope.onLoadPage = function() {   
                if(dataModal.whatOperation == utilService.operation.update){                
                    scope.varValidacion=false;                                                                                                   
                }         
            }
            scope.onLoadPage();
        }
]);