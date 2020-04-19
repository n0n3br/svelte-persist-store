const chai = require("chai");
const expect = chai.expect;
const { writable } = require("../index");

describe("writable", () => {
    it("should create a writable store", () => {
        let state;
        const store = writable("store", {});
        store.subscribe((s) => {
            state = s;
        });
        expect(store.subscribe).to.be.a("function");
        expect(store.set).to.be.a("function");
        expect(store.update).to.be.a("function");
    });
    it("should set the value of the writable store", () => {
        let state;
        const store = writable("store", {});
        store.subscribe((s) => {
            state = s;
        });
        store.set({ a: 1 });
        expect(state).to.eql({ a: 1 });
    });
    it("should update the value of the writable store", () => {
        let state;
        const store = writable("store", {});
        store.subscribe((s) => {
            state = s;
        });
        store.update((s) => {
            return { ...s, b: 1 };
        });
        expect(state).to.eql({ b: 1 });
    });
});
