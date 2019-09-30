
        angular.module('gestionHorario')
            .controller('horarioController', ['gestionHorarioService', 'localStorageService', '$location', '$uibModalInstance', 'items', 'viewConfig', '$timeout', '$log', '$filter', '$uibModal', 
               function(gestionHorarioService, localStorageService, $location, $uibModalInstance, items, viewConfig, $timeout, $log, $filter, $uibModal) {
        
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
                /**
                     * nombres generales para el modal
                */
                scope.modal = {
                    nombreNuevo: 'Nuevo Horario',
                    nombreEditar: 'Editar Horario'
                };
                /*variables de validacion*/
        
                scope.valida = items.idHorario;

                scope.validaOperation = function (valida) {

                    if (valida !=null) {
                        scope.habilitacion = false;
                        scope.valHoraInicio = true ;
                        scope.valHoraFin = true ;
                        scope.valnomDiaSemanaInicio = true ;
                        scope.valnomDiaSemanaFin = true ;
                        scope.valdiaMesInicio = true ;
                        scope.valdiaMesFin = true ;
                        scope.valMesIncio = true ;
                        scope.valMesFin = true ;
                        scope.valtiHorario = true;
                        scope.valnomAudio = true;
                    } 
                    else {
                        scope.habilitacion = true;
                        scope.valHoraInicio = true ;
                        scope.valHoraFin = true ;
                        scope.valnomDiaSemanaInicio = false ;
                        scope.valnomDiaSemanaFin = false ;
                        scope.valdiaMesInicio = false ;
                        scope.valdiaMesFin = false ;
                        scope.valMesIncio = false ;
                        scope.valMesFin = false ;
                        scope.valtiHorario = false;
                        scope.valnomAudio = false;
                    }

                };
            
                /**variables para el  horario*/
                scope.fileUpload = "";
                scope.audioNombreFile = null;
                scope.audioNombre = null;

                

                //  console.log(items.idHorario);
                scope.horarioRequest = {
                    
                    idHorario: items.idHorario,
                    idGrupoHor: items.idGrupoHor,
                    hoInicio: "00:00",
                    hoFin: "23:59",
                    nomDiaSemanaInicio: null,
                    nomDiaSemanaFin: null,
                    nomDiaMesInicio: null,
                    nomDiaMesFin: null,
                    nomMesInicio: null,
                    nomMesFin: null,
                    tiHorario: null,
                    nomAudio: "",
                    base64Audio: ""

                };
            /*arreglo para hora */
            // scope.rangoHora = [];
            // for (var i = 0; i < 24; i++) {
            //     scope.rangoHora.push({ nameHora: i + ':00' });

            // };
            /*validate hora*/
            // scope.validateHora = function() {
            //     if (scope.horarioRequest.hoInicio == null || scope.horarioRequest.hoInicio == "") {
            //         scope.horarioRequest.hoFin = ""
            //     }
            // };

            /*Dias de semana*/
                scope.diaSemanaInicio = [
                    {
                        valueDay: '*',
                        diaSemanaNombre: 'Todos los dias Semana'
                    }, 
                    {
                        valueDay: 'mon',
                        diaSemanaNombre: 'Lunes'
                    }, 
                    {
                        valueDay: 'tue',
                        diaSemanaNombre: 'Martes'
                    }, 
                    {
                        valueDay: 'wed',
                        diaSemanaNombre: 'Miercoles'
                    }, 
                    {
                        valueDay: 'thu',
                        diaSemanaNombre: 'Jueves'
                    }, 
                    {
                        valueDay: 'fri',
                        diaSemanaNombre: 'Viernes'
                    }, 
                    {
                        valueDay: 'sat',
                        diaSemanaNombre: 'Sabado'
                    }, 
                    {
                        valueDay: 'sun',
                        diaSemanaNombre: 'Domingo'
                    }
                ];

                scope.diaSemanaFin = [
                    {
                        valueDay: '*',
                        diaSemanaNombre: 'Todos los dias Semana'
                    }, 
                    {
                        valueDay: 'mon',
                        diaSemanaNombre: 'Lunes'
                    }, 
                    {
                        valueDay: 'tue',
                        diaSemanaNombre: 'Martes'
                    }, 
                    {
                        valueDay: 'wed',
                        diaSemanaNombre: 'Miercoles'
                    }, 
                    {
                        valueDay: 'thu',
                        diaSemanaNombre: 'Jueves'
                    }, 
                    {
                        valueDay: 'fri',
                        diaSemanaNombre: 'Viernes'
                    }, 
                    {
                        valueDay: 'sat',
                        diaSemanaNombre: 'Sabado'
                    }, 
                    {
                        valueDay: 'sun',
                        diaSemanaNombre: 'Domingo'
                    }
                ];

            /*validate dias de semana*/
                scope.validateDayWeek = function() {
                    if (scope.horarioRequest.nomDiaSemanaInicio == '*') {
                        scope.horarioRequest.nomDiaSemanaFin = '*';
                
                        scope.diaSemanaFin = [
                            {
                                valueDay: '*',
                                diaSemanaNombre: 'Todos los dias Semana'
                            }, 
                            {
                                valueDay: 'mon',
                                diaSemanaNombre: 'Lunes'
                            }, 
                            {
                                valueDay: 'tue',
                                diaSemanaNombre: 'Martes'
                            }, 
                            {
                                valueDay: 'wed',
                                diaSemanaNombre: 'Miercoles'
                            }, 
                            {
                                valueDay: 'thu',
                                diaSemanaNombre: 'Jueves'
                            }, 
                            {
                                valueDay: 'fri',
                                diaSemanaNombre: 'Viernes'
                            }, 
                            {
                                valueDay: 'sat',
                                diaSemanaNombre: 'Sabado'
                            }, 
                            {
                                valueDay: 'sun',
                                diaSemanaNombre: 'Domingo'
                            }
                        ];

                    } 
                    
                    else {
                        
                        scope.diaSemanaFin = [
                            {
                                valueDay: 'mon',
                                diaSemanaNombre: 'Lunes'
                            }, 
                            {
                                valueDay: 'tue',
                                diaSemanaNombre: 'Martes'
                            }, 
                            {
                                valueDay: 'wed',
                                diaSemanaNombre: 'Miercoles'
                            }, 
                            {
                                valueDay: 'thu',
                                diaSemanaNombre: 'Jueves'
                            }, 
                            {
                                valueDay: 'fri',
                                diaSemanaNombre: 'Viernes'
                            }, 
                            {
                                valueDay: 'sat',
                                diaSemanaNombre: 'Sabado'
                            }, 
                            {
                                valueDay: 'sun',
                                diaSemanaNombre: 'Domingo'
                            }
                        ];

                    }
                };
            /*Dias del mes*/
                scope.diaMesInicio = [
                    {
                        valueDay: '*',
                        nameDay: 'Todos los Dias del Mes'
                    }
                ];

                for (var i = 1; i <= 31; i++) {
                    scope.diaMesInicio.push({
                        valueDay: i,
                        nameDay: i
                    });
                }

                scope.diaMesFin = [
                    {
                        valueDay: '*',
                        nameDay: 'Todos los Dias del Mes'
                    }
                ];

                for (var i = 1; i <= 31; i++) {
                    scope.diaMesFin.push({
                        valueDay: i,
                        nameDay: i
                    });
                }

            /*meses*/
                scope.nombreMes = [
                    {
                        valueMes: '*',
                        nombreMeses: 'Todos los Meses'
                    }, 
                    {
                        valueMes: 'jan',
                        nombreMeses: 'Enero'
                    }, 
                    {
                        valueMes: 'feb',
                        nombreMeses: 'Febrero'
                    }, 
                    {
                        valueMes: 'mar',
                        nombreMeses: 'Marzo'
                    }, 
                    {
                        valueMes: 'apr',
                        nombreMeses: 'Abril'
                    }, 
                    {
                        valueMes: 'may',
                        nombreMeses: 'Mayo'
                    }, 
                    {
                        valueMes: 'jun',
                        nombreMeses: 'Junio'
                    }, 
                    {
                        valueMes: 'jul',
                        nombreMeses: 'Julio'
                    }, 
                    {
                        valueMes: 'ago',
                        nombreMeses: 'Agosto'
                    }, 
                    {
                        valueMes: 'set',
                        nombreMeses: 'Septiembre'
                    }, 
                    {
                        valueMes: 'oct',
                        nombreMeses: 'Octubre'
                    }, 
                    {
                        valueMes: 'nov',
                        nombreMeses: 'Noviembre'
                    }, 
                    {
                        valueMes: 'dec',
                        nombreMeses: 'Diciembre'
                    }
                ];

                scope.nombreMesFin = [
                    {
                        valueMes: '*',
                        nombreMeses: 'Todos los Meses'
                    }, 
                    {
                        valueMes: 'jan',
                        nombreMeses: 'Enero'
                    }, 
                    {
                        valueMes: 'feb',
                        nombreMeses: 'Febrero'
                    }, 
                    {
                        valueMes: 'mar',
                        nombreMeses: 'Marzo'
                    }, 
                    {
                        valueMes: 'apr',
                        nombreMeses: 'Abril'
                    }, 
                    {
                        valueMes: 'may',
                        nombreMeses: 'Mayo'
                    }, 
                    {
                        valueMes: 'jun',
                        nombreMeses: 'Junio'
                    }, 
                    {
                        valueMes: 'jul',
                        nombreMeses: 'Julio'
                    }, 
                    {
                        valueMes: 'ago',
                        nombreMeses: 'Agosto'
                    }, 
                    {
                        valueMes: 'set',
                        nombreMeses: 'Septiembre'
                    }, 
                    {
                        valueMes: 'oct',
                        nombreMeses: 'Octubre'
                    }, 
                    {
                        valueMes: 'nov',
                        nombreMeses: 'Noviembre'
                    }, 
                    {
                        valueMes: 'dec',
                        nombreMeses: 'Diciembre'
                    }
                ];

                scope.validateDiaMesIni = function() {

                    if (scope.horarioRequest.nomDiaMesInicio > 29) {
                        scope.nombreMes.splice(2, 1);
                    }

                    if (scope.horarioRequest.nomDiaMesInicio > 30) {
                        scope.nombreMes.splice(3, 1);
                        scope.nombreMes.splice(4, 1);
                        scope.nombreMes.splice(6, 1);
                        scope.nombreMes.splice(7, 1);
                    }

                    if (scope.horarioRequest.nomDiaMesInicio < 30) {
                        scope.nombreMes = [
                            {
                                valueMes: '*',
                                nombreMeses: 'Todos los Meses'
                            }, 
                            {
                                valueMes: 'jan',
                                nombreMeses: 'Enero'
                            }, 
                            {
                                valueMes: 'feb',
                                nombreMeses: 'Febrero'
                            }, 
                            {
                                valueMes: 'mar',
                                nombreMeses: 'Marzo'
                            }, 
                            {
                                valueMes: 'apr',
                                nombreMeses: 'Abril'
                            }, 
                            {
                                valueMes: 'may',
                                nombreMeses: 'Mayo'
                            }, 
                            {
                                valueMes: 'jun',
                                nombreMeses: 'Junio'
                            }, 
                            {
                                valueMes: 'jul',
                                nombreMeses: 'Julio'
                            }, 
                            {
                                valueMes: 'ago',
                                nombreMeses: 'Agosto'
                            }, 
                            {
                                valueMes: 'set',
                                nombreMeses: 'Septiembre'
                            }, 
                            {
                                valueMes: 'oct',
                                nombreMeses: 'Octubre'
                            }, 
                            {
                                valueMes: 'nov',
                                nombreMeses: 'Noviembre'
                            }, 
                            {
                                valueMes: 'dec',
                                nombreMeses: 'Diciembre'
                            }
                        ];
                    }

                    if (scope.horarioRequest.nomDiaMesInicio == 30) {

                        scope.nombreMes = [
                            {
                                valueMes: '*',
                                nombreMeses: 'Todos los Meses'
                            }, 
                            {
                                valueMes: 'jan',
                                nombreMeses: 'Enero'
                            }, 
                            {
                                valueMes: 'mar',
                                nombreMeses: 'Marzo'
                            }, 
                            {
                                valueMes: 'apr',
                                nombreMeses: 'Abril'
                            }, 
                            {
                                valueMes: 'may',
                                nombreMeses: 'Mayo'
                            }, 
                            {
                                valueMes: 'jun',
                                nombreMeses: 'Junio'
                            },
                            {
                                valueMes: 'jul',
                                nombreMeses: 'Julio'
                            }, 
                            {
                                valueMes: 'ago',
                                nombreMeses: 'Agosto'
                            }, 
                            {
                                valueMes: 'set',
                                nombreMeses: 'Septiembre'
                            }, 
                            {
                                valueMes: 'oct',
                                nombreMeses: 'Octubre'
                            }, 
                            {
                                valueMes: 'nov',
                                nombreMeses: 'Noviembre'
                            }, 
                            {
                                valueMes: 'dec',
                                nombreMeses: 'Diciembre'
                            }
                        ];
                    }

                    if (scope.horarioRequest.nomDiaMesInicio == '*') {

                        scope.horarioRequest.nomDiaMesFin = '*';

                        scope.diaMesFin = [
                            {
                                valueDay: '*',
                                nameDay: 'Todos los Dias del Mes'
                            }
                        ];

                        for (var i = 1; i <= 31; i++) {
                            scope.diaMesFin.push({
                                valueDay: i,
                                nameDay: i
                            });
                        }
                    } else {
                        scope.diaMesFin = [];
                        for (var i = 1; i <= 31; i++) {
                            scope.diaMesFin.push({
                                valueDay: i,
                                nameDay: i
                            });
                        }
                    }
                };



                scope.validateDiaMesFin = function() {
                    
                    if (scope.horarioRequest.nomDiaMesFin > 29) {

                        scope.nombreMesFin.splice(2, 1);
                    }

                    if (scope.horarioRequest.nomDiaMesFin > 30) {

                        scope.nombreMesFin.splice(3, 1);
                        scope.nombreMesFin.splice(4, 1);
                        scope.nombreMesFin.splice(6, 1);
                        scope.nombreMesFin.splice(7, 1);
                    }

                    if (scope.horarioRequest.nomDiaMesFin < 30) {

                        scope.nombreMesFin = [
                            {
                                valueMes: '*',
                                nombreMeses: 'Todos los Meses'
                            }, 
                            {
                                valueMes: 'jan',
                                nombreMeses: 'Enero'
                            }, 
                            {
                                valueMes: 'feb',
                                nombreMeses: 'Febrero'
                            }, 
                            {
                                valueMes: 'mar',
                                nombreMeses: 'Marzo'
                            }, 
                            {
                                valueMes: 'apr',
                                nombreMeses: 'Abril'
                            }, 
                            {
                                valueMes: 'may',
                                nombreMeses: 'Mayo'
                            }, 
                            {
                                valueMes: 'jun',
                                nombreMeses: 'Junio'
                            }, 
                            {
                                valueMes: 'jul',
                                nombreMeses: 'Julio'
                            }, 
                            {
                                valueMes: 'ago',
                                nombreMeses: 'Agosto'
                            }, 
                            {
                                valueMes: 'set',
                                nombreMeses: 'Septiembre'
                            }, 
                            {
                                valueMes: 'oct',
                                nombreMeses: 'Octubre'
                            }, 
                            {
                                valueMes: 'nov',
                                nombreMeses: 'Noviembre'
                            }, 
                            {
                                valueMes: 'dec',
                                nombreMeses: 'Diciembre'
                            }
                        ];

                    }

                    if (scope.horarioRequest.nomDiaMesFin == 30) {
                        scope.nombreMesFin = [
                            {
                                valueMes: '*',
                                nombreMeses: 'Todos los Meses'
                            },
                            {
                                valueMes: 'jan',
                                nombreMeses: 'Enero'
                            }, 
                            {
                                valueMes: 'mar',
                                nombreMeses: 'Marzo'
                            }, 
                            {
                                valueMes: 'apr',
                                nombreMeses: 'Abril'
                            },
                            {
                                valueMes: 'may',
                                nombreMeses: 'Mayo'
                            }, 
                            {
                                valueMes: 'jun',
                                nombreMeses: 'Junio'
                            }, 
                            {
                                valueMes: 'jul',
                                nombreMeses: 'Julio'
                            }, 
                            {
                                valueMes: 'ago',
                                nombreMeses: 'Agosto'
                            }, 
                            {
                                valueMes: 'set',
                                nombreMeses: 'Septiembre'
                            }, 
                            {
                                valueMes: 'oct',
                                nombreMeses: 'Octubre'
                            }, 
                            {
                                valueMes: 'nov',
                                nombreMeses: 'Noviembre'
                            }, 
                            {
                                valueMes: 'dec',
                                nombreMeses: 'Diciembre'
                            }
                        ];
                    }
                };

                /*validate meses*/
                scope.validateMes = function() {
                    if (scope.horarioRequest.nomMesInicio == '*') {

                        scope.horarioRequest.nomMesFin = '*';

                        scope.nombreMesFin = [
                            {
                                valueMes: '*',
                                nombreMeses: 'Todos los Meses'
                            }, 
                            {
                                valueMes: 'jan',
                                nombreMeses: 'Enero'
                            }, 
                            {
                                valueMes: 'feb',
                                nombreMeses: 'Febrero'
                            }, 
                            {
                                valueMes: 'mar',
                                nombreMeses: 'Marzo'
                            }, 
                            {
                                valueMes: 'apr',
                                nombreMeses: 'Abril'
                            }, 
                            {
                                valueMes: 'may',
                                nombreMeses: 'Mayo'
                            },
                            {
                                valueMes: 'jun',
                                nombreMeses: 'Junio'
                            }, 
                            {
                                valueMes: 'jul',
                                nombreMeses: 'Julio'
                            },
                            {
                                valueMes: 'ago',
                                nombreMeses: 'Agosto'
                            }, 
                            {
                                valueMes: 'set',
                                nombreMeses: 'Septiembre'
                                
                            }, 
                            {
                                valueMes: 'oct',
                                nombreMeses: 'Octubre'
                            }, 
                            {
                                valueMes: 'nov',
                                nombreMeses: 'Noviembre'
                            }, 
                            {
                                valueMes: 'dec',
                                nombreMeses: 'Diciembre'
                            }
                        ];
                    } 
                    else {

                        scope.nombreMesFin = [
                            {
                                valueMes: 'jan',
                                nombreMeses: 'Enero'
                            }, 
                            {
                                valueMes: 'feb',
                                nombreMeses: 'Febrero'
                            }, 
                            {
                                valueMes: 'mar',
                                nombreMeses: 'Marzo'
                            }, 
                            {
                                valueMes: 'apr',
                                nombreMeses: 'Abril'
                            }, 
                            {
                                valueMes: 'may',
                                nombreMeses: 'Mayo'
                            }, 
                            {
                                valueMes: 'jun',
                                nombreMeses: 'Junio'
                            }, 
                            {
                                valueMes: 'jul',
                                nombreMeses: 'Julio'
                            }, 
                            {
                                valueMes: 'ago',
                                nombreMeses: 'Agosto'
                            }, 
                            {
                                valueMes: 'set',
                                nombreMeses: 'Septiembre'
                            }, 
                            {
                                valueMes: 'oct',
                                nombreMeses: 'Octubre'
                            }, 
                            {
                                valueMes: 'nov',
                                nombreMeses: 'Noviembre'
                            }, 
                            {
                                valueMes: 'dec',
                                nombreMeses: 'Diciembre'
                            }
                        ];
                    }
                };
                /*Tipo horario*/
                scope.tipHorario = [

                    {
                        valueTipo: 1,
                        nombreTipo: 'Abierto'
                    }, 
                    {
                        valueTipo: 2,
                        nombreTipo: 'Cerrado'
                    }
                    
                ];

                /*Funciones de Validaciones de campos */
                
                scope.fnValidaDiaSemananInicio = function () {

                    if (scope.horarioRequest.nomDiaSemanaInicio == null) {
                        scope.valnomDiaSemanaInicio = false ;
                    } 
                    else {
                        scope.valnomDiaSemanaInicio = true ;
                        if (scope.horarioRequest.nomDiaSemanaFin == '*'){
                            scope.valnomDiaSemanaFin = true ;
                        }
                    }
                    scope.metodo();
                };
                
                scope.fnValidaDiaSemanaFin = function () {

                    if (scope.horarioRequest.nomDiaSemanaFin == null) {
                        scope.valnomDiaSemanaFin = false ;
                    } else {
                        scope.valnomDiaSemanaFin = true ;
                    }

                    scope.metodo();
                };
                
                scope.fnValidaDiaMesInicio = function () {

                    if (scope.horarioRequest.nomDiaMesInicio == null) {
                        scope.valdiaMesInicio = false ;
                    } else {
                        scope.valdiaMesInicio = true ;
                        if (scope.horarioRequest.nomDiaMesFin == '*') {
                            scope.valdiaMesFin = true ;
                        }
                    }
                    scope.metodo();
                };

                scope.fnValidaDiaMesFin = function () {
                    if (scope.horarioRequest.nomDiaMesFin == null) {
                        scope.valdiaMesFin = false ;
                    } else {
                        scope.valdiaMesFin = true ;
                    }
                    scope.metodo();
                };

                scope.fnValidaMesInicio = function () {
                    if (scope.horarioRequest.nomMesInicio == null) {
                        scope.valMesIncio = false ;
                    } else {
                        scope.valMesIncio = true ;
                        if (scope.horarioRequest.nomMesFin !=null) {
                            scope.valMesFin = true ;
                        }
                    
                    }
                    scope.metodo();
                };

                scope.fnValidaMesFin = function () {
                    if (scope.horarioRequest.nomMesFin == null) {
                    scope.valMesFin = false ;
                    } else {
                    scope.valMesFin = true ;
                    }
                    scope.metodo();
                };
                
                scope.fnValTiHorario = function () {
                    if (scope.horarioRequest.tiHorario == null) {
                    scope.valtiHorario = false ;
                    } else {
                    scope.valtiHorario = true ;
                    if (scope.horarioRequest.tiHorario == 1) {
                        scope.valnomAudio = true ;
                    }
                    else {
                        scope.valnomAudio = false ;
                    } 
                    }
                    scope.metodo();
                }; 

                scope.fnValNomAudio = function () {
                    if (scope.horarioRequest.tiHorario == 2) {
                        
                        scope.valnomAudio = true ;
                    } 
                    scope.metodo();
                };


                scope.metodo = function() {
                    
                    if (scope.valida == null) {
                        if (scope.valnomDiaSemanaInicio == false || scope.valnomDiaSemanaFin == false ||
                            scope.valdiaMesInicio == false || scope.valdiaMesFin == false || scope.valMesIncio == false ||
                            scope.valMesFin == false || scope.valtiHorario == false || scope.valnomAudio == false) {
                            scope.habilitacion = true;
                        }

                        else {
                            scope.habilitacion = false;
                        }
                    } 
                    else {
                        if (scope.valnomDiaSemanaInicio == true && scope.valnomDiaSemanaFin == true &&
                            scope.valdiaMesInicio == true && scope.valdiaMesFin == true && scope.valMesIncio == true 
                            && scope.valMesFin == true && scope.valtiHorario == true && scope.valnomAudio == true) {
                            scope.habilitacion = false;
                        }
                        else {
                            scope.habilitacion = true;
                        }
                    }

                };


                /**
                 * funccion para insertar  horario
                 */
                scope.insertaHorario = function() {

                    if (scope.horarioRequest.idGrupoHor == null) {
                        scope.horarioRequest.idGrupoHor = 0;
                    }

                    if (scope.horarioRequest.hoInicio != null && scope.horarioRequest.hoInicio.length == 4) {
                        scope.horarioRequest.hoInicio = '0' + scope.horarioRequest.hoInicio;
                    }

                    if (scope.horarioRequest.hoFin != null && scope.horarioRequest.hoFin.length == 4) {
                        scope.horarioRequest.hoFin = '0' + scope.horarioRequest.hoFin;
                    }

                    if (scope.horarioRequest.hoInicio == "" || scope.horarioRequest.hoFin == "") {
                        scope.horarioRequest.hoInicio = '*';
                        scope.horarioRequest.hoFin = '*';
                    }
                    // scope.horarioRequest.nomDiaMesInicio = $filter('date')(new Date(scope.horarioRequest.nomDiaMesInicio), 'dd');
                    // scope.horarioRequest.nomDiaMesFin = $filter('date')(new Date(scope.horarioRequest.nomDiaMesFin), 'dd');
                    if (scope.horarioRequest.tiHorario == 1) {
                        
                        scope.horarioRequest.nomAudio=null;
                        scope.horarioRequest.base64Audio =null;

                        gestionHorarioService.insertaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                                if (result.estado == 1) {

                                    scope.ok();
                                    toastr.success('Horario Registrado', 'Horario', viewConfig.toastConfig);
                                    
                                }

                                else if (result.estado == 0) {

                                    toastr.warning(result.mensaje, 'Horario', viewConfig.toastConfig);
                                    
                                
                                } 
                                else if (result.estado == -1) {
                                
                                    toastr.error("No se puede Agregar, revise sus datos", "Error", viewConfig.toastConfig);

                                }
                            }, function(error) {
                                console.log("error" + error);
                            }
                        )
                    }
                    
                    if(scope.horarioRequest.tiHorario == 2){
                        if (scope.fileUpload != null ) {
                            var reader = new FileReader();
                            scope.horarioRequest.nomAudio = scope.fileUpload.name;
                            reader.readAsDataURL(scope.fileUpload);

                            reader.onload = function () {
                                scope.temporal = reader.result;
                                scope.temporal = scope.temporal.replace("data:audio/mp3;base64,", "");
                                scope.horarioRequest.base64Audio = scope.temporal;

                                gestionHorarioService.insertaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                                        if (result.estado == 1) {
            
                                            scope.ok();
                                            toastr.success('Horario Registrado', 'Horario', viewConfig.toastConfig);
                                            
                                        }
            
                                        else if (result.estado == 0) {
            
                                            toastr.warning(result.mensaje, 'Horario', viewConfig.toastConfig);
                                            
                                        
                                        } 
                                        else if (result.estado == -1) {
                                        
                                            toastr.error("No se puede Agregar, revise sus datos", "Error", viewConfig.toastConfig);
            
                                        }
                                    }, function(error) {
                                    console.log("error" + error);
                                    }
                                )
                            };
                            //getBase64(scope.fileUpload);
                        }
                        else {
                            scope.horarioRequest.nomAudio = scope.audioNombre;
                            scope.fileUpload = null;
                            scope.horarioRequest.base64Audio="";
                            gestionHorarioService.insertaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                                    if (result.estado == 1) {

                                        scope.ok();
                                        toastr.success('Horario Registrado', 'Horario', viewConfig.toastConfig);
                                        
                                    }

                                    else if (result.estado == 0) {

                                        toastr.warning(result.mensaje, 'Horario', viewConfig.toastConfig);
                                        
                                    
                                    } 
                                    else if (result.estado == -1) {
                                    
                                        toastr.error("No se puede Agregar, revise sus datos", "Error", viewConfig.toastConfig);

                                    }
                                }, function(error) {
                                    console.log("error" + error);
                                }
                            )
                        }
                    }
 
                };
                /**
                 * function para editar  horario
                 */
                scope.editaHorario = function() {

                    if (scope.horarioRequest.idGrupoHor == null) {
                        scope.horarioRequest.idGrupoHor = 0;
                    }
                  
                    if (scope.horarioRequest.hoInicio == "" || scope.horarioRequest.hoFin == "") {
                        scope.horarioRequest.hoInicio = '*';
                        scope.horarioRequest.hoFin = '*';
                    }
                    if (scope.horarioRequest.hoInicio != null && scope.horarioRequest.hoInicio.length == 4) {
                        scope.horarioRequest.hoInicio = '0' + scope.horarioRequest.hoInicio;
                    }

                    if (scope.horarioRequest.hoFin != null && scope.horarioRequest.hoFin.length == 4) {
                        scope.horarioRequest.hoFin = '0' + scope.horarioRequest.hoFin;
                    }
                    // scope.horarioRequest.nomDiaMesInicio = $filter('date')(new Date(scope.horarioRequest.nomDiaMesInicio), 'dd');
                    // scope.horarioRequest.nomDiaMesFin = $filter('date')(new Date(scope.horarioRequest.nomDiaMesFin), 'dd');
                    /*
                    if (scope.fileUpload == null && scope.horarioRequest.tiHorario == 2) {
                        scope.horarioRequest.nomAudio = scope.audioNombre;
                    }

                    if (scope.fileUpload == null && scope.horarioRequest.tiHorario == 1) {
                        scope.horarioRequest.nomAudio = null;
                        scope.horarioRequest.base64Audio = null;
                    }
                    if (scope.fileUpload != null && scope.horarioRequest.tiHorario == 2) {
                        scope.horarioRequest.nomAudio = scope.fileUpload.filename;
                        scope.horarioRequest.base64Audio = scope.fileUpload.base64;
                    }
*/
                    if( scope.horarioRequest.tiHorario == 1){
                        scope.fileUpload == null;
                        scope.horarioRequest.nomAudio = null;
                        scope.horarioRequest.base64Audio = null;
                        gestionHorarioService.editaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                            if (result.estado == 1 && result.resultado == 1) {
                                scope.ok();
                                toastr.success(result.mensaje, 'Horario', viewConfig.toastConfig);
                                scope.fileUpload.filename = null;
                                scope.fileUpload.base64 = null;
                                scope.audioNombre = null;
                            } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                                toastr.error("No se puede editar, revise sus datos", "Error", viewConfig.toastConfig);
                            }
                        }, function(error) {
                            console.log("error" + error);
                        })
                    } else if (scope.horarioRequest.tiHorario == 2) {
                        if (scope.fileUpload!=null) {
                            var reader = new FileReader();
                            scope.horarioRequest.nomAudio = scope.fileUpload.name;
                            reader.readAsDataURL(scope.fileUpload);

                            reader.onload = function () {
                                scope.temporal = reader.result;
                                scope.temporal = scope.temporal.replace("data:audio/mp3;base64,", "");
                                scope.horarioRequest.base64Audio = scope.temporal;
                                gestionHorarioService.editaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                                    if (result.estado == 1 && result.resultado == 1) {
                                        scope.ok();
                                        toastr.success(result.mensaje, 'Horario', viewConfig.toastConfig);
                                        scope.fileUpload = null;
                                        scope.audioNombre = null;
                                    } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                                        toastr.error("No se puede editar, revise sus datos", "Error", viewConfig.toastConfig);
                                    }
                                }, function(error) {
                                    console.log("error" + error);
                                })
                            };
                        } else {
                            scope.horarioRequest.nomAudio = scope.audioNombre;
                            scope.fileUpload = null;
                            scope.horarioRequest.base64Audio="";

                            gestionHorarioService.editaHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                                if (result.estado == 1 && result.resultado == 1) {
                                    scope.ok();
                                    toastr.success(result.mensaje, 'Horario', viewConfig.toastConfig);
                                    scope.fileUpload = null;
                                    scope.audioNombre = null;
                                } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                                    toastr.error("No se puede editar, revise sus datos", "Error", viewConfig.toastConfig);
                                }
                            }, function(error) {
                                console.log("error" + error);
                            })
                        }
                    }
                    
                };
                /**
                 * function para listar grupo horario
                 */
                scope.listPorIdHorario = [];

                scope.listaPorIdHorario = function() {
                    var listaTamaño = 0;
                    gestionHorarioService.listaPorIdHorario(scope.dataInfo).post({}, scope.horarioRequest, function(result) {
                        
                        if (result.estado == 1) {

                            scope.listPorIdHorario = result.listaPorIdHorario;
                            
                            for (var i = 0; i < scope.listPorIdHorario.length; i++) {
                                scope.horarioRequest.idHorario = scope.listPorIdHorario[i].idHorario;
                                // scope.horarioRequest.idGrupoHor = scope.listPorIdHorario[i].idGrupoHor;
                                scope.horarioRequest.hoInicio = scope.listPorIdHorario[i].hoInicio;
                                scope.horarioRequest.hoFin = scope.listPorIdHorario[i].hoFin;
                                scope.horarioRequest.nomDiaSemanaInicio = scope.listPorIdHorario[i].nomDiaSemanaInicio;
                                scope.horarioRequest.nomDiaSemanaFin = scope.listPorIdHorario[i].nomDiaSemanaFin;
                                scope.horarioRequest.nomDiaMesInicio = scope.listPorIdHorario[i].nomDiaMesInicio;
                                scope.horarioRequest.nomDiaMesFin = scope.listPorIdHorario[i].nomDiaMesFin;
                                scope.horarioRequest.nomMesInicio = scope.listPorIdHorario[i].nomMesInicio;
                                scope.horarioRequest.nomMesFin = scope.listPorIdHorario[i].nomMesFin;
                                scope.horarioRequest.tiHorario = scope.listPorIdHorario[i].tipoHorario;
                                scope.horarioRequest.nomAudio = scope.listPorIdHorario[i].nomAudio;
                            }
                            
                        } 
                        
                        else if (result.estado == -1 || result.estado == 0) {

                            toastr.error("No se puede mostrar horario, revise sus datos", "Error", viewConfig.toastConfig);
                        }
                        listaTamaño = scope.listPorIdHorario.length;
                        if (listaTamaño==0) {
                            scope.audioNombre = null;
                        } else if(listaTamaño>0) {
                            scope.audioNombre = scope.horarioRequest.nomAudio;    
                        }
                    }, function(error) {
                        console.log("error" + error);
                    })
                    
                        
                    scope.validaOperation(scope.valida);
                };
        
                scope.listaPorIdHorario();
             
                
                /**
                 * [ok para cerrar el modal ejecutandose la funcion eliminar]
                 * @return {[type]} [description]
                 */
                scope.ok = function() {
                $uibModalInstance.close();
                };
                /**
                 * [cancel cancela la eliminacion del usuario]
                 * @return {[type]} [description]
                 */
                scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
                };

                /* opciones para el calendar1*/
                scope.dt = new Date();
                scope.varia = new Date();
                scope.open = function() {

                $timeout(function() {
                    scope.opened = true;
                });


                };

                scope.dateOptions = {
                formatYear: 'yy',
                // maxDate: new Date(2020, 5, 22),
                // minDate: new Date(),
                startingDay: 1
                };
                scope.cambiar = function() {
                var d = scope.dt,
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                scope.varia = year + '-' + month + '-' + day;

                };
                /* opciones para el calendar2*/
                // scope.dt = new Date();
                // scope.varia1 = new Date();
                scope.open1 = function() {

                $timeout(function() {
                    scope.opened1 = true;
                });


                };
                scope.dateOptions1 = {
                formatYear: 'yy',
                // maxDate: new Date(2030, 5, 22),
                // minDate: new Date(),
                startingDay: 1
                };
                scope.cambiar1 = function() {

                var d = scope.dt,
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                scope.varia = year + '-' + month + '-' + day;

                };
                /*=======================================================*/
                scope.mytime = new Date();

                scope.hstep = 1;
                scope.mstep = 15;

                scope.options = {
                hstep: [1, 2, 3],
                mstep: [1, 5, 10, 15, 25, 30]
                };

                scope.ismeridian = false;
                // scope.toggleMode = function() {
                //     scope.ismeridian = !scope.ismeridian;
                // };

                scope.update = function() {
                var d = new Date();
                d.setHours(14);
                d.setMinutes(0);
                scope.mytime = d;
                };

                scope.changed = function() {
                $log.log('Time changed to: ' + scope.mytime);
                };

                scope.clear = function() {
                scope.mytime = null;
                };

                scope.nombrarAudio = function(flag) {
                /*    if (scope.horarioRequest.tiHorario == 2 && scope.fileUpload == null && scope.audioNombre!=null) {
                        scope.horarioRequest.nomAudio = scope.audioNombre;
                        scope.fileUpload = null;
                        scope.audioNombre=null;
                    } else {
                        scope.horarioRequest.nomAudio = null;
                        scope.horarioRequest.nomAudio=scope.fileUpload.filename;
                        scope.fileUpload.filename = null;
                    }*/
                    if (flag == 1) {
                        scope.fileUpload = null;
                        scope.horarioRequest.nomAudio = scope.audioNombre;
                    } else {
                        scope.horarioRequest.nomAudio = scope.fileUpload.filename;
                    }
                };

                scope.onLoadModalSoundsDefault = function() {
                
                        sessionStorage.getItem("nombreAudio");
                        var modalInstance = $uibModal.open({
                            templateUrl: 'src/components/gestionHorario/horarioCrud/modalSoundsDefault/modalSoundsDefault.template.html',
                            controller: 'modalSoundsDefaultController as ctrl',
                            size: 'md'
                        });
                        modalInstance.result.then(function(nombreAudio) {
                            scope.audioNombre = nombreAudio;
                            
                            console.log(nombreAudio);
                            
                            scope.valnomAudio = true ;
                            scope.metodo();
                            scope.fileUpload = null;
                            scope.fileUpload.name = null;
                            // scope.nombrarAudio(1);
                        })
                        
                        // scope.onLoadSoundsInServer();
                        };
            
                
                scope.upFile = function () {
                    document.querySelector('#archivo').click();
                   
                };

                scope.validarExtension =function(){
                    if(scope.fileUpload!=null){
                        if(scope.fileUpload!=""){
                            var extension = scope.fileUpload.name.split('.').pop().toLowerCase();
                            if(extension != 'mp3'){
                                scope.audioNombre=null;
                                scope.valnomAudio = false ;
                                scope.metodo();
                                return true;
                            }else{
                                scope.audioNombre=null;
                                scope.valnomAudio = true ;
                                scope.metodo();
                                return false;
                            }    
                        }
                    }            
                };
            }
        ]);

