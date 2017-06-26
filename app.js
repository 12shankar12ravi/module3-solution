(function(){

angular.module('NarrrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController )
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',foundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
var nidc=this;

nidc.searchTerm = "";
nidc.foundItems = [];

nidc.removeItem = function (index){
  (nidc.foundItems).splice(index,1);
  console.log(nidc.foundItems);
}

nidc.listdownFoundItems=function(searchTerm){
  (MenuSearchService.getMatchedMenuItems(searchTerm)).then(
    function(response){
      nidc.foundItems = response;
    }
  );

}

}

function foundItems(){
  var ddo={
     templateUrl : 'founditemslist.html',
     scope:{
       items: '<',
       nidc1: '=myNidc',
       onRemove: '&'
     }
  };

  return ddo;
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
