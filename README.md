<br/>
<p align="center">
<a href=" " target="_blank">
<img src="https://bafybeifozdhcbbfydy2rs6vbkbbtj3wc4vjlz5zg2cnqhb2g4rm2o5ldna.ipfs.w3s.link/dataverse.svg" width="180" alt="Dataverse logo">
</a >
</p >
<br/>

# Create Dataverse App

## Overview

This repository contains command-line tool and other convenient user-friendly
package for developers to build a dataverse app.

## dataverseos-cmd

[![npm version](https://img.shields.io/npm/v/create-dataverse-app.svg)](https://www.npmjs.com/package/create-dataverse-app)
![npm](https://img.shields.io/npm/dw/create-dataverse-app)
[![License](https://img.shields.io/npm/l/create-dataverse-app.svg)](https://github.com/dataverse-os/hooks/blob/main/LICENSE.md)

A command-line tool enable developers to init a dataverse app project and deploy
to Dataverse os.

```
pnpm install -g create-dataverse-app
```

After installation, use `--help` to see more features.

```
dataverseos --help
```

This command-line tool is the entry point for interacting with our Dataverse OS.
Developers who want to access the powerful features of Dataverse OS need to
install it.

### Create an App

```
dataverseos init my-datverse-app
```

## model-parser

[![npm version](https://img.shields.io/npm/v/@dataverse/model-parser.svg)](https://www.npmjs.com/package/@dataverse/model-parser)
![npm](https://img.shields.io/npm/dw/@dataverse/model-parser)
[![License](https://img.shields.io/npm/l/@dataverse/model-parser.svg)](https://github.com/dataverse-os/hooks/blob/main/LICENSE.md)

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

[![npm version](https://img.shields.io/npm/v/@dataverse/dapp-table-client.svg)](https://www.npmjs.com/package/@dataverse/dapp-table-client)
![npm](https://img.shields.io/npm/dw/@dataverse/dapp-table-client)
[![License](https://img.shields.io/npm/l/@dataverse/dapp-table-client.svg)](https://github.com/dataverse-os/hooks/blob/main/LICENSE.md)

This is a client for retrieving Dataverse DApp information, creating Dataverse
DApps, and updating Dataverse DApps. The main exposed methods are as follows:

- getFileSystemModels
- getDapp
- getDapps
- createDapp
- updateDapp
