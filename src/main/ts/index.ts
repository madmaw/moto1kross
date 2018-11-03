// comment this out for actual js1k build
//import * as bowser from 'bowser';

// turn on everything
const ALL_ON = false;

const RESPONSIVE = false;
// use a fixed with for the canvas
const RESPONSIVE_WIDTH = RESPONSIVE || ALL_ON?0:998;
// use a fixed height for the canvas
const RESPONSIVE_HEIGHT = RESPONSIVE || ALL_ON?0:998;

// can accelerate/decelerate
const SPEED_CONTROL = true || ALL_ON;
// can turn left/right
const LEFT_RIGHT_CONTROL = true || ALL_ON;
// are there other vehicles
const OTHER_VEHICLES = true || ALL_ON;
// do vehicles slow down on corners?
const FAIR_VEHICLES = false && OTHER_VEHICLES || ALL_ON; // 8 bytes
// are there multiple vehicles or just one
const MULTIPLE_VEHICLES = false && OTHER_VEHICLES || ALL_ON; // big
// do non-emoji vehicles tyres flicker as they drive
const FLICKERING_TYRES = false || ALL_ON;
// is there scenery
const SCENERY = true || ALL_ON;
// is the scenery placed randomly or evenly
const RANDOM_SCENERY_PLACEMENT = false && SCENERY; 
// are there center lines
const CENTER_LINES = true || ALL_ON;
// is there a lap marker 
const LAP_MARKER = false || ALL_ON;
// do we not have overlapping roads and terrain (not really neccessary anymore)
const CLEAN_ROADS = false || ALL_ON;
// do we attempt to centre the road in the scenery? (1 byte?)
const CENTERED_ROAD = true && !CLEAN_ROADS || ALL_ON;
// is the car catchable? (1 byte)
const CATCHABLE_CAR = false || ALL_ON;
// do the roads change colour slightly
const SHADED_ROADS = true || ALL_ON; 
// should we draw scenery and cars as emojis
const USE_EMOJIS = false; // big
// are the roads smooth or blocky
const SMOOTH_ROADS = (false || ALL_ON)&& USE_EMOJIS ; // big
// can be roate the terrain on the x axis
const X_ROTATION = true || ALL_ON; // big
// can be roate the terrain on the z axis
const Z_ROTATION = true || ALL_ON; // big
// is the x rotation interesting, or just constant
const STORE_X_ROTATION = true && X_ROTATION || ALL_ON;
// can we have left turns at the start of the game?
const CAN_GO_LEFT_AT_START = false || ALL_ON; // 3 bytes?
// use requestAnimationFrame or setTimeout
const REQUEST_ANIMATION_FRAME = true || ALL_ON; // -1 byte?
// should vehicles jump between frames
const SCALE_Z_PROGRESS = false || ALL_ON; // big
// display a checkered flag when lapping
const CHECKERED_FLAG = false || ALL_ON;
// should terrain color rotate perfectly back to 0 
const SMOOTH_COLOR_TERRAIN = false || ALL_ON;
// should scenery colour rotate perfectly back to 0
const SMOOTH_COLOR_SCENERY = false || ALL_ON;
// correct the ligtness to 100 in distance
const CORRECT_LIGHTNESS = false || ALL_ON; // 2 bytes
// do not allow really big FPS jumps
const MAX_DIFF = false || ALL_ON;
// correct frame positioning for x and z rotation
const ACCURATE_ANGLES = false || ALL_ON;
// slow down quickly, or at the same rate as going offroad
const FAST_SLOW = false || ALL_ON; // 1 byte?
// fill the background with a white colour for screenshots (usually transparent)
const WHITE_FILL = false || ALL_ON; 
// expand the setTransform into multiple calls (doesn't seem to help compression)
const EXPANDED_TRANSFORM = true;
// acutally use .5 when we want half
const HALF_IS_HALF = false || ALL_ON;
// attempt to detect OS and choose emoji correctly
const EMOJI_DETECT = false || ALL_ON;
// can we do handbrake turns?
const HANDBRAKE_TURNS = true || ALL_ON;


const MOBILE_CONTROLS = false || ALL_ON;

