```js
export default class SenkiArray extends Array {
  constructor() {
    super(...arguments);
    this.addJob((next) => {
      // 
      this.senkiNode = new Histogram(
        new Array(...arguments),
        SenkiArray.config,
        SenkiArray.config.position.x,
        SenkiArray.config.position.y
      );
      this.senkiNode.init(next);
    });
  }
}
```


```js
export default class Histogram extends Group {
  constructor(data, args, x, y) {
    if (this.scene) {
        // ...
    }
    this.updateCellProfile("init", 0, data);
  }

}

```

```js
updateCellProfile(flag, idx, v) {
    // 根据 flag ， 设置 data
    if (flag === "init") {
        this.data = v;
    } else if (flag === "add") {
        this.data.splice(idx, 0, v);
        console.log(this.data);
    } else if (flag === "del") {
        this.data.splice(idx, 1);
    }

    // ...


    if (flag === "init")
      this.cell.newTargets = this.data.map(() => ({
        item: new Group(this.cell.left - this.cell.fullWidth, 0),
      }));
    else if (flag === "add") {
      this.cell.newTargets = this.cell.preTargets.slice();
      this.cell.newTargets.splice(idx, 0, {
        item: new Group(this.cell.left - this.cell.fullWidth, 0),
      });
    } else if (flag === "del") {
      this.cell.newTargets = this.cell.preTargets.filter((_, i) => i !== idx);
    }

    this.cell.newTargets.forEach((t, idx) => {
      t.x = idx * this.cell.fullWidth + this.cell.left;
      t.h = (this.data[idx] / this.cell.maxV) * this.height;
    });
}
```

```js
cell = {
    maxV: 0,
    width: 0,
    fullWidth: 0,
    realHalfSpace: 0,
    left: 0,
    preTargets: [],
    newTargets: [],
};
```