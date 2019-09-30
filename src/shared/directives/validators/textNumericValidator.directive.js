angular.module('pivo')
   .directive('textNumeric', [
      'validator',
      function (validator) 
      {
         return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elements, attrs, ngModel) 
            {
               var setAsNumericText = function (boolean) 
               {
                  ngModel.$setValidity('numericText', boolean);
               }

               ngModel.$parsers.push(function (value) 
               {
                  if (value == '') 
                  {
                     return value;
                  }

                  var isNumericText = validator.isNumericText(value);
                  setAsNumericText(isNumericText);

                  return value;
               });
            }
         }
      }
   ]);