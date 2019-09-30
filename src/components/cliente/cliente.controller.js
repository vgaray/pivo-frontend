angular.module('cliente')
    .controller('clienteController', ['clienteService', 'localStorageService', '$location', '$log', '$timeout', 'viewConfig', '$uibModal',
        function (clienteService, localStorageService, $location, $log, $timeout, viewConfig, $uibModal) {
            var scope = this;
            scope.maxruc = 20;
            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                }
            scope.itemComboConstantsEstado =
                [
                    { idestado: true, value: "ACTIVO" },
                    { idestado: false, value: "IN ACTIVO" }
                ]

            scope.dataModal = {

            }
            scope.frmData = {

                name_page_title: "Lista de Grabacion de Llamadas",
                name_buscar: "Buscar",
                listaClientes: {
                    request: {
                        clienteN: {
                            noRazonSocial: "",
                            nuDocIde: "",
                            direcc: "",
                            telef: "",
                            correoEle: "",
                            personRef: "",
                            estado: true,
                            idTipdoc: 0,
                            nuDocumentoPref: "",
                            idTipdocPref: 0,
                            nuCelularPref: "",
                            nuFijoPref: "",

                        },
                        BuscaEli: {
                            pIdCliente: null,
                            pNoRazon: null,
                            pNudocide: null,
                            pEstado: true,
                        }
                    },
                    response: {
                        idCliente: 0,
                        noRazonSocial: "",
                        ruc: "",
                        nuDocIde: "",
                        direcc: "",
                        telef: "",
                        correoEle: "",
                        personRef: "",
                        estado: false,
                        idTipdoc: 0,
                        nuDocumentoPref: "",
                        idTipdocPref: 0,
                        nuCelularPref: "",
                        nuFijoPref: "",
                        totalRegistros: 0
                    },
                }
            }

            scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.paginate = function (value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.lsCliente.indexOf(value);
                return (begin <= index && index < end);
            };
            scope.mostrar = true;
            scope.combochange = function (value) {
                scope.frmData.listaClientes.request.BuscaEli.pEstado = value.idestado;
                scope.listaClientes()
            }
            scope.lsCliente = [];
            scope.enable = true;
            scope.listaClientes = function () {

                if (scope.frmData.listaClientes.request.BuscaEli.pNoRazon == "") {
                    scope.frmData.listaClientes.request.BuscaEli.pNoRazon = null;
                }
                if (scope.frmData.listaClientes.request.BuscaEli.pNudocide == "") {
                    scope.frmData.listaClientes.request.BuscaEli.pNudocide = null;
                }
                clienteService.listaCliente(scope.dataInfo).post({}, scope.frmData.listaClientes.request.BuscaEli, function (result) {
                    if (result.estado == 1) {
                        scope.lsCliente = result.lsClientesN;
                        scope.enable = scope.lsCliente[0].estado;
                        scope.totalItems = scope.lsCliente.length;
                        if (scope.frmData.listaClientes.request.BuscaEli.pEstado == true) {
                            scope.mostrar = true;
                        } else {
                            scope.mostrar = false;
                        }
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.consultarCliente = function (idconsul, estadoconsul) {
                var modalInstance = $uibModal.open({

                    templateUrl: 'src/components/cliente/clienteDetalle/clienteDetalle.template.html',
                    controller: 'clienteDetalleController as Ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        idRecibido: function () {
                            return idconsul;
                        }, estadorecibido: function () {
                            return estadoconsul;
                        }
                    }
                });

                modalInstance.result.then(function (clientedetail) {
                    scope.listaClientes();
                });
            }
            scope.verPedidos = function (idconsul, estadoconsul) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/cliente/clienteDetallePedido/clienteDetallePedido.template.html',
                    controller: 'clienteDetallePedidoController as Ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    width: 1000,
                    resolve: {
                        idRecibido: function () {
                            return idconsul;
                        }, estadorecibido: function () {
                            return estadoconsul;
                        }
                    }
                });

                modalInstance.result.then(function (clientedetail) {
                    scope.listaClientes();
                });
            }

            scope.rpCliente = function (id, estadoconsul) {

            }

            scope.eliminarCliente = function (idconsul) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/cliente/clienteEliminar/clienteEliminar.template.html',
                    controller: 'clienteEliminarController as Ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        idRecibido: function () {
                            return idconsul;
                        }
                    }
                });

                modalInstance.result.then(function (clientedetail) {
                    scope.listaClientes();
                });
            }

            scope.openModalAgregarPedido = function (idCliente) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/cliente/clienteAgregarPedido/clienteAgregarPedido.template.html',
                    controller: 'clienteAgregarPedidoController as Ctrl',
                    backdrop: 'static',
                    resolve: {
                        idRecibido: function () {
                            return idCliente;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.listaClientes();
                });
            }

            scope.raCliente = function (id, estadoconsul) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/cliente/clienteRA/clienteRA.template.html',
                    controller: 'clienteRAController as Ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        idRecibido: function () {
                            return id;
                        },
                        estadorecibido: function () {
                            return estadoconsul;
                        }
                    }
                });

                modalInstance.result.then(function (clientedetail) {
                    scope.listaClientes();
                });
            }

            scope.OnloadPage = function () {
                scope.listaClientes();
            }

            scope.OnloadPage();
        }
    ]);
