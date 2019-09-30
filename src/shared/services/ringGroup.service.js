angular.module('pivo').
factory('ringGroupService', function($resource, ngResourceConfig) {
  var urlListaRingGroup = ngResourceConfig.baseURL + "ringGroup/listaRingGroup";
  var urlInsertaRingGroup = ngResourceConfig.baseURL + "ringGroup/insertaRingGroup";
  var urlActualizaRingGroup = ngResourceConfig.baseURL + "ringGroup/actualizaRingGroup";
  var urlEliminaRingGroup = ngResourceConfig.baseURL + "ringGroup/eliminaRingGroup";
  var urlValidarRingGroup = ngResourceConfig.baseURL + "ringGroup/validacionRingGroup";
    var urlFiltrarRingGroup = ngResourceConfig.baseURL + "ringGroup/filtroRingGroup";
  //creacion del recurso a partir de los servicios
        var ringGroupResource = {
            ringGroup: {
   //metodos de los servicios
                insertar : function(dataInfo){
                   return $resource (urlInsertaRingGroup, {}, {
   //peticion de acceso
                     post: {
                         method :'POST',
   //contenido de la cabecera del metodo
                         headers : {
                           'Content-Type': 'application/json',
                           'Accept': 'application/json',
                           'codUsuario': "" + dataInfo.codUsuario,
                           'token': "" + dataInfo.token,
                           'idInstancia': "" + dataInfo.idInstancia
                         }
                     }
                   })
                },

                listar : function(dataInfo){
                    return $resource (urlListaRingGroup, {}, {
                      post: {
                          method :'POST',

                          headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                          }
                      }

                    })
                },

                editar : function (dataInfo) {
                    return $resource(urlActualizaRingGroup, {}, {
                      post: {
                          method :'POST',
                          headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                          }
                      }
                    })
                },

                eliminar : function (dataInfo) {
                    return $resource(urlEliminaRingGroup, {}, {
                      post: {
                          method :'POST',
                          headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                          }
                      }
                    })
                },
                validar : function (dataInfo) {
                    return $resource(urlValidarRingGroup, {}, {
                      post: {
                          method :'POST',
                          headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                          }
                      }
                    })
                },
                filtrar : function (dataInfo) {
                    return $resource(urlFiltrarRingGroup, {}, {
                      post: {
                          method :'POST',
                          headers : {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                          }
                      }
                    })
                }

            }
        };


      //definicion de los recursos a usarlos en el controlador

      var ringGroupService = {
          insertaRingGroup :ringGroupResource.ringGroup.insertar,
          listaRingGroup : ringGroupResource.ringGroup.listar,
          actualizaRingGroup : ringGroupResource.ringGroup.editar,
          eliminaRingGroup : ringGroupResource.ringGroup.eliminar,
          validarRingGroup : ringGroupResource.ringGroup.validar,
          filtrarRingGroup : ringGroupResource.ringGroup.filtrar
      };

      return ringGroupService;


});
