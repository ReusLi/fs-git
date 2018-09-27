let fs = require('fs')
let Path = require('path')

function readdirs(path) {
    let result = { //构造文件夹数据
        path: path,
        name: Path.basename(path),
        type: 'directory'
    }
    let stack = [result] //生成一个栈数组
    while (stack.length) { //如果数组不为空，读取children
        let target = stack.pop() //取出文件夹对象
        let files = fs.readdirSync(target.path) //拿到文件名数组
        target.children = files.map(function(file) {
            let subPath = Path.resolve(target.path, file) //转化为绝对路径
            let stats = fs.statSync(subPath) //拿到文件信息对象
            let model = { //构造文件数据结构
                path: subPath,
                name: file,
                type: stats.isDirectory() ? 'directory' : 'file'
            }
            if (model.type === 'directory') {
                stack.push(model) //如果是文件夹，推入栈
            }
            return model //返回数据模型
        })
    }
    return result //返回整个数据结果
}

let cwd = process.cwd()
let pjPath = Path.join(__dirname, 'project');
let tree = readdirs(pjPath)

let filepath = Path.join(cwd, 'tree.json')
if (fs.existsSync(filepath)) {
    fs.unlink(filepath)
}
fs.writeFileSync(filepath, JSON.stringify(tree, null, ' ')) //保存在tree.json中，去查看吧