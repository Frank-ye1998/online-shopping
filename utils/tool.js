function getNonceStr() {
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
    let ranDomStr = '';
    for (let i = 0; i < 20; i++) {
        ranDomStr += arr[Math.floor(Math.random() * 16)]
    }
    return ranDomStr;
}
export {
    getNonceStr
};