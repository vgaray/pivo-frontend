angular.module('fax')
    .controller('faxCtrl', [
        '$location', '$log', 'faxService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, faxService, localStorageService, utilService, $uibModal, viewConfig) {
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
                nameModalInsertFax: "Nuevo Fax Virtual",
                nameModalUpdateFax: "Editar Fax Virtual",       
                fax: {
                    list: {
                        buscarFax: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idFax: null,
                              tiOpera: 0
                            }
                        },
                        filtroFax: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idFax: null,
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
                            fax: {}
                        }
                    },
                    delete: {
                        title: "Mensaje del Sistema",
                        content: "¿Está seguro que desea eliminar este Fax?",
                        faxRequest: {
                            idFax: 0,
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1
                        }
                    }
                }
            }

            //Cabecera del Listado
            scope.table_headers = [
                { description: "Nombre Fax", fieldSort: "noFaxVirtual" },
                { description: "Correo Asociado", fieldSort: "noCorreoAsociado" },
                { description: "Numero Caller ID", fieldSort: "unCallerId" },
                { description: "Nombre Caller ID", fieldSort: "nocallerId" }
            ];

            //Buscar Fax
            scope.lsFax = [];
            scope.listarFax = function () 
            {                
                faxService.listarFax(scope.dataInfo).post({},{},
                function (result) 
                {
                        scope.lsFax = result.listado;
                        scope.totalItems = scope.lsFax.length;
        
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
                index = scope.lsFax.indexOf(value);
                return (begin <= index && index < end);
            };

            //Ingresar y actualizar
            scope.onFoundFax = function(idFax, openModalSaveCallback,whatOperation) {
                scope.frmData.fax.list.filtroFax.request.idFax = idFax;
                scope.frmData.fax.list.filtroFax.request.nologin = scope.dataInfo.codUsuario;
                scope.frmData.fax.list.filtroFax.request.idInstancia = scope.dataInfo.idInstancia;

                faxService.listarFax(scope.dataInfo).post({}, scope.frmData.fax.list.filtroFax.request, function(response) {
                        if (response.estado == 1) {
                            if (whatOperation == 1) { 
                                scope.frmData.modal.save.response.fax = [];             
                            }else if (whatOperation == 2) {
                                scope.frmData.modal.save.response.fax = response.listado[0]; 
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
            scope.onSaveFax = function(whatOperation, idFax) {
                scope.openModalSave(whatOperation, idFax,
                    function(idFax) {
                        scope.onFoundFax(idFax, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/fax/faxCrud/faxSave/faxSave.template.html',
                                controller: 'faxSaveController as ctrl',
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(faxSaved) {
                                scope.listarFax();
                            });
                        },whatOperation);
                    });
            }
            scope.openModalSave = function(whatOperation, idFax, foundFaxCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertFax;
                        scope.frmData.modal.save.response.fax = {};
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateFax;

                    }
                    foundFaxCallback(idFax);
                }
            }

            

            //Eliminar
            //Boton eliminar
            scope.onEliminarFax = function(idFax) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/fax/faxCrud/faxDelete/faxDelete.template.html',
                    controller: 'faxDeleteController as ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.modal.delete.faxRequest.idFax = idFax;
                            scope.frmData.modal.delete.faxRequest.noLoginCreador = scope.dataInfo.codUsuario;
                            scope.frmData.modal.delete.faxRequest.idInstancia = scope.dataInfo.idInstancia;
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
                        scope.listarFax();
                    });
            }

            //Metodo para remover
            scope.onRemoveACC = function() {
                for (var i = 0; i < scope.lsFax.length; i++) {
                    if (scope.lsFax[i].idFax == scope.frmData.modal.delete.faxRequest.idFax) {
                        scope.lsFax.splice(i, 1);
                        break;
                    }
                }
            }        

            //Cargar al Inicio
            scope.Onload = function() {
                 scope.listarFax();
            }
            scope.Onload();
        }
    ]);