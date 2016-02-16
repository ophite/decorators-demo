export default (duration = 500) => {
	return (target, key, descriptor) => {

		let func = descriptor.value;
		let timeoutId;
		const clear = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		};

		descriptor.value = ((...args) => {
			clear();
			timeoutId = setTimeout(() => {
				timeoutId = null;
				return func.apply(this, args)
			}, duration);
		}).bind(this);
	}
}
