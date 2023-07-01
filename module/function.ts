
function DistributionOfPrizes(coinAvailable: Record<string, number>, participantsRequested: string[]): [string[], string[]] | null {
    const answer: string[] = [];
    const answer2: string[] = [];
    const objectionablePayment: Record<number, string> = {};
    for (let i = 0; i < participantsRequested.length; i++) {
        if (participantsRequested[i].indexOf("/") === -1) {
            coinAvailable[participantsRequested[i]] -= 1;
            answer[i] = participantsRequested[i];
            answer2[i] = participantsRequested[i];
        } else {
            objectionablePayment[i] = participantsRequested[i];
        }
    }
    for (let key in coinAvailable) {
        if (coinAvailable[key] === 0) {
            delete coinAvailable[key];
        }
        if (coinAvailable[key] < 0) {
            return null;
        }
    }



    for (let key in objectionablePayment) {
        const firstVariantOfSplit: string[] = objectionablePayment[key].split(' / ');
        const secondVariantOfSplit: string[] = objectionablePayment[key].split('/');
        if (firstVariantOfSplit.length > 1) {
            for (var i = 0; i < firstVariantOfSplit.length; i++) {
                if (coinAvailable[firstVariantOfSplit[i]] > 0) {
                    if (answer[Number(key)]) {
                        coinAvailable[answer[Number(key)]] += 1;
                        coinAvailable[firstVariantOfSplit[i]] -= 1;
                        answer2[Number(key)] = firstVariantOfSplit[i];
                    } else {
                        coinAvailable[firstVariantOfSplit[i]] -= 1;
                        answer[Number(key)] = firstVariantOfSplit[i];
                    }
                } else {
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
                } else {
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

const coinAvailable: Record<string, number> = { ETH: 4, TRON: 5, MATIC: 1};
const participantsRequested: string[] = ["ETH", "ETH", "ETH / TRON", "TRON / ETH", "TRON / MATIC", "TRON", "MATIC", "TRON"];

const res = DistributionOfPrizes(coinAvailable, participantsRequested);


export default res;