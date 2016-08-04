import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
import yazl = require('yazl');
import matcher = require('./common/shared/multimatch');

try {
    var zipRoot = tl.getPathInput("ZipRoot");
    var patterns: any = tl.getInput("Contents")
    var zipPath = tl.getPathInput("TargetPath");
    var zipName = tl.getPathInput("ZipName");
    var zipFile = new yazl.ZipFile();

    zipFile.outputStream.pipe(fs.createWriteStream(path.join(zipPath, zipName)))
        .on("close", () => {
            console.log('zipping done');
            tl.setResult(tl.TaskResult.Succeeded, "Content zipped");
        })
        .on('error', (err: any) => {
            console.log('zipping failed');
            console.log(err);
            tl.setResult(tl.TaskResult.Failed, String(err));
        });

     var files = matcher.getMatches(zipRoot, patterns);

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
