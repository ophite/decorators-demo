export default () => {
	return (target, key, descriptor) => {
		target.isTestable = true;
	};
};
