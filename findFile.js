let fs = require('fs')
let Path = require('path')


class Git {
    readdirs(path, filename) {
        let result = []
        
        //生成一个栈数组
        let stack = [{
            path: path,
            name: Path.basename(path)
        }]
         
        while (stack.length) { //如果数组不为空，读取children
            let target = stack.pop() //取出文件夹对象
            let files = fs.readdirSync(target.path) //拿到文件名数组
            target.children = files.map(function (file) {
                let subPath = Path.resolve(target.path, file) //转化为绝对路径
                let model = { //构造文件数据结构
                    path: subPath,
                    name: file
                }

                if (file === filename) {
                    result.push(model)
                }

                let stats = fs.statSync(subPath) //拿到文件信息对象
                if (stats.isDirectory()) {
                    stack.push(model) //如果是文件夹，推入栈
                }
                return model //返回数据模型
            })
        }
        return result //返回整个数据结果
    }
}

let git = new Git();

let pjPath = Path.join(__dirname, 'project');

let targetpath = git.readdirs(pjPath, 'file.html')

let filepath = Path.join(__dirname, 'fileMsg.json')

if (fs.existsSync(filepath)) {
    fs.unlink(filepath)
}

fs.writeFileSync(filepath, JSON.stringify(targetpath, null, ' ')) //保存在tree.json中，去查看吧