'use strict';
angular.module('pivo')
    .directive('inputDateValidator',[
    function(){
        return function(){
            var inputMaskVal = function dateInputMask(inputFecha){
                inputFecha.addEventListener('keypress',function(e){
                    if(e.keyCode < 47 || e.keyCode > 57){
                        e.preventDefault();
                    }
                    var len = inputFecha.value.length;
                    if(len != 1 || len != 3){
                        if(e.keyCode == 47){
                            e.preventDefault();
                        }
                    }
                    if(len == 2){
                        inputFecha.value += '-';
                    }
                    if(len == 5){
                        inputFecha.value += '-';
                    }
                })
            }
            var inputM = document.querySelectorAll('input[uib-datepicker-popup]');
            for(var i = 0; i<inputM.length; i++){
                inputMaskVal(document.querySelectorAll('input[uib-datepicker-popup]')[i]);

            }
            $('input[uib-datepicker-popup]').attr('maxlength','10');
        }
    }
]);
