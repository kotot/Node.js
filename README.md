Node.js
=======

Node.js 练习

相比于express框架来说，KOA则要精简得多，express强制依赖于connect模块，集成了许多中间件（例如static、query、logger、body parser等），相对来说express是一个“大而全”的框架，而KOA则要精简得多，KOA只留下了主要的 Middleware 机制还有 Request、Response等最基本的中间件，很多中间件KOA都可以自由组合，KOA的中间件机制允许KOA在中间件选择上更加自由（例如对于routing和Templating中间件就可以自由选择）。
KOA支持哈es6新特性：harmony generator，利用这个方法可以避免多重回调函数嵌套地狱，处理逐个执行的异步函数，摆脱了回调。这可以说是一个相当屌的特性，yield可以卡住程序，等待next继续运行，yield还支持数组参数。
可以给yield next套上try catch，koa本身也可以处理一些常见错误；

