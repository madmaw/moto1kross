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
/***/ (function(module, exports) {

var ALL_ON = true;
var RESPONSIVE = true;
var RESPONSIVE_WIDTH = RESPONSIVE || ALL_ON ? 0 : 998;
var RESPONSIVE_HEIGHT = RESPONSIVE || ALL_ON ? 0 : 998;
var SPEED_CONTROL = true || ALL_ON;
var LEFT_RIGHT_CONTROL = true || ALL_ON;
var OTHER_VEHICLES = true || ALL_ON;
var FAIR_VEHICLES = false && OTHER_VEHICLES || ALL_ON;
var MULTIPLE_VEHICLES = false && OTHER_VEHICLES || ALL_ON;
var FLICKERING_TYRES = true || ALL_ON;
var SCENERY = true || ALL_ON;
var RANDOM_SCENERY_PLACEMENT = false && SCENERY;
var CENTER_LINES = true || ALL_ON;
var LAP_MARKER = true || ALL_ON;
var CLEAN_ROADS = false || ALL_ON;
var SHADED_ROADS = true || ALL_ON;
var USE_EMOJIS = false;
var SMOOTH_ROADS = (false || ALL_ON) && USE_EMOJIS;
var X_ROTATION = true || ALL_ON;
var Z_ROTATION = true || ALL_ON;
var STORE_X_ROTATION = false && X_ROTATION || ALL_ON;
var CAN_GO_LEFT_AT_START = false || ALL_ON;
var REQUEST_ANIMATION_FRAME = true || ALL_ON;
var SCALE_Z_PROGRESS = false || ALL_ON;
var CHECKERED_FLAG = false || ALL_ON;
var SMOOTH_COLOR_TERRAIN = false || ALL_ON;
var SMOOTH_COLOR_SCENERY = false || ALL_ON;
var CORRECT_LIGHTNESS = false || ALL_ON;
var MAX_DIFF = false || ALL_ON;
var ACCURATE_ANGLES = false || ALL_ON;
var FAST_SLOW = true || ALL_ON;
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
var vehicleCharacter = USE_EMOJIS &&
    EMOJI_DETECT &&
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
var kindOfHalf = SMOOTH_COLOR_TERRAIN && !HALF_IS_HALF ? .36 : .3;
if (OTHER_VEHICLES) {
    if (MULTIPLE_VEHICLES) {
        for (j = 0; j < vehicleCount; j++) {
            vehicles.push((j % 2) * 2, j * 9);
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
    if (j && !(j % 36) && (randomValue * 98) & 1) {
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
                !j && LAP_MARKER
                    ? 1
                    : (SHADED_ROADS)
                        ? (((j / 6) | 0) % 2) * .1
                        : 0,
                0,
                0,
                0,
                roadWidth,
                0,
                kindOfHalf,
                SMOOTH_COLOR_TERRAIN
                    ? j * .36
                    : j,
                50,
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
    track[j++] = scenery;
    if (j % 3 && CENTER_LINES) {
        scenery.splice(sceneryOffset, 0, 0, 1, 0, 0, roadWidth / 2, .1);
    }
    if (SCENERY && RANDOM_SCENERY_PLACEMENT) {
        zCurrent = randomValue;
    }
    if (SCENERY && (zCurrent > .8 && RANDOM_SCENERY_PLACEMENT || !RANDOM_SCENERY_PLACEMENT && !(j % 9) || !j && CHECKERED_FLAG)) {
        if (USE_EMOJIS) {
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
            x = j % 2 ? roadWidth + 4 : -6;
            scenery.push(4, kindOfHalf, (SMOOTH_COLOR_SCENERY
                ? j * .36
                : j) + 98, 98, x, 2, 3, 1, kindOfHalf, 0, 9, x + 1, .1, 1, 9, kindOfHalf, -j, 98, randomValue * roadWidth, 1, 1);
        }
    }
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
yCurrent = .5;
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
                        : 35);
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
                    newFrame.splice(sceneryOffset, 0, .8, 1, 0, 0, vehicleX_1 + .4, 1, .3, .9, .5, 36 * j, 98, vehicleX_1 + .3, 1.2, .4, .6, kindOfHalf, 36 * j, 98, vehicleX_1 + .2, 1.4, .5, .1, FLICKERING_TYRES ? vehicleZ_1 % kindOfHalf : .1, 0, 0, vehicleX_1 + .3, .3, .1, .1, FLICKERING_TYRES ? vehicleZ_1 % kindOfHalf : .1, 0, 0, vehicleX_1 + 1.2, .3, .1);
                }
                vehicles[j++] = vehicleZ_1;
            }
        }
        else {
            scenery = track[((vehicleZ | 0) + 1) % trackLength];
            if (now) {
                scenery.splice(sceneryOffset, USE_EMOJIS
                    ? SCALE_Z_PROGRESS
                        ? 8
                        : 7
                    : 35);
            }
            if (FAIR_VEHICLES) {
                vehicleZ += diff / (23 + vehicleZ - zCurrent) * (1 - Math.sin(scenery[yRotationOffset] * 2));
            }
            else {
                vehicleZ += diff / (23 + vehicleZ - zCurrent);
            }
            var newFrameIndex = (vehicleZ | 0) + 1;
            scenery = track[newFrameIndex % trackLength];
            if (USE_EMOJIS) {
                if (SCALE_Z_PROGRESS) {
                    scenery.splice(sceneryOffset, 0, vehicleCharacter, kindOfHalf, 0, 98, .1, .1, newFrameIndex - vehicleZ, vehicleX);
                }
                else {
                    scenery.splice(sceneryOffset, 0, vehicleCharacter, kindOfHalf, 0, 98, .1, .1, vehicleX);
                }
            }
            else {
                scenery.splice(sceneryOffset, 0, .8, 1, 0, 0, .4, 1, .3, .9, .5, 0, 98, .3, 1.2, .4, .6, kindOfHalf, 0, 98, .2, 1.4, .5, .1, FLICKERING_TYRES ? vehicleZ % kindOfHalf : .1, 0, 0, .3, .3, .1, .1, FLICKERING_TYRES ? vehicleZ % kindOfHalf : .1, 0, 0, 1.2, .3, .1);
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
        scenery = track[((zCurrent + i) | 0) % trackLength];
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
                        c.transform(scaledScale, 0, 0, scaledScale, canvasWidth / 2, canvasHeight / 2);
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
                    c.transform(scale, 0, 0, scale, canvasWidth / 2, canvasHeight / 2);
                    if (Z_ROTATION) {
                        c.transform(Math.cos(zRotation), Math.sin(zRotation), -Math.sin(zRotation), Math.cos(zRotation), offsetX * Math.cos(zRotation) - offsetY * Math.sin(zRotation), offsetY * Math.cos(zRotation) + offsetX * Math.sin(zRotation));
                    }
                    else {
                        c.transform(xScaling, 0, 0, yScaling, offsetX, offsetY);
                    }
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
                            c.fillRect(x_1, -type, width, type ? scenery[j++] : 9);
                        }
                    }
                }
                c.setTransform(1, 0, 0, 1, 0, 0);
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
    if (WHITE_FILL) {
        c.fillStyle = '#fff';
        c.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    then = now;
};
f();


/***/ })
/******/ ]);