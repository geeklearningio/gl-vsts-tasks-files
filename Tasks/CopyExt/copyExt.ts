import path = require('path');
import fs = require('fs-extra');
import tl = require('vsts-task-lib/task');
import matcher = require('./common/shared/multimatch');

try {

    var sourceFolder = tl.getPathInput("SourceFolder");
    var patterns: any = tl.getInput("Contents");
    var targetFolder = tl.getPathInput("TargetFolder");
    var cleanTargetFolder = tl.getBoolInput("CleanTargetFolder");
    var overWrite = tl.getBoolInput("OverWrite");

    var files = matcher.getMatches(sourceFolder, patterns);

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
