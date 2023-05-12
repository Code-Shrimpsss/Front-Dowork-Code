let a = 1010,
    b = 011,
    a1 = 10101110,
    b1 = 00001111;

function OneInter() {
    // if (a % 2 == 0) console.log("is True a 1");
    // if (b % 2 == 0) console.log("is True b 1");

    // 使用与运算符优化偶数取余判断
    if ((a & 1) == 0) console.log("is True a 2");
    if ((b & 1) == 0) console.log("is True b 2");
}

function TwoInter() {
    console.log((a1 & b1).toString(2));
    console.log((a1 | b1).toString(2));
}

function ThreeRever() {
    if (a1 != b1) {
        a1 ^= b1;
        b1 ^= a1;
        a1 ^= b1;
    }
    console.log(a1, " - ", b1);
}

ThreeRever();

