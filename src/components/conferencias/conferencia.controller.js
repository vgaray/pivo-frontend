angular.module('conferencia')
    .controller('conferencia',[
        '$location','$log','conferenciaService','localStorageService','utilService','$uibModal','viewConfig',
        function($location,$log,conferenciaService,localStorageService,utilService,$uibModal,viewConfig){
            var scope = this;

            scope.varnab   = $location.search();
            scope.dataInfo = {
                codUsuario : localStorageService.get("codUsuario"),
                token      : localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.frmData = {
                name_page_title : "Lista de Conferencias",

                add : utilService.operation.add,
                update: utilService.operation.update,
                nameModalInsertConfe : "Agregar Nueva Conferencia",
                nameModalUpdateConfe : "Actualizar Conferencia",
                modal : {
                    save:{
                        whatOperation : 0,
                        title : "",
                        response : {
                            conferencia : {}
                        }
                    },
                    delete : {
                        title:"Mensaje del Sistema",
                        content : "¿Está seguro que desea eliminar esta Conferencia?",
                        conferenciaRequest : {
                            idConferencia : 0,
                            nologin : "",
                            idInstancia : "",
                            tiOpera : 1
                        }
                    }
                },

                conferencia : {
                    listaConferencia:{
                        request: {
                            idConferencia : '',
                        },
                        response : {
                            noConferencia : '',
                            nuConferencia : '',
                            pwdAdmin : '',
                            pwdUsuario: '',
                            noRutBie : '',
                            nuMaxUsuario : '',
                            noVarAdmin : '',
                            noVarUsuario :'',
                            noRutHol : '',
                            fecha : '',
                        }
                    },
                    list : {
                        filtroConferencia:{
                            request:{
                                nologin : "",
                                idInstancia : "",
                                idConferencia : null,
                                tiOpera : 1
                            }
                        }
                    }
                }
            }



            scope.lsConferencia = [];
            scope.listaConferencia = function(){
                conferenciaService.listaConferenciaServ(scope.dataInfo).post({},scope.frmData.conferencia.listaConferencia.request,function(result){
                    if(result.estado == 1){
                        scope.lsConferencia = result.lsConferencias;
                    } else if(result.estado == 0 || result.estado == -1){
                        toastr.error("Ocurrio un error al mostrar la lista","",viewConfig.toastrConfig);
                    }
                }, function(error){
                    console.error(error);
                })
            }

            //Ingresar y actualizar
            scope.openModalSave = function(whatOperation, idConfM, foundConfeCallback){
                if(whatOperation == scope.frmData.add || whatOperation == scope.frmData.update){
                    if(whatOperation == scope.frmData.add){
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertConfe;
                        scope.frmData.modal.save.response.conferencia = {};
                    } else if(whatOperation == scope.frmData.update){
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateConfe;
                    }
                    foundConfeCallback(idConfM);
                }
            }

            scope.onFoundConferencia = function(idConfM, openModalSaveCallback,whatOperation){
                scope.frmData.conferencia.list.filtroConferencia.request.idConferencia = idConfM;
                scope.frmData.conferencia.list.filtroConferencia.request.nologin = scope.dataInfo.codUsuario;
                scope.frmData.conferencia.list.filtroConferencia.request.idInstancia = scope.dataInfo.idInstancia;

                conferenciaService.listaConferenciaServ(scope.dataInfo).post({},scope.frmData.conferencia.list.filtroConferencia.request,function(result){
                    if(result.estado == 1){
                        if(whatOperation == 1){
                            scope.frmData.modal.save.response.conferencia = [];
                        } else if(whatOperation == 2){
                            scope.frmData.modal.save.response.conferencia = result.lsConferencias[0];
                        }
                        openModalSaveCallback(scope.frmData.modal.save);
                    } else {
                        console.error("Error "+ result.mensaje);
                    }
                }, function(failure){
                    console.console.error("Error: "+failure);
                });
            }

            scope.onSaveConferencia = function(whatOperation, idConfM){
                scope.openModalSave(whatOperation,idConfM,
                    function(idConfM){
                        scope.onFoundConferencia(idConfM, function(dataModal){
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/conferencias/conferenciaCrud/conferenciaSave/conferenciaSave.template.html',
                                controller: 'conferenciaSaveController as confeCtrl',
                                backdrop:'static',
                                resolve: {
                                    dataModal : function(){
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(conferenciaSaved){
                                scope.listaConferencia();
                            })
                        }, whatOperation)
                    })
            };

            //Eliminar
            scope.onEliminarConferencia = function(idConferencia){
                var modalInstance = $uibModal.open({
                    templateUrl : 'src/components/conferencias/conferenciaCrud/conferenciaDelete/conferenciaDelete.template.html',
                    controller  : 'conferenciaDeleteController as confeCtrl',
                    size        : 'sm',

                    resolve : {
                        dataModal : function(){
                            scope.frmData.modal.delete.conferenciaRequest.idConferencia = idConferencia;
                            scope.frmData.modal.delete.conferenciaRequest.nologin = scope.dataInfo.codUsuario;
                            scope.frmData.modal.delete.conferenciaRequest.idInstancia   = scope.dataInfo.idInstancia
                            return scope.frmData.modal.delete;
                        }
                    }
                });

                modalInstance.result.then(function(ilEliminado){
                    $log.debug("Eliminado " + ilEliminado);
                    if(ilEliminado >= 1){
                        scope.onRemoveACC();
                    }
                }, function(){
                    $log.debug("Modal Minimizado");
                    scope.listaConferencia();
                });
            }

            //Metodo para remover
            scope.onRemoveACC = function(){
                for (var i = 0; i < scope.lsConferencia.length; i++) {
                    if(scope.lsConferencia[i].idConferencia == scope.frmData.modal.delete.conferenciaRequest.idConferencia){
                        scope.lsConferencia.splice(i,1);
                        break;
                    }
                }
            }

            scope.listaComboMusiconHold = [];
            scope.listarMusicOnHold = function(){
                conferenciaService.listaMusicaOnHoldServ(scope.dataInfo).post({},function(result){
                    if(result.estado == 1){
                        scope.listaMusicOH = result.lsMusicaOnHold;
                    } else if(result.estado == 0 || result.estado == -1){
                        console.error('Error: '+result.mensaje);
                    }
                },function(error){
                    console.error('error' + error);
                })
            }

            scope.OnloadPage = function(){
                 scope.listaConferencia();
                scope.listarMusicOnHold();
            }

            scope.OnloadPage();
        }
   ])
