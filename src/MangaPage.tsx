import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

function addAll(input: number[]) {
    return input.reduce((a, b) => a + b, 0)
}

export const MangaPage = () => {
    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Sequence name="Page 9 Left" durationInFrames={150} >

                <Manga source="0001-009.png" panel="left" />
            </Sequence>
            <Sequence name="Page 10 Left" from={150} durationInFrames={150}>
                <Manga source="0001-010.png" panel="left" />
            </Sequence>
            <Sequence name="Page 10 Right" from={300} durationInFrames={150}>
                <Manga source="0001-010.png" panel="right" />
            </Sequence>
        </AbsoluteFill>
    )
}

export const Manga: React.FC<{ source: string, panel: 'left' | 'right' }> = ({ source, panel }) => {

    const currentFrame = useCurrentFrame()

    const { durationInFrames } = useVideoConfig()

    const time_array = [5, 2, 5, 2, 5, 2, 5]

    const dur_arr = time_array.map((item) => {
        return (durationInFrames / 26) * item
    })

    const act_dur = dur_arr.map((item, index) => {
        return addAll(dur_arr.slice(0, index + 1))
    })

    const y_pox = [93, 317, 540, 765]
    const x_pos = [66, 368]

    const h_size = '211px'
    const w_size = '292px'

    let y_position = `-0px`
    let x_position = `-0px`

    if (panel == 'left') {
        x_position = `-${x_pos[0]}px`
    } else {
        x_position = `-${x_pos[1]}px`
    }


    if (currentFrame < act_dur[0]) {
        y_position = `-${y_pox[0]}px`

    } else if (act_dur[0] <= currentFrame && currentFrame < act_dur[1]) {

        const duration = act_dur[1] - act_dur[0]
        const y_diff = y_pox[1] - y_pox[0]
        const y_diff_per_dur = y_diff / duration

        const y_pos_ = y_diff_per_dur * (currentFrame - act_dur[0])

        y_position = `-${y_pox[0] + y_pos_}px`



    }

    else if (act_dur[1] <= currentFrame && currentFrame < act_dur[2]) {
        y_position = `-${y_pox[1]}px`

    } else if (act_dur[2] <= currentFrame && currentFrame < act_dur[3]) {

        const duration = act_dur[3] - act_dur[2]
        const y_diff = y_pox[2] - y_pox[1]
        const y_diff_per_dur = y_diff / duration

        const y_pos_ = y_diff_per_dur * (currentFrame - act_dur[2])

        y_position = `-${y_pox[1] + y_pos_}px`



    }

    else if (act_dur[3] <= currentFrame && currentFrame < act_dur[4]) {
        y_position = `-${y_pox[2]}px`

    } else if (act_dur[4] <= currentFrame && currentFrame < act_dur[5]) {

        const duration = act_dur[5] - act_dur[4]
        const y_diff = y_pox[3] - y_pox[2]
        const y_diff_per_dur = y_diff / duration

        const y_pos_ = y_diff_per_dur * (currentFrame - act_dur[4])

        y_position = `-${y_pox[2] + y_pos_}px`



    } else if (act_dur[5] <= currentFrame && currentFrame < act_dur[6]) {
        y_position = `-${y_pox[3]}px`

    }

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                transform: 'scale(3)',
                transformOrigin: 'center',
            }}>

            <div
                style={{
                    width: w_size,  // Adjusted to 200px width
                    height: h_size, // Adjusted to 300px height
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <img
                    style={{
                        position: 'absolute',
                        left: x_position,    // Starting x position
                        top: y_position,    // Starting y position
                        width: '728px',  // Original image width
                        height: '1053px', // Original image height
                        transformOrigin: 'top left'
                    }}
                    src={staticFile(source)}
                />
            </div>
        </AbsoluteFill>
    )
};

// Y = 84 Y2 = 314 Y3 = 539 Y4 = 764
// X = 61 X2 = 370
