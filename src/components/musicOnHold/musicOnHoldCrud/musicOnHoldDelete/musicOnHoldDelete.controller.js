angular.module( 'musicOnHold' )
    .controller( 'musicOnHoldDeleteController', [
        '$location','$log', 'musicOnHoldService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, musicOnHoldService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
        {
          var scope = this;

          scope.varnab = $location.search();
          scope.dataInfo = {
              codUsuario: localStorageService.get("codUsuario"),
              token: localStorageService.get("token"),
              idInstancia: scope.varnab.idInstancia
          }
          scope.frmData = {
            title : dataModal.title,
            content: dataModal.content
          }

                    scope.deleteMusica = function( dismissModalCallback )
                    {
                        musicOnHoldService.eliminarMusicOnHold(scope.dataInfo).post( {}, dataModal.request, function( result )
                        {
                          if(result.estado==1){
                              toastr.remove();
                                    toastr.success(  "Eliminación exitosa","Acción realizada", viewConfig.toastConfig );
                          }
                          else if(result.estado==-1){
                              toastr.remove();
                                    toastr.error(  "La Carpeta de Musica aun contiene Audios ","Fallo en la eliminación", viewConfig.toastConfig );
                          }
                            else
                            {
                                toastr.error( "Error", "Fallo en la eliminación", viewConfig.toastConfig );
                            }
                            dismissModalCallback( result.idRasult )
                        },
                        function( error )
                        {
                            $log.error( error );
                            toastr.error( error, "Error", viewConfig.toastConfig );

                            dismissModalCallback( -1 );
                        } );

          }

                    scope.onConfirmDelete= function()
                    {
                      scope.deleteMusica( function( ilEliminado )
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
