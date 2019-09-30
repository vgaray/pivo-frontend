angular.module( 'cola' )
    .controller( 'colaAssignDeleteController', [
        '$location','$log', 'colaAssignService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, colaAssignService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
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


          scope.deleteAgenteCola = function( dismissModalCallback )
          {
              colaAssignService.eliminarAgenteCola(scope.dataInfo).post( {}, dataModal.agenteColaRequest, function( result )
              {
                if(result.estado==1){
                          toastr.success(  "Desasignada correctamente","Cola", viewConfig.toastConfig );
                }
                  else
                  {
                      toastr.remove();                    
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
            scope.deleteAgenteCola( function( ilEliminado )
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
