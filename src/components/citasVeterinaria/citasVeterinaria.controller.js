angular.module('citasVeterinaria')
    .controller('citasVeterinariaController', ['citaVeterinariaService', 'localStorageService', '$location', '$log', '$timeout', 'viewConfig', '$uibModal',
        function (citaVeterinariaService, localStorageService, $location, $log, $timeout, viewConfig, $uibModal) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                }

            scope.comboTipoDocumento =
                [
                    { idTipoDocumento: null, noAbreviatura: "Todos" },
                    { idTipoDocumento: 1, noAbreviatura: "DNI" },
                    { idTipoDocumento: 2, noAbreviatura: "RUC" },
                ]
            scope.comboEstado =
                [
                    { idTipoEstado: null, noEstado: "Todos" },
                    { idTipoEstado: 1, noEstado: "Pendiente" },
                    { idTipoEstado: 2, noEstado: "Confirmado" },
                    { idTipoEstado: 3, noEstado: "Atendido" }
                ]

            scope.frmData = {
                name_page_title: "Lista de citas de la Veterinaria",
                name_buscar: "Buscar",
                cita: {
                    listar: {
                        request: {
                            pNuDocumento: "",
                            pIdTipoDocumento: null,
                            pIdEstado: null,
                            pTiFun: 1

                        },
                        response: {
                            feRegistro: "00-00-00",
                            feReserva: "00-00-00",
                            hoFinal: "00:00:00",
                            hoInicio: "00:00:00",
                            idActividad: null,
                            idCita: 0,
                            idEstado: 0,
                            idMascota: 0,
                            idTurno: null,
                            idUsuario: 0,
                            noActividad: "",
                            noCita: "",
                            noCorreo: "",
                            noDescripcion: "",
                            noDuenio: "",
                            noEspecie: "",
                            noMascota: "",
                            noPeriodo: "",
                            noRaza: "",
                            noTipoDocumento: "",
                            noTurno: "",
                            nuContacto: "",
                            nuDocumento: "",
                            nuTelefono: "",
                            noEstado: ""
                        },
                    },
                }
            }
            scope.noAbreviatura = "Todos";
            scope.combochangeTipoDocumento = function (value) {
                scope.frmData.personal.listar.request.pIdTipoDocumento = value.idTipoDocumento;
                scope.noAbreviatura = value.noAbreviatura;
                scope.listarCita();
            }
            scope.noEstado = "Todos";
            scope.combochangeEstado = function (value) {
                debugger;
                scope.frmData.cita.listar.request.pIdEstado = value.idTipoEstado;
                scope.noEstado = value.noEstado;
                scope.listarCita();
            }
            
            scope.eliminarPersonal = function (id, nombre) {
                scope.dataModal = [];
                scope.dataModal.pIdPersonal = id;
                scope.dataModal.nombre = nombre;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/personal/personalEliminar/personalEliminar.template.html',
                    controller: 'personalEliminarController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarPersonal();
                });
            }

            scope.RAcitasVeterinaria = function (cita) {
                scope.dataModal = [];
                scope.dataModal = cita;
                //debugger;
                var modalInstance = $uibModal.open({
                    //templateUrl: 'src/components/citasVeterinaria/citasVeterinariaAR/citasVeterinariaAR.template.html',
                    //controller: 'citasVeterinariaARController as Ctrl',
                    templateUrl: 'src/components/citasVeterinaria/citasVeterinariaAR/citasVeterinariaAR.template.html',
                    controller: 'citasVeterinariaARController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarCita();
                });
            }
            scope.options = {
                legend: { display: true }
            }
            scope.listarCita = function () {
                citaVeterinariaService.listar(scope.dataInfo).post({}, scope.frmData.cita.listar.request, function (result) {
                    if (result.estado == 1) {
                        scope.listaCita = result.listaCita;
                        if (scope.listaCita.length == 0) {
                            toastr.remove();
                            toastr.warning("Consulta vacía", 'Advertencia', viewConfig.toastConfig);

                        } else {
                            //Etiquetas
                        }

                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }

            scope.OnloadPage = function () {
                scope.listarCita();
            }

            scope.OnloadPage();
        }
    ]);
