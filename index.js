const express=require('express')
const app = express()
const PORT=process.env.PORT ||5000

var cors=require('cors')

app.use(cors())
app.use(express.json())



app.use('/user',require('./routes/userauth'))
app.use('/rotaract',require('./routes/board'))
app.use('/Events',require('./routes/Events'))


app.listen(PORT,()=>{
    console.log("we are onlinee at http://localhost:5000")

})