// will be removed and replaced with globals 
let speed: number, 
    then: number, 
    diff: number,
    xRotTarget: number, 
    yRotTarget: number, 
    zRotTarget: number, 
    zRotCurrent: number, 
    xRotCurrent: number, 
    yRotCurrent: number, 
    zCurrent: number, 
    xCurrent: number, 
    yCurrent: number, 
    keys: {[_:number]: number}, 
    trackLength: number, 
    lookAhead: number, 
    track: any[][], 
    scenery: any[],
    vehicles: number[], 
    vehicleX: number, 
    vehicleZ: number,
    roadWidth: number, 
    i: number, 
    j: number,
    yTargetTrackRotation: number,
    zTrackRotation: number,
    f: (now?: number) => void,
    minLightness: number, 
    x: number, 
    xScale: number, 
    yScale: number, 
    scale: number,
    yTrackRotation: number,
    randomValue: number;

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
if( !RANDOM_SCENERY_PLACEMENT || !SCENERY ) {
    zCurrent = 0;
} 

if( CAN_GO_LEFT_AT_START ) {
    yTargetTrackRotation = .5;
} else {
    yTargetTrackRotation = 0;
}


roadWidth = 4;
let vehicleCount = 4;
//vehicleCharacters = ['🚕', '🚌', '🚓', '🚗'];
let vehicleCharacter = 
    USE_EMOJIS &&
    EMOJI_DETECT && 
    bowser.windows && bowser.osversion <= 7
    ?'\ud83d\ude97'
    :'🚘'; // 🚗
trackLength = 998;
// 98 = the last two characters of the escaped car character \ud83d\ude98
lookAhead = 98;
track = [];
vehicles = [];

let sceneryCharacter = '🌴';

let sceneryOffset: number;
let xRotationOffset: number;
let yRotationOffset: number;
let zRotationOffset: number;
if( X_ROTATION && Z_ROTATION && STORE_X_ROTATION ) {
    sceneryOffset = 3;
    xRotationOffset = 0;
    yRotationOffset = 1;
    zRotationOffset = 2;
} else if( Z_ROTATION ) {
    sceneryOffset = 2;
    yRotationOffset = 0;
    zRotationOffset = 1;
} else if( X_ROTATION ) {
    sceneryOffset = 2;
    xRotationOffset = 0;
    yRotationOffset = 1;
} else {
    yRotationOffset = 0;
    sceneryOffset = 1;
}

c.globalCompositeOperation = 'destination-over'
let canvasWidth = RESPONSIVE_WIDTH && RESPONSIVE_HEIGHT?RESPONSIVE_WIDTH:a.width;
let canvasHeight = RESPONSIVE_WIDTH && RESPONSIVE_HEIGHT?RESPONSIVE_HEIGHT:a.height;

let kindOfHalf = SMOOTH_COLOR_TERRAIN && !HALF_IS_HALF?.36:.3;

if( OTHER_VEHICLES ) {
    if( MULTIPLE_VEHICLES ) {
        for ( j=0; j<vehicleCount; j++ ) {
            vehicles.push(
                //x
                (j%2) * 2, 
                // z
                j * 9
            );
        }        
    } else {
        vehicleX = kindOfHalf;
        vehicleZ = 0;
    }
}


