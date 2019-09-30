angular.module('musicOnHold')
    .controller('musicOnHoldSaveController', [
        '$location', '$log', 'musicOnHoldService', '$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService',
        function($location, $log, musicOnHoldService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.invisible = dataModal.visible,
                scope.frmData = {
                    operacion: dataModal.whatOperation,
                    nameModal: dataModal.title,
                    mostrarAudio: {
                        request: {
                            pnoClase: dataModal.noMusica
                        }
                    },
                    musica: {
                        idMusica: dataModal.idMusica,
                        pNoClase: dataModal.noMusica
                    },

                    audio: {
                        pNoAudio: "",
                        musica: {
                            idClase: 1,
                            noClase: ""
                        },
                        base64Audio: ""
                    }
                }
            scope.myFile = "";
            scope.lsTemporalEdiAudio = [];
            scope.lsAudioPrima = [];
            //Listar Audios
            scope.lsAudio = [];
            scope.lsAudioIngresadoResido = [];
            scope.lsAudioIngresadoAnterio = [];
            scope.audioRequestIngresar = [];
            scope.audioRequestIngresarNuevos = [];
            scope.lsAudiosEliminado = [];
            scope.audioRequestIngresarAntiguos = [];
            scope.lsIguales = [];
            scope.TempoLisAudioMod = [];
            scope.tipOperacion = 0;
            scope.varIndiceOpIn = 0;
            scope.varIndiceOpMo = 0;
            scope.varEliAudio = 0;
            scope.listaVis1 = false;
            scope.listaVis = true;
            scope.varVali = true;
            scope.btp=true;
            scope.valiIn=true;
            scope.varFin=0;
            scope.validadSubir = "";
            var TempoNombreClaseEdi = scope.frmData.musica.pNoClase;
            var TempoLisAudio = [];
            var cont1 = 0;
            var cont2 = 0;
            var encuentraDiferecia = null;
            var encuentraIguales = null;
            scope.lsRequestFinalRegistro = {
                inseAudioMohRequestList: []
            };
            scope.lsRequestFinalModificar = {
                listaAudiosRequest: []
            };
            scope.lsRequestFinalEliminar = {
                listaEliminarAudiosRequest: []
            };


            scope.listarAudio = function() {
                musicOnHoldService.listarAudioMoh(scope.dataInfo).post({}, scope.frmData.mostrarAudio.request, function(result) {
                        scope.lsAudio = result.lsAudioMoh;
                        // revisar listas para modificar problema en el ingreso de datos pIdClase
                        scope.lsAudioModificar = result.lsAudioMoh;
                        TempoLisAudio = result.lsAudioMoh;
                        scope.TempoLisAudioMod = result.lsAudioMoh;
                        if (scope.lsAudio.length == 0) {
                            scope.tipOperacion = 1;
                            scope.listaVis1 = false;
                            scope.listaVis = true;
                        } else {
                            scope.agregarLista();
                            scope.tipOperacion = 2;
                            scope.listaVis1 = true;
                            scope.listaVis = false;
                        }
                    },
                    function(error) {
                        console.error(error);
                    });
            };
            //Agregar a Lista
            scope.agregarLista = function() {
                for (i = 0; i < scope.lsAudio.length; i++) {
                    scope.idAudioPro = scope.lsAudio[i].idAudio;
                    scope.noAudioPro = scope.lsAudio[i].noAudio;

                    scope.lsTemporalEdiAudio.push({
                        idAudio: scope.idAudioPro,
                        noAudio: scope.noAudioPro,
                        base64Audio: scope.frmData.audio.base64Audio,
                        flagEditar: false
                    });
                    scope.lsAudioPrima.push({
                        idAudio: scope.idAudioPro,
                        noAudio: scope.noAudioPro,
                        base64Audio: scope.frmData.audio.base64Audio,
                        flagEditar: false
                    });
                }
            };
            scope.inputSpace = function(){

            }
            //SubirAudio
            
            scope.subirAudio = function() {
                if(scope.myFile=="" || scope.myFile==undefined){
                  scope.validadSubir = "*Seleccione Archivo";
                  scope.varFin=1;
                }else{
                  var reader = new FileReader();
                scope.frmData.audio.pNoAudio = scope.myFile.name;
                reader.readAsDataURL(scope.myFile);
                reader.onload = function() {
                    scope.temporal = reader.result;
                    var resp1 = 100;
                    resp1 = scope.temporal.search("mp3");
                    var resp2 = 100;
                    resp2 = scope.temporal.search("wav");
                    if (resp1 >= 0 || resp2 >= 0) {
                        scope.temporal = scope.temporal.replace("data:audio/wav;base64,", "");
                        scope.temporal = scope.temporal.replace("data:audio/mp3;base64,", "");
                        scope.frmData.audio.base64Audio = scope.temporal;
                        //colocando el base64 dentro del registro que esta en bacio
                        for (i = 0; i < scope.lsAudio.length; i++) {
                            if (scope.lsAudio[i].noAudio == scope.varNombreInsertado) {
                                scope.lsAudio[i].base64Audio = scope.temporal;
                                if(scope.varVali == true){
                                document.getElementById('fileMusica').value = null;
                                }
                            }
                        }
                    }

                }
              }
            };
            //InsertarAudio
            scope.crearAudio = function() {
                scope.subirAudio();
                //scope.frmData.audio.pNoAudio = scope.frmData.audio.pNoAudio.replace(//g,'_').trim();
                scope.frmData.audio.pNoAudio = scope.frmData.audio.pNoAudio.replace(/[()]/g,'').replace(/ /g,'_').replace(/[^a-z0-9A-Z. ()]/g,'_').trim();
                var arreglo1 = scope.frmData.audio.pNoAudio.split(".");                
                if (scope.lsAudio.length == 0) {
                    if (arreglo1[1] == "mp3" || arreglo1[1] == "wav") {
                        scope.lsAudio = [];
                        scope.lsAudio = scope.lsTemporalEdiAudio;
                        scope.lsAudio.push({
                            idAudio: null,
                            noAudio: scope.frmData.audio.pNoAudio,
                            base64Audio: scope.frmData.audio.base64Audio,
                            flagEditar: false
                        });
                        scope.varNombreInsertado = scope.frmData.audio.pNoAudio;
                        scope.lsAudioPrima.push({
                            idAudio: null,
                            noAudio: scope.frmData.audio.pNoAudio,
                            base64Audio: scope.frmData.audio.base64Audio,
                            flagEditar: false
                        });
                        scope.listaVis1 = true;
                        scope.listaVis = false;

                    } else {
                      if(scope.varFin==1){
                          scope.validadSubir = "*Seleccione Archivo";
                          scope.varFin=0;
                      } else{                        
                        scope.validadSubir = "*Formato del Archivo Incorrecto";
                      }
                    }
                } else {
                    if (arreglo1[1] == "mp3" || arreglo1[1] == "wav") {
                        for (i = 0; i < scope.lsAudio.length; i++) {
                            if (scope.frmData.audio.pNoAudio == scope.lsAudio[i].noAudio) {

                                scope.varVali = false;
                                i = scope.lsAudio.length + 1;
                                if(scope.varFin==1){
                                    scope.validadSubir = "*Seleccione Archivo";
                                    scope.varFin=0;
                                } else{
                                  scope.validadSubir = "*Audio Ya ingresado";
                                }
                            } else {
                              scope.varVali = true;
                                scope.validadSubir = "" ;
                            }
                        }

                        if (scope.varVali == true) {
                            scope.lsAudio = [];
                            scope.lsAudio = scope.lsTemporalEdiAudio;
                            scope.lsAudio.push({
                                idAudio: null,
                                noAudio: scope.frmData.audio.pNoAudio,
                                base64Audio: scope.frmData.audio.base64Audio,
                                flagEditar: false
                            });
                            scope.varNombreInsertado = scope.frmData.audio.pNoAudio;
                            scope.lsAudioPrima.push({
                                idAudio: null,
                                noAudio: scope.frmData.audio.pNoAudio,
                                base64Audio: scope.frmData.audio.base64Audio,
                                flagEditar: false
                            });
                            scope.listaVis1 = true;
                            scope.listaVis = false;
                            i = scope.lsAudio.length + 1;
                        }

                    } else {
                      if(scope.varFin==1){
                          scope.validadSubir = "*Seleccione Archivo";
                          scope.varFin=0;
                      }
                      else{
                        scope.validadSubir = "*Formato del Archivo Incorrecto";
                      }
                    }
                }
                scope.comprobacionValidacion();
            }

            scope.comprobacionValidacion= function(){
               if(scope.validadSubir==""){
                scope.invisible = false;
                scope.btp=false;
              }else if(scope.validadSubir!=""){
                scope.invisible = false;
                scope.btp=false;
              }
            }

            scope.listaRequestIngresar = function() {
                for (i = 0; i < scope.lsAudio.length; i++) {
                    scope.audioRequestIngresar.push({
                        idAudio: scope.lsAudio[i].idAudio,
                        pNoAudio: scope.lsAudio[i].noAudio,
                        musica: {
                            idClase: 1,
                            noClase: scope.frmData.musica.pNoClase
                        },
                        base64Audio: scope.lsAudio[i].base64Audio
                    });
                }
            }

            scope.listaAudiosAnteriorPosterior = function() {
                scope.listaRequestIngresar();
                for (i = 0; i < scope.lsAudio.length; i++) {
                    //Nuevos Ingresos
                    if (scope.audioRequestIngresar[i].base64Audio != "") {
                        scope.audioRequestIngresarNuevos.push({
                            pNoAudio: scope.lsAudio[i].noAudio,
                            musica: {
                                idClase: 1,
                                noClase: scope.frmData.musica.pNoClase
                            },
                            base64Audio: scope.lsAudio[i].base64Audio
                        });
                        scope.varIndiceOpIn = 1;
                    }
                    //Modificacion de ingresos pasados
                    else if (scope.audioRequestIngresar[i].base64Audio == "") {
                        for (r = 0; r < scope.audioRequestIngresar.length; r++) {
                            for (t = 0; t < TempoLisAudio.length; t++) {
                                if (scope.audioRequestIngresar[r].idAudio == TempoLisAudio[t].idAudio) {
                                    scope.audioRequestIngresarAntiguos.push({
                                        pIdAudio: scope.audioRequestIngresar[r].idAudio,
                                        musica: {
                                            idClase: 1,
                                            noClase: scope.frmData.musica.pNoClase
                                        },
                                        pNoAudio: scope.audioRequestIngresar[r].pNoAudio,
                                        audio: {
                                            idAudio: TempoLisAudio[t].idAudio,
                                            noAudio: TempoLisAudio[t].noAudio
                                        }
                                    });
                                }
                            }
                        }
                        scope.varIndiceOpMo = 1;
                    }
                }
            }

            //Guardar General
            scope.onSalvarClaseYAudios = function() {

                if (scope.frmData.operacion == 1) {
                    //Insertar
                    if (scope.frmData.musica.idMusica == null && scope.lsAudio.length == 0 && scope.frmData.musica.pNoClase != null) {
                        scope.opcion1Registrar();
                        

                    } else if (scope.frmData.musica.idMusica == null && scope.lsAudio.length != 0 && scope.frmData.musica.pNoClase != null) {
                        scope.opcion2Registrar();
                        if(scope.response2Registar!=0){
                        }
                    }
                } else if (scope.frmData.operacion == 2) {
                    //Editar
                    scope.compararArreglo();
                    scope.verifcaResul();
                    if (TempoNombreClaseEdi != scope.frmData.musica.pNoClase && scope.varEdiAr == 1) {
                        if (scope.varEliAudio == 0) {
                            scope.opcion1Actualizar();
                            if(scope.responseOp1Actualizar!=0){
                              toastr.remove();
                              toastr.success("¡Carpeta actualizada con éxito!", "Éxito", viewConfig.toastConfig);
                            }
                        } else if (scope.varEliAudio == 1) {
                            scope.eliminarAudiosCarpetaBD();
                            scope.opcion1Actualizar();
                            if(scope.responseEliminar!=0 && scope.responseOp1Actualizar!=0){
                              toastr.remove();
                              toastr.success("¡Modificación y Eliminación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                            }
                        }

                    } else if (TempoNombreClaseEdi != scope.frmData.musica.pNoClase && scope.varEdiAr != 1) {
                        scope.opcion2Actualizar();
                        if(scope.responseOps3Insertar!=0 &&  scope.responseOps3Modificar !=0){
                          toastr.remove();
                          toastr.success("¡Ingreso y Modificación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                        }

                    } else if (TempoNombreClaseEdi == scope.frmData.musica.pNoClase) {
                        //Ingresar y/o modificar audio
                        if (scope.varEdiAr == 0 && scope.varEliAudio == 0 || scope.varEliAudio == 1) {
                            scope.opcion3Registrar();
                        }
                        //Accion solo Eliminar Audio
                        else if (scope.varEdiAr == 1 && scope.varEliAudio == 1) {
                            scope.eliminarAudiosCarpetaBD();
                            if(scope.responseEliminar!=0){
                              toastr.remove();
                              toastr.success("¡Eliminación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                            }
                        }

                    }

                }

            }

            //Comparacion de arreglo para editar
            scope.compararArreglo = function() {
                if (TempoLisAudio.length == 0) {
                    scope.varEdiAr = 0;
                    //Lista tempora anterior esta vacia
                } else if (TempoLisAudio.length != 0 && TempoLisAudio.length == scope.lsAudio.length) {
                    encuentraDiferecia = false;
                    encuentraIguales = false;
                    for (i = 0; i < TempoLisAudio.length; i++) {

                        for (j = 0; j < scope.lsAudio.length; j++) {
                            if (i == j) {
                                if (TempoLisAudio[i].noAudio != scope.lsAudio[j].noAudio) {
                                    encuentraDiferecia = true;
                                } else if (TempoLisAudio[i].noAudio == scope.lsAudio[j].noAudio) {
                                    encuentraIguales = true;
                                }
                            } else {
                                var distintos = false;
                            }
                        }

                    }
                } else if (TempoLisAudio.length != 0 && TempoLisAudio.length != scope.lsAudio.length) {
                    scope.varEdiAr = 0;
                }
            }
            //Verificacio de Resultado
            scope.verifcaResul = function() {
                if (encuentraDiferecia == false) {
                    scope.varEdiAr = 1;
                    //1 los elementos de las las listas son iguales
                } else if (encuentraDiferecia == true) {
                    scope.varEdiAr = 0;
                    //o los elementos de las listas son diferentes
                }
            }

            //Cambiar la lista para editar nombre Carpeta
            scope.nombreCarpetaEditar = function() {
                scope.lsEdiMusica = [];
                scope.lsEdiMusica = {
                    pIdClase: scope.frmData.musica.idMusica,
                    pNoClase: scope.frmData.musica.pNoClase,
                    musica: {
                        idClase: scope.frmData.musica.idMusica,
                        noClase: TempoNombreClaseEdi
                    }

                };

            }

            //Valores response de las operaciones de los servicios
            scope.response1Registar=0;
            scope.response2Registrar=0;
            //scope.response3Registrar=0;
            scope.responseOps3Insertar=0;
            scope.responseOps3Modificar=0;
            scope.responseOp1Actualizar=0;
            //scope.responseOp2Actualizar=0;
            //scope.response1Modificar=0;
            //scope.response2Modificar=0;
            scope.responseEliminar=0;

            scope.changeNoClase = function(){
                
                if(scope.frmData.musica.pNoClase != null){
                    scope.frmData.musica.pNoClase = scope.frmData.musica.pNoClase.replace(/ /g,'_').trim();
                    //scope.frmData.musica.pNoClase[scope.frmData.musica.pNoClase.lastIndexOf('_')]='';
                } else {
                    scope.frmData.musica.pNoClase = scope.frmData.musica.pNoClase.trim();
                }
            }

            //Insertar
            //Opcion 1 Guardar  Solo Carpeta
            /*if(scope.response1Registar!=0){
                          toastr.remove();
                          toastr.success("¡Carpeta insertada con éxito!", "Éxito", viewConfig.toastConfig);
                        } else{
                            toastr.remove();
                            toastr.warning("La carpeta "+scope.frmData.musica.pNoClase+" ya existe", "Éxito", viewConfig.toastConfig);
                        }
                        */
            scope.opcion1Registrar = function() {
                musicOnHoldService.ingresarMusicOnHold(scope.dataInfo).post({}, scope.frmData.musica, function(result) {
                    if(result.estado == 1){
                        scope.response1Registar=1;
                        var txt =scope.frmData.musica.pNoClase;
                        toastr.remove();
                        toastr.success("¡Carpeta insertada con éxito!", "Éxito", viewConfig.toastConfig);
                        $uibModalInstance.close();
                    }else if(result.estado == -1 || result.estado == 0) {
                        scope.response1Registar=0;
                        toastr.remove();
                        toastr.warning("La carpeta "+scope.frmData.musica.pNoClase+" ya existe, por favor ingrese otro nombre", "Error", viewConfig.toastConfig);
                    }
                }, function(err) {});
                  return scope.response1Registar;

            }
            //Opcion 2 Guardar Carpeta y Audio al mismo tiempo
            scope.opcion2Registrar = function() {
                scope.listaRequestIngresar();
                musicOnHoldService.ingresarMusicOnHold(scope.dataInfo).post({}, scope.frmData.musica, function(result) {
                    if(result.estado == 1){
                        for (i = 0; i < scope.audioRequestIngresar.length; i++) {
                            scope.audioRequestIngresar[i].musica.idClase = scope.frmData.musica.idMusica;
                            scope.lsRequestFinalRegistro.inseAudioMohRequestList.push({
                                base64Audio: scope.audioRequestIngresar[i].base64Audio,
                                musica: {
                                    idClase: result.idRasult,
                                    noClase: scope.audioRequestIngresar[i].musica.noClase
                                },
                                pNoAudio: scope.audioRequestIngresar[i].pNoAudio
                            });
                        }
                        musicOnHoldService.ingresarAudioMoh(scope.dataInfo).post({}, scope.lsRequestFinalRegistro, function(result) {
                        });
                        toastr.remove();
                        toastr.success("¡Carpeta y Audios insertado con éxito!", "Éxito", viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if(result.estado == -1 || result.estado == 0){
                        toastr.remove();
                        toastr.error("Error al actualizar los audios", "Error", viewConfig.toastConfig);
                    }
                });
                  return scope.response2Registrar=1;
            }
            //Opcion 3 Guardart Audio en una carpeta ya existente
            scope.opcion3Registrar = function() {
                scope.listaAudiosAnteriorPosterior();
                if (scope.varIndiceOpIn == 1 && scope.varIndiceOpMo == 0) {
                    scope.op3Ingresar();
                    if(scope.responseOps3Insertar!=0 && scope.responseOps3Modificar==0 && scope.responseEliminar==0){
                      toastr.remove();
                      toastr.success("¡Ingreso de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }
                } else if (scope.varIndiceOpIn == 0 && scope.varIndiceOpMo == 1) {
                    scope.op3modificar();
                    scope.eliminarAudiosCarpetaBD();
                    if(scope.responseOps3Insertar!=0){
                      toastr.remove();
                      toastr.success("¡Inserción de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }else if(scope.responseOps3Modificar!=0 ){
                      toastr.remove();
                      toastr.success("¡Modificación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }//
                     else if( scope.responseEliminar!=0  && scope.responseOps3Modificar!=0){
                      toastr.remove();
                      toastr.success("¡Eliminación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }else if( scope.responseOps3Insertar!=0 && scope.responseOps3Modificar!=0 && scope.responseEliminar!=0 ){
                      toastr.remove();
                      toastr.success("¡Ingreso , Modificación y Eliminación de Audio(s) exitosa! Aca", "Éxito", viewConfig.toastConfig);
                    }
                } else if (scope.varIndiceOpIn == 1 && scope.varIndiceOpMo == 1) {
                    scope.op3Ingresar();
                    scope.op3modificar();
                    scope.eliminarAudiosCarpetaBD();
                    if(scope.responseOps3Insertar!=0){
                      toastr.remove();
                      toastr.success("¡Inserción de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }else if(scope.responseOps3Modificar!=0){
                      toastr.remove();
                      toastr.success("¡Modificación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    } else if( scope.responseEliminar!=0 && scope.responseOps3Modificar==0){
                      toastr.remove();
                      toastr.success("¡Eliminación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }else if(scope.responseOps3Insertar!=0 && scope.responseOps3Modificar!=0 && scope.responseEliminar!=0){
                      toastr.remove();
                      toastr.success("¡Ingreso , Modificación y Eliminación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }
                } else if (scope.varIndiceOpIn == 0 && scope.varIndiceOpMo == 0) {
                    scope.eliminarAudiosCarpetaBD();
                    if(scope.responseOps3Insertar!=0 && scope.responseOps3Modificar==0 && scope.responseEliminar==0){
                      toastr.remove();
                      toastr.success("¡Eliminación de Audio(s) exitosa!", "Éxito", viewConfig.toastConfig);
                    }
                }
            }
            //opcion1 de la opcion3 de IngresarNuevos Audios
            scope.op3Ingresar = function() {
                for (i = 0; i < scope.audioRequestIngresarNuevos.length; i++) {
                    scope.audioRequestIngresarNuevos[i].musica.idClase = scope.frmData.musica.idMusica;
                    scope.lsRequestFinalRegistro.inseAudioMohRequestList.push({
                        base64Audio: scope.audioRequestIngresarNuevos[i].base64Audio,
                        musica: {
                            idClase: scope.audioRequestIngresarNuevos[i].musica.idClase,
                            noClase: scope.audioRequestIngresarNuevos[i].musica.noClase
                        },
                        pNoAudio: scope.audioRequestIngresarNuevos[i].pNoAudio
                    });
                }
                //Metodo del service para ingresar
                musicOnHoldService.ingresarAudioMoh(scope.dataInfo).post({}, scope.lsRequestFinalRegistro, function(result) {
                  $uibModalInstance.close();
                });
                return scope.responseOps3Insertar=1;
            }
            //opcion2 de la opcion3 de IngresarAntiguos Audios
            scope.op3modificar = function() {
                for (i = 0; i < scope.audioRequestIngresarAntiguos.length; i++) {
                    scope.audioRequestIngresarAntiguos[i].musica.idClase = scope.frmData.musica.idMusica;
                    scope.lsRequestFinalModificar.listaAudiosRequest.push({
                        pIdAudio: scope.audioRequestIngresarAntiguos[i].pIdAudio,
                        musica: {
                            idClase: scope.audioRequestIngresarAntiguos[i].musica.idClase,
                            noClase: scope.audioRequestIngresarAntiguos[i].musica.noClase
                        },
                        pNoAudio: scope.audioRequestIngresarAntiguos[i].pNoAudio,
                        audio: {
                            idAudio: scope.audioRequestIngresarAntiguos[i].audio.idAudio,
                            noAudio: scope.audioRequestIngresarAntiguos[i].audio.noAudio
                        }
                    });
                }
                //Metodo para Actualizar nombre de los audios ya ingresados
                musicOnHoldService.editarAudioMoh(scope.dataInfo).post({}, scope.lsRequestFinalModificar, function(result) {
                $uibModalInstance.close();
                });
                  return scope.responseOps3Modificar=1;
            }

            //Actualizar
            //Opcion 1 cuando solo se cambia el nombre de la carpeta
            scope.opcion1Actualizar = function() {
                scope.nombreCarpetaEditar();
                musicOnHoldService.editarMusicOnHold(scope.dataInfo).post({}, scope.lsEdiMusica, function(result) {
                    $uibModalInstance.close();
                }, function(err) {});
                return scope.responseOp1Actualizar=1;
            }
            //Opcion 2 Actualizar nombre de la carpeta y audios
            scope.opcion2Actualizar = function() {
                scope.nombreCarpetaEditar();
                musicOnHoldService.editarMusicOnHold(scope.dataInfo).post({}, scope.lsEdiMusica, function(result) {
                    scope.listaAudiosAnteriorPosterior();
                    scope.op3Ingresar();
                    scope.op3modificar();
                });
            }


            //EliminarAudio
            scope.onEliminarAudio = function(noAudioParametro) {
                for (i = 0; i < scope.lsAudio.length; i++) {
                    if (scope.lsAudio[i].noAudio == noAudioParametro) {
                        if (scope.lsAudio[i].idAudio != null) {
                            scope.lsAudiosEliminado.push({
                                pIdAudio: scope.lsAudio[i].idAudio,
                                musica: {
                                    idClase: scope.frmData.musica.idMusica,
                                    noClase: TempoNombreClaseEdi
                                },
                                audio: {
                                    idAudio: scope.lsAudio[i].idAudio,
                                    noAudio: scope.lsAudio[i].noAudio
                                }
                            });
                        }
                        scope.varEliAudio = 1;
                        scope.lsAudio.splice(i, 1);
                        scope.lsAudioPrima.splice(i, 1);
                        scope.btp=false;
                    }
                }
            }
            //Elimnar Audio de la carpeta en el servidor y en la bd
            scope.eliminarAudiosCarpetaBD = function() {
                for (i = 0; i < scope.lsAudiosEliminado.length; i++) {
                    scope.lsRequestFinalEliminar.listaEliminarAudiosRequest.push({
                        pIdAudio: scope.lsAudiosEliminado[i].pIdAudio,
                        musica: {
                            idClase: scope.lsAudiosEliminado[i].musica.idClase,
                            noClase: scope.lsAudiosEliminado[i].musica.noClase
                        },
                        audio: {
                            idAudio: scope.lsAudiosEliminado[i].audio.idAudio,
                            noAudio: scope.lsAudiosEliminado[i].audio.noAudio
                        }
                    });
                }
                //Metodo del service para ingresar
                musicOnHoldService.eliminarAudioMoh(scope.dataInfo).post({}, scope.lsRequestFinalEliminar, function(result) {
                  $uibModalInstance.close();
                    //toastr.remove();
                    //toastr.success("¡Audios eliminados con éxito!", "Éxito", viewConfig.toastConfig);
                });
                return scope.responseEliminar=1;
            }

            //getAudio para Editar
            scope.getAudioEditar = function(noAudioParametro) {
                scope.lsAudio = [];
                scope.lsAudio = scope.lsTemporalEdiAudio;
                //scope.noAudioConvertido = noAudioParametro.replace(/ /g,'_');
                for (i = 0; i < scope.lsAudio.length; i++) {
                    if (scope.lsAudio[i].noAudio ==noAudioParametro) {
                        scope.varFinal = scope.lsAudio[i].flagEditar;
                    }
                }
                return scope.varFinal;
            }

            scope.upFile = function () {
                document.querySelector('#fileMusica').click();
            };

            //setAudio para Editar
            scope.setAudioEditar = function(noAudioParametro) {
                scope.lsAudio = [];
                scope.lsAudio = scope.lsTemporalEdiAudio;
                scope.lsAudioTempoCerrar = scope.lsTemporalEdiAudio;
                
                for (i = 0; i < scope.lsAudio.length; i++) {
                    if (scope.lsAudio[i].noAudio == noAudioParametro) {
                        scope.lsAudio[i].flagEditar = true;
                        scope.indiceAudio = i;
                        scope.varFinal = scope.lsAudio[i].flagEditar;
                    }
                }
                return scope.varFinal;
            }

            //Guardar nombre editado del audio
            scope.guardarEditarAudio = function(noAudioParametro) {
                scope.noAudioConvertido = noAudioParametro
                noAudioParametro = scope.noAudioConvertido.replace(/ /g,'_');
                scope.lsAudio = [];
                scope.lsAudio = scope.lsAudioTempoCerrar;
                for (i = 0; i < scope.lsAudio.length; i++) {
                    if (scope.lsAudio[scope.indiceAudio].flagEditar == true) {                        
                      var arreglo1 = scope.lsAudio[scope.indiceAudio].noAudio.split(".");
                      if (arreglo1[1] == "mp3" || arreglo1[1] == "wav") {
                        scope.lsAudio[scope.indiceAudio].noAudio = noAudioParametro;
                        scope.lsAudio[scope.indiceAudio].flagEditar = false;
                        scope.lsAudioPrima[scope.indiceAudio].noAudio = noAudioParametro;
                        scope.lsAudioPrima[scope.indiceAudio].flagEditar = false;
                        scope.varFinal = scope.lsAudio[scope.indiceAudio].flagEditar;
                        scope.validadDentro="";
                        scope.valiIn=true;
                        scope.btp=false;
                      }else{
                        scope.validadDentro="*Audio ("+scope.lsAudio[scope.indiceAudio].noAudio +") no tienen el formato correcto";
                        scope.valiIn=false;
                        i=scope.lsAudio.length+1;
                      }
                    }
                }
                return scope.varFinal;
            }
            // Listar audios cuando regresa
            scope.listarAudioRegreso = function(noAudioParametro) {
                scope.lsAudio = scope.lsAudioTempoCerrar;
                scope.lsAudioPrima;
                for (i = 0; i < scope.lsAudio.length; i++) {
                    if (scope.lsAudio[scope.indiceAudio].flagEditar == true) {
                        scope.lsAudio[scope.indiceAudio].noAudio = scope.lsAudioPrima[scope.indiceAudio].noAudio;
                        scope.lsAudio[scope.indiceAudio].flagEditar = false;
                        scope.varFinal = scope.lsAudio[scope.indiceAudio].flagEditar;
                        scope.validadDentro="";
                        scope.valiIn=true;
                    }
                }
                return scope.varFinal;
            };

            scope.validarExtension =function(){
                if(scope.myFile!=null){
                    if(scope.myFile!=""){
                        var extension = scope.myFile.name.split('.').pop().toLowerCase();
                        if(extension != 'mp3' && extension != 'wav'){
                            return true;
                        }else{
                            return false;
                        }    
                    }
                }            
            }

            //Imput de Carpeta
            scope.habilitarBoton = function() {
                if (scope.frmData.musica.pNoClase == null) {
                    if(scope.lsAudio.length==0){
                    scope.lsTemporalEdiAudio = [];
                    scope.lsAudioPrima = [];
                    scope.lsAudio = [];
                    scope.lsAudioIngresadoResido = [];
                    scope.lsAudioIngresadoAnterio = [];
                    scope.audioRequestIngresar = [];
                    scope.audioRequestIngresarNuevos = [];
                    scope.lsAudiosEliminado = [];
                    scope.audioRequestIngresarAntiguos = [];
                    scope.lsIguales = [];
                    scope.TempoLisAudioMod = [];
                    TempoLisAudio = [];
                    scope.validadSubir = "" ;
                    document.getElementById('fileMusica').value = null;
                    scope.invisible = true;
                    scope.btp=true;
                  }
                  else {
                  scope.invisible = false;
                  scope.btp=true;
                  }

                } else if (scope.frmData.musica.pNoClase != null){
                    scope.invisible = false;
                    scope.btp=false;
                }
                else if (scope.validadDentro == ""){
                    scope.invisible = false;
                    scope.btp=true;
                }
                else if (scope.validadDentro != ""){
                    scope.invisible = false;
                    scope.btp=false;
                }else if(scope.validadSubir==""){
                  scope.invisible = false;
                  scope.btp=false;
                }else if(scope.validadSubir!=""){
                  scope.invisible = false;
                  scope.btp=true;
                }
            }
            //Lsita de Audios
            scope.habilitarLista = function() {
                if (scope.lsAudio.length != 0) {
                    scope.listaVis1 = false;
                    scope.listaVis = true;
                } else {
                    scope.listaVis1 = true;
                    scope.listaVis = false;
                }
            }
            //Habilitar bontonsubir
            //Cerrar
            scope.cancel = function() {
                $uibModalInstance.close();
            }
            //Antes de cargar la pagina
            scope.onLoad = function() {
            scope.listarAudio();
            }
            scope.onLoad();

        }
    ]);

