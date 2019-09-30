'use strict';

angular.module('pivo')
    .directive('phoneSipValidator', [
        'anexosSipService',
        '$location',
        'localStorageService',
        'validator',
        function (anexosSipService, $location, localStorageService, validator) 
        {
            var request = {}

            var dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token")
            }

            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) 
                {
                    dataInfo.idInstancia = $location.search().idInstancia;

                    var setAsSearchingAnnex = function (boolean) 
                    {
                        ngModel.$setValidity('searchingAnnex', !boolean);
                    }

                    var setAnnexNotAvailable = function (boolean) 
                    {
                        ngModel.$setValidity('annexNotAvailable', boolean);
                    }

                    var setAsIncorrectFormat = function (boolean) 
                    {
                        ngModel.$setValidity('annexIncorrectFormat', !boolean);
                    }

                    ngModel.$parsers.push(function (value) 
                    {
                        if (value != '') 
                        {
                            var formatAccepted = validator.isNumberAnnex(value);

                            if (formatAccepted) 
                            {                                
                                setAsIncorrectFormat(false);
                                setAsSearchingAnnex(true);
                                
                                request.nomUsuario = value;
                                anexosSipService.buscarSipPorId(dataInfo)
                                .post({}, request,
                                function (result) 
                                {
                                    setAsSearchingAnnex(false);

                                    if (result.existeEx) 
                                    {
                                        setAnnexNotAvailable(false);
                                    }
                                    else 
                                    {
                                        setAnnexNotAvailable(true);
                                    }
                                },
                                function (err) 
                                {
                                    console.log( "Error al buscar el anexo: " + err );
                                });
                            }
                            else 
                            {
                                setAsIncorrectFormat(true);
                            }
                        }

                        return value;
                    });
                }
            }
        }
    ]);