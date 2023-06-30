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
            }
        }
    }
    return [answer, answer2] || null;
}
var coinAvailable = { ETH: 4, TRON: 5, MATIC: 1 };
var participantsRequested = ["ETH", "ETH", "ETH / TRON", "TRON / ETH", "TRON / MATIC", "TRON", "MATIC"];
var res = DistributionOfPrizes(coinAvailable, participantsRequested);
exports.default = res;
// В качестве приза участникам конкурса предлагаются монеты.
// У организации проводившей конкурс доступно 3 вида монет: ETH, TRON, MATIC. Для каждой доступно только определенное количество.
// У каждого участника спросили, какую монету он бы хотел получить. И если участник не был уверен, он мог выбрать две смежные монеты.
// Это означает, что любая из монет подходит участнику.
// Вам необходимо рассчитать, возможно ли подарить каждому участнику монеты, которые они запросили, и верните пример такой договоренности.
// Реализация только на TypeScript
// Не нужно задумываться, какой эквивалент награды в USD, можете представить, что это фиксированная сумма.
// Расстановка вариантов может быть любая(например: 'TRON/ETH' или 'ETH/TRON'), но на приоритет для пользователя это не влияет, достаточно закрыть любой из возможных
// Вам нужно учитывать, что в зависимости от того, какую монету вы отдадите в комбинированном варианте, вам может хватить, а может не хватить монет на дальнейшее распределение
// Например у вас есть: ETH: 1, TRON: 1 MATIC: 1, а требуется ETH/TRON, ETH, MATIC
// Если для ETH/TRON вы отдадите ETH, вам не хватит ETH, чтобы закрыть второй вариант, но если вы в первом варианте, отдадите TRON, то запрос будет выполнен
// Если распределить токены не получается, функция должна вернуть NULL
// Функция:
// Первым аргументом должна принимать объект: { ETH: 4, TRON: 5, MATIC: 1 }
// Вторым массив запроса: ['ETH', 'ETH', 'ETH/TRON', 'TRON/ETH', 'TRON/MATIC', 'TRON', 'MATIC']
// Должна вернуть, либо NULL, либо массив ['ETH', 'TRON', ...]
// Это необходимо для корректной работы тестов.
// Необязательно: Постарайтесь не завязываться на конкретные примитивы и их варианты.
// Будет круто если я смогу поменять одну из монет на другую, и ваша функция продолжит работать.
// Или увеличиться количество возможных смежных валют, и у пользователя будет выбор не из 2, а из 3 вариантов, а функция все равно отработает, без изменения в коде =)
