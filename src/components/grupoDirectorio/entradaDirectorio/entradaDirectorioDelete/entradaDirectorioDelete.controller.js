angular.module( 'grupoDirectorio' )
    .controller( 'entradaDirectorioDeleteController', [
        '$location','$log', 'grupoDirectorioService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, grupoDirectorioService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
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


          scope.deleteEntrada = function( dismissModalCallback )
          {
              grupoDirectorioService.eliminarEntrada(scope.dataInfo).post( {}, dataModal.entradaDirectorioRequest, function( result )
              {
                if(result.estado==1){
                          toastr.success(  "Entrada eliminada correctamente","Acción realizada", viewConfig.toastConfig );
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
            scope.deleteEntrada( function( ilEliminado )
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
