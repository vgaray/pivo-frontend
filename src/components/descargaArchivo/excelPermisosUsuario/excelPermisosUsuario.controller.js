angular.module('descargaArchivo')
.controller('excelPermisosUsuarioCtrl',['$state', '$log', '$location','$http', 'localStorageService','archivoUtilService',
function($state, $log, $location, $http, localStorageService,archivoUtilService ){

  var scope = this;
  scope.varnab = $location.search();
  scope.dataInfo= {
    codUsuario: localStorageService.get("codUsuario"),
    token: localStorageService.get("token"),
    idInstancia : scope.varnab.idInstancia
  }

  scope.myfile;
  scope.archivoConvertido="";
  scope.frmData = {
    name_page_title: "descargar Archivo",
    descargaExcel: {
      request: {

      },
      response: {
              reporteFile: ""
      }
    }
  }

  scope.atras = function()
  {
    var idInstanciaSelect = scope.dataInfo.idInstancia;
    var direccion = $state.href( 'principal.permisoLlamadas', { idInstancia : idInstanciaSelect } );
    console.log(direccion);
    window.open(direccion, '_self');
  }


scope.descargaArchivo = function(){
archivoUtilService.descargarPermisosUsuario(scope.dataInfo).post({}, scope.frmData.descargaExcel.request, function(result){
  if (result.estado == 1) {
      scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
      download(scope.pdf, "listaPermisosUsuario.xls", "application/xls");
    }
  }, function(error) {
      console.error(error);
  });
}

}]);
