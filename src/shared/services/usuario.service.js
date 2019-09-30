angular.module('pivo').
factory('usuarioService', function($resource, ngResourceConfig) {
  var codUsuario = 'daddadad';
  var token = 'asdad';

//trae servicio
  var urlListarUsuario        =       ngResourceConfig.baseURL + "usuario/listaUsuarioEstandar";
  var urlEliminarUsuario      =       ngResourceConfig.baseURL + "usuario/eliminarUsuarioEstandar";
  var urlInsertarUsuario      =       ngResourceConfig.baseURL + "usuario/insertarUsuarioEstandar";
  var urlActulizarUsuario     =       ngResourceConfig.baseURL + "usuario/actualizarUsuarioEstandar";
  var urlValidarLogin         =       ngResourceConfig.baseURL + "usuario/validarUsuarioLogin";
  var urlListarRol            =       ngResourceConfig.baseURL + "rol/listaRolesxTipoRol";
  var urlListarClientexNombre =       ngResourceConfig.baseURL + "cliente/listarClienteAutoCompletar";

      var usuarioResorce ={
        usuario:{
          listar:function(dataInfo){
            return $resource(urlListarUsuario, {}, {
                post: {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'codUsuario': "" + dataInfo.codUsuario,
                      'token': "" + dataInfo.token,
                      'idInstancia': "" + dataInfo.idInstancia
                  }
                }
            } );
          },
          eliminar: function(dataInfo){
            return $resource( urlEliminarUsuario, {}, {
              post: {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'codUsuario': "" + dataInfo.codUsuario,
                      'token': "" + dataInfo.token,
                      'idInstancia': "" + dataInfo.idInstancia
                  }
              }
            } );
          },
          insertar: function(dataInfo) {
              return $resource(urlInsertarUsuario, {}, {
                  post: {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                          'codUsuario': "" + dataInfo.codUsuario,
                          'token': "" + dataInfo.token,
                          'idInstancia': "" + dataInfo.idInstancia
                      }
                  }
              });
          },
          actualizar: function(dataInfo) {
              return $resource(urlActulizarUsuario, {}, {
                  post: {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                          'codUsuario': "" + dataInfo.codUsuario,
                          'token': "" + dataInfo.token,
                          'idInstancia': "" + dataInfo.idInstancia
                      }
                  }
              });
          },
          validar: function(dataInfo) {
              return $resource(urlValidarLogin, {}, {
                  post: {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                          'codUsuario': "" + dataInfo.codUsuario,
                          'token': "" + dataInfo.token,
                          'idInstancia': "" + dataInfo.idInstancia
                      }
                  }
              });
          }

        },
        rol:{
          listar:function(dataInfo){
            return $resource(urlListarRol, {}, {
                post: {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'codUsuario': "" + dataInfo.codUsuario,
                      'token': "" + dataInfo.token,
                      'idInstancia': "" + dataInfo.idInstancia
                  }
                }
            } );
          }
        },
        cliente:{
          listar:function(dataInfo){
            return $resource(urlListarClientexNombre, {}, {
                post: {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'codUsuario': "" + dataInfo.codUsuario,
                      'token': "" + dataInfo.token,
                      'idInstancia': "" + dataInfo.idInstancia
                  }
                }
            } );
          }
        }
      }

    var usuarioService={
      listarUsuario:      usuarioResorce.usuario.listar,
      eliminarUsuario:    usuarioResorce.usuario.eliminar,
      insertarUsuario:    usuarioResorce.usuario.insertar,
      actualizarUsuario:  usuarioResorce.usuario.actualizar,
      validarLoginUsuario:usuarioResorce.usuario.validar,
      listarRol:          usuarioResorce.rol.listar,
      listarCliente:      usuarioResorce.cliente.listar
    };
  return usuarioService;
  });
