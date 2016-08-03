import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
import yazl = require('yazl');
import micromatch = require('micromatch');

try {

    var zipRoot = tl.getPathInput("ZipRoot");
    var patterns: any = tl.getInput("Contents").split("\n").map((pattern) => {
        if (pattern.match(/^!/)) {
            return '!' + path.join(zipRoot, pattern.substr(1));
        }
        return path.join(zipRoot, pattern)
    });
    var allFiles = tl.find(zipRoot).map(file => path.resolve(file));
    var zipPath = tl.getPathInput("TargetPath");
    var zipName = tl.getPathInput("ZipName");
    var zipFile = new yazl.ZipFile();

    zipFile.outputStream.pipe(fs.createWriteStream(path.join(zipPath, zipName)))
        .on("close", () => {
            console.log('zipping done');
            tl.setResult(tl.TaskResult.Succeeded, "Content zipped");
        })
        .on('error', (err) => {
            console.log('zipping failed');
            console.log(err);
            tl.setResult(tl.TaskResult.Failed, String(err));
        });

    console.log("patterns:" + JSON.stringify(patterns));
    console.log("candidates :" + JSON.stringify(allFiles));

    var files = allFiles.filter(micromatch.filter(patterns, { nodupes: true }));

    console.log('zipping following files :');
    for (var index = 0; index < files.length; index++) {
        var file = files[index];
        console.log(file);
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            zipFile.addEmptyDirectory(path.relative(zipRoot, file));
        } else {
            zipFile.addFile(file, path.relative(zipRoot, file));
        }
    }
    zipFile.end();

} catch (err) {
    tl.setResult(tl.TaskResult.Failed, String(err));
}
