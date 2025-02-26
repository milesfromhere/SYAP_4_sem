"use strict";
//������ 1: �������������� ������ ��������
console.log("#1");
function createPhoneNumber(numbers) {
    if (numbers.length !== 10) {
        throw new Error("������ ������ ��������� ����� 10 �����.");
    }
    const areaCode = numbers.slice(0, 3).join('');
    const firstPart = numbers.slice(3, 6).join('');
    const secondPart = numbers.slice(6).join('');
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}
console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
//������ 2: ����� �����, ������� 3 ��� 5
console.log("#2");
class Challenge {
    static solution(number) {
        if (number < 0) {
            return 0;
        }
        let sum = 0;
        for (let i = 0; i < number; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }
        return sum;
    }
}
console.log(Challenge.solution(10));
//������ 3: ������� ������� ������ �� k �����
console.log("#3");
function rotate(nums, k) {
    const n = nums.length;
    k = k % n;
    const rotated = nums.slice(n - k).concat(nums.slice(0, n - k));
    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}
const nums = [1, 2, 3, 4, 5, 6, 7];
rotate(nums, 3);
console.log(nums);
//������ 4: ������� ���� ��������������� ��������
console.log("#4");
function findMedianSortedArrays(nums1, nums2) {
    const merged = nums1.concat(nums2).sort((a, b) => a - b);
    const n = merged.length;
    if (n % 2 === 0) {
        return (merged[n / 2 - 1] + merged[n / 2]) / 2;
    }
    else {
        return merged[Math.floor(n / 2)];
    }
}
console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
//# sourceMappingURL=app.js.map