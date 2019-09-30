angular.module('cola')
    .controller('colaCtrl', [
        '$location', '$log', 'colaService','colaAssignService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, colaService, colaAssignService,localStorageService, utilService, $uibModal, viewConfig) {
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
                nameModalInsertCola: "Nuevo Cola",
                nameModalUpdateCola: "Editar Cola",       
                nameModalAssign: "Asignar Agente",  
                cola: {
                    list: {
                        buscarCola: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idQueues: null,
                              tiOpera: 0
                            }
                        },
                        filtroCola: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idQueues: null,
                              tiOpera: 1
                            }
                        }
                    }
                },
                modal: {
                    assign: {
                        whatOperation: 0,
                        title: "",
                        response: {
                            agente: {}
                        }
                    },                    
                    save: {
                        whatOperation: 0,
                        title: "",
                        response: {
                            cola: {}
                        }
                    },
                    delete: {
                        title: "Mensaje del Sistema",
                        content: "",
                        colaRequest: {
                            idQueues: 0,
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1
                        }
                    }
                }
            }

            //Cabecera del Listado de Colas
            scope.table_headers = [
                { description: "Nombre", fieldSort: "name" },
                { description: "Musica en Espera", fieldSort: "musiconHold" },
                { description: "Anuncio", fieldSort: "context" },
                { description: "Peso", fieldSort: "weight" },
                { description: "Tiempo Fuera", fieldSort: "timeOut" },
            ];

            //Buscar cola
            scope.lsCola = [];
            scope.listarCola = function () 
            {                
                colaService.listarCola(scope.dataInfo).post({},{},
                function (result) 
                {
                        scope.lsColas = result.colaLista;
                        scope.totalItems = scope.lsColas.length;
        
                }, function (error) {
                    console.log('error' + error);
                })

            };                                       

            //Paginacion
            //variables para paginar
            scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.paginate = function(value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.lsColas.indexOf(value);
                return (begin <= index && index < end);
            };

            //Ingresar y actualizar
            scope.onFoundCola = function(idQueues, openModalSaveCallback) {
                scope.frmData.cola.list.filtroCola.request.idQueues = idQueues;
                scope.frmData.cola.list.filtroCola.request.nologin = scope.dataInfo.codUsuario;
                scope.frmData.cola.list.filtroCola.request.idInstancia = scope.dataInfo.idInstancia;

                colaService.buscarCola(scope.dataInfo).post({}, scope.frmData.cola.list.filtroCola.request, function(response) {
                        if (response.estado == 1) {
                            if (response.buscado.length > 0) {
                                scope.frmData.modal.save.response.cola = response.buscado[0];             
                            }
                            openModalSaveCallback(scope.frmData.modal.save);
                        } else {
                            console.error("Error: " + response.mensaje);
                        }
                    },
                    function(failure) {
                        console.console.error("Error: " + failure);
                    });
            }
            scope.onSaveCola = function(whatOperation, idQueues) {
                scope.openModalSave(whatOperation, idQueues,
                    function(idQueues) {
                        scope.onFoundCola(idQueues, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/cola/colaCrud/colaSave/colaSave.template.html',
                                controller: 'colaSaveController as ctrl',
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(colaSaved) {
                                scope.listarCola();
                            });
                        });
                    });
            }
            scope.openModalSave = function(whatOperation, idQueues, foundColaCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertCola;
                        scope.frmData.modal.save.response.cola = {};
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateCola;

                    }
                    foundColaCallback(idQueues);
                }
            }

            

            //Eliminar
            //Boton eliminar
            scope.onEliminarCola = function(idQueues, nombreCola) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/cola/colaCrud/colaDelete/colaDelete.template.html',
                    controller: 'colaDeleteController as ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.modal.delete.colaRequest.idQueues = idQueues;
                            scope.frmData.modal.delete.content = "¿Está seguro que desea eliminar la cola " + nombreCola+"?";
                            scope.frmData.modal.delete.colaRequest.noLoginCreador = scope.dataInfo.codUsuario;
                            scope.frmData.modal.delete.colaRequest.idInstancia = scope.dataInfo.idInstancia;
                            return scope.frmData.modal.delete;
                        }
                    }
                });

                modalInstance.result.then(function(ilEliminado) {
                        $log.debug("Eliminado: " + ilEliminado);

                        if (ilEliminado >= 1) {
                            scope.onRemoveACC();
                        }
                    },
                    function() {
                        $log.debug("Modal minimizado");
                        scope.listarCola();
                    });
            }


            //Metodo para remover
            scope.onRemoveACC = function() {
                for (var i = 0; i < scope.lsColas.length; i++) {
                    if (scope.lsColas[i].idQueues == scope.frmData.modal.delete.colaRequest.idQueues) {
                        scope.lsColas.splice(i, 1);
                        break;
                    }
                }
            }

            // Abrir Modal Asignar Agente a Cola
            scope.onAssignAgenteCola = function(whatOperation, idQueues,name) {
                scope.openModalAssign(whatOperation, idQueues,name,
                    function(idQueues) {
                        scope.onFoundCola(idQueues, function(dataModal) {                            
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/cola/colaCrud/colaAssign/colaAssign.template.html',
                                controller: 'colaAssignController as ctrl',
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(colaSaved) {
                                scope.listarCola();
                            });
                        });
                    });
            }
            scope.openModalAssign = function(whatOperation, idQueues, name,foundColaCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {

                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertCola;
                        scope.frmData.modal.save.response.cola = {};
                    } 
                    else if (whatOperation == scope.frmData.update) {

                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateCola;

                    }
                    foundColaCallback(idQueues);
                }
            }            

            //Cargar al Inicio
            scope.Onload = function() {
                scope.listarCola();
            }
            scope.Onload();
        }
    ]);