// create the track
j=0;
while( j<trackLength ) {
    // assumes 360/trackLength = .36
    let minLightness = !j && LAP_MARKER
        ?1
        :(SHADED_ROADS)
            ?(j/6 | 0) % 2/9
            :0;
    //trackRotation = (Math.random() - .5)*Math.PI / 99;
    //rot = 0;
    randomValue = Math.random();
    let xTrackRotation = (Math.cos(j/lookAhead) - 1)/98 + yTrackRotation;
    //j++;
    if( j && !(j % 49) && (randomValue*98)&1 ) {
        //yTrackRotation = (randomValue - yTargetTrackRotation)*2/lookAhead;
        yTrackRotation = (randomValue - yTargetTrackRotation)/49;
        yTargetTrackRotation = randomValue;
    }
    if( Z_ROTATION ) {
        zTrackRotation += (yTrackRotation - zTrackRotation)/9;
    }
    if( X_ROTATION && Z_ROTATION && STORE_X_ROTATION ) {
        if( CLEAN_ROADS ) {
            scenery = [
                xTrackRotation, 
                yTrackRotation, 
                zTrackRotation
            ];
        } else {
            scenery = [
                xTrackRotation, 
                yTrackRotation, 
                zTrackRotation,
    
                0, // type (box)
                minLightness, // min lightness
                0, // hue
                0, // saturation
                0, // x
                roadWidth, // width
        
                0, // type (box)
                kindOfHalf, // min lightness
                SMOOTH_COLOR_TERRAIN
                    ?j * .36
                    :j, // hue
                36, // saturation
                CENTERED_ROAD?-499:-98, // x
                998, // width
    
            ];
    
        }
    } else if( Z_ROTATION ) {
        if( CLEAN_ROADS ) {
            scenery = [
                yTrackRotation, 
                zTrackRotation,
    
            ];    
    
        } else {
            scenery = [
                yTrackRotation, 
                zTrackRotation,
    
                0, // type (box)
                !j && LAP_MARKER
                    ?1
                    :(SHADED_ROADS)
                        ?(((j / 6) | 0) % 2)/9
                        :0, // min lightness
                0, // hue
                0, // saturation
                0, // x
                roadWidth, // width
        
                0, // type (box)
                kindOfHalf, // min lightness
                SMOOTH_COLOR_TERRAIN
                    ?j * .36
                    :j, // hue
                49, // saturation
                CENTERED_ROAD?-499:-98, // x
                998, // width
    
            ];    
    
        }
    } else if( X_ROTATION ) {
        scenery = [
            xTrackRotation, 
            yTrackRotation
        ];    
    } else if( !CLEAN_ROADS ) {
        // for minimised as possible code
        scenery = [
            yTrackRotation,

            0, // type (box)
            minLightness, // min lightness
            0, // hue
            0, // saturation
            0, // x
            roadWidth, // width
    
            0, // type (box)
            kindOfHalf, // min lightness
            SMOOTH_COLOR_TERRAIN
                ?j * .36
                :j, // hue
            36, // saturation
            CENTERED_ROAD?-499:-98, // x
            998, // width

        ]; 
    } else {
        scenery = [
            yTrackRotation
        ]; 
    }

    if( CLEAN_ROADS ) {
        scenery.push(
            0, // type (box)
            minLightness, // min lightness
            0, // hue
            0, // saturation
            0, // x
            roadWidth, // width
    
            0, // type (box)
            kindOfHalf, // min lightness
            SMOOTH_COLOR_TERRAIN
                ?j * .36
                :j, // hue
            36, // saturation
            -998, // x
            998, // width
    
            0, // type (box)
            kindOfHalf, // min lightness
            SMOOTH_COLOR_TERRAIN
                ?j * .36
                :j, // hue
            36, // saturation
            roadWidth, // x
            998, // width    
        );
    
    } 
    //track.push(scenery);
    track[j++] = scenery;

    if( j % 3 && CENTER_LINES ) {
        scenery.splice(sceneryOffset, 0, 
            0, // type
            1, // min lightness
            0, // hue
            0, // saturation
            roadWidth/2, // x 
            .1, // width
        )
    }
    // reuse zCurrent here for compression
    if( SCENERY && RANDOM_SCENERY_PLACEMENT ) {
        zCurrent = randomValue;
    }
    if( SCENERY ) {
        if( USE_EMOJIS && (zCurrent > .8 && RANDOM_SCENERY_PLACEMENT || !RANDOM_SCENERY_PLACEMENT && !(j%9) || !j && CHECKERED_FLAG) ) {
            if( RANDOM_SCENERY_PLACEMENT ) {
                yScale = zCurrent;
                zCurrent *= 9;
                xScale = (zCurrent & 1) * 2 - 1
                x = zCurrent & 1
                    ?roadWidth + zCurrent
                    :-zCurrent
            } else {
                //x = j%2 * roadWidth - (1 - j%2) * 2;
                x = j%2?roadWidth:-1;
                xScale = j%2?kindOfHalf:-kindOfHalf;
                yScale = kindOfHalf;
            }
            if( SCALE_Z_PROGRESS ) {
                scenery.push(
                    (j||!CHECKERED_FLAG)?sceneryCharacter:'🏁', 
                    (j||!CHECKERED_FLAG)?kindOfHalf:0, 
                    (SMOOTH_COLOR_SCENERY
                        ?j * .36
                        :j)+98, // hue
                    (j||!CHECKERED_FLAG)?98:0,
                    (j||!CHECKERED_FLAG)?xScale:.1,
                    // use the fraction to generate the y scale
                    // compresses this bit better if we reuse zCurrent
                    (j||!CHECKERED_FLAG)?yScale:.1,
                    0,
                    (j||!CHECKERED_FLAG)?x:roadWidth
                )        
            } else {
                scenery.push(
                    (j||!CHECKERED_FLAG)?sceneryCharacter:'🏁', 
                    (j||!CHECKERED_FLAG)?kindOfHalf:0, 
                    (SMOOTH_COLOR_SCENERY
                        ?j * .36
                        :j)+98, 
                    (j||!CHECKERED_FLAG)?98:0,
                    xScale,
                    // compresses this bit better if we reuse zCurrent
                    yScale,
                    x
                )    
    
            }
        } else if ( !(j%9) ) {
            if( RANDOM_SCENERY_PLACEMENT ) {
                x = j%2?roadWidth+2+randomValue*9:-4-randomValue*9;
            } else {
                x = j%2?roadWidth+4:-6;
            }
    
            scenery.splice(sceneryOffset, 0,
                4, // type (box) - y
                kindOfHalf, // min lightness
                (SMOOTH_COLOR_SCENERY
                    ?j * .36
                    :j)+98, // hue
                98, // saturation
                x, // x1
                2, // width     
                3, // height               

                1, // type (box) - y
                0, // min lightness
                0, // hue
                9, // saturation
                x+1, // x1
                .1, // width     
                1, // height               

                8, // type box - y
                kindOfHalf, 
                -j, 
                98, 
                randomValue*roadWidth, 
                1, 
                1
            )
        }
    }
    
}
if( LEFT_RIGHT_CONTROL || SPEED_CONTROL ) {
    onkeydown = (e: KeyboardEvent) => {
        keys[e.key] = 1;
    }
    onkeyup = (e: KeyboardEvent) => {
        keys[e.key] = 0;
    } 
   /*
    onkeydown = onkeyup = (e: KeyboardEvent) => {
        keys[e.keyCode] = 112 - e.type.charCodeAt(4);
    }
    */   

    if( MOBILE_CONTROLS ) {
        window.ontouchstart = window.ontouchend = (e: TouchEvent) => {
            e.preventDefault();
            switch(e.touches.length) {
                case 0:
                    keys['w'] = 0;
                    keys['l'] = 0;
                    break;
                case 1:
                    keys['w'] = 1;
                    keys['l'] = 0;
                    break;
                default:
                    keys['w'] = 0;
                    keys['l'] = 1;
            }
            return false;
        }

        let zero: number = null;
        addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
            let alpha: number;
            let screenOrientation = screen['msOrientation'] || (screen['orientation'] || screen['mozOrientation'] || {}).type
            let windowOrientation = window.orientation;
            if( screenOrientation == 'landscape-primary' || windowOrientation == -90) {
                alpha = e.beta;
            } else if( screenOrientation == 'landscape-secondary' || windowOrientation == 90 ) {
                alpha = -e.beta;
            } else if( screenOrientation == 'portrait-primary' || windowOrientation == 0 ) {
                alpha = e.alpha;
            } else if( screenOrientation == 'portrait-secondary' || windowOrientation == 180 ) {
                alpha = -e.alpha;
            } else {
                if( canvasWidth > canvasHeight ) {
                    alpha = e.beta;
                } else {
                    alpha = e.alpha;
                }
            }
            alpha *= Math.cos(e.gamma/360 * Math.PI);
            
            if( zero == null ) {
                zero = alpha;
            } else {
                while( alpha > zero ) {
                    alpha -= 360;
                }
                while( alpha < zero ) {
                    alpha += 360;
                }
                if( alpha < zero + 180 ) {
                    keys['w'] = Math.min((alpha - zero)/15, 2);
                    keys['d'] = 0;
                } else {
                    keys['w'] = 0;
                    keys['d'] = Math.min((360 - (alpha - zero))/15, 2);
                }
            }
        });
    }
}



