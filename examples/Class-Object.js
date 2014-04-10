//Place for private variables

// Constructor ==>  (new)
function Foo(bar) {
  // always initialize all instance properties
  this.bar = bar;
  this.baz = 'baz'; // default value
}

// class methods/properties  (tjrs des fonctions pas des données!!)
Foo.prototype.fooBar = function() {
	console.log("toto");
};


// export the class   ===> (require)
module.exports = Foo;//doit avoir le même nom que le constructeur


