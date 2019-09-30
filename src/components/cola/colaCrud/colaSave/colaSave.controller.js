angular.module('cola')
    .controller('colaSaveController', [
        '$location', '$log', 'colaService','$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService',
        function($location, $log, colaService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            
            scope.thereIsError = false;
            scope.varValidacion = true;
            scope.varHaNombre = false;
            scope.varHaEstrategia = false;
            scope.varHaPeso = false;
            scope.varHaTiempo = false;
            scope.varHaRepetir = false;   
            scope.varHaMaxUser = false;    
            
            scope.listMonitorJoin = [
                {id: "Yes", nomMonitor:"Yes"},
                {id: "No", nomMonitor:"No"},
                {id: "More", nomMonitor:"More"},
                {id: "Limit", nomMonitor:"Limit"}
            ]

            //Opciones de Strategy
            scope.strategy = [
                { id: 'Fewest Calls', nombre: 'Fewest Calls' },
                { id: 'Leastrecen', nombre: 'Leastrecen' },
                { id: 'Random', nombre: 'Random' },
                { id: 'Ringall', nombre: 'Ringall' },
                { id: 'RoundRobin', nombre: 'RoundRobin' },
                { id: 'rrmemory', nombre: 'rrmemory' }
            ];            

            //Opciones de Monitor Format
            scope.monitorFormat = [
                { id: 'wav', nombre: 'wav' },
                { id: 'gsm', nombre: 'gsm' },
                { id: 'wav49', nombre: 'wav49' }
            ];              

            //Opciones de Music on Hold
            scope.musiconHold = [
                { id: ' ', nombre: ' ' }
            ];                

            scope.frmData = {
                nameModal: dataModal.title,
                btnHabilitar: dataModal.btnHabilitar,
                cola: {
                    entity: dataModal.response.cola,
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
                colaSaved: {}
            }

            //Validacion de Boton Guardar
            scope.validaNombre = function() {
                if (scope.frmData.cola.entity.name== null) {
                    scope.varHaNombre = false;
                } else {
                    scope.varHaNombre = true;
                }
                scope.validaBotonHab();
            }
            scope.validaEstrategia = function() {
                if (scope.frmData.cola.entity.strategy== null) {
                    scope.varHaEstrategia = false;
                } else {
                    scope.varHaEstrategia = true;
                }
                scope.validaBotonHab();
            }            
            scope.validaPeso = function() {
                if (scope.frmData.cola.entity.weight== null) {
                    scope.varHaPeso = false;
                } else {
                    scope.varHaPeso = true;
                }
                scope.validaBotonHab();
            }       
            scope.validaTiempoFuera = function() {
                if (scope.frmData.cola.entity.timeOut== null) {
                    scope.varHaTiempo = false;
                } else {
                    scope.varHaTiempo = true;
                }
                scope.validaBotonHab();
            }              
            scope.validaRepetir = function() {
                if (scope.frmData.cola.entity.retry== null) {
                    scope.varHaRepetir = false;
                } else {
                    scope.varHaRepetir = true;
                }
                scope.validaBotonHab();
            }      
            scope.validaMaxUser = function() {
                if (scope.frmData.cola.entity.maxlen== null) {
                    scope.varHaMaxUser = false;
                } else {
                    scope.varHaMaxUser = true;
                }
                scope.validaBotonHab();
            }                                

            scope.validaBotonHab= function(){
                if(scope.varHaNombre==true && scope.varHaEstrategia==true && scope.varHaPeso==true && scope.varHaTiempo==true && scope.varHaRepetir==true  && scope.varHaMaxUser==true){
                    scope.varValidacion=false;
                }
                else {
                    scope.varValidacion=true;
                }          
            }

            //Insertar
            scope.onSaveCola = function() {
                scope.saveCola(function(colaSaved) {
                    $uibModalInstance.close(colaSaved);
                });
            }

            //Cargar para Cola
            scope.varibleValidar = 0;
            scope.matchingColaSave = function() {

                scope.frmData.cola.save.request.name = scope.frmData.cola.entity.name;
                scope.frmData.cola.save.request.weight = scope.frmData.cola.entity.weight;
                scope.frmData.cola.save.request.timeOut = scope.frmData.cola.entity.timeOut;
                scope.frmData.cola.save.request.context = scope.frmData.cola.entity.context;
                scope.frmData.cola.save.request.retry = scope.frmData.cola.entity.retry;
                scope.frmData.cola.save.request.serviceLevel = scope.frmData.cola.entity.serviceLevel;
                scope.frmData.cola.save.request.wrapuptime = scope.frmData.cola.entity.wrapuptime;
                scope.frmData.cola.save.request.maxlen = scope.frmData.cola.entity.maxlen;
                scope.frmData.cola.save.request.memberdelay = scope.frmData.cola.entity.memberdelay;
                scope.frmData.cola.save.request.announceFrequency = scope.frmData.cola.entity.announceFrequency;
                scope.frmData.cola.save.request.timeoutRestart = scope.frmData.cola.entity.timeoutRestart;
                scope.frmData.cola.save.request.announcePeriodic = scope.frmData.cola.entity.announcePeriodic;
                scope.frmData.cola.save.request.announceHoldtime = scope.frmData.cola.entity.announceHoldtime;
                scope.frmData.cola.save.request.joinEmpty = scope.frmData.cola.entity.joinEmpty;
                scope.frmData.cola.save.request.announceRoundSeconds = scope.frmData.cola.entity.announceRoundSeconds;
                scope.frmData.cola.save.request.queueYouAreNext = scope.frmData.cola.entity.queueYouAreNext;
                scope.frmData.cola.save.request.queueThereAre = scope.frmData.cola.entity.queueThereAre;
                scope.frmData.cola.save.request.queueCallsWaiting = scope.frmData.cola.entity.queueCallsWaiting;
                scope.frmData.cola.save.request.queueHoldTime = scope.frmData.cola.entity.queueHoldTime;
                scope.frmData.cola.save.request.queueMinutes = scope.frmData.cola.entity.queueMinutes;
                scope.frmData.cola.save.request.queueSeconds = scope.frmData.cola.entity.queueSeconds;
                scope.frmData.cola.save.request.queueThankYou = scope.frmData.cola.entity.queueThankYou;
                scope.frmData.cola.save.request.queueLessThan = scope.frmData.cola.entity.queueLessThan;
                scope.frmData.cola.save.request.announcePeriodicTime = scope.frmData.cola.entity.announcePeriodicTime;
                scope.frmData.cola.save.request.monitorJoinSelect = scope.frmData.cola.entity.monitorJoinSelect;
                scope.frmData.cola.save.request.eventmemberstatusTime = scope.frmData.cola.entity.eventmemberstatusTime;
                scope.frmData.cola.save.request.timeoutRestartTime = scope.frmData.cola.entity.timeoutRestartTime;

                scope.frmData.cola.save.request.monitorJoin= scope.frmData.cola.entity.monitorJoin;

                if(scope.frmData.cola.entity.ringinuse ==null){
                    scope.frmData.cola.save.request.ringinuse= "";
                }else
                {
                    scope.frmData.cola.save.request.ringinuse= scope.frmData.cola.entity.ringinuse;
                }                

                scope.frmData.cola.save.request.leavewhenempty= scope.frmData.cola.entity.leavewhenempty;
                scope.frmData.cola.save.request.eventmemberstatus= scope.frmData.cola.entity.eventmemberstatus;
                scope.frmData.cola.save.request.eventwhencalled= scope.frmData.cola.entity.eventwhencalled;
                scope.frmData.cola.save.request.reportholdtime= scope.frmData.cola.entity.reportholdtime;                 

                scope.frmData.cola.save.request.strategy = scope.frmData.cola.entity.strategy;      
                scope.frmData.cola.save.request.monitorFormat = scope.frmData.cola.entity.monitorFormat; 
                scope.frmData.cola.save.request.musiconHold = scope.frmData.cola.entity.musiconHold;   

                if (scope.frmData.cola.save.request.name == null || scope.frmData.cola.save.request.strategy == null ||
                    scope.frmData.cola.save.request.weight == null || scope.frmData.cola.save.request.retry == null ||
                    scope.frmData.cola.save.request.maxlen == null || scope.frmData.cola.save.request.timeOut == null ) {
                    scope.varibleValidar = 1;
                }
            }
            scope.matchingColaParaEditar = function() {
                scope.frmData.colaSaved.idQueues = scope.frmData.cola.entity.idQueues;
                scope.frmData.colaSaved.name = scope.frmData.cola.entity.name;
                scope.frmData.colaSaved.weight = scope.frmData.cola.entity.weight;
                scope.frmData.colaSaved.timeOut = scope.frmData.cola.entity.timeOut;
                scope.frmData.colaSaved.context = scope.frmData.cola.entity.context;
                scope.frmData.colaSaved.retry = scope.frmData.cola.entity.retry;
                scope.frmData.colaSaved.serviceLevel = scope.frmData.cola.entity.serviceLevel;
                scope.frmData.colaSaved.wrapuptime = scope.frmData.cola.entity.wrapuptime;
                scope.frmData.colaSaved.maxlen = scope.frmData.cola.entity.maxlen;
                scope.frmData.colaSaved.memberdelay = scope.frmData.cola.entity.memberdelay;
                scope.frmData.colaSaved.announceFrequency = scope.frmData.cola.entity.announceFrequency;
                scope.frmData.colaSaved.timeoutRestart = scope.frmData.cola.entity.timeoutRestart;
                scope.frmData.colaSaved.announcePeriodic = scope.frmData.cola.entity.announcePeriodic;
                scope.frmData.colaSaved.announceHoldtime = scope.frmData.cola.entity.announceHoldtime;
                scope.frmData.colaSaved.joinEmpty = scope.frmData.cola.entity.joinEmpty;   
                scope.frmData.colaSaved.announceRoundSeconds = scope.frmData.cola.entity.announceRoundSeconds;
                scope.frmData.colaSaved.queueYouAreNext = scope.frmData.cola.entity.queueYouAreNext;
                scope.frmData.colaSaved.queueThereAre = scope.frmData.cola.entity.queueThereAre;
                scope.frmData.colaSaved.queueCallsWaiting = scope.frmData.cola.entity.queueCallsWaiting;
                scope.frmData.colaSaved.queueHoldTime = scope.frmData.cola.entity.queueHoldTime;
                scope.frmData.colaSaved.queueMinutes = scope.frmData.cola.entity.queueMinutes;
                scope.frmData.colaSaved.queueSeconds = scope.frmData.cola.entity.queueSeconds;
                scope.frmData.colaSaved.queueThankYou = scope.frmData.cola.entity.queueThankYou;
                scope.frmData.colaSaved.queueLessThan = scope.frmData.cola.entity.queueLessThan;

                scope.frmData.colaSaved.monitorJoin = scope.frmData.cola.entity.monitorJoin;
                   
                if(scope.frmData.cola.entity.ringinuse ==null){
                    scope.frmData.colaSaved.ringinuse= "";
                }else
                {
                    scope.frmData.colaSaved.ringinuse = scope.frmData.cola.entity.ringinuse;
                }                    

                scope.frmData.colaSaved.leavewhenempty = scope.frmData.cola.entity.leavewhenempty;    
                scope.frmData.colaSaved.eventmemberstatus = scope.frmData.cola.entity.eventmemberstatus;    
                scope.frmData.colaSaved.eventwhencalled = scope.frmData.cola.entity.eventwhencalled;    
                scope.frmData.colaSaved.reportholdtime = scope.frmData.cola.entity.reportholdtime;    

                scope.frmData.colaSaved.strategy = scope.frmData.cola.entity.strategy;    
                scope.frmData.colaSaved.monitorFormat = scope.frmData.cola.entity.monitorFormat;         
                scope.frmData.colaSaved.musiconHold = scope.frmData.cola.entity.musiconHold;                            

                if (scope.frmData.colaSaved.name == null || scope.frmData.colaSaved.strategy == null ||
                    scope.frmData.colaSaved.weight == null || scope.frmData.colaSaved.retry == null ||
                    scope.frmData.colaSaved.maxlen == null || scope.frmData.colaSaved.timeOut == null) {
                    scope.varibleValidar = 1;
                }
            }

            //Metodo de insertar y actualizar
            scope.disableButtonSave= false;
            scope.saveCola = function(dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.varibleValidar = 0;
                    scope.matchingColaSave();
                    scope.matchingColaParaEditar();
                    
                    if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0) {
                        scope.disableButtonSave= true; 
                        colaService.insertarCola(scope.dataInfo).post({}, scope.frmData.cola.save.request, function(result) {
                                if (result.estado == 1) {

                                    dismissModalCallback(scope.frmData.colaSaved);
                                    toastr.remove();
                                    toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);

                                } else if (result.estado == 0 || result.estado == -1) {
                                    console.log('No se registro la cola');
                                }
                            },
                            function(error) {
                                console.error('Error: ' + error);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1  ) {
                        toastr.remove();
                        toastr.error('Los campos Nombre de Cola, Estrategia, Peso, Repetir, Tiempo Fuera y Max Numero de Usuario no acepta valores vacios o erroneos', 'Error', viewConfig.toastConfig);
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0 ) {
                        scope.disableButtonSave= true; 
                        colaService.actualizarCola(scope.dataInfo).post({}, scope.frmData.colaSaved,
                            function(response) {
                                if (response.estado == 1) {
                                    dismissModalCallback(scope.frmData.colaSaved);
                                    toastr.remove();
                                    toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);

                                } else if (response.estado == -1) {
                                    toastr.remove();
                                    toastr.error('No se pudo Actualizar la informacion de la Cola', 'Error', viewConfig.toastConfig);
                                }
                            },
                            function(failure) {
                                console.error("Error: " + failure);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 1 ) {
                        toastr.remove();
                        toastr.error('Los campos Nombre de Cola, Estrategia, Peso, Repetir, Tiempo Fuera y Max Numero de Usuario no acepta valores vacios o erroneos', 'Error', viewConfig.toastConfig);
                    } 
                }
            }

            scope.showPeriodic = true;
            scope.showMonitorSelect = true;
            scope.showMemberstatusText = true;
            scope.showRestartText = true;
            scope.showInputPeriodic = function() {
                if(scope.frmData.cola.entity.announcePeriodic == "yes") {
                    scope.showPeriodic = false;
                } else {
                    scope.showPeriodic = true;
                }
            }

            scope.showSelect = function(){
                if(scope.frmData.cola.entity.monitorJoin == "yes") {
                    scope.showMonitorSelect = false;
                } else {
                    scope.showMonitorSelect = true;
                }
            }

            scope.showEvent = function (){
                if(scope.frmData.cola.entity.eventmemberstatus == "yes") {
                    scope.showMemberstatusText = false;
                } else {
                    scope.showMemberstatusText = true;
                }
            }

            scope.showRestart = function (){
                if(scope.frmData.cola.entity.eventwhencalled == "yes") {
                    scope.showRestartText = false;
                } else {
                    scope.showRestartText = true;
                }
            }

            scope.cancel = function() {

                $uibModalInstance.close();
            }
            scope.onLoadPage = function() {
                console.log(dataModal);
                if(dataModal.whatOperation == utilService.operation.update){
                    scope.varValidacion=false;
                    scope.varHaNombre = true;
                    scope.varHaEstrategia = true;
                    scope.varHaPeso = true;
                    scope.varHaTiempo = true;
                    scope.varHaRepetir = true;   
                    scope.varHaMaxUser = true;     
                    scope.disableButtonSave= false;                
                }                      
            }
            scope.onLoadPage();
        }
]);