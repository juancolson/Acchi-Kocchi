type Meta = {
    source: string,
    pos: [number, number, number, number][],
    height: number,
    width: number,
    duration: number
}

type _Meta = {
    source: string,
    pos: [number, number, number, number][],
    height: number,
    width: number
}

const imageFrame = 60
const transitionFrame = 24
let source: Meta[] = []

const _source: _Meta[] = [
    {
        source: "0001-010.png",
        pos: [
            [373, 94, 288, 210],
            [374, 318, 288, 207],
            [374, 540, 288, 205],
            [375, 761, 288, 208],
            [72, 94, 287, 210],
            [72, 318, 288, 207],
            [73, 540, 287, 205],
            [74, 761, 287, 207]
        ],
        height: 1053,
        width: 728
    },
    {
        source: "0001-011.png",
        pos: [[371, 93, 288, 208], [372, 314, 287, 209], [372, 536, 288, 209], [373, 759, 288, 208], [69, 93, 288, 208], [70, 314, 287, 209], [70, 536, 288, 209], [71, 759, 288, 208]],
        height: 1048,
        width: 728
    },
    {
        'source': '0001-012.png',
        'pos': [[382, 94, 288, 208],
        [383, 317, 290, 207],
        [383, 538, 289, 208],
        [384, 760, 288, 208],
        [81, 94, 288, 208],
        [82, 317, 288, 207],
        [82, 538, 289, 208],
        [83, 760, 288, 208]],
        'height': 1048,
        'width': 728
    }
]

source = _source.map((item) => {
    return {
        ...item,
        duration: item.pos.length * imageFrame + (item.pos.length - 1) * transitionFrame
    }
})


export const SOURCE = source