/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var bowser = __webpack_require__(1);
var ALL_ON = true;
var RESPONSIVE_WIDTH =  true ? 0 : 998;
var RESPONSIVE_HEIGHT =  true ? 0 : 998;
var SPEED_CONTROL = true || ALL_ON;
var LEFT_RIGHT_CONTROL = true || ALL_ON;
var OTHER_VEHICLES = true || ALL_ON;
var FAIR_VEHICLES = false && OTHER_VEHICLES || ALL_ON;
var MULTIPLE_VEHICLES = false && OTHER_VEHICLES || ALL_ON;
var SCENERY = true || ALL_ON;
var RANDOM_SCENERY_PLACEMENT = false && SCENERY || ALL_ON;
var CENTER_LINES = true || ALL_ON;
var LAP_MARKER = true || ALL_ON;
var CLEAN_ROADS = false || ALL_ON;
var SHADED_ROADS = true || ALL_ON;
var USE_EMOJIS = true || ALL_ON;
var SMOOTH_ROADS = false && USE_EMOJIS || ALL_ON;
var X_ROTATION = true || ALL_ON;
var Z_ROTATION = true || ALL_ON;
var STORE_X_ROTATION = false && X_ROTATION || ALL_ON;
var CAN_GO_LEFT_AT_START = false || ALL_ON;
var REQUEST_ANIMATION_FRAME = true || ALL_ON;
var SCALE_Z_PROGRESS = false || ALL_ON;
var CHECKERED_FLAG = false || ALL_ON;
var SMOOTH_COLOR_TERRAIN = true || ALL_ON;
var SMOOTH_COLOR_SCENERY = true || ALL_ON;
var CORRECT_LIGHTNESS = true || ALL_ON;
var MAX_DIFF = false || ALL_ON;
var ACCURATE_ANGLES = false || ALL_ON;
var FAST_SLOW = false || ALL_ON;
var WHITE_FILL = false || ALL_ON;
var EXPANDED_TRANSFORM = true;
var HALF_IS_HALF = false || ALL_ON;
var EMOJI_DETECT = false || ALL_ON;
var MOBILE_CONTROLS = false || ALL_ON;
var speed, then, diff, xRotTarget, yRotTarget, zRotTarget, zRotCurrent, xRotCurrent, yRotCurrent, zCurrent, xCurrent, yCurrent, keys, trackLength, lookAhead, track, scenery, vehicles, vehicleX, vehicleZ, roadWidth, i, j, yTargetTrackRotation, zTrackRotation, f, minLightness, x, xScale, yScale, scale, yTrackRotation, randomValue;
keys = {};
speed = 0;
then = 0;
xRotTarget = 0;
yRotTarget = 0;
zRotTarget = 0;
zRotCurrent = 0;
xRotCurrent = 0;
yRotCurrent = 0;
yTrackRotation = 0;
zTrackRotation = 0;
if (!RANDOM_SCENERY_PLACEMENT || !SCENERY) {
    zCurrent = 0;
}
if (CAN_GO_LEFT_AT_START) {
    yTargetTrackRotation = .5;
}
else {
    yTargetTrackRotation = 0;
}
roadWidth = 4;
var vehicleCount = 4;
var vehicleCharacter = EMOJI_DETECT &&
    bowser.windows && bowser.osversion <= 7
    ? '\ud83d\ude97'
    : '🚘';
