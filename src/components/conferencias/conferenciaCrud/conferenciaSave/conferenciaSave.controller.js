angular.module('conferencia')
  .controller('conferenciaSaveController', [
    '$location', '$log', '$uibModalInstance', 'conferenciaService', 'localStorageService', 'dataModal', 'viewConfig', 'utilService', '$timeout',
    function($location, $log, $uibModalInstance, conferenciaService, localStorageService, dataModal, viewConfig, utilService, $timeout) {
      var scope = this;
      scope.varnab = $location.search();
      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
      }

      scope.frmData = {
        nameModal: dataModal.title,
        btnHabilitar: dataModal.btnHabilitar,
        conferencia: {
          entity: dataModal.response.conferencia,
          mensajeValida: "",
          save: {
            request: {
              noConferencia: '',
              nuConferencia: '',
              pwdAdmin: '',
              pwdUsuario: '',
              noRutBie: '',
              nuMaxUsuario: '',
              noVarAdmin: '',
              noVarUsuario: '',
              noRutHol: '',
              fecha: ''
            },
            response: {
              existe: 0
            }
          },
          buscar: {
            request: {}
          }
        },
        conferenciaSaved: {}
      }


      scope.flag = dataModal.whatOperation;

      scope.flagOperation = function(flag) {
        if (flag == 1) {
          scope.validacion = true;
          scope.varNoConferencia = false;
          scope.varNuConferencia = false;
          scope.passAdmin = false;
          scope.passUsu = false;
          scope.cUsuario = false;
          scope.maxUsu = false;
          scope.fechaF = true;
          scope.tMusicaB = false;
          scope.tMusicaH = false;
          scope.chkUsu = false;
          scope.chkAd = false;
          scope.inputUsuario = true;
        } else {
          scope.validacion = false;
          scope.varNoConferencia = true;
          scope.varNuConferencia = true;
          scope.passAdmin = true;
          scope.passUsu = true;
          scope.cUsuario = true;
          scope.maxUsu = true;
          scope.fechaF = true;
          scope.tMusicaB = true;
          scope.tMusicaH = true;
          scope.chkUsu = true;
          scope.chkAd = true;
          scope.inputUsuario = true;
        }
      }

      /*        scope.validacion = false;
            scope.varNoConferencia = false;
            scope.varNuConferencia = false;
            scope.passAdmin = false;
            scope.passUsu   = false;
            scope.cUsuario = false;
            scope.maxUsu = false;
            scope.fechaF = true;
            scope.tMusicaB = false;
            scope.tMusicaH = false;
            scope.chkUsu = false;
            scope.chkAd = false;
            scope.inputUsuario = true;
*/
      //Validacion btn Guardar
      scope.validaCampos = function() {
        if (scope.frmData.conferencia.entity.noConferencia == null) {
          scope.varNoConferencia = false;
        } else {
          scope.varNoConferencia = true;
        }
        scope.metodo();
      }

      scope.fechaInicioConferencia = function() {
        if (scope.dt < new Date(Date.now())) {
          scope.dt = new Date(Date.now());
        }
      };



      scope.validaNumero = function() {
        if (scope.frmData.conferencia.entity.nuConferencia == null) {
          scope.varNuConferencia = false;
        } else {
          scope.varNuConferencia = true;
        }
        scope.metodo();
      }

      scope.validapwdAdmin = function() {
        if (scope.frmData.conferencia.entity.pwdAdmin == null) {
          scope.passAdmin = false;
          scope.metodo();
        } else {
          scope.passAdmin = true;
          scope.metodo();
        }
        if(scope.frmData.conferencia.entity.pwdAdmin!=null && scope.frmData.conferencia.entity.pwdUsuario!=null){
          if (scope.frmData.conferencia.entity.pwdAdmin === scope.frmData.conferencia.entity.pwdUsuario) {
            scope.mensajeValidaPwdAdminUser = "*Las contraseñas de administrador y usuario no deben ser iguales";
            scope.validaAdminUserdobles = true;
            scope.validacion = true;
          }
          else {
            scope.validaAdminUserdobles = false;
            scope.metodo();
          }
        }

      }

      scope.validapwdUsu = function() {
        if (scope.frmData.conferencia.entity.pwdUsuario == null) {
          scope.passUsu = false;
          scope.metodo();
        } else {
          scope.passUsu = true;
          scope.metodo();
        }

        if(scope.frmData.conferencia.entity.pwdAdmin!=null && scope.frmData.conferencia.entity.pwdUsuario!=null){
          if (scope.frmData.conferencia.entity.pwdAdmin == scope.frmData.conferencia.entity.pwdUsuario) {
            scope.mensajeValidaPwdAdminUser = "*Las contraseñas de administrador y usuario no deben ser iguales";
            scope.validaAdminUserdobles = true;
            scope.validacion = true;
          }
          else {
            scope.validaAdminUserdobles = false;
            scope.metodo();
            
          }
        }
      }

      scope.mensajeValidaPwdAdminUser = "";
      scope.validaAdminUserdobles = false;


      scope.validaFecha = function() {
        if (scope.dt == null) {
          scope.fechaF = false;
        } else {
          scope.fechaF = true;
        }
        scope.metodo();
      }

      scope.metodo = function() {
        if (scope.flag == 1) {
          if (scope.varNoConferencia == false || scope.varNuConferencia == false ||
            scope.passAdmin == false || scope.passUsu == false || scope.fechaF == false ||
            scope.chkAd == false || scope.chkUsu == false) {
            scope.validacion = true;
          }

           else {
            scope.validacion = false;
          }
        } else {
          if (scope.varNoConferencia == true && scope.varNuConferencia == true &&
            scope.passAdmin == true && scope.passUsu == true && scope.fechaF == true &&
            scope.chkAd == true && scope.chkUsu == true) {
            scope.validacion = false;
          }
           else {
            scope.validacion = true;
          }
        }

      }

      //Combos
      //Combo RutaBienvenida
      scope.comboRutaBienvenida = [{
          valor: 'Ninguno',
          dato: 'Ninguno'
        },
        {
          valor: 'Aleatorio',
          dato: 'Aleatorio'
        },
        {
          valor: 'Por Defecto',
          dato: 'Por Defecto'
        }
      ];

      scope.comboMaxPart = [{
          valor: 'Elegir',
          dato: 'Elegir'
        },
        {
          valor: 'Maximo',
          dato: 'Maximo'
        }
      ];

      scope.changeComboMaxPart = function() {
        if (scope.frmData.conferencia.entity.nuMaxUsuario == 'Elegir') {
          scope.frmData.conferencia.save.request.nuMaxUsuario = scope.cantMaxUsuario;
          scope.frmData.conferenciaSaved.nuMaxUsuario = scope.cantMaxUsuario;
          scope.inputUsuario = false;

        } else if (scope.frmData.conferencia.entity.nuMaxUsuario == 'Maximo') {
          scope.frmData.conferencia.save.request.nuMaxUsuario = '32';
          scope.frmData.conferenciaSaved.nuMaxUsuario = '32';
          scope.inputUsuario = true;
        } else scope.inputUsuario = true;
      }



      scope.cantUsuarioChange = function() {
        if (parseInt(scope.cantMaxUsuario) >= 32) {
          scope.cantMaxUsuario = 32;
          scope.frmData.conferencia.save.request.nuMaxUsuario = '32';
        } else scope.cantMaxUsuario == scope.cantMaxUsuario;


      }


      //Change Checkbox Administrador
      scope.noVarAdmin = [null, null, null, null, null];
      scope.chkA1 = false;
      scope.chkA2 = false;

      scope.changeChkAdmin = function() {
        if (scope.chkA1 == 'false' && scope.chkA2 == 'false' && scope.chkA3 == 'false' &&
          scope.chkA4 == 'false' && scope.chkA5 == 'false') {
          scope.chkAd = false;
        } else {
          scope.chkAd = true;
        }
        scope.metodo();
      }

      scope.changeChkUsuario = function() {
        if (scope.chkU1 == 'false' && scope.chkU2 == 'false' && scope.chkU3 == 'false' && scope.chkU4 == 'false' &&
          scope.chkU5 == 'false' && scope.chkU6 == 'false' && scope.chkU7 == 'false' && scope.chkU8 == 'false') {
          scope.chkUsu = false;
        } else {
          scope.chkUsu = true;
        }
        scope.metodo();
      }

      scope.changeOptionsAdmin2 = function() {
        if (scope.chkA2 == 'true') {
          scope.noVarAdmin.splice(0, 1, "M");
        } else if (scope.chkA2 == 'false') {
          scope.noVarAdmin.splice(0, 1, null);
        }
      }

      scope.changeOptionsAdmin1 = function() {
        // console.log(scope.chkA1);
        if (scope.chkA1 == 'true') {
          scope.noVarAdmin.splice(1, 1, "c");
        } else if (scope.chkA1 == 'false') {
          scope.noVarAdmin.splice(1, 1, null);
        }
      }

      scope.changeOptionsAdmin3 = function() {
        if (scope.chkA3 == 'true') {
          scope.noVarAdmin.splice(2, 1, "p");
        } else if (scope.chkA3 == 'false') {
          scope.noVarAdmin.splice(2, 1, null);
        }
      }

      scope.changeOptionsAdmin4 = function() {
        if (scope.chkA4 == 'true') {
          scope.noVarAdmin.splice(3, 1, "s");
        } else if (scope.chkA4 == 'false') {
          scope.noVarAdmin.splice(3, 1, null);
        }
      }

      scope.changeOptionsAdmin5 = function() {
        if (scope.chkA5 == 'true') {
          scope.noVarAdmin.splice(4, 1, "r");
        } else if (scope.chkA5 == 'false') {
          scope.noVarAdmin.splice(4, 1, null);
        }
      }

      scope.cadenaVarAdmin = "Aa";
      scope.addOptionsAdmin = function() {
        for (var i = 0; i < scope.noVarAdmin.length; i++) {
          if (scope.noVarAdmin[i] == null) {
            scope.noVarAdmin[i] = "";
          }
          scope.cadenaVarAdmin = scope.cadenaVarAdmin.concat(scope.noVarAdmin[i]);
        }
        scope.frmData.conferencia.save.request.noVarAdmin = scope.cadenaVarAdmin;
        scope.frmData.conferenciaSaved.noVarAdmin = scope.cadenaVarAdmin;
      }

      //Change Checkbox Administrador
      scope.noVarUsuario = [null, null, null, null, null, null, null, null];

      scope.changeOptionsUsu1 = function() {
        if (scope.chkU1 == 'true') {
          scope.noVarUsuario.splice(2, 1, "q");
        } else if (scope.chkU1 == 'false') {
          scope.noVarUsuario.splice(2, 1, null);
        }
      }

      scope.changeOptionsUsu2 = function() {
        if (scope.chkU2 == 'true') {
          scope.noVarUsuario.splice(1, 1, "c");
        } else if (scope.chkU2 == 'false') {
          scope.noVarUsuario.splice(1, 1, null);
        }
      }

      scope.changeOptionsUsu3 = function() {
        if (scope.chkU3 == 'true') {
          scope.noVarUsuario.splice(0, 1, "M");
        } else if (scope.chkU3 == 'false') {
          scope.noVarUsuario.splice(0, 1, null);
        }
      }

      scope.changeOptionsUsu4 = function() {
        if (scope.chkU4 == 'true') {
          scope.noVarUsuario.splice(3, 1, "p");
        } else if (scope.chkU4 == 'false') {
          scope.noVarUsuario.splice(3, 1, null);
        }
      }

      scope.changeOptionsUsu5 = function() {
        if (scope.chkU5 == 'true') {
          scope.noVarUsuario.splice(4, 1, "s");
        } else if (scope.chkU5 == 'false') {
          scope.noVarUsuario.splice(4, 1, null);
        }
      }

      scope.changeOptionsUsu6 = function() {
        if (scope.chkU6 == 'true') {
          scope.noVarUsuario.splice(5, 1, "r");
        } else if (scope.chkU6 == 'false') {
          scope.noVarUsuario.splice(5, 1, null);
        }
      }

      scope.changeOptionsUsu7 = function() {
        if (scope.chkU7 == 'true') {
          scope.noVarUsuario.splice(6, 1, "m");
        } else if (scope.chkU7 == 'false') {
          scope.noVarUsuario.splice(6, 1, null);
        }
      }

      scope.changeOptionsUsu8 = function() {
        if (scope.chkU8 == 'true') {
          scope.noVarUsuario.splice(7, 1, "w");
        } else if (scope.chkU8 == 'false') {
          scope.noVarUsuario.splice(7, 1, null);
        }
      }

      scope.cadenaVarUsuario = "";
      scope.addOptionsUsuario = function() {
        for (var i = 0; i < scope.noVarUsuario.length; i++) {
          if (scope.noVarUsuario[i] == null) {
            scope.noVarUsuario[i] = "";
          }
          scope.cadenaVarUsuario = scope.cadenaVarUsuario.concat(scope.noVarUsuario[i]);
        }
        scope.frmData.conferencia.save.request.noVarUsuario = scope.cadenaVarUsuario;
        scope.frmData.conferenciaSaved.noVarUsuario = scope.cadenaVarUsuario;
      }

      scope.comboMoh = {
        idClase: 0,
        noClase: "Seleccionar"
      }

      scope.lscomboMusicOnHold = [];
      scope.comboMusicOnHold = function() {
        conferenciaService.listaMusicaOnHoldServ(scope.dataInfo).post({}, function(result) {
          if (result.estado == 1) {
            scope.lscomboMusicOnHold = result.lsMusicaOnHold;
          } else if (result == 0 || result == -1) {
            console.error('Error: ' + error);
          }
        })
      };

      //Calendario
      scope.dt = new Date();
      scope.varia = new Date();
      scope.open = function() {
        $timeout(function() {
          scope.opened = true;
        })
      }

      scope.dateOptions = {
        minDate: null
      }

      scope.cambiar = function() {
        if (scope.dt == null) {
          scope.varia = "NoValido";
        } else {
          var d = scope.dt,
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          scope.varia = year + '-' + month + '-' + day;
        }
      }

      scope.matchingConferenciaSave = function() {
        scope.cambiar();
        scope.frmData.conferencia.save.request.noConferencia = scope.frmData.conferencia.entity.noConferencia;
        scope.frmData.conferencia.save.request.nuConferencia = scope.frmData.conferencia.entity.nuConferencia;
        scope.frmData.conferencia.save.request.pwdAdmin = scope.frmData.conferencia.entity.pwdAdmin;
        scope.frmData.conferencia.save.request.pwdUsuario = scope.frmData.conferencia.entity.pwdUsuario;
        scope.frmData.conferencia.save.request.noRutBie = scope.frmData.conferencia.entity.noRutBie;

        scope.changeComboMaxPart();
        scope.addOptionsAdmin();
        scope.addOptionsUsuario();
        scope.frmData.conferencia.save.request.noRutHol = scope.frmData.conferencia.entity.idClase;
        // scope.frmData.conferencia.save.request.fecha    = scope.frmData.conferencia.entity.fecha;
        scope.frmData.conferencia.save.request.fecha = scope.varia;
      }

      scope.matchingConferenciaEditar = function() {
        scope.cambiar();
        scope.frmData.conferenciaSaved.idConferencia = scope.frmData.conferencia.entity.idConferencia;
        scope.frmData.conferenciaSaved.noConferencia = scope.frmData.conferencia.entity.noConferencia;
        scope.frmData.conferenciaSaved.nuConferencia = scope.frmData.conferencia.entity.nuConferencia;
        scope.frmData.conferenciaSaved.pwdAdmin = scope.frmData.conferencia.entity.pwdAdmin;
        scope.frmData.conferenciaSaved.pwdUsuario = scope.frmData.conferencia.entity.pwdUsuario;
        scope.frmData.conferenciaSaved.noRutBie = scope.frmData.conferencia.entity.noRutBie;
        scope.changeComboMaxPart();
        //scope.addOptionsAdmin();
        scope.frmData.conferenciaSaved.noRutHol = scope.frmData.conferencia.entity.idClase;
        scope.frmData.conferenciaSaved.fecha = scope.varia;
      }

      scope.saveConferencia = function(dismissModalCallback) {
        scope.matchingConferenciaSave();
        scope.matchingConferenciaEditar();
        if (dataModal.whatOperation == utilService.operation.add) {
          conferenciaService.insertaConferenciaServ(scope.dataInfo).post({}, scope.frmData.conferencia.save.request, function(result) {
            if (result.estado == 1) {
              dismissModalCallback(scope.frmData.conferenciaSaved);
              toastr.remove();
              toastr.success('Insercion exitosa', 'Acción realizada', viewConfig.toastConfig);
            } else if (result.estado == 0 || result.estado == -1) {
              console.log('No se registro la conferencia');
            }
          }, function(error) {
            console.error('Error: ' + error);
          })
        } else if (dataModal.whatOperation == utilService.operation.update) {
          conferenciaService.actualizaConferenciaServ(scope.dataInfo).post({}, scope.frmData.conferenciaSaved,
            function(result) {
              if (result.estado == 1) {
                dismissModalCallback(scope.frmData.conferenciaSaved);
                toastr.remove();
                toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);
              } else if (result.estado == -1) {
                toastr.remove();
                toastr.error('No se pudo actualizar la información de la conferencia', 'Error', viewConfig.toastConfig);
              }
            },
            function(failure) {
              console.error('Error: ' + failure);
            })
        }
      }

      scope.onSaveConferencia = function() {
        scope.saveConferencia(function(conferenciaSaved) {
          $uibModalInstance.close(conferenciaSaved);
        })
      }

      scope.cancel = function() {
        $uibModalInstance.close();
      }

      scope.onLoadPage = function() {
        scope.comboMusicOnHold();
        if (dataModal.whatOperation == utilService.operation.add) {
          scope.validacion = true;
        } else if (dataModal.whatOperation == utilService.operation.update) {
          scope.fechaConvert = "'" + scope.frmData.conferencia.entity.fecha + "'";
          scope.dt = new Date(scope.fechaConvert);
          scope.inputUsuario = false;

          scope.cantMaxUsuario = scope.frmData.conferencia.entity.nuMaxUsuario;

          if (scope.cantMaxUsuario == "32") {
            scope.frmData.conferencia.entity.nuMaxUsuario = "Maximo";
            scope.inputUsuario = true;
          } else {
            scope.frmData.conferencia.entity.nuMaxUsuario = "Elegir";
            scope.validacion = false;
          }

          //checkbox
          if (scope.frmData.conferencia.entity.noVarAdmin != null || scope.frmData.conferencia.entity.noVarAdmin != "") {
            scope.noVarAdmin = [null, null, null, null, null, null];
            scope.cadenaVarAdmin = "Aa";
            for (var index = 0; index < scope.frmData.conferencia.entity.noVarAdmin.length; index++) {
              if (scope.frmData.conferencia.entity.noVarAdmin[index] == 'c') {
                scope.chkA1 = "true";
                scope.noVarAdmin.splice(1, 1, "c");
              }
              if (scope.frmData.conferencia.entity.noVarAdmin[index] == 'M') {
                scope.chkA2 = "true";
                scope.noVarAdmin.splice(0, 1, "M");
              }
              if (scope.frmData.conferencia.entity.noVarAdmin[index] == 'p') {
                scope.chkA3 = "true";
                scope.noVarAdmin.splice(2, 1, "p");
              }
              if (scope.frmData.conferencia.entity.noVarAdmin[index] == 's') {
                scope.chkA4 = "true";
                scope.noVarAdmin.splice(3, 1, "s");
              }
              if (scope.frmData.conferencia.entity.noVarAdmin[index] == 'r') {
                scope.chkA5 = "true";
                scope.noVarAdmin.splice(4, 1, "r");
              }

            }
          }
          //Chk usuario



          if (scope.frmData.conferencia.entity.noVarUsuario != null || scope.frmData.conferencia.entity.noVarUsuario != "") {
            scope.noVarUsuario = [null, null, null, null, null, null, null, null];
            scope.cadenaVarUsuario = "";
            for (var index = 0; index < scope.frmData.conferencia.entity.noVarUsuario.length; index++) {

              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'q') {
                scope.chkU1 = "true";
                scope.noVarUsuario.splice(2, 1, "q");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'c') {
                scope.chkU2 = "true";
                scope.noVarUsuario.splice(1, 1, "c");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'M') {
                scope.chkU3 = "true";
                scope.noVarUsuario.splice(0, 1, "M");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'p') {
                scope.chkU4 = "true";
                scope.noVarUsuario.splice(3, 1, "p");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 's') {
                scope.chkU5 = "true";
                scope.noVarUsuario.splice(4, 1, "s");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'r') {
                scope.chkU6 = "true";
                scope.noVarUsuario.splice(5, 1, "r");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'm') {
                scope.chkU7 = "true";
                scope.noVarUsuario.splice(6, 1, "m");
              }
              if (scope.frmData.conferencia.entity.noVarUsuario[index] == 'w') {
                scope.chkU8 = "true";
                scope.noVarUsuario.splice(7, 1, "w");
              }
              // scope.addOptionsUsuario();
            }
          }

        }
      }
      scope.onLoadPage();

      scope.flagOperation(scope.flag);
    }
  ]);
