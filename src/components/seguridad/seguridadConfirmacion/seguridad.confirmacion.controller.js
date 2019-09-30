'use strict';

angular.module( 'seguridad' )
.controller( 'seguridadConfirmacionController', [    
    '$uibModalInstance', 
    'dataModal', 
    'seguridadService',
    function( $uibModalInstance, dataModal, seguridadService )
    {
       var scope = this;

       scope.frmData = {
           title : dataModal.mensaje,
           confirmacionList: dataModal.confirmacionList
       }

       scope.cancel = function () 
       {
           $uibModalInstance.dismiss('cancel');
       }
    }
 ] );