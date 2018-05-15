# HTTP Status Identifier CLI

[![Build Status](https://travis-ci.org/jaebradley/http-status-identifier-cli.svg?branch=master)](https://travis-ci.org/jaebradley/http-status-identifier-cli)
[![npm](https://img.shields.io/npm/dt/http-status-identifier-cli.svg)](https://www.npmjs.com/package/http-status-identifier-cli)
[![npm version](https://badge.fury.io/js/http-status-identifier-cli.svg)](https://badge.fury.io/js/http-status-identifier-cli)

[![NPM](https://nodei.co/npm/http-status-identifier-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/http-status-identifier-cli/)

* [Purpose](https://github.com/jaebradley/http-status-identifier-cli#purpose)
* [Installation](https://github.com/jaebradley/http-status-identifier-cli#installation)
* [Usage](https://github.com/jaebradley/http-status-identifier-cli#usage)
  * [Examples](https://github.com/jaebradley/http-status-identifier-cli#examples)
    * [Get the HTTP Status for HTTP Status Code `200`](https://github.com/jaebradley/http-status-identifier-cli#get-the-http-status-for-http-status-code-200)
    * [Get the HTTP Status for HTTP Status Name `I'm a teapot`](https://github.com/jaebradley/http-status-identifier-cli#get-the-http-status-for-http-status-name-im-a-teapot)
    * [Get the HTTP Status with additional information](https://github.com/jaebradley/http-status-identifier-cli#get-the-http-status-with-additional-information)
    * [Get the HTTP Statuses for HTTP Status Codes `100`, `200`, `300`, `400`, and `500`](https://github.com/jaebradley/http-status-identifier-cli#get-the-http-statuses-for-http-status-codes-100-200-300-400-and-500)
    * [Get the HTTP Statuses for a combination of HTTP Status Codes (`100`, `200`) and HTTP Status Names (`I'm a teapot`, `Bad Request`)](https://github.com/jaebradley/http-status-identifier-cli#get-the-http-statuses-for-a-combination-of-http-status-codes-100-200-and-http-status-names-im-a-teapot-bad-request)
    * [Get the HTTP Status for `200` and open the documentation page in the default browser](https://github.com/jaebradley/http-status-identifier-cli#get-the-http-status-for-200-and-open-the-documentation-page-in-the-default-browser)

### Purpose

A command line interface to identify HTTP statuses from status codes (i.e. `200`) or status names (i.e. `I'm a teapot`).

### Installation

Install via [NPM](https://www.npmjs.com/package/http-status-identifier-cli) (the `-g` flag will install the package globally):

```bash
npm install http-status-identifier-cli -g
```

### Usage

The command to identify HTTP statuses is `hs`.

It expects a list of HTTP status codes or HTTP status names. It will return a table containing the HTTP status names, HTTP status codes, and the meaning of the specified HTTP statuses.

If the `-f` (or `--fullDescription`) flag is included, an additional supplementary information field is included that provides even more information into the HTTP status. Sometimes, this field is empty if there is no additional information.

If the `-d` of (`--documentation`) flag is included, your default browser will open the documentation pages for each of the specified HTTP statuses.

The `-h` (or `--help`) flag is useful if you ever need help.

#### Examples

##### Get the HTTP Status for HTTP Status Code `200`

```bash
hs 200
```

![alt-text](http://i.imgur.com/oGp1DmO.png)

##### Get the HTTP Status for HTTP Status Name `I'm a teapot`

```bash
hs "I'm a teapot"
```

![alt-text](http://imgur.com/OvW3puw.png)

##### Get the HTTP Status with additional information

```bash
hs 200 -f
```

![alt-text](http://imgur.com/NQLgt8Q.png)

##### Get the HTTP Statuses for HTTP Status Codes `100`, `200`, `300`, `400`, and `500`

```bash
hs 100 200 300 400 500
```

![alt-text](http://imgur.com/nz9mqED.png)

##### Get the HTTP Statuses for a combination of HTTP Status Codes (`100`, `200`) and HTTP Status Names (`I'm a teapot`, `Bad Request`)

```bash
hs 100 "I'm a teapot" 200 "Bad request"
```

![alt-text](http://imgur.com/T343ywr.png)

##### Get the HTTP Status for `200` and open the documentation page in the default browser

```bash
hs 200 -d
```

![alt-text](http://g.recordit.co/e1QvGJZSJ4.gif)
