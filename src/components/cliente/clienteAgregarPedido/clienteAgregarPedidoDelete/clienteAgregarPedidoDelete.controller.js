(
  function () {
    'use strict';
    angular.module('cliente')
      .controller('pedidoClienteDeleteController', [
        '$location', '$log', 'pedidoService', 'localStorageService', '$uibModalInstance', 'dataModal', 'viewConfig',
        function ($location, $log, pedidoService, localStorageService, $uibModalInstance, dataModal, viewConfig) {
          var scope = this;

          scope.varnab = $location.search();
          scope.dataInfo = {
            codUsuario: localStorageService.get("codUsuario"),
            token: localStorageService.get("token"),

          };

          scope.modal = {
            title: 'Eliminar Pedido',
            content: '¿Está seguro que desea eliminar el pedido?'
          };

          scope.pedidoRequest = dataModal;

          scope.deletePedidoCliente = function () {
            pedidoService.eliminaPedidoCliente(scope.dataInfo).post({}, scope.pedidoRequest, function (result) {
              if (result.estado == 1) {
                scope.ok();
                toastr.success("Eliminación exitosa", "Acción Realizada", viewConfig.toastConfig);
              } else {
                toastr.warning(result.mensaje, "Advertencia", viewConfig.toastConfig);
              }
            }, function (error) {
              toastr.error("Error de conexión", "Error", viewConfig.toastConfig);
              console.log("Error " + error);
            });
          };

          /**
          * [ok para cerrar el modal ejecutandose la funcion eliminar]
          * @return {[type]} [description]
          */
          scope.ok = function () {
            $uibModalInstance.close();
          };
          /**
          * [cancel cancela la eliminacion del usuario]
          * @return {[type]} [description]
          */
          scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

        }
      ]);
  })();