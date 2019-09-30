angular.module("customTrunk").
controller('customTrunkDelete', ['customTrunkService', '$state', '$location', 'localStorageService', 'viewConfig', '$uibModalInstance', 'dataModal', 'utilService',
  function(customTrunkService, $state, $location, localStorageService, viewConfig, $uibModalInstance, dataModal, utilService) {
    var scope = this;
    scope.varnab = $location.search();
          scope.dataInfo = {
              codUsuario: localStorageService.get("codUsuario"),
              token: localStorageService.get("token"),
              idInstancia: scope.varnab.idInstancia
          }
          scope.frmData = {
            title : dataModal.title,
            content: dataModal.content,
            customTrunk: {
              entity:dataModal.request
            }
          }
          scope.mensajeFinal="";
                    scope.deleteCustomTrunk = function( dismissModalCallback )
                    {
                        customTrunkService.eliminaCustomTrunk(scope.dataInfo).post( {}, scope.frmData.customTrunk.entity, function( result )
                        {
                          if(result.estado==1){
                              toastr.remove();
                                scope.mensajeFinal="Custom Trunk < " +scope.frmData.customTrunk.entity.nombre+" > eliminada correctamente";
                                var mensajeMon =scope.mensajeFinal;
                                    toastr.success(  mensajeMon,"Acción realizada", viewConfig.toastConfig );
                          }
                          else if(result.estado==-1){
                              toastr.remove();
                                    toastr.error(  "No se Puede Eliminar ","Fallo en la eliminación", viewConfig.toastConfig );
                          }else if(result.estado==0){
                              toastr.remove();
                                    toastr.error("CustomTrunk esta siendo usado en un 'Contexto Saliente' de 'Plan Marcación'","No se Puede Eliminar", viewConfig.toastConfig );
                          }

                            else
                            {
                              toastr.remove();
                                toastr.error( "Error", "Fallo en la eliminación", viewConfig.toastConfig );
                            }
                            dismissModalCallback( result.estado)
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

                      scope.deleteCustomTrunk( function( ilEliminado )
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
