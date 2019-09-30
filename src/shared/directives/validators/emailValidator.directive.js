'use strict';

angular.module( 'pivo' )
   .directive( 'emailValidator', [
      'validator',
      function  (validator ) 
      {
         return {
            require: 'ngModel',
            link: function( scope, element, attrs, ngModel )
            {
               var setAsEmailValid = function( boolean )
               {
                  ngModel.$setValidity( 'email' );
               }

               ngModel.$parsers.push( function( value )
               {
                  if( value == '' )
                     return;              
                  return value;
               } );
            }
         }
      }
   ]);