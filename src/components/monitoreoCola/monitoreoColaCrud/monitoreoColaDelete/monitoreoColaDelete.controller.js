angular.module( 'monitoreoCola' )
    .controller( 'monitoreoColaDeleteController', [
        '$location','$log', 'monitoreoColaService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, monitoreoColaService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
        {
          var scope = this;

          scope.varnab = $location.search();
          scope.dataInfo = {
              codUsuario: localStorageService.get("codUsuario"),
              token: localStorageService.get("token"),
              idInstancia: scope.varnab.idInstancia
          }
          scope.frmData = {
            dataModal : dataModal
          }


          scope.deleteMonitoreoCola = function( dismissModalCallback )
          {
              monitoreoColaService.eliminarMonitoreoCola(scope.dataInfo).post( {}, dataModal.monitoreoColaRequest, function( result )
              {
                if(result.estado==1){
                          toastr.success(  "Eliminación exitosa","Acción realizada", viewConfig.toastConfig );
                }
                  else
                  {
                      toastr.error( "Error", "Fallo en la eliminación", viewConfig.toastConfig );
                  }
                  dismissModalCallback( result.estado )
              },
              function (error)
              {
                  $log.error( error );
                  toastr.error( error, "Error", viewConfig.toastConfig );

                  dismissModalCallback( -1 );
              } );

          }

          scope.onConfirmDelete= function()
          {
            scope.deleteMonitoreoCola( function( ilEliminado )
            {
              $uibModalInstance.close( ilEliminado );
            } );
          }

          scope.cancel = function()
          {
              $uibModalInstance.dismiss( 'cancel' );
          }
        }
    ] );
