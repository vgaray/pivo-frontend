angular.module('pivo').
      factory('customTrunkService', function($resource, ngResourceConfig){
     //url de los servicios
          var urlListaCustomTrunk=ngResourceConfig.baseURL + 'customTrunk/listaCustomTrunk';
          var urlInsertaCustomTrunk=ngResourceConfig.baseURL + 'customTrunk/insertaCustomTrunk';
          var urlActualizaCustomTrunk=ngResourceConfig.baseURL + 'customTrunk/actualizaCustomTrunk';
          var urlEliminaCustomTrunk=ngResourceConfig.baseURL + 'customTrunk/eliminaCustomTrunk';


    //creacion del recurso a partir de los servicios
          var customTrunkResource = {
              customTrunk: {
     //metodos de los servicios
                  insertar : function(dataInfo){
                     return $resource (urlInsertaCustomTrunk, {}, {
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
                      return $resource (urlListaCustomTrunk, {}, {
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
                      return $resource(urlActualizaCustomTrunk, {}, {
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
                      return $resource(urlEliminaCustomTrunk, {}, {
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

        var customTrunkService = {
            insertaCustomTrunk :customTrunkResource.customTrunk.insertar,
            listaCustomTrunk : customTrunkResource.customTrunk.listar,
            actualizaCustomTrunk : customTrunkResource.customTrunk.editar,
            eliminaCustomTrunk:customTrunkResource.customTrunk.eliminar
        };

        return customTrunkService;
      });
