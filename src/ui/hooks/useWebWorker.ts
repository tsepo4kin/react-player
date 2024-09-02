import { useState } from "react";

const workerHandler = (cb: Function) => {
  onmessage = event => {
    postMessage(cb(event.data));
  }
}

export const useWebWorker = (cb: Function) => {
  const [result, setResult] = useState('');

  const run = () => {
    const worker = new Worker(URL.createObjectURL(new Blob([`(${workerHandler})(${cb})`])));

    worker.onmessage = event => {
      setResult(event.data as string)
      worker.terminate();
    }

    worker.onerror = event => {
      setResult(event.message)
      worker.terminate();
    }
  }

  return {
    result,
    run
  }
}