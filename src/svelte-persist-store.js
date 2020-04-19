import { writable as svw, readable as svr } from "svelte/store";
import lzString from "lz-string";

const makeName = (key, compress) =>
    `svelte-persist-store-${key}` + (compress ? "-compressed" : "");

const makeValue = (value, compress) => {
    let returnValue = JSON.stringify(value);
    if (compress) returnValue = lzString.compressToUTF16(returnValue);
    return returnValue;
};

const getValue = (key, mode, compress) => {
    let storage = mode.slice(0, 1) === "l" ? localStorage : sessionStorage;
    let value = storage.getItem(makeName, key, compress);
    if (!value) return false;
    if (compress) value = lzString.decompressFromUTF16(value);
    return JSON.parse(value);
};

const hydrate = (key, store, mode) => {
    const value = getValue(key, mode, false) || getValue(key, mode, true);
    if (value && store.set) store.set(value);
};

const subscribe = (store, key, compress, mode) => {
    let storage = mode === "l" ? localStorage : sessionStorage;
    if (!store.subscribe) return;
    store.subscribe((state) => {
        storage.setItem(makeName(key, compress), makeValue(state, compress));
    });
};

const create = (
    key,
    initialValue,
    compress = false,
    type,
    mode = "l",
    callback = () => true
) => {
    let store;
    switch (type) {
        case "w":
            store = svw(initialValue);
            break;
        case "r":
            store = svr(initialValue, callback);
            break;
    }
    hydrate(key, store, mode);
    subscribe(store, key, compress, mode);
    return store;
};

export const writable = (key, initialValue, options = {}) =>
    create(key, initialValue, options.compress, "w", options.mode);
export const readable = (key, initialValue, callback, options = {}) =>
    create(key, initialValue, options.compress, "r", options.mode, callback);
