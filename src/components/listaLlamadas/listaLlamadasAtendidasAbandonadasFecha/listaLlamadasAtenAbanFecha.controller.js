(
    function(){
        'use strict';
        angular.module('listaLlamadas')
            .controller('listaLlamadasCtrl',
            ['listaLlamadasService','localStorageService', '$location','viewConfig',
            function(listaLlamadasService, localStorageService, $location, viewConfig){
                var scope = this;
                scope.varnab = $location.search();

                scope.dataInfo = {
                    codUsuario : localStorageService.get("codUsuario"),
                    token      : localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                };

                scope.headersListaLlamadas = [
                   { description : 'Numero', fieldSort :'idLlamadas' },
                   { description : 'Fecha' , fieldSort : 'fecha'  },
                   { description : 'Atendidas' , fieldSort : 'atendidas'},
                   { description : 'Abandonadas Menor a Min', fieldSort : 'abandonadasMenor' },
                   { description : 'Abandonadas Mayor a Min', fieldSort : 'abandonadasMayor' }
                ]


                //funcion para listar usuarios
                scope.tbListarLlamadas = [];
                scope.listaLlamadasAtenAbanFechas = function(){
                    listaLlamadasService.listarLlamadasAtendidasAbandonadas(scope.dataInfo).post({}, {}, function(result) {
                        if(result.estado == 1){
                            scope.tbListarLlamadas = result.tbListLlamadas;
                            scope.totalItems = scope.tbListarLlamadas.length;
                        }
                    }, function(error){
                        console.log('Error: ' + error);    
                    })
                };

                scope.loadPage = function(){
                    scope.listaLlamadasAtenAbanFechas();
                }

                scope.loadPage();
            }])
            

    })();