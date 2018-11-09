# react-native-pixel-perfect

helps you create pixel perfect apps by design, no matter the screen

## About

This module was created for developers who create react-native apps from design and wants to keep their app pixel perfect across all devices, quickly and easily.

All you require to use this module is a design for an app, using one type of size units, for example pixels.

Then you need to measure the screen size in the design and use the create function to genrate a function to compute the correct size for the current device, see more info below.

This method is in use in production in more than a few apps both for android and for ios, works perfectly both for layout and font sizes, as long as the font sizes in the design uses the same type of size unit.

**NOW ALL YOU NEED TO DO IS TO PLUG THE MESAUREMENTS YOU TAKE FROM YOUR DESIGN** inside the perfectSize function and your app will look great on **ALL DEVICES**

**The module comes with predefined resolutions for Apple devices**, see more info below.

## Installation

```bash
yarn add react-native-pixel-perfect
```

or with npm

```bash
npm install react-native-pixel-perfect --save
```

[link to npm page](https://www.npmjs.com/package/react-native-pixel-perfect)

## Usage

### import

```javascript
import { create } from 'react-native-pixel-perfect'
```

or

```javascript
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
```

in case you want to use one of the presets screen resolutions, see table down below

### Basic Usage - custom screen size

**Important**: you can enter what kind of size you want and always use the same unit type. (for example: px,dp,dpi,etc.)

```javascript
const designResolution = {
    width: 1125,
    height: 2436
} //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution)

perfectSize(50)// returns the actual size needed to make 50 fit the screen perfectly according to original design
```

### Basic Usage - predefined screen size (pixels)

```javascript
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.px)

perfectSize(50)// returns the actual size needed to make 50 fit the screen perfectly according to original design
```

### Basic Usage - predefined screen size (points)

```javascript
import { create, PREDEF_RES } from 'react-native-pixel-perfect'

const perfectSize = create(PREDEF_RES.iphoneX.dp)

perfectSize(50)// returns the actual size needed to make 50 fit the screen perfectly according to original design
```

## Availble Predefined Resolutions

Device                              | Key         | pixels      | points
------------------------------------|-------------|-------------|------------
**iPhone X**                        |`iphoneX`    | 1125 x 2436 | 375 x 812  |
**iPhone 8 Plus**                   |`iphone8P`   | 1080 x 1920 | 414 x 736  |
**iPhone 8**                        |`iphone8`    | 750 x 1334  | 375 x 667  |
**iPhone 7 Plus**                   |`iphone7P`   | 1080 x 1920 | 414 x 736  |
**iPhone 6s Plus**                  |`iphone6sP`  | 1080 x 1920 | 375 x 667  |
**iPhone 6 Plus**                   |`iphone6P`   | 1080 x 1920 | 375 x 667  |
**iPhone 7**                        |`iphone7`    | 750 x 1334  | 375 x 667  |
**iPhone 6s**                       |`iphone6s`   | 750 x 1334  | 375 x 667  |
**iPhone 6**                        |`iphone6`    | 750 x 1334  | 375 x 667  |
**iPhone SE**                       |`iphoneSE`   | 640 x 1136  | 320 x 568  |

### How to access predefined resolution

All you need to do is look at the table above and then use the imported BASE_RES object like so:

for pixels:

```javascript
PREDEF_RES.key.px
```

or

```javascript
PREDEF_RES[key].px
```

for points:

```javascript
PREDEF_RES.key.dp
```

or

```javascript
PREDEF_RES[key].dp
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

This project is licensed under the MIT License