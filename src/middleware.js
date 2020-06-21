class Middleware{
    constructor(){
        this.req={
            name:'req对象'
        }
        this.res={
            name:'res对象'
        }
        this.queue=[]
    }
 
    use(fn){
        this.queue.push(fn) 
    }
    get(url,fn){
      // 省略 路由代码
     this.use(fn)
    }
    list(port){
      // 省略代码
     this.exeMiddleware()
    }
    exeMiddleware(){
        console.log(this.queue.length)
        if(this.queue.length==0){
           return 
        }
        const fn =  this.queue.shift();
        fn(this.req,this.res,()=>{
            this.exeMiddleware.call(this)
        })
    }


}

var  app =  new  Middleware();
 

// 添加cookie 中间件
app.use((req,res,next)=>{
    console.log('req===',req)
    req.cookie={
        setCookie:()=>{},
        getCookie:()=>{}
    }
    next()
})
// 添加
app.use((req,res,next)=>{
    console.log('req===',req)
    req.session={
        setSession:()=>{},
        getSession:()=>{}
    }
    next()
})

app.get('./api',(req,res)=>{
   console.log('api=',req)
})

app.list(3000)
 