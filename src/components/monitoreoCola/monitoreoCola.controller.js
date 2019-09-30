angular.module('monitoreoCola')
    .controller('monitoreoColaCtrl', [
        '$location', '$log', 'monitoreoColaService','localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, monitoreoColaService, localStorageService, utilService, $uibModal, viewConfig) {
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
                nameModalInsertMonitoreo: "Agregar Datos de Monitoreo",
                nameModalUpdateMonitoreo: "Actualizar Datos de Monitoreo",   
                monitoreoCola: {
                    list: {
                        buscarMonitoreoCola: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idQueues: null,
                              tiOpera: 0
                            }
                        },
                        filtroMonitoreoCola: {
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
                    save: {
                        whatOperation: 0,
                        title: "",
                        response: {
                            monitoreoCola: {
                                cola:{}
                            }
                        }
                    },
                    delete: {
                        title: "Mensaje del Sistema",
                        content: "¿Está seguro que desea eliminar estos datos de monitoreo?",
                        monitoreoColaRequest: {
                            idMonitoreo: 0,
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1
                        }
                    }
                }
            }

            //Cabecera del Listado de Colas
            scope.table_headers = [
                { description: "Cola", fieldSort: "name" },
                { description: "N° Anexo", fieldSort: "nu_anexo" },
                { description: "Correo", fieldSort: "no_correo" },
                { description: "Tiempo Min.", fieldSort: "ho_minimo" },
                { description: "Tiempo Med.", fieldSort: "ho_medio" },
                { description: "Tiempo Max.", fieldSort: "ho_maximo" },
            ];

            //Buscar monitoreo de Cola
            scope.lsMonitoreo = [];
            scope.listarMonitoreo = function () 
            {                
                monitoreoColaService.listarMonitoreoCola(scope.dataInfo).post({},{},
                function (result) 
                {
                        scope.lsMonitoreo = result.listado;
                        scope.totalItems = scope.lsMonitoreo.length;
        
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
                index = scope.lsMonitoreo.indexOf(value);
                return (begin <= index && index < end);

            };

            //Ingresar y actualizar
            scope.onFoundMonitoreoCola = function(idQueues, openModalSaveCallback) {
                scope.frmData.monitoreoCola.list.filtroMonitoreoCola.request.idQueues = idQueues;
                scope.frmData.monitoreoCola.list.filtroMonitoreoCola.request.nologin = scope.dataInfo.codUsuario;
                scope.frmData.monitoreoCola.list.filtroMonitoreoCola.request.idInstancia = scope.dataInfo.idInstancia;

                monitoreoColaService.listarMonitoreoCola(scope.dataInfo).post({}, scope.frmData.monitoreoCola.list.filtroMonitoreoCola.request, function(response) {
                        if (response.estado == 1) {
                            if (response.listado.length > 1) { 
                                scope.frmData.modal.save.response.monitoreoCola = [];             
                            }else if (response.listado.length == 1) {
                                scope.frmData.modal.save.response.monitoreoCola = response.listado[0]; 
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
            scope.onSaveMonitoreoCola = function(whatOperation, idQueues) {
                scope.openModalSave(whatOperation, idQueues,
                    function(idQueues) {
                        scope.onFoundMonitoreoCola(idQueues, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/monitoreoCola/monitoreoColaCrud/monitoreoColaSave/monitoreoColaSave.template.html',
                                controller: 'monitoreoColaSaveController as ctrl',
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(colaSaved) {
                                scope.listarMonitoreo();
                            });
                        });
                    });
            }
            scope.openModalSave = function(whatOperation, idQueues, foundColaCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.modal.save.btnHabilitar=false;
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertMonitoreo;
                        scope.frmData.modal.save.response.monitoreoCola = {};
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.modal.save.btnHabilitar=true;
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateMonitoreo;

                    }
                    foundColaCallback(idQueues);
                }
            }

            

            //Eliminar
            scope.onEliminarMonitoreoCola = function(idQueues) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/monitoreoCola/monitoreoColaCrud/monitoreoColaDelete/monitoreoColaDelete.template.html',
                    controller: 'monitoreoColaDeleteController as ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.modal.delete.monitoreoColaRequest.idQueues = idQueues;
                            scope.frmData.modal.delete.monitoreoColaRequest.noLoginCreador = scope.dataInfo.codUsuario;
                            scope.frmData.modal.delete.monitoreoColaRequest.idInstancia = scope.dataInfo.idInstancia;
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
                        scope.listarMonitoreo();
                    });
            }


            //Metodo para remover
            scope.onRemoveACC = function() {
                for (var i = 0; i < scope.lsMonitoreo.length; i++) {
                    if (scope.lsMonitoreo[i].idQueues == scope.frmData.modal.delete.monitoreoColaRequest.idQueues) {
                        scope.lsMonitoreo.splice(i, 1);
                        break;
                    }
                }
            }     

            //Cargar al Inicio
            scope.Onload = function() {
                scope.listarMonitoreo();
            }
            scope.Onload();
        }
    ]);