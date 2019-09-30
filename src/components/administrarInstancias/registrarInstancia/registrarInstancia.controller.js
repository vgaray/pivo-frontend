
'use strict';
angular.module('administrarInstancias')
    .controller('registrarInstanciaController', ['clienteService', 'pedidoService', '$timeout', 'territorioService', 'gestionInstanciaService', 'localStorageService', 'objectInstacia', '$location', '$uibModalInstance', 'viewConfig',
        function (clienteService, pedidoService, $timeout, territorioService, gestionInstanciaService, localStorageService, objectInstacia, $location, $uibModalInstance, viewConfig) {
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
            scope.BuscaClienteBtn = {
                request: {
                    pIdCliente: null,
                    pNoRazon: null,
                    pNudocide: "",
                    pEstado: true,
                }
            }
            scope.variab = 0;
            scope.Listafiltradocli = [];
            scope.DetallePedido = {
                request: {
                    idCliente: 0
                }
            }
            scope.modal = {
                nombreNuevo: "Nueva Instancia",
                nombreEditar: "Editar Instancia"
            };
            scope.pais = {
                request: {
                    pCoPais: null
                },
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
            scope.plan = {
                request: {
                    pIdPlan: null,
                }
            }
            scope.planAux = {
                request: {
                    pIdPlan: null,
                }
            }

            /*variables request instancia*/
            scope.Instancia = {
                request: {
                    instanciaN: {
                        ip_asterisk: null,
                        no_mascara_red_lan: null,
                        no_mascara_open_vpn: null,
                        id_cliente: 0,
                        il_estado: true,
                        il_libre: false,
                        puerto_ssh_asterisk: 22,
                        puerto_openvpn: null,
                        sim_pais: null,
                        sim_provincia: null,
                        full_provincia: null,
                        no_organi: null,
                        no_email: null,
                        id_estadoinst: 1,
                        no_instancia: null,
                        no_password_ldap: null,
                        inicial: null,
                        id_detapedido: null,
                        il_seguridad:true
                    }
                }
            };
            scope.nuAnexos = null;
            var requestConsultAnexos = {};
            scope.Listacli = [];
            scope.nuDocumentoAutocompletar = function (variable) {
                if (scope.islistando == false) {
                    scope.nuAnexos;
                    scope.Listacli = [];
                    if (scope.BuscaClienteBtn.request.pNudocide == "" || scope.BuscaClienteBtn.request.pNudocide == null) {
                        scope.BuscaClienteBtn.request.pNudocide = "-999999";
                    }
                    if (variable >= 1) {
                        requestConsultAnexos.pEstado = true;
                        requestConsultAnexos.pNudocide = variable;
                        requestConsultAnexos.pNudocide.toString();
                        clienteService.listaCliente(scope.dataInfo).post({}, requestConsultAnexos, function (result) {
                            if (result.estado == 1) {
                                scope.lsCliente = result.lsClientesN;
                                scope.totalItems = scope.lsCliente.length;

                                if (scope.totalItems > 0) {
                                    for (var i = 0; i < scope.totalItems; i++) {
                                        var ru = scope.lsCliente[i].ruc;
                                        scope.Listacli[i] = ru;
                                    }
                                    scope.islistando = true;
                                    scope.DetallePedido.request.idCliente = scope.lsCliente[0].idCliente;
                                    scope.Instancia.request.instanciaN.id_cliente = scope.lsCliente[0].idCliente;
                                    scope.nombre = scope.lsCliente[0].noRazonSocial;
                                    scope.Instancia.request.instanciaN.no_organi = scope.nombre;
                                    scope.listaDetallePedidos();
                                } else {
                                    scope.nombre = "";
                                    scope.BuscaClienteBtn.request.pNudocide = null;
                                    toastr.remove();
                                    toastr.info('No se econtró cliente', 'Info', viewConfig.toastConfig);
                                }

                            } else if (result.estado == -1 || result.estado == 0) {
                                console.error('Error: ' + result.mensaje);
                            }
                        }, function (error) {
                            console.error('Error: ' + error);
                        });
                    }
                }
            }
            scope.nudoc = null;
            scope.listarClic = function () {
                scope.Listacli = [];
                scope.BuscaClienteBtn.request.pNudocide = scope.nuAnexos
                clienteService.listaCliente(scope.dataInfo).post({}, scope.BuscaClienteBtn.request, function (result) {
                    if (result.estado == 1) {
                        scope.lsCliente = result.lsClientesN;
                        scope.totalItems = scope.lsCliente.length;
                        if (scope.totalItems > 0) {
                            for (var i = 0; i < scope.totalItems; i++) {
                                var ru = scope.lsCliente[i].ruc;
                                scope.Listacli[i] = ru;
                            }
                            scope.DetallePedido.request.idCliente = scope.lsCliente[0].idCliente;
                            scope.Instancia.request.instanciaN.id_cliente = scope.lsCliente[0].idCliente;
                            scope.nombre = scope.lsCliente[0].noRazonSocial;
                            scope.Instancia.request.instanciaN.no_organi = scope.nombre;

                            scope.listaDetallePedidos();
                        } else {
                            scope.nombre = "";
                            scope.BuscaClienteBtn.request.pNudocide = null;
                            toastr.remove();
                            toastr.info('No se econtró cliente', 'Info', viewConfig.toastConfig);
                        }
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            //
            //
            scope.registrarInstancia = function () {
                gestionInstanciaService.insertaInstanciaN(scope.dataInfo).post({}, scope.Instancia.request, function (result) {
                    ;
                    if (result.estado == 1) {
                        //  $timeout(function () {}, 30000);//el descansito de 3seg
                        toastr.remove();
                        toastr.success("Registro exitoso", 'Acción realizada', viewConfig.toastConfig);
                        scope.cancel();
                    } else if (result.estado == -1 || result.estado == 0) {
                        toastr.remove();
                        toastr.error(result.mensaje, 'Error', viewConfig.toastConfig);
                    }
                }, function (error) {
                    toastr.remove();
                    toastr.error(result.mensaje, 'Error', viewConfig.toastConfig);
                });
            }
            scope.dis=true;
            scope.listaDetallePedidos = function () {
                pedidoService.listarDetallePedido(scope.dataInfo).post({}, scope.DetallePedido.request, function (result) {
                    scope.lsdetallepedido = result.lsdetaped;
                    if (scope.lsdetallepedido.length > 0) {
                        scope.dis=false;
                    } else {
                        toastr.remove();
                        toastr.info('No cuenta con algún pedido', 'Info', viewConfig.toastConfig);
                        scope.dis=true;
                    }
                    scope.islistando = false;
                }, function (error) {
                    console.error(error);
                })
            };

            scope.listadoPlan = function (param) {
                scope.Instancia.request.instanciaN.id_detapedido = param.idDetallePedido;
                scope.planAux.request.pIdPlan = param.idPlan;
                gestionInstanciaService.listaCantidadAnexos(scope.dataInfo).post({}, scope.planAux.request, function (result) {
                    scope.lsPlan = result.lsplanAnexos;
                    scope.Instancia.request.instanciaN.inicial = scope.lsPlan[0].caAnexos;
                }, function (error) {
                    console.error(error);
                })
            };
            scope.control = true;
            scope.listarPais = function () {
                territorioService.listaTerritorio(scope.dataInfoNew).post({}, scope.pais.request, function (result) {
                    if (result.estado == 1) {
                        scope.lspaises = result.territoriolist;
                    } else if (result.estado == -1) {
                    }
                }, function (error) {
                    console.log(error);
                })
            }
            scope.combochangeP = function () {
                scope.ciudad.request.pCoPais = scope.Instancia.request.instanciaN.sim_pais;
                scope.listarciudad();
            }
            scope.combochangeC = function (param) {
                scope.Instancia.request.instanciaN.sim_provincia = param.codigo;
                scope.Instancia.request.instanciaN.full_provincia = param.nombre;
            }

            scope.lsciudades = [];
            scope.listarciudad = function () {
                scope.ciudad.request.pCoPais = scope.Instancia.request.instanciaN.sim_pais;
                territorioService.listaTerritorio(scope.dataInfoNew).post({}, scope.ciudad.request, function (result) {
                    if (result.estado == 1) {
                        scope.lsciudades = result.territoriolist;
                        scope.control = false;
                        if (scope.lsciudades.length == 0) { 
                            scope.control = true;
                            scope.Instancia.request.instanciaN.sim_provincia = "";
                            scope.Instancia.request.instanciaN.full_provincia = "";
                            console.log("no se encontro ciudades en este pais");
                        }
                    } else if (result.estado == -1) {
                    }
                }, function (error) {
                    console.log(error);
                })
            }
            scope.listarPais();


            /**
             * [listaInstanciaXId listar instancias por id de instancia]
             * @return {[type]} [listado de objetos instancia]
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

        }]);
