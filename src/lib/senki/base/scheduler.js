export default class Scheduler {
  tasks = [];

  status = "stopped"; // running

  constructor(guards) {
    guards.sort((g1, g2) => g2.num - g1.num);
    this.guards = guards;
  }

  push = (task) => {
    this.tasks.push(task);

    // 如果当前没有任务，则调整 status, 执行任务
    if (this.tasks.length === 1 && this.status === "stopped") {
      this.status = "running";
      this.next();
    }

    // 调整速度
    for (const guard of this.guards) {
      // 任务数量大于 num 值，则设置速度。
      if (this.tasks.length > guard.num) {
        return guard.resolve();
      }
    }
  };

  // 执行下一个任务
  next = () => {
    const task = this.tasks.shift();
    if (task !== undefined) task(this.next);
    else this.status = "stopped"
  };
}