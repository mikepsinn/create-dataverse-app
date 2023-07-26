<br/>
<p align="center">
<a href=" " target="_blank">
<img src="./logo.svg" width="180" alt="Dataverse logo">
</a >
</p >
<br/>

# model-parser

## Overview

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

## Install

```
pnpm install @dataverse/model-parser
```
