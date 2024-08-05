import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SOURCE } from "./source";
import { addAll } from "./utils";



export const MangaPage = () => {
    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white'
            }}>
            {SOURCE.map((item, index) => {
                return <Sequence from={addAll(SOURCE.map(i => i.duration).slice(0, index))} name={item.source} durationInFrames={item.duration} key={index}>
                    <Manga source={item.source} positions={item.pos} w={item.width} h={item.height} />
                </Sequence>
            })}

        </AbsoluteFill>
    )
}


const Manga: React.FC<{ source: string, positions: [number, number, number, number][], h: number, w: number }> = ({ source, positions, h, w }) => {

    const currentFrame = useCurrentFrame()

    const { durationInFrames } = useVideoConfig()

    const time_array: number[] = []
    for (let i = 0; i < 2 * positions.length - 1; i++) {
        if (i % 2 == 0) {
            time_array.push(5)
        }
        else {
            time_array.push(2)
        }
    }
    time_array.unshift(0)

    console.log(time_array);


    const dur_arr = time_array.map((item) => {
        return (durationInFrames / addAll(time_array)) * item
    })

    const act_dur = dur_arr.map((item, index) => {
        return addAll(dur_arr.slice(0, index + 1))
    })


    // X-Position Y-Position Width Height
    const position_x = positions.map((item) => item[0]).flatMap(number => [number, number]);
    const position_y = positions.map((item) => item[1]).flatMap(number => [number, number]);
    const width = positions.map((item) => item[2]).flatMap(number => [number, number]);
    const height = positions.map((item) => item[3]).flatMap(number => [number, number]);


    let _position_x = interpolate(currentFrame,
        act_dur,
        position_x)

    let _position_y = interpolate(currentFrame,
        act_dur,
        position_y)

    let _width = interpolate(currentFrame,
        act_dur,
        width)

    let _height = interpolate(currentFrame,
        act_dur,
        height)

    const scaleX = 1240 / _width;
    const scaleY = 680 / _height;

    const scale = Math.min(scaleX, scaleY); // Choose the smaller scale factor to fit the parent


    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                transform: `scale(${scale})`,
            }}>

            <div
                style={{
                    width: _width,  // Adjusted to  width
                    height: _height, // Adjusted to  height
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <img
                    style={{
                        position: 'absolute',
                        left: `-${_position_x}px`,    // Starting x position
                        top: `-${_position_y}px`,    // Starting y position
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
