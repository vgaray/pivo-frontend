angular.module('grupoDirectorio')
    .controller('grupoDirectorioCtrl', [
        '$location', '$log', 'grupoDirectorioService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
        function($location, $log, grupoDirectorioService, localStorageService, utilService, $uibModal, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.varEstadoEntrada=true;

            scope.frmData = {
                add: utilService.operation.add,
                update: utilService.operation.update,
                nameModalInsert: "Nuevo Grupo Directorio",
                nameModalUpdate: "Editar Grupo Directorio",
                nameModalInsertEntrada: "Nueva Entrada",
                nameModalUpdateEntrada: "Editar Entrada",
                grupoDirectorio: {
                    list: {
                        filtroGrupoDirectorio: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idGrupo: null,
                              tiOpera: 1
                            }
                        },
                        filtroEntradaDirectorio: {
                            request: {
                              nologin: "",
                              idInstancia: "",
                              idEntrada: null,
                              tiOpera: 1
                            }
                        }                        
                    }
                },
                modal: {                
                    save: {
                        whatOperation: 0,
                        title: "",
                        idGrupo:null,
                        response: {
                            grupoDirectorio: {},
                            entradaDirectorio:{}
                        }
                    },
                    delete: {
                        title: "Mensaje del Sistema",
                        content: "¿Está seguro que desea eliminar este Grupo Directorio?",
                        grupoDirectorioRequest: {
                            idGrupo: 0,
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1
                        }
                    },
                    deleteEntrada: {
                        title: "Mensaje del Sistema",
                        content: "¿Está seguro que desea eliminar este Entrada Directorio?",
                        entradaDirectorioRequest: {
                            idEntrada: 0,
                            idGrupo: 0,
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1
                        }
                    }                    
                }
            }

            //Cabecera del Listado de Entradas
            scope.table_headers = [
                { description: "Nombre", fieldSort: "noNombre" },
                { description: "Número de Anexo", fieldSort: "noNombre" },
                { description: "Prefijo", fieldSort: "noNombre" }
            ];

            //Listar Grupo Directorio
            scope.model = {
                treeData: []
            }             
            scope.lsGrupo = [];
            scope.listarGrupo = function () 
            {                
                grupoDirectorioService.listarGrupo(scope.dataInfo).post({},{},
                function (result) 
                {
                    scope.lsEntrada = [];
                    scope.varEstadoEntrada=true;
                    scope.model.treeData=[];
                    for (var i = 0; i < result.listado.length; i++) {
                        scope.model.treeData.push({ id: result.listado[i].idGrupo, text: result.listado[i].noNombre, parent: "#", type: "directorio" }); 
                    }
                    scope.lsGrupo = scope.model.treeData;               
                    scope.totalItems = result.listado.length;                                         
                    scope.treeConfig.version++;        
                }, function (error) {
                    console.log('error' + error);
                })

            };      

            //Listar Entrada de Directorio     
            scope.entrada ={
                idGrupo :null,
                idEntrada:null,
                pOpcion:0
            }       
            scope.grupo="";
            scope.lsEntrada = [];
            scope.listarEntrada = function () 
            {                
                scope.entrada.idGrupo=scope.checkArray[0].id;
                scope.grupo=scope.checkArray[0].text;
                scope.entrada.idEntrada=null;
                if(scope.entrada.idGrupo=="1"){
                    scope.entrada.pOpcion=1;
                }else{
                    scope.entrada.pOpcion=0;
                }
                grupoDirectorioService.listarEntrada(scope.dataInfo).post({},scope.entrada,
                function (result) 
                {
                    scope.varEstadoEntrada=false;
                    scope.lsEntrada = result.listado;               
                    scope.totalItems = scope.lsEntrada.length;                                                
                }, function (error) {
                    console.log('error' + error);
                })

            };                                             

            //Paginacion Entrada Directorio
            scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.paginate = function(value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.lsEntrada.indexOf(value);
                return (begin <= index && index < end);
            };


            //Mostrar Lista de Entradas
            scope.MostrarEntradas = function () {   
                scope.buscarSelect();
                scope.listarEntrada();
            }

            //Ingresar y actualizar Grupo
            scope.onFoundGrupo = function(idGrupo, openModalSaveCallback,whatOperation) {
                scope.frmData.grupoDirectorio.list.filtroGrupoDirectorio.request.idGrupo = idGrupo;
                scope.frmData.grupoDirectorio.list.filtroGrupoDirectorio.request.nologin = scope.dataInfo.codUsuario;
                scope.frmData.grupoDirectorio.list.filtroGrupoDirectorio.request.idInstancia = scope.dataInfo.idInstancia;

                grupoDirectorioService.listarGrupo(scope.dataInfo).post({}, scope.frmData.grupoDirectorio.list.filtroGrupoDirectorio.request, function(response) {
                        if (response.estado == 1) {
                            if (whatOperation == 1) { 
                                scope.frmData.modal.save.response.grupoDirectorio = [];             
                            }else if (whatOperation == 2) {
                                scope.frmData.modal.save.response.grupoDirectorio = response.listado[0]; 
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

            //Ingresar y actualizar Entrada
            scope.onFoundEntrada = function(idEntrada, openModalSaveCallback,whatOperation) {                            
                scope.frmData.grupoDirectorio.list.filtroEntradaDirectorio.request.idEntrada = idEntrada;
                scope.frmData.grupoDirectorio.list.filtroEntradaDirectorio.request.idGrupo = null;
                scope.frmData.grupoDirectorio.list.filtroEntradaDirectorio.request.nologin = scope.dataInfo.codUsuario;
                scope.frmData.grupoDirectorio.list.filtroEntradaDirectorio.request.idInstancia = scope.dataInfo.idInstancia;

                grupoDirectorioService.listarEntrada(scope.dataInfo).post({}, scope.frmData.grupoDirectorio.list.filtroEntradaDirectorio.request, function(response) {
                        if (response.estado == 1) {
                            if (whatOperation == 1) { 
                                scope.frmData.modal.save.response.entradaDirectorio = [];             
                            }else if (whatOperation == 2) {
                                scope.frmData.modal.save.response.entradaDirectorio = response.listado[0]; 
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

            //Modal Grupo Directorio
            scope.onSaveGrupo = function(whatOperation, idGrupo) {
                scope.openModalSave(whatOperation, idGrupo,
                    function(idGrupo) {
                        scope.onFoundGrupo(idGrupo, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/grupoDirectorio/grupoDirectorioSave/grupoDirectorioSave.template.html',
                                controller: 'grupoDirectorioSaveController as ctrl',
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(directorioSaved) {
                                scope.listarGrupo();
                            });
                        },whatOperation);
                    });
            }
            scope.openModalSave = function(whatOperation, idGrupo, foundDirectorioCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsert;
                        scope.frmData.modal.save.response.grupoDirectorio = {};
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdate;

                    }
                    foundDirectorioCallback(idGrupo);
                }
            }
            
            // Modal Entrada de Directorio
            scope.onSaveEntrada = function(whatOperation, idEntrada) {
                scope.openModalSaveEntrada(whatOperation, idEntrada,
                    function(idEntrada) {
                        scope.onFoundEntrada(idEntrada, function(dataModal) {
                            var modalInstance = $uibModal.open({
                                templateUrl: 'src/components/grupoDirectorio/entradaDirectorio/entradaDirectorioSave/entradaDirectorioSave.template.html',
                                controller: 'entradaDirectorioSaveController as ctrl',
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    dataModal: function() {
                                        return dataModal;
                                    }
                                }
                            });
                            modalInstance.result.then(function(entradaSaved) {
                                scope.listarEntrada();
                            });
                        },whatOperation);
                    });
            }
            scope.openModalSaveEntrada = function(whatOperation, idEntrada, foundEntradaCallback) {
                if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
                    if (whatOperation == scope.frmData.add) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.add;
                        scope.frmData.modal.save.title = scope.frmData.nameModalInsertEntrada;
                        scope.frmData.modal.save.response.grupoDirectorio = {};
                        scope.frmData.modal.save.idGrupo=scope.entrada.idGrupo;
                    } else if (whatOperation == scope.frmData.update) {
                        scope.frmData.modal.save.whatOperation = scope.frmData.update;
                        scope.frmData.modal.save.title = scope.frmData.nameModalUpdateEntrada;

                    }
                    foundEntradaCallback(idEntrada);
                }
            }

            //Eliminar Grupo
            scope.onEliminarGrupo = function() {
                if(scope.checkArray!=null){
                    scope.buscarSelect();
                    // scope.vaciarArreglo();
                    // scope.cargarArreglo();                
                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/components/grupoDirectorio/grupoDirectorioDelete/grupoDirectorioDelete.template.html',
                        controller: 'grupoDirectorioDeleteController as ctrl',
                        size: 'sm',

                        resolve: {
                            dataModal: function() {
                                scope.frmData.modal.delete.grupoDirectorioRequest.idGrupo = scope.checkArray[0].id; 
                                scope.frmData.modal.delete.grupoDirectorioRequest.noLoginCreador = scope.dataInfo.codUsuario;
                                scope.frmData.modal.delete.grupoDirectorioRequest.idInstancia = scope.dataInfo.idInstancia;
                                return scope.frmData.modal.delete;
                            }
                        }
                    });

                    modalInstance.result.then(function(ilEliminado) {
                            $log.debug("Eliminado: " + ilEliminado);

                            if (ilEliminado >= 1) {
                                scope.listarGrupo();
                            }
                        },
                        function() {
                            $log.debug("Modal minimizado");
                            // scope.listarGrupo();
                        });
                }
            }

            //Eliminar Entrada
            scope.onEliminarEntrada = function(idEntrada,idGrupo) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/grupoDirectorio/entradaDirectorio/entradaDirectorioDelete/entradaDirectorioDelete.template.html',
                    controller: 'entradaDirectorioDeleteController as ctrl',
                    size: 'sm',

                    resolve: {
                        dataModal: function() {
                            scope.frmData.modal.deleteEntrada.entradaDirectorioRequest.idEntrada = idEntrada;
                            scope.frmData.modal.deleteEntrada.entradaDirectorioRequest.idGrupo = idGrupo;
                            scope.frmData.modal.deleteEntrada.entradaDirectorioRequest.noLoginCreador = scope.dataInfo.codUsuario;
                            scope.frmData.modal.deleteEntrada.entradaDirectorioRequest.idInstancia = scope.dataInfo.idInstancia;
                            return scope.frmData.modal.deleteEntrada;
                        }
                    }
                });

                modalInstance.result.then(function(ilEliminado) {
                        $log.debug("Eliminado: " + ilEliminado);

                        if (ilEliminado >= 1) {
                            scope.onRemoveACCEntrada();
                        }
                    },
                    function() {
                        $log.debug("Modal minimizado");
                        scope.listarEntrada();
                    });
            }

            //Metodo para remover Entrada Directorio
            scope.onRemoveACCEntrada = function() {
                for (var i = 0; i < scope.lsEntrada.length; i++) {
                    if (scope.lsEntrada[i].idEntrada == scope.frmData.modal.deleteEntrada.entradaDirectorioRequest.idEntrada) {
                        scope.lsEntrada.splice(i, 1);
                        break;
                    }
                }
            }   

            scope.treeConfig = {
                "ui": {
                    "initially_select": ["#init_sel"]
                },
                version: 1,
                "state": {
                    "selected": true
                },
                "core": {
                    "multiple": false,
                    "themes": {
                        "variant": "large"
                    }
                },
                "checkbox": {
                    "keep_selected_style": true
                },
                "types" : {
                    "directorio" : {
                        "icon" : "mdi mdi-folder"
                    }
                },
                "plugins": ["types"]
            };     

            scope.ignoreChanges = false;
            scope.applyModelChanges = function () {
                return !scope.ignoreChanges;
            }       

            //Devolver Seleccionado del Arbol
            scope.checkArray =null;
            scope.buscarSelect = function () {
                scope.checkArray = scope.treeInstance.jstree("get_selected",true);
                // console.log(scope.checkArray);
            }            

            scope.treeInstance = {};

            //Cargar al Inicio
            scope.Onload = function() {
                 scope.listarGrupo();
                 scope.varEstadoEntrada=true;
            }
            scope.Onload();
        }
    ]);