angular.module('usuario')
  .controller('usuarioPedidoSaveController', [
    '$location', '$log', 'usuarioService', 'gestionInstanciaService', '$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService',
    function($location, $log, usuarioService, gestionInstanciaService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService) {
      var scope = this;
      scope.varnab = $location.search();
      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
      }
      scope.nombreRol = [];
      scope.nombreInstancia = [];
      scope.thereIsError = false;
      scope.firstLoad = true;
      scope.nomEmpresa = null;
      scope.verContra = dataModal.divContra;
      scope.check = dataModal.btnHabilitar;

      //instacias
      scope.mostrarInstancia = {
        ver: dataModal.response.usuario.noInstancia
      };
      //AutoCompletar
      scope.infoEmpresa = {
        idCliente: dataModal.response.usuario.idCliente,
        noRazonSocial: dataModal.response.usuario.noCliente
      };
      scope.temporalEmpresaInicio = {
        noRazon: 'p'
      };
      scope.tempEmpresaFinal = [];
      scope.Interfaz = {
        btnDisabled: true,
        imputLogin: true
      }
      scope.frmData = {
        nameModal: dataModal.title,
        btnHabilitar: dataModal.btnHabilitar,
        comboRol: {
          idRol: dataModal.response.usuario.idRol,
          noRol: dataModal.response.usuario.noRol
        },
        comboInstancia: {
          idInstanciaEncryp: dataModal.response.usuario.idInstanciaEncryp,
          noInstancia: dataModal.response.usuario.noInstancia
        },
        usuario: {
          entity: dataModal.response.usuario,
          password: null,
          mensajeValida: "",
          mensajePasswo: "",
          save: {
            request: {}
          },
          buscar: {
            request: {}
          },
          cargarComboRol: {
            request: { idTipoRol : 1 }
          },
          cargarComboInstancia: {
            request: {}
          },
          validar: {
            request: {
              nologin: ""
            }
          }
        },
        usuarioSaved: {}

      }
      //LimpiarContraseña
      scope.habCon = function() {
        if (scope.verContra == false) {
          scope.frmData.usuarioSaved.noPasswo = null;
        }
      }
      //Insertar
      scope.onSaveUsuario = function() {
        scope.saveUsuario(function(usuarioSaved) {
          $uibModalInstance.close(usuarioSaved);
        });
      }

      //Cargar para Usuario
      scope.varibleValidar = 0;
      scope.matchingUsuarioSave = function() {
        debugger;
        scope.frmData.usuario.save.request.noLogin = scope.frmData.usuario.entity.noLogin;
        scope.frmData.usuario.save.request.noPasswo = scope.frmData.usuario.password;
        scope.frmData.usuario.save.request.noNombre = scope.frmData.usuario.entity.noNombre;
        scope.frmData.usuario.save.request.noApelli = scope.frmData.usuario.entity.noApellido;
        scope.frmData.usuario.save.request.email = scope.frmData.usuario.entity.email;
        scope.frmData.usuario.save.request.noProfe = null;
        scope.frmData.usuario.save.request.idRol = scope.frmData.comboRol.idRol;
        scope.frmData.usuario.save.request.noLoginCreador = scope.dataInfo.codUsuario;
        scope.frmData.usuario.save.request.idInstancia = null;
        if (scope.frmData.usuario.save.request.noLogin == null || scope.frmData.usuario.save.request.noPasswo == null ||
          scope.frmData.usuario.save.request.noNombre == null || scope.frmData.usuario.save.request.noApelli == null ||
          scope.frmData.usuario.save.request.email == null) {
          scope.varibleValidar = 1;
        } else if (scope.frmData.usuario.save.request.idRol == 0) {
          scope.varibleValidar = 2;
        }
      }
      scope.matchingUsuarioParaEditar = function() {
        debugger;
        scope.frmData.usuarioSaved.idUsuario = scope.frmData.usuario.entity.idUsuario;
        scope.frmData.usuarioSaved.nologin = scope.frmData.usuario.entity.noLogin;
        scope.frmData.usuarioSaved.noPasswo = scope.frmData.usuario.password;
        scope.frmData.usuarioSaved.noNombre = scope.frmData.usuario.entity.noNombre;
        scope.frmData.usuarioSaved.noApellido = scope.frmData.usuario.entity.noApellido;
        scope.frmData.usuarioSaved.email = scope.frmData.usuario.entity.email;
        scope.frmData.usuarioSaved.noProfe = null;
        scope.frmData.usuarioSaved.idRol = scope.frmData.comboRol.idRol;
        scope.frmData.usuarioSaved.noLoginCreador = scope.dataInfo.codUsuario;
        scope.frmData.usuarioSaved.idInstancia = scope.frmData.comboInstancia.idInstanciaEncryp;

        if (scope.frmData.usuarioSaved.nologin == null || scope.frmData.usuarioSaved.noNombre == null ||
          scope.frmData.usuarioSaved.noApellido == null || scope.frmData.usuarioSaved.email == null || scope.verContra == true && scope.frmData.usuarioSaved.noPasswo == null) {
          scope.varibleValidar = 1;
        } else if (scope.frmData.usuarioSaved.idRol == 0) {
          scope.varibleValidar = 2;
        } else if (scope.verContra == false && scope.frmData.usuarioSaved.noPasswo != null || scope.frmData.usuarioSaved.noPasswo == null) {
          scope.frmData.usuarioSaved.noPasswo = null;
          scope.varibleValidar = 0;
        }

      }

      //validar Login
      scope.varLogin = 0;
      scope.validarLogin = function() {
        scope.frmData.usuario.validar.request.nologin = scope.frmData.usuario.entity.noLogin;
        usuarioService.validarLoginUsuario(scope.dataInfo).post({}, scope.frmData.usuario.validar.request, function(result) {
            if (result.estado == 1) {

              if (scope.frmData.usuario.validar.request.nologin == null) {
                scope.frmData.usuario.mensajeValida = "";
              } else {
                scope.frmData.usuario.mensajeValida = "";
                scope.varLogin = 0;
              }
            } else if (result.estado == 0) {
              scope.frmData.usuario.mensajeValida = "Usuario en uso, no disponible";
              scope.varLogin = 1;
            }
          },
          function(error) {
            console.error(error);
          });
      }
      //Validar correo
      scope.varEmail = 0;
      scope.validaEmail = function() {
        var emailArreglo = scope.frmData.usuario.entity.email;
        if (emailArreglo == null) {
          console.log("El email esta enviando nulo");
        } else {
          var emailArreglo = scope.frmData.usuario.entity.email.split("@");
          if (emailArreglo.length == 2) {
            var puntoArreglo = emailArreglo[1].split(".");
            if (puntoArreglo.length >= 2) {
              scope.varEmail = 0;
            } else {
              scope.varEmail = 1;
            }
          } else {
            scope.varEmail = 1;
          }
        }
      }

      //Metodo de insertar y actualizar

      scope.saveUsuario = function(dismissModalCallback) {
        if (scope.thereIsError) {
          toastr.remove();
          toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
        } else {

          scope.matchingUsuarioSave();
          scope.matchingUsuarioParaEditar();

          if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0 && scope.varLogin == 0 && scope.varEmail == 0) {
            usuarioService.insertarUsuario(scope.dataInfo).post({}, scope.frmData.usuario.save.request, function(result) {
                if (result.estado == 1) {

                  dismissModalCallback(scope.frmData.usuarioSaved);
                  toastr.remove();
                  toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);

                } else if (result.estado == 0 || result.estado == -1) {
                  console.log('No se registro el usuario');
                }

              },
              function(error) {
                console.error('Error: ' + error);
              });
          } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1) {
            toastr.remove();
            toastr.error('Ningun campo del formulario acepta valores vacios o erroneos ', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 2) {
            toastr.remove();
            toastr.error('Seleccion un Rol', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.add && scope.varLogin == 1) {
            toastr.remove();
            toastr.error('El Login de usuario ya existe', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.add && scope.varEmail == 1) {
            toastr.remove();
            toastr.error('Formato del correo Incorrecto', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0 && scope.varLogin == 0 && scope.varEmail == 0) {
            usuarioService.actualizarUsuario(scope.dataInfo).post({}, scope.frmData.usuarioSaved,
              function(response) {
                if (response.estado == 1) {
                  dismissModalCallback(scope.frmData.usuarioSaved);
                  toastr.remove();
                  toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);

                } else if (response.estado == -1) {
                  toastr.remove();
                  toastr.error('No se pudo Actualizar la informacion del Usuario', 'Error', viewConfig.toastConfig);
                  /*console.error( result.mensaje );*/
                  dismissModalCallback(null);
                }
              },
              function(failure) {
                console.error("Error: " + failure);
              });
          } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 1) {
            toastr.remove();
            toastr.error('Ningun campo del formulario acepta valores vacios o erroneos ', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 2) {
            toastr.remove();
            toastr.error('Seleccion un Rol', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.update && scope.varLogin == 1) {
            toastr.remove();
            toastr.error('El Login de usuario ya existe', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          } else if (dataModal.whatOperation == utilService.operation.update && scope.varEmail == 1) {
            toastr.remove();
            toastr.error('Formato del correo Incorrecto', 'Error', viewConfig.toastConfig);
            $uibModalInstance.close();
          }
        }
      }

      //Listar combo Empresa
      scope.listTempEmpresa = function(nombre) {
        if (dataModal.whatOperation == 2 && scope.infoEmpresa.noRazonSocial != null) {
          scope.Interfaz.btnDisabled = false;
          scope.listarInstancia();
        }
        scope.temporalEmpresaInicio.noRazon = nombre;
        scope.dataInfo.idInstancia = null;
        usuarioService.listarCliente(scope.dataInfo).post({}, scope.temporalEmpresaInicio, function(result) {
          if (result.estado == 1) {

            scope.tempEmpresaFinal = result.listaCliente;
            console.log(exito);
          }
        }, function(error) {
          console.log(error);
        })
      };

      //Listar Combo idInstancia
      scope.listarInstancia = function() {
        if (scope.infoEmpresa.idCliente == null) {
          console.log("No se puede listar instacias sin escoger empresa");
        } else if (scope.infoEmpresa.idCliente != null) {
          scope.Interfaz.btnDisabled = false;
          scope.frmData.usuario.cargarComboInstancia.request.pIdCliente = scope.infoEmpresa.idCliente;
          gestionInstanciaService.listarInstanciaAdmin(scope.dataInfo).post({}, scope.frmData.usuario.cargarComboInstancia.request, function(result) {
              if (result.estado == 1) {
                scope.nombreInstancia = result.instancias;
                if (dataModal.response.usuario.idInstanciaEncryp != undefined && dataModal.response.usuario.idInstanciaEncryp != 0) {
                  scope.frmData.comboInstancia = {
                    idInstanciaEncryp: dataModal.response.usuario.idInstanciaEncryp,
                    noInstancia: dataModal.response.usuario.noInstancia
                  };
                }
              } else if (result.estado == 0 || result.estado == -1) {
                console.error('Error: ' + result.mensaje);
              }
            },

            function(error) {
              console.error('Error: ' + error);
            });
        }
      }


      // Listar combo Rol
      scope.listarRol = function() {
        if (dataModal.whatOperation == 1) {
          if (scope.frmData.comboInstancia == null) {
            scope.frmData.usuario.cargarComboRol.request.idTipoRol = 1;
          } else if (scope.frmData.comboInstancia.idInstanciaEncryp != null) {
            scope.frmData.usuario.cargarComboRol.request.idTipoRol = 2;
          }
        } else if (dataModal.whatOperation == 2) {
          scope.frmData.usuario.cargarComboRol.request.idTipoRol = scope.frmData.usuario.entity.idTipoRol;
        }
        scope.dataInfo.idInstancia = null;
        usuarioService.listarRol(scope.dataInfo).post({}, scope.frmData.usuario.cargarComboRol.request, function(result) {
            if (result.estado == 1) {
              scope.frmData.comboRol = {
                idRol: 0,
                noRol: "Seleccione un Rol"
              };
              scope.nombreRol = [scope.frmData.comboRol];
              scope.nombreRol = scope.nombreRol.concat(result.listaRoles);
              if (dataModal.response.usuario.idRol != undefined && dataModal.response.usuario.idRol != 0) {
                scope.frmData.comboRol = {
                  idRol: dataModal.response.usuario.idRol,
                  noRol: dataModal.response.usuario.noRol
                };
              }
            } else if (result.estado == 0 || result.estado == -1) {
              console.error('Error: ' + result.mensaje);
            }
          },
          function(error) {
            console.error('Error: ' + error);
          });
      }
      // Los demas metodos
      scope.cancel = function() {

        $uibModalInstance.close();
      }
      scope.onLoadPage = function() {
        scope.listarRol();
      }
      scope.onLoadPage();

    }
  ]);
