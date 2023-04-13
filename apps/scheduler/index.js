"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var rss_parser_1 = __importDefault(require("rss-parser"));
var database = new client_1.PrismaClient({
    log: [
        {
            emit: "stdout",
            level: "query"
        },
        {
            emit: "stdout",
            level: "error"
        },
        {
            emit: "stdout",
            level: "info"
        },
        {
            emit: "stdout",
            level: "warn"
        },
    ]
});
var scrape = function () { return __awaiter(void 0, void 0, void 0, function () {
    var parser, feeds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parser = new rss_parser_1["default"]();
                return [4 /*yield*/, database.feed.findMany({})];
            case 1:
                feeds = _a.sent();
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        feeds.forEach(function (feed) { return __awaiter(void 0, void 0, void 0, function () {
                            var externalFeed, created, lastPost;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, parser.parseURL(feed.feedUrl)];
                                    case 1:
                                        externalFeed = _a.sent();
                                        return [4 /*yield*/, Promise.all(externalFeed.items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                                                var _a;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            if (!item.isoDate || new Date(item.isoDate) <= feed.publishedAt) {
                                                                return [2 /*return*/];
                                                            }
                                                            return [4 /*yield*/, database.entry.create({
                                                                    data: {
                                                                        title: item.title,
                                                                        description: item.description,
                                                                        published: new Date(item.isoDate),
                                                                        feedId: feed.id,
                                                                        url: (_a = item.link) !== null && _a !== void 0 ? _a : ""
                                                                    }
                                                                })];
                                                        case 1: return [2 /*return*/, _b.sent()];
                                                    }
                                                });
                                            }); })).then(function (x) {
                                                return x
                                                    .filter(function (x) { return x !== undefined; })
                                                    .sort(function (a, b) { return a.published.getTime() - b.published.getTime(); });
                                            })];
                                    case 2:
                                        created = _a.sent();
                                        if (!(created && created.length > 0)) return [3 /*break*/, 4];
                                        lastPost = created[created.length - 1];
                                        if (!lastPost)
                                            return [2 /*return*/];
                                        return [4 /*yield*/, database.feed.update({
                                                where: {
                                                    id: feed.id
                                                },
                                                data: {
                                                    publishedAt: lastPost.published
                                                }
                                            })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); })();
                return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, scrape()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
