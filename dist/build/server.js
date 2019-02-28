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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/ConnectedPlayer.ts":
/*!***************************************!*\
  !*** ./src/server/ConnectedPlayer.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConnectedPlayer; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GameStateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameStateManager */ "./src/server/GameStateManager.ts");
/* harmony import */ var _shared_emitTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/emitTypes */ "./src/shared/emitTypes.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/shared/utils/ArrayUtils.ts");
/* harmony import */ var _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/LoopUtils */ "./src/shared/utils/LoopUtils.ts");
/* harmony import */ var _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/PlayerUtils */ "./src/shared/utils/PlayerUtils.ts");
/* harmony import */ var _utils_CardUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/CardUtils */ "./src/shared/utils/CardUtils.ts");







const { fromServer, toServer } = _shared_emitTypes__WEBPACK_IMPORTED_MODULE_2__["default"];
class ConnectedPlayer {
    constructor(socket) {
        this.socket = socket;
        this.resetGame = (playerCount) => {
            console.log(`${this.getPlayerDisplayText()} reset the game with ${playerCount} player${playerCount === 1 ? "" : "s"}`);
            _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].resetGame(playerCount);
        };
        this.buyCard = (boughtCard) => {
            if (!this.isMyTurn()) {
                console.log(`Player ${this.getPlayerNumber()} tried to buy a card out of turn.`);
                return;
            }
            const playPhase = _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayPhase();
            if (playPhase !== "buy") {
                console.log(`Player ${this.getPlayerNumber()} tried to buy a card but play phase is ${playPhase}.`);
                return;
            }
            console.log(`Player ${this.getPlayerNumber()} bought a ${boughtCard} card.`);
            _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].buyCard(this.playerIndex, boughtCard);
            _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].setPlayPhase("move");
        };
        this.moveChar = (charIndex, move) => {
            if (!this.isMyTurn()) {
                console.log(`Player ${this.getPlayerNumber()} tried to move their char ${charIndex + 1} out of turn.`);
                return;
            }
            if (_GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getCharDidMoveThisTurn(this.playerIndex, charIndex)) {
                console.log(`Player ${this.getPlayerNumber()} tried to move their char ${charIndex + 1} but that char has moved already.`);
                return;
            }
            const playPhase = _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayPhase();
            if (playPhase !== "move") {
                console.log(`Player ${this.getPlayerNumber()} tried to move their chars but play phase is ${playPhase}.`);
                return;
            }
            console.log(`Player ${this.getPlayerNumber()} moved char ${charIndex + 1} to (${move.x}, ${move.y}).`);
            const waitingOnChars = _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].moveChar(this.playerIndex, charIndex, move);
            const allMoved = waitingOnChars === 0;
            if (allMoved) {
                _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].setAllCharMovedThisTurn(this.playerIndex, false);
                _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].setPlayPhase("buy");
                _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].incrementTurn();
            }
        };
        this.initialize = (playerIndex, partialPlayerState) => {
            console.log(`initializing player ${playerIndex + 1}`, partialPlayerState);
            const player = _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer(playerIndex);
            if (player) {
                console.log(`Attempt to initialize player ${playerIndex + 1} failed.  Player is already initialized.`);
                return;
            }
            this.playerIndex = playerIndex;
            this.playerName = partialPlayerState.name;
            let playerState = Object.assign({}, partialPlayerState, { hand: [], deck: _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_3__["default"].shuffle([
                    ...this.makeCards(6, "hand"),
                    ...this.makeCards(4, "weapon")
                ]), discard: [] });
            const immutablePlayerState = _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_5__["default"].dealCards(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"](playerState), 5);
            const waitingOnPlayers = _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].initializePlayer(playerIndex, immutablePlayerState);
            const allPicked = waitingOnPlayers === 0;
            _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].setGameScreen(allPicked ? "table" : "characterSelect");
            console.log(`Player ${this.getPlayerNumber()} (${partialPlayerState.name}) has selected characters, ` + (waitingOnPlayers === 0 ? "all players ready" : (`still waiting on ${waitingOnPlayers} player` + (waitingOnPlayers === 1 ? "" : "s"))));
        };
        console.log(`${this.getPlayerDisplayText()} connected`);
        socket.emit(fromServer.playerConnected, _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].getGameState());
        socket.on(toServer.resetGame, this.resetGame);
        socket.on(toServer.initializePlayer, this.initialize);
        socket.on(toServer.buyCard, this.buyCard);
        socket.on(toServer.moveChar, this.moveChar);
    }
    getPlayerNumber() {
        return this.playerIndex + 1;
    }
    isMyTurn() {
        return _GameStateManager__WEBPACK_IMPORTED_MODULE_1__["default"].isPlayersTurn(this.playerIndex);
    }
    getPlayerDisplayText() {
        return this.getNumberedPlayerText() + `(${typeof this.playerName === "string" ? `${this.playerName} @ ` : ""}${this.getAddress()})`;
    }
    getNumberedPlayerText(noTrailingSpace) {
        const playerNumber = this.getPlayerNumber();
        return playerNumber ? `player ${playerNumber}${noTrailingSpace ? "" : " "}` : "";
    }
    getAddress() {
        return this.socket.handshake.address;
    }
    makeCards(num, type) {
        return _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_4__["default"].mapTimes(num, () => _utils_CardUtils__WEBPACK_IMPORTED_MODULE_6__["default"].createCard(type));
    }
}


