import logError from './decorator/log';
import testable from './decorator/testable';
import debounce from './decorator/debounce';
import throttle from './decorator/throttle';


@testable()
class Boo extends Object {

	constructor(props) {
		super(props);
		this.name = 'test';
		let input = document.querySelector("#bounce");
		input.addEventListener('keydown', this.changeDebounce);
		input = document.querySelector("#throttle");
		input.addEventListener('keydown', this.changeThrottle);
	}

	@testable()
	@logError(true)
	setName(newName) {
		this_is_error
		this.name = newName;
	}

	@debounce()
	changeDebounce(e) {
		console.log('changeDebounce to: ' + e.target.value);
	}

	@throttle()
	changeThrottle(e) {
		console.log('changeThrottle to: ' + e.target.value);
	}
}


// log error
let obj = new Boo();
obj.setName('changed name2')

// class decorator
console.log(`class isTestable: ${Boo.isTestable}`);
console.log(`var isTestable: ${obj.isTestable}`);

