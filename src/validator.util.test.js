var assert = require( 'assert' );

var validator = {}

var regExpIsNumeric = /^\d+$/;
var regExpIsNumberAnnex = /^[1-9][0-9]{2,5}$/;
var regExpIsEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
var regExpIsMAC = /^([0-9]|[a-fA-F]){12}$/;

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
validator.isMAC = function( mac )
{
    return regExpIsMAC.test( mac );
}

describe( "Validador", function()
{
    describe( "Es Numero de Anexo", function()
    {
        it( "Debería retornar true si es número de anexo correcto.", function()
        {
            assert.equal( true, validator.isNumberAnnex( '140000' ) );
        } );    
    } );

    describe( "Es correo electrónico", function()
    {
        it( "Debería retornar verdadero si la cadena ingresada en un correo electrónico", function()
        {
            assert.equal( true, validator.isEmail( "ronaldinho.gaucho@gmail.com" ) );
        } );
    } );    

    describe( "Es MAC válida", function()
    {
        it( "Debería retornar true si es una MAC válida.", function()
        {
            assert.equal( true, validator.isMAC( "001565233bfB" ) );
        } );
    } );

    describe( 'Es texto numérico', function()
    {
        it( 'Debería ser un texto numérico', function()
        {
            assert.equal( true, validator.isNumericText( '123440' ) );
        } );
    } );
} );