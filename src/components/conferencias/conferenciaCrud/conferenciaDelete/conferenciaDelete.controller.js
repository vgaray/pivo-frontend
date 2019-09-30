angular.module('conferencia')
    .controller('conferenciaDeleteController',[
        '$location','$log','conferenciaService','localStorageService','$uibModalInstance','dataModal','viewConfig',
        function($location,$log,conferenciaService, localStorageService,$uibModalInstance, dataModal, viewConfig ){
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

            scope.deleteConferencia = function(dismissModalCallback){
                conferenciaService.eliminaConferenciaServ(scope.dataInfo).post({}, dataModal.conferenciaRequest, function(result){
                    if(result.estado == 1){
                        toastr.success("Eliminacion exitosa","Acción realizada",viewConfig.toastConfig);
                    }
                    else {
                        toastr.error("Error","Fallo en la eliminación",viewConfig.toastConfig);
                    }
                    dismissModalCallback(result.estado)
                },function(error){
                    toastr.error( error, "Error", viewConfig.toastConfig )
                    dismissModalCallback( -1 );
                })
            }

            scope.onConfirmDelete = function(){
                scope.deleteConferencia(function(ilEliminado){
                    $uibModalInstance.close(ilEliminado);
                });
            }

            scope.cancel = function(){
                $uibModalInstance.dismiss( 'cancel');
            }

        }
    ]);