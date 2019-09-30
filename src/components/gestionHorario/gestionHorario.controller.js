(function () {
    'use strict';
    angular.module('gestionHorario')
        .controller('gestionHorarioController', ['gestionHorarioService', 'localStorageService', '$location', '$uibModal', 'viewConfig', function (gestionHorarioService, localStorageService, $location, $uibModal, viewConfig) {
            var scope = this;
            /**
             * variables para pasar por el header del servicio
             * @type {[type]}
             */
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            };
            /**variables para la grupo horario*/

            scope.grupoHorarioRequest = { idGrupoHor: null, nomGrupoHor: null };
            /**variables para la  horario*/
            scope.horarioRequest = {
                idHorario: null,
                idGrupoHor: null,
                hoInicio: null,
                hoFin: null,
                nomDiaSemanaInicio: null,
                nomDiaSemanaFin: null,
                nomDiaMesInicio: null,
                nomDiaMesFin: null,
                nomMesInicio: null,
                nomMesFin: null,
                tiHorario: null,
                nomAudio: null
            };
            scope.headersHorario = [
                { nombreColumna: 'Hora Inicio', namebk: 'hoInicio' },
                { nombreColumna: 'Hora Fin', namebk: 'hoFin' },
                { nombreColumna: 'D. Sem Inicio', namebk: 'nomDiaSemanaInicio' },
                { nombreColumna: 'D. Sem Fin', namebk: 'nomDiaSemanaFin' },
                { nombreColumna: 'D. Mes Inicio', namebk: 'nomDiaMesInicio' },
                { nombreColumna: 'D. Mes Fin', namebk: 'nomDiaMesFin' },
                { nombreColumna: 'Mes Inicio', namebk: 'nomMesInicio' },
                { nombreColumna: 'Mes Fin', namebk: 'nomMesFin' },
                { nombreColumna: 'Tipo Hora.', namebk: 'tiHorario' },
                { nombreColumna: 'Audio', namebk: 'nomAudio' },
            ];

            // scope.pintar=function(id){

            //     document.getElementById("#select_"+id).focus();

            // }

            /**
             * function para listar grupo horario
             */
            scope.listGrupoHorario = [];
            scope.listaGrupoHorario = function () {
                gestionHorarioService.listaGrupoHorario(scope.dataInfo).post({}, {}, function (result) {
                    if (result.estado == 1) {
                        scope.listGrupoHorario = result.listaGrupoHorario;

                    } else if (result.estado == -1 || result.estado == 0) {
                        toastr.error("No se puede mostrar grupo horario, revise sus datos", "Error", viewConfig.toastConfig);
                    }
                }, function (error) {
                    console.log("error" + error);
                })
            };

            /**
             * function para CRUD grupo horario
             */
            scope.modalGrupoHorarioCrud = function (idGrupoHorario) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/gestionHorario/grupoHorarioCrud/grupoHorarioCrud.template.html',
                    controller: 'grupoHorarioController as ctrl',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'sm',
                    resolve: {
                        idGrupoHorario: function () {
                            return idGrupoHorario;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.listaGrupoHorario();
                }, function () {
                    scope.listaGrupoHorario();
                });
            };
            /*Modal eliminar*/
            scope.modalGrupoHorarioDelete = function (idGrupoHorario) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/gestionHorario/grupoHorarioDelete/grupoHorarioDelete.template.html',
                    controller: 'grupoHorarioDeleteController as ctrl',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'sm',
                    resolve: {
                        idGrupoHorario: function () {

                            return idGrupoHorario;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.listaGrupoHorario();
                }, function () {
                    scope.listaGrupoHorario();
                });
            };

            /*=======================================================================================*/


            /**
             * function para listar horario
             */
            scope.listHorario = [];
            scope.listaHorario = function () {
                gestionHorarioService.listaHorario(scope.dataInfo).post({}, scope.horarioRequest, function (result) {
                    if (result.estado == 1) {
                        scope.listHorario = result.listaHorario;

                    } else if (result.estado == -1 || result.estado == 0) {
                        toastr.error("No se puede mostrar horario, revise sus datos", "Error", viewConfig.toastConfig);
                    }
                }, function (error) {
                    console.log("error" + error);
                })
            };

            /*Modal para el mantenimiento de horario*/
            scope.horarioCrudModal = function (idGrupoHorario) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/gestionHorario/horarioCrud/horarioCrud.template.html',
                    controller: 'horarioController as ctrl',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'md',
                    resolve: {
                        items: function () {
                            scope.horarioRequest.idHorario = idGrupoHorario;
                            return scope.horarioRequest;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.listaHorario();
                }, function () {
                    scope.listaHorario();
                });
            };
            /*Modal para el mantenimiento de horario*/
            scope.horarioDeleteModal = function (idHorario) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/gestionHorario/horarioDelete/horarioDelete.template.html',
                    controller: 'horarioDeleteController as ctrl',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'sm',
                    resolve: {
                        idHorario: function () {
                            return idHorario;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.listaHorario();
                }, function () {
                    scope.listaHorario();
                });
            };

            /**
             * obtener el id de grupo horario
             */

            scope.obtenerIdGrupoHorario = function (idGrupoHor) {
                scope.horarioRequest.idGrupoHor = idGrupoHor;
                scope.listaHorario();
            };
            


            scope.isActive = function(id){
                $('.list-group-hor').removeClass('is-active');
                $('.list-group-hor:nth-child('+id+')').addClass('is-active');
            }

            /**
             * [loadPage cuando se inicializa esta vista se ejecuta]
             * @return {[type]} [description]
             */
            scope.loadPage = function () {
                scope.listaGrupoHorario();

            };
            scope.loadPage();
        }]);
})();
