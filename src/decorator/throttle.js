export default (duration = 500) => {
	return (target, key, descriptor) => {

		let func = descriptor.value;
		let isThrottled = false,
			savedArgs,
			timeoutId;

		const wrapper = function (...args) {
			if (isThrottled) {
				savedArgs = args;
				return;
			}

			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			isThrottled = true;
			timeoutId = setTimeout((() => {
				isThrottled = false;
				return func.apply(this, args);
			}).bind(this), duration);
		};

		descriptor.value = wrapper;
	};
};