angular.module('permisoLlamadas')
    .controller('permisoLlamadasCtrl', ['$state', 'localStorageService', '$location', 'permisoLlamadasService', '$uibModal', 'gestionControlRolEstadoService', 'viewConfig',
        function($state, localStorageService, $location, permisoLlamadasService, $uibModal, gestionControlRolEstadoService, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            };

            scope.frmData = {
                hideButtons: false,
                hideButtons2: false
            };

            /**
             * funcion para escribir la cabecera de las tablas
             */
            scope.headers = [{
            //     description: 'Nombre',
            //     fieldSort: "noNombre"
            // }, {
            //     description: 'Estado',
            //     fieldSort: "ilActivo"
            // }, {
                description: 'Local',
                fieldSort: "ilfijloca"
            }, {
                description: 'Nacional',
                fieldSort: "ilfijnaci"
            }, {
                description: 'Internacional',
                fieldSort: "ilfijinte"
            }, {
                description: 'Nacional',
                fieldSort: "ilcelnaci"
            }, {
                description: 'Internacional',
                fieldSort: "ilcelinte"
            }, {
                description: 'RPM',
                fieldSort: "ilcelrpm"
            }];

            scope.frmData = {
                request :{
                    noNombre : null
                },
                active :{
                    nombre : null,
                    button : true
                }
            }

            /**
             * funcion para listar usuarios
             */
            scope.tbUsuarioListar = [];
            scope.listaUsuario = function() {
                permisoLlamadasService.listaUsuario(scope.dataInfo).post({}, {}, function(result) {
                    if (result.estado == 1) {
                        scope.tbUsuarioListar = result.tbUsuarioList;
                        scope.totalItems = scope.tbUsuarioListar.length;
                    }
                }, function(error) {
                    console.log('Error: ' + error);
                });
            };
            /**
             * funcion para paginar
             */
            /*variables para paginar*/
            scope.currentPage = 1;
            scope.numPerPage = 10;
            // scope.paginate = function(value) {
            //     var begin, end, index;
            //     begin = (scope.currentPage - 1) * scope.numPerPage;
            //     end = begin + scope.numPerPage;
            //     index = scope.tbUsuarioListar.indexOf(value);
            //     return (begin <= index && index < end);
            // };
            /*=====================Lista Usuario =============================*/
            scope.listTbUsuarioRequest = { numpagina: 0, numRegisMostrar: scope.numPerPage };
            scope.numTotalReg = 0;
            scope.listTbUsuario = [];
            scope.listaTbUsuario = function() {
                scope.listTbUsuarioRequest.numpagina=scope.currentPage;
                permisoLlamadasService.listaUsuarioPaginado(scope.dataInfo).post({}, scope.listTbUsuarioRequest, function(result) {
                    if (result.estado == 1) {
                        scope.listTbUsuario = result.tbUsuarioList;
                        scope.numTotalReg = scope.listTbUsuario[0].numTotalReg;
                    } else if (result.estado == -1) {
                        toastr.error(result.mensaje, "Permiso Llamadas", viewConfig.toastConfig)
                    }
                }, function(error) {
                    console.log('Error ' + error);
                })
            };
            scope.cambiaPaginaTbUsuario = function() {
                // scope.listTbUsuarioRequest.numpagina = numPag;
                scope.listaTbUsuario();
            };
            /*=========================Fin Lista Usuario=========================*/
            /**
             * funcion flag
             */
            scope.flagPin = function(idUsupin, idClave, idTiptel, estado) {
                if (estado == 0) {
                    estado = 1;
                } else if (estado == 1) {
                    estado = 0;
                }
                scope.modificaPin = { idUsupin, idClave, idTiptel, estado };

                console.log(scope.modificaPin);
                permisoLlamadasService.flagPin(scope.dataInfo).post({}, scope.modificaPin, function(result) {
                    if (result.estado == 1) {
                        scope.loadPage();
                        console.log(result.mensaje);
                    } else if (result.estado == -1) {
                        console.log(result.mensaje);
                    }
                }, function(error) {
                    console.log("error" + error);
                })
            };
            /**
             * funcion para llamar al modal de insertar usuarios
             */
            scope.modalOption = function(idUsuario) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/permisoLlamadas/permisoLlamadasCrud/permisoLlamadaCrud.template.html',
                    controller: 'permisoLLamadaCrudCtrl as ctrl',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'md modal-permiso',
                    resolve: {
                        idUsuario: function() {
                            return idUsuario;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    scope.listaUsuario();
                    scope.listaTbUsuario();
                }, function() {
                    scope.listaUsuario();
                    scope.listaTbUsuario();
                });
            };
            /**
             * funcion para llamar al modal de elimnar registros por id de listado
             */
            scope.modalEliminarUsuario = function(idUsuari) {

                var modalInstanceDelete = $uibModal.open({
                    templateUrl: 'src/components/permisoLlamadas/permisoLlamadasDelete/permisoLlamadaDelete.template.html',
                    controller: 'permisoLlamadadDeleteCtrl as perDelCrtl',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'sm',
                    resolve: {
                        idUsuari: function() {
                            return idUsuari;
                        }
                    }
                });
                modalInstanceDelete.result.then(function() {
                    scope.listaUsuario();
                    scope.listaTbUsuario();
                }, function() {
                    scope.listaUsuario();
                    scope.listaTbUsuario();
                })
            };
            /**
             * funcion para modificar el estado de usuario
             */
            scope.modificaEstadoPing = function(idUsuario, estadoS) {
                if (estadoS == true) {
                    estadoS = 0
                } else if (estadoS == false) {
                    estadoS = 1;
                }
                scope.modificaFlag = { idUsupin: idUsuario, estado: estadoS };
                console.log(scope.modificaFlag);
                permisoLlamadasService.modificaFlag(scope.dataInfo).post({}, scope.modificaFlag, function(result) {
                    if (result.estado == 1) {
                        scope.loadPage();
                        console.log(result.mensaje);
                    } else if (result.estado == 1) {
                        console.log(result.mensaje);
                    }

                }, function(error) {
                    console.log("Error " + error);
                })
            };

            scope.linkDescargarPlantilla = function() {
                var idInstanciaSelect = scope.dataInfo.idInstancia;
                var direccion = $state.href('principal.excelPermisosUsuario', { idInstancia: idInstanciaSelect });
                console.log(direccion);
                window.open(direccion, '_self');
            };

            scope.linkSubirPlantilla = function() {
                var idInstanciaSelect = scope.dataInfo.idInstancia;
                var direccion = $state.href('principal.cargaPermisoLlamadas', { idInstancia: idInstanciaSelect });
                console.log(direccion);
                window.open(direccion, '_self');
            };

            scope.permiso = {
                noLogin: scope.dataInfo.codUsuario,
                tiElemto: 1,
                idEstadoelemento: 3
            };

            scope.loadUICustom = function() {
                scope.frmData.hideButtons = scope.ver(8);
                scope.frmData.hideButtons2 = scope.ver(9);
            };


            scope.ver = function(valorBusca) {
                var texto;
                gestionControlRolEstadoService.consultar(scope.dataInfo).post({}, scope.permiso, function(response) {
                        if (response.estado == 1) {
                            texto = response.validarControlResult[0];
                        } else {
                            console.error("Error: " + response.mensaje);
                        }
                    },
                    function(failure) {
                        console.error("Error: " + failure);
                    });
                if (texto != null) {
                    var textArray = texto.split(",");
                    for (var i = 0; i < textArray.length; i++) {
                        if (textArray[i] == valorBusca) {
                            return true;
                        }
                    }
                }
                return false;
            };

            scope.BuscarPermisoLlamadas = function () {
                permisoLlamadasService.buscarUsuario(scope.dataInfo).post({}, scope.frmData.request, function(result) {
                    if (result.estado == 1) {

                        /**
                         * 
                        scope.tbUsuarioListar = result.tbUsuarioList;
                        scope.totalItems = scope.tbUsuarioListar.length;
                         */

                        scope.listTbUsuario = result.lsUsuario;
                        scope.numTotalReg = result.lsUsuario.length;
                    } else if (result.estado == 0) {
                        toastr.warning(result.mensaje, 'Permiso llamadas', viewConfig.toastConfig);
                    } else if (result.estado == -1) {
                        toastr.error(result.mensaje, 'Permiso llamadas', viewConfig.toastConfig);
                    }
                })
            };

            scope.validateNombre = function () {
                if(scope.frmData.request.noNombre == null || scope.frmData.request.noNombre == ""){
                    scope.frmData.active.nombre = true;
                    scope.listaUsuario();
                    scope.listaTbUsuario();
                }else {
                    scope.frmData.active.nombre = false;
                }
                scope.validateButton();
            }

            scope.validateButton = function () {
                if(scope.frmData.active.nombre == true) {
                    scope.frmData.active.button = true;
                } else {
                    scope.frmData.active.button = false;
                }
            }
            /**
             * load page funcion donde se inciara la lectura de la vista
             */
            scope.loadPage = function() {
                scope.listaUsuario();
                scope.listaTbUsuario();
                scope.loadUICustom();
            };
            scope.loadPage();
        }
    ]);
