function drawScript(oCanvas, x, y, character, drawingLayer, drawBlockSize) {
    this.context = oCanvas.getContext('2d');

    var drawX = x;
    var drawY = y;
    var pixel = 0;
    var nX = 0, nY = 0;

    // checks if char is a number
    if (!isNaN(parseInt(character, 10))) {
        // draws the number
        for(pixel = 0 ; pixel < d3x5[0].length ; pixel++) {
            nX = pixel % 3;
            nY = Math.floor(pixel / 3);
            if (d3x5[ character ][ pixel ] === '*') {
                // draws a filled square
                this.context.fillStyle = '#ffffff';
                this.context.fillRect((drawX + nX) * drawBlockSize, (drawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a filled square at this position
                drawingLayer.grid[(drawX + nX)][(drawY + nY)] = '#ffffff';
            } else {
                // draws a clear square
                this.context.fillStyle = 'black';
                this.context.fillRect((drawX + nX) * drawBlockSize, (drawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a clear square at this position
                drawingLayer.grid[(drawX + nX)][(drawY + nY)] = 'black';
            }
        }
    } else {

        // converts the letter to an index in the array (a = 0, b = 1, ...)
        var nCharCode = character.charCodeAt(0);
        var nLetterIndex = nCharCode - 97;

        // draws the letter
        for(pixel = 0 ; pixel < s3x5[ 0 ].length ; pixel++) {
            nX = pixel % 3;
            nY = Math.floor(pixel / 3);

            if (s3x5[ nLetterIndex ][ pixel ] === '*') {
                // draws a filled square
                this.context.fillStyle = '#ffffff';
                this.context.fillRect((drawX + nX) * drawBlockSize, (drawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a filled square at this position
                drawingLayer.grid[(drawX + nX)][(drawY + nY)] = '#ffffff';
            } else {
                // draws a clear square
                this.context.fillStyle = 'black';
                this.context.fillRect((drawX + nX) * drawBlockSize, (drawY + nY) * drawBlockSize, drawBlockSize, drawBlockSize);

                // stores a clear square at this position
                drawingLayer.grid[(drawX + nX)][(drawY + nY)] = 'black';
            }
        }
    }
}

var s3x5 = [
    s3x5_acap = [
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    s3x5_bcap = [
        '*', '*', ' ',
        '*', ' ', '*',
        '*', '*', ' ',
        '*', ' ', '*',
        '*', '*', ' '
    ],

    s3x5_ccap = [
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', ' ', ' ',
        '*', ' ', '*',
        ' ', '*', ' '
    ],

    s3x5_dcap = [
        '*', '*', ' ',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', ' '
    ],

    s3x5_ecap = [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ],

    s3x5_fcap = [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', ' ',
        '*', ' ', ' ',
        '*', ' ', ' '
    ],

    s3x5_gcap = [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    s3x5_hcap = [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    s3x5_icap = [
        '*', '*', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        '*', '*', '*'
    ],

    s3x5_jcap = [
        '*', '*', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        '*', '*', ' '
    ],

    s3x5_kcap = [
        '*', ' ', '*',
        '*', '*', ' ',
        '*', '*', ' ',
        '*', '*', ' ',
        '*', ' ', '*'
  ],

    s3x5_lcap = [
        '*', ' ', ' ',
        '*', ' ', ' ',
        '*', ' ', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ],

    s3x5_mcap = [
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    s3x5_ncap = [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    s3x5_ocap = [
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    s3x5_pcap = [
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', ' ',
        '*', ' ', ' '
    ],

    s3x5_qcap = [
        '*', '*', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', '*', '*'
    ],

    s3x5_rcap = [
        '*', '*', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', '*', ' ',
        '*', ' ', '*'
    ],

    s3x5_scap = [
        '*', '*', '*',
        '*', ' ', ' ',
        '*', '*', '*',
        ' ', ' ', '*',
        '*', '*', '*'
    ],

    s3x5_tcap = [
        '*', '*', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' '
    ],

    s3x5_ucap = [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*'
    ],

    s3x5_vcap = [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' '
    ],

    s3x5_wcap = [
        '*', ' ', '*',
        '*', ' ', '*',
        '*', ' ', '*',
        '*', '*', '*',
        '*', ' ', '*'
    ],

    s3x5_xcap = [
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' ',
        '*', ' ', '*',
        '*', ' ', '*'
    ],

    s3x5_ycap = [
        '*', ' ', '*',
        '*', ' ', '*',
        ' ', '*', ' ',
        ' ', '*', ' ',
        ' ', '*', ' '
    ],

    s3x5_zcap = [
        '*', '*', '*',
        ' ', ' ', '*',
        ' ', '*', ' ',
        '*', ' ', ' ',
        '*', '*', '*'
    ]
]

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

