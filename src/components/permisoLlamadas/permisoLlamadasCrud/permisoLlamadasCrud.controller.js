(function() {
  'use strict';
  angular.module('permisoLlamadas')
    .controller('permisoLLamadaCrudCtrl', ['localStorageService', '$location', 'permisoLlamadasService', '$uibModal', '$uibModalInstance', 'idUsuario', 'viewConfig', '$log', '$timeout', '$filter',
      function(localStorageService, $location, permisoLlamadasService, $uibModal, $uibModalInstance, idUsuario, viewConfig, $log, $timeout, $filter) {
        var scope = this;
        scope.varnab = $location.search();
        scope.dataInfo = {
          codUsuario: localStorageService.get("codUsuario"),
          token: localStorageService.get("token"),
          idInstancia: scope.varnab.idInstancia
        }

        scope.modal = {
          nombreNuevo: "Nuevo Usuario",
          nombreEditar: "Editar Usuario"
        };

        /**
         * variables para el request usuario
         */
        scope.usuario = {
          idUsuario: idUsuario,
          noApepat: null,
          noApemat: null,
          noNombre: null,
          noPuesto: null,
          nuPin: null,
          tiLlamad: 0,
          idEmpare: null,
          idSip: null,
          ilfijloca: null,
          ilfijnaci: null,
          ilfijinte: null,
          ilcelNac: null,
          ilcelInt: null,
          ilcelRpm: null
        };
        /*** variables para empresa area
         */
        scope.empresaArea = {
          idPadre: 0,
          nombre: null
        };
        scope.centroCosto = {
          nombre: null
        };
        scope.disabRenovarMensual = false;
        scope.msjMinCuota = true;
        /**
         * funcion para insertar usuario
         */
        scope.insertarUsuario = function() {
          if (scope.usuario.tiLlamad == null) {
            scope.usuario.tiLlamad = 0;
          }
          permisoLlamadasService.insertaUsuario(scope.dataInfo).post({}, scope.usuario, function(result) {
            if (result.estado == 1 && result.insertado == 1) {
              toastr.success('Inserción exitosa', 'Permiso llamadas', viewConfig.toastConfig);
              scope.ok();
              console.log(result.mensaje);

            } else if (result.estado == -1 || result.estado == 0 || result.insertado == 0) {
              toastr.error("No se puede Agregar, revise sus datos", "Error", viewConfig.toastConfig);
              console.log(result.mensaje);
            }
          }, function(error) {
            console.log("error" + error);
          });
        };
        /**
         * funcion para editar usuario
         */
        scope.actualizarUsuario = function() {
          if (scope.usuario.tiLlamad == null) {
            scope.usuario.tiLlamad = 0;
          }              
          if (scope.usuario.nuPin == "****") {
            scope.usuario.nuPin=null;
          }
          // else{
          //   scope.usuario.nuPin=scope.tempNuPin;
          // }                                    
          permisoLlamadasService.actualizaUsuario(scope.dataInfo).post({}, scope.usuario, function(result) {
            if (result.estado == 1) {
              toastr.success('Actualización exitosa', 'Permiso llamadas', viewConfig.toastConfig);
              scope.ok();
              console.log(result.mensaje);
            } else if (result.estado == -1) {
              toastr.error("No se puede Actualizar, revise sus datos", "Error", viewConfig.toastConfig);
              console.log(result.mensaje);
            }
          }, function(error) {
            console.log("error " + error);
          })
        };
        /**
         * Function para listar el usuario por id segun el registro listado
         */
        scope.tempNuPin=null;
        scope.listaUsuarioId = [];
        scope.listarUsuarioId = function() {
          permisoLlamadasService.listaUsuarioXId(scope.dataInfo).post({}, scope.usuario, function(result) {
            if (result.estado == 1) {
              scope.listaUsuarioId = result.tbUsuarioListaxId;
              for (var i = 0; i < scope.listaUsuarioId.length; i++) {
                scope.usuario.noNombre = scope.listaUsuarioId[i].noNombre;
                scope.usuario.noApepat = scope.listaUsuarioId[i].noApepat;
                scope.usuario.noApemat = scope.listaUsuarioId[i].noApemat;
                // scope.usuario.nuPin    = parseInt(scope.listaUsuarioId[i].nuPin);
                scope.tempNuPin        = scope.listaUsuarioId[i].nuPin;
                scope.usuario.nuPin    = "****";
                scope.usuario.noPuesto = scope.listaUsuarioId[i].noPuesto;
                scope.usuario.tiLlamad = scope.listaUsuarioId[i].tiLlamad;
                //empresa
                scope.empresaAreaPorCentroListar();
                scope.empresaArea.idPadre = scope.listaUsuarioId[i].idArea;
                scope.empresaArea.nombre = scope.listaUsuarioId[i].nomArea;
                scope.usuario.idEmpare = scope.listaUsuarioId[i].idEmpare;
                scope.centroCosto.nombre = scope.listaUsuarioId[i].nomCentroCosto;
                scope.usuario.idSip = scope.listaUsuarioId[i].idSip;
                scope.usuario.ilfijloca = scope.listaUsuarioId[i].ilfijloca;
                scope.usuario.ilfijnaci = scope.listaUsuarioId[i].ilfijnaci;
                scope.usuario.ilfijinte = scope.listaUsuarioId[i].ilfijinte;
                scope.usuario.ilcelNac = scope.listaUsuarioId[i].ilcelnaci;
                scope.usuario.ilcelInt = scope.listaUsuarioId[i].ilcelinte;
                scope.usuario.ilcelRpm = scope.listaUsuarioId[i].ilcelrpm;
              }
            } else if (result.estado == -1) {
              console.log(result.mensaje);
              console.log(result.codError);
            }
          }, function(error) {
            console.log("error " + error);
          })
        };
        scope.listarUsuarioId();
        scope.opcion = {
          general: "general",
          General: "General",
          GENERAL: "GENERAL"
        }
        /**
         * funcion para listar empresa area
         */
        scope.empresaAreaListar = [];
        scope.areaListar = function() {
          permisoLlamadasService.listaEmpresaArea(scope.dataInfo).post({}, {}, function(result) {
            if (result.estado == 1) {
              scope.empresaAreaListar = result.empresaAreaList;
              if (scope.usuario.idUsuario == null || scope.usuario.idUsuario == "" || scope.usuario.idUsuario == undefined) {
                for (var i = 0; i < result.empresaAreaList.length; i++) {
                  if (result.empresaAreaList[i].nombre == scope.opcion.general || result.empresaAreaList[i].nombre == scope.opcion.General || result.empresaAreaList[i].nombre == scope.opcion.GENERAL) {
                    scope.empresaArea.idPadre = result.empresaAreaList[i].idEmpare;
                    scope.empresaArea.nombre = result.empresaAreaList[i].nombre;
                    scope.empresaAreaPorCentroListar(scope.empresaArea.idPadre);
                    // scope.empresaAreaXCentro.idEmpare = scope.empresaAreaXCentroListar.idEmpare;
                    // scope.centroCosto.nombre = scope.empresaAreaXCentroListar.nombre;
                  }
                }
              }
              console.log(scope.empresaAreaXCentroListar);
            } else if (result.estado == 0 || result.estado == -1) {
              console.log(result.mensaje);
            }
          }, function(error) {
            console.log('error' + error);
          });
        };

        /**
         * funcion para listar empresa /area por centro
         */
        scope.empresaAreaXCentroListar = [];
        scope.empresaAreaPorCentroListar = function() {
          // scope.empresaArea.idPadre = scope.usuario.idEmpare;
          permisoLlamadasService.listaEmpresaAreaXCentro(scope.dataInfo).post({}, scope.empresaArea, function(result) {
            if (result.estado == 1) {
              scope.empresaAreaXCentroListar = result.listaAreaxCentro;
            } else if (result.estado == 0 || result.estado == -1) {
              console.log(result.mensaje);
            }
          }, function() {
            console.log("error" + error);
          });
        };
        /**
         * funcion para listar extension
         */
        scope.extensionListar = [];
        scope.listarExtension = function() {
          permisoLlamadasService.listaExtension(scope.dataInfo).post({}, {}, function(result) {
            if (result.estado == 1) {
              scope.extensionListar = result.extensionList;
            } else if (result.estado == 1) {
              toastr.error(result.mensaje, 'No se ha podido mostrar extension', viewConfig.toastConfig);
            }
          }, function(error) {
            console.log('error ' + error);
          });
        };
        /**
         * [buscarPin para corroborar que no se repitan los numeros de pin]
         * @return {[type]} [description]
         */
        scope.pin = {
          numPin: null
        };
        scope.resultadoPin = false;
        scope.buscarPin = function() {
          scope.pin.numPin = scope.usuario.nuPin;
          permisoLlamadasService.buscaPin(scope.dataInfo).post({}, scope.pin, function(result) {
            if (result.estado == 1 && result.ilExistePin == 1) {

              scope.resultadoPin = true;
              console.log(result.mensaje);
              console.log(scope.resultadoPin);
            } else if (result.estado == -1 || result.estado == 0 || result.ilExistePin == 0) {
              scope.resultadoPin = false;
              console.log(result.mensaje);
              console.log(scope.resultadoPin);
            }
          }, function(error) {
            console.log("error " + error);
          })
        };
        /*================================BOLSA LLAMADAS=====================================================*/
        /*variables bolsa usuario request*/
        scope.bolsaUsuario = {
          idUsuari: idUsuario,
          idTipTel: null,
          idClave: null,
          caMinBol: null,
          caSegBol: null,
          caConSeg: 0,
          caResSeg: 0,
          feIniBol: new Date(),
          feFinBol: new Date(),
          feUltMod: null,
          feUltAsi: null,
          ilActMes: false,
          ilActivo: true,
          ilActivoFiltro: null,
          tipoFiltro: null

        };

        scope.bolsaUsuarioFiltrador = null;
        /*cabecera de tabla listado  bolsa Usuario*/
        scope.bolsaUsuarioHeader = [{
          nameHeader: 'Destino'
        }, {
          nameHeader: 'Min. Asig.'
        }, {
          nameHeader: 'Min. Con.'
        }, {
          nameHeader: 'Fecha Ini'
        }, {
          nameHeader: 'Fecha Fin'
        }, {
          nameHeader: 'Renovar'
        }, {
          nameHeader: 'Activo'
        }];
        /*primary key de tabla bolsaUsuario*/
        scope.pkBolsaUsuario = null;
        scope.msjMinCuota = true;


        /*Destino option*/
        scope.destino = [
          {
            valueDestino: '1#1',
            nomDestino: 'Fijo - Local'
          },
          {
            valueDestino: '1#2',
            nomDestino: 'Fijo - Nacional'
          },
          {
            valueDestino: '1#3',
            nomDestino: 'Fijo - Internacional'
          },
          {
            valueDestino: '2#2',
            nomDestino: 'Celular - Nacional'
          },
          {
            valueDestino: '2#3',
            nomDestino: 'Celular - Internacional'
          },
          {
            valueDestino: '2#4',
            nomDestino: 'Celular - RPM'
          }
        ];

        scope.destinoFiltroUsuario = [{
            idFiltro: 1,
            nomFiltro: 'Destino'
          },
          {
            idFiltro: 2,
            nomFiltro: 'Cuota Min.'
          },
          {
            idFiltro: 3,
            nomFiltro: 'Min Asignados'
          },
          {
            idFiltro: 4,
            nomFiltro: 'Min. Consum.'
          },
          {
            idFiltro: 5,
            nomFiltro: 'Fecha Inicio'
          },
          {
            idFiltro: 6,
            nomFiltro: 'Fecha Fin'
          },
          {
            idFiltro: 7,
            nomFiltro: 'Activo'
          },
          {
            idFiltro: 8,
            nomFiltro: 'Autorenovar'
          }
        ];

        scope.bolsaFiltrado = {
          idUsuari: idUsuario,
          tipoFiltro: 0,
          ilActivoFiltro: 0
        };

        scope.funcionFiltradorUsuario = function() {
          scope.bolsaFiltrado.ilActivoFiltro = scope.bolsaUsuario.ilActivoFiltro;

          if ((scope.bolsaUsuarioFiltrador == null || scope.bolsaUsuarioFiltrador == "0") && (scope.bolsaUsuario.ilActivoFiltro == 0 || scope.bolsaUsuario.ilActivoFiltro == null)) {

            scope.bolsaUsuarioNormal = {
              idUsuari: idUsuario,
              idTipTel: null,
              idClave: null,
              caMinBol: null,
              caSegBol: null,
              caConSeg: 0,
              caResSeg: 0,
              feIniBol: new Date(),
              feFinBol: new Date(),
              feUltMod: null,
              feUltAsi: null,
              ilActMes: false,
              ilActivo: true,
              ilActivoFiltro: null,
              tipoFiltro: null

            };


              permisoLlamadasService.listaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaUsuarioNormal, function(result) {
                if (result.estado == 1) {
                  scope.listBolsaUsuario = result.listarBolsaUsuario;
                  scope.totalItems = scope.listBolsaUsuario.length;
                } else if (result.estado == -1 || result.estado == 0 || result.insertado == 0) {
                  toastr.error(result.mensaje, 'No se ha podido Mostrar', viewConfig.toastConfig);
                }
              }, function(error) {
                console.log("error " + error);
              });

          } else {

            if(scope.bolsaUsuarioFiltrador == null || scope.bolsaUsuarioFiltrador == ""){
              scope.bolsaFiltrado.tipoFiltro = 0;
              if (scope.bolsaFiltrado.ilActivoFiltro == 1){
                scope.bolsaFiltrado.ilActivoFiltro = 0;
              }
              else {
                  scope.bolsaFiltrado.ilActivoFiltro = 1;
              }
            }
            else {
               scope.bolsaFiltrado.tipoFiltro = parseInt(scope.bolsaUsuarioFiltrador);
               if (scope.bolsaFiltrado.ilActivoFiltro == 1){
                 scope.bolsaFiltrado.ilActivoFiltro = 0;
               }
               else {
                   scope.bolsaFiltrado.ilActivoFiltro = 1;
               }
            }

            permisoLlamadasService.listaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaFiltrado, function(result) {
              if (result.estado == 1) {
                scope.listBolsaUsuario = result.listarBolsaUsuario;
                scope.totalItems = scope.listBolsaUsuario.length;
              } else if (result.estado == -1 || result.estado == 0 || result.insertado == 0) {
                toastr.error(result.mensaje, 'No se ha podido Mostrar', viewConfig.toastConfig);
              }
            }
          , function(error) {
              console.log("error " + error);
            });

          }
          console.log(scope.bolsaFiltrado.ilActivoFiltro);
          /*    if (scope.bolsaUsuarioFiltro.tipoFiltro == 0 || scope.bolsaUsuarioFiltro.ilActivo == false) {
                scope.listaBolsaUsuario();
            }
            else {

              permisoLlamadasService.listaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaUsuarioFiltro, function (result) {
                  scope.listBolsaUsuario = result.listarBolsaUsuario;
              });
            }
*/
        };

        /* variable model destino*/
        scope.destinoOption = null;
        /*obtenemos el idtiptel y idclave*/
        scope.cambiaTipo = function() {
          var resultDestino = scope.destinoOption;
          var result = resultDestino.split("#");
          scope.bolsaUsuario.idTipTel = result[0];
          scope.bolsaUsuario.idClave = result[1];
        };
        /**
         * [insertaBolsaUsuario Insertar bolsa de llamadas por usuario registrado]
         * @return {[type]} [description]
         */
        scope.insertaBolsaUsuario = function() {
          scope.bolsaUsuario.feIniBol = $filter('date')(new Date(scope.bolsaUsuario.feIniBol), 'yyyy-MM-dd');
          scope.bolsaUsuario.feFinBol = $filter('date')(new Date(scope.bolsaUsuario.feFinBol), 'yyyy-MM-dd');
          scope.bolsaUsuario.caSegBol = scope.bolsaUsuario.caMinBol * 60;
          if (scope.minDisponible > scope.bolsaUsuario.caMinBol) {
            permisoLlamadasService.insertaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaUsuario, function(result) {
              if (result.estado == 1) {
                scope.listaBolsaUsuario();
                scope.destinoOption = null;
                scope.bolsaUsuario = {
                  idUsuari: idUsuario,
                  idTipTel: null,
                  idClave: null,
                  caMinBol: null,
                  caSegBol: null,
                  caConSeg: 0,
                  caResSeg: 0,
                  feIniBol: new Date(),
                  feFinBol: new Date(),
                  feUltMod: null,
                  feUltAsi: null,
                  ilActMes: false,
                  ilActivo: true
                };
                scope.minDisponible = 0;
                scope.disabRenovarMensual = false;
                scope.msjMinCuota = true;
                toastr.success(scope.mensajeRegistrado, 'Bolsa de llamadas Usuario', viewConfig.toastConfig);
              } else if (result.estado == -1) {
                toastr.error(result.mensaje, 'Bolsa de llamadas Usuario', viewConfig.toastConfig);
                scope.bolsaUsuario = {
                  idUsuari: idUsuario,
                  idTipTel: null,
                  idClave: null,
                  caMinBol: null,
                  caSegBol: null,
                  caConSeg: 0,
                  caResSeg: 0,
                  feIniBol: new Date(),
                  feFinBol: new Date(),
                  feUltMod: null,
                  feUltAsi: null,
                  ilActMes: false,
                  ilActivo: true
                };
                scope.disabRenovarMensual = false;
                scope.msjMinCuota = true;
                scope.minDisponible = 0;
                //    scope.bolsaUsuario.feIniBol.setDate(scope.bolsaUsuario.feIniBol.getDate() + 1); ;
              } else if (result.estado == 0) {
                toastr.warning(result.mensaje, 'Bolsa de llamadas Usuario', viewConfig.toastConfig);
                scope.bolsaUsuario = {
                  idUsuari: idUsuario,
                  idTipTel: null,
                  idClave: null,
                  caMinBol: null,
                  caSegBol: null,
                  caConSeg: 0,
                  caResSeg: 0,
                  feIniBol: new Date(),
                  feFinBol: new Date(),
                  feUltMod: null,
                  feUltAsi: null,
                  ilActMes: false,
                  ilActivo: true
                };
                scope.minDisponible = 0;
              }
            }, function(error) {
              console.log("error " + error);
            });
          } else {
            toastr.error('Excede los minutos disponibles', 'Bolsa de llamadas Usuario', viewConfig.toastConfig);
            scope.bolsaUsuario = {
              idUsuari: idUsuario,
              idTipTel: null,
              idClave: null,
              caMinBol: null,
              caSegBol: null,
              caConSeg: 0,
              caResSeg: 0,
              feIniBol: new Date(),
              feFinBol: new Date(),
              feUltMod: null,
              feUltAsi: null,
              ilActMes: false,
              ilActivo: true
            };
            scope.disabRenovarMensual = false;
            scope.minDisponible = 0;
            scope.msjMinCuota = true;
          }
        };
        /*function pobtener los datos del registro para editar registro de bolsas de llamadas*/
        scope.cantMinAnt = 0;
        scope.obtenDataEditar = function(tipTel, idClave, minBol, feIni, feFin, actMes, activo) {
          // document.getElementById('insertaBolsa').style.display="none";
          scope.pkBolsaUsuario = idUsuario + '' + tipTel + '' + idClave + feIni;
          scope.destinoOption = tipTel + "#" + idClave;
          scope.bolsaUsuario.caMinBol = minBol;
          scope.bolsaUsuario.feIniBol = new Date(feIni);
          scope.bolsaUsuario.feIniBol.setDate(scope.bolsaUsuario.feIniBol.getDate() + 1);
          scope.bolsaUsuario.feFinBol = new Date(feFin);
          scope.bolsaUsuario.feFinBol.setDate(scope.bolsaUsuario.feFinBol.getDate() + 1);
          scope.bolsaUsuario.ilActMes = actMes;
          scope.bolsaUsuario.ilActivo = activo;
          scope.cambiaTipo();
          scope.tiempoBolsaDisponible();

          scope.cantMinAnt = scope.bolsaUsuario.caMinBol;
          scope.msjMinCuota = true;

        };
        /**
         * [editaBolsaUsuario Editar bolsa de llamadas por usuario registrado]
         * @return {[type]} [description]
         */
        scope.editaBolsaUsuario = function() {
          scope.cambiaTipo();
          scope.bolsaUsuario.feIniBol = $filter('date')(new Date(scope.bolsaUsuario.feIniBol), 'yyyy-MM-dd');
          scope.bolsaUsuario.feFinBol = $filter('date')(new Date(scope.bolsaUsuario.feFinBol), 'yyyy-MM-dd');
          scope.bolsaUsuario.caSegBol = scope.bolsaUsuario.caMinBol * 60;
          // evaluamos que la cantidad ingresada sea menos a  cantidad de minutos dispomibles
          if (scope.minDisponible > scope.bolsaUsuario.caMinBol) {

            permisoLlamadasService.editaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaUsuario, function(result) {
              if (result.estado == 1 && result.resultado == 1) {

                scope.pkBolsaUsuario = null;
                scope.destinoOption = null;
                scope.bolsaUsuario = {
                  idUsuari: idUsuario,
                  idTipTel: null,
                  idClave: null,
                  caMinBol: null,
                  caSegBol: null,
                  caConSeg: 0,
                  caResSeg: 0,
                  feIniBol: new Date(),
                  feFinBol: new Date(),
                  feUltMod: null,
                  feUltAsi: null,
                  ilActMes: false,
                  ilActivo: false
                };
                scope.listaBolsaUsuario();
                scope.minDisponible = 0;
                scope.disabRenovarMensual = false;
                scope.msjMinCuota = true;
                toastr.success(result.mensaje, 'Bolsa de llamadas Usuario', viewConfig.toastConfig);
              } else if (result.estado == -1 || result.estado == 0 || result.resultado == 0) {
                toastr.error(result.mensaje, 'Bolsa de llamadas Usuario', viewConfig.toastConfig);
              }
            }, function(error) {
              console.log("error " + error);
            });
          } else {
            toastr.error('Excede los minutos disponibles', 'Bolsa de Llamadas', viewConfig.toastConfig);
            scope.msjMinCuota = true;
          }
        };
        /**
         * [listaBolsaUsuario Insertar bolsa de llamadas por usuario registrado]
         * @return {[type]} [description]
         */
        scope.listBolsaUsuario = [];
        scope.listaBolsaUsuario = function() {
          permisoLlamadasService.listaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaUsuario, function(result) {
            if (result.estado == 1) {
              scope.listBolsaUsuario = result.listarBolsaUsuario;
              scope.totalItems = scope.listBolsaUsuario.length;
            } else if (result.estado == -1 || result.estado == 0 || result.insertado == 0) {
              toastr.error(result.mensaje, 'No se ha podido Mostrar', viewConfig.toastConfig);
            }
          }, function(error) {
            console.log("error " + error);
          });
        };
        /**
         * funcion para paginar
         */
        /*variables para paginar*/
        scope.currentPage = 1;
        scope.numPerPage = 5;
        scope.paginate = function(value) {
          var begin, end, index;
          begin = (scope.currentPage - 1) * scope.numPerPage;
          end = begin + scope.numPerPage;
          index = scope.listBolsaUsuario.indexOf(value);
          return (begin <= index && index < end);
        };
        /**
         * [tiempoBolsaDisponible description]
         * @return {[type]} [description]
         */
        scope.bolsaDisponible = {
          idUsuari: idUsuario,
          idTipTel: null,
          idClave: null,
          feIni: null,
          feFin: null
        };
        scope.minDisponible = null;
        scope.minDisponible2 = null;
        scope.tiempoBolsaDisponible = function() {
          scope.bolsaDisponible.idTipTel = scope.bolsaUsuario.idTipTel;
          scope.bolsaDisponible.idClave = scope.bolsaUsuario.idClave;
          scope.bolsaDisponible.feIni = $filter('date')(new Date(scope.bolsaUsuario.feIniBol), 'yyyy-MM-dd');
          scope.bolsaDisponible.feFin = $filter('date')(new Date(scope.bolsaUsuario.feFinBol), 'yyyy-MM-dd');
          if (scope.bolsaDisponible.idUsuari != null && scope.bolsaDisponible.idTipTel != null && scope.bolsaDisponible.idClave != null && scope.bolsaDisponible.feIni != null && scope.bolsaDisponible.feFin != null) {

            permisoLlamadasService.tiempoBolsaDisponible(scope.dataInfo).post({}, scope.bolsaDisponible, function(result) {
              if (result.estado == 1) {
                scope.minDisponible = parseInt(result.minDisponible);
                scope.minDisponible2 = parseInt(result.minDisponible);
              } else if (result.estado == 0 || result.estado == -1) {
                scope.minDisponible = 0;
              }
            }, function(error) {
              console.log(error);
            })
          }
        };

        /**
         * [restaMinutos description]
         * @return {[type]} [description]
         */
        scope.restaMinutos = function() {
          if (scope.pkBolsaUsuario == null) {

            if (scope.bolsaUsuario.caMinBol == null || scope.bolsaUsuario.caMinBol == undefined || scope.bolsaUsuario.caMinBol == 0) {
              scope.tiempoBolsaDisponible();
            }

            scope.minDisponible = scope.minDisponible2 - scope.bolsaUsuario.caMinBol;
          } else if (scope.pkBolsaUsuario != null) {
            if (scope.bolsaUsuario.caMinBol == null || scope.bolsaUsuario.caMinBol == undefined || scope.bolsaUsuario.caMinBol == 0) {
              scope.tiempoBolsaDisponible();
            }

            // scope.cantMinAnt = scope.bolsaUsuario.caMinBol;

            scope.minDisponible = scope.cantMinAnt + scope.minDisponible2 - scope.bolsaUsuario.caMinBol;
          }

        };
        /**
         * [modalDeleteBolsaUsuario description]

         * @return {[type]} [description]
         */
        scope.modalDeleteBolsaUsuario = function(idUsuari, idTipTel, idClave, feIniBol, nomDestino) {
          var modalBolsaUsuarioDelete = $uibModal.open({
            templateUrl: 'src/components/permisoLlamadas/permisoLlamadasCrud/bolsaUsuarioDelete/bolsaUsuarioDelete.template.html',
            controller: 'bolsaUsuarioDeleteController as ctrl',
            keyboard: false,
            backdrop: 'static',
            size: 'sm',
            resolve: {
              pkBolsaUsuari: function() {
                scope.bolsaUsuarioReq = {
                  idUsuari: idUsuari,
                  idTipTel: idTipTel,
                  idClave: idClave,
                  feIniBol: feIniBol,
                  nomDestino: nomDestino
                };
                return scope.bolsaUsuarioReq;
              }
            }

          });
          modalBolsaUsuarioDelete.result.then(function() {
            scope.listaBolsaUsuario();
          }, function() {
            scope.listaBolsaUsuario();
          })
        };

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


        /**
         * [loadModal funciones del modal]
         * @return {[function]} [loadModal]
         */
        scope.loadModal = function() {
          scope.areaListar();
          scope.listarExtension();
        };
        scope.loadModal();

        /* opciones para el calendar1*/
        scope.dt = new Date();
        scope.varia = new Date();
        scope.open = function() {

          $timeout(function() {
            scope.opened = true;
          });


        };
        //Validacion fecha de Inicio

        scope.fechaInicioHoy = function() {
          if (scope.bolsaUsuario.feIniBol < new Date(Date.now())) {
            scope.bolsaUsuario.feIniBol = new Date(Date.now());
          } else if (scope.bolsaUsuario.feFinBol != undefined && scope.bolsaUsuario.feFinBol != null) {
            if (scope.bolsaUsuario.feIniBol > scope.bolsaUsuario.feFinBol) {
              scope.bolsaUsuario.feFinBol = scope.bolsaUsuario.feIniBol;
            }
          }

          scope.lbldias = scope.bolsaUsuario.feIniBol.getDate();
        };

        scope.fechaFin = function() {
          if (scope.bolsaUsuario.feFinBol < scope.bolsaUsuario.feIniBol) {
            scope.bolsaUsuario.feFinBol = scope.bolsaUsuario.feIniBol;
          } else {
            scope.bolsaUsuario.feFinBol = scope.bolsaUsuario.feFinBol;
          }
        }

        scope.compararFechaCaducacion = function(fechaFina) {
          var fechaFinal = new Date(fechaFina),
            fechaActual = new Date(),
            valida = true;
          if (fechaFinal.getTime() < fechaActual.getTime()) {
            valida = true;
          } else {
            valida = false;
          }

          return valida;
        }

        scope.dateOptions = {
          formatYear: 'yyyy',
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
        scope.dt1 = new Date();
        scope.varia1 = new Date();
        scope.open1 = function() {

          $timeout(function() {
            scope.opened1 = true;
          });


        };
        scope.dateOptions1 = {
          formatYear: 'yyyy',
          // maxDate: new Date(2030, 5, 22),
          // minDate: new Date(),
          startingDay: 1
        };
        scope.cambiar1 = function() {

          var d = scope.dt1,
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          scope.varia = year + '-' + month + '-' + day;

        };
        //Verificar si el año actual es Bisiesto
        scope.esAñoBisiesto = function(anio) {
          var valida;
          if ((anio % 4 == 0) && ((anio % 100 != 0) || (anio % 400 == 0))) {
            valida = true;
          } else {
            valida = false;
          }
          return valida;
        };
        //Define la cantidad de Dias a aumentar
        scope.agregarDiasF = function(mesEvaluar, añoEvaluar) {
          if (mesEvaluar === 1 || mesEvaluar === 3 || mesEvaluar === 5 || mesEvaluar === 7 || mesEvaluar === 8 ||
            mesEvaluar === 10 || mesEvaluar === 12) {
            return 30;
          } else if (mesEvaluar === 2) {
            if (scope.esAñoBisiesto(añoEvaluar)) {
              return 28;
            } else {
              return 27;
            }

          } else {
            return 29;
          }
        };
       
        scope.cbDestino = function(id) {
          var lengthDestino = scope.destino;
          var retorno;
          console.log('gg')
          for (var i = 0; i < lengthDestino.length; i++) {
            if (scope.destino[i].valueDestino == id) {
              if (scope.destino[i].nomDestino == "Seleccionar" && scope.bolsaUsuario.caMinBol == null || scope.bolsaUsuario.caMinBol == '') {
                scope.msjMinCuota = true;
              } else {
                retorno = scope.destino[i].nomDestino;
                scope.msjMinCuota = false;
              }

            }

          }
          return retorno;
        };

        scope.convertFecha = function(fechaParam) {
          var d = new Date(fechaParam),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          return day + '-' + month + '-' + year;
        };
        scope.muestraFechaFinal = function(fecha) {

          var sFecha = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()),
            separador = sFecha.indexOf('/') != -1 ? '/' : '-',
            aFecha = sFecha.split(separador),
            fechaFinal = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0],
            mesEvaluar = parseInt(aFecha[1]),
            añoEvaluar = parseInt(aFecha[2]),
            diasAgregar = scope.agregarDiasF(mesEvaluar, añoEvaluar),
            añosAgregar = scope.agregarAñosF(mesEvaluar),
            fechaFinal = new Date(fechaFinal);
          fechaFinal.setDate(fechaFinal.getDate() + diasAgregar);

          var mesImprimir = ((fechaFinal.getMonth + 1) < 10) ? ("0" + (fechaFinal.getMonth() + 1)) : (fechaFinal.getMonth() + 1),
            diaImprimir = ((fechaFinal.getDate()) < 10) ? ("0" + (fechaFinal.getDate())) : (fechaFinal.getDate()),
            anioImprimir = fecha.getFullYear() ;

            if(mesImprimir == 12 && diaImprimir >=1){
            var  fechaFinalResult = mesImprimir + separador + diaImprimir + separador + (anioImprimir + 1) ;
            }else {
              var fechaFinalResult = mesImprimir + separador + diaImprimir + separador + anioImprimir;
            }
            

          return fechaFinalResult;
        };

        scope.mostrarFechaAutomensual = function() {

          if (scope.bolsaUsuario.ilActMes == false) {
            scope.disabRenovarMensual = false;
            scope.bolsaUsuario.feFinBol = scope.bolsaUsuario.feIniBol;
            scope.msjMinCuota = true;

          } else if (scope.bolsaUsuario.ilActMes == true) {
            scope.bolsaUsuario.feFinBol = new Date(scope.muestraFechaFinal(scope.bolsaUsuario.feIniBol));
            scope.disabRenovarMensual = true;
            scope.msjMinCuota = false;

            scope.lbldias = scope.bolsaUsuario.feIniBol.getDate();
          }

          scope.lblMincuota = scope.bolsaUsuario.caMinBol;
        };


        scope.btnHabilitar = true;


        scope.ValidaOpciones = function() {
          if (scope.bolsaUsuario.caMinBol != null && scope.destinoOption != null && scope.bolsaUsuario.feIniBol != null) {
            if (scope.bolsaUsuario.feFinBol != null || scope.bolsaUsuario.ilActMes != false) {
              scope.btnHabilitar = false;
            }
            if (scope.habFecFin = true && scope.bolsaUsuario.ilActMes == true) {
              scope.btnHabilitar = false;
            } else if (scope.habFecFin == true && scope.bolsaUsuario.ilActMes == false || scope.bolsaUsuario.feFinBol == null) {
              scope.btnHabilitar = true;
            }
          } else {
            scope.btnHabilitar = true;
          }
          scope.lblMincuota = scope.bolsaUsuario.caMinBol;
        };


        scope.habilitaMensaje = function() {
          scope.tDestino = scope.cbDestino(scope.destinoOption);
          if (scope.bolsaUsuario.ilActMes == false && scope.bolsaUsuario.caMinBol != null) {
            scope.mensajeRegistrar = "La Cuota de " + scope.bolsaUsuario.caMinBol + " minutos para el destino " + scope.tDestino + " inicia el " + scope.convertFecha(scope.bolsaUsuario.feIniBol) + " y caduca el " + scope.convertFecha(scope.bolsaUsuario.feFinBol) + ".";
            scope.mensajeRegistrado = "La Cuota de " + scope.bolsaUsuario.caMinBol + " minutos para el destino " + scope.tDestino + " inicia el " + scope.convertFecha(scope.bolsaUsuario.feIniBol) + " y caduca el " + scope.convertFecha(scope.bolsaUsuario.feFinBol) + ".";
          } else if (scope.bolsaUsuario.ilActMes == true && scope.bolsaUsuario.caMinBol != null) {
            scope.msjMinCuota = false;
            scope.dia = scope.bolsaUsuario.feIniBol.getDate();
            scope.mensajeRegistrar = "La cuota de " + scope.bolsaUsuario.caMinBol + " minutos se renovara el dia " + scope.dia + " de cada mes de manera ilimitada."
            scope.mensajeRegistrado = "La cuota de " + scope.bolsaUsuario.caMinBol + " minutos se renovara el dia " + scope.dia + " de cada mes."
          }
        }
      }
    ]);

})();
