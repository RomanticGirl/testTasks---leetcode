"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DistributionOfPrizes(coinAvailable, participantsRequested) {
    var answer = [];
    var answer2 = [];
    var objectionablePayment = {};
    for (var i_1 = 0; i_1 < participantsRequested.length; i_1++) {
        if (participantsRequested[i_1].indexOf("/") === -1) {
            coinAvailable[participantsRequested[i_1]] -= 1;
            answer[i_1] = participantsRequested[i_1];
            answer2[i_1] = participantsRequested[i_1];
        }
        else {
            objectionablePayment[i_1] = participantsRequested[i_1];
        }
    }
    for (var key in coinAvailable) {
        if (coinAvailable[key] === 0) {
            delete coinAvailable[key];
        }
        if (coinAvailable[key] < 0) {
            return null;
        }
    }
    for (var key in objectionablePayment) {
        var firstVariantOfSplit = objectionablePayment[key].split(' / ');
        var secondVariantOfSplit = objectionablePayment[key].split('/');
        if (firstVariantOfSplit.length > 1) {
            for (var i = 0; i < firstVariantOfSplit.length; i++) {
                if (coinAvailable[firstVariantOfSplit[i]] > 0) {
                    if (answer[Number(key)]) {
                        coinAvailable[answer[Number(key)]] += 1;
                        coinAvailable[firstVariantOfSplit[i]] -= 1;
                        answer2[Number(key)] = firstVariantOfSplit[i];
                    }
                    else {
                        coinAvailable[firstVariantOfSplit[i]] -= 1;
                        answer[Number(key)] = firstVariantOfSplit[i];
                    }
                }
                else {
                    if (answer[Number(key)]) {
                        coinAvailable[answer[Number(key)]] += 1;
                        coinAvailable[firstVariantOfSplit[i]] -= 1;
                        answer2[Number(key)] = answer[Number(key)];
                    }
                }
            }
        }
        else {
            for (var i = 0; i < secondVariantOfSplit.length; i++) {
                if (coinAvailable[secondVariantOfSplit[i]] > 0) {
                    if (answer[Number(key)]) {
                        coinAvailable[secondVariantOfSplit[i]] -= 1;
                        answer2[Number(key)] = firstVariantOfSplit[i];
                    }
                    else {
                        coinAvailable[secondVariantOfSplit[i]] -= 1;
                        answer[Number(key)] = firstVariantOfSplit[i];
                    }
                }
                else {
                    if (answer[Number(key)]) {
                        coinAvailable[answer[Number(key)]] += 1;
                        coinAvailable[firstVariantOfSplit[i]] -= 1;
                        answer2[Number(key)] = answer[Number(key)];
                    }
                }
            }
        }
    }
    return [answer, answer2] || null;
}
var coinAvailable = { ETH: 4, TRON: 5, MATIC: 2, BTC: 2 };
var participantsRequested = ["ETH", "ETH", "ETH / TRON", "TRON / ETH", "TRON / MATIC", "TRON", "MATIC", "TRON", "MATIC", "BTC / MATIC / ETH", "BTC", "TRON / BTC / ETH"];
var res = DistributionOfPrizes(coinAvailable, participantsRequested);
exports.default = res;
