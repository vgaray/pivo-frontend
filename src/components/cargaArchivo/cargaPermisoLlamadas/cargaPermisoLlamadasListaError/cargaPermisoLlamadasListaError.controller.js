angular.module('cargaArchivo')
  .controller('cargaPermisoLlamadasListaErrorController', [
    '$location', '$log', 'archivoUtilService', 'localStorageService', '$uibModalInstance', 'dataModal', 'viewConfig',
    function($location, $log, archivoUtilService, localStorageService, $uibModalInstance, dataModal, viewConfig) {
      var scope = this;
      scope.varnab = $location.search();
      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
      }
      scope.frmData = {
        dataModal: dataModal
      }
      scope.listError = [];
      scope.listError = scope.frmData.dataModal;
      scope.aceptar = function() {
        $uibModalInstance.dismiss('cancel');
      }

    }
  ]);
