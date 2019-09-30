angular.module('pivo').
factory('centralExternaService', [
  '$resource',
  'ngResourceConfig',
  function($resource, ngResourceConfig)
  {
    var codUsuario = 'daddadad';
    var token = 'asdad';
    var urlListarCentralExterna     =ngResourceConfig.baseURL + "centralExterna/listaCentralExterna";
    var urlInsertarCentralExterna   =ngResourceConfig.baseURL + "centralExterna/insertarCentralExterna";
    var urlEditarCentralExterna     =ngResourceConfig.baseURL + "centralExterna/actualizarCentralExterna";
    var urlEliminarCentralExterna   =ngResourceConfig.baseURL + "centralExterna/eliminarCentralExterna";
    var urlValidarDireccionIP       =ngResourceConfig.baseURL + "centralExterna/validarDireccionIP";
    var centralExternaResource={
      centralExterna:{
        listar: function(dataInfo) {
            return $resource(urlListarCentralExterna, {}, {
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
        insertar: function(dataInfo) {
            return $resource(urlInsertarCentralExterna, {}, {
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
        editar: function(dataInfo) {
            return $resource(urlEditarCentralExterna, {}, {
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
        eliminar: function(dataInfo) {
            return $resource(urlEliminarCentralExterna, {}, {
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
        DireccionIP:{
            Validar: function(dataInfo) {
                return $resource(urlValidarDireccionIP, {}, {
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
        }
    };

    var centralExternaService={
      listarCentralExterna:centralExternaResource.centralExterna.listar,
      ingresarCentralExterna:centralExternaResource.centralExterna.insertar,
      EditarCentralExterna:centralExternaResource.centralExterna.editar,
      EliminarCentralExterna:centralExternaResource.centralExterna.eliminar,
      ValidarIp:centralExternaResource.DireccionIP.Validar
    };

    return centralExternaService;
  }
]);
