describe("Sample Tests", () => {
    it("should sum 1 + 2 and pass waiting 3 as result", () => {
        return Promise.resolve(1 + 2).then((result) => {
            return expect(result).toBe(3);
        });
    });

    it("should catch error when throwing 'error message'", () => {
        return Promise.reject(new Error("error message")).catch((error) => {
            return expect(error.message).toBe("error message");
        });
    });
});
