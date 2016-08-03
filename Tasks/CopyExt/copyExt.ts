import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
import micromatch = require('micromatch');

try {

    var sourceFolder = tl.getPathInput("SourceFolder");
    var patterns: any = tl.getInput("Contents").split("\n").map((pattern) => {
        if (pattern.match(/^!/)) {
            return '!' + path.join(sourceFolder, pattern.substr(1));
        }
        return path.join(sourceFolder, pattern)
    });
    var allFiles = tl.find(sourceFolder).map(file => path.resolve(file));
    var targetFolder = tl.getPathInput("TargetFolder");
    var cleanTargetFolder = tl.getBoolInput("CleanTargetFolder");
    var overWrite = tl.getBoolInput("OverWrite");

    var files = allFiles.filter(micromatch.filter(patterns, { nodupes: true }));


    if (cleanTargetFolder) {
        tl.rmRF(targetFolder);
    }

    fs.ensureDirSync(targetFolder);


    console.log('copying following files :');
    for (var index = 0; index < files.length; index++) {
        var file = files[index];
        console.log('[From]' + file);
        var sourceRelative = path.relative(sourceFolder, file);
        var targetPath = path.join(targetFolder, sourceRelative);

        var targetPathDir = path.dirname(targetPath);
        fs.ensureDirSync(targetPathDir);

        if (fs.existsSync(targetPath) && !overWrite) {
            console.log('[Cancelled] skipping file because overWrite is not enabled');
        } else {
            fs.copySync(file, targetPath, { clobber: true });
            console.log('[To]' + targetPath);
        }
    }

} catch (err) {
    tl.setResult(tl.TaskResult.Failed, String(err));
}