/***/ }),

/***/ "./src/server/GameStateManager.ts":
/*!****************************************!*\
  !*** ./src/server/GameStateManager.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameStateManager; });
/* harmony import */ var _utils_EventDelegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/EventDelegate */ "./src/shared/utils/EventDelegate.ts");
/* harmony import */ var _server_initialGameState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @server/initialGameState */ "./src/server/initialGameState.ts");
/* harmony import */ var _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/GameUtils */ "./src/shared/utils/GameUtils.ts");
/* harmony import */ var _utils_CardUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/CardUtils */ "./src/shared/utils/CardUtils.ts");




class GameStateManager {
    static addUpdateListener(listener) {
        this.updateDelegate.addEventListener(listener);
    }
    static removeUpdateListener(listener) {
        this.updateDelegate.removeEventListener(listener);
    }
    static addResetListener(listener) {
        this.resetDelegate.addEventListener(listener);
    }
    static removeResetListener(listener) {
        this.resetDelegate.removeEventListener(listener);
    }
    static updateGameState(newGameState) {
        this.gameState = newGameState;
        this.updateDelegate.trigger(this.gameState);
    }
    static resetGame(playerCount) {
        this.gameState = Object(_server_initialGameState__WEBPACK_IMPORTED_MODULE_1__["immutableInitialGameState"])(playerCount);
        this.resetDelegate.trigger(this.gameState);
    }
    static initializePlayer(playerIndex, playerState) {
        let gameState = this.gameState;
        gameState = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].convertPlayerToTablePlayer(gameState, playerState, playerIndex);
        const waitingOnPlayers = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].countUnreadyPlayers(gameState);
        GameStateManager.updateGameState(gameState);
        return waitingOnPlayers;
    }
    static setGameScreen(screen) {
        GameStateManager.updateGameState(this.gameState.set("screen", screen));
    }
    static buyCard(playerIndex, boughtCard) {
        const gameState = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].addCardToDiscard(this.gameState, playerIndex, _utils_CardUtils__WEBPACK_IMPORTED_MODULE_3__["default"].createImmutableCard(boughtCard));
        GameStateManager.updateGameState(gameState);
    }
    static setPlayPhase(gamePhase) {
        GameStateManager.updateGameState(this.gameState.set("playPhase", gamePhase));
    }
    static moveChar(playerIndex, charIndex, move) {
        let gameState = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].moveChar(this.gameState, playerIndex, charIndex, move);
        gameState = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].setCharMovedThisTurn(gameState, playerIndex, charIndex, true);
        const waitingOnChars = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].countUnmovedPlayers(gameState, playerIndex);
        if (waitingOnChars === 0) {
            gameState = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].discardHand(gameState, playerIndex);
            gameState = _utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].dealCards(gameState, playerIndex, 5);
        }
        GameStateManager.updateGameState(gameState);
        return waitingOnChars;
    }
    static setAllCharMovedThisTurn(playerIndex, movedThisTurn) {
        this.updateGameState(_utils_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].setAllCharMovedThisTurn(this.gameState, playerIndex, movedThisTurn));
    }
    static incrementTurn() {
        let whosTurn = this.gameState.get("whosTurn");
        whosTurn = (whosTurn + 1) % this.gameState.get("playerCount");
        this.updateGameState(this.gameState.set("whosTurn", whosTurn));
    }
    static getGameState() {
        return this.gameState;
    }
    static getPlayer(playerIndex) {
        return this.gameState.get("players").get(playerIndex);
    }
    static isPlayersTurn(playerIndex) {
        return this.gameState.get("whosTurn") === playerIndex;
    }
    static getPlayPhase() {
        return this.gameState.get("playPhase");
    }
    static getCharDidMoveThisTurn(playerIndex, charIndex) {
        return this.gameState.get("players").get(playerIndex).get("chars").get(charIndex).get("movedThisTurn");
    }
}
GameStateManager.gameState = null;
GameStateManager.updateDelegate = new _utils_EventDelegate__WEBPACK_IMPORTED_MODULE_0__["default"]();
GameStateManager.resetDelegate = new _utils_EventDelegate__WEBPACK_IMPORTED_MODULE_0__["default"]();
;


/***/ }),

/***/ "./src/server/initialGameState.ts":
/*!****************************************!*\
  !*** ./src/server/initialGameState.ts ***!
  \****************************************/
/*! exports provided: immutableInitialGameState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "immutableInitialGameState", function() { return immutableInitialGameState; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/LoopUtils */ "./src/shared/utils/LoopUtils.ts");


const initialGameState = (playerCount) => ({
    players: _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_1__["default"].mapTimes(playerCount, () => null),
    playerReadyState: _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_1__["default"].mapTimes(playerCount, () => false),
    screen: "characterSelect",
    playerCount: playerCount,
    playPhase: "buy",
    whosTurn: 0,
    boardHeight: 20,
    boardWidth: 30,
});
const immutableInitialGameState = (playerCount) => immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"](initialGameState(playerCount));
/* harmony default export */ __webpack_exports__["default"] = (initialGameState);


/***/ }),

/***/ "./src/server/routing.ts":
/*!*******************************!*\
  !*** ./src/server/routing.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


const app = express__WEBPACK_IMPORTED_MODULE_0__();
app.get("/", (req, res) => res.sendFile(path__WEBPACK_IMPORTED_MODULE_1__["join"](__dirname, "../index.html")));
app.get("/assets/*", (req, res) => res.sendFile(path__WEBPACK_IMPORTED_MODULE_1__["join"](__dirname, "../", req.url)));
app.get("/build/*", (req, res) => res.sendFile(path__WEBPACK_IMPORTED_MODULE_1__["join"](__dirname, "../", req.url)));
/* harmony default export */ __webpack_exports__["default"] = (app);


/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _socketStuff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socketStuff */ "./src/server/socketStuff.ts");
/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routing */ "./src/server/routing.ts");
console.clear();



const app = express__WEBPACK_IMPORTED_MODULE_0__();
const server = __webpack_require__(/*! http */ "http").Server(app);
Object(_socketStuff__WEBPACK_IMPORTED_MODULE_1__["default"])(server);
app.use(_routing__WEBPACK_IMPORTED_MODULE_2__["default"]);
server.listen(3000, "0.0.0.0");


/***/ }),

/***/ "./src/server/socketStuff.ts":
/*!***********************************!*\
  !*** ./src/server/socketStuff.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _server_GameStateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @server/GameStateManager */ "./src/server/GameStateManager.ts");
/* harmony import */ var _shared_emitTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/emitTypes */ "./src/shared/emitTypes.ts");
/* harmony import */ var _ConnectedPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConnectedPlayer */ "./src/server/ConnectedPlayer.ts");



const { fromServer } = _shared_emitTypes__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ __webpack_exports__["default"] = ((server) => {
    const io = __webpack_require__(/*! socket.io */ "socket.io")(server);
    _server_GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].addResetListener((gameState) => io.emit(fromServer.gameReset, gameState.toJS()));
    _server_GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].addUpdateListener((gameState) => io.emit(fromServer.gameStateUpdated, gameState.toJS()));
    io.emit(fromServer.gameReset);
    io.on("connection", socket => {
        new _ConnectedPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](socket);
    });
});


/***/ }),

/***/ "./src/shared/emitTypes.ts":
/*!*********************************!*\
  !*** ./src/shared/emitTypes.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    fromServer: {
        playerConnected: "connection made",
        gameStateUpdated: "game state updated",
        gameReset: "game state reset",
    },
    toServer: {
        initializePlayer: "initialize player state",
        resetGame: "reset game",
        buyCard: "buy card",
        moveChar: "move char",
    },
});


/***/ }),

/***/ "./src/shared/utils/ArrayUtils.ts":
/*!****************************************!*\
  !*** ./src/shared/utils/ArrayUtils.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ArrayUtils; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);

class ArrayUtils {
    static shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    static shuffleImmutable(arr) {
        // ughhh
        return immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"](this.shuffle(arr.toJS()));
    }
}


/***/ }),

/***/ "./src/shared/utils/CardUtils.ts":
/*!***************************************!*\
  !*** ./src/shared/utils/CardUtils.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CardUtils; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);


class CardUtils {
    static createImmutableCard(type) {
        return immutable__WEBPACK_IMPORTED_MODULE_1__["fromJS"](this.createCard(type));
    }
    static createCard(type) {
        return {
            type: type,
            uid: uuid__WEBPACK_IMPORTED_MODULE_0__["v4"](),
        };
    }
}


/***/ }),

/***/ "./src/shared/utils/CharUtils.ts":
/*!***************************************!*\
  !*** ./src/shared/utils/CharUtils.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CharUtils; });
class CharUtils {
    static moveChar(character, move) {
        return character.set("x", move.x).set("y", move.y);
    }
    static convertToTableChar(character, position) {
        return character
            .set("maxHP", character.get("hp"))
            .set("x", position.x)
            .set("y", position.y)
            .set("movedThisTurn", false);
    }
    static countUnmovedPlayers(chars) {
        return chars.reduce((charCount, char) => {
            if (char.get("movedThisTurn"))
                charCount--;
            return charCount;
        }, chars.size);
    }
}


/***/ }),

/***/ "./src/shared/utils/DeckUtils.ts":
/*!***************************************!*\
  !*** ./src/shared/utils/DeckUtils.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DeckUtils; });
class DeckUtils {
    static dealAllCardsToDeck(fromDeck, toDeck) {
        return this.dealCardsToDeck(fromDeck, toDeck, fromDeck.size);
    }
    static dealCardsToDeck(fromDeck, toDeck, cardCount) {
        const dealtCards = DeckUtils.dealCards(fromDeck, cardCount);
        const newToDeck = this.addCardsToTop(toDeck, dealtCards.dealt);
        return { fromDeck: dealtCards.deck, toDeck: newToDeck };
    }
    static dealCards(deck, cardCount) {
        return {
            deck: deck.slice(0, -cardCount),
            dealt: deck.slice(-cardCount),
        };
    }
    static addCardsToTop(deck, cards) {
        return deck.concat(cards);
    }
    static addCardsToBottom(deck, cards) {
        return cards.concat(deck);
    }
}


/***/ }),

