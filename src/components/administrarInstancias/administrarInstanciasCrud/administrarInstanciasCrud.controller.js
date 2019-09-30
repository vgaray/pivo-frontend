'use strict';
angular.module('administrarInstancias')
    .controller('administrarInstanciasCrudController', ['$timeout', 'territorioService', 'gestionInstanciaService', 'localStorageService', 'objectInstacia', '$location', '$uibModalInstance', 'viewConfig',
        function ($timeout, territorioService, gestionInstanciaService, localStorageService, objectInstacia, $location, $uibModalInstance, viewConfig) {
            /**/
            var scope = this;
            /*variables para el request header*/
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.dataInfoNew = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
            }

            scope.modal = {
                nombreNuevo: "Nuevo Instancia",
                nombreEditar: "Editar Instancia"
            };
            scope.pais = {
                request: {
                    pCoPais: null
                },
                response: {
                    codigo: "",
                    nombre: ""
                }
            }
            scope.ciudad = {
                request: {
                    pCoPais: null
                },
                response: {
                    codigo: "",
                    nombre: ""
                }
            }
            /*variables request instancia*/
            scope.instanciaRequest = {
                idInstancia: objectInstacia,
                ipAsterisk: null,
                nomMascaraRedLan: null,
                nomMascaraOpenVpn: null,
                ipAsteriskBash: null,
                puerto_ssh_asterisk: null,
                puertoOpenVPN: null,
                pamConfInicial: null,
                simPais: null,
                simProvincia: null,
                fullProvincia: null,
                noOrgani: null,
                email: null,
                nomInstancia: null,
                idMarca: null,
                idModelo: null,
                ilEstado: false
            };
            /**
            * [actualizaInstancia actualiza campos necesarios para la tabla instancia]
            * @return {[type]} [1 si se inserto, 0 si no se inserto ]
            */
            scope.listarPais = function () {
                territorioService.listaTerritorio(scope.dataInfoNew).post({}, scope.pais.request, function (result) {
                    if (result.estado == 1) {
                        scope.lspaises = result.territoriolist;
                        scope.listarciudad();
                    } else if (result.estado == -1) {
                    }
                }, function (error) {
                    console.log(error);
                })
            }
            scope.combochangeP = function () {
                scope.instanciaRequest.simProvincia = null;
                scope.instanciaRequest.fullProvincia = "";
                scope.ciudad.request.pCoPais = scope.instanciaRequest.simPais;
                scope.control = false;
                scope.listarciudad();
            }
            scope.combochangeC = function (param) {
                scope.instanciaRequest.simProvincia = param.codigo;
                scope.instanciaRequest.fullProvincia = param.nombre;
            }

            scope.lsciudades = [];
            scope.listarciudad = function () {
                scope.ciudad.request.pCoPais = scope.instanciaRequest.simPais;
                territorioService.listaTerritorio(scope.dataInfoNew).post({}, scope.ciudad.request, function (result) {
                    if (result.estado == 1) {
                        scope.lsciudades = result.territoriolist;
                        scope.control = false;
                        if (scope.lsciudades.length == 0) {
                            scope.control = true;
                            scope.instanciaRequest.simProvincia = "";
                            scope.instanciaRequest.fullProvincia = "";
                            console.log("no se encontro ciudades en este pais");
                        }
                    } else if (result.estado == -1) {
                    }
                }, function (error) {
                    console.log(error);
                })
            }
            scope.listarPais();
            scope.actualizaInstancia = function () {
                if (scope.instanciaRequest.ipAsterisk != null && scope.instanciaRequest.nomMascaraRedLan != null && scope.instanciaRequest.puertoOpenVPN) {
                    gestionInstanciaService.actualizaInstancia(scope.dataInfo).post({}, scope.instanciaRequest, function (result) {
                        ;
                        if (result.estado == 1) {
                            toastr.remove();
                            toastr.success("Actualización exitosa", "Acción realizada", viewConfig.toastConfig);
                            scope.cancel();
                        }
                        else if (result.estado == 0) {
                            toastr.remove();
                            toastr.warning(result.mensaje, "Advertencia", viewConfig.toastConfig);
                        }
                        else if (result.estado == -1) {
                            toastr.remove();
                            toastr.error(result.mensaje, "Error", viewConfig.toastConfig);
                        }
                    }, function (error) {
                        console.log(error);
                    })
                } else {
                    toastr.error("No se ha podido actualizar", "Error", viewConfig.toastConfig);
                }

            };

            /**
            * [listaInstanciaXId listar instancias por id de instancia]
            * @return {[type]} [listado de objetos instancia]
            */
            scope.vailidarInstancia = false;
            scope.listInstanciaXId = [];
            scope.listaInstanciaXId = function () {
                gestionInstanciaService.listaPoridInstancia(scope.dataInfo).post({}, scope.instanciaRequest, function (result) {
                    if (result.estado == 1) {
                        scope.listInstanciaXId = result.listarInstanciaxId;
                        for (var i = 0; i < scope.listInstanciaXId.length; i++) {
                            scope.instanciaRequest.ipAsterisk = scope.listInstanciaXId[i].ipAsterisk;
                            scope.instanciaRequest.nomMascaraRedLan = scope.listInstanciaXId[i].nomMascaraRedLan;
                            scope.instanciaRequest.nomMascaraOpenVpn = scope.listInstanciaXId[i].nomMascaraOpenVpn;
                            scope.instanciaRequest.ipAsteriskBash = scope.listInstanciaXId[i].ipAsteriskBash;
                            scope.instanciaRequest.puerto_ssh_asterisk = scope.listInstanciaXId[i].puerto_ssh_asterisk;
                            scope.instanciaRequest.puertoOpenVPN = parseInt(scope.listInstanciaXId[i].puertoOpenVPN);
                            scope.instanciaRequest.pamConfInicial = scope.listInstanciaXId[i].pamConfInicial;
                            scope.instanciaRequest.simPais = scope.listInstanciaXId[i].simPais;
                            scope.instanciaRequest.simProvincia = scope.listInstanciaXId[i].simProvincia;
                            scope.instanciaRequest.fullProvincia = scope.listInstanciaXId[i].fullProvincia;
                            scope.instanciaRequest.noOrgani = scope.listInstanciaXId[i].noOrgani;
                            scope.instanciaRequest.email = scope.listInstanciaXId[i].email;
                            scope.instanciaRequest.nomInstancia = scope.listInstanciaXId[i].noInstancia;
                            scope.instanciaRequest.ilEstado = scope.listInstanciaXId[i].ilEstado;
                            scope.instanciaRequest.idMarca = scope.listInstanciaXId[i].idMarca;
                            scope.instanciaRequest.idModelo = scope.listInstanciaXId[i].idModelo;
                            scope.listaModeloPorMarca();
                            if (scope.listInstanciaXId[i].idEstadoInstancia == 3) {
                                scope.vailidarInstancia = true;
                            }
                        }


                    } else if (result.estado == -1) {
                        toastr.error(result.mensaje + " " + result.codError, 'Instancia', viewConfig.toastConfig);
                    }
                }, function (error) {
                    console.log('error ' + error);
                })
            };
            scope.listaInstanciaXId();

            /*lista marca*/
            scope.ListMarca = [];
            scope.listaMarca = function () {
                scope.dataInfo.idInstancia = objectInstacia;
                gestionInstanciaService.listaMarcaTelefono(scope.dataInfo).post({}, {}, function (result) {
                    if (result.estado == 1) {
                        scope.ListMarca = result.marcaTelefonoList;
                    } else if (result.estado == -1) {
                        toastr.error("No se mostraron las marcas error: " + result.codError, 'Error del sistema', viewConfig.toastConfig);
                    }
                }, function (error) {
                    console.log(error);
                })
            };
            scope.listaMarca();
            /*lista modelo de telefono por marca*/
            scope.modeloReq = { marcaId: 0 };
            scope.listTelefono = [];
            scope.listaModeloPorMarca = function () {
                scope.modeloReq.marcaId = scope.instanciaRequest.idMarca;
                gestionInstanciaService.listarModeloTelefonoPorMarca(scope.dataInfo).post({}, scope.modeloReq, function (result) {
                    if (result.estado == 1) {
                        scope.listTelefono = result.modeloTelefonoList;
                    }
                }, function (error) {
                    console.log(error);
                })
            };

            /**
            * [ok para cerrar el modal ejecutandose la funcion eliminar]
            * @return {[type]} [description]
            */
            scope.ok = function () {
                $uibModalInstance.close();
            };
            /**
            * [cancel cancela la eliminacion del usuario]
            * @return {[type]} [description]
            */
            scope.cancel = function () {
                $uibModalInstance.close();
            }
            scope.onload = function () {

            }

        }
    ]);