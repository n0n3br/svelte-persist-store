const chai = require("chai");
const expect = chai.expect;
const { readable } = require("../index");

describe("readable", () => {
    it("should create a readable store", () => {
        const store = readable("store", {}, (set) => {
            set: {
                a: 1;
            }
        });
        expect(store.subscribe).to.be.a("function");
        expect(store.set).to.be.a("undefined");
        expect(store.update).to.be.a("undefined");
    });

    it("should update the readable store from inside", () => {
        let state;
        const store = readable("store", { counter: 1 }, (set) => {
            set({ counter: 2 });
        });
        store.subscribe((s) => {
            state = s;
        });
        expect(state).to.be.eql({ counter: 2 });
    });
});
