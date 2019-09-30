angular.module('gestionMascotas')
    .controller('gestionMascotasCtrl', ['$state', '$location', 'mascotaService', '$log', '$timeout', 'viewConfig', 'localStorageService', '$uibModal',
        function ($state, $location, mascotaService, $log, $timeout, viewConfig, localStorageService, $uibModal) {
            var scope = this;
            ;
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token")
            }

            scope.dataModal = {};
            scope.frmData = {
                name_page_title: "Lista de las mascotas pendientes",
                mascota: {
                    listar: {
                        request: {
                            pIdMascota: null,
                            pCodUsuario: scope.dataInfo.codUsuario,
                            pNuChip: "",
                            pTiFun: 1
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
            scope.historiaClinicaAR = function (idMascota,noNombre) {
                scope.dataModal = [];
                scope.dataModal.idMascota = idMascota;
                scope.dataModal.noNombre=noNombre;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/gestionMascotas/historiaClinicaAR/historiaClinicaAR.template.html',
                    controller: 'historiaClinicaARController as Ctrl',
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
                ;
                scope.dataModal = [];
                scope.dataModal.idMascota = idMascota;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/gestionMascotas/gestionMascotasAR/gestionMascotasAR.template.html',
                    controller: 'gestionMascotasARController as Ctrl',
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
                    templateUrl: 'src/components/gestionMascotas/gestionMascotasEliminar/gestionMascotasEliminar.template.html',
                    controller: 'gestionMascotasEliminarController as Ctrl',
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
            scope.listarMascota = function () {
                ;
                if (scope.frmData.mascota.listar.request.pNuChip != null) {

                    if (scope.frmData.mascota.listar.request.pNuChip.trim() == "") {
                        scope.frmData.mascota.listar.request.pNuChip = null;
                    }
                }
                mascotaService.listar(scope.dataInfo).post({}, scope.frmData.mascota.listar.request, function (result) {
                    debugger;
                    if (result.estado == 1) {
                        scope.listaMascota = result.lsMascota;
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.onLoadPage = function () {
                scope.listarMascota();
            }

            scope.onLoadPage();
        }
    ]);
