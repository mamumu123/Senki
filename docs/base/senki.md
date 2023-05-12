## 初始化

### scene
```js
    scene = new Scene(canvas.current!);
```

```js
export class Scene extends Group {
  constructor(canvas, { autoRender = true } = {}) {
    super();
    canvas.style.transform = "scaleY(-1)";
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width = canvas.clientWidth;
    this.height = canvas.height = canvas.clientHeight;
    window.addEventListener("resize", this.onResize);

    if (autoRender) this.render();
  }
}
```

### control

```js
codeControl = new CodeControl(realCode);

// 每一步动画，触发回调
codeControl.on("wait", handleWait);
// 动画结束调用
codeControl.on("end", handleEnd);
// 销毁时触发
codeControl.on("destroy", handleDestroy);

// 开始运行
codeControl.start();
```

CodeControl 初始化
```js
export default class CodeControl extends MicroEvent<CodeControlEvent> {
  constructor(source: string) {
    super();

    CodeControlPool.push(this);

    this.executableFunction = Function(`
    ${this._breakpointFunctionDeclaration}
    return async function () {
      ${source}
    };
    `)();
  }

}
```

定义 `wait` 函数
```js
  _breakpointFunctionDeclaration = `
  function wait(info) {
    return new Promise((resolve, reject) => {
      // console.log(${this.count})
      CodeControl.saveContext(${this.count}, { info, resolve, reject });
    });
  };
  `;

  // eg: 
  await wait({line: [2, 2], desc: 2})
```


executableFunction 会执行算法代码，但是在代码中遇到 wait 的时候，会保存当时的上下文，等待条件，继续执行
```js
start() {
  this.emit("begin");
  this.status = "running";
  // 执行realCode
  this.executableFunction()
    .catch((err: any) => {
      this.status = "error";
      this.emit("error", err);
      throw err
    })
    .finally(() => {
      this.status = "idle";
      this.emit("end");
    });
}
```

```js
static saveContext(count: number, context: CodeContext) {
  const instance = CodeControlPool[count];
  if (instance) instance.saveCodeContext(context);
  else {
    console.warn("CodeControl " + count + " not Found，try to end the task.");
    context?.reject("The entity has been deleted.");
  }
}
```

```js
触发 wait
saveCodeContext(context: CodeContext) {
  // 保存上下文，触发 wait
  this.codeContext = context;
  this.emit("wait", context);
}
```

执行代码 -> 遇到 wait  -> 保存上下文  -> 等待 resolve -> 继续执行




## Scheduler（任务调度）

### 定义

```js
export default class Scheduler {
  tasks = [];

  status: "stopped" | "running";
  guards: guard[];

  constructor(guards: guard[]);

  push: (task: (next: () => void) => any) => void;

  next: () => void;
}
```

### 使用
```js
import Scheduler from "../base/scheduler.js";

export default class SenkiArray extends Array {

scheduler = new Scheduler([
    { num: 0, resolve: () => (this.senkiNode.speed = 400) },
    { num: 4, resolve: () => (this.senkiNode.speed = 300) },
    { num: 10, resolve: () => (this.senkiNode.speed = 200) },
    { num: 20, resolve: () => (this.senkiNode.speed = 100) },
    { num: 50, resolve: () => (this.senkiNode.speed = 50) },
]);

    // 所有的节点操作，全部放入 push 操作。
    this.addJob((next) => {
      this.senkiNode.out(idx, next);
    });

addJob = this.scheduler.push;

}

```