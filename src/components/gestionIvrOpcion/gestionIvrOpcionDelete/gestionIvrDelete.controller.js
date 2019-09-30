angular.module( 'gestionIvrOpcion' )
    .controller( 'gestionIvrOpcionDeleteCtrl', [
        '$location','$log', 'ivrOpcionService', 'localStorageService' ,'$uibModalInstance', 'dataModal', 'viewConfig',
        function( $location,$log, ivrOpcionService,  localStorageService,$uibModalInstance, dataModal, viewConfig )
        {
          var scope = this;

          scope.varnab = $location.search();
          scope.dataInfo = {
              codUsuario: localStorageService.get("codUsuario"),
              token: localStorageService.get("token"),
              idInstancia: scope.varnab.idInstancia
          }
          scope.frmData = {
            title: 'Información del sistema',
            dataModal : dataModal,
            content:  '¿Está seguro que desea eliminar el Ivr '+dataModal.deleteRequest.pIdIvrNombre+' ?'            
          }

          scope.deleteIvr = function( dismissModalCallback )
          {
              scope.idIvr={ pIdIvrCop:dataModal.deleteRequest.pIdIvrCop}
              ivrOpcionService.eliminar(scope.dataInfo).post({}, scope.idIvr, function (result) {
                  if (result.estado == 1) {
                      toastr.success("Eliminación Exitosa", "Acción realizada", viewConfig.toastConfig);
                  } else if (result.estado == 0 || result.estado == -1) {
                      toastr.remove();
                      toastr.error( result.mensaje,"Error", viewConfig.toastConfig);
                  }
                  dismissModalCallback( result.estado )
              },
                  function (error) {
                      toastr.remove();
                      toastr.error("Error de consulta","Error", viewConfig.toastConfig);
                      dismissModalCallback( -1 );
                  }
              );

          }

          scope.onConfirmDelete= function()
          {
            scope.deleteIvr( function( ilEliminado )
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
