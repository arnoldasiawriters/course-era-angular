/** Prototypal Inheritance **/
/**
var parent = {
    value: "Parent Object",
    obj : {
        objvalue: "Parent object value"
    },
    walk: function() {
        console.log("Walking");
    }
};

var child = Object.create(parent);
console.log("CHILD - child.value: ", child.value);
console.log("PARENT - parent.value: ", parent.value);
console.log("CHILD - child.obj.objvalue: ", child.obj.objvalue);
console.log("PARENT - parent.obj.objvalue: ", parent.obj.objvalue);
console.log("CHILD - child: ", child);
console.log("PARENT - parent: ", parent);

child.value = "Child object";
child.obj.objvalue = "Child object value";

console.log("*** CHANGED: child.value = 'Child object'");
console.log("*** CHANGED: child.obj.objvalue = \"Child object value\"");
console.log("CHILD - child.value: ", child.value);
console.log("CHILD - child.obj.objvalue: ", child.obj.objvalue);
console.log("PARENT - parent.value: ", parent.value);
console.log("PARENT - parent.obj.objvalue: ", parent.obj.objvalue);
console.log("CHILD - child: ", child);
console.log("PARENT - parent: ", parent);

console.log("parent.obj === child.obj: ", parent.obj === child.obj);

var grandchild = Object.create(child);
console.log("grandchild: ", grandchild);
grandchild.walk();
**/

/** Function constructors */
function Dog(name){
    this.name = name;
    console.log("this: ",this);
}

var myDog = new Dog("My dog");
console.log("myDog: ", myDog);

Dog('myDog');