# promisolock
![Build Status](https://img.shields.io/travis/com/dafyh/promisolock) ![Coverage](https://img.shields.io/codecov/c/github/dafyh/promisolock)

Useful to handle the number of promises to start in a **Promise.all** for long and resource-intensive operations.

## Install

```
$ npm install promisolock
# or
$ yarn add promisolock
```

## Usage

```js
const promisolock = require("promisolock");


promisolock(2).all([
 () => Promise.resolve("P1"), // Starts immediately
 () => Promise.resolve("P2"), // Starts immediately
 () => Promise.resolve("P3"), // Await for one of the above promises to be fulfilled
 () => Promise.resolve("P4"), // etc
]).then(console.log).catch(console.error);
//=> ["P1", "P2", "P3", "P4"]

async function main() {

  await promisolock(3)
    .all(["P1", "P2", "P3", "P4"].map((str) => () => Promise.resolve(str)))
    .then(console.log)
    .catch(console.error);

};

main();
//=> ["P1", "P2", "P3", "P4"]

```

## API

### promisolock(max).all(callbacks)

```ts
max?: number; 
// Number of promises to start simultaneously, default 1.

callbacks?: Array<() => any> 
// Promises to start in a promise.all, default [].
```



#### Inspired by [@SlimIO/Lock](https://github.com/SlimIO/Lock)
