let adb = new (require('./Adb'))
function num1() {
    return adb.click({ x: 143, y: 859 })
}
function num2() {
    return adb.click({ x: 360, y: 859 })
}
function num3() {
    return adb.click({ x: 564, y: 859 })
}
function num4() {
    return adb.click({ x: 143, y: 1020 })
}
function num5() {
    return adb.click({ x: 360, y: 1020 })
}
function num6() {
    return adb.click({ x: 564, y: 1020 })
}
function num7() {
    return adb.click({ x: 143, y: 1148 })
}
function num8() {
    return adb.click({ x: 360, y: 1148 })
}
function num9() {
    return adb.click({ x: 564, y: 1148 })
}
function num0() {
    return adb.click({ x: 337, y: 1302 })
}
function enter() {
    return adb.click({ x: 543, y: 1273 })
}
let num = 1231 //minimum number
async function run() {
    let nums = num.toString().split('')
    let i = 0
    function startTypig() {
        type(nums[i], async () => {
            i = i + 1
            if (nums[i] != null) {
                startTypig()
            }else{
                await enter()
                num=num+1
                run()
            }
        })
    }
    startTypig()
}
async function type(num, callback) {
    switch (num) {
        case '1':
            await num1()
            callback()
            break;
        case '2':
            await num2()
            callback()
            break;
        case '3':
            await num3()
            callback()
            break;
        case '4':
            await num4()
            callback()
            break;
        case '5':
            await num5()
            callback()
            break;
        case '6':
            await num6()
            callback()
            break;
        case '7':
            await num7()
            callback()
            break;
        case '8':
            await num8()
            callback()
            break;
        case '9':
            await num9()
            callback()
            break;
        case '0':
            await num0()
            callback()
            break;

        default:
            break;
    }
}
run()