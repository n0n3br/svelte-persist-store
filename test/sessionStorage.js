const chai = require("chai");
const lzString = require("lz-string");
const expect = chai.expect;
const { writable } = require("../index");

describe("sessionStorage", () => {
    it("should store uncompressed value in sessionStorage", () => {
        const store = writable("store", { a: 1 }, { mode: "session" });
        const lsValue = sessionStorage.getItem("svelte-persist-store-store");
        expect(lsValue).to.be.equal(JSON.stringify({ a: 1 }));
    });
    it("should store compressed value in sessionStorage", () => {
        const store = writable(
            "store",
            { a: 1 },
            { compress: true, mode: "session" }
        );
        const lsValue = sessionStorage.getItem(
            "svelte-persist-store-store-compressed"
        );
        expect(lsValue).to.be.equal(
            lzString.compressToUTF16(JSON.stringify({ a: 1 }))
        );
    });
});
