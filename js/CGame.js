function CGame(oData) {
    var _bUpdate = false;
    var _bWinAssigned;
    var _iState;
    var _iBetMult;
    var _iTimeElaps;
    var _iFactor;
    var _iFrameToStop;
    var _iNumberExtracted;
    var _iCasinoCash;
    var _iCountLastNeighbors;
    var _iHandCont;
    var _aBetMultHistory;
    var _aBetWinHistory;
    var _aNumFicheHistory;
    var _aNumExtractedHistory;
    var _aEnlights;
    var _aFichesToMove;
    var _aRebetHistory;

    var _oBg;
    var _oMySeat;
    var _oPlaceHolder;
    var _oInterface;
    var _oTableController;
    var _oAttachFiches;
    var _oMsgBox;
    var _oWheelTopAnim;
    var _oWheelAnim;
    var _oFinalBet;
    var _oNeighborsPanel;
    var _oGameOverPanel;
    var _oBlock;

    this._init = function () {
        s_oTweenController = new CTweenController();
        s_oGameSettings = new CRouletteSettings();

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        this._initEnlights();

        _oAttachFiches = new createjs.Container();
        _oAttachFiches.x = 261;
        _oAttachFiches.y = 264;
        s_oStage.addChild(_oAttachFiches);

        _oTableController = new CTableController();
        _oTableController.addEventListener(ON_SHOW_ENLIGHT, this._onShowEnlight);
        _oTableController.addEventListener(ON_HIDE_ENLIGHT, this._onHideEnlight);
        _oTableController.addEventListener(ON_SHOW_BET_ON_TABLE, this._onShowBetOnTable);

        _iCountLastNeighbors = 0;
        _iHandCont = 0;
        _iState = -1;
        _iBetMult = 37;
        _aBetMultHistory = new Array();
        _aBetWinHistory = new Array();
        _aNumFicheHistory = new Array();
        _aRebetHistory = new Array();

        _oMySeat = new CSeat();

        _oWheelTopAnim = new CWheelTopAnim(493, 6);
        _oWheelAnim = new CWheelAnim(0, 0);
        _oInterface = new CInterface();

        _oFinalBet = new CFinalBetPanel(160, 569);

        _oNeighborsPanel = new CNeighborsPanel(_oMySeat.getCredit());

        _oGameOverPanel = new CGameOver();


        _oMsgBox = new CMsgBox();


        var oGraphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBlock = new createjs.Shape(oGraphics);
        _oBlock.on("click", function () { });
        _oBlock.visible = false;
        s_oStage.addChild(_oBlock);

        _aNumExtractedHistory = new Array();

        _iTimeElaps = 0;
        this._onSitDown();

        _bUpdate = true;
    };

    this.unload = function () {
        stopSound("wheel_sound");

        _oInterface.unload();
        _oTableController.unload();
        _oMsgBox.unload();
        _oFinalBet.unload();
        _oNeighborsPanel.unload();
        _oGameOverPanel.unload();

        s_oStage.removeAllChildren();
    };

    this._initEnlights = function () {
        var oBmp;
        _aEnlights = new Array();

        /*********************NUMBER ENLIGHT*****************/
        oBmp = new CEnlight(288, 175, s_oSpriteLibrary.getSprite('enlight_bet0'), s_oStage);
        _aEnlights["oEnlight_0"] = oBmp;

        oBmp = new CEnlight(318, 244, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_1"] = oBmp;

        oBmp = new CEnlight(342, 220, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_2"] = oBmp;

        oBmp = new CEnlight(368, 198, s_oSpriteLibrary.getSprite('enlight_number3'), s_oStage);
        _aEnlights["oEnlight_3"] = oBmp;

        oBmp = new CEnlight(341, 262, s_oSpriteLibrary.getSprite('enlight_number4'), s_oStage);
        _aEnlights["oEnlight_4"] = oBmp;

        oBmp = new CEnlight(367, 238, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_5"] = oBmp;

        oBmp = new CEnlight(392, 214, s_oSpriteLibrary.getSprite('enlight_number3'), s_oStage);
        _aEnlights["oEnlight_6"] = oBmp;

        oBmp = new CEnlight(366, 279, s_oSpriteLibrary.getSprite('enlight_number4'), s_oStage);
        _aEnlights["oEnlight_7"] = oBmp;

        oBmp = new CEnlight(391, 255, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_8"] = oBmp;

        oBmp = new CEnlight(416, 231, s_oSpriteLibrary.getSprite('enlight_number3'), s_oStage);
        _aEnlights["oEnlight_9"] = oBmp;

        oBmp = new CEnlight(390, 297, s_oSpriteLibrary.getSprite('enlight_number4'), s_oStage);
        _aEnlights["oEnlight_10"] = oBmp;

        oBmp = new CEnlight(415, 273, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_11"] = oBmp;

        oBmp = new CEnlight(439, 249, s_oSpriteLibrary.getSprite('enlight_number12'), s_oStage);
        _aEnlights["oEnlight_12"] = oBmp;

        oBmp = new CEnlight(414, 315, s_oSpriteLibrary.getSprite('enlight_number4'), s_oStage);
        _aEnlights["oEnlight_13"] = oBmp;

        oBmp = new CEnlight(439, 291, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_14"] = oBmp;

        oBmp = new CEnlight(464, 266, s_oSpriteLibrary.getSprite('enlight_number12'), s_oStage);
        _aEnlights["oEnlight_15"] = oBmp;

        oBmp = new CEnlight(439, 333, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_16"] = oBmp;

        oBmp = new CEnlight(464, 308, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_17"] = oBmp;

        oBmp = new CEnlight(488, 283, s_oSpriteLibrary.getSprite('enlight_number1'), s_oStage);
        _aEnlights["oEnlight_18"] = oBmp;

        oBmp = new CEnlight(466, 351, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_19"] = oBmp;

        oBmp = new CEnlight(489, 326, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_20"] = oBmp;

        oBmp = new CEnlight(513, 301, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_21"] = oBmp;

        oBmp = new CEnlight(491, 371, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_22"] = oBmp;

        oBmp = new CEnlight(515, 344, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_23"] = oBmp;

        oBmp = new CEnlight(539, 319, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_24"] = oBmp;

        oBmp = new CEnlight(516, 389, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_25"] = oBmp;

        oBmp = new CEnlight(540, 363, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_26"] = oBmp;

        oBmp = new CEnlight(564, 338, s_oSpriteLibrary.getSprite('enlight_number16'), s_oStage);
        _aEnlights["oEnlight_27"] = oBmp;

        oBmp = new CEnlight(542, 408, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_28"] = oBmp;

        oBmp = new CEnlight(566, 381, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_29"] = oBmp;

        oBmp = new CEnlight(590, 356, s_oSpriteLibrary.getSprite('enlight_number30'), s_oStage);
        _aEnlights["oEnlight_30"] = oBmp;

        oBmp = new CEnlight(568, 428, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_31"] = oBmp;

        oBmp = new CEnlight(593, 401, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_32"] = oBmp;

        oBmp = new CEnlight(617, 376, s_oSpriteLibrary.getSprite('enlight_number30'), s_oStage);
        _aEnlights["oEnlight_33"] = oBmp;

        oBmp = new CEnlight(596, 448, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_34"] = oBmp;

        oBmp = new CEnlight(619, 421, s_oSpriteLibrary.getSprite('enlight_number25'), s_oStage);
        _aEnlights["oEnlight_35"] = oBmp;

        oBmp = new CEnlight(644, 395, s_oSpriteLibrary.getSprite('enlight_number30'), s_oStage);
        _aEnlights["oEnlight_36"] = oBmp;

        /*********************OTHER ENLIGHTS*****************/
        oBmp = new CEnlight(624, 470, s_oSpriteLibrary.getSprite('enlight_col'), s_oStage);
        _aEnlights["oEnlight_col1"] = oBmp;

        oBmp = new CEnlight(649, 442, s_oSpriteLibrary.getSprite('enlight_col'), s_oStage);
        _aEnlights["oEnlight_col2"] = oBmp;

        oBmp = new CEnlight(672, 415, s_oSpriteLibrary.getSprite('enlight_col'), s_oStage);
        _aEnlights["oEnlight_col3"] = oBmp;

        oBmp = new CEnlight(280, 268, s_oSpriteLibrary.getSprite('enlight_first_twelve'), s_oStage);
        _aEnlights["oEnlight_first12"] = oBmp;

        oBmp = new CEnlight(377, 340, s_oSpriteLibrary.getSprite('enlight_second_twelve'), s_oStage);
        _aEnlights["oEnlight_second12"] = oBmp;

        oBmp = new CEnlight(477, 416, s_oSpriteLibrary.getSprite('enlight_third_twelve'), s_oStage);
        _aEnlights["oEnlight_third12"] = oBmp;

        oBmp = new CEnlight(241, 305, s_oSpriteLibrary.getSprite('enlight_first18'), s_oStage);
        _aEnlights["oEnlight_first18"] = oBmp;

        oBmp = new CEnlight(288, 343, s_oSpriteLibrary.getSprite('enlight_first18'), s_oStage);
        _aEnlights["oEnlight_even"] = oBmp;

        oBmp = new CEnlight(338, 380, s_oSpriteLibrary.getSprite('enlight_black'), s_oStage);
        _aEnlights["oEnlight_black"] = oBmp;

        oBmp = new CEnlight(389, 419, s_oSpriteLibrary.getSprite('enlight_red'), s_oStage);
        _aEnlights["oEnlight_red"] = oBmp;

        oBmp = new CEnlight(439, 456, s_oSpriteLibrary.getSprite('enlight_odd'), s_oStage);
        _aEnlights["oEnlight_odd"] = oBmp;

        oBmp = new CEnlight(492, 498, s_oSpriteLibrary.getSprite('enlight_second18'), s_oStage);
        _aEnlights["oEnlight_second18"] = oBmp;
    };

    this._setState = function (iState) {
        _iState = iState;

        switch (iState) {
            case STATE_GAME_WAITING_FOR_BET: {
                _oInterface.enableBetFiches();

                _oBlock.visible = false;
                break;
            }
        }
    };

    this._resetTable = function () {
        _iTimeElaps = 0;
        _iBetMult = 37;
        _aBetMultHistory = new Array();
        _aBetWinHistory = new Array();
        _aNumFicheHistory = new Array();

        if (_oPlaceHolder !== null) {
            s_oStage.removeChild(_oPlaceHolder);
            _oPlaceHolder = null;
        }

        _oMySeat.reset();
        _oNeighborsPanel.reset();

        if (_oMySeat.getCredit() < 0.1) {
            _iState = -1;
            _oBlock.visible = false;
            _oGameOverPanel.show();
        } else {
            _oInterface.enableRebet();
            this._setState(STATE_GAME_WAITING_FOR_BET);
        }

        _iHandCont++;
        if (_iHandCont === NUM_HAND_FOR_ADS) {
            _iHandCont = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }
    };

    this._startRouletteAnim = function () {
        _oInterface.disableBetFiches();

        _iNumberExtracted = this._generateWinLoss();

        _aNumExtractedHistory.push(_iNumberExtracted);

        _iTimeElaps = 0;
        _iFactor = 0;
        _iFrameToStop = s_oGameSettings.getFrameForNumber(_iNumberExtracted);
    };

    this._startWheelTopAnim = function () {
        _oWheelTopAnim.playToFrame(_iFrameToStop);

    };

    this._startBallSpinAnim = function () {
        var iRand = Math.floor(Math.random() * 3);

        _oWheelAnim.startSpin(iRand, s_oGameSettings.getFrameForBallSpin(iRand, _iNumberExtracted));
    };
    var bettype;
    var number;
    this._generateWinLoss = function () {
        var iRandIndex;
        var aNumbersBetted = _oMySeat.getNumbersBetted();
        var aTmpNumbers = _oMySeat.getNumberSelected();
        var iWin = aNumbersBetted[aTmpNumbers[0][0]].win;
        var red = new Array(1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36);
        var black = new Array(2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35);
        var even = new Array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36);
        var odd = new Array(1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35);
        var lowEighteen = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18);
        var highEighteen = new Array(19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
        var firstDozen = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
        var secondDozen = new Array(13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24);
        var thirdDozena = new Array(25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
        var columnOne = new Array(1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34);
        var columnTwo = new Array(2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35);
        var columnThree = new Array(3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36);
        var tempVariable = new Array();
        var tempRed = new Array();
        var tempBlack = new Array();
        for (let i = 0; i < aNumbersBetted.length; i++) {
            if (aNumbersBetted[i].win > 0) {
                tempVariable.push(i);

            }
        }

        console.log(tempVariable);
        /////////////////////
        if (JSON.stringify(tempVariable) === JSON.stringify(black)) {
            console.log("black");
            bettype = 0;
            number = 0;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(red)) {
            console.log("red");
            bettype = 0;
            number = 1;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(even)) {
            console.log("even");
            bettype = 4;
            number = 0;

        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(odd)) {
            console.log("odd");
            bettype = 4;
            number = 1;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(lowEighteen)) {
            console.log("low eighteen");
            bettype = 3;
            number = 0;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(highEighteen)) {
            console.log("highEighteen");
            bettype = 3;
            number = 1;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(firstDozen)) {
            console.log("first dozen");
            bettype = 2;
            number = 0;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(secondDozen)) {
            console.log("second dozen");
            bettype = 2;
            number = 1;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(thirdDozena)) {
            console.log("third dozen");
            bettype = 2;
            number = 2;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(columnOne)) {
            console.log("column one");
            bettype = 1;
            number = 0;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(columnTwo)) {
            console.log("column two");
            bettype = 1;
            number = 1;
        }
        else if (JSON.stringify(tempVariable) === JSON.stringify(columnThree)) {
            console.log("column three");
            bettype = 1;
            number = 2;
        }
        else {
            console.log("nothing");
            bettype = 5;
            number = tempVariable[0];
        }


        console.log("BetType = " + bettype + " Number = " + number);
        sessionStorage.setItem("betType", bettype);
        sessionStorage.setItem("number", number);
        ////////////////////
        //for red
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<red.length ; j++){
        //         if(tempVariable[i] === red[j]){
        //             console.log("This is red "+1+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("no red");
        //         }
        //     }

        // }
        // //for black
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<black.length ; j++){
        //         if(tempVariable[i] === black[j]){
        //             console.log("This is black "+0+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("no black");
        //         }
        //     }

        // }
        // //for even 
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<even.length ; j++){
        //         if(tempVariable[i] === even[j]){
        //             console.log("This is even "+0+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //For odd
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<odd.length ; j++){
        //         if(tempVariable[i] === odd[j]){
        //             console.log("This is odd "+1+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //low eighteen 0
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<lowEighteen.length ; j++){
        //         if(tempVariable[i] === lowEighteen[j]){
        //             console.log("This is low eighteen "+0+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //high eighteen 1
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<highEighteen.length ; j++){
        //         if(tempVariable[i] === highEighteen[j]){
        //             console.log("This is high eighteen "+1+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //first dozen 0
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<firstDozen.length ; j++){
        //         if(tempVariable[i] === firstDozen[j]){
        //             console.log("This is first dozen "+0+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //second dozen
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<secondDozen.length ; j++){
        //         if(tempVariable[i] === secondDozen[j]){
        //             console.log("This is second dozen "+1+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //third dozen
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<thirdDozena.length ; j++){
        //         if(tempVariable[i] === thirdDozena[j]){
        //             console.log("This is third dozen "+1+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //column one 0
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<columnOne.length ; j++){
        //         if(tempVariable[i] === columnOne[j]){
        //             console.log("This is column one  "+0+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //column two 1
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<columnTwo.length ; j++){
        //         if(tempVariable[i] === columnTwo[j]){
        //             console.log("This is column two  "+1+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        // //column three 2
        // for(let i = 0 ; i<tempVariable.length ; i++){
        //     for(let j = 0 ; j<columnThree.length ; j++){
        //         if(tempVariable[i] === columnThree[j]){
        //             console.log("This is column three  "+2+" on number "+tempVariable[i]);
        //         }
        //         else{
        //             console.log("null");
        //         }
        //     }
        // }
        //var allColumns = new Array(col1,col2,col3);

        alert("Wining Amount" + iWin + "Wining List See In Console");

        //let var1  = Object.aNumbersBetted;
        console.log(aNumbersBetted);
        console.log(aNumbersBetted[2].win);






        var iWinOccurence;
        var iRand;
        if (_iCasinoCash < iWin) {
            iWinOccurence = 0;
            iRand = Math.floor(Math.random() * (100));
        } else if (WIN_OCCURRENCE === -1) {
            iWinOccurence = 37 - _iBetMult;
            iRand = Math.floor(Math.random() * (38));
        } else {
            iWinOccurence = WIN_OCCURRENCE;
            iRand = Math.floor(Math.random() * (100));
        }

        if (iRand >= iWinOccurence) {
            _bWinAssigned = false;
        } else {
            _bWinAssigned = true;
        }

        if (_bWinAssigned) {
            do {
                iRandIndex = Math.floor(Math.random() * aNumbersBetted.length);
                iWin = aNumbersBetted[iRandIndex].win;
            } while (iWin === 0);

            _iNumberExtracted = iRandIndex;
        } else {
            var aTmpNumbers = new Array();
            for (var k = 0; k < 37; k++) {
                aTmpNumbers.push(k);
            }
            do {
                if (aTmpNumbers.length === 0) {
                    iRandIndex = Math.floor(Math.random() * aNumbersBetted.length);
                    break;
                }
                iRandIndex = Math.floor(Math.random() * aTmpNumbers.length);
                iWin = aNumbersBetted[iRandIndex].win;

                aTmpNumbers.splice(iRandIndex, 1);
            } while (iWin > _oMySeat.getCurBet());

            _iNumberExtracted = iRandIndex;
        }

        return _iNumberExtracted;
    };0x48E4dBa772a1eBF597F08e1dC4dbB771B411411B
    this._rouletteAnimEnded = async function () {
        _iTimeElaps = 0;
        _oWheelTopAnim.showBall();
        this._setState(STATE_GAME_SHOW_WINNER);

        stopSound("wheel_sound");

        var aNumbersBetted = _oMySeat.getNumbersBetted();
        console.log(aNumbersBetted);
        var oWins = aNumbersBetted[_iNumberExtracted];
        var iWin = roundDecimal(oWins.win, 2);
        _aFichesToMove = new Array();

        for (var j = 0; j < aNumbersBetted.length; j++) {
            var oRes = aNumbersBetted[j];
            if (oRes.win > 0) {
                for (var k = 0; k < oRes.mc.length; k++) {
                    _aFichesToMove.push(oRes.mc[k]);
                    var oEndPos = s_oGameSettings.getAttachOffset("oDealerWin");
                    oRes.mc[k].setEndPoint(oEndPos.x, oEndPos.y);
                }
            }
        }
        var betType = sessionStorage.getItem("betType");
        var number = sessionStorage.getItem("number");
        var person = sessionStorage.getItem("person");
        if (oWins.mc) {
            for (var i = 0; i < oWins.mc.length; i++) {
                var oEndPos = s_oGameSettings.getAttachOffset("oReceiveWin");
                oWins.mc[i].setEndPoint(oEndPos.x, oEndPos.y);

            }



            _oInterface.showWin(iWin);
            alert(TEXT_DISPLAY_MSG_PLAYER_WIN)
            console.log(betType + " " + number + " " + person);
            ////////////////////////
            await Moralis.enableWeb3();
            //  var expo = person * 1000000000000000000;
            var _am = Moralis.Units.Token(person, "9");
            let optionss = {
                contractAddress: "0xaFE3321309A994831884fc1725F4c3236AC79f76", //token Adress
                functionName: "placeBet",
                abi: [
                    {
                        inputs: [
                            {
                                internalType: "address",
                                name: "token",
                                type: "address"
                            },
                            {
                                internalType: "uint8",
                                name: "number",
                                type: "uint8"
                            },
                            {
                                internalType: "uint8",
                                name: "betType",
                                type: "uint8"
                            },
                            {
                                internalType: "uint128",
                                name: "betAmount",
                                type: "uint128"
                            }
                        ],
                        name: "placeBet",
                        outputs: [],
                        stateMutability: "payable",
                        type: "function",
                    },
                ],
                params: {
                    token: "0x48E4dBa772a1eBF597F08e1dC4dbB771B411411B ", // game smart contract address
                    number: number,
                    betType: betType,
                    betAmount: _am
                    // modal value (0.4 * 1e18)
                },
            };
            try {
                r = await Moralis.executeFunction(optionss);
                console.log(r);
            }
            catch (err) {
                console.log(err.data.message);
                alert(err.data.message);
                return;
            }
        } else {
            _oInterface.showLose();
            alert(TEXT_DISPLAY_MSG_PLAYER_LOSE);
            console.log(betType + " " + number + " " + person);
            /////////////////////
            await Moralis.enableWeb3();
            var expo = person * 1000000000000000000;
            var _am = Moralis.Units.Token(person, "9");
            let optionss = {
                contractAddress: "0x48E4dBa772a1eBF597F08e1dC4dbB771B41411B", //game contract adress
                functionName: "placeBet",
                abi: [
                    {
                        inputs: [
                            {
                                internalType: "address",
                                name: "token",
                                type: "address"
                            },
                            {
                                internalType: "uint8",
                                name: "number",
                                type: "uint8"
                            },
                            {
                                internalType: "uint8",
                                name: "betType",
                                type: "uint8"
                            },
                            {
                                internalType: "uint128",
                                name: "betAmount",
                                type: "uint128"
                            }
                        ],
                        name: "placeBet",
                        outputs: [],
                        stateMutability: "payable",
                        type: "function",
                    },
                ],
                params: {
                    token: "0xaFE3321309A994831884fc1725F4c3236AC79f76", // game smart contract address
                    number: number,
                    betType: bettype,
                    betAmount: _am
                    // modal value (0.4 * 1e18)
                },
            };
            try {
                r = await Moralis.executeFunction(optionss);
                console.log(r);
            }
            catch (err) {
                console.log(err.data.message);
                alert(err.data.message);
                return;
            }

        }





        _oInterface.refreshNumExtracted(_aNumExtractedHistory);

        //ATTACH PLACEHOLDER THAT SHOW THE NUMBER EXTRACTED
        _oPlaceHolder = createBitmap(s_oSpriteLibrary.getSprite('placeholder'));
        if (_iNumberExtracted === 0) {
            _oPlaceHolder.x = _aEnlights["oEnlight_" + _iNumberExtracted].getX() + 27;
            _oPlaceHolder.y = _aEnlights["oEnlight_" + _iNumberExtracted].getY() + 22;
        } else {
            _oPlaceHolder.x = _aEnlights["oEnlight_" + _iNumberExtracted].getX();
            _oPlaceHolder.y = _aEnlights["oEnlight_" + _iNumberExtracted].getY();
        }

        _oPlaceHolder.regX = 6;
        _oPlaceHolder.regY = 20;
        s_oStage.addChild(_oPlaceHolder);

        _oMySeat.showWin(iWin);
        if (iWin > 0) {
            _iCasinoCash -= iWin;
        } else {
            _iCasinoCash += _oMySeat.getCurBet();
        }


        $(s_oMain).trigger("save_score", [_oMySeat.getCredit(), iWin]);

        _oInterface.refreshMoney(_oMySeat.getCredit());
    };

    this.showMsgBox = function (szText) {
        _oMsgBox.show(szText);
    };

    this.onRecharge = function () {
        _oMySeat.recharge(TOTAL_MONEY);
        _oInterface.refreshMoney(_oMySeat.getCredit());

        this._setState(STATE_GAME_WAITING_FOR_BET);

        _oGameOverPanel.hide();

        $(s_oMain).trigger("recharge");
    };

    this.onSpin = function () {
        if (_oNeighborsPanel.isVisible()) {
            _oNeighborsPanel.onExit();
        }

        if (_oMySeat.getCurBet() === 0) {
            return;
        }

        if (_oMySeat.getCurBet() < MIN_BET) {
            _oMsgBox.show(TEXT_ERROR_MIN_BET);
            _oInterface.enableBetFiches();
            _oInterface.enableSpin(true);
            return;
        }

        if (_oBlock.visible) {
            return;
        }

        _oBlock.visible = true;

        _oWheelTopAnim.hideBall();
        _oNeighborsPanel.hide();
        _oFinalBet.hide();
        _oInterface.enableSpin(false);
        _oInterface.displayAction(TEXT_SPINNING, "");

        $(s_oMain).trigger("bet_placed", _oMySeat.getCurBet());

        this._startRouletteAnim();
        this._startWheelTopAnim();
        this._startBallSpinAnim();

        this._setState(STATE_GAME_SPINNING);

        playSound("wheel_sound", 1, false);

    };

    this.setMoney = function (iMoney) {
        _oMySeat.setMoney(iMoney);
        _oInterface.refreshMoney(_oMySeat.getCredit());
    };

    this._onSitDown = function () {
        this._setState(STATE_GAME_WAITING_FOR_BET);
        _oMySeat.setInfo(TOTAL_MONEY, _oAttachFiches);
        _oInterface.refreshMoney(TOTAL_MONEY);
    };

    this._onShowBetOnTable = function (oParams, bRebet) {
        var szBut = oParams.button;
        var aNumbers = oParams.numbers;
        _iBetMult -= oParams.bet_mult;
        _aBetMultHistory.push(oParams.bet_mult);


        var iBetWin = oParams.bet_win;
        var iNumFiches = oParams.num_fiches;
        var iIndexFicheSelected;
        var iFicheValue;

        if (!bRebet) {
            iIndexFicheSelected = _oInterface.getCurFicheSelected();

            if (_aBetWinHistory.length === 0) {
                _aRebetHistory = new Array();
                _oInterface.disableRebet();
            }
            _aRebetHistory.push({
                button: oParams.button, numbers: oParams.numbers, bet_mult: oParams.bet_mult, bet_win: oParams.bet_win,
                num_fiches: oParams.num_fiches, neighbors: false, value: iIndexFicheSelected
            });
        } else {
            iIndexFicheSelected = oParams.value;
        }

        iFicheValue = s_oGameSettings.getFicheValues(iIndexFicheSelected);
        _aBetWinHistory.push(iBetWin);
        _aNumFicheHistory.push(iNumFiches);


        var iCurBet = _oMySeat.getCurBet();
        if ((_oMySeat.getCredit() - (iFicheValue * iNumFiches)) < 0) {
            //SHOW MSG BOX
            _oMsgBox.show(TEXT_ERROR_NO_MONEY_MSG);
            _oNeighborsPanel.reset();
            return;
        }
        if ((iCurBet + (iFicheValue * iNumFiches)) > MAX_BET) {
            _oMsgBox.show(TEXT_ERROR_MAX_BET_REACHED);
            _oNeighborsPanel.reset();
            return;
        }

        switch (szBut) {
            case "oBetVoisinsZero": {
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [0, 2, 3], 12, "bet_0_2_3");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [0, 2, 3], 12, "bet_0_2_3");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [4, 7], 18, "bet_4_7");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [12, 15], 18, "bet_12_15");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [19, 22], 18, "bet_19_22");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [25, 26, 28, 29], 9, "bet_25_26_28_29");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [25, 26, 28, 29], 9, "bet_25_26_28_29");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [32, 35], 18, "bet_32_35");
                break;
            }
            case "oBetTier": {
                _oMySeat.createPileForTier(iFicheValue, iIndexFicheSelected, aNumbers, iBetWin, iNumFiches);
                break;
            }
            case "oBetOrphelins": {
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [1], 36, "bet_1");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [6, 9], 18, "bet_6_9");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [14, 17], 18, "bet_14_17");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [17, 20], 18, "bet_17_20");
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, [31, 34], 18, "bet_31_34");
                break;
            }
            case "oBetFinalsBet": {
                _oMySeat.createPileForMultipleNumbers(iFicheValue, iIndexFicheSelected, aNumbers, iBetWin, iNumFiches);
                break;
            }
            default: {
                _oMySeat.addFicheOnTable(iFicheValue, iIndexFicheSelected, aNumbers, iBetWin, szBut);
            }
        }
        _oInterface.refreshMoney(_oMySeat.getCredit());
        _oInterface.enableSpin(true);

        playSound("chip", 1, false);

    };

    this._onShowBetOnTableFromNeighbors = function (oParams, bRebet) {
        var aNumbers = oParams.numbers;
        _iBetMult -= oParams.bet_mult;
        _aBetMultHistory.push(oParams.bet_mult);

        var iBetWin = oParams.bet_win;
        var iNumFiches = oParams.num_fiches;
        if (!bRebet) {
            if (_aBetWinHistory.length === 0) {
                _aRebetHistory = new Array();
                _oInterface.disableRebet();
            }
            _aRebetHistory.push({
                button: oParams.button, numbers: oParams.numbers, bet_mult: oParams.bet_mult, bet_win: oParams.bet_win,
                num_fiches: oParams.num_fiches, value: _oInterface.getCurFicheSelected(), num_clicked: oParams.num_clicked, neighbors: true
            });
        }

        _aBetWinHistory.push(iBetWin);
        _aNumFicheHistory.push(iNumFiches);

        var iFicheValue = s_oGameSettings.getFicheValues(oParams.value);


        if ((iFicheValue * iNumFiches) > _oMySeat.getCredit()) {
            //SHOW MSG BOX
            _oMsgBox.show(TEXT_ERROR_NO_MONEY_MSG);
            _oNeighborsPanel.reset();
            return;
        }


        _oMySeat.createPileForMultipleNumbers(iFicheValue, oParams.value, aNumbers, iBetWin, iNumFiches);

        _oInterface.refreshMoney(_oMySeat.getCredit());
        _oInterface.enableSpin(true);

        playSound("chip", 1, false);
    };

    this._onShowEnlight = function (oParams) {
        var aBets = oParams.numbers;

        for (var i = 0; i < aBets.length; i++) {
            _aEnlights["oEnlight_" + aBets[i]].show();
        }

        var szEnlight = oParams.enlight;
        if (szEnlight) {
            _aEnlights["oEnlight_" + szEnlight].show();
        }
    };

    this._onHideEnlight = function (oParams) {
        var aBets = oParams.numbers;
        for (var i = 0; i < aBets.length; i++) {
            _aEnlights["oEnlight_" + aBets[i]].hide();
        }

        var szEnlight = oParams.enlight;
        if (szEnlight) {
            _aEnlights["oEnlight_" + szEnlight].hide();
        }
    };

    this.onClearLastBet = function () {
        if (_aBetMultHistory.length > 0) {
            var iBetMultToRemove = _aBetMultHistory.pop();
            _iBetMult += iBetMultToRemove;
        }


        _oMySeat.clearLastBet(_aBetWinHistory.pop(), _aNumFicheHistory.pop());
        _oInterface.refreshMoney(_oMySeat.getCredit());
        _oNeighborsPanel.clearLastBet();
        if (_aRebetHistory.length > 0) {
            _aRebetHistory.pop();
        }

        if (_aRebetHistory.length === 0) {
            _oInterface.enableSpin(false);
        }
    };

    this.onClearAllBets = function () {
        _oMySeat.clearAllBets();
        _oInterface.refreshMoney(_oMySeat.getCredit());
        _oInterface.enableSpin(false);
        _oNeighborsPanel.reset();
        _aRebetHistory = new Array();
        _iBetMult = 37;
    };

    this.onRebet = function () {
        for (var i = 0; i < _aRebetHistory.length; i++) {
            if (_aRebetHistory[i].neighbors === true) {
                //this._onShowBetOnTableFromNeighbors(_aRebetHistory[i],true);
                _oNeighborsPanel.rebet(_aRebetHistory[i].num_clicked);
            } else {
                this._onShowBetOnTable(_aRebetHistory[i], true);
            }

        }
    };

    this.onFinalBetShown = function () {
        if (_oFinalBet.isVisible()) {
            _oFinalBet.hide();
        } else {
            _oFinalBet.show();
        }
    };

    this.onOpenNeighbors = function () {
        _oFinalBet.hide();
        _oNeighborsPanel.showPanel(_oInterface.getCurFicheSelected(), _oMySeat.getCredit());
    };
    var tokenAddress = "0x401D983FC3EA9B23D2f6014920b0dE66D76b5b27";

    this.onExit = async function () {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        console.log(" " + bettype + " " + number + " " + tokenAddress);
        $(s_oMain).trigger("share_event", _oMySeat.getCredit());
    };

    this._updateWaitingBet = function () {
        if (_oNeighborsPanel.isVisible()) {
            return;
        }

        if (TIME_WAITING_BET === 0) {
            _oInterface.displayAction(TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET,
                TEXT_DISPLAY_MSG_WAITING_BET);
        } else {
            _iTimeElaps += s_iTimeElaps;
            if (_iTimeElaps > TIME_WAITING_BET) {
                _iTimeElaps = 0;
                this.onSpin();
            } else {
                var iCountDown = Math.floor((TIME_WAITING_BET - _iTimeElaps) / 1000);

                _oInterface.displayAction(TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET,
                    TEXT_DISPLAY_MSG_WAITING_BET + " " + iCountDown);
            }
        }


    };

    this._updateSpinning = function () {
        _iTimeElaps += s_iTimeElaps;

        if (_oWheelTopAnim.getCurrentFrame() === (NUM_WHEEL_TOP_FRAMES - 1)) {
            _oWheelTopAnim.playToFrame(1);
        } else {
            _oWheelTopAnim.nextFrame();
        }

        if (_iTimeElaps > TIME_SPINNING) {
            if (_oWheelTopAnim.getCurrentFrame() === _iFrameToStop) {
                this._rouletteAnimEnded();
            }
        }
    };

    this._updateShowWinner = function () {
        _iTimeElaps += s_iTimeElaps;
        if (_iTimeElaps > TIME_SHOW_WINNER) {
            _iTimeElaps = 0;
            this._setState(STATE_DISTRIBUTE_FICHES);
        }
    };

    this._updateDistributeFiches = function () {
        _iTimeElaps += s_iTimeElaps;
        if (_iTimeElaps > TIME_FICHES_MOV) {
            _iTimeElaps = 0;
            playSound("fiche_collect", 1, false);
            this._resetTable();
        } else {
            var fLerp = easeInOutCubic(_iTimeElaps, 0, 1, TIME_FICHES_MOV);
            for (var i = 0; i < _aFichesToMove.length; i++) {
                _aFichesToMove[i].updatePos(fLerp);
            }
        }
    };

    this.update = function () {
        if (_bUpdate === false) {
            return;
        }

        switch (_iState) {
            case STATE_GAME_WAITING_FOR_BET: {
                this._updateWaitingBet();
                break;
            }
            case STATE_GAME_SPINNING: {
                this._updateSpinning();
                break;
            }
            case STATE_GAME_SHOW_WINNER: {
                this._updateShowWinner();
                break;
            }
            case STATE_DISTRIBUTE_FICHES: {
                this._updateDistributeFiches();
                break;
            }
        }

        _oWheelAnim.update();
    };

    s_oGame = this;

    TOTAL_MONEY = oData.money;
    MIN_BET = oData.min_bet;
    MAX_BET = oData.max_bet;
    TIME_WAITING_BET = oData.time_bet;
    TIME_SHOW_WINNER = oData.time_winner;
    WIN_OCCURRENCE = oData.win_occurrence;

    NUM_HAND_FOR_ADS = oData.num_hand_before_ads;
    _iCasinoCash = oData.casino_cash;

    this._init();
}

var s_oGame;
var s_oTweenController;
var s_oGameSettings;