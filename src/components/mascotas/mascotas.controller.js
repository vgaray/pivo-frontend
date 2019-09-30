angular.module('mascotas')
    .controller('mascotasCtrl', ['$state', '$location', 'mascotaService', '$log', '$timeout', 'viewConfig', 'localStorageService', '$uibModal',
        function ($state, $location, mascotaService, $log, $timeout, viewConfig, localStorageService, $uibModal) {
            var scope = this;
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token")
            }

            scope.dataModal = {};
            scope.frmData = {
                name_page_title: "Lista de las mascotas del usuario",
                mascota: {
                    listar: {
                        request: {
                            pIdMascota: null,
                            pCodUsuario: scope.dataInfo.codUsuario,
                            pNuChip: null,
                            pTiFun: 0
                        },
                        response: {
                            idMascota: 0,
                            noNombre: "",
                            noEspecie: "",
                            noRaza: "",
                            noColor: "",
                            noSeniasParticulares: "",
                            noSexo: 0,
                            nuEdad: 0,
                            nuChip: "",
                            feNacimiento: "",
                            idEspecie: "",
                            idRaza: "",
                        },
                    },
                }
            }
            scope.verHistoria = function (idMascota, noNombre) {
                scope.dataModal = [];
                scope.dataModal.idMascota = idMascota;
                scope.dataModal.noNombre = noNombre;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/mascotas/verHistoriaClinica/verHistoriaClinica.template.html',
                    controller: 'verHistoriaClinicaController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarMascota();
                });
            }
            scope.RAMascota = function (idMascota) {
                scope.dataModal = [];
                scope.dataModal.idMascota = idMascota;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/mascotas/mascotasAR/mascotasAR.template.html',
                    controller: 'mascotaARController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarMascota();
                });
            }
            scope.eliminarMascota = function (id, nombre) {
                scope.dataModal = [];
                scope.dataModal.pIdMascota = id;
                scope.dataModal.nombre = nombre;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/mascotas/mascotasEliminar/mascotasEliminar.template.html',
                    controller: 'mascotasEliminarController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarMascota();
                });
            }
            scope.valExcel = 1;
            scope.vaPdf = 2;
            scope.descargarArchivo = function (valor) {
                scope.enades = true;
                scope.frmData.mascota.listar.request.pIdMascota = null;
                scope.frmData.mascota.listar.request.pCodUsuario = null;
                scope.frmData.mascota.listar.request.pNuChip = null;
                scope.frmData.mascota.listar.request.pTiFun = 0;
                scope.frmData.mascota.listar.request.tipoFile = valor;
                mascotaService.listarReporte(scope.dataInfo).post({}, scope.frmData.mascota.listar.request, function (result) {
                    if (result.estado == 1) {
                        if (valor == 1) {
                            scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                            download(scope.pdf, "listaMascotas.xls", "application/xls");
                        } else if (valor == 2) {
                            scope.pdf = 'data:applicatio/pdf;base64,' + result.reporteFile;
                            download(scope.pdf, "listaMascotas.pdf", "application/pdf");
                        }
                        toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig)
                    } else if (result.estado == 0 || result.estado == -1) {
                        toastr.error("Error al descargar archivo", "Error del Servidor", viewConfig.toastConfig)
                    }
                    scope.enades = false;
                }, function (error) {
                    console.error(error);
                })
            }
            scope.options = {
                legend: { display: true }
            }

            scope.listarReporteMascota = function () {
                debugger;
                scope.frmData.mascota.listar.request.pIdMascota = null;
                scope.frmData.mascota.listar.request.pCodUsuario = null;
                scope.frmData.mascota.listar.request.pNuChip = null;
                scope.frmData.mascota.listar.request.pTiFun = 0;
                mascotaService.listar(scope.dataInfo).post({}, scope.frmData.mascota.listar.request, function (result) {
                    if (result.estado == 1) {
                        scope.labelList = result.graficoMascota.labelList;
                        //arreglo con todas las filas (ingresar 1000 filas numxpag)
                        scope.DataArray = result.graficoMascota.dataUnicaNumber;
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
                index = scope.listaMascota.indexOf(value);
                return (begin <= index && index < end);
            };
            scope.listarMascota = function () {
                scope.frmData.mascota.listar.request.pIdMascota = null;
                scope.frmData.mascota.listar.request.pCodUsuario = scope.dataInfo.codUsuario;
                scope.frmData.mascota.listar.request.pNuChip = null;
                scope.frmData.mascota.listar.request.pTiFun = 0;

                mascotaService.listar(scope.dataInfo).post({}, scope.frmData.mascota.listar.request, function (result) {
                    debugger;
                    if (result.estado == 1) {
                        scope.listaMascota = result.lsMascota;
                        scope.totalItems = scope.listaMascota.length;
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.onLoadPage = function () {
                if (scope.dataInfo.codUsuario == "usuAdminis") {
                    scope.habAdmin = true;
                    scope.listarMascota();
                    scope.listarReporteMascota();


                } else {
                    scope.habAdmin = false;
                    scope.listarMascota();
                }
            }

            scope.onLoadPage();
        }
    ]);
