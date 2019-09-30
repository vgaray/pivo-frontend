angular.module('gestionHistoriaClinica')
    .controller('gestionHistoriaClinicaController', ['historiaClinicaService', 'localStorageService', '$location', '$log', '$timeout', 'viewConfig', '$uibModal',
        function (historiaClinicaService, localStorageService, $location, $log, $timeout, viewConfig, $uibModal) {
            var scope = this;
            scope.varnab = $location.search();
            scope.maxruc = 20;
            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
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
                historiaClinicaService: {
                    request: {
                        pNuChip: "",
                        pNoPass: "",
                        //pidInstancia: 180
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
            scope.historiaClinicaAR = function (idMascota, noNombre, nuChip) {
                debugger;
                scope.dataModal = [];
                scope.dataModal.idMascota = idMascota;
                scope.dataModal.nuChip = nuChip;
                scope.dataModal.noNombre = noNombre;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/historiaClinicaService/historiaClinicaServiceAR/historiaClinicaServiceAR.template.html',
                    controller: 'historiaClinicaServiceARController as Ctrl',
                    size: "lg",
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listaHistoriaClinica();
                });
            }
            scope.lsHistoriaClinica = [];
            scope.enable = true;
            scope.listaHistoriaClinica = function () {
                debugger;
                historiaClinicaService.listarServiceHC(scope.dataInfo).post({}, scope.frmData.historiaClinicaService.request, function (result) {
                    debugger;
                    if (result.estado == 1) {
                        scope.lsHistoriaClinica = result.lsHistoriaClinica;
                        scope.totalItems = scope.lsHistoriaClinica.length;
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.paginate = function (value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.lsHistoriaClinica.indexOf(value);
                return (begin <= index && index < end);
            };
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
                scope.listaHistoriaClinica();
            }

            scope.OnloadPage();
        }
    ]);
