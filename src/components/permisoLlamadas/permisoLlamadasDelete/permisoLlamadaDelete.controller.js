angular.module('permisoLlamadas')
    .controller('permisoLlamadadDeleteCtrl', ['localStorageService','$location','permisoLlamadasService', '$uibModalInstance', 'idUsuari','viewConfig',
        function(localStorageService,$location, permisoLlamadasService, $uibModalInstance, idUsuari,viewConfig) {
          var scope = this;
          scope.varnab = $location.search();
          scope.dataInfo= {
            codUsuario: localStorageService.get("codUsuario"),
            token: localStorageService.get("token"),
            idInstancia : scope.varnab.idInstancia
          }

            scope.modal = {
                title: 'Información del sistema',
                content: '¿Estás seguro que deseas eliminar a '
            };
            /**
             * [eliminarUsuario description]
             * @return {[type]} [description]
             */
            
            scope.usuario = { idUsuari: idUsuari, nombreCompleto : null, idUsuario : idUsuari };
            scope.eliminarUsuario = function() {
                permisoLlamadasService.eliminaUsuario(scope.dataInfo).post({}, scope.usuario, function(result) {
                    if (result.estado == 1) {
                        toastr.success('Eliminación exitosa', 'Permiso llamadas', viewConfig.toastConfig);
                        scope.ok();
                        console.log(result.mensaje);

                    } else if (result.estado == -1) {
                        toastr.error("No se puede eliminar", "Error", viewConfig.toastConfig);
                        console.log(result.mensaje);
                    }
                }, function(error) {
                    console.log("error " + error);
                })
            };
            /**
             * [ok para cerrar el modal ejecutandose la funcion eliminar]
             * @return {[type]} [description]
             */
            scope.ok = function() {
                $uibModalInstance.close();
            };
            /**
             * [cancel cancela la eliminacion del usuario]
             * @return {[type]} [description]
             */
            scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
            
            /**
             * Busca el nombre completo del usuario
             */
            scope.listarUsuarioId = function() {
                permisoLlamadasService.listaUsuarioXId(scope.dataInfo).post({}, scope.usuario, function(result) {
                    if (result.estado == 1) {
                        scope.listaUsuarioId = result.tbUsuarioListaxId;
                        for (var i = 0; i < scope.listaUsuarioId.length; i++) {
                            scope.usuario.nombreCompleto = scope.modal.content + scope.listaUsuarioId[i].noNombre + " " + 
                                                           scope.listaUsuarioId[i].noApepat + " " + scope.listaUsuarioId[i].noApemat + "?";
                        }
                    } else if (result.estado == -1) {
                        console.log(result.mensaje);
                        console.log(result.codError);
                    }
                }, function(error) {
                    console.log("error " + error);
                })
            };

            scope.listarUsuarioId();
        }
    ]);
