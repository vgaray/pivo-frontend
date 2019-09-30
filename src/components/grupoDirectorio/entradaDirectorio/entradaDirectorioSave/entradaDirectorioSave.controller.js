angular.module('grupoDirectorio')
    .controller('entradaDirectorioSaveController', [
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
            scope.varNuAnexo= false;
            // scope.varNuTelefonico= false;
            // scope.varNoPrefijo= false;

            scope.frmData = {
                idGrupo: dataModal.idGrupo,
                nameModal: dataModal.title,
                btnHabilitar: dataModal.btnHabilitar,
                entradaDirectorio: {
                    entity: dataModal.response.entradaDirectorio,
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
                entradaSaved: {}
            }                             

            //Validacion de Boton Guardar
            scope.validaCampos = function() {
                if (scope.frmData.entradaDirectorio.entity.noNombre== null) {
                    scope.varNoNombre = false;
                } else {
                    scope.varNoNombre = true;
                }                    
                scope.validaAnexo();
            }
            scope.validaAnexo = function() {
                if (scope.frmData.entradaDirectorio.entity.nuAnexo== null) {
                    scope.varNuAnexo = false;
                } else {
                    scope.varNuAnexo = true;
                }                    
                scope.validaBotonHab();
            }
               
            scope.validacionAnexoEntrada=false;   
            scope.validaBotonHab= function(){
                if(scope.varNoNombre==true && scope.varNuAnexo==true){
                    scope.varValidacion=false;
                }else{
                    scope.varValidacion=true;
                }

                if(scope.frmData.entradaDirectorio.entity.nuAnexo!=null){
                    if((scope.frmData.entradaDirectorio.entity.nuAnexo.toString().length>6 || scope.frmData.entradaDirectorio.entity.nuAnexo.toString().length<3) || 
                    scope.frmData.entradaDirectorio.entity.nuAnexo.toString().substr(0)=="0"){
                        scope.validacionAnexoEntrada=true;
                    }else{
                        scope.validacionAnexoEntrada=false;
                    }  
                }else{
                    scope.validacionAnexoEntrada=false;
                } 
            }

            //Insertar
            scope.onSaveEntrada = function() {
                scope.saveEntrada(function(entradaSaved) {
                    $uibModalInstance.close(entradaSaved);
                });
            }

            scope.varibleValidar = 0;
            scope.matchingEntradaSave = function() {
                
                scope.frmData.entradaDirectorio.save.request.noNombre = scope.frmData.entradaDirectorio.entity.noNombre; 
                scope.frmData.entradaDirectorio.save.request.nuTelefonico = scope.frmData.entradaDirectorio.entity.nuTelefonico; 
                scope.frmData.entradaDirectorio.save.request.nuAnexo = scope.frmData.entradaDirectorio.entity.nuAnexo; 
                scope.frmData.entradaDirectorio.save.request.noPrefijo = scope.frmData.entradaDirectorio.entity.noPrefijo;            
                scope.frmData.entradaDirectorio.save.request.noDescripcion = scope.frmData.entradaDirectorio.entity.noDescripcion;            
                if (dataModal.whatOperation == utilService.operation.add){
                    scope.frmData.entradaDirectorio.save.request.idGrupo = scope.frmData.idGrupo;                         
                }else if (dataModal.whatOperation == utilService.operation.update){
                    scope.frmData.entradaDirectorio.save.request.idGrupo = 0;   
                }                       

                if (scope.frmData.entradaDirectorio.save.request.noNombre == null || 
                scope.frmData.entradaDirectorio.save.request.nuAnexo == null || 
                scope.frmData.entradaDirectorio.save.request.idGrupo ==null) {
                    scope.varibleValidar = 1;
                }
            }
            scope.matchingEntradaParaEditar = function() {
                scope.frmData.entradaSaved.idEntrada = scope.frmData.entradaDirectorio.entity.idEntrada;
                scope.frmData.entradaSaved.noNombre = scope.frmData.entradaDirectorio.entity.noNombre; 
                scope.frmData.entradaSaved.nuTelefonico = scope.frmData.entradaDirectorio.entity.nuTelefonico; 
                scope.frmData.entradaSaved.nuAnexo = scope.frmData.entradaDirectorio.entity.nuAnexo; 
                scope.frmData.entradaSaved.noPrefijo = scope.frmData.entradaDirectorio.entity.noPrefijo; 
                scope.frmData.entradaSaved.noDescripcion = scope.frmData.entradaDirectorio.entity.noDescripcion; 
                if (dataModal.whatOperation == utilService.operation.add){
                    scope.frmData.entradaSaved.idGrupo = scope.frmData.idGrupo;                                
                }else  if (dataModal.whatOperation == utilService.operation.update){
                    scope.frmData.entradaSaved.idGrupo = scope.frmData.entradaDirectorio.entity.idGrupo;                                     
                }                

                if (scope.frmData.entradaSaved.noNombre == null || scope.frmData.entradaSaved.nuAnexo == null  ||
                scope.frmData.entradaSaved.idGrupo == null)  {
                    scope.varibleValidar = 1;
                }
            }

            //Metodo de insertar y actualizar
            scope.disableButtonEntradaSave= false;
            scope.saveEntrada = function(dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.varibleValidar = 0;
                    scope.matchingEntradaSave();
                    scope.matchingEntradaParaEditar();

                    if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0) {
                        scope.disableButtonEntradaSave= true;
                        grupoDirectorioService.insertarEntrada(scope.dataInfo).post({}, scope.frmData.entradaDirectorio.save.request, function(result) {
                                if (result.estado == 1) {

                                    dismissModalCallback(scope.frmData.entradaSaved);
                                    toastr.remove();
                                    toastr.success('Entrada creada correctamente', 'Acción realizada', viewConfig.toastConfig);

                                } else if (result.estado == 0 || result.estado == -1) {
                                    console.log('No se registro Entrada de Directorio');
                                }
                            },
                            function(error) {
                                console.error('Error: ' + error);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1  ) {
                        toastr.remove();
                        toastr.error('Los campos obligatorios no deben estar vacios', 'Error', viewConfig.toastConfig);
                    }  else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0 ) {
                        scope.disableButtonEntradaSave= true;
                        grupoDirectorioService.actualizarEntrada(scope.dataInfo).post({}, scope.frmData.entradaSaved,
                            function(response) {
                                if (response.estado == 1) {
                                    dismissModalCallback(scope.frmData.entradaSaved);
                                    toastr.remove();
                                    toastr.success('Entrada actualizada correctamente', 'Acción realizada', viewConfig.toastConfig);

                                } else if (response.estado == -1) {
                                    toastr.remove();
                                    toastr.error('No se pudo Actualizar Entrada de Directorio', 'Error', viewConfig.toastConfig);
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

            scope.valNuAnexo={noNombre:null,idGrupo:null}
            scope.validacionEntrada=false;           
            scope.onValidationNameEntrada = function () { 
                scope.valNuAnexo.noNombre=scope.frmData.entradaDirectorio.entity.nuAnexo;
                scope.valNuAnexo.idGrupo=scope.frmData.idGrupo;           
                grupoDirectorioService.validarEntradaDirectorio(scope.dataInfo).post({}, scope.valNuAnexo, 
                function (result) 
                {
                    if (result.estado == 1) 
                    {
                        if (result.existe==1) 
                        {
                            scope.validacionEntrada= false;
                        }
                        else if (result.existe==0) 
                        {
                            scope.validacionEntrada= true;
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
                if(scope.frmData.entradaDirectorio.entity.noNombre!= null){
                    scope.frmData.entradaDirectorio.entity.noNombre = scope.frmData.entradaDirectorio.entity.noNombre.split(" ").join("-");
                    scope.frmData.entradaDirectorio.entity.noNombre = scope.frmData.entradaDirectorio.entity.noNombre.trim();                
                }
            };                                          

            scope.cancel = function() {
                $uibModalInstance.close();
            }

            scope.anexoHabilitado=false;  
            scope.onLoadPage = function() {   
                if(dataModal.whatOperation == utilService.operation.update){                
                    scope.varValidacion=false;    
                    scope.varNoNombre= true;
                    scope.varNuAnexo= true;
                    scope.anexoHabilitado=true;          
                    // scope.varNuTelefonico= true;
                    // scope.varNoPrefijo= true;                                                                                                              
                }         
            }
            scope.onLoadPage();
        }
]);