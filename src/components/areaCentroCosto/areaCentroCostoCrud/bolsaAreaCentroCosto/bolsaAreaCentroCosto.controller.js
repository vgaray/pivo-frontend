(
  function() {
    'use strict';
    angular.module("areaCentroCosto")
      .controller('bolsaAreaCentroCostoController', ['areaCentroCostoService', 'localStorageService', '$location', '$uibModalInstance', 'dataCrudBolsaEmpresa', 'viewConfig', '$log', '$timeout', '$filter', '$uibModal',
        function(areaCentroCostoService, localStorageService, $location, $uibModalInstance, dataCrudBolsaEmpresa, viewConfig, $log, $timeout, $filter, $uibModal) {
          var scope = this;
          scope.varnab = $location.search();
          scope.dataInfo = {
            codUsuario: localStorageService.get("codUsuario"),
            token: localStorageService.get("token"),
            idInstancia: scope.varnab.idInstancia
          }

          scope.modal = {
            nombreNuevo: "Nuevo Bolsa Minutos",
            nombreEditar: "Editar Bolsa Minutos"
          };
          // validacion de ip
          scope.allowPort = {
            allowPort: true
          };
          scope.requirePort = {
            requirePort: true
          };
          scope.portConfig = {
            requirePort: false,
            allowPort: true
          };
          /*variables bolsa usuario request*/
          scope.bolsaEmpresa = {
            idEmpare: dataCrudBolsaEmpresa.idEmpare,
            idPadre: dataCrudBolsaEmpresa.idPadre,
            idTipTel: null,
            idClave: null,
            caMinBol: null,
            feIniBol: null,
            feFinBol: null,
            feIniBolActualiza: null,
            ilActivo: false,
            ilActMes: false,
            //Filtro

          };
          scope.bolsaFiltroEmpresa = {

            noFiltro: "Fijo Local",
            tipoFiltro: 1
          }
          /*cabecera de tabla listado  bolsa Usuario*/
          scope.bolsaEmpresaHeader = [{
            nameHeader: 'Destino'
          }, {
            nameHeader: 'Cuota Min.'
          }, {
            nameHeader: 'Min. Asig.'
          }, {
            nameHeader: 'Min. Consum'
          }, {
            nameHeader: 'Fecha Inicio'
          }, {
            nameHeader: 'Fecha Fin'
          }, {
            nameHeader: 'Activo'
          }, {
            nameHeader: 'Auto.'
          }];

          /*primary key de tabla bolsaEmpresa*/
          scope.pkBolsaEmpresa = null;
          /*Destino option*/
          scope.destino = [{
              valueDestino: null,
              nomDestino: ''
            },
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

          scope.destinoFiltro = [
            { idFiltro: 1, nomFiltro: 'Destino'},
            { idFiltro: 2, nomFiltro: 'Cuota Min.'},
            { idFiltro: 3, nomFiltro: 'Min Asignados'},
            { idFiltro: 4, nomFiltro: 'Min. Consum.'},
            { idFiltro: 5, nomFiltro: 'Fecha Inicio'},
            { idFiltro: 6, nomFiltro: 'Fecha Fin'},
            { idFiltro: 7, nomFiltro: 'Activo'},
            { idFiltro: 8, nomFiltro: 'Autorenovar'}
          ]
          /* variable model destino*/
          scope.destinoOption = null;
          /*obtenemos el idtiptel y idclave*/
          scope.cambiaTipo = function() {
            var resultDestino = scope.destinoOption;
            if (resultDestino != undefined) {
              var result = resultDestino.split("#");
              scope.bolsaEmpresa.idTipTel = result[0];
              scope.bolsaEmpresa.idClave = result[1];
            }
          };

          scope.Filtro = null;
          scope.listFiltroBolsa = [];
          scope.listaBolsaEmpresaFiltro = function(){
            areaCentroCostoService.listaFiltroBolsaEmpresa(scope.dataInfo).post({},scope.bolsaEmpresa,function(){
              if(result.estado == 1){
                scope.listFiltroBolsa = result.listaBolsaEmpresa
              } else if(result.estado == -1 || result.estado == 0){
                console.error('Error '+result.mensaje)
              }
            })
          }
          scope.filtroBolsaEmpresa = function(){
            scope.bolsaEmpresa.idEmpare = dataCrudBolsaEmpresa.idPadre;
            scope.bolsaEmpresa.tipoFiltro = scope.FiltroOption.idFiltro;
            scope.bolsaEmpresa.noFiltro = scope.FiltroOption.filtro;
            if(scope.FiltroOption.ilActivoShow == false){
              scope.bolsaEmpresa.ilActivo = null;  
            }else {
              scope.bolsaEmpresa.ilActivo = scope.FiltroOption.ilActivoShow;  
            }

            scope.listaBolsaEmpresaFiltro();

          }

          /**
           * [insertaBolsaEmpresa Insertar Bolsa Empresa por usuario registrado]
           * @return {[type]} [description]
           */

          scope.insertaBolsaEmpresa = function() {
            scope.bolsaEmpresa.feIniBol = $filter('date')(new Date(scope.bolsaEmpresa.feIniBol), 'yyyy-MM-dd');
            scope.bolsaEmpresa.feFinBol = $filter('date')(new Date(scope.bolsaEmpresa.feFinBol), 'yyyy-MM-dd');
            if (dataCrudBolsaEmpresa.idEmpare == dataCrudBolsaEmpresa.idPadre) {
              scope.bolsaEmpresa.idPadre = null;
              scope.minAsig = scope.bolsaEmpresa.caMinBol;
            } else {
              scope.bolsaEmpresa.idEmpare = dataCrudBolsaEmpresa.idPadre;
              scope.bolsaEmpresa.idPadre = dataCrudBolsaEmpresa.idEmpare;
            }
            if (scope.minDisponible > 0 || scope.minAsig > 0) {
              areaCentroCostoService.insertaBolsaEmpresa(scope.dataInfo).post({}, scope.bolsaEmpresa, function(result) {
                if (result.estado == 1 && result.resultado == 1) {
                  scope.listaBolsaEmpresa();
                  scope.destinoOption = null;
                  scope.bolsaEmpresa = {
                    idEmpare: dataCrudBolsaEmpresa.idEmpare,
                    idPadre: dataCrudBolsaEmpresa.idPadre,
                    idTipTel: null,
                    idClave: null,
                    caMinBol: null,
                    feIniBol: null,
                    feFinBol: null,
                    ilActivo: false,
                    ilActMes: false
                  };
                  scope.minDisponible = 0;
                  toastr.remove();
                  toastr.success(scope.mensajeRegistrado, 'Bolsa Empresa', viewConfig.toastConfig);
                  scope.bolsaEmpresa.ilActivo = 1;
                  scope.bolsaEmpresa.feIniBol = new Date(Date.now());
                  scope.bolsaEmpresa.feFinBol = new Date(Date.now());
                  scope.btnHabilitar = true;
                  scope.msjMinCuota = true;
                  scope.habFecFin = false;
                } else if (result.estado == 1 || result.resultado == 0) {
                  toastr.remove();
                  toastr.warning(result.nomMensaje, 'Bolsa Empresa no agregado', viewConfig.toastConfig);
                  //console.log('registro  0')
                } else if (result.estado == -1) {
                  toastr.remove();
                  toastr.error(result.nomMensaje, 'Bolsa Empresa', viewConfig.toastConfig);
                  //console.log('registro -1')
                }
              }, function(error) {
                console.log("error " + error);
              });
            } else {
              toastr.remove();
              toastr.error('Excede los minutos disponibles', 'Bolsa Empresa', viewConfig.toastConfig);
            }
          };
          /*function pobtener los datos del registro para editar registro de bolsas de llamadas*/
          scope.cantMinAnt = 0;
          scope.obtenDataEditar = function(tipTel, idClave, minBol, feIni, feFin, activo, actMes) {
            scope.pkBolsaEmpresa = dataCrudBolsaEmpresa.idEmpare + '' + tipTel + '' + idClave + feIni;
            scope.destinoOption = tipTel + "#" + idClave;
            scope.bolsaEmpresa.caMinBol = minBol;
            scope.bolsaEmpresa.feIniBol = new Date(feIni);
            scope.bolsaEmpresa.feIniBol.setDate(scope.bolsaEmpresa.feIniBol.getDate() + 1);
            scope.bolsaEmpresa.feFinBol = new Date(feFin);
            scope.bolsaEmpresa.feFinBol.setDate(scope.bolsaEmpresa.feFinBol.getDate() + 1);
            scope.bolsaEmpresa.ilActivo = activo;
            scope.bolsaEmpresa.ilActMes = actMes;
            scope.btnHabilitar = false;
            scope.cambiaTipo();
            if (dataCrudBolsaEmpresa.idEmpare != dataCrudBolsaEmpresa.idPadre) {
              scope.tiempoBolsaDisponible();
              scope.cantMinAnt = scope.bolsaEmpresa.caMinBol;
            }
          };
          /**
           * [editaBolsaEmpresa Editar bolsa Empresa por usuario registrado]
           * @return {[type]} [description]
           */
          scope.fechaInicioHoy = function() {
            if (scope.bolsaEmpresa.feIniBol < new Date(Date.now())) {
              scope.bolsaEmpresa.feIniBol = new Date(Date.now());
            } else if (scope.bolsaEmpresa.feFinBol != undefined && scope.bolsaEmpresa.feFinBol != null) {
              if (scope.bolsaEmpresa.feIniBol > scope.bolsaEmpresa.feFinBol) {
                scope.bolsaEmpresa.feFinBol = scope.bolsaEmpresa.feIniBol;
              }
            }
            if (scope.bolsaEmpresa.feIniBol == null || scope.bolsaEmpresa.feIniBol == undefined) {
              scope.lbldias = '';
              scope.bolsaEmpresa.feIniBol = new Date(Date.now());
            } else {
              scope.lbldias = scope.bolsaEmpresa.feIniBol.getDate();
            }
          }
          scope.fechaInicioHoy();

          scope.fechaFin = function() {
            if (scope.bolsaEmpresa.feFinBol < scope.bolsaEmpresa.feIniBol) {
              scope.bolsaEmpresa.feFinBol = scope.bolsaEmpresa.feIniBol;
            } else if (scope.bolsaEmpresa.feFinBol == null || scope.bolsaEmpresa.feFinBol == undefined) {
              scope.bolsaEmpresa.feFinBol = new Date(Date.now());
            }
          }
          scope.fechaFin();
          scope.editaBolsaEmpresa = function() {
            scope.cambiaTipo();
            if (dataCrudBolsaEmpresa.idEmpare == dataCrudBolsaEmpresa.idPadre) {
              scope.bolsaEmpresa.idPadre = null;
              scope.minAsig = scope.bolsaEmpresa.caMinBol;
            } else {
              scope.bolsaEmpresa.idEmpare = dataCrudBolsaEmpresa.idPadre;
              scope.bolsaEmpresa.idPadre = dataCrudBolsaEmpresa.idEmpare;
            }
            scope.bolsaEmpresa.feIniBol = $filter('date')(new Date(scope.bolsaEmpresa.feIniBol), 'yyyy-MM-dd');
            scope.bolsaEmpresa.feFinBol = $filter('date')(new Date(scope.bolsaEmpresa.feFinBol), 'yyyy-MM-dd');
            scope.bolsaEmpresa.feIniBolActualiza = scope.bolsaEmpresa.feIniBol;
            // evaluamos que la cantidad ingresada sea menos a  cantidad de minutos dispomibles
            if (scope.minDisponible >= 0 || scope.minAsig > 0) {

              areaCentroCostoService.editaBolsaEmpresa(scope.dataInfo).post({}, scope.bolsaEmpresa, function(result) {
                if (result.estado == 1 && result.resultado == 1) {
                  scope.listaBolsaEmpresa();
                  scope.pkBolsaEmpresa = null;
                  scope.destinoOption = null;
                  scope.bolsaEmpresa = {
                    idEmpare: dataCrudBolsaEmpresa.idEmpare,
                    idPadre: dataCrudBolsaEmpresa.idPadre,
                    idTipTel: null,
                    idClave: null,
                    caMinBol: null,
                    feIniBol: null,
                    feFinBol: null,
                    ilActivo: false,
                    ilActMes: false
                  };
                  scope.minDisponible = 0;
                  toastr.remove();
                  toastr.success(result.nomMensaje, 'Bolsa Empresa', viewConfig.toastConfig);
                  scope.bolsaEmpresa.ilActivo = 1;
                  scope.bolsaEmpresa.feIniBol = new Date(Date.now());
                  scope.bolsaEmpresa.feFinBol = new Date(Date.now());
                  scope.btnHabilitar = true;
                  scope.msjMinCuota = true;
                  scope.habFecFin = false;
                } else if (result.estado == 1 || result.resultado == 0) {
                  toastr.remove();
                  toastr.warning(result.nomMensaje, 'Bolsa Empresa', viewConfig.toastConfig);
                } else if (result.estado == -1) {
                  toastr.remove();
                  toastr.error(result.mensaje, 'Bolsa Empresa', viewConfig.toastConfig);
                }
              }, function(error) {
                console.log("error " + error);
              });
            } else {
              toastr.remove();
              toastr.error('Excede los minutos disponibles', 'Bolsa Empresa', viewConfig.toastConfig);
            }
          };
          /**
           * [listaBolsaEmpresa Insertar Bolsa Empresa por usuario registrado]
           * @return {[type]} [description]
           */

          scope.listBolsaEmpresa = [];
          scope.listaBolsaEmpresa = function() {
            if (scope.bolsaEmpresa.idEmpare != scope.bolsaEmpresa.idPadre) {
              scope.bolsaEmpresa.idEmpare = dataCrudBolsaEmpresa.idPadre;
            }
            scope.bolsaEmpresa.ilActivo = true;
            areaCentroCostoService.listaBolsaEmpresa(scope.dataInfo).post({}, scope.bolsaEmpresa, function(result) {
              if (result.estado == 1) {                
                scope.listBolsaEmpresa = result.listaBolsaEmpresa;
                scope.totalItems = scope.listBolsaEmpresa.length;
                var d = new Date(Date.now());
                var mes = (d.getMonth() + 1);
                var dia = d.getDate();
                var anio = d.getFullYear();
                if (mes.length < 2) mes = '0' + mes;
                if (dia.length < 2) dia = '0' + dia;
                var retorno = dia + '-' + mes + '-' + anio;
                var returnOtro = anio+'-'+mes+'-'+dia;
               //console.log(scope.listBolsaEmpresa);                             
                
                //console.log(new Date(Date.now()) + " - "+ new Date(scope.listBolsaEmpresa[0].feFinBol));
                for (var i = 0; i < scope.listBolsaEmpresa.length; i++) {                
                  scope.nombreDestino = scope.listBolsaEmpresa[i].nomTipTel + ' ' + scope.listBolsaEmpresa[i].nomClave;
                  if (scope.listBolsaEmpresa[i].ilActivo == true) {
                    scope.listBolsaEmpresa[i].ilActivo = 1;
                  } else if (scope.listBolsaEmpresa[i].ilActivo == false) {
                    scope.listBolsaEmpresa[i].ilActivo = 0;
                  }
                }
                scope.comparaFechasBolsa();
              } else if (result.estado == -1 || result.estado == 0 || result.insertado == 0) {
                toastr.remove();
                toastr.error(result.mensaje, 'No se ha podido Mostrar', viewConfig.toastConfig);
              }
            }, function(error) {
              console.log("error " + error);
            });
          };

          scope.comparaFechasBolsa = function(){
            for (var i = 0; i < scope.listBolsaEmpresa.length; i++) {
              var editBolsaOp = angular.element(document.querySelectorAll('#table-det-bolsa tbody tr:nth-child('+(i+1)+') td:nth-child(9)'));
              if(new Date(scope.listBolsaEmpresa[i].feFinBol) < new Date(Date.now())){
                //console.log(editBolsaOp.html());
                editBolsaOp.html("");
                editBolsaOp.attr('disabled');
                //console.log(i + " - " + scope.listBolsaEmpresa[i].nomTipTel + scope.listBolsaEmpresa[i].nomClave);                
                
              }
            }
          }
          scope.listaBolsaEmpresa();
          scope.ejecutaBolsaFechas = function(){
            
            $.when( scope.listaBolsaEmpresa() ).then( 
            function(){              
              scope.comparaFechasBolsa();
            } );
            
          }
          scope.ejecutaBolsaFechas();
          //Buscar bolsa empresa por filtro
          scope.listFiltroBolsaEmpresa = [];
          scope.changeIlActivoFiltro = function(){
            scope.bolsaEmpresa.idEmpare = scope.bolsaEmpresa.idEmpare;
            if(scope.ilFiltroActivoShow == 1){
              scope.bolsaEmpresa.tipoFiltro = null;
              scope.bolsaEmpresa.noFiltro = null;
              scope.bolsaEmpresa.ilActivo = true;
              scope.listaFiltBolsaEmpresa();
            }else if(scope.ilFiltroActivoShow == 0){
              scope.bolsaEmpresa.ilActivo = true;
              scope.listaBolsaEmpresa();
            }
          }
          scope.filtroBolsaEmpresa = function(){
              scope.bolsaEmpresa.idEmpare = scope.bolsaEmpresa.idEmpare;
              scope.bolsaEmpresa.tipoFiltro = scope.FiltroOption.idFiltro;
              scope.bolsaEmpresa.noFiltro = scope.filtroNombre;
              scope.ilFiltroActivoShow = false;
              scope.listaFiltBolsaEmpresa();
          }
          
          scope.listaFiltBolsaEmpresa = function() {                        
            /*
            console.log('id '+scope.bolsaEmpresa.idEmpare + " tipoFiltro "+ scope.FiltroOption.idFiltro
                      +" filtro "+scope.filtroNombre +" activo "+scope.bolsaEmpresa.ilActivo)*/
            areaCentroCostoService.listaFiltroBolsaEmpresa(scope.dataInfo).post({}, scope.bolsaEmpresa, function(result) {
              if (result.estado == 1) {
                scope.listBolsaEmpresa = result.listaBolsaEmpresa;  
              } else if (result.estado == -1 || result.estado == 0) {
                toastr.remove();
                toastr.error(result.mensaje, 'Error', viewConfig.toastConfig);
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
          scope.numPerPage = 6;
          scope.paginate = function(value) {
            var begin, end, index;
            begin = (scope.currentPage - 1) * scope.numPerPage;
            end = begin + scope.numPerPage;
            index = scope.listBolsaEmpresa.indexOf(value);
            return (begin <= index && index < end);
          };

          /**
           * [tiempoBolsaDisponible description]
           * @return {[type]} [description]
           */
          scope.bolsaDisponible = {
            idCentro: dataCrudBolsaEmpresa.idPadre,
            idTipTel: null,
            idClave: null,
            feIni: null,
            feFin: null
          };
          scope.minDisponible = 0;
          scope.minDisponible2 = 0;
          scope.tiempoBolsaDisponible = function() {
            if (dataCrudBolsaEmpresa.idEmpare != dataCrudBolsaEmpresa.idPadre) {
              scope.bolsaDisponible.idTipTel = scope.bolsaEmpresa.idTipTel;
              scope.bolsaDisponible.idClave = scope.bolsaEmpresa.idClave;
              scope.bolsaDisponible.feIni = $filter('date')(new Date(scope.bolsaEmpresa.feIniBol), 'yyyy-MM-dd');
              scope.bolsaDisponible.feFin = $filter('date')(new Date(scope.bolsaEmpresa.feFinBol), 'yyyy-MM-dd');
              if (scope.bolsaDisponible.idCentro != null && scope.bolsaDisponible.idTipTel != null && scope.bolsaDisponible.idClave != null && scope.bolsaDisponible.feIni != null) {

                //&& scope.bolsaDisponible.feFin != null
                areaCentroCostoService.bolsaDisponibleArea(scope.dataInfo).post({}, scope.bolsaDisponible, function(result) {
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
            }
          };
          scope.btnHabilitar = true;
          scope.ValidaOpciones = function() {
            if (scope.bolsaEmpresa.caMinBol != null && scope.destinoOption != null && scope.bolsaEmpresa.feIniBol != null) {
              if (scope.bolsaEmpresa.feFinBol != null || scope.bolsaEmpresa.ilActMes != false) {
                scope.btnHabilitar = false;
              }
              if (scope.habFecFin = true && scope.bolsaEmpresa.ilActMes == true) {
                scope.btnHabilitar = false;
              } else if (scope.habFecFin == true && scope.bolsaEmpresa.ilActMes == false || scope.bolsaEmpresa.feFinBol == null) {
                scope.btnHabilitar = true;
              }
            } else {
              scope.btnHabilitar = true;
            }
            scope.lblMincuota = scope.bolsaEmpresa.caMinBol;
          }

          /*    scope.formatDate = function(input) {
                  var datePart = input.match(/\d+/g),
                      year = datePart[3], // get only two digits .substring(2) para recortar la cadena
                      month = datePart[1],
                      day = datePart[0];

                  return day + '-' + month + '-' + year;
              }
          */
          //Filtro tabla

          scope.buscaTabla = function() {
            var busqueda = document.getElementById("buscar");
            var tabla = document.getElementById("table-det-bolsa").tBodies[0];
            var texto = busqueda.value.toLowerCase();
            var tdBolsa = document.getElementsByClassName('tr-table-bolsa');
            var r = 0;
            //while( tdBolsa= scope.totalItems)//tabla.rows[r++])
            {
              // if ( tdBolsa.innerText.toLowerCase().indexOf(texto) !== -1 )
              // tdBolsa.style.display = null;
              // else
              // tdBolsa.style.display = 'none';
            }
          }


          scope.habFecFin = false;
          scope.msjMinCuota = true;
          scope.habilitaFecFin = function() {
            if (scope.bolsaEmpresa.ilActMes == false) {
              scope.bolsaEmpresa.feFinBol == null;
              scope.habFecFin = false;
              scope.bolsaEmpresa.feFinBol = '';
            } else if (scope.bolsaEmpresa.ilActMes == true) {
              scope.habFecFin = true;
            }
          }

          scope.convertFecha = function(fechaParam) {
            var d = new Date(fechaParam),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return day + '-' + month + '-' + year;
          }

          scope.cbDestino = function(id) {
            var lengthDestino = scope.destino;
            var retorno;
            for (var i = 0; i < lengthDestino.length; i++) {
              if (scope.destino[i].valueDestino == id) {
                if (scope.destino[i].nomDestino == "Seleccionar" && scope.bolsaEmpresa.caMinBol == null || scope.bolsaEmpresa.caMinBol == '') {
                  scope.msjMinCuota = true;
                } else {
                  retorno = scope.destino[i].nomDestino;
                  scope.msjMinCuota = false;
                }

              }

            }
            return retorno;
          }

          scope.habilitaMensaje = function() {
            scope.tDestino = scope.cbDestino(scope.destinoOption);
            if (scope.bolsaEmpresa.ilActMes == false && scope.bolsaEmpresa.caMinBol != null) {
              scope.mensajeRegistrar = "La Cuota de " + scope.bolsaEmpresa.caMinBol + " minutos para el destino " + scope.tDestino + " inicia el " + scope.convertFecha(scope.bolsaEmpresa.feIniBol) + " y caduca el " + scope.convertFecha(scope.bolsaEmpresa.feFinBol) + ".";
              scope.mensajeRegistrado = "La Cuota de " + scope.bolsaEmpresa.caMinBol + " minutos para el destino " + scope.tDestino + " inicia el " + scope.convertFecha(scope.bolsaEmpresa.feIniBol) + " y caduca el " + scope.convertFecha(scope.bolsaEmpresa.feFinBol) + ".";
            } else if (scope.bolsaEmpresa.ilActMes == true && scope.bolsaEmpresa.caMinBol != null) {
              scope.msjMinCuota = false;
              scope.dia = scope.bolsaEmpresa.feIniBol.getDate();
              scope.mensajeRegistrar = "La cuota de " + scope.bolsaEmpresa.caMinBol + " minutos se renovara el dia " + scope.dia + " de cada mes de manera ilimitada."
              scope.mensajeRegistrado = "La cuota de " + scope.bolsaEmpresa.caMinBol + " minutos se renovara el dia " + scope.dia + " de cada mes."
            }
          }

          /**
           * [restaMinutos Resa la cantidad de minutos ingresados con los existendes en la base de datos]
           * @return {[type]} [description]
           */
          scope.restaMinutos = function() {
            if (dataCrudBolsaEmpresa.idEmpare != dataCrudBolsaEmpresa.idPadre) {

              if (scope.pkBolsaEmpresa == null) {

                if (scope.bolsaEmpresa.caMinBol == null || scope.bolsaEmpresa.caMinBol == undefined || scope.bolsaEmpresa.caMinBol == 0) {
                  scope.tiempoBolsaDisponible();
                }

                scope.minDisponible = scope.minDisponible2 - scope.bolsaEmpresa.caMinBol;
              } else if (scope.pkBolsaEmpresa != null) {
                if (scope.bolsaEmpresa.caMinBol == null || scope.bolsaEmpresa.caMinBol == undefined || scope.bolsaEmpresa.caMinBol == 0) {
                  scope.tiempoBolsaDisponible();
                }

                // scope.cantMinAnt = scope.bolsaEmpresa.caMinBol;

                scope.minDisponible = scope.cantMinAnt + scope.minDisponible2 - scope.bolsaEmpresa.caMinBol;

              }
            }
          };
          /* valida si es padre o area*/
          scope.validaEmparePadre = false;
          if (dataCrudBolsaEmpresa.idEmpare != dataCrudBolsaEmpresa.idPadre) {
            scope.validaEmparePadre = true
          };

          /*Modal para eliminar bolsa empresa*/
          scope.modalDeleteBolsaEmpresa = function(idEmpare, idTipTel, idClave, feIniBol, nomDestino) {
            var modalInstanceDelete = $uibModal.open({
              templateUrl: 'src/components/areaCentroCosto/areaCentroCostoCrud/bolsaAreaCentroCosto/bolsaAreaCentroDelete/bolsaAreaCentroDelete.template.html',
              controller: 'bolsaAreaCentroDeleteController as ctrl',
              keyboard: false,
              backdrop: 'static',
              size: 'sm',
              resolve: {
                pkBolsaEmpresa: function() {
                  scope.boslaEmpresaReq = {
                    idEmpare: idEmpare,
                    idTipTel: idTipTel,
                    idClave: idClave,
                    feIniBol: feIniBol,
                    nomDestino: nomDestino
                  };
                  return scope.boslaEmpresaReq;
                }
              }
            });
            modalInstanceDelete.result.then(function() {
              scope.listaBolsaEmpresa();
            }, function() {
              scope.listaBolsaEmpresa();
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

          /* opciones para el calendar1*/
          scope.dt = new Date();
          scope.varia = new Date();
          scope.open = function() {

            $timeout(function() {
              scope.opened = true;
            });
          };

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

          scope.bolsaEmpresa.ilActivo = 1


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

          scope.agregarAñosF = function (mesEvaluar) {
            if (mesEvaluar == 12){
               return 1;
            }
            else {
              return 0;
            }
          };
          scope.muestraFechaFinal = function(fecha) {
            var sFecha = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()),
              separador = sFecha.indexOf('/') != -1 ? '/' : '-',
              aFecha = sFecha.split(separador),
              fechaFinal = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0],
              mesEvaluar = parseInt(aFecha[1]),
              añoEvaluar = parseInt(aFecha[2]),
              diasAgregar = scope.agregarDiasF(mesEvaluar, añoEvaluar),
              
              fechaFinal = new Date(fechaFinal);
            fechaFinal.setDate(fechaFinal.getDate() + diasAgregar);

            var mesImprimir = ((fechaFinal.getMonth + 1) < 10) ? ("0" + (fechaFinal.getMonth() + 1)) : (fechaFinal.getMonth() + 1),
              diaImprimir = ((fechaFinal.getDate()) < 10) ? ("0" + (fechaFinal.getDate())) : (fechaFinal.getDate()),
              anioImprimir = fecha.getFullYear();
              //fechaFinalResult = mesImprimir + separador + diaImprimir + separador + anioImprimir;
              
              if(mesImprimir == 12 && diaImprimir >=1){
                var fechaFinalResult = mesImprimir + separador + diaImprimir + separador + (anioImprimir + 1) ;
                console.log(fechaFinalResult)
              } else{
                var fechaFinalResult = mesImprimir + separador + diaImprimir + separador + anioImprimir;
                console.log(fechaFinalResult)
              }
            return fechaFinalResult;
          };

          scope.mostrarFechaAutomensual = function() {
            if (scope.bolsaEmpresa.ilActMes == false) {
              scope.bolsaEmpresa.feFinBol = new Date(scope.muestraFechaFinal(scope.bolsaEmpresa.feIniBol));
              scope.msjMinCuota = false;
            } else if (scope.bolsaEmpresa.ilActMes == true) {
              scope.bolsaEmpresa.feFinBol = new Date(scope.muestraFechaFinal(scope.bolsaEmpresa.feIniBol));
              scope.msjMinCuota = false;

              scope.lbldias = scope.bolsaEmpresa.feIniBol.getDate();
            }

            scope.lblMincuota = scope.bolsaEmpresa.caMinBol;
          };
        }
      ]);
  })();
