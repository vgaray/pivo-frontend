'use strict';

angular.module('pivo')
    .factory('validator', function () 
    {
        var validator = {
            MAC_LOWER : 0,
            MAC_UPPER : 1
        }

        var regExpIsNumeric = /^\d+$/;
        var regExpIsNumberAnnex = /^[1-9][0-9]{2,5}$/;
        var regExpIsEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var regExpIsMACLower = /^([0-9]|[a-f]){12}$/;
        var regExpIsMACUpper = /^([0-9]|[A-F]){12}$/;

        /**
         * Valida si una cadena ingresada es un número
         * 
         * @param {string} number - La cadena a validar
         */
        validator.isNumericText = function( number )
        {
            return regExpIsNumeric.test( number );
        }

        /**
         * Valida si una cadena ingresada como parámetro es un 
         * número de anexo. Debe tener una longitud mínima de 3
         * caracteres y una máxima de 6, además de que deber numérica.
         * 
         * @param {string} numAnnex - El número de anexo a validar.
         */
        validator.isNumberAnnex = function ( numAnnex ) 
        {
            var isNumeric = regExpIsNumeric.test( numAnnex )

            if( !isNumeric )
               return false;

            return regExpIsNumberAnnex.test( numAnnex );
        }

        /**
         * Valida que una cadena sea un correo.
         * 
         * @param {string} email - El email a validar.
         */
        validator.isEmail = function( email )
        {           
            return regExpIsEmail.test(email);
        }
        
        /**
         * Valida si una cadena ingresada es una MAC.
         * 
         * @param {string} mac - La MAC a validar.
         */
        validator.isMAC = function( mac, typeMAC )
        {
            if( typeMAC == validator.MAC_LOWER )
                return regExpIsMACLower.test( mac );
            else if( typeMAC == validator.MAC_UPPER )
                return regExpIsMACUpper.test( mac );
        }

        return validator;
    });