xCurrent = 2; // roadWidth/2
yCurrent = .5;
if( !STORE_X_ROTATION ) {
    randomValue /= 98;
}
// could reset zCurrent, but it's not that important
//zCurrent = 0;

// render and update
f = (now: number) => {
    if( REQUEST_ANIMATION_FRAME ) {
        requestAnimationFrame(f);
    } else {
        let t = 40;
        setTimeout(f, t);
        now = then + t;
    }
    // if( now && then ) {
        diff = now - then;
        if( MAX_DIFF && diff > 99 ) {
            diff = 99;
        }
    // } else {
    //     diff = 0;
    // }
    let zPreviousi = zCurrent | 0;

    if( LEFT_RIGHT_CONTROL ) {
        if( HANDBRAKE_TURNS ) {
            yRotCurrent += diff * ((keys['a']|0) - (keys['d']|0)) * (keys['l']|2) / 4e3;
        } else {
            yRotCurrent += diff * ((keys['a']|0) - (keys['d']|0)) / 1e3;
        }
    }
    let dYRot = yRotCurrent - yRotTarget;
    let slowingFactor: number;
    if( xCurrent > 0 && xCurrent < roadWidth && (!keys['l'] || !SPEED_CONTROL) || !LEFT_RIGHT_CONTROL ) {
        slowingFactor = 5e3;
    } else {
        if( FAST_SLOW ) {
            slowingFactor = 499;
        } else {
            slowingFactor = 998;
        }
    }
    if( SPEED_CONTROL ) {
        speed += diff * ((keys['w']|0) / 5e4 - speed/slowingFactor);
    } else {
        speed += diff*(1e-5 - speed/slowingFactor);
    }

    zCurrent += Math.cos(dYRot) * diff * speed;
    if( LEFT_RIGHT_CONTROL ) {
        xCurrent -= Math.sin(dYRot) * diff * speed;
    }

    if( (zCurrent | 0) != zPreviousi  ) {
        // add on the previous angle to the target

        let frame = track[zPreviousi%trackLength];
        if( X_ROTATION ) {
            xRotCurrent = xRotTarget;
            if( STORE_X_ROTATION ) {
                xRotTarget -= frame[xRotationOffset];                
            } else {
                //xRotTarget -= frame[yRotationOffset];
                xRotTarget += randomValue;
                //xRotTarget += (zPreviousi%98)/trackLength;
            }
        }
        if( !LEFT_RIGHT_CONTROL ) {
            yRotCurrent = yRotTarget;
        }
        yRotTarget -= frame[yRotationOffset];
        if( Z_ROTATION ) {
            zRotCurrent = zRotTarget;
            zRotTarget -= frame[zRotationOffset];
        }
    }

    // update the vehicles
    if( OTHER_VEHICLES ) {
        if( MULTIPLE_VEHICLES ) {
            j = 0;
            while( j < vehicleCount*2 ) {
                let vehicleX = vehicles[j++];
                let vehicleZ = vehicles[j];
                let oldFrame = track[(vehicleZ+1 | 0)%trackLength];
                if( now ) {
                    oldFrame.splice(
                        sceneryOffset, 
                        USE_EMOJIS
                            ?SCALE_Z_PROGRESS
                                ?8
                                :7
                            :35);
                }
                vehicleZ += diff / (83 - j * 9 + vehicleZ - zCurrent);
                let newFrameIndex = vehicleZ+1 | 0;
                let newFrame = track[newFrameIndex%trackLength];
                if( USE_EMOJIS ) {
                    if( SCALE_Z_PROGRESS ) {
                        newFrame.splice(sceneryOffset, 0,
                            vehicleCharacter, 
                            kindOfHalf, 
                            50 * j, 
                            98,
                            .1,
                            .1,
                            newFrameIndex - vehicleZ,
                            vehicleX,                            
                        );        
                    } else {
                        newFrame.splice(sceneryOffset, 0,
                            vehicleCharacter, 
                            kindOfHalf, 
                            50 * j, 
                            98,
                            .1,
                            .1,
                            vehicleX,                            
                        );    
                    }
                } else {
                    newFrame.splice(sceneryOffset, 0,
                        // windshield
                        .8, // y
                        1, // lightness
                        0, // hue
                        0, // saturation
                        vehicleX + .4, //x
                        1, // width
                        .3, // height
    
                        // roof
                        .9, // y
                        .5, // lightness
                        50 * j, // hue
                        98, // saturation
                        vehicleX + .3, //x
                        1.2, // width
                        .4, // height
                        
                        
                        // body
                        .6, // y
                        kindOfHalf, // lightness
                        50 * j, // hue
                        98, // saturation
                        vehicleX + .2, //x
                        1.4, // width
                        .5, // height
    
                        // left tyre
                        .1, // y
                        FLICKERING_TYRES?vehicleZ%kindOfHalf:.1, // lightness
                        0, // hue
                        0, // saturation
                        vehicleX + .3, //x
                        .3, // width
                        .1, // height
    
                        // right tyre
                        .1, // y
                        FLICKERING_TYRES?vehicleZ%kindOfHalf:.1, // lightness
                        0, // hue
                        0, // saturation
                        vehicleX + 1.2, //x
                        .3, // width
                        .1, // height
                        
                    );


                }
                vehicles[j++] = vehicleZ;
            }    
        } else {
            scenery = track[(vehicleZ | 0)%trackLength];
            if( now ) {
                scenery.splice(
                    sceneryOffset, 
                    USE_EMOJIS
                        ?SCALE_Z_PROGRESS
                            ?8
                            :7
                        :35);
            }
            if( FAIR_VEHICLES ) {
                vehicleZ += diff / ((CATCHABLE_CAR?16:9) + vehicleZ - zCurrent) * (1 - Math.sin(scenery[yRotationOffset]*9));
                //vehicleZ += diff / 14 * (1 - Math.sin(scenery[yRotationOffset]*9));
            } else {
                vehicleZ += diff / ((CATCHABLE_CAR?17:9) + vehicleZ - zCurrent);
                //vehicleZ = Math.max(zCurrent - 1, vehicleZ + diff / 14);
                //vehicleZ += diff / 16;
            }
            // if( vehicleZ < zCurrent ) {
            //     vehicleZ = zCurrent;
            // }
            scenery = track[(vehicleZ | 0)%trackLength];
            if( USE_EMOJIS ) {
                if( SCALE_Z_PROGRESS ) {
                    scenery.splice(sceneryOffset, 0,
                        vehicleCharacter, 
                        kindOfHalf, 
                        0, 
                        98,
                        .1,
                        .1,
                        (vehicleZ | 0) - vehicleZ,
                        vehicleX,                            
                    );        
                } else {
                    scenery.splice(sceneryOffset, 0,
                        vehicleCharacter, 
                        kindOfHalf, 
                        0, 
                        98,
                        .1,
                        .1,
                        vehicleX,                            
                    );        
                }
            } else {
                scenery.splice(sceneryOffset, 0,
                    // windshield
                    .9, // y
                    1, // lightness
                    0, // hue
                    0, // saturation
                    .4, //x
                    1, // width
                    .3, // height

                    // roof
                    1, // y
                    .5, // lightness
                    0, // hue
                    98, // saturation
                    .3, //x
                    1.2, // width
                    .5, // height
                    
                    
                    // body
                    .7, // y
                    kindOfHalf, // lightness
                    0, // hue
                    98, // saturation
                    .2, //x
                    1.4, // width
                    .6, // height

                    // left tyre
                    1, // y
                    FLICKERING_TYRES?vehicleZ%kindOfHalf:.1, // lightness
                    0, // hue
                    0, // saturation
                    .3, //x
                    .3, // width
                    1, // height

                    // right tyre
                    1, // y
                    FLICKERING_TYRES?vehicleZ%kindOfHalf:.1, // lightness
                    0, // hue
                    0, // saturation
                    1.2, //x
                    .3, // width
                    1, // height
                    
                );

            }

        }
    }

    c.clearRect(0, 0, canvasWidth, canvasHeight);
    i=0;
    let previousScale = 0;
    let fr = zCurrent - (zCurrent | 0);

    let xRotation = STORE_X_ROTATION?(xRotTarget - xRotCurrent) * fr:fr*randomValue;
    //let xRotation = (xRotTarget - xRotCurrent) * fr; 
    let yRotation;
    if( LEFT_RIGHT_CONTROL ) {
        yRotation = yRotCurrent - yRotTarget;
    } else {
        yRotation = (yRotTarget - yRotCurrent) * fr;
    };
    let zRotation = (zRotTarget - zRotCurrent) * fr;
    
    let previousZRotation = zRotation;
    let offsetX = -xCurrent - fr * Math.sin(yRotation);
    let offsetY = X_ROTATION && STORE_X_ROTATION
        ?yCurrent - fr * Math.sin(xRotation)
        :yCurrent;
    let previousOffsetX = offsetX;
    let previousOffsetY = offsetY;
    while( i < lookAhead ) {
        i++;

        //sinOrYTrackRotation = Math.sin(zRotation);
        

        //let previousSin = Math.sin(previousZRotation);
        //let previousCos = Math.cos(previousZRotation);

        scale = canvasWidth / (i - fr) * Math.cos(yRotation);
        if( X_ROTATION && Z_ROTATION && ACCURATE_ANGLES ) {
            offsetX += Math.tan(yRotation) - Math.sin(zRotation) * Math.sin(xRotation);
        } else if( X_ROTATION && ACCURATE_ANGLES ) {
            offsetX += Math.tan(yRotation) - Math.sin(xRotation);
        } else {
            offsetX += Math.tan(yRotation);
        }
        if( X_ROTATION ) {
            if( Z_ROTATION && ACCURATE_ANGLES ) {
                offsetY += Math.cos(zRotation) * Math.sin(xRotation);
            } else {
                offsetY += Math.sin(xRotation);
            }
        } 

        scenery = track[(zCurrent + i | 0)%trackLength];
        // render the frame
        j = sceneryOffset;
        while( j < scenery.length ) {
            let type = scenery[j++];
            minLightness = scenery[j++];
            let lightness = CORRECT_LIGHTNESS
                ?(i * (1 - minLightness) + minLightness * lookAhead) + 2
                :(i * (1 - minLightness) + minLightness * lookAhead);
            c.fillStyle = `hsl(${scenery[j++]},${scenery[j++]}%,${lightness}%)`;

            let xScaling: number = (type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES))
                ?scenery[j++]
                :1;
            let yScaling: number = ( type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES))
                ?scenery[j++]
                :1;
            /*
            if( type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES) ) {
                xScaling = scenery[j++];
                yScaling = scenery[j++];
            } else {
                xScaling = 1;
                yScaling = 1;    
            }
            */

            if( SCALE_Z_PROGRESS) {

                let scaledScale: number;
                let scaledOffsetX: number;
                let scaledOffsetY: number;
                let scaledSin: number;
                let scaledCos: number;
                if( type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES) ) {
                    let zProgress: number = scenery[j++];
                    scaledScale = zProgress * (previousScale - scale) + scale
                    scaledOffsetX = zProgress * (previousOffsetX - offsetX) + offsetX;
                    scaledOffsetY = zProgress * (previousOffsetY - offsetY) + offsetY;
                    scaledSin = zProgress * (Math.sin(previousZRotation) - Math.sin(zRotation)) + Math.sin(zRotation);
                    scaledCos = zProgress * (Math.cos(previousZRotation) - Math.cos(zRotation)) + Math.cos(zRotation);
                } else {
                    scaledScale = scale;
                    scaledOffsetX = offsetX;
                    scaledOffsetY = offsetY;
                    scaledSin = Math.sin(zRotation);
                    scaledCos = Math.cos(zRotation);
                }

                if( EXPANDED_TRANSFORM ) {
                    c.transform(
                        scaledScale, 
                        0, 
                        0, 
                        scaledScale, 
                        canvasWidth/2, 
                        canvasHeight/2
                    );
                    if( Z_ROTATION ) {
                        c.transform(
                            scaledCos, 
                            scaledSin, 
                            -scaledSin, 
                            scaledCos, 
                            0, 
                            0
                        );    
                    }
                    c.transform(
                        xScaling, 
                        0, 
                        0, 
                        yScaling, 
                        scaledOffsetX, 
                        scaledOffsetY
                    );    
                } else {
                    // incomplete and still compresses worse than just calling the transformations directly?!
                    let a11 = scaledScale;
                    // let a12 = 0;
                    let a13 = canvasWidth/2;
                    // let a21 = 0;
                    let a22 = scaledScale;
                    let a23 = canvasHeight/2;
                    // let a31 = 0;
                    // let a32 = 0;
                    // let a33 = 1;

                    let d11 = xScaling;
                    // let d12 = 0;
                    let d13 = scaledOffsetX;
                    // let d21 = 0;
                    let d22 = yScaling;
                    let d23 = scaledOffsetY;
                    // let d31 = 0;
                    // let d32 = 0;
                    //let d33 = 1;

                    let e11 = a11*d11/*+ a12*d21 + a13*d31*/;
                    let e12 = 0/*a11*d12 + a12*d22 + a13*d32*/;
                    let e13 = a11*d13/*+ a12*d23*/+ a13/**d33*/;
                    let e21 = 0/*a21*d11 + a22*d21 + a23*d31*/;
                    let e22 = /*a21*d12 +*/a22*d22/*+ a23*d32*/;
                    let e23 = /*a21*d13 +*/a22*d23 + a23/**d33*/;
                    c.setTransform(e11, e21, e12, e22, e13, e23);
                }

            } else {
                c.setTransform(
                    scale, 
                    0, 
                    0, 
                    scale, 
                    canvasWidth/2, 
                    canvasHeight/2
                );
                if( Z_ROTATION ) {
                    c.transform(
                        Math.cos(zRotation), 
                        Math.sin(zRotation), 
                        -Math.sin(zRotation), 
                        Math.cos(zRotation), 
                        offsetX * Math.cos(zRotation) - offsetY * Math.sin(zRotation), 
                        offsetY * Math.cos(zRotation) + offsetX * Math.sin(zRotation)
                    );    
                } else {
                    c.transform(
                        xScaling, 
                        0, 
                        0, 
                        yScaling, 
                        offsetX, 
                        offsetY
                    );    
                        
                }
            }

            if( type && USE_EMOJIS && (SCENERY || OTHER_VEHICLES) ) {
                c.fillText(type, scenery[j++] / xScaling, 0);
            } else {
                
                let x = scenery[j++];
                let width = scenery[j++];
                if( SMOOTH_ROADS ) {
                    c.beginPath();
    
                    c.lineTo(x + width, 0);
                    c.lineTo(x, 0);
    
                    c.setTransform(
                        previousScale, 
                        0, 
                        0, 
                        previousScale, 
                        canvasWidth/2, 
                        canvasHeight/2
                    );
                    if( Z_ROTATION ) {
                        c.transform(
                            Math.cos(previousZRotation), 
                            Math.sin(previousZRotation), 
                            -Math.sin(previousZRotation), 
                            Math.cos(previousZRotation), 
                            0, 
                            0
                        )    
                    }
                    c.transform(
                        Math.cos(previousZRotation), 
                        0, 
                        0, 
                        1, 
                        previousOffsetX, 
                        previousOffsetY
                    )
    
                    c.lineTo(x, 0);
                    c.lineTo(x, 1);
                    c.lineTo(x + width, 1);
                    c.lineTo(x + width, 0);
    
                    c.fill();        
                } else {
                    if( USE_EMOJIS ) {
                        c.fillRect(x, j/998, width, 9);
                    } else {
                        c.fillRect(x, -type, width, type?scenery[j++]:9);
                    }
                }
            }
            c.setTransform(1, 0, 0, 1, 0, 0);
        }
        if( X_ROTATION ) {
            if( STORE_X_ROTATION ) {
                xRotation += scenery[xRotationOffset];
            } else {
                xRotation -= randomValue;
                //xRotation -= ((zCurrent + i)%98)/trackLength;
            }
        }
        yRotation += scenery[yRotationOffset];
        if( Z_ROTATION ) {
            zRotation += scenery[zRotationOffset];
            previousZRotation = zRotation;
        }
        previousScale = scale;
        previousOffsetX = offsetX;
        previousOffsetY = offsetY;
    }

    if( WHITE_FILL) {
        c.fillStyle = '#fff';
        c.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    then = now;
}
f(0);