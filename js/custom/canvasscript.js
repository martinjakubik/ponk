function drawScript(oCanvas, x, y, character, drawingLayer, drawBlockSize) {
    this.context = oCanvas.getContext('2d');

    var nDrawX = x;
    var nDrawY = y;
    var nPixel = 0;
    var nX = 0, nY = 0;

    // checks if char is a number
    if (!isNaN(parseInt(character, 10))) {
        // draws the number
        for (nPixel = 0; nPixel < d3x5[0].length; nPixel++) {
            nX = nPixel % 3;
            nY = Math.floor(nPixel / 3);
            if (d3x5[ character ][ nPixel ] === '*') {
                // draws a filled square
                this.context.fillStyle = '#ffffff';
                this.context.fillRect((nDrawX + nX) * drawBlockSize, (nDrawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a filled square at this position
                drawingLayer.grid[(nDrawX + nX)][(nDrawY + nY)] = '#ffffff';
            } else {
                // draws a clear square
                this.context.fillStyle = 'black';
                this.context.fillRect((nDrawX + nX) * drawBlockSize, (nDrawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a clear square at this position
                drawingLayer.grid[(nDrawX + nX)][(nDrawY + nY)] = 'black';
            }
        }
    } else {

        // converts the letter to an index in the array (a = 0, b = 1, ...)
        var nCharCode = character.charCodeAt(0);
        var nLetterIndex = nCharCode - 97;

        // draws the letter
        for (nPixel = 0; nPixel < s3x5[ 0 ].length; nPixel++) {
            nX = nPixel % 3;
            nY = Math.floor(nPixel / 3);

            if (s3x5[ nLetterIndex ][ nPixel ] === '*') {
                // draws a filled square
                this.context.fillStyle = '#ffffff';
                this.context.fillRect((nDrawX + nX) * drawBlockSize, (nDrawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a filled square at this position
                drawingLayer.grid[(nDrawX + nX)][(nDrawY + nY)] = '#ffffff';
            } else {
                // draws a clear square
                this.context.fillStyle = 'black';
                this.context.fillRect((nDrawX + nX) * drawBlockSize, (nDrawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a clear square at this position
                drawingLayer.grid[(nDrawX + nX)][(nDrawY + nY)] = 'black';
            }
        }
    }
}

var s3x5 = [
    // A
    [
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    // B
    [
        '*', '*', ' ',
        '*', ' ', '*',
        '*', '*', ' ',
        '*', ' ', '*',
        '*', '*', ' '
    ],

    // C
    [
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', ' ', ' ',
        '*', ' ', '*',
        ' ', '*', ' '
    ],

    // D
    [
        '*', '*', ' ',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', ' '
    ],

    // E
    [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ],

    // F
    [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', ' ',
        '*', ' ', ' ',
        '*', ' ', ' '
    ],

    // G
    [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    // H
    [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    // I
    [
        '*', '*', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        '*', '*', '*'
    ],

    // J
    [
        '*', '*', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        '*', '*', ' '
    ],

    // K
    [
        '*', ' ', '*',
        '*', '*', ' ',
        '*', '*', ' ',
        '*', '*', ' ',
        '*', ' ', '*'
    ],

    // L
    [
        '*', ' ', ' ',
        '*', ' ', ' ',
        '*', ' ', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ],

    // M
    [
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    // N
    [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    // O
    [
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    // P
    [
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', ' ',
        '*', ' ', ' '
    ],

    // Q
    [
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', '*', '*'
    ],

    // R
    [
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', '*', ' ',
        '*', ' ', '*'
    ],

    // S
    [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', '*',
        ' ', ' ', '*',
        '*', '*', '*'
    ],

    // T
    [
        '*', '*', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' '
    ],

    // U
    [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    // V
    [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' '
    ],

    // W
    [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*'
    ],

    // X
    [
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    // Y
    [
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' '
    ],

    // Z
    [
        '*', '*', '*',
        ' ', ' ', '*',
        ' ', '*', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ]
];

var d3x5 = [

    // 0
    [
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' '
    ],

    // 1
    [
        ' ', '*', ' ',
        '*', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' '
    ],

    // 2
    [
        ' ', '*', ' ',
        '*', ' ', '*',
        ' ', '*', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ],

    // 3
    [
        '*', '*', '*',
        ' ', ' ', '*',
        ' ', '*', ' ',
        '*', ' ', '*',
        ' ', '*', ' '
    ],

    // 4
    [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        ' ', ' ', '*',
        ' ', ' ', '*'
    ],

    // 5
    [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', '*',
        ' ', ' ', '*',
        '*', '*', '*'
    ],

   // 6
    [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    // 7
    [
        '*', '*', '*',
        ' ', ' ', '*',
        '*', '*', '*',
        ' ', ' ', '*',
        ' ', ' ', '*'
    ],

    // 8
    [
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    // 9
    [
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*',
        ' ', ' ', '*',
        '*', '*', '*'
    ]
];

