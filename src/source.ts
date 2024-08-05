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
        'source': '0001-012.jpg',
        'height': 1600,
        'pos': [
            [583, 143, 440, 319],
            [584, 484, 453, 317],
            [585, 822, 440, 318],
            [586, 1161, 440, 316],
            [124, 143, 440, 319],
            [125, 483, 440, 318],
            [126, 821, 440, 319],
            [127, 1160, 440, 317]],
        'width': 1111
    },
    {
        'height': 1600,
        'pos': [[567, 137, 439, 320],
        [568, 474, 439, 322],
        [569, 813, 439, 320],
        [570, 1153, 439, 320],
        [105, 136, 439, 321],
        [106, 474, 439, 321],
        [107, 813, 439, 320],
        [108, 1153, 439, 319]],
        'source': '0001-013.jpg',
        'width': 1111
    }
]

source = _source.map((item) => {
    return {
        ...item,
        duration: item.pos.length * imageFrame + (item.pos.length - 1) * transitionFrame
    }
})


export const SOURCE = source