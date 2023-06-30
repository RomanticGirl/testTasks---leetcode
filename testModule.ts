// class TestTask {
//     coinAvailable: Record<string, number>;
//     participantsRequested: string[];
//     answerAll: Object = {};





//     factorial(x: number) {
//         return x ? x * this.factorial(x - 1) : 1;
//     }

//     compareAnswers(value: string, index: number) {
//         for (let key in this.answerAll) {
//             if (this.answerAll[key][index] === value) {
//                 return false;
//             }
//         }
//     }

    // differentAnswers(coinAvailable: Record<string, number>, objectionablePayment: Record<number, string>, answer: string[], answerAll: object) {
    //     const answers: number = this.factorial(Object.keys(objectionablePayment).length) / this.factorial(Object.keys(objectionablePayment).length - 2) * this.factorial(2);
    //     for (let i = 0; i < answers; i++) {
    //         answerAll[i] = answer;
    //         var tempoCoinAvailable: Record<string, number> = JSON.parse(JSON.stringify(coinAvailable));
    //         for (let key in objectionablePayment) {
    //             const firstVariantOfSplit: string[] = objectionablePayment[key].split(' / ');
    //             // const secondVariantOfSplit: string[] = objectionablePayment[key].split('/');
    //             if (firstVariantOfSplit.length > 1) {
    //                 for (let j = 0; j < firstVariantOfSplit.length; j++) {
    //                     if (this.compareAnswers(firstVariantOfSplit[j], Number(key))) {
    //                         if (tempoCoinAvailable[firstVariantOfSplit[j]] > 0) {
    //                             if (answerAll[i][Number(key)]) {
    //                                 tempoCoinAvailable[firstVariantOfSplit[j]] -= 1;
    //                             }
    //                             else {
    //                                 answerAll[i][Number(key)] = firstVariantOfSplit[j];
    //                                 tempoCoinAvailable[firstVariantOfSplit[j]] -= 1;
    //                             }
    //                         }
    //                     }
    //                 }
                    // else {
                    //     for (let i = 0; i < secondVariantOfSplit.length; i++) {
                    //         if (tempoCoinAvailable[secondVariantOfSplit[i]] > 0) {
                    //             if (answerAll[i][Number(key)]) {
                    //                 coinAvailable[secondVariantOfSplit[i]] -= 1;
                    //             }
                    //             else {
                    //                 tempoCoinAvailable[secondVariantOfSplit[i]] -= 1;
                    //                 answerAll[i][Number(key)] = firstVariantOfSplit[i];
                    //             }
                    //         }
                    //     }
                    // }
    //             }
    //         }
    //     }
    //     return;
    // }

    function  DistributionOfPrizes(coinAvailable: Record<string, number>, participantsRequested: string[]): object | null {
        const coinAvailable = { ETH: 4, TRON: 5, MATIC: 1 };
        const answer: string[] = [];
        const objectionablePayment: Record<number, string> = {};
        for (let i = 0; i < participantsRequested.length; i++) {
            if (participantsRequested[i].indexOf("/") === -1) {
                coinAvailable[participantsRequested[i]] -= 1;
                answer[i] = participantsRequested[i];
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
        this.differentAnswers(coinAvailable, objectionablePayment, answer, this.answerAll);
        return this.answerAll || null;
    }

    // this.DistributionOfPrizes(coinAvailable, participantsRequested);

}

export default new TestTask();

let test = new TestTask();
test.coinAvailable = { ETH: 4, TRON: 5, MATIC: 1 };
test.participantsRequested = ['ETH', 'ETH', 'ETH/TRON', 'TRON/ETH', 'TRON/MATIC', 'TRON', 'MATIC']


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