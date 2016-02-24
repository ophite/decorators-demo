// validator
(function () {
	let validator = {
		set: function (obj, prop, value) {
			if (prop === 'age') {
				if (!Number.isInteger(value)) {
					throw new TypeError('The age is not an integer');
				}
				if (value > 200) {
					throw new RangeError('The age seems invalid');
				}
			}

			// Стандартное сохранение значения
			obj[ prop ] = value;
		}
	};

	let target = {};
	let person = new Proxy(target, validator);

	console.log(Array(20).join('\n'));

	person.age = 100;
	console.log(`1) target.age: ${target.age}, proxy.age:${person.age}`);

	try {
		person.age = 'young';
		console.log(`2) target.age: ${target.age}, proxy.age:${person.age}`);
	}
	catch (err) {
		console.log(`2) err: ${err}`);
		console.log(`2) target.age: ${target.age}, proxy.age:${person.age}`);
	}

	try {
		person.age = 300;
		console.log(`3) target.age: ${target.age}, proxy.age:${person.age}`);
	}
	catch (err) {
		console.log(`3) err: ${err}`);
		console.log(`3) target.age: ${target.age}, proxy.age:${person.age}`);
	}
})();


// redirect
(function () {
	console.log(Array(20).join('\n'));
	var target = {};
	var p = new Proxy(target, {});
	p.a = 37;
	console.log(`target.a: ${target.a}, p.a: ${p.a}`);
})();

// get/set
(function () {
	console.log(Array(20).join('\n'));
	let obj = new Proxy({}, {
		get: function (target, key, receiver) {
			console.log(`getting ${key}`);
			return Reflect.get(target, key, receiver);
		},
		set: function (target, key, value, receiver) {
			console.log(`setting ${key}`);
			return Reflect.set(target, key, value, receiver);
		}
	});

	obj.count = 1;
	++obj.count;
})();

// readonly
(function () {
	console.log(Array(20).join('\n'));

	function NOPE() {
		throw new Error("can't modify read-only view");
	}

	let handler = {
		// Override all five mutating methods.
		set: NOPE,
		defineProperty: NOPE,
		deleteProperty: NOPE,
		preventExtensions: NOPE,
		setPrototypeOf: NOPE
	};

	function readOnlyView(target) {
		return new Proxy(target, handler);
	}

	var team = {
		name: 'Dynamo'
	};
	var proxy = readOnlyView(team);
	proxy.name = 'Dnipro';
})();

// Tree
(function () {
	console.log(Array(20).join('\n'));

	let handler = {
		get: function (target, key, receiver) {
			if (!(key in target)) {
				target[ key ] = Tree();  // auto-create a sub-Tree
			}
			return Reflect.get(target, key, receiver);
		}
	};

	function Tree() {
		return new Proxy({}, handler);
	}

	let tree = Tree();
	console.log(tree);
	tree.branch1.branch2.twig = "green";
	console.log(tree.toString());
	tree.branch1.branch3.twig = "yellow";
})();
