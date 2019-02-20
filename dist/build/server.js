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
/* harmony import */ var _GameStateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameStateManager */ "./src/server/GameStateManager.ts");
/* harmony import */ var _shared_emitTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/emitTypes */ "./src/shared/emitTypes.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/shared/utils/ArrayUtils.ts");
/* harmony import */ var _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/LoopUtils */ "./src/shared/utils/LoopUtils.ts");
/* harmony import */ var _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @utils/PlayerUtils */ "./src/shared/utils/PlayerUtils.ts");





const { fromServer, toServer } = _shared_emitTypes__WEBPACK_IMPORTED_MODULE_1__["default"];
class ConnectedPlayer {
    constructor(socket) {
        this.socket = socket;
        this.resetGame = (playerCount) => {
            console.log(`${this.getPlayerDisplayText()} reset the game with ${playerCount} player${playerCount === 1 ? "" : "s"}`);
            _GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].resetGame(playerCount);
        };
        this.takeTurn = (boughtCard) => {
            if (!this.isMyTurn()) {
                console.log(`Player ${this.getPlayerNumber()} tried to take a turn illegally.`);
                return;
            }
            console.log(`Player ${this.getPlayerNumber()} took a turn and bought a ${boughtCard} card.`);
            _GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].takeTurn(this.playerIndex, boughtCard);
        };
        this.initialize = (playerIndex, partialPlayerState) => {
            console.log(`initializing player ${playerIndex + 1}`, partialPlayerState);
            const player = _GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayer(playerIndex);
            if (player) {
                console.log(`Attempt to initialize player ${playerIndex + 1} failed.  Player is already initialized.`);
                return;
            }
            this.playerIndex = playerIndex;
            this.playerName = partialPlayerState.name;
            const playerState = Object.assign({}, partialPlayerState, { hand: [], deck: _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_2__["default"].shuffle([
                    ...this.makeCards(6, "hand"),
                    ...this.makeCards(4, "weapon")
                ]), discard: [] });
            _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_4__["default"].dealCards(playerState, 5);
            const waitinOnCount = _GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].initializePlayer(playerIndex, playerState);
            console.log(`Player ${this.getPlayerNumber()} (${partialPlayerState.name}) has selected characters, ` + (waitinOnCount === 0 ? "all players ready" : (`still waiting on ${waitinOnCount} player` + (waitinOnCount === 1 ? "" : "s"))));
        };
        console.log(`${this.getPlayerDisplayText()} connected`);
        socket.emit(fromServer.playerConnected, _GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].getGameState());
        socket.on(toServer.resetGame, this.resetGame);
        socket.on(toServer.initializePlayer, this.initialize);
        socket.on(toServer.takeTurn, this.takeTurn);
    }
    getPlayerNumber() {
        return this.playerIndex + 1;
    }
    isMyTurn() {
        return _GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].isPlayersTurn(this.playerIndex);
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
        return _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_3__["default"].mapTimes(num, () => type);
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
/* harmony import */ var _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/PlayerUtils */ "./src/shared/utils/PlayerUtils.ts");
/* harmony import */ var _utils_EventDelegate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/EventDelegate */ "./src/shared/utils/EventDelegate.ts");
/* harmony import */ var _initialGameState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initialGameState */ "./src/server/initialGameState.ts");



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
        this.gameState = Object(_initialGameState__WEBPACK_IMPORTED_MODULE_2__["default"])(playerCount);
        this.resetDelegate.trigger(this.gameState);
    }
    static updatePartialGameState(partialGameState) {
        const newGameState = Object.assign({}, this.gameState);
        Object.keys(partialGameState).forEach((key) => {
            newGameState[key] = partialGameState[key];
        });
        this.updateGameState(newGameState);
    }
    static initializePlayer(playerIndex, playerState) {
        const { players, boardWidth, boardHeight } = this.gameState;
        players[playerIndex] = _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].makeTablePlayer(playerState, playerIndex, boardWidth, boardHeight);
        const waitingOnPlayers = players.reduce((playerCount, player) => {
            if (player)
                playerCount--;
            return playerCount;
        }, players.length);
        const allPicked = waitingOnPlayers === 0;
        GameStateManager.updatePartialGameState({
            players: players,
            screen: allPicked ? "table" : "characterSelect",
        });
        return waitingOnPlayers;
    }
    static takeTurn(playerIndex, boughtCard) {
        const { players } = this.gameState;
        const player = players[playerIndex];
        _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].discardHand(player);
        _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].addCardToDiscard(player, boughtCard);
        _utils_PlayerUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealCards(player, 5);
        let { whosTurn } = this.gameState;
        whosTurn = (whosTurn + 1) % this.gameState.playerCount;
        console.log(player, players);
        GameStateManager.updatePartialGameState({
            players: players,
            whosTurn: whosTurn,
        });
    }
    static getGameState() {
        return this.gameState;
    }
    static getPlayer(playerIndex) {
        return this.gameState.players[playerIndex];
    }
    static isPlayersTurn(playerIndex) {
        return this.gameState.whosTurn === playerIndex;
    }
}
GameStateManager.gameState = null;
GameStateManager.updateDelegate = new _utils_EventDelegate__WEBPACK_IMPORTED_MODULE_1__["default"]();
GameStateManager.resetDelegate = new _utils_EventDelegate__WEBPACK_IMPORTED_MODULE_1__["default"]();
;


/***/ }),

/***/ "./src/server/initialGameState.ts":
/*!****************************************!*\
  !*** ./src/server/initialGameState.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/LoopUtils */ "./src/shared/utils/LoopUtils.ts");

const initialGameState = (playerCount) => ({
    players: _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_0__["default"].mapTimes(playerCount, () => null),
    playerReadyState: _utils_LoopUtils__WEBPACK_IMPORTED_MODULE_0__["default"].mapTimes(playerCount, () => false),
    screen: "characterSelect",
    playerCount: playerCount,
    whosTurn: 0,
    boardHeight: 20,
    boardWidth: 30,
});
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
    _server_GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].addResetListener(gameState => io.emit(fromServer.gameReset, gameState));
    _server_GameStateManager__WEBPACK_IMPORTED_MODULE_0__["default"].addUpdateListener(gameState => io.emit(fromServer.gameStateUpdated, gameState));
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
        takeTurn: "take turn",
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
class ArrayUtils {
    static shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
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
        this.dealCardsToDeck(fromDeck, toDeck, fromDeck.length);
    }
    static dealCardsToDeck(fromDeck, toDeck, cardCount) {
        const cards = DeckUtils.dealCards(fromDeck, cardCount);
        this.addCardsToTop(toDeck, cards);
    }
    static dealCards(deck, cardCount) {
        return deck.splice(-1 * cardCount);
    }
    static addCardsToTop(deck, cards) {
        const multiCards = typeof cards === "string" ? [cards] : cards;
        deck.push(...multiCards);
    }
    static addCardsToBottom(deck, cards) {
        const multiCards = typeof cards === "string" ? [cards] : cards;
        deck.unshift(...multiCards);
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
/* harmony import */ var _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/DeckUtils */ "./src/shared/utils/DeckUtils.ts");
/* harmony import */ var _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/ArrayUtils */ "./src/shared/utils/ArrayUtils.ts");


class PlayerUtils {
    static dealCards(player, cardCount) {
        const deckSize = player.deck.length;
        if (cardCount > deckSize) {
            _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealCardsToDeck(player.deck, player.hand, deckSize);
            this.shuffleDiscardToDeck(player);
            _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealCardsToDeck(player.deck, player.hand, cardCount - deckSize);
        }
        else {
            _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealCardsToDeck(player.deck, player.hand, cardCount);
        }
    }
    static discardHand(player) {
        _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealAllCardsToDeck(player.hand, player.discard);
    }
    static shuffleDiscardToDeck(player) {
        _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__["default"].dealAllCardsToDeck(player.discard, player.deck);
        player.deck = _utils_ArrayUtils__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(player.deck);
    }
    static addCardToDiscard(player, card) {
        _utils_DeckUtils__WEBPACK_IMPORTED_MODULE_0__["default"].addCardsToTop(player.discard, card);
    }
    static makeTablePlayer(player, playerIndex, boardWidth, boardHeight) {
        const positions = this.getPlayerPosition(playerIndex, boardWidth, boardHeight);
        return Object.assign({}, player, { chars: player.chars.map((char, c) => (Object.assign({}, char, { maxHP: char.hp, x: positions[c].x, y: positions[c].y }))) });
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

/***/ })

/******/ });
//# sourceMappingURL=server.js.map