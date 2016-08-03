declare module 'yazl' {
   import stream = require("stream"); 
    
   export class ZipFile {
       addFile(sourcePath: string, entryPath: string) : void
       addEmptyDirectory(entryPath: string) : void
       end(): void;
       outputStream: stream.PassThrough;
   }
}