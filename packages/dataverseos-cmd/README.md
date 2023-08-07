<br/>
<p align="center">
<a href=" " target="_blank">
<img src="https://bafybeifozdhcbbfydy2rs6vbkbbtj3wc4vjlz5zg2cnqhb2g4rm2o5ldna.ipfs.w3s.link/dataverse.svg" width="180" alt="Dataverse logo">
</a >
</p >
<br/>

# dataverseos-cmd

[![npm version](https://img.shields.io/npm/v/create-dataverse-app.svg)](https://www.npmjs.com/package/create-dataverse-app)
![npm](https://img.shields.io/npm/dw/create-dataverse-app)
[![License](https://img.shields.io/npm/l/create-dataverse-app.svg)](https://github.com/dataverse-os/hooks/blob/main/LICENSE.md)

## Install

```
pnpm install -g create-dataverse-app
```

Then check version:

```
dataverseos --version
```

## Command

### init

```
dataverseos init my-app
```

> Note: Please ensure that you have the latest version, otherwise the "init"
> operation will be terminated.

### deploy

```
cd my-app
dataverseos deploy
```

You need to input `private key` in this step. Please rest assured that your
private key is only used for signing, and Dataverse will never save or disclose
it.

### keypair

If you want to use a new generated private key, you could run:

```
dataverseos keypair
```

In the terminal, `Address`, `Private Key` and `Public Key` will be displayed,
and you can copy the `Private Key` for future use.

### update

```
dataverseos update
```

When you modify the `dataverse.config.ts`, you can update the information of the
dapp. A new generated `app.json` would store in `output` directory.