trackLength = 998;
lookAhead = 98;
track = [];
vehicles = [];
var sceneryCharacter = '🌴';
var sceneryOffset;
var xRotationOffset;
var yRotationOffset;
var zRotationOffset;
if (X_ROTATION && Z_ROTATION && STORE_X_ROTATION) {
    sceneryOffset = 3;
    xRotationOffset = 0;
    yRotationOffset = 1;
    zRotationOffset = 2;
}
else if (Z_ROTATION) {
    sceneryOffset = 2;
    yRotationOffset = 0;
    zRotationOffset = 1;
}
else if (X_ROTATION) {
    sceneryOffset = 2;
    xRotationOffset = 0;
    yRotationOffset = 1;
}
else {
    yRotationOffset = 0;
    sceneryOffset = 1;
}
c.globalCompositeOperation = 'destination-over';
var canvasWidth = RESPONSIVE_WIDTH && RESPONSIVE_HEIGHT ? RESPONSIVE_WIDTH : a.width;
var canvasHeight = RESPONSIVE_WIDTH && RESPONSIVE_HEIGHT ? RESPONSIVE_HEIGHT : a.height;
var kindOfHalf = SMOOTH_COLOR_TERRAIN && !HALF_IS_HALF ? .36 : .5;
if (OTHER_VEHICLES) {
    if (MULTIPLE_VEHICLES) {
        for (j = 0; j < vehicleCount; j++) {
            vehicles.push((j % 2) * 2 + .5, j * 9);
        }
    }
    else {
        vehicleX = kindOfHalf;
        vehicleZ = 0;
    }
}
j = 0;
while (j < trackLength) {
    var minLightness_1 = !j && LAP_MARKER
        ? 1
        : (SHADED_ROADS)
            ? (((j / 6) | 0) % 2) * .1
            : 0;
    randomValue = Math.random();
    var xTrackRotation = (Math.sin(j / lookAhead) - 1) / 98 + yTrackRotation;
    j++;
    if (!(j % 36) && (randomValue * 98) & 1) {
        yTrackRotation = (randomValue - yTargetTrackRotation) * 2 / lookAhead;
        yTargetTrackRotation = randomValue;
    }
    if (Z_ROTATION) {
        zTrackRotation += (yTrackRotation - zTrackRotation) / 9;
    }
    if (X_ROTATION && Z_ROTATION && STORE_X_ROTATION) {
        if (CLEAN_ROADS) {
            scenery = [
                xTrackRotation,
                yTrackRotation,
                zTrackRotation
            ];
        }
        else {
            scenery = [
                xTrackRotation,
                yTrackRotation,
                zTrackRotation,
                0,
                minLightness_1,
                0,
                0,
                0,
                roadWidth,
                0,
                kindOfHalf,
                SMOOTH_COLOR_TERRAIN
                    ? j * .36
                    : j,
                36,
                -98,
                998,
            ];
        }
    }
    else if (Z_ROTATION) {
        if (CLEAN_ROADS) {
            scenery = [
                yTrackRotation,
                zTrackRotation,
            ];
        }
        else {
            scenery = [
                yTrackRotation,
                zTrackRotation,
                0,
                minLightness_1,
                0,
                0,
                0,
                roadWidth,
                0,
                kindOfHalf,
                SMOOTH_COLOR_TERRAIN
                    ? j * .36
                    : j,
                36,
                -98,
                998,
            ];
        }
    }
    else if (X_ROTATION) {
        scenery = [
            xTrackRotation,
            yTrackRotation
        ];
    }
    else if (!CLEAN_ROADS) {
        scenery = [
            yTrackRotation,
            0,
            minLightness_1,
            0,
            0,
            0,
            roadWidth,
            0,
            kindOfHalf,
            SMOOTH_COLOR_TERRAIN
                ? j * .36
                : j,
            36,
            -98,
            998,
        ];
    }
    else {
        scenery = [
            yTrackRotation
        ];
    }
    if (CLEAN_ROADS) {
        scenery.push(0, minLightness_1, 0, 0, 0, roadWidth, 0, kindOfHalf, SMOOTH_COLOR_TERRAIN
            ? j * .36
            : j, 36, -998, 998, 0, kindOfHalf, SMOOTH_COLOR_TERRAIN
            ? j * .36
            : j, 36, roadWidth, 998);
    }
    if (j % 3 && CENTER_LINES) {
        scenery.splice(sceneryOffset, 0, 0, 1, 0, 0, roadWidth / 2, .1);
    }
    if (SCENERY && RANDOM_SCENERY_PLACEMENT) {
        zCurrent = randomValue;
    }
    if (SCENERY && (zCurrent > .8 && RANDOM_SCENERY_PLACEMENT || !RANDOM_SCENERY_PLACEMENT && !(j % 9) || !j && CHECKERED_FLAG)) {
        if (RANDOM_SCENERY_PLACEMENT) {
            yScale = zCurrent;
            zCurrent *= 9;
            xScale = (zCurrent & 1) * 2 - 1;
            x = zCurrent & 1
                ? roadWidth + zCurrent
                : -zCurrent;
        }
        else {
            x = j % 2 ? roadWidth : -1;
            xScale = j % 2 ? kindOfHalf : -kindOfHalf;
            yScale = kindOfHalf;
        }
        if (USE_EMOJIS) {
            if (SCALE_Z_PROGRESS) {
                scenery.push((j || !CHECKERED_FLAG) ? sceneryCharacter : '🏁', (j || !CHECKERED_FLAG) ? kindOfHalf : 0, (SMOOTH_COLOR_SCENERY
                    ? j * .36
                    : j) + 98, (j || !CHECKERED_FLAG) ? 98 : 0, (j || !CHECKERED_FLAG) ? xScale : .1, (j || !CHECKERED_FLAG) ? yScale : .1, 0, (j || !CHECKERED_FLAG) ? x : roadWidth);
            }
            else {
                scenery.push((j || !CHECKERED_FLAG) ? sceneryCharacter : '🏁', (j || !CHECKERED_FLAG) ? kindOfHalf : 0, (SMOOTH_COLOR_SCENERY
                    ? j * .36
                    : j) + 98, (j || !CHECKERED_FLAG) ? 98 : 0, xScale, yScale, x);
            }
        }
        else {
            scenery.push(2, kindOfHalf, j + 98, 98, x, 2);
        }
    }
    track.push(scenery);
}
if (LEFT_RIGHT_CONTROL || SPEED_CONTROL) {
    onkeydown = function (e) {
        keys[e.keyCode] = 1;
    };
    onkeyup = function (e) {
        keys[e.keyCode] = 0;
    };
    if (MOBILE_CONTROLS) {
        window.ontouchstart = window.ontouchend = function (e) {
            e.preventDefault();
            switch (e.touches.length) {
                case 0:
                    keys[38] = 0;
                    keys[40] = 0;
                    break;
                case 1:
                    keys[38] = 1;
                    keys[40] = 0;
                    break;
                default:
                    keys[38] = 0;
                    keys[40] = 1;
            }
            return false;
        };
        var zero_1 = null;
        addEventListener('deviceorientation', function (e) {
            var alpha;
            var screenOrientation = screen.msOrientation || (screen['orientation'] || screen['mozOrientation'] || {}).type;
            var windowOrientation = window.orientation;
            if (screenOrientation == 'landscape-primary' || windowOrientation == -90) {
                alpha = e.beta;
            }
            else if (screenOrientation == 'landscape-secondary' || windowOrientation == 90) {
                alpha = -e.beta;
            }
            else if (screenOrientation == 'portrait-primary' || windowOrientation == 0) {
                alpha = e.alpha;
            }
            else if (screenOrientation == 'portrait-secondary' || windowOrientation == 180) {
                alpha = -e.alpha;
            }
            else {
                if (canvasWidth > canvasHeight) {
                    alpha = e.beta;
                }
                else {
                    alpha = e.alpha;
                }
            }
            alpha *= Math.cos(e.gamma / 360 * Math.PI);
            if (zero_1 == null) {
                zero_1 = alpha;
            }
            else {
                while (alpha > zero_1) {
                    alpha -= 360;
                }
                while (alpha < zero_1) {
                    alpha += 360;
                }
                if (alpha < zero_1 + 180) {
                    keys[37] = Math.min((alpha - zero_1) / 15, 2);
                    keys[39] = 0;
                }
                else {
                    keys[37] = 0;
                    keys[39] = Math.min((360 - (alpha - zero_1)) / 15, 2);
                }
            }
        });
    }
}
xCurrent = 2;
yCurrent = kindOfHalf;
if (!STORE_X_ROTATION) {
    randomValue /= 98;
}
f = function (now) {
    if (REQUEST_ANIMATION_FRAME) {
        requestAnimationFrame(f);
    }
    else {
        var t = 40;
        setTimeout(f, t);
        now = then + t;
    }
    if (now && then) {
        diff = now - then;
        if (MAX_DIFF && diff > 100) {
            diff = 100;
        }
    }
    else {
        diff = 0;
    }
    var zPreviousi = zCurrent | 0;
    if (LEFT_RIGHT_CONTROL) {
        yRotCurrent += diff * ((keys[37] || 0) - (keys[39] || 0)) / 2e3;
    }
    var dYRot = yRotCurrent - yRotTarget;
    var slowingFactor;
    if (xCurrent > 0 && xCurrent < roadWidth && (!keys[40] || !SPEED_CONTROL) || !LEFT_RIGHT_CONTROL) {
        slowingFactor = 5e3;
    }
    else {
        if (FAST_SLOW) {
            slowingFactor = 798;
        }
        else {
            slowingFactor = 998;
        }
    }
    if (SPEED_CONTROL) {
        speed += diff * ((keys[38] || 0) / 8e4 - speed / slowingFactor);
    }
    else {
        speed += diff * (1e-5 - speed / slowingFactor);
    }
    zCurrent += Math.cos(dYRot) * diff * speed;
    if (LEFT_RIGHT_CONTROL) {
        xCurrent -= Math.sin(dYRot) * diff * speed;
    }
    if ((zCurrent | 0) != zPreviousi) {
        var frame = track[zPreviousi % trackLength];
        if (X_ROTATION) {
            xRotCurrent = xRotTarget;
            if (STORE_X_ROTATION) {
                xRotTarget -= frame[xRotationOffset];
            }
            else {
                xRotTarget += randomValue;
            }
        }
        if (!LEFT_RIGHT_CONTROL) {
            yRotCurrent = yRotTarget;
        }
        yRotTarget -= frame[yRotationOffset];
        if (Z_ROTATION) {
            zRotCurrent = zRotTarget;
            zRotTarget -= frame[zRotationOffset];
        }
    }
    if (OTHER_VEHICLES) {
        if (MULTIPLE_VEHICLES) {
            j = 0;
            while (j < vehicleCount * 2) {
                var vehicleX_1 = vehicles[j++];
                var vehicleZ_1 = vehicles[j];
                var oldFrame = track[((vehicleZ_1 | 0) + 1) % trackLength];
                if (now) {
                    oldFrame.splice(sceneryOffset, USE_EMOJIS
                        ? SCALE_Z_PROGRESS
                            ? 8
                            : 7
                        : 12);
                }
                vehicleZ_1 += diff / (83 - j * 9 + vehicleZ_1 - zCurrent);
                var newFrameIndex = (vehicleZ_1 | 0) + 1;
                var newFrame = track[newFrameIndex % trackLength];
                if (USE_EMOJIS) {
                    if (SCALE_Z_PROGRESS) {
                        newFrame.splice(sceneryOffset, 0, vehicleCharacter, kindOfHalf, 36 * j, 98, .1, .1, newFrameIndex - vehicleZ_1, vehicleX_1);
                    }
                    else {
                        newFrame.splice(sceneryOffset, 0, vehicleCharacter, kindOfHalf, 36 * j, 98, .1, .1, vehicleX_1);
                    }
                }
                else {
                    newFrame.splice(sceneryOffset, 0, 1, .4, 36 * j, 98, vehicleX_1, 2, 1.3, .6, 36 * j, 98, vehicleX_1 + .1, 1.6);
                }
                vehicles[j++] = vehicleZ_1;
            }
        }
        else {
            var oldFrame = track[((vehicleZ | 0) + 1) % trackLength];
            if (now) {
                oldFrame.splice(sceneryOffset, USE_EMOJIS
                    ? SCALE_Z_PROGRESS
                        ? 8
                        : 7
                    : 12);
            }
            if (FAIR_VEHICLES) {
                vehicleZ += diff / (23 + vehicleZ - zCurrent) * Math.cos(oldFrame[yRotationOffset]);
            }
            else {
                vehicleZ += diff / (23 + vehicleZ - zCurrent);
            }
            var newFrameIndex = (vehicleZ | 0) + 1;
            var newFrame = track[newFrameIndex % trackLength];
            if (USE_EMOJIS) {
                if (SCALE_Z_PROGRESS) {
                    newFrame.splice(sceneryOffset, 0, vehicleCharacter, kindOfHalf, 0, 98, .1, .1, newFrameIndex - vehicleZ, vehicleX);
                }
                else {
                    newFrame.splice(sceneryOffset, 0, vehicleCharacter, kindOfHalf, 0, 98, .1, .1, vehicleX);
                }
            }
            else {
                newFrame.splice(sceneryOffset, 0, .6, .4, 0, 98, vehicleX, 2, 1, .6, 0, 98, vehicleX + .1, 1.6);
            }
        }
    }
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    i = 0;
    var previousScale = 0;
    var fr = zCurrent - (zCurrent | 0);
    var xRotation = STORE_X_ROTATION ? (xRotTarget - xRotCurrent) * fr : fr * randomValue;
    var yRotation;
    if (LEFT_RIGHT_CONTROL) {
        yRotation = yRotCurrent - yRotTarget;
    }
    else {
        yRotation = (yRotTarget - yRotCurrent) * fr;
    }
    ;
    var zRotation = (zRotTarget - zRotCurrent) * fr;
    var previousZRotation = zRotation;
    var offsetX = -xCurrent - fr * Math.sin(yRotation);
    var offsetY = X_ROTATION && STORE_X_ROTATION
        ? yCurrent - fr * Math.sin(xRotation)
        : yCurrent;
    var previousOffsetX = offsetX;
    var previousOffsetY = offsetY;
    while (i < lookAhead) {
        var f_1 = zCurrent + i;
        var fi = f_1 | 0;
        i++;
        scale = canvasWidth / (i - fr) * Math.cos(yRotation);
        if (X_ROTATION && Z_ROTATION && ACCURATE_ANGLES) {
            offsetX += Math.tan(yRotation) - Math.sin(zRotation) * Math.sin(xRotation);
        }
        else if (X_ROTATION && ACCURATE_ANGLES) {
            offsetX += Math.tan(yRotation) - Math.sin(xRotation);
        }
        else {
            offsetX += Math.tan(yRotation);
        }
        if (X_ROTATION) {
            if (Z_ROTATION && ACCURATE_ANGLES) {
                offsetY += Math.cos(zRotation) * Math.sin(xRotation);
            }
            else {
                offsetY += Math.sin(xRotation);
            }
        }
        scenery = track[fi % trackLength];
        if (i > 1) {
            j = sceneryOffset;
            while (j < scenery.length) {
                var type = scenery[j++];
                minLightness = scenery[j++];
                var lightness = CORRECT_LIGHTNESS
                    ? (i * (1 - minLightness) + minLightness * lookAhead) + 2
                    : (i * (1 - minLightness) + minLightness * lookAhead);
                c.fillStyle = "hsl(" + scenery[j++] + "," + scenery[j++] + "%," + lightness + "%)";
                var xScaling = (type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES))
                    ? scenery[j++]
                    : 1;
                var yScaling = (type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES))
                    ? scenery[j++]
                    : 1;
                if (SCALE_Z_PROGRESS) {
                    var scaledScale = void 0;
                    var scaledOffsetX = void 0;
                    var scaledOffsetY = void 0;
                    var scaledSin = void 0;
                    var scaledCos = void 0;
                    if (type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES)) {
                        var zProgress = scenery[j++];
                        scaledScale = zProgress * (previousScale - scale) + scale;
                        scaledOffsetX = zProgress * (previousOffsetX - offsetX) + offsetX;
                        scaledOffsetY = zProgress * (previousOffsetY - offsetY) + offsetY;
                        scaledSin = zProgress * (Math.sin(previousZRotation) - Math.sin(zRotation)) + Math.sin(zRotation);
                        scaledCos = zProgress * (Math.cos(previousZRotation) - Math.cos(zRotation)) + Math.cos(zRotation);
                    }
                    else {
                        scaledScale = scale;
                        scaledOffsetX = offsetX;
                        scaledOffsetY = offsetY;
                        scaledSin = Math.sin(zRotation);
                        scaledCos = Math.cos(zRotation);
                    }
                    if (EXPANDED_TRANSFORM) {
                        c.setTransform(scaledScale, 0, 0, scaledScale, canvasWidth / 2, canvasHeight / 2);
                        if (Z_ROTATION) {
                            c.transform(scaledCos, scaledSin, -scaledSin, scaledCos, 0, 0);
                        }
                        c.transform(xScaling, 0, 0, yScaling, scaledOffsetX, scaledOffsetY);
                    }
                    else {
                        var a11 = scaledScale;
                        var a13 = canvasWidth / 2;
                        var a22 = scaledScale;
                        var a23 = canvasHeight / 2;
                        var d11 = xScaling;
                        var d13 = scaledOffsetX;
                        var d22 = yScaling;
                        var d23 = scaledOffsetY;
                        var e11 = a11 * d11;
                        var e12 = 0;
                        var e13 = a11 * d13 + a13;
                        var e21 = 0;
                        var e22 = a22 * d22;
                        var e23 = a22 * d23 + a23;
                        c.setTransform(e11, e21, e12, e22, e13, e23);
                    }
                }
                else {
                    c.setTransform(scale, 0, 0, scale, canvasWidth / 2, canvasHeight / 2);
                    if (Z_ROTATION) {
                        c.transform(Math.cos(zRotation), Math.sin(zRotation), -Math.sin(zRotation), Math.cos(zRotation), 0, 0);
                    }
                    c.transform(xScaling, 0, 0, yScaling, offsetX, offsetY);
                }
                if (type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES)) {
                    c.fillText(type, scenery[j++] / xScaling, 0);
                }
                else {
                    var x_1 = scenery[j++];
                    var width = scenery[j++];
                    if (SMOOTH_ROADS) {
                        c.beginPath();
                        c.lineTo(x_1 + width, 0);
                        c.lineTo(x_1, 0);
                        c.setTransform(previousScale, 0, 0, previousScale, canvasWidth / 2, canvasHeight / 2);
                        if (Z_ROTATION) {
                            c.transform(Math.cos(previousZRotation), Math.sin(previousZRotation), -Math.sin(previousZRotation), Math.cos(previousZRotation), 0, 0);
                        }
                        c.transform(Math.cos(previousZRotation), 0, 0, 1, previousOffsetX, previousOffsetY);
                        c.lineTo(x_1, 0);
                        c.lineTo(x_1, 1);
                        c.lineTo(x_1 + width, 1);
                        c.lineTo(x_1 + width, 0);
                        c.fill();
                    }
                    else {
                        if (USE_EMOJIS) {
                            c.fillRect(x_1, j / 998, width, 9);
                        }
                        else {
                            c.fillRect(x_1, -type + j / 998, width, 9);
                        }
                    }
                }
            }
        }
        if (X_ROTATION) {
            if (STORE_X_ROTATION) {
                xRotation += scenery[xRotationOffset];
            }
            else {
                xRotation -= randomValue;
            }
        }
        yRotation += scenery[yRotationOffset];
        if (Z_ROTATION) {
            zRotation += scenery[zRotationOffset];
            previousZRotation = zRotation;
        }
        previousScale = scale;
        previousOffsetX = offsetX;
        previousOffsetY = offsetY;
    }
    c.setTransform(1, 0, 0, 1, 0, 0);
    if (WHITE_FILL) {
        c.fillStyle = '#fff';
        c.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    then = now;
};
f();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (true) __webpack_require__(2)(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , osname: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , osname: 'Chrome OS'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , osname: 'Sailfish OS'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
        result.osname = 'Firefox OS'
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , osname: 'BlackBerry OS'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , osname: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , osname: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , osname: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t
      result.osname = 'Android'
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t
      result.ios = t
      result.osname = 'iOS'
    } else if (mac) {
      result.mac = t
      result.osname = 'macOS'
    } else if (xbox) {
      result.xbox = t
      result.osname = 'Xbox'
    } else if (windows) {
      result.windows = t
      result.osname = 'Windows'
    } else if (linux) {
      result.linux = t
      result.osname = 'Linux'
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  /*
   * Set our detect public method to the main bowser object
   * This is needed to implement bowser in server side
   */
  bowser.detect = detect;
  return bowser
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ })
/******/ ]);