const chai = require("chai");
const lzString = require("lz-string");
const expect = chai.expect;
const { writable } = require("../index");

describe("localStorage", () => {
    it("should store uncompressed value in localStorage", () => {
        const store = writable("store", { a: 1 });
        const lsValue = localStorage.getItem("svelte-persist-store-store");
        expect(lsValue).to.be.equal(JSON.stringify({ a: 1 }));
    });
    it("should store compressed value in localStorage", () => {
        const store = writable("store", { a: 1 }, { compress: true });
        const lsValue = localStorage.getItem(
            "svelte-persist-store-store-compressed"
        );
        expect(lsValue).to.be.equal(
            lzString.compressToUTF16(JSON.stringify({ a: 1 }))
        );
    });
});
