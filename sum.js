/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const nums = [3, 3];
const target = 6;

var twoSum = function (nums, target) {
    let Output = [];
    let res;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        res = target - num;

        if (nums.findIndex(x => x === res) != -1 && nums.findIndex(x => x === res) != i) {
            Output = [i, nums.findIndex(x => x === res)];
            return console.log(Output);
        }

    }
};
twoSum(nums, target);