/***/ "./src/shared/utils/EventDelegate.ts":
/*!*******************************************!*\
  !*** ./src/shared/utils/EventDelegate.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventDelegate; });
class EventDelegate {
    constructor() {
        this.listeners = [];
        this.trigger = (data) => {
            this.listeners.forEach(listener => listener(data));
        };
    }
    addEventListener(listener) {
        if (this.listeners.indexOf(listener) === -1)
            this.listeners.push(listener);
        else
            console.warn("Listner was already added.");
    }
    removeEventListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1)
            this.listeners.splice(index, 1);
    }
    clearEventListeners() {
        this.listeners = [];
    }
    getListenerCount() {
        return this.listeners.length;
    }
    hasListeners() {
        return this.listeners.length !== 0;
    }
}


/***/ }),

/***/ "./src/shared/utils/GameUtils.ts":
/*!***************************************!*\
  !*** ./src/shared/utils/GameUtils.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gameutils; });
/* harmony import */ var _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerUtils */ "./src/shared/utils/PlayerUtils.ts");

class Gameutils {
    static dealCards(gameState, playerIndex, cardCount) {
        const player = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealCards(gameState.get("players").get(playerIndex), cardCount);
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static moveChar(gameState, playerIndex, charIndex, move) {
        const player = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].moveCharInPlayer(gameState.get("players").get(playerIndex), charIndex, move);
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static setPlayer(gameState, playerIndex, player) {
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static countUnreadyPlayers(gameState) {
        return _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].countUnreadyPlayers(gameState.get("players"));
    }
    static countUnmovedPlayers(gameState, playerIndex) {
        return _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].countUnmovedPlayers(gameState.get("players").get(playerIndex));
    }
    static setAllCharMovedThisTurn(gameState, playerIndex, movedThisTurn) {
        const player = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].setAllCharMovedThisTurn(gameState.get("players").get(playerIndex), movedThisTurn);
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static convertPlayerToTablePlayer(gameState, player, playerIndex) {
        const tablePlayer = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].convertPlayerToTablePlayer(player, playerIndex, gameState.get("boardWidth"), gameState.get("boardHeight"));
        const players = gameState.get("players").set(playerIndex, tablePlayer);
        return gameState.set("players", players);
    }
    static discardHand(gameState, playerIndex) {
        const player = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].discardHand(gameState.get("players").get(playerIndex));
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static addCardToDiscard(gameState, playerIndex, card) {
        const player = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].addCardToDiscard(gameState.get("players").get(playerIndex), card);
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static setCharMovedThisTurn(gameState, playerIndex, charIndex, movedThisTurn) {
        const player = _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].setCharMovedThisTurn(gameState.get("players").get(playerIndex), charIndex, movedThisTurn);
        const players = gameState.get("players").set(playerIndex, player);
        return gameState.set("players", players);
    }
    static allMovesTaken(gameState, playerIndex) {
        return _PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].allMovesTaken(gameState.get("players").get(playerIndex));
    }
}


/***/ }),

/***/ "./src/shared/utils/LoopUtils.ts":
/*!***************************************!*\
  !*** ./src/shared/utils/LoopUtils.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoopUtils; });
class LoopUtils {
    static mapTimes(times, callback) {
        const arr = [];
        for (let i = 0; i < times; i++) {
            arr.push(callback(i));
        }
        return arr;
    }
}


/***/ }),

/***/ "./src/shared/utils/PlayerUtils.ts":
/*!*****************************************!*\
  !*** ./src/shared/utils/PlayerUtils.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerUtils; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/DeckUtils */ "./src/shared/utils/DeckUtils.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/shared/utils/ArrayUtils.ts");
/* harmony import */ var _CharUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CharUtils */ "./src/shared/utils/CharUtils.ts");




class PlayerUtils {
    static dealCards(player, cardCount) {
        const deckSize = player.get("deck").size;
        if (cardCount > deckSize) {
            player = this.dealCardsFromDeckToDeck(player, "deck", "hand", deckSize);
            player = this.shuffleDiscardToDeck(player);
            player = this.dealCardsFromDeckToDeck(player, "deck", "hand", cardCount - deckSize);
        }
        else {
            player = this.dealCardsFromDeckToDeck(player, "deck", "hand", cardCount);
        }
        return player;
    }
    static dealCardsFromDeckToDeck(player, fromDeck, toDeck, cardCount) {
        const fromTo = _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_1__["default"].dealCardsToDeck(player.get(fromDeck), player.get(toDeck), cardCount);
        player = player.set(fromDeck, fromTo.fromDeck);
        player = player.set(toDeck, fromTo.toDeck);
        return player;
    }
    static dealAllCardsFromDeckToDeck(player, fromDeck, toDeck) {
        return this.dealCardsFromDeckToDeck(player, fromDeck, toDeck, player.get(fromDeck).size);
    }
    static shuffleDeck(player, deckType) {
        return player.set(deckType, _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__["default"].shuffleImmutable(player.get(deckType)));
    }
    static discardHand(player) {
        return this.dealAllCardsFromDeckToDeck(player, "hand", "discard");
    }
    static shuffleDiscardToDeck(player) {
        player = this.dealAllCardsFromDeckToDeck(player, "discard", "deck");
        return this.shuffleDeck(player, "deck");
    }
    static addCardToDiscard(player, card) {
        return player.set("discard", _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_1__["default"].addCardsToTop(player.get("discard"), immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"]([card])));
    }
    static convertPlayerToTablePlayer(player, playerIndex, boardWidth, boardHeight) {
        const positions = this.getPlayerPosition(playerIndex, boardWidth, boardHeight);
        const tablePlayer = player;
        const chars = player.get("chars");
        const tableChars = chars.map((char, c) => _CharUtils__WEBPACK_IMPORTED_MODULE_3__["default"].convertToTableChar(char, positions[c]));
        // FIXME: baaaad typing
        return tablePlayer.set("chars", tableChars);
    }
    static countUnreadyPlayers(players) {
        return players.reduce((playerCount, player) => {
            if (player)
                playerCount--;
            return playerCount;
        }, players.size);
    }
    static countUnmovedPlayers(player) {
        return _CharUtils__WEBPACK_IMPORTED_MODULE_3__["default"].countUnmovedPlayers(player.get("chars"));
    }
    static moveCharInPlayer(player, charIndex, move) {
        const char = _CharUtils__WEBPACK_IMPORTED_MODULE_3__["default"].moveChar(player.get("chars").get(charIndex), move);
        const chars = player.get("chars").set(charIndex, char);
        return player.set("chars", chars);
    }
    static setAllCharMovedThisTurn(player, movedThisTurn) {
        const chars = player.get("chars").map(char => char.set("movedThisTurn", movedThisTurn));
        return player.set("chars", chars);
    }
    static setCharMovedThisTurn(player, charIndex, movedThisTurn) {
        const char = player.get("chars").get(charIndex).set("movedThisTurn", movedThisTurn);
        const chars = player.get("chars").set(charIndex, char);
        return player.set("chars", chars);
    }
    static allMovesTaken(player) {
        return player.get("chars").every(char => char.get("movedThisTurn"));
    }
    static getPlayerPosition(playerIndex, boardWidth, boardHeight) {
        switch (playerIndex) {
            case 0:
                return [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                ];
            case 1:
                return [
                    { x: boardWidth - 1, y: boardHeight - 1 },
                    { x: boardWidth - 1, y: boardHeight - 2 },
                    { x: boardWidth - 1, y: boardHeight - 3 },
                ];
            case 2:
                return [
                    { x: 0, y: boardHeight - 1 },
                    { x: 1, y: boardHeight - 1 },
                    { x: 2, y: boardHeight - 1 },
                ];
            case 3:
                return [
                    { x: boardWidth - 1, y: 0 },
                    { x: boardWidth - 2, y: 0 },
                    { x: boardWidth - 3, y: 0 },
                ];
            default:
                throw `Board does not support this many players.  Requested start location for player ${playerIndex + 1},  max player count is 2`;
        }
    }
}


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "immutable":
/*!****************************!*\
  !*** external "immutable" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map