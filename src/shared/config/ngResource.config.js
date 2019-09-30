(function () {
    'use strict';
    angular.module('pivo').factory('ngResourceConfig', function () {
        var ngResourceConfig = {     
        //  baseURL: "http://192.168.3.150:9090/sic-ws/",
        //  oauth2URL: "http://192.168.3.150:9090/sic-oauth2-ws/",
        //   baseURL: "http://192.168.3.155:9090/sic-ws/",
        //   oauth2URL: "http://192.168.3.155:9090/sic-oauth2-ws/",        
           baseURL: "http://localhost:8080/pivo-ws/",
           oauth2URL: "http://localhost:8080/sic-oauth2-ws/",
           // mediaServerAudioURL: "http://localhost:2000/"
        };
        return ngResourceConfig;
    });
})();
