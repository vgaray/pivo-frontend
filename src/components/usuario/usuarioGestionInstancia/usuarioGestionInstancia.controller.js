angular.module('usuario')
    .controller('usuarioGestionInstanciaCtrl', [
        '$location', '$log', 'usuarioService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, usuarioService, localStorageService, utilService, $uibModal, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.frmData = {
                btnHabilitar:true,
                add: utilService.operation.add,
                update: utilService.operation.update,
                nameModalInsertUsuario: "Nuevo Usuario",
                nameModalUpdateUsuario: "Editar Usuario",
                nameDatosIngresoInsert: "Nuevos Datos de Ingreso",
                nameDatosIngresoUpdate: "Editar Datos de Ingreso",
                usuario: {
                    list: {
                        buscarUsuario: {
                            request: {
                                nologin: "",
                                idInstancia: "",
                                idUsuario: null,
                                tiOpera: 0
                            }
                        },
                        filtroUsuario: {
                            request: {
                                nologin: "",
                                idInstancia: "",
                                idUsuario: null,
                                tiOpera: 1
                            }
                        }
                    }
                },
                modal: {
                    save: {
                        whatOperation: 0,
                        title: "",
                        subtitulo:"",
                        response: {
                            usuario: {}
                        }
                    },
                    delete: {
                        title: "Mensaje del Sistema",
                        content: "¿Está seguro que desea eliminar este usuario?",
                        usuarioRequest: {
                            idUsuario: 0,
                            noLoginCreador: "",
                            idInstancia: ""
                        }
                    }

                }
            }

            //Buscar usuario
            scope.lsUsuario = [];
            var codUsado = scope.dataInfo.codUsuario;
            scope.frmData.usuario.list.buscarUsuario.request.nologin = codUsado;
            var InstanciaUsada = scope.dataInfo.idInstancia;
            scope.frmData.usuario.list.buscarUsuario.request.idInstancia = InstanciaUsada;
            scope.listarUsuario = function() {
                usuarioService.listarUsuario(scope.dataInfo).post({}, scope.frmData.usuario.list.buscarUsuario.request, function(result) {
                        scope.lsUsuario = result.usuarioList;
                        scope.totalItems = scope.lsUsuario.length;
                        if (scope.lsUsuario.length == 0) {
                            toastr.success('Vacío', 'Listado', viewConfig.toastConfig);
                        }
                    },
                    function(error) {
                        console.error(error);
                    });

            }
            //Paginacion
            /*variables para paginar*/
            scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.paginate = function(value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.lsUsuario.indexOf(value);
                return (begin <= index && index < end);

            };

            //Ingresar y actualizar
            //Modificar al metodo real
            scope.onFoundUsuario = function(idUsuario, openModalSaveCallback) {
                scope.frmData.usuario.list.filtroUsuario.request.idUsuario = idUsuario;
                scope.frmData.usuario.list.filtroUsuario.request.nologin = codUsado;
                scope.frmData.usuario.list.filtroUsuario.request.idInstancia = InstanciaUsada;
                
                usuarioService.listarUsuario(scope.dataInfo).post({}, scope.frmData.usuario.list.filtroUsuario.request, function(response) {
                        if (response.estado == 1) 
                        {
                            if (response.usuarioList.length > 0) 
                            {
                                if( idUsuario === undefined || idUsuario == null )
                                {
                                    scope.frmData.modal.save.response.usuario = {};
                                }
                                else
                                {
                                    scope.frmData.modal.save.response.usuario = response.usuarioList[response.usuarioList.findIndex( usuario => { return usuario.idUsuario == idUsuario } )];
                                }                    
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
            scope.onSaveUsuario = function(whatOperation, idUsuario) {
                scope.openModalSave(whatOperation, idUsuario,
                    function(idUsuario) {
                        scope.onFoundUsuario(idUsuario, function(dataModal) {
                            
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/usuario/usuarioGestionInstancia/usuarioGestionInstanciaCrud/usuarioGestionInstanciaSave/usuarioGestionInstanciaSave.template.html',
                                controller: 'usuarioInstanciaSaveController as ctrl',
                                backdrop: 'static',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(usuarioSaved) {
                                scope.listarUsuario();
                            });
                        });
                    });
            }
            scope.openModalSave = function(whatOperation, idUsuario, foundUsuarioCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.modal.save.btnHabilitar=false;
                        scope.frmData.modal.save.divContra=true;
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertUsuario;
                        scope.frmData.modal.save.subtitulo=scope.frmData.nameDatosIngresoInsert;
                        scope.frmData.modal.save.response.usuario = {};
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.modal.save.btnHabilitar=true;
                        scope.frmData.modal.save.divContra=false;
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateUsuario;
                        scope.frmData.modal.save.subtitulo=scope.frmData.nameDatosIngresoUpdate;

                    }

                    foundUsuarioCallback(idUsuario);
                }
            }
            //Eliminar
            //Boton eliminar
            scope.onEliminarUsuario = function(idUsuario) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/usuario/usuarioGestionInstancia/usuarioGestionInstanciaCrud/usuarioGestionInstanciaDelete/usuarioGestionInstanciaDelete.template.html',
                    controller: 'usuarioInstanciaDeleteController as ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.modal.delete.usuarioRequest.idUsuario = idUsuario;
                            scope.frmData.modal.delete.usuarioRequest.noLoginCreador = codUsado;
                            scope.frmData.modal.delete.usuarioRequest.idInstancia = InstanciaUsada;
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
                        $log.debug("Modal eliminar minimizado");
                        scope.listarUsuario();
                    });

            }


            //Metodo para remover
            scope.onRemoveACC = function() {
                for (var i = 0; i < scope.lsUsuario.length; i++) {
                    if (scope.lsUsuario[i].idUsuario == scope.frmData.modal.delete.usuarioRequest.idUsuario) {
                        scope.lsUsuario.splice(i, 1);
                        break;
                    }
                }
            }

            //Cargar al Inicio
            scope.Onload = function() {
                scope.listarUsuario();
            }
            scope.Onload();

        }
    ]);
