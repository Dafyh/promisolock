declare class Promisolock {
    constructor(max?: number);

    all(arr?: Array<() => any>): Promise<any[]>;
}

declare function promisolock(
  max?: number,
): Promisolock;

export = promisolock;