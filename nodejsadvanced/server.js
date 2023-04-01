const fs=require('fs')

const text=fs.readFileSync('clint.txt')
console.log(text.toString('utf8'))
