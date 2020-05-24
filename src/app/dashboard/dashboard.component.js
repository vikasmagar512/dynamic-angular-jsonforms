var jq = $.noConflict();
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
        vm.data2 = {
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
            "ORE_BRIDGE_1_Temperature_C": {
              "pinType": "analog",
              "ignoreTile": false,
              "tagType": "West_Trolley_Blower_Temp",
              "tag": "ORE_BRIDGE_1_Temperature_C",
              "uom": "C",
              "binary": "false",
              "multiplier": "1",
              "low": 0,
              "high": 60,
              "decimal": false,
              "tileType": "gauge",
              "index": 2
            },
            "ORE_BRIDGE_2_Temperature_C": {
              "pinType": "analog",
              "ignoreTile": false,
              "tagType": "West_Trolley_G-Box_Temp",
              "tag": "ORE_BRIDGE_2_Temperature_C",
              "uom": "C",
              "binary": "false",
              "multiplier": "1",
              "low": 0,
              "high": 60,
              "decimal": false,
              "tileType": "gauge",
              "index": 3
            },
            
          // }
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

              // "pinType": {
              //   "type": "string",
              //   "title": "Pin Type",
              //   "enum": [ "analog", "Digital"]
              // },
              // "ignoreTile": {
              //   "description": "The unique identifier for a product",
              //   "type": "boolean"
              // },
              // "tagType": {
              //   "description": "Name of the product",
              //   "type": "string"
              // },
              // "tag": {
              //   "description": "Name of the product",
              //   "type": "string"
              // },
              // "uom": {
              //   "description": "Name of the product",
              //   "type": "string"
              // },
              // "binary": {
              //   "description": "The unique identifier for a product",
              //   "type": "boolean"
              // },
              // "multiplier": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
              // "low": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
              // "high": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
              // "decimal": {
              //   "description": "The unique identifier for a product",
              //   "type": "boolean"
              // },
              // "tileType": {
              //     "type": "string",
              //     "title": "TileType",
              //     "enum": [ "text", "gauge"]
              //   },
              //   "index": {
              //     "description": "The unique identifier for a product",
              //     "type": "integer"
              //   },

            // "type": "object",
            // "ORE_BRIDGE_0_Temperature_C": {
            // }
          }
        }

        Object.keys(vm.data2).map(key=>{
          vm.schema2.properties[key] = {
            "type": "object",
            "properties": {
              // "pinType": {
              //   "type": "string",
              //   "title": "Pin Type",
              //   "enum": [ "analog", "Digital"]
              // },
              "ignoreTile": {
                "description": "The unique identifier for a product",
                "type": "boolean"
              },
              "tagType": {
                "description": "Name of the product",
                "type": "string"
              },
              // "tag": {
              //   "description": "Name of the product",
              //   "type": "string"
              // },
              // "uom": {
              //   "description": "Name of the product",
              //   "type": "string"
              // },
              // "binary": {
              //   "description": "The unique identifier for a product",
              //   "type": "boolean"
              // },
              // "multiplier": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
              // "low": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
              // "high": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
              // "decimal": {
              //   "description": "The unique identifier for a product",
              //   "type": "boolean"
              // },
              // "tileType": {
              //   "type": "string",
              //   "title": "TileType",
              //   "enum": [ "text", "gauge"]
              // },
              // "index": {
              //   "description": "The unique identifier for a product",
              //   "type": "integer"
              // },
            },
          }
        })

        vm.uiSchema2 ={
          "type": "VerticalLayout",
          "elements": [
            // {
              // "type": "Group",
              // "label": "Attribute",
              // "elements":[
              //   {
              //     "type": "VerticalLayout",
              //     "elements": [
              //         {
              //           "type": "HorizontalLayout",  
              //           "elements": [
                          // {
                          //   "type": "Control",
                          //   "scope": { "$ref": "#/properties/pinType" }
                          // },
                          {
                              "type": "Control",
                              "scope": { "$ref": "#/properties/ignoreTile" }
                          },
                          {
                            "type": "Control",
                            "scope": { "$ref": "#/properties/tagType" }
                          },
                      //   ]
                      // },
                      // {
                      // "type": "HorizontalLayout",
                      // "elements": [
                      //     {
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/tag" }
                      //     },{
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/uom" }
                      //     },{
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/binary" }
                      //     },
                      //   ]
                      // },
                      // {
                      //   "type": "HorizontalLayout",
                      //   "elements": [ 
                      //     {
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/multiplier" }
                      //     },{
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/low" }
                      //     },
                      //     {
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/high" }
                      //     },
                      //   ]
                      // }, 
                      // {
                      //   "type": "HorizontalLayout",
                      //   "elements": [ 
                      //     {
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/decimal" }
                      //     },{
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/tileType" }
                      //     },
                      //     {
                      //       "type": "Control",
                      //       "scope": { "$ref": "#/properties/index" }
                      //     },
                      //   ]
                      // }, 
            //       ]
            //     }
            //   ]
            // },
          ]
        }

        function myFunction(e) {
          alert('myFunction')
          let temp_data2 = {}
          let temp_schema2 = vm.schema2
          let newKey = document.getElementById("#/properties/id").value
          const keys = Object.keys(vm.data2)
          debugger
          console.log('vm.data2 ',vm.data2)
          keys.map((oldKey,i)=>{
            temp_data2[newKey + oldKey.slice(vm.oldAsset_ID_value.length)] = {...vm.data2[oldKey], tag: newKey  + oldKey.slice(vm.oldAsset_ID_value.length)}
            temp_schema2.properties[newKey + oldKey.slice(vm.oldAsset_ID_value.length)] = vm.schema2.properties[oldKey]
            
            delete vm.schema2.properties[oldKey]
            delete temp_schema2.properties[oldKey]
            delete vm.data2.oldKey
          })
          vm.data2 = temp_data2;
          vm.schema2 = temp_schema2;
        }
        
        vm.changeData=function(event){
          alert('changeData')
        }
        vm.sensorDisplay = function(sensor) {
          $location.path('/asset/' + sensor.id);
        };

        vm.$onInit = function() {
          setTimeout(()=>{
            vm.oldAsset_ID_value = document.getElementById("#/properties/id").value
            document.getElementById("#/properties/id").addEventListener("change", myFunction);
          },1000)
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
