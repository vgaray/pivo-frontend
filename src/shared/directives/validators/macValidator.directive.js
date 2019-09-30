'use strict';

angular.module( 'pivo' )
    .directive( 'macValidator', [
        'validator',
        function ( validator ) 
        {
            return {
                require: 'ngModel',
                scope: {
                    marca: "=marca"
                },
                link: function ( scope, element, attrs, ngModel ) 
                {
                    var currentMAC = null;

                    var setAsMACValid = function ( boolean, type ) 
                    {
                        if ( type == validator.MAC_LOWER ) 
                        {
                            ngModel.$setValidity( 'mac-lower', boolean );
                            ngModel.$setValidity( 'mac-upper', true );
                        }
                        else if ( type == validator.MAC_UPPER ) 
                        {
                            ngModel.$setValidity( 'mac-upper', boolean );
                            ngModel.$setValidity( 'mac-lower', true );
                        }
                    }

                    /**
                     * Función que limpia el campo de la MAC
                     */
                    var clearFieldMac = function()
                    {
                        ngModel.$setValidity( 'mac-lower', true );
                        ngModel.$setValidity( 'mac-upper', true );
                        ngModel.$setViewValue( '' );
                        ngModel.$render();
                        ngModel.$setPristine();
                        ngModel.$setUntouched();
                    }

                    /**
                     * Precondición: La marca es diferente de la predeterminada
                     * y tiene valores definidos no nulos.
                     * @param {string} value es la MAC
                     */
                    var validationMAC = function ( value ) 
                    {
                        /**
                         * Si la mac es vacía o nula se limpiar el campo de
                         * la mac en caso hayan errores y no se evalúa la expresión
                         */
                        if( value == "" || value == null || value === undefined )
                        {    
                           clearFieldMac(); 
                           return;
                        }
                        
                        /**
                         * Se inicializan valores:
                         * - Se obtiene el objeto que pertenece a la marca.
                         * - Se marca la MAC como inválida.
                         * - Se obtiene el tipo de formato de la MAC de acuerdo a la marca ( Mayúscula o minúscula ).
                         * 
                         */
                        var marca = scope.marca;                  
                        var isMacValid = false;
                        var typeFormat = marca.ilFormatoMac;

                        /**
                         * Si el tipo de formato es minúscula
                         */
                        if ( typeFormat == 0 ) 
                        {
                            isMacValid = validator.isMAC( value, validator.MAC_LOWER );
                            setAsMACValid( isMacValid, validator.MAC_LOWER );
                        }
                        else if (typeFormat == 1) 
                        {
                            isMacValid = validator.isMAC(value, validator.MAC_UPPER);
                            setAsMACValid(isMacValid, validator.MAC_UPPER);
                        }
                    }

                    /**
                     * Función que se dispara cada vez que se realiza un cambio en el campo de la MAC
                     * @param {string} value - es la MAC
                     */
                    ngModel.$parsers.push( function ( value ) 
                    {
                        /**
                         * Actualizamos el valor de la MAC.
                         */
                        currentMAC = value;

                        /**
                         * Se valida la MAC
                         */
                        validationMAC( value );

                        return value;
                    });
                    
                    /** Se observa la marca para determinar la validación de la MAC
                     *  y cada vez que ocurre un cambio en ella se dispara la función adjunta.
                     */
                    scope.$watch( 'marca', function ( newValue, oldValue ) 
                    {                       
                        /**
                         * Si el nuevo valor de la marca es la predeterminada 
                         * se debe limpiar el campo de la mac,
                         * setearlo con una configuracion que indique que nunca se tocó
                         * y borrar los errores del formulario.
                         */
                        if ( newValue === undefined || newValue.marcaId == 0 ) 
                        {
                            /* Se limpia el campo de la MAC */
                            clearFieldMac();
                        }
                        else
                        {
                            validationMAC( currentMAC );
                        }
/*
                        if( newValue.marcaId != null && newValue.nomMarca != null && oldValue.marcaId != null && oldValue.nomMarca != null || 
                            newValue.marcaId != undefined && newValue.nomMarca != undefined && oldValue.marcaId != undefined && oldValue.nomMarca != undefined )
                           validationMAC( currentMAC );*/
                    }, true );
                }
            }
        }
    ]);

/**
 * 
 * <input type="text" 
          class="form-control" 
          mac-validator
          marca = "frmData.anexosSip.entity"
          placeholder="Ingrese MAC. Ej: 001565233bfb" 
          ng-model="frmData.anexosSip.entity.nomMac">
 * 
 */