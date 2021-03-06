![Icon](https://github.com/geeklearningio/gl-vsts-tasks-files/blob/master/Extension/extension-icon.png)

# Files Helpers Build and Release Tasks

![cistatus](https://geeklearning.visualstudio.com/_apis/public/build/definitions/f841b266-7595-4d01-9ee1-4864cf65aa73/47/badge)

Visual Studio Team Services Build and Release Management extensions that help you manipulate your files.

[Learn more](https://github.com/geeklearningio/gl-vsts-tasks-files/wiki) about this extension on the wiki!

## Tasks included

* **[ZIP Files](https://github.com/geeklearningio/gl-vsts-tasks-files/wiki/ZIP-Files)**: ZIP files from directories using minimatch filtering
* **[Copy Files Extended](https://github.com/geeklearningio/gl-vsts-tasks-files/wiki/Copy-Files-Extended)**: Copy files with full micromatch support

## To contribute

1. Globally install typescript and tfx-cli (to package VSTS extensions): `npm install -g typescript tfx-cli`
2. From the root of the repo run `npm install`. This will pull down the necessary modules for the different tasks and for the build tools.
3. Run `npm run build` to compile the build tasks.
4. Run `npm run package -- --version <version>` to create the .vsix extension packages (supports multiple environments) that includes the build tasks.

## Release Notes

> **8-1-2016**
> - Added: ZIP Files
> - Added: Copy Files Extended

## Contributors

This extension was created by [Geek Learning](http://geeklearning.io/), with help from the community.

## Attributions

* [CopyFiles icon from the VSTS Tasks project](https://github.com/Microsoft/vsts-tasks)
* [Zip by Arthur Shlain from the Noun Project](https://thenounproject.com/search/?q=zip&i=159827)
