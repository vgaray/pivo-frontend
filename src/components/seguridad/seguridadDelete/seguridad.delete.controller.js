'use strict';

angular.module( 'seguridad' )
   .controller( 'seguridadDeleteController', [
       '$location',
       '$uibModalInstance', 
       'localStorageService',
       'dataModal', 
       'seguridadService',
       function( $location, $uibModalInstance, localStorageService, dataModal, seguridadService )
       {
          var scope = this;       

          scope.varnab = $location.search();

          scope.dataInfo = 
          {
              codUsuario: localStorageService.get("codUsuario"),
              token: localStorageService.get("token"),
              idInstancia: scope.varnab.idInstancia
          }
          ;
          scope.frmData = {
              title : "Mensaje del sistema",
              content : `¿Está seguro que desea eliminar el rol ${dataModal.noRol}?`
          }

          scope.onEliminarRol = function()
          {
             seguridadService.eliminarRol( scope.dataInfo ).post({}, { idRol : dataModal.idRol }, function( data )
             {
                $uibModalInstance.close( { eliminado : 1, data : data } );
             }, 
             function( error )
             {
                $uibModalInstance.close( { eliminado : -1, data : null } );
             } );
          }

          scope.cancel = function () 
          {
              $uibModalInstance.dismiss('cancel');
          }
       }
    ] );