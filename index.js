/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * Reuse resolved promise, and allocate it lazily
 * @type {Promise<void>}
 */
let lazyPromise;

export default "function"==typeof queueMicrotask
	? queueMicrotask.bind(globalThis)
	: /** @param {(value: void)=>void|PromiseLike<void>} cb */ cb => (lazyPromise||(lazyPromise=Promise.resolve()))
		.then(cb)
		.catch((
			/** 
			 * Error catch callback - if an error is caught it throws it up to the next catch on the next closest tick
			 * @param {(reason: any) => NodeJS.Timeout | PromiseLike<NodeJS.Timeout>} err
			 */
			err => setTimeout(()=>{ throw err },0)
		));
