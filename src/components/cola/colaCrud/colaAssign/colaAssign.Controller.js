angular.module('cola')
    .controller('colaAssignController', [
        '$location', '$log', 'colaService','colaAssignService', '$uibModalInstance', 'localStorageService', 'dataModal', '$uibModal','viewConfig', 'utilService',
        function($location, $log, colaService,colaAssignService, $uibModalInstance, localStorageService, dataModal,$uibModal, viewConfig, utilService) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.nombreAgente = [];            
            scope.thereIsError = false;    
            scope.varValidacion = true;
            scope.varHaCombo = false;
            scope.varHaPrioridad = false;               

            scope.frmData = {
                idQueue:{
                    idQueue:dataModal.response.cola.idQueues
                },                 
                cola: {
                    entity: dataModal.response.cola,
                    mensajeValida: "",
                    save: {
                        request: {},
                        response:{
                            existe:0
                        }
                    },
                    validar: {
                        request: {
                            nuAgente: ""
                        }
                    },
                    delete: {
                        title: "Mensaje del Sistema",
                        content: "¿Está seguro que desea eliminar esta asignación?",
                        agenteColaRequest: {
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1,
                            idCola: 0,
                            idAgente: 0
                        }
                    }                    
                },
                agenteColaSaved: {}
            }

            //Validacion de Boton Guardar
            scope.validaCombo = function() {
                if (scope.frmData.cola.entity.nombreAgente==undefined) {
                    scope.varHaCombo = false;                        
                } else {
                    scope.varHaCombo = true;
                }
                scope.validaPrioridad() ;
            }            

            scope.validaPrioridad = function() {
                if (scope.frmData.cola.entity.prioridad== null || (scope.frmData.cola.entity.prioridad <0 && scope.frmData.cola.entity.prioridad >10)) {
                    scope.varHaPrioridad = false;
                } else {
                    scope.varHaPrioridad = true;
                }
                scope.validaBotonHab();
            }            

            scope.validaBotonHab= function(){
                if(scope.varHaPrioridad==true && scope.varHaCombo==true){
                    scope.varValidacion=false;
                }
                else {
                    scope.varValidacion=true;
                }          
            }            

            //Insertar 
            scope.onSaveAgenteCola = function() {
                scope.saveAgenteCola(function(agenteColaSaved) {
                });
            }

            //Modificar
            scope.idAgenteSelect;
            scope.prioridadSelect;
            scope.onEditAgenteCola = function(idAgente,prioridad) {
                scope.idAgenteSelect=idAgente;
                scope.prioridadSelect=prioridad;
                scope.editAgenteCola(function(agenteColaSaved) {
                });
            }            

            //Cabecera del Listado Agentes asignados a la cola seleccionada
            scope.table_headers = [
                { description: "Nombre Agente", fieldSort: "nombre" },
            ];            

            //Cargar para asignar Agente a Cola
            scope.varibleValidar = 0;
            scope.matchingAgenteColaSave = function() {
                scope.varibleValidar=0;
                if (scope.frmData.cola.entity.nombreAgente == undefined || dataModal.response.cola.idQueues == undefined ||
                    scope.frmData.cola.entity.prioridad == undefined) 
                {
                    scope.varibleValidar = 1;
                }else
                {                            
                    scope.frmData.cola.save.request.idAgente = scope.frmData.cola.entity.nombreAgente.idAgente;
                    scope.frmData.cola.save.request.idCola = dataModal.response.cola.idQueues;
                    scope.frmData.cola.save.request.prioridad = scope.frmData.cola.entity.prioridad;
                }
            }
            scope.matchingAgenteColaParaEditar = function() {
                scope.varibleValidar=0;
                if (scope.idAgenteSelect == undefined || dataModal.response.cola.idQueues == undefined ||
                    scope.prioridadSelect == undefined) 
                {                              
                    scope.varibleValidar = 1;           
                }else
                {                    
                    scope.frmData.agenteColaSaved.idAgente = scope.idAgenteSelect;
                    scope.frmData.agenteColaSaved.idCola = dataModal.response.cola.idQueues;
                    scope.frmData.agenteColaSaved.prioridad = scope.prioridadSelect;                       
                }                        
            }

            //Metodos de insertar y actualizar
            scope.saveAgenteCola = function() {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.matchingAgenteColaSave();
                    if (scope.varibleValidar == 0) {
                        colaAssignService.insertarAgenteCola(scope.dataInfo).post({}, scope.frmData.cola.save.request, function(result) {
                                if (result.estado == 1) {
                                    scope.listarAgentesPorCola();   
                                    scope.nombreAgente=[];
                                    scope.listarComboAgente();     
                                    scope.frmData.cola.entity.prioridad=0;             
                                    toastr.remove();               
                                    toastr.success('Asignada correctamente', 'Cola', viewConfig.toastConfig);

                                } else if (result.estado == 0 || result.estado == -1) {
                                    console.log('No se registro la cola');
                                }
                            },
                            function(error) {
                                console.error('Error: ' + error);
                            });
                    } else if (scope.varibleValidar == 1  ) {
                        toastr.remove();
                        toastr.error('Ningun campo del formulario acepta valores vacios o erroneos ', 'Error', viewConfig.toastConfig);
                    }
                }
            }

            scope.editAgenteCola = function() {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.matchingAgenteColaParaEditar();

                    if (scope.varibleValidar == 0) {
                        colaAssignService.actualizarAgenteCola(scope.dataInfo).post({}, scope.frmData.agenteColaSaved,
                            function(response) {
                                if (response.estado == 1) {
                                    scope.nombreAgente=[];                                    
                                    scope.frmData.cola.entity.prioridad=0;                                 
                                    scope.listarComboAgente(); 
                                    toastr.remove();
                                    toastr.success('Guardado exitosamente', 'Cola', viewConfig.toastConfig);                                      

                                } else if (response.estado == -1) {
                                    toastr.remove();
                                    toastr.error('No se pudo Actualizar la informacion de la Cola', 'Error', viewConfig.toastConfig);
                                }
                            },
                            function(failure) {
                                console.error("Error: " + failure);
                            });
                    } else if (scope.varibleValidar == 1 ) {
                        toastr.remove();
                        toastr.error('Ningun campo del formulario acepta valores vacios o erroneos ', 'Error', viewConfig.toastConfig);
                    } 
                }
            }            

            // Listar combo Agentes Disponibles para asignar Colas
            scope.listarComboAgente = function() {
                colaService.listarAgenteDisponible(scope.dataInfo).post({}, scope.frmData.cola.entity, function(result) {
                        if (result.estado == 1) {
                            scope.nombreAgente = scope.nombreAgente.concat(result.listado);
                        } else if (result.estado == 0 || result.estado == -1) {
                            console.error('Error: ' + result.mensaje);
                        }
                    },
                    function(error) {
                        console.error('Error: ' + error);
                    });
            }

            // listar Agentes que esten asignados a la Cola seleccionada
            scope.lsAgentes = [];
            /**
             * Arreglo de objetos clave-valor que indican el flag de edición de los agentes por cola.
             */
            scope.lsFlagEditableAgentePorCola = [];

            scope.listarAgentesPorCola = function () 
            {                
                colaAssignService.listarAgenteCola(scope.dataInfo).post({},scope.frmData.idQueue,
                function (result) 
                {
                        scope.lsAgentes = result.listado;
                        scope.totalItems = scope.lsAgentes.length;
                        
                        scope.lsAgentes.forEach(function(element) 
                        {
                            scope.lsFlagEditableAgentePorCola.push( { idAgente : element.idAgente, idCola : element.idCola, flagEditable : false } );
                        });
                }, function (error) {
                    console.log('error' + error);
                })
            };    

            /**
             * Obtener flag de edición de agente
             * @param {object} - agente
             */
            scope.getFlagEditable = function( agente )
            {
                var indexAgente = scope.lsFlagEditableAgentePorCola.findIndex( objAgente => { return agente.idAgente == objAgente.idAgente && agente.idCola == objAgente.idCola } );
                var objectFlagEditable = scope.lsFlagEditableAgentePorCola[ indexAgente ];

                return objectFlagEditable.flagEditable;
            }

            // scope.prioridadAnterior = [];
            scope.setFlagEditable = function( agente )
            {
                var indexAgente = scope.lsFlagEditableAgentePorCola.findIndex( objAgente => { return agente.idAgente == objAgente.idAgente && agente.idCola == objAgente.idCola } );
                var objectFlagEditable = scope.lsFlagEditableAgentePorCola[ indexAgente ];
                objectFlagEditable.flagEditable = !objectFlagEditable.flagEditable;                
                // if(objectFlagEditable.flagEditable==false)
                // { 
                //     scope.onRerturnPrioridad(agente.idAgente);
                // }else
                // {
                //     scope.prioridadAnterior = agente.prioridad;
                // }
            }

            //Paginacion
            //variables para paginar Listado de Agentes asignados para Cola
            scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.paginate = function(value) 
            {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.lsAgentes.indexOf(value);
                return (begin <= index && index < end);

            };      

            //eliminar asignacion de agente a la cola
            scope.onEliminarAgenteCola = function(idAgente) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/cola/colaCrud/colaAssign/colaAssignDelete/colaAssignDelete.template.html',
                    controller: 'colaAssignDeleteController as ctrl',
                    size: 'sm',
                    resolve: {
                        dataModal: function() {
                            scope.frmData.cola.delete.agenteColaRequest.idCola = scope.frmData.cola.entity.idQueues;
                            scope.frmData.cola.delete.agenteColaRequest.idAgente = idAgente;
                            scope.frmData.cola.delete.agenteColaRequest.noLoginCreador = scope.dataInfo.codUsuario;
                            scope.frmData.cola.delete.agenteColaRequest.idInstancia = scope.dataInfo.idInstancia;
                            return scope.frmData.cola.delete;
                        }
                    }
                });
                modalInstance.result.then(function(ilEliminado) {
                        $log.debug("Eliminado: " + ilEliminado);

                        if (ilEliminado >= 1) {
                            scope.onRemoveACC();
                            scope.nombreAgente=[];
                            scope.listarComboAgente();    
                            scope.frmData.cola.entity.prioridad=0;                            
                        }
                    },
                    function() {
                        $log.debug("Modal minimizado");
                        scope.listarAgentesPorCola();
                    });
            }   

            //Metodo para remover
            scope.onRemoveACC = function() {
                for (var i = 0; i < scope.lsAgentes.length; i++) {
                    if (scope.lsAgentes[i].idCola == scope.frmData.cola.delete.agenteColaRequest.idCola &&
                    scope.lsAgentes[i].idAgente == scope.frmData.cola.delete.agenteColaRequest.idAgente) {
                        scope.lsAgentes.splice(i, 1);
                        break;
                    }
                }
            }

            //Metodo para Retornar Prioridad
            // scope.onRerturnPrioridad = function(idAgente) {
            //     for (var i = 0; i < scope.lsAgentes.length; i++) {
            //         if (scope.lsAgentes[i].idCola == dataModal.response.cola.idQueues &&
            //         scope.lsAgentes[i].idAgente == idAgente) {
            //             scope.lsAgentes[i].prioridad=scope.prioridadAnterior;
            //             break;
            //         }
            //     }
            // }            
            
            scope.cancel = function() {

                $uibModalInstance.close();
            }
            scope.onLoadPage = function() {
                scope.listarComboAgente();
                scope.listarAgentesPorCola();
                scope.frmData.cola.entity.prioridad=0;
                
            }
            scope.onLoadPage();
        }
]);