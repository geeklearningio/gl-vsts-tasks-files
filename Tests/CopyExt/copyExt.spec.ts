import multimatch = require("../../Tasks/CopyExt/common/shared/multimatch");


import path = require('path')
describe("Multimatch", () => {

    it("should find a match", ()=>{
        var files = multimatch.applyMatch(process.cwd(), "**/*.nupkg\n!**/*.symbols.nupkg", ["bin/release/somefile.nupkg", "bin/release/somefile.symbols.nupkg"])
        expect(files.length).toEqual(1);
        expect(files[0]).toEqual(path.join(process.cwd(), 'bin/release/somefile.nupkg'));
    })

});