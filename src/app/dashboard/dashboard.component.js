/**
 * Dashboard component
 * @class dashboard
 * @example
 * <dashboard></dashboard>
 */
(function() {
  angular.module('incosa').component('dashboard', {
    templateUrl: 'partials/dashboard.html',
    controllerAs: 'vm',
    controller: [
      'dashboardService',
      '$window',
      '$location',
      function DashboardController(dashboardService, $window, $location) {
        var vm = this;
        var sensors;
        $window.document.title = 'Dashboard | Incosa Solutions';
        vm.sensorList = [];
        vm.loader = true;
      // $http.get("data/asset.json").then(
      //   function success(response) {
      //     $scope.schema = angular.fromJson(response.data);
      //   },
      // function error(response) { /* handle error */ });
     
        vm.schema ={
          // "$schema": "http://json-schema.org/draft-04/schema#",
          // "title": "Asset",
          // "description": "An Asset Json",
          "type": "object",
          "properties": {
            "uri": {
              "description": "URI of the product",
              "type": "string"
            },
            "classification": {
              "description": "URI of the product",
              "type": "string"
            },
            "parent": {
              "description": "URI of the product",
              "type": "string"
            },
            "id": {
              "description": "The unique identifier for a product",
              "type": "string"
            },
            "owner": {
                "description": "Name of the product",
                "type": "string"
            },
            "customer": {
              "description": "Name of the product",
              "type": "string"
            },  
            "location": {
              "description": "The unique identifier for a product",
              "type": "string"
            },
            "complexType": {
              "description": "Name of the product",
              "type": "string"
            },
            "description": {
              "description": "Name of the product",
              "type": "string"
            },    
            "attributes": {
              "type": "object",
              "properties": {
                "Name": {
                  "description": "Name",
                  "type": "string"
                },
                "SerialNo": {
                  "description": "Name",
                  "type": "string"
                },
                "Rated Voltage": {
                  "description": "Name",
                  "type": "string"
                },
                "Rated Capacity": {
                  "description": "Name",
                  "type": "string"
                },
                "Radio Control Manufacture": {
                  "description": "Name",
                  "type": "string"
                },
                "Radio Control Part Number": {
                  "description": "Name",
                  "type": "string"
                },
                "Number of Hoists": {
                  "description": "Name",
                  "type": "string"
                },
                "Number of Controllers": {
                  "description": "Name",
                  "type": "string"
                },
              },     
            },     
           
          },
          // "required": ['uri']
        }
        vm.schema2={
          // "$schema": "http://json-schema.org/draft-04/schema#",
          // "title": "Asset",
          // "description": "An Asset Json",
          // "type": "object",
          // "properties": {
            // "parameters": {
              "type": "object",
              "properties": {
                "type": "object",
                "ORE_BRIDGE_0_Temperature_C": {
                  "type": "object",
                  "properties": {
                    "pinType": {
                      "type": "string",
                      "title": "Pin Type",
                      "enum": [ "analog", "Digital"]
                    },
                    "ignoreTile": {
                      "description": "The unique identifier for a product",
                      "type": "boolean"
                    },
                    "tagType": {
                      "description": "Name of the product",
                      "type": "string"
                    },
                    "tag": {
                      "description": "Name of the product",
                      "type": "string"
                    },
                    "uom": {
                      "description": "Name of the product",
                      "type": "string"
                    },
                    "binary": {
                      "description": "The unique identifier for a product",
                      "type": "boolean"
                    },
                    "multiplier": {
                      "description": "The unique identifier for a product",
                      "type": "integer"
                    },
                    "low": {
                      "description": "The unique identifier for a product",
                      "type": "integer"
                    },
                    "high": {
                      "description": "The unique identifier for a product",
                      "type": "integer"
                    },
                    "decimal": {
                      "description": "The unique identifier for a product",
                      "type": "boolean"
                    },
                    "tileType": {
                        "type": "string",
                        "title": "TileType",
                        "enum": [ "text", "gauge"]
                      },
                    },
                    "index": {
                      "description": "The unique identifier for a product",
                      "type": "integer"
                    },
                  }
                }
          //   }
          // }
        }
        vm.uiSchema ={
          "type": "VerticalLayout",
          "elements": [
            {
            "type": "Group",
            "label": "Basic Info",
            "elements":[
              {
                "type": "VerticalLayout",
                "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": { "$ref": "#/properties/uri" }
                        },
                        {
                            "type": "Control",
                            "scope": { "$ref": "#/properties/classification" }
                        },
                        {
                          "type": "Control",
                          "scope": { "$ref": "#/properties/parent" }
                        },
                      ]
                    },
                    {
                    "type": "HorizontalLayout",
                    "elements": [
                        {
                          "type": "Control",
                          "scope": { "$ref": "#/properties/id" }
                        },{
                          "type": "Control",
                          "scope": { "$ref": "#/properties/owner" }
                        },{
                          "type": "Control",
                          "scope": { "$ref": "#/properties/customer" }
                        },
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [ 
                        {
                          "type": "Control",
                          "scope": { "$ref": "#/properties/location" }
                        },{
                          "type": "Control",
                          "scope": { "$ref": "#/properties/complexType" }
                        },
                        {
                          "type": "Control",
                          "scope": { "$ref": "#/properties/description" }
                        },
                      ]
                    }, 
                ]
              }
            ]
          },
          {
            "type":"Group",
            "label": "Attributes",
            elements:[
              {
                "type": "HorizontalLayout",
                "elements": [
                  {
                    "type": "Control",
                    "scope": { "$ref": "#/properties/location" }
                  },{
                    "type": "Control",
                    "scope": { "$ref": "#/properties/complexType" }
                  },
                  {
                    "type": "Control",
                    "scope": { "$ref": "#/properties/description" }
                  },
                ]
              }
            ]
          }
        ]
        }
        vm.data = {
          "uri": "/ASSET/Dofasco_OREBRIDGE",
          "classification": "/assetclassification/gantry",
          "parent": "/ASSET/DEMO_PARENT_SITE",
          "id": "ORE_BRIDGE",
          "owner": "Dofasco",
          "customer": "Dofasco",
          "location": "Hamilton, Ont,Canda",
          "complexType": "SHIP TO SHORE",
          "description": "Crane ",
          "attributes": {
            "Name": "ORE_BRIDGE",
            "SerialNo": "123456",
            "Rated Voltage": "480 V",
            "Rated Capacity": "60 T",
            "Radio Control Manufacture": "",
            "Radio Control Part Number": "",
            "Number of Hoists": "1",
            "Number of Controllers": "1"
          },
          "ioControls": [
            {
              "name": "TS I",
              "topic": "250"
            },
            {
              "name": "TS II",
              "topic": "251"
            }
          ],
        }
        vm.data2 ={
          // "parameters": {
            "ORE_BRIDGE_0_Temperature_C": {
              "pinType": "analog",
              "ignoreTile": false,
              "tagType": "West_Trolley_Motor_Temp",
              "tag": "ORE_BRIDGE_0_Temperature_C",
              "uom": "C",
              "binary": "false",
              "multiplier": "1",
              "low": 0,
              "high": 60,
              "decimal": false,
              "tileType": "gauge",
              "index": 1
            },
          // }
        }

        vm.sensorDisplay = function(sensor) {
          $location.path('/asset/' + sensor.id);
        };

        vm.$onInit = function() {
          sensors = dashboardService.getSensorList();
          sensors.promise.then(function(sensors) {
            vm.sensorList = sensors;
            dashboardService.setSensorList(sensors);
            vm.loader = false;
          });
        };

        vm.$onDestroy = function() {
          sensors.cancel();
        };
      }
    ]
  });
})();
