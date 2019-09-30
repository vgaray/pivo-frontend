angular.module('pivo')
    .factory('ivrOpcionService', function($resource, ngResourceConfig) {

        var urlListarIvrOpcion = ngResourceConfig.baseURL + "ivrOpcion/listar";
        var urlEditarIvrOpcion = ngResourceConfig.baseURL + "ivrOpcion/editar";
        var urlCrearIvrOpcion = ngResourceConfig.baseURL + "ivrOpcion/crear";
        var urlEliminarIvrOpcion = ngResourceConfig.baseURL + "ivrOpcion/eliminar";
        var urlgrupoHorario = ngResourceConfig.baseURL + "horario/listar-horarios-libres";

        var ivrOpcionResource = {
            listar: {
                listarIvrOpcion: function(dataInfo) {
                    return $resource(urlListarIvrOpcion, {}, {
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
            editar : {
              editarIvrOpcion: function(dataInfo) {
                return $resource(urlEditarIvrOpcion, {}, {
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
            crear : {
              crearIvrOpcion: function(dataInfo) {
                return $resource(urlCrearIvrOpcion, {}, {
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
            eliminar: {
              eliminarIvrOpcion: function(dataInfo) {
                return $resource(urlEliminarIvrOpcion, {}, {
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
            listaGrupoHorario: {
              grupoHorario: function(dataInfo) {
                return $resource(urlgrupoHorario, {}, {
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
        }

        var ivrOpcionService = {
            listar: ivrOpcionResource.listar.listarIvrOpcion,
            editar: ivrOpcionResource.editar.editarIvrOpcion ,
            crear: ivrOpcionResource.crear.crearIvrOpcion ,
            eliminar: ivrOpcionResource.eliminar.eliminarIvrOpcion,
            listarGrupoHorario: ivrOpcionResource.listaGrupoHorario.grupoHorario
        };
        return ivrOpcionService;
    });
