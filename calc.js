    // 定义计算器对象
    let calc = {
      numberStack: [0], //定义数字栈
      operStack: [], //定义操作符栈
      opMap: { // 定义计算规则
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        'factorial': function f(n, t = 1) {
          return n < 2 ? t : f(n-1, n*t) //尾递归与箭头函数无法共用
        },
        'clear': () => 0,
      },
      pushNumberStack: function (val) {
        if (this.operStack.length) { //如果有计算操作符，则数字压栈，然后计算
          this.numberStack.push(val)
          this.compute().resetScreen()
        } else { //否则当作输入新数字处理
          this.numberStack.push(this.numberStack.pop() * 10 + val)
          this.resetScreen()
        }
      },
      pushOperStack: function (val) {
        this.operStack.push(val)
        switch(val)
        {
          case 'clear':
            this.compute().resetScreen() //立即计算
            break;
          case 'factorial':
            this.compute().resetScreen() //立即计算
            break;
        }
      },
      compute: function () {
        let op = this.opMap[this.operStack.pop()] //按缓存计算符生成计算函数
        console.log(op)
        let result = op.call(this, ...this.numberStack) //生成计算结果
        this.numberStack.length = 0 //此处没用循环numberStack.pop()，同时把pop值生成新的计算参数，而是置0清空，感觉这样更简单？
        this.numberStack.push(result) //计算结果压入数字栈
        return this //为了链式调用
      },
      resetScreen: function () { //把当前计算结果置入显示屏
        const $result = document.querySelector('.result')
        $result.innerHTML = this.numberStack[0]
      },
      init: function(){
        this.resetScreen()
        document.querySelectorAll('input').forEach((e) => { // 循环绑定事件
          e.addEventListener('click', function () {
            //正则匹配数字
            /^([\d]+(\.)?[\d]*)?$/.test(this.value) ? calc.pushNumberStack(parseFloat(this.value)) : calc.pushOperStack(
              this.value)
          })
        })
      }
    }

    // 初始化
    calc.init()


