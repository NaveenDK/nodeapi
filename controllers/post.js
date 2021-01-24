

exports.getPosts = (req,res)=>{
    res.json({
        posts:[
            {title:'FIrst post'},
            {title:'"Second post'}
        ]
    })

}