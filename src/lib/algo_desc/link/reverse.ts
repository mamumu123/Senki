import makeAlgoSource from "../makeAlgoSource";

const makeShower = (arr: number[]) => `
function ListNode(x){
    this.val = x;
    this.next = null;
}
const temp = [${arr}].reduce((sum, item)=> {
    const tem = new ListNode(item);
    if(!sum) {
        return tem
    }else {
        sum.next = tem;
        return sum
    }
})
ReverseList(temp);
function ReverseList(pHead)
{
    if(!pHead){return null}
    let cur = null
    while(pHead){
        let tem = pHead.next;
        pHead.next = cur
        cur = pHead
        pHead = tem
    }
    return cur
}
`;

const desc = [
  "【链表】初始化",
  "调用翻转函数",
  "暂存链表的下一个节点",
  "pHead 的 next 指向新链表",
  "cur 指向新链表的表头",
  "pHead 指向下一个节点",
  "翻转结束，cur 链表就是翻转后的链表"
];

const makeRealCode = (arr: number[]) => `
let h = null;
let tail = null;  
for (let item of [${arr}]) {
  const tem = new SenkiLinkedNode(item);
  if (!tail) {
    h = tem;
    tail = tem;
  } else {
    tail.next = tem;
    tail = tem;
  }
}
await wait({line: [1, 13], desc: 1});
await wait({line: [14, 14], desc: 2});

await ReverseList(h);

async function ReverseList(pHead) {
  if (!pHead) {
    return null;
  }

  let cur = null;

  while (pHead) {

    // if(tem) {
    //   tem.setKeyPoint('');
    // }
    let tem = pHead.next;
    // tem.setKeyPoint('temp');
    // await wait({line: [20, 20], desc: 3});
    
    pHead.next = cur;
    // await wait({line: [21, 21], desc: 4}); // pHead 的 next 指向新链表


    if (cur && cur.setKeyPoint) {
      cur.setKeyPoint('');
    }
    cur = pHead;
    cur.setKeyPoint('cur');
    // await wait({line: [22, 22], desc: 5}); // cur 指向新链表的表头

    pHead = tem;
    await wait({line: [23, 23], desc: 6}); // pHead 指向暂存的下一个节点
    

  }
  return cur;
}
await wait({line: [25, 25], desc: 7}); // pHead 指向下一个节点
`;

const makeReverseAlgoSource = (arr: number[] = []) => {
  arr = arr.slice(0, 5)

  for (let i = arr.length; i < 5; i++) {
    arr.push(Math.ceil(Math.random() * 100));
  }
  console.log('arr', arr, typeof arr)
  return makeAlgoSource(makeShower(arr), desc, makeRealCode(arr));
};

export default makeReverseAlgoSource;
