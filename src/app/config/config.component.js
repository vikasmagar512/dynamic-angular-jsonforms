/**
 * Dashboard component
 * @class dashboard
 * @example
 * <dashboard></dashboard>
 */
(function() {
  angular.module('incosa')
  .directive('onReadFile', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs) {
        var fn = $parse(attrs.onReadFile);
        element.on('change', function(onChangeEvent) {
          var reader = new FileReader();  
          reader.onload = function(onLoadEvent) {
            scope.$apply(function() {
              fn(scope, {$fileContent:onLoadEvent.target.result});
            });
          };
          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        });
      }
    };
  })

  .component('config', {
    templateUrl: 'partials/config.html',
    controllerAs: 'vm',
    controller: [
      'configService',
      '$window',
      '$location',
      '$scope',
      function ConfigController(configService, $window, $location, $scope) {
        var vm = this;
        $window.document.title = 'Config | Incosa Solutions';
        vm.sensorList = [];
        vm.loader = false;
        // $scope.content = true;
        // const jsonData = [
        //   {
        //     "uri": "/ASSET/Dofasco_OREBRIDGE",
        //     "classification": "/assetclassification/gantry",
        //     "parent": "/ASSET/DEMO_PARENT_SITE",
        //     "id": "ORE_BRIDGE",
        //     "owner": "Dofasco",
        //     "customer": "Dofasco",
        //     "location": "Hamilton, Ont,Canda",
        //     "complexType": "SHIP TO SHORE",
        //     "description": "Crane ",
        //     "attributes": {
        //       "Name": "ORE_BRIDGE",
        //       "SerialNo": "123456",
        //       "Rated Voltage": "480 V",
        //       "Rated Capacity": "60 T",
        //       "Radio Control Manufacture": "",
        //       "Radio Control Part Number": "",
        //       "Number of Hoists": "1",
        //       "Number of Controllers": "1"
        //     },
        //     "ioControls": [
        //       {
        //         "name": "TS I",
        //         "topic": "250"
        //       },
        //       {
        //         "name": "TS II",
        //         "topic": "251"
        //       }
        //     ],
        //     "parameters": {
        
        //       "ORE_BRIDGE_0_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West_Trolley_Motor_Temp",
        //         "tag": "ORE_BRIDGE_0_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 1
        //       },
        //       "ORE_BRIDGE_1_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West_Trolley_Blower_Temp",
        //         "tag": "ORE_BRIDGE_1_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 2
        //       },
        //       "ORE_BRIDGE_2_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West_Trolley_G-Box_Temp",
        //         "tag": "ORE_BRIDGE_2_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 3
        //       },
        //       "ORE_BRIDGE_3_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "East_Trolley_Motor_Temp",
        //         "tag": "ORE_BRIDGE_3_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 4
        //       },
        //       "ORE_BRIDGE_4_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "East_Trolley_Blower_Temp",
        //         "tag": "ORE_BRIDGE_4_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 5
        //       },
        //       "ORE_BRIDGE_5_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "East_Trolley_G-Box_Temp",
        //         "tag": "ORE_BRIDGE_5_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 6
        //       },
        //       "ORE_BRIDGE_6_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_Motor_Temp",
        //         "tag": "ORE_BRIDGE_6_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 7
        //       },
        //       "ORE_BRIDGE_7_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_Blower_Temp",
        //         "tag": "ORE_BRIDGE_7_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 8
        //       },
        //       "ORE_BRIDGE_8_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_G-Box_Temp",
        //         "tag": "ORE_BRIDGE_8_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 9
        //       },
        
        //       "ORE_BRIDGE_9_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Motor_Temp",
        //         "tag": "ORE_BRIDGE_9_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 10
        //       },
        
        //       "ORE_BRIDGE_10_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Blower_Temp",
        //         "tag": "ORE_BRIDGE_10_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 11
        //       },
        
        //       "ORE_BRIDGE_11_Temperature_C": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_G-Box_Temp",
        //         "tag": "ORE_BRIDGE_11_Temperature_C",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 12
        //       },
        
        //       "ORE_BRIDGE_0_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Motor H2 Velocity",
        //         "tag": "ORE_BRIDGE_0_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 13
        //       },
        //       "ORE_BRIDGE_0_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Motor V2 Velocity",
        //         "tag": "ORE_BRIDGE_0_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 14
        //       },
        //       "ORE_BRIDGE_0_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Motor H2 Accel",
        //         "tag": "ORE_BRIDGE_0_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 15
        //       },
        //       "ORE_BRIDGE_0_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Motor V2 Accel",
        //         "tag": "ORE_BRIDGE_0_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 16
        //       },
        //       "ORE_BRIDGE_0_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Motor H2 Frequency",
        //         "tag": "ORE_BRIDGE_0_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 17
        //       },
        //       "ORE_BRIDGE_0_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Motor V2 Frequency",
        //         "tag": "ORE_BRIDGE_0_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 18
        //       },
        
        //       "ORE_BRIDGE_1_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Blower H1 Velocity",
        //         "tag": "ORE_BRIDGE_1_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 19
        //       },
        //       "ORE_BRIDGE_1_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Blower V1 Velocity",
        //         "tag": "ORE_BRIDGE_1_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 20
        //       },
        //       "ORE_BRIDGE_1_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Blower H1 Accel",
        //         "tag": "ORE_BRIDGE_1_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 21
        //       },
        //       "ORE_BRIDGE_1_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Blower V1 Velocity",
        //         "tag": "ORE_BRIDGE_1_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 22
        //       },
        //       "ORE_BRIDGE_1_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Blower H1 Frequency",
        //         "tag": "ORE_BRIDGE_1_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 23
        //       },
        //       "ORE_BRIDGE_1_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley Blower V1 Frequency",
        //         "tag": "ORE_BRIDGE_1_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 24
        //       },
        //       "ORE_BRIDGE_2_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley G-Box V1 Velocity",
        //         "tag": "ORE_BRIDGE_2_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 25
        //       },
        //       "ORE_BRIDGE_2_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley G-Box V1 Velocity",
        //         "tag": "ORE_BRIDGE_2_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 26
        //       },
        //       "ORE_BRIDGE_2_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley G-Box H1 Accel",
        //         "tag": "ORE_BRIDGE_2_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 27
        //       },
        //       "ORE_BRIDGE_2_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley G-Box V1 Accel",
        //         "tag": "ORE_BRIDGE_2_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 28
        //       },
        //       "ORE_BRIDGE_2_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley G-Box H1 Frequency",
        //         "tag": "ORE_BRIDGE_2_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 29
        //       },
        //       "ORE_BRIDGE_2_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West Trolley G-Box V1 Frequency",
        //         "tag": "ORE_BRIDGE_2_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 30
        //       },
        
        //       "ORE_BRIDGE_3_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN4",
        //         "tag": "ORE_BRIDGE_3_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 31
        //       },
        //       "ORE_BRIDGE_3_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN4",
        //         "tag": "ORE_BRIDGE_3_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 32
        //       },
        //       "ORE_BRIDGE_3_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G4",
        //         "tag": "ORE_BRIDGE_3_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 33
        //       },
        //       "ORE_BRIDGE_3_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G4",
        //         "tag": "ORE_BRIDGE_3_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 34
        //       },
        //       "ORE_BRIDGE_3_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz4",
        //         "tag": "ORE_BRIDGE_3_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 35
        //       },
        //       "ORE_BRIDGE_3_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz4",
        //         "tag": "ORE_BRIDGE_3_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 36
        //       },
        
        //       "ORE_BRIDGE_4_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN5",
        //         "tag": "ORE_BRIDGE_4_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 37
        //       },
        //       "ORE_BRIDGE_4_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN5",
        //         "tag": "ORE_BRIDGE_4_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 38
        //       },
        //       "ORE_BRIDGE_4_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G5",
        //         "tag": "ORE_BRIDGE_4_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 39
        //       },
        //       "ORE_BRIDGE_4_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G5",
        //         "tag": "ORE_BRIDGE_4_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 40
        //       },
        //       "ORE_BRIDGE_4_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz5",
        //         "tag": "ORE_BRIDGE_4_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 41
        //       },
        //       "ORE_BRIDGE_4_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz5",
        //         "tag": "ORE_BRIDGE_4_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 42
        //       },
        
        //       "ORE_BRIDGE_5_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN6",
        //         "tag": "ORE_BRIDGE_5_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 43
        //       },
        //       "ORE_BRIDGE_5_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN6",
        //         "tag": "ORE_BRIDGE_5_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 44
        //       },
        //       "ORE_BRIDGE_5_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G6",
        //         "tag": "ORE_BRIDGE_5_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 45
        //       },
        //       "ORE_BRIDGE_5_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G6",
        //         "tag": "ORE_BRIDGE_5_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 46
        //       },
        //       "ORE_BRIDGE_5_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz6",
        //         "tag": "ORE_BRIDGE_5_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 47
        //       },
        //       "ORE_BRIDGE_5_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz6",
        //         "tag": "ORE_BRIDGE_5_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 48
        //       },
        
        //       "ORE_BRIDGE_6_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN7",
        //         "tag": "ORE_BRIDGE_6_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 49
        //       },
        //       "ORE_BRIDGE_6_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN7",
        //         "tag": "ORE_BRIDGE_6_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 50
        //       },
        //       "ORE_BRIDGE_6_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G7",
        //         "tag": "ORE_BRIDGE_6_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 51
        //       },
        //       "ORE_BRIDGE_6_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G7",
        //         "tag": "ORE_BRIDGE_6_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 52
        //       },
        //       "ORE_BRIDGE_6_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz7",
        //         "tag": "ORE_BRIDGE_6_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 53
        //       },
        //       "ORE_BRIDGE_6_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz7",
        //         "tag": "ORE_BRIDGE_6_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 54
        //       },
        
        //       "ORE_BRIDGE_7_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN8",
        //         "tag": "ORE_BRIDGE_7_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 55
        //       },
        //       "ORE_BRIDGE_7_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN8",
        //         "tag": "ORE_BRIDGE_7_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 56
        //       },
        //       "ORE_BRIDGE_7_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G8",
        //         "tag": "ORE_BRIDGE_7_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 57
        //       },
        //       "ORE_BRIDGE_7_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G8",
        //         "tag": "ORE_BRIDGE_7_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 58
        //       },
        //       "ORE_BRIDGE_7_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz8",
        //         "tag": "ORE_BRIDGE_7_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 59
        //       },
        //       "ORE_BRIDGE_7_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz8",
        //         "tag": "ORE_BRIDGE_7_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 60
        //       },
        
        //       "ORE_BRIDGE_8_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN9",
        //         "tag": "ORE_BRIDGE_8_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 61
        //       },
        //       "ORE_BRIDGE_8_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN9",
        //         "tag": "ORE_BRIDGE_8_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 62
        //       },
        //       "ORE_BRIDGE_8_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G9",
        //         "tag": "ORE_BRIDGE_8_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 63
        //       },
        //       "ORE_BRIDGE_8_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G9",
        //         "tag": "ORE_BRIDGE_8_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 64
        //       },
        //       "ORE_BRIDGE_8_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz9",
        //         "tag": "ORE_BRIDGE_8_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 65
        //       },
        //       "ORE_BRIDGE_8_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz9",
        //         "tag": "ORE_BRIDGE_8_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 66
        //       },
        
        //       "ORE_BRIDGE_9_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN10",
        //         "tag": "ORE_BRIDGE_9_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 67
        //       },
        //       "ORE_BRIDGE_9_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN10",
        //         "tag": "ORE_BRIDGE_9_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 68
        //       },
        //       "ORE_BRIDGE_9_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G10",
        //         "tag": "ORE_BRIDGE_9_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 69
        //       },
        //       "ORE_BRIDGE_9_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G10",
        //         "tag": "ORE_BRIDGE_9_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 70
        //       },
        //       "ORE_BRIDGE_9_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz10",
        //         "tag": "ORE_BRIDGE_9_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 71
        //       },
        //       "ORE_BRIDGE_9_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz10",
        //         "tag": "ORE_BRIDGE_9_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 72
        //       },
        
        //       "ORE_BRIDGE_10_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN11",
        //         "tag": "ORE_BRIDGE_10_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 73
        //       },
        //       "ORE_BRIDGE_10_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN11",
        //         "tag": "ORE_BRIDGE_10_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 74
        //       },
        //       "ORE_BRIDGE_10_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G11",
        //         "tag": "ORE_BRIDGE_10_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 75
        //       },
        //       "ORE_BRIDGE_10_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G11",
        //         "tag": "ORE_BRIDGE_10_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 76
        //       },
        //       "ORE_BRIDGE_10_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz11",
        //         "tag": "ORE_BRIDGE_10_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 77
        //       },
        //       "ORE_BRIDGE_10_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz11",
        //         "tag": "ORE_BRIDGE_10_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 78
        //       },
        
        //       "ORE_BRIDGE_11_Z_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_RMS_Velocity_IN12",
        //         "tag": "ORE_BRIDGE_11_Z_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 79
        //       },
        //       "ORE_BRIDGE_11_X_Axis_RMS_Velocity_IN": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_RMS_Velocity_IN12",
        //         "tag": "ORE_BRIDGE_11_X_Axis_RMS_Velocity_IN",
        //         "uom": "inch/sec",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 80
        //       },
        //       "ORE_BRIDGE_11_Z_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Acceleration_G12",
        //         "tag": "ORE_BRIDGE_11_Z_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 81
        //       },
        //       "ORE_BRIDGE_11_X_Axis_Peak_Acceleration_G": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Acceleration_G12",
        //         "tag": "ORE_BRIDGE_11_X_Axis_Peak_Acceleration_G",
        //         "uom": "G",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 82
        //       },
        //       "ORE_BRIDGE_11_Z_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Z_Axis_Peak_Velocity_Component_Frequency_Hz12",
        //         "tag": "ORE_BRIDGE_11_Z_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 83
        //       },
        //       "ORE_BRIDGE_11_X_Axis_Peak_Velocity_Component_Frequency_Hz": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "X_Axis_Peak_Velocity_Component_Frequency_Hz12",
        //         "tag": "ORE_BRIDGE_11_X_Axis_Peak_Velocity_Component_Frequency_Hz",
        //         "uom": "Hz",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 84
        //       },
        
        //       "ORE_BRIDGE_0_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Hold_Motor_Voltage",
        //         "tag": "ORE_BRIDGE_0_Voltage",
        //         "uom": "Volts_DC",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 85
        //       },
        
        //       "ORE_BRIDGE_0_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_Motor_Current",
        //         "tag": "ORE_BRIDGE_0_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": -2000,
        //         "high": 2000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 86
        //       },
        
        //       "ORE_BRIDGE_0_Power": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Hold_Motor_Power",
        //         "tag": "ORE_BRIDGE_0_Power",
        //         "uom": "Watts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 87
        //       },
        
        //       "ORE_BRIDGE_1_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Close_Motor_Voltage",
        //         "tag": "ORE_BRIDGE_1_Voltage",
        //         "uom": "Volts_DC",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 88
        //       },
        
        //       "ORE_BRIDGE_1_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Motor_Current",
        //         "tag": "ORE_BRIDGE_1_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": -2000,
        //         "high": 2000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 89
        //       },
        
        //       "ORE_BRIDGE_1_Power": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Close_Motor_Power",
        //         "tag": "ORE_BRIDGE_1_Power",
        //         "uom": "Watts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 90
        //       },
        
        //       "ORE_BRIDGE_2_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Trolley_Motor_Voltage",
        //         "tag": "ORE_BRIDGE_2_Voltage",
        //         "uom": "Volts_DC",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 91
        //       },
        
        //       "ORE_BRIDGE_2_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Trolley_Motor_Current",
        //         "tag": "ORE_BRIDGE_2_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": -1200,
        //         "high": 1200,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 92
        //       },
        
        //       "ORE_BRIDGE_2_Power": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Trolley_Motor_Power",
        //         "tag": "ORE_BRIDGE_2_Power",
        //         "uom": "Watts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 300000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 93
        //       },
        
        //       "ORE_BRIDGE_3_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "3_Voltage",
        //         "tag": "ORE_BRIDGE_3_Voltage",
        //         "uom": "Volts_DC",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 94
        //       },
        
        //       "ORE_BRIDGE_3_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "3_Current",
        //         "tag": "ORE_BRIDGE_3_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": -1200,
        //         "high": 1200,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 95
        //       },
        
        //       "ORE_BRIDGE_3_Power": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "3_Power",
        //         "tag": "ORE_BRIDGE_3_Power",
        //         "uom": "Watts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1500,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 96
        //       },
        
        //       "ORE_BRIDGE_4_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "4_Voltage",
        //         "tag": "ORE_BRIDGE_4_Voltage",
        //         "uom": "Volts_DC",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 97
        //       },
        
        //       "ORE_BRIDGE_4_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Motor_Current",
        //         "tag": "ORE_BRIDGE_4_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": -2000,
        //         "high": 2000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 98
        //       },
        
        //       "ORE_BRIDGE_4_Power": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "4_Power",
        //         "tag": "ORE_BRIDGE_4_Power",
        //         "uom": "Watts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1500,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 999
        //       },
        
        //       "ORE_BRIDGE_5_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "5_Voltage",
        //         "tag": "ORE_BRIDGE_5_Voltage",
        //         "uom": "Volts_DC",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 250,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 100
        //       },
        
        //       "ORE_BRIDGE_5_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "5_Current",
        //         "tag": "ORE_BRIDGE_5_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": -2000,
        //         "high": 2000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 101
        //       },
        
        //       "ORE_BRIDGE_5_Power": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "5_Power",
        //         "tag": "ORE_BRIDGE_5_Power",
        //         "uom": "Watts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 1500,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 102
        //       },
        
        
        //       "ORE_BRIDGE_0_Phase_1_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Blower_Motors_Phase_1_Voltage",
        //         "tag": "ORE_BRIDGE_0_Phase_1_Voltage",
        //         "uom": "Volts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 103
        //       },
        //       "ORE_BRIDGE_0_Phase_2_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Blower_Motors_Phase_2_Voltage",
        //         "tag": "ORE_BRIDGE_0_Phase_2_Voltage",
        //         "uom": "Volts",
        //         "binary": "false",
        //         "multiplier": ".1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 104
        //       },
        //       "ORE_BRIDGE_0_Phase_3_Voltage": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Blower_Motors_Phase_3_Voltage",
        //         "tag": "ORE_BRIDGE_0_Phase_3_Voltage",
        //         "uom": "Volts",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 600,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 105
        //       },
        //       "ORE_BRIDGE_0_Channel_1_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "East_Trolley_Blower_Channel_1_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_1_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 106
        //       },
        //       "ORE_BRIDGE_0_Channel_2_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "East_Trolley_Blower_Channel_2_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_2_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 107
        //       },
        //       "ORE_BRIDGE_0_Channel_3_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "East_Trolley_Blower_Channel_3_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_3_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 106
        //       },
        //       "ORE_BRIDGE_0_Channel_4_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West_Trolley_Blower_Channel_4_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_4_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 109
        //       },
        //       "ORE_BRIDGE_0_Channel_5_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "West_Trolley_Blower_Channel_5_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_5_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 110
        //       },
        //       "ORE_BRIDGE_0_Channel_6_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "West_Trolley_Blower_Channel_6_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_6_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 111
        //       },
        //       "ORE_BRIDGE_0_Channel_7_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_Blower_Channel_7_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_7_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 112
        //       },
        //       "ORE_BRIDGE_0_Channel_8_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_Blower_Channel_8_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_8_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 6,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 113
        //       },
        //       "ORE_BRIDGE_0_Channel_9_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Hold_Blower_Channel_9_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_9_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 5,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 114
        //       },
        //       "ORE_BRIDGE_0_Channel_10_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Blower_Channel_10_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_10_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 5,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 115
        //       },
        //       "ORE_BRIDGE_0_Channel_11_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Blower_Channel_11_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_11_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 5,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 116
        //       },
        //       "ORE_BRIDGE_0_Channel_12_Current": {
        //         "pinType": "analog",
        //         "ignoreTile": false,
        //         "tagType": "Close_Blower_Channel_12_Current",
        //         "tag": "ORE_BRIDGE_0_Channel_12_Current",
        //         "uom": "Amps",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 5,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 117
        //       },
        //       "ORE_BRIDGE_2_Heatsink_Temp": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "TROLLEY_TEMPERATURE",
        //         "tag": "ORE_BRIDGE_2_Heatsink_Temp",
        //         "uom": "C",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 60,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 25
        //       },
        //       "ORE_BRIDGE_2_Input_Term_Sts": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "TROLLEY_STATUS",
        //         "tag": "ORE_BRIDGE_2_Input_Term_Sts",
        //         "uom": "status",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 100000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 26
        //       },
        //       "ORE_BRIDGE_2_Motor_Rated_FLA": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "TROLLEY_Motor_Rated_FLA",
        //         "tag": "ORE_BRIDGE_2_Motor_Rated_FLA",
        //         "uom": "A",
        //         "binary": "false",
        //         "multiplier": ".1",
        //         "low": 0,
        //         "high": 1000000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 27
        //       },
        
        //       "ORE_BRIDGE_IC4C1_AV5": {
        //         "pinType": "analog",
        //         "ignoreTile": true,
        //         "tagType": "Load",
        //         "tag": "ORE_BRIDGE_IC4C1_AV5",
        //         "uom": "LBS",
        //         "binary": "false",
        //         "multiplier": "1",
        //         "low": 0,
        //         "high": 10000,
        //         "decimal": false,
        //         "tileType": "gauge",
        //         "index": 1      }
        
        
        //     }
        //   }
        // ]
        // vm.data = jsonData[0];

        // vm.data.attributes = {...vm.data.attributes,
        //   RatedVoltage:vm.data.attributes["Rated Voltage"],
        //   RatedCapacity:vm.data.attributes["Rated Capacity"],
        //   RadioControlManufacture:vm.data.attributes["Radio Control Manufacture"],
        //   RadioControlPartNumber:vm.data.attributes["Radio Control Part Number"],
        //   NumberofHoists:vm.data.attributes["Number of Hoists"],
        //   NumberofControllers:vm.data.attributes["Number of Controllers"]
        // }
       
        // vm.data2 = jsonData[0].parameters;
        // Object.keys(vm.data2).forEach(key=>{
        //   vm.data2[key] = {
        //     ...vm.data2[key],
        //     tag: vm.data2[key].tag.slice(vm.data.id.length)
        //   }
        //   debugger
        // }) 
        vm.loader = true;
      
        $scope.showContent = function($fileContent){
          $scope.content = $fileContent;
          debugger
          const jsonData = JSON.parse($scope.content)
          vm.data = jsonData[0];
          vm.data.attributes = {...vm.data.attributes,
            RatedVoltage:vm.data.attributes["Rated Voltage"],
            RatedCapacity:vm.data.attributes["Rated Capacity"],
            RadioControlManufacture:vm.data.attributes["Radio Control Manufacture"],
            RadioControlPartNumber:vm.data.attributes["Radio Control Part Number"],
            NumberofHoists:vm.data.attributes["Number of Hoists"],
            NumberofControllers:vm.data.attributes["Number of Controllers"]
          }
          
          vm.data2 = jsonData[0].parameters;
          Object.keys(vm.data2).forEach(key=>{
            vm.data2[key] = {
              ...vm.data2[key],
              tag: vm.data2[key].tag.slice(vm.data.id.length), 
              multiplier: vm.data2[key].multiplier!=='' ? parseInt(vm.data2[key].multiplier) : 1
            }
            debugger
          })

          vm.loader = true;
          setTimeout(()=>{
            vm.oldAsset_ID_value = document.getElementById("id").value
            document.getElementById("id").addEventListener("change", myFunction);
            vm.loader = false;
          },1000)
        };
        
        vm.tagChanged = function (user){
          const newName = vm.data.id + vm.data2[user].tag
          vm.data2[newName] = vm.data2[user]
          delete vm.data2[user]
          debugger
        }

        function myFunction(e) {
          vm.loader = true;

          alert('myFunction')
          let newKey = document.getElementById("id").value
          const keys = Object.keys(vm.data2)
          debugger
          console.log('vm.data2 ',vm.data2)
          keys.map((oldKey,i)=>{
            vm.data2[newKey + oldKey.slice(vm.oldAsset_ID_value.length)] = {
              ...vm.data2[oldKey], 
            }
            delete vm.data2[oldKey]
          })
          vm.data2 = JSON.parse(JSON.stringify(vm.data2))
          vm.oldAsset_ID_value = newKey

          vm.loader = false;
        }

        // vm.tagChange=function(value){
        //   debugger
        //   const id = vm.data.id
        //   let startingContent = value.slice(0,id.length)
        //   debugger
        //   if(startingContent !== id){
        //     alert('not valid')
        //   }
        // }

        vm.downloadResponseAsInfoFile = function (response) {
          const parameters = JSON.parse(JSON.stringify(vm.data2))
          Object.keys(parameters).forEach(key=>{
            parameters[key] = {
              ...parameters[key],
              tag: vm.data.id+parameters[key].tag
            }
            debugger
          }) 
          let d = [{
            ...{...vm.data, 
              attributes:{
                ...vm.data.attributes,
                "Rated Voltage":vm.data.attributes.RatedVoltage,
                "Rated Capacity":vm.data.attributes.RatedCapacity,
                "Radio Control Manufacture":vm.data.attributes.RadioControlManufacture,
                "Radio Control Part Number":vm.data.attributes.RadioControlPartNumber,
                "Number of Hoists":vm.data.attributes.NumberofHoists,
                "Number of Controllers":vm.data.attributes.NumberofControllers
              }
            },
            parameters
          }]
          delete d[0].attributes.RatedVoltage
          delete d[0].attributes.RatedCapacity
          delete d[0].attributes.RadioControlManufacture
          delete d[0].attributes.RadioControlPartNumber
          delete d[0].attributes.NumberofHoists
          delete d[0].attributes.NumberofControllers
          var link = document.createElement("a");
          link.download = "asset_modified.json";
          var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d));
          link.href = "data:" + data;
          link.click();
        };
        
      }
    ]
  });
})();
