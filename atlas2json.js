let fs = require('fs');
function atlas2Json() {
    if(process.argv.length<=2){
        console.error("请查看输入命令是否正确");
    }
    let atlasname = process.argv[2]
    fs.readFile(`./atlas/${atlasname}.atlas`, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let newObj = {}
        let text = JSON.parse(data.toString());//将字符串转换为json对象
        if (text.meta) {
            newObj.file = text.meta.image;
            delete text.meta;
            newObj.frames = {}
        }
        for (let i in text.frames) {
            let j = i.replace(".png", "");
            delete text.frames[i].frame.idx;
            delete text.frames[i].spriteSourceSize;
            delete text.frames[i].sourceSize;
            newObj.frames[j] = text.frames[i].frame;
        }
        let str = JSON.stringify(newObj);
        fs.writeFile(`./json/${atlasname}.json`, str, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`》》》》》》》添加./json/${atlasname}.json成功《《《《《《《`);
            }
        })
        fs.unlink(`./atlas/${atlasname}.atlas`, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`》》》》》》》删除./atlas/${atlasname}.atlas成功《《《《《《《`);
            }
        })
    })
}
atlas2Json();