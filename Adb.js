const { exec } = require('child_process');
const fs = require("fs");
const PNG = require("pngjs").PNG;
const subImageMatch = require("matches-subimage");

function runAdb(cmd) {
    return new Promise((resolve, reject) => {
        exec(`adb ${cmd}`, (error, stdout, stderr) => {
            resolve(stdout)
        });
    })
}
class Adb {
    click({ x, y }) {
        return runAdb(`shell input tap ${x} ${y}`)
    }
    openAppWithPackageName(package_name) {
        return runAdb(`shell monkey -p '${package_name}' 1`)
    }
    type({ text }) {
        return runAdb(`shell input text $(echo "${text}" | sed 's/ /\%s/g')`)
    }
    screenshot({ fileName }) {
        return runAdb(`exec-out screencap -p >  ${__dirname }/${fileName}`)
    }
    findCordinates({ img1, img2 }) {
        return new Promise((resolve, reject) => {
            try {
                const img = PNG.sync.read(fs.readFileSync(img1));
                const subImg = PNG.sync.read(fs.readFileSync(img2));
                resolve(subImageMatch(img, subImg, { threshold: 0.1 }))
            } catch (error) {
                resolve(false)
            }
        })
    }
    getInstalledApps() {
        return runAdb('shell pm list packages')
    }
    async clickByImage(img) {
        console.log(__dirname);
        await this.screenshot({ fileName: 'screen.png' })
        let cordinates = await this.findCordinates({ img1: __dirname + 'screen.png', img2: __dirname + '/assets/' + img })
        console.log(cordinates);
        this.click({ x: cordinates.x, y: cordinates.y })
    }

}
module.exports = Adb
