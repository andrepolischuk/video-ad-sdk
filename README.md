# Video Ad SDK

[![Build Status](https://api.travis-ci.com/rambler-digital-solutions/video-ad-sdk.svg?branch=master)](https://travis-ci.com/rambler-digital-solutions/video-ad-sdk) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rambler-digital-solutions/video-ad-sdk/blob/master/LICENSE) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![codecov](https://codecov.io/gh/rambler-digital-solutions/video-ad-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/rambler-digital-solutions/video-ad-sdk) [![Known Vulnerabilities](https://snyk.io/test/github/rambler-digital-solutions/video-ad-sdk/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rambler-digital-solutions/video-ad-sdk?targetFile=package.json)

This is a fork of [MailOnline/mol-video-ad-sdk](https://github.com/MailOnline/mol-video-ad-sdk), made to move its development forward. The main repository has been inactive since February 2019.

To run video ads in the browser there are many alternatives. The most famous one is probably Google's [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/) for HTML5. There are two main cons with that SDK. It only works through DoubleClick and it is a black box very hard to debug and to maintain. This SDK tries to offer an alternative to play video ads that can work with any player in the world and any ad server that supports the VAST specification. And since it is open source you can read the code and debug if you need to.

## Install

```
yarn install video-ad-sdk
```

## Demo

Demo [here](https://rambler-digital-solutions.github.io/video-ad-sdk/demo/)!

## Documentation

Currently we only have the API which you can check [here](https://rambler-digital-solutions.github.io/video-ad-sdk/docs/).

## Compiling and Testing

We use [nvm](https://github.com/nvm-sh/nvm) to decide which of node to use.

So after you clone the repo you just need to run

```
nvm use
```

to install the supported node version, then run [`yarn`](https://yarnpkg.com/lang/en/docs/cli/#toc-default-command)'s default command

```
yarn
```

to install and build the packages and finally you can run

```
yarn test
```

to run the tests.

## Discussion

Please open an issue if you have any questions or concerns.

## License

This project is licensed under the MIT license. For more information see [LICENSE](./LICENSE).
