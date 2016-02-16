// logger API
const logError = (error, mode) => {
	let loggerWarn = console.warn.bind(console);
	let loggerLog = console.log.bind(console);

	if (mode) {
		loggerWarn('Error: ' + error);
	} else {
		loggerLog('Error: ' + error);
	}
};

// decorator
export default (useWarnConsole = false) => {
	return (target, key, descriptor) => {

		let func = descriptor.value;
		descriptor.value = function (...arg) {
			return (() => {
				try {
					return func.apply(this, arg);
				}
				catch (err) {
					logError(err, useWarnConsole);
				}
			}).bind(this)();
		};
	};
};
