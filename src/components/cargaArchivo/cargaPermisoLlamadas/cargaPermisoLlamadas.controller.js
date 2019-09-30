angular.module('cargaArchivo')
  .controller('cargaPermisoLlamadasCtrl', [
    '$state', '$location', '$log', '$http', 'archivoUtilService', 'localStorageService', '$uibModal', 'viewConfig',
    function($state, $location, $log, $http, archivoUtilService, localStorageService, $uibModal, viewConfig) {
      var scope = this;
      scope.varnab = $location.search();
      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
      }
      scope.myfile;
      scope.archivoConvertido = "";
      scope.frmData = {
        name_page_title: "Cargar Archivo",
        envioExcel: {
          request: {
            excelBase64: ""
          },
          response: {
            estado: "",
            listaErrores: ""
          }
        }
      }

      scope.atras = function() {
        var idInstanciaSelect = scope.dataInfo.idInstancia;
        var direccion = $state.href('principal.permisoLlamadas', {
          idInstancia: idInstanciaSelect
        });
        console.log(direccion);
        window.open(direccion, '_self');
      }


      scope.uploadFile = function() {
        var file = scope.myFile;
        if (file == null) {
          toastr.remove();
          toastr.error("Seleccione un archivo para subir", "Errores Encontrados", viewConfig.toastConfig);
        } else {
          var arreglo = file.name.split(".");
          var extencion = arreglo[arreglo.length - 1];
          if (extencion != "xls") {
            toastr.remove();
            toastr.error("Seleccione un archivo tipo excel", "Errores Encontrados", viewConfig.toastConfig);
          } else {
            console.log('file is ');
            console.dir(file);
            getBase64(file);
            console.log(scope.frmData.envioExcel.response.listaErrores);
          }
        }
      };

      scope.onMensajePop = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'src/components/cargaArchivo/cargaPermisoLlamadas/cargaPermisoLlamadasListaError/cargaPermisoLlamadasListaError.template.html',
          controller: 'cargaPermisoLlamadasListaErrorController as cargaPermisoLlamadasListaErrorCtrl',
          size: 'md',
          resolve: {
            dataModal: function() {
              scope.listError = scope.frmData.envioExcel.response.listaErrores;
              return scope.listError;
            }
          }
        });
      };

      scope.upFile = function () {
          document.querySelector('#archivo').click();
      };
      
      function getBase64(file) {
        var reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function() {
          scope.temporal = reader.result;
          scope.temporal = scope.temporal.replace("data:application/vnd.ms-excel;base64,", "");
          scope.temporal = scope.temporal.replace("data:application/wps-office.xls;base64,", "");

          scope.frmData.envioExcel.request.excelBase64 = scope.temporal;

          //onsole.log(reader.result);
          archivoUtilService.lastcargarPermisosUsuario(scope.dataInfo).post({}, scope.frmData.envioExcel.request, function(result) {
              scope.frmData.envioExcel.response.estado = result.estado;
              scope.frmData.envioExcel.response.listaErrores = result.listaErrores;
              if (scope.frmData.envioExcel.response.estado == 1) {

                //$window.location.href = '#!/anexosSip';
                console.log(scope.frmData.envioExcel.response.estado);
                console.log(scope.frmData.envioExcel.response.listaErrores);
                toastr.remove();
                toastr.success("Se subio con exito el documento excel", "Operacion exitos", viewConfig.toastConfig);

              } else if (scope.frmData.envioExcel.response.estado == 0) {

                console.log(scope.frmData.envioExcel.response.estado);
                console.log(scope.frmData.envioExcel.response.listaErrores);
                // toastr.error(scope.frmData.envioExcel.response.listaErrores, "Errores Encontrados", viewConfig.toastConfig);
                toastr.remove();
                scope.onMensajePop();
              }
            },
            function(error) {
              console.error('error: ' + error);
            }
          );
        };
        scope.frmData.envioExcel.request.excelBase64 = reader.result;
        reader.onerror = function(error) {
          console.log('Error: ', error);
        };
      }

    }
  ]);
