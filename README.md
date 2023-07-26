<br/>
<p align="center">
<a href=" " target="_blank">
<img src="./logo.svg" width="180" alt="Dataverse logo">
</a >
</p >
<br/>

# Create Dataverse App

## Overview

This repository contains command-line tool and other convenient user-friendly
package for developers to build a dataverse app.

## dataverseos-cmd

A command-line tool enable developers to init a dataverse app project and deploy
to Dataverse os.

```
pnpm install -g dataverseos-cmd
```

After installation, use `--help` to see more features.

```
dataverseos --help
```

This command-line tool is the entry point for interacting with our Dataverse OS.
Developers who want to access the powerful features of Dataverse OS need to
install it.

## model-parser

When developers run in a existing dataverse app.

```
dataverseos deploy
```

`output/app.json` will be generated locally, which contains various detailed
information about this deployed app.

In the data structure of this JSON, some properties such as `modelId` may have
nested levels, so the `model-parser` package is needed to facilitate developers
in retrieving key information from `output/app.json`.

This package will be automatically included in package dependencies of the
inited(`dataverseos init <app>`) dataverse app project.

## dapp-table-client

This is a client for retrieving Dataverse DApp information, creating Dataverse
DApps, and updating Dataverse DApps. The main exposed methods are as follows:

- getFileSystemModels
- getDapp
- getDapps
- createDapp
- updateDapp
