angular.module('pivo').
factory('gestionControlRolEstadoService', function($resource, ngResourceConfig) {

var urlControlRolEstado = ngResourceConfig.baseURL + "controlRolEstado/listar";

var gestionControlRolEstadoResource = {
    consulta: {
      permisosOcuoltar: function(dataInfo){
        return $resource(urlControlRolEstado, {}, {
          post: {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
                  'Accept': 'application/json',
                  'codUsuario': "" + dataInfo.codUsuario,
                  'token': ""+ dataInfo.token,
                  'idInstancia' : dataInfo.idInstancia
              }
          }
        })
      }
    }
}

var gestionControlRolEstadoService = {
     consultar: gestionControlRolEstadoResource.consulta.permisosOcuoltar
}

return gestionControlRolEstadoService;
});
