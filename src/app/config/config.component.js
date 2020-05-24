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
        var sensors;
        $window.document.title = 'Config | Incosa Solutions';
        vm.sensorList = [];
        vm.loader = false;
      
        $scope.showContent = function($fileContent){
          $scope.content = $fileContent;
          debugger
          const jsonData = JSON.parse($scope.content)
          vm.data = jsonData[0];
          vm.data2 = jsonData[0].parameters;
          vm.loader = true;
          setTimeout(()=>{
            vm.oldAsset_ID_value = document.getElementById("#/properties/id").value
            document.getElementById("#/properties/id").addEventListener("change", myFunction);
            vm.loader = false;
          },1000)
        };
     
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

        function myFunction(e) {
          vm.loader = true;

          alert('myFunction')
          let newKey = document.getElementById("#/properties/id").value
          const keys = Object.keys(vm.data2)
          debugger
          console.log('vm.data2 ',vm.data2)
          keys.map((oldKey,i)=>{
            vm.data2[newKey + oldKey.slice(vm.oldAsset_ID_value.length)] = {...vm.data2[oldKey], tag: newKey  + oldKey.slice(vm.oldAsset_ID_value.length)}
            delete vm.data2[oldKey]
          })
          vm.loader = false;
        }
        vm.downloadResponseAsInfoFile = function (response) {
          let d =[{
            ...vm.data,
            parameters: vm.data2
          }]
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
