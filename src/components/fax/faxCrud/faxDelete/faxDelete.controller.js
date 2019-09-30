angular.module( 'fax' )
    .controller( 'faxDeleteController', [
        '$location','$log', 'faxService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, faxService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
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


          scope.deleteFax = function( dismissModalCallback )
          {
              faxService.eliminarFax(scope.dataInfo).post( {}, dataModal.faxRequest, function( result )
              {
                if(result.estado==1){
                          toastr.success(  "Fax eliminado correctamente","Acción realizada", viewConfig.toastConfig );
                }
                  else
                  {
                      toastr.error( "Error", "Fallo de Eliminación", viewConfig.toastConfig );
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
            scope.deleteFax( function( ilEliminado )
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
