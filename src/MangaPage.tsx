import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { imageFrame, Meta, transitionFrame } from "./source";
import { addAll } from "./utils";
import React from "react";



export const MangaPage: React.FC<{SOURCE: Meta[]}> = ({ SOURCE}) => {
    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white'
            }}>
            {SOURCE.map((item, index) => {
                return <Sequence key={index} from={addAll(SOURCE.map(i => i.duration).slice(0, index))} name={item.source} durationInFrames={item.duration} >
                    <Manga source={item.source} positions={item.pos} w={item.width} h={item.height} />
                </Sequence>
            })}

        </AbsoluteFill>
    )
}


const Manga: React.FC<{ source: string, positions: [number, number, number, number][], h: number, w: number }> = ({ source, positions, h, w }) => {

    const currentFrame = useCurrentFrame()

    const { durationInFrames } = useVideoConfig()

    const timeArray: number[] = []
    for (let i = 0; i < 2 * positions.length - 1; i++) {
        if (i % 2 === 0) {
            timeArray.push(imageFrame)
        }
        else {
            timeArray.push(transitionFrame)
        }
    }
    timeArray.unshift(0)

    console.log(timeArray);


    const durationArray = timeArray.map((item) => {
        return (durationInFrames / addAll(timeArray)) * item
    })

    const actualDurationArray = durationArray.map((item, index) => {
        return addAll(durationArray.slice(0, index + 1))
    })


    // X-Position Y-Position Width Height
    const positionX = positions.map((item) => item[0]).flatMap(number => [number, number]);
    const positionY = positions.map((item) => item[1]).flatMap(number => [number, number]);
    const width = positions.map((item) => item[2]).flatMap(number => [number, number]);
    const height = positions.map((item) => item[3]).flatMap(number => [number, number]);


    const movingPositionX = interpolate(currentFrame,
        actualDurationArray,
        positionX)

    const movingPositionY = interpolate(currentFrame,
        actualDurationArray,
        positionY)

    const changingWidth = interpolate(currentFrame,
        actualDurationArray,
        width)

    const changingHeight = interpolate(currentFrame,
        actualDurationArray,
        height)

    const scaleX = 1240 / changingWidth;
    const scaleY = 680 / changingHeight;

    const scale = Math.min(scaleX, scaleY); // Choose the smaller scale factor to fit the parent

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                minHeight: changingHeight,
                minWidth: changingWidth,
                alignItems: 'center',
                flex: 1,
                transform: `scale(${scale})`,
                border: '1px solid black',
            }}>
                {/* <p>{_height} {_width} {scale.toFixed(2)} </p> */}

            <div
                style={{
                    width: changingWidth,  // Adjusted to  width
                    height: changingHeight, // Adjusted to  height
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Img
                    style={{
                        position: 'absolute',
                        left: `-${movingPositionX}px`,    // Starting x position
                        top: `-${movingPositionY}px`,    // Starting y position
                        width: `${w}px`,  // Original image width with 'px' units
                        height: `${h}px`, // Original image height with 'px' units
                        transformOrigin: 'top left'
                    }}
                    src={staticFile(source)}
                />
            </div>
        </AbsoluteFill>
    )
};
