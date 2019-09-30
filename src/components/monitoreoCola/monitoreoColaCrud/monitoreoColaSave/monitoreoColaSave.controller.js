angular.module('monitoreoCola')
    .controller('monitoreoColaSaveController', [
        '$location', '$log', 'monitoreoColaService','colaService','$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService','$timeout',
        function($location, $log, monitoreoColaService,colaService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService,$timeout) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.thereIsError = false;
            scope.varValidacion = true;
            scope.varCola = false;
            scope.varAnexo = false;
            scope.varCorreo = false;
            scope.varMinTiempo = false;
            scope.varMedTiempo = false;   
            scope.varMaxTiempo = false;    

            scope.frmData = {
                nameModal: dataModal.title,
                btnHabilitar: dataModal.btnHabilitar,
                monitoreoCola: {
                    cola:{
                        idQueues:null,
                        name:null
                    },
                    entity: dataModal.response.monitoreoCola,
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
                monitoreoColaSaved: {}
            }

            //Validacion de Boton Guardar
            scope.validaCombo = function() {
                if(dataModal.whatOperation == utilService.operation.update){
                    if (scope.frmData.monitoreoCola.cola== null) {
                        scope.varCola = false;
                    } else {
                        scope.varCola = true;
                    }                    
                }else{
                    if (scope.frmData.monitoreoCola.cola== undefined||scope.frmData.monitoreoCola.cola.name== undefined) {
                        scope.varCola = false;
                    } else {
                        scope.varCola = true;
                    }                    
                }
                scope.validaCorreo();
            }
            scope.validaCorreo = function() {
                if (scope.frmData.monitoreoCola.entity.noCorreo== undefined) {
                    scope.varCorreo = false;
                } else {
                    scope.varCorreo = true;
                }
                scope.validaAnexo();
            }            
            scope.validaAnexo= function() {
                if (scope.frmData.monitoreoCola.entity.nuAnexo== undefined) {
                    scope.varAnexo = false;
                } else {
                    scope.varAnexo = true;
                }
                scope.validaMinTiempo();
            }                
            scope.validaMinTiempo = function() {
                if (scope.frmData.monitoreoCola.entity.hoMinima== undefined) {
                    scope.varMinTiempo = false;
                } else {
                    scope.varMinTiempo = true;
                }
                scope.validaMedTiempo();
            }       
            scope.validaMedTiempo = function() {
                if (scope.frmData.monitoreoCola.entity.hoMedia== undefined) {
                    scope.varMedTiempo = false;
                } else {
                    scope.varMedTiempo = true;
                }
                scope.validaMaxTiempo();
            }              
            scope.validaMaxTiempo = function() {
                if (scope.frmData.monitoreoCola.entity.hoMaxima== undefined) {
                    scope.varMaxTiempo = false;
                } else {
                    scope.varMaxTiempo = true;
                }
                scope.validaBotonHab();
            }                               

            scope.validaBotonHab= function(){
                if(scope.varCola==true && scope.varCorreo==true && scope.varAnexo==true && scope.varMinTiempo==true && scope.varMedTiempo==true  && scope.varMaxTiempo==true){
                    scope.varValidacion=false;
                }
                else {
                    scope.varValidacion=true;
                }          
            }

            //Insertar
            scope.onSaveMonitoreoCola = function() {
                scope.saveMonitoreoCola(function(colaSaved) {
                    $uibModalInstance.close(colaSaved);
                });
            }

            //Cargar para Cola
            scope.varibleValidar = 0;
            scope.matchingColaSave = function() {
                
                scope.frmData.monitoreoCola.save.request.idQueues = scope.frmData.monitoreoCola.cola.idQueues;
                scope.frmData.monitoreoCola.save.request.noCorreo = scope.frmData.monitoreoCola.entity.noCorreo;
                scope.frmData.monitoreoCola.save.request.nuAnexo = scope.frmData.monitoreoCola.entity.nuAnexo;
                scope.frmData.monitoreoCola.save.request.hoMaximo = scope.frmData.monitoreoCola.entity.hoMaxima;
                scope.frmData.monitoreoCola.save.request.hoMedio =  scope.frmData.monitoreoCola.entity.hoMedia;
                scope.frmData.monitoreoCola.save.request.hoMinimo =  scope.frmData.monitoreoCola.entity.hoMinima;

                if (scope.frmData.monitoreoCola.save.request.noCorreo == null || scope.frmData.monitoreoCola.save.request.idQueues==null ||
                    scope.frmData.monitoreoCola.save.request.nuAnexo == null || scope.frmData.monitoreoCola.save.request.hoMedio == null ||
                    scope.frmData.monitoreoCola.save.request.hoMaximo == null || scope.frmData.monitoreoCola.save.request.hoMinimo == null ) {
                    scope.varibleValidar = 1;
                }
            }
            scope.matchingColaParaEditar = function() {

                scope.frmData.monitoreoColaSaved.idQueues = scope.frmData.monitoreoCola.entity.idQueues;
                scope.frmData.monitoreoColaSaved.noCorreo = scope.frmData.monitoreoCola.entity.noCorreo;
                scope.frmData.monitoreoColaSaved.nuAnexo = scope.frmData.monitoreoCola.entity.nuAnexo;
                scope.frmData.monitoreoColaSaved.hoMaximo = scope.frmData.monitoreoCola.entity.hoMaxima;
                scope.frmData.monitoreoColaSaved.hoMedio = scope.frmData.monitoreoCola.entity.hoMedia;
                scope.frmData.monitoreoColaSaved.hoMinimo = scope.frmData.monitoreoCola.entity.hoMinima;                         

                if (scope.frmData.monitoreoColaSaved.idQueues==null || scope.frmData.monitoreoColaSaved.noCorreo == null ||
                    scope.frmData.monitoreoColaSaved.nuAnexo == null || scope.frmData.monitoreoColaSaved.hoMaximo == null ||
                    scope.frmData.monitoreoColaSaved.hoMinimo == null || scope.frmData.monitoreoColaSaved.hoMedio == null) {
                    scope.varibleValidar = 1;
                }
            }

            //Metodo de insertar y actualizar

            scope.saveMonitoreoCola = function(dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.varibleValidar = 0;
                    if (dataModal.whatOperation == utilService.operation.add){
                        scope.matchingColaSave();
                    }
                    else{
                        scope.matchingColaParaEditar();
                    }

                    if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0) {
                        monitoreoColaService.insertarMonitoreoCola(scope.dataInfo).post({}, scope.frmData.monitoreoCola.save.request, function(result) {
                                if (result.estado == 1) {

                                    dismissModalCallback(scope.frmData.colaSaved);
                                    toastr.remove();
                                    toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);

                                } else if (result.estado == 0 || result.estado == -1) {
                                    console.log('No se registro monitoreo');
                                }
                            },
                            function(error) {
                                console.error('Error: ' + error);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1  ) {
                        toastr.remove();
                        toastr.error('No acepta valores vacios o erroneos', 'Error', viewConfig.toastConfig);
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0 ) {
                        monitoreoColaService.actualizarMonitoreoCola(scope.dataInfo).post({}, scope.frmData.monitoreoColaSaved,
                            function(response) {
                                if (response.estado == 1) {
                                    dismissModalCallback(scope.frmData.colaSaved);
                                    toastr.remove();
                                    toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);

                                } else if (response.estado == -1) {
                                    toastr.remove();
                                    toastr.error('No se pudo Actualizar la información de Monitoreo', 'Error', viewConfig.toastConfig);
                                }
                            },
                            function(failure) {
                                console.error("Error: " + failure);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 1 ) {
                        toastr.remove();
                        toastr.error('No acepta valores vacios o erroneos', 'Error', viewConfig.toastConfig);
                    } 
                }
            }

            //Buscar monitoreo de Cola
            scope.lsMonitoreo = [];
            scope.listarMonitoreo = function () 
            {                
                monitoreoColaService.listarMonitoreoCola(scope.dataInfo).post({},{},
                function (result) 
                {
                        scope.lsMonitoreo = result.listado;
                        scope.onRemoveQueues();
        
                }, function (error) {
                    console.log('error' + error);
                })

            };             

            // Listar combo Colas
            scope.nombreCola=[];
            scope.varCola=[];
            scope.listarComboCola = function() {
                colaService.listarCola(scope.dataInfo).post({}, {}, function(result) {
                        if (result.estado == 1) {                            
                            if(dataModal.whatOperation == utilService.operation.add){
                                scope.varCola = result.colaLista;
                                scope.listarMonitoreo();
                            }else{
                                scope.nombreCola = result.colaLista;
                            }                             
                        } else if (result.estado == 0 || result.estado == -1) {
                            console.error('Error: ' + result.mensaje);
                        }                      
                    },
                    function(error) {
                        console.error('Error: ' + error);
                    })
            };

            //Metodo para remover idQueues no Disponibles para guardar
            scope.onRemoveQueues = function() {
                for (var i = 0; i < scope.varCola.length; i++) {
                    for (var j = 0; j < scope.lsMonitoreo.length; j++) {
                        if (scope.varCola[i].idQueues == scope.lsMonitoreo[j].idQueues) {
                            scope.varCola.splice(i, 1);
                            scope.onRemoveQueues();
                        }
                    }
                }
                scope.nombreCola = scope.varCola;
            }                   

            //Validando Email
            scope.flagDevEmail=0;
            scope.menEmailVal="";
             scope.verificarEmail = function () {
                    if (scope.frmData.usuario.entity.email != null && scope.frmData.usuario.entity.email != "") {
                        var re = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        if (re.test(scope.frmData.usuario.entity.email)) {
                            //formato correcto
                            scope.flagDevEmail=0;
                            scope.menEmailVal="";
                        } else {
                            scope.flagDevEmail=1;
                            scope.menEmailVal="*formato incorecto en Email";
                           
                        }
                    }else{
                         scope.flagDevEmail=0;
                         scope.menEmailVal="";
                    }
                }

            scope.verificarTiempo= function() {
                if(dataModal.response.monitoreoCola.hoMedio==null){
                    scope.frmData.monitoreoCola.entity.hoMedia="0:00";
                }else{
                    scope.frmData.monitoreoCola.entity.hoMedia=dataModal.response.monitoreoCola.hoMedio;
                }
                if(dataModal.response.monitoreoCola.hoMinimo==null){
                    scope.frmData.monitoreoCola.entity.hoMinima="0:00";
                }else{
                    scope.frmData.monitoreoCola.entity.hoMinima=dataModal.response.monitoreoCola.hoMinimo;
                }                
                if(dataModal.response.monitoreoCola.hoMaximo==null){
                    scope.frmData.monitoreoCola.entity.hoMaxima="0:00";
                }else{
                    scope.frmData.monitoreoCola.entity.hoMaxima=dataModal.response.monitoreoCola.hoMaximo;
                }    
            }

            scope.cancel = function() {

                $uibModalInstance.close();
            }
            scope.onLoadPage = function() {
                scope.verificarTiempo();
                scope.listarComboCola();                
                if(dataModal.whatOperation == utilService.operation.update){
                    scope.varValidacion=false;
                    scope.varCola = true;
                    scope.varAnexo = true;
                    scope.varCorreo = true;
                    scope.varMinTiempo = true;
                    scope.varMedTiempo = true;   
                    scope.varMaxTiempo = true;      

                    scope.frmData.monitoreoCola.entity.hoMinima=scope.frmData.monitoreoCola.entity.hoMinima.slice(0, -3); 
                    scope.frmData.monitoreoCola.entity.hoMedia=scope.frmData.monitoreoCola.entity.hoMedia.slice(0, -3); 
                    scope.frmData.monitoreoCola.entity.hoMaxima=scope.frmData.monitoreoCola.entity.hoMaxima.slice(0, -3); 
                }         
                scope.frmData.monitoreoCola.cola.idQueues=dataModal.response.monitoreoCola.idQueues;
                scope.frmData.monitoreoCola.cola.name=dataModal.response.monitoreoCola.name;                        

            }
            scope.onLoadPage();
        }
]);