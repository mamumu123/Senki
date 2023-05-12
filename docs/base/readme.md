## 流程

### 初始化
```jsx
useLayoutEffect(() => {
    scene = new Scene(canvas.current!);
    SenkiArray.config.scene = scene;
    SenkiArray.config.width = scene.width;
    SenkiArray.config.height = scene.height;
    
    makeAlgoSource = '<xxx>'
    
    // 展示代码，描述， 真实代码
    // 真实代码 = 运行动画的代码
    [fakeCode, desc, realCode] = makeAlgoSource(reviseArray);

    // 创建控制条
    createNewCodeControl();
}, [canvas, location.pathname]);
```

### 控制流程

```tsx
const createNewCodeControl = () => {
    codeControl = new CodeControl(realCode);

    // 每一步动画，触发回调
    codeControl.on("wait", handleWait);
    // 动画结束调用
    codeControl.on("end", handleEnd);
    // 销毁时触发
    codeControl.on("destroy", handleDestroy);

    // 开始运行
    codeControl.start();
};

```

#### handleWait

```tsx
const handleWait = ({ info, resolve }: CodeContext) => {
    // codeInfo
    setCodeInfo(info);

    // 确定动画结束了再进行下一步
    const tryToNext = () => {
    // 如果当前时播放
    if (statusRef.current === "play") {
        // 如果当前动画结束了
        if (scene.isAnimAllOver()) resolve();
        // 如果没有结束，则等待重新触发
        else setTimeout(tryToNext, 100);
    } 
    // 不是的话
    else tempTask = resolve;
    };

    setTimeout(tryToNext, 500);
};

```

#### handleEnd

```js
const handleEnd = () => {
    setStatus("finish");
    setCodeInfo({ line: [-1, -1], desc: -1 });
};
```


#### handleDestroy
```jsx
const handleDestroy = () => {
    scene.removeAllChild();
};
```

### 控制流程
```js
<ControlTrack
    status={status}
    speed={400}
    onPlay={handlePlay}
    onStop={handleStop}
    onRestart={handleRestart}
    onChangeSpeed={handleChangeSpeed}
    onNext={handleNext}
/>
```

#### play(handlePlay)

```js
  const handlePlay = () => {
    // 如果有任务，则继续播放
    // tempTask ，存储下一个要执行的任务
    if (tempTask) tempTask();
    setStatus("play");
  };
```

#### stop

```js
  const handleStop = () => {
    setStatus("stop");
  };
```

#### next

```js
const handleNext = () => {
    if (tempTask) tempTask();
};
```



### 输入case
```tsx
<div className={classes.reviseArrayInput}>
    <Input
    placeholder="输入数组，例：[1,2,3,4,5]"
    onChange={(event) => {
        reviseArrayInputChange(event);
    }}
    />
</div>
<div>
    <Button onClick={handleRestart}>确认</Button>
</div>
```


```js
const reviseArrayInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
        // 解析
      let data = JSON.parse(event.target.value);
      // 设置输入参数
      setReviseArray(data);
    } catch (err) {
      setReviseArray(undefined);
    }
  };

```

#### reStart
```js
const handleRestart = () => {
    [fakeCode, desc, realCode] = makeAlgoSource(reviseArray);
    codeControl.destroy(); // 一定要记得销毁
    createNewCodeControl();
    setStatus("play");
  };
```