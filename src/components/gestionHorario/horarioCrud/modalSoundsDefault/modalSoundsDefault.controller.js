angular.module('gestionHorario')
    .controller('modalSoundsDefaultController', [
        '$log', '$location', 'localStorageService', '$uibModalInstance', 'gestionHorarioService', 'ngAudio', 'viewConfig',
        function ($log, $location, localStorageService, $uibModalInstance, gestionHorarioService, ngAudio, viewConfig) 
        {
            var scope = this;

            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            };

            scope.ui = {
                isFilesLoaded : false,
                isListSoundEmpty : false,
                isErrorService : false
            }

            scope.frmData = {
                lsAudiosPredeterminados: []
            }

            scope.onLoadSoundsInServer = function () 
            {
                scope.ui.isFilesLoaded = false;
                gestionHorarioService.listarAudiosPorDefecto( scope.dataInfo ).post( {}, {}, function( result )
                {
                    if( result.estado == 1 )
                    {
                        scope.frmData.lsAudiosPredeterminados = result.lsAudiosPredeterminados;
                        scope.ui.isFilesLoaded = true;

                        if( scope.frmData.lsAudiosPredeterminados.length == 0 )
                        {
                            scope.ui.isListSoundEmpty = true;
                            scope.ui.isFilesLoaded = false;
                        }
                        scope.audiosPL(scope.frmData.lsAudiosPredeterminados);
                    }
                    else
                    {
                        scope.ui.isErrorService = true;
                        scope.ui.isListSoundEmpty = false;
                        scope.ui.isFilesLoaded = false;
                        console.error( "Error: " + result.mensaje );
                        toastr.error( result.mensaje, "Error", viewConfig.toastConfig );
                    }
                },
                function(error)
                {
                    console.error( 'Error al cargar los audios del servidor -> ' + error );
                    toastr.error( 'Error de conexión con el servicio.', "Error", viewConfig.toastConfig );
                });
            }

            scope.audiosPL = function(variable){
                variable = scope.frmData.lsAudiosPredeterminados;
                for (var i = 0; i < variable.length; i++) {
                    repro("AudioIVR/"+variable[i],"ivr-"+(i+1),i+1,"ivr");
                }
            }

            scope.AudioNombreElegir = function(id){
                scope.varAudio = scope.frmData.lsAudiosPredeterminados[id-1];
                //console.log("audio-noms "+scope.lblNombreAudio);
            }

            scope.onAccept = function ()
            {
                $uibModalInstance.close(scope.varAudio);
            }

            scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            scope.onPLayF = function(id){
               
                var element = document.getElementById('ivr-'+id);
                var audioTag = document.getElementsByTagName('audio');
                    $('.a-'+id+ ' i').toggleClass('glyphicon-pause');                
                //audioTag.pause();
                element.paused ? element.play() : element.pause();
            }

            scope.onStopF = function(id){
                var element = document.getElementById('ivr-'+id);
                $('.a-'+id+ ' i').removeClass('glyphicon-pause');
                element.pause();
                element.currentTime = 0;
            }

            //Funcion play
            /*//var myAudio = document.getElementById("");
            var isPlaying = false;

            function togglePlay() {
                if (isPlaying) {
                    myAudio.pause()
                } else {
                    myAudio.play();
                }
                console.log('gg')
            };
            myAudio.onplaying = function() {
                isPlaying = true;
            };
            myAudio.onpause = function() {
                isPlaying = false;
            };*/

            /*scope.onPlay = function( nameSound )
            {
                /*$log.debug( "Reproduciendo " + nameSound + "..." );
                scope.sound = ngAudio.load( 'http://localhost:2000/?nameAudio=' + nameSound + '&&codUsuario=' + scope.dataInfo.codUsuario + '&&idInstancia=' + scope.dataInfo.idInstancia );
                scope.sound.play(); 

                var promiseLoadSound = new Promise( function( resolve, reject ) 
                {
                    scope.sound = ngAudio.load( 'http://localhost:2000/?nameAudio=' + nameSound + '&&codUsuario=' + scope.dataInfo.codUsuario + '&&idInstancia=' + scope.dataInfo.idInstancia );                  
                    scope.sound = ngAudio.load( nameSound );
                    resolve();
                });

                promiseLoadSound.then(function()
                {
                    scope.sound.play();
                });  
            }
            */

            scope.onLoadPage = function()
            {scope.onLoadSoundsInServer()
                $.when( scope.onLoadSoundsInServer() )
                    .then( function(){
                        scope.audiosPL(scope.frmData.lsAudiosPredeterminados);
                    } );
            }

            scope.onLoadPage();
        }
    ]);