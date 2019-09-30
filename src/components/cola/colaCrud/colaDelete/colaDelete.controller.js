angular.module( 'cola' )
    .controller( 'colaDeleteController', [
        '$location','$log', 'colaService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, colaService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
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


          scope.deleteCola = function( dismissModalCallback )
          {
              colaService.eliminarCola(scope.dataInfo).post( {}, dataModal.colaRequest, function( result )
              {
                if(result.estado==1){
                          toastr.success(  "Eliminación exitosa","Acción realizada", viewConfig.toastConfig );
                }
                  else
                  {
                      toastr.error( "Cola esta asignada a un Agente, revisar antes de Eliminar Cola", "Error", viewConfig.toastConfig );
                    //   toastr.error( "Error", "Fallo en la eliminación", viewConfig.toastConfig );
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
            scope.deleteCola( function( ilEliminado )
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
