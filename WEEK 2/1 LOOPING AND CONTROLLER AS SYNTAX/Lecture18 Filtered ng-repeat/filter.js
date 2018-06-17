var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Number array: ", numberArray);

var filteredArray = numberArray.filter(function (value){
    return value > 5;
});
console.log("Filtered array: ", filteredArray);

function filteredFuncArray(value){
    return value > 5;
}

var filteredByFunctionArray = numberArray.filter(filteredFuncArray);
console.log("Filtered by function array: ", filteredByFunctionArray);

var shoppingList = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", 
    "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"];

var searchValue = "Bismol";
function searchValueFunction(value){
    return value.indexOf(searchValue) !== -1;
}

var searchedShoppingList = shoppingList.filter(searchValueFunction);
console.log("Searched Shopping List: ", searchedShoppingList);