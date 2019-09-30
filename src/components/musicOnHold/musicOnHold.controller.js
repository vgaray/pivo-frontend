angular.module('musicOnHold')
    .controller('musicOnHoldCtrl', [
        '$location', '$log', 'musicOnHoldService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, musicOnHoldService, localStorageService, utilService, $uibModal, viewConfig) {
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
                nameModalInsertMusica: "Nueva Musica y Audio(s)",
                nameModalUpdateMusica: "Editar Musica o Audio(s)",
                titulo: "Lista Musica en Espera",
                musica: {
                    lista: {
                        request: {

                        }
                    },
                    modal: {
                        save: {
                            idMusica: null,
                            noMusica: null
                        },
                        delete:{
                          title: "Mensaje del Sistema",
                          content: "¿Está seguro que desea eliminar esta carpeta    ?",
                          request:{
                            pIdClase: null,
                            musica:{
                              idClase: null,
                              noClase: null
                            }
                          }
                        }
                    }

                }
            }
            //Listar Musica
            scope.lsMusica = [];
            scope.listarMusica = function() {
                musicOnHoldService.listarMusicOnHold(scope.dataInfo).post({}, scope.frmData.musica.lista.request, function(result) {
                        scope.lsMusica = result.lsMusicaOnHold;
                        if (scope.lscentralExterna.length == 0) {
                            console.log("Lista vacia");
                        } else {
                            console.log("Lista Llena");
                        }
                    },
                    function(error) {
                        console.error(error);
                    });
            };
            //Modal save
            scope.onFoundMusica = function(idMusica, noMusica, openModalSaveCallback) {
                scope.frmData.musica.modal.save.idMusica = idMusica;
                scope.frmData.musica.modal.save.noMusica = noMusica;
                openModalSaveCallback(scope.frmData.musica.modal.save);
            }
            scope.onSaveMusica = function(whatOperation, idMusica, noMusica) {
                scope.openModalSave(whatOperation, idMusica, noMusica,
                    function(idMusica, noMusica) {
                        scope.onFoundMusica(idMusica, noMusica, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/musicOnHold/musicOnHoldCrud/musicOnHoldSave/musicOnHoldSave.template.html',
                                controller: 'musicOnHoldSaveController as Ctrl',
                                backdrop: 'static',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(musicOnHoldSaved) {
                                scope.listarMusica();
                            });
                            scope.listarMusica();
                        });
                    });
            }
            scope.openModalSave = function(whatOperation, idMusica, noMusica, foundCentralCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.musica.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.musica.modal.save.title = scope.frmData.nameModalInsertMusica;
                        scope.frmData.musica.modal.save.visible=true;
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.musica.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.musica.modal.save.title = scope.frmData.nameModalUpdateMusica;
                        scope.frmData.musica.modal.save.visible=false;
                    }

                    foundCentralCallback(idMusica, noMusica);
                }
            }

            //Modal Eliminar
            scope.onEliminarMusica = function(idClase,noClase) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/musicOnHold/musicOnHoldCrud/musicOnHoldDelete/musicOnHoldDelete.template.html',
                    controller: 'musicOnHoldDeleteController as Ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.musica.modal.delete.request.pIdClase = idClase;
                            scope.frmData.musica.modal.delete.request.musica.idClase=idClase;
                            scope.frmData.musica.modal.delete.request.musica.noClase=noClase;
                            return scope.frmData.musica.modal.delete;
                        }
                    }
                });
                modalInstance.result.then(function(ilEliminado) {
                        $log.debug("Eliminado: " + ilEliminado);
                        if (ilEliminado >= 1) {
                            scope.onRemoveCarpeta();
                        }
                    },
                    function() {
                        $log.debug("Modal eliminar minimizado");
                        scope.listarMusica();
                    });

            }
            //Metodo para remover
            scope.onRemoveCarpeta = function() {
                for (var i = 0; i < scope.lsMusica.length; i++) {
                    if (scope.lsMusica[i].idClase == scope.frmData.musica.modal.delete.request.musica.idClase) {
                        scope.lsMusica.splice(i, 1);
                        break;
                    }
                }
            }

            //Antes que carge la pagina
            scope.OnLoad = function() {
                scope.listarMusica();
            }
            scope.OnLoad();
        }
    ]);
