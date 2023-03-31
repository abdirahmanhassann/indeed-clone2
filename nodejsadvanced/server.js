const emit=require('events')

const po=new emit()


po.on('schlong',(j)=>{
    console.log('po poeksi',j)
})

setTimeout(()=>{
po.emit('schlong','po poeskiiii')
po.emit('schlong','po poeskiiii')
po.emit('schlong','po poeskiiii')
},3000)
console.log('working')
