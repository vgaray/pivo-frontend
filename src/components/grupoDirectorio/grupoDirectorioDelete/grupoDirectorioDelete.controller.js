angular.module( 'grupoDirectorio' )
    .controller( 'grupoDirectorioDeleteController', [
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


          scope.deleteGrupo = function( dismissModalCallback )
          {
              if(dataModal.grupoDirectorioRequest.idGrupo!=1){
                grupoDirectorioService.eliminarGrupo(scope.dataInfo).post( {}, dataModal.grupoDirectorioRequest, function( result )
                {
                    if(result.estado==1){
                        toastr.remove();
                        toastr.success(  "Grupo eliminado correctamente","Acción realizada", viewConfig.toastConfig );
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
              }else{
                    toastr.remove();
                    toastr.warning(  "No esta permitido eliminar Directorio Local","Advertencia", viewConfig.toastConfig );
              }

          }

          scope.onConfirmDelete= function()
          {
            scope.deleteGrupo( function( ilEliminado )
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
