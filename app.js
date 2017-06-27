(function(){

angular.module('NarrrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController )
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItems);

function foundItems(){
  var ddo={
     templateUrl : 'founditemslist.html',
     scope:{
       items: '<',
       onRemove: '&'
     },
     controller:NarrowItDownDirectiveController,
     controllerAs: 'niddir',
     bindToController: true,
  };

  return ddo;
}

function NarrowItDownDirectiveController(){
 var niddir1=this;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
var nidc=this;

nidc.searchTerm = "";
nidc.foundItems = [];

nidc.removeItem = function (index){
  (nidc.foundItems).splice(index,1);
}

nidc.listdownFoundItems=function(searchTerm){
  if( searchTerm.length>0 && searchTerm!=null){
    (MenuSearchService.getMatchedMenuItems(searchTerm)).then(
      function(response){
        nidc.foundItems = response;
      }
    );
  }else{
     nidc.foundItems = [];
     nidc.errorMessage="Nothing Found";
  }
}

}


function MenuSearchService($http){

var service = this;

service.getMatchedMenuItems=function(searchTerm){
   var response= $http({
     method: "GET",
     url:"https://davids-restaurant.herokuapp.com/menu_items.json"
   })
   .then(function (result) {
     var items=result.data.menu_items;
     var foundItems=[];
     for(var i=0;i<items.length;i++){
       if(items[i].description.indexOf(searchTerm) != -1 ){
         foundItems.push(items[i]);
       }
     }
     return foundItems;
   });

   return response;
}


}




})();
