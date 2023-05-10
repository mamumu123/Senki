import makeAlgoSource from "../makeAlgoSource";

const makeShower = (arr: number[]) => `
const temp = ${arr}.reduce((sum, item)=> {
    const tem = new ListNode(item);
    if(!sum) {
        return tem
    }else {
        sum.next = tem;
        return sum
    }

})

function ListNode(x){
    this.val = x;
    this.next = null;
}
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
  "【最小堆】初始化堆",
  "插入节点",
  "插入节点",
  "插入节点",
  "插入节点",
  "插入节点",
  "删除堆顶",
  "替换两个节点值",
  "获取父节点,求除2的商",
  "获取左节点,求除2的商",
  "获取右节点,求除2的商",
  "尝试上移节点",
  "尝试下移节点",
  "插入节点",
  "删除堆顶"
];

const makeRealCode = (ar: number[]) => `

//import { SenkiLinkedNode } from "senki"

let h = null;
let tail = null; //(async () => {

const arr = ${ar};

for (let item of arr) {
  const tem = new SenkiLinkedNode(item);
  globalThis.xxx = tem;

  if (!tail) {
    h = tem;
    tail = tem;
  } else {
    tail.left = tem;
    tail = tem;
  }
} //})();


function ReverseList(pHead) {
  if (!pHead) {
    return null;
  }

  let cur = null;

  while (pHead) {
    let tem = pHead.left;
    pHead.left = cur;

    if (cur && cur.setKeyPoint) {
      cur.setKeyPoint('');
    }

    cur = pHead;
    cur.setKeyPoint('cur');
    pHead = tem;
  }

  return cur;
}

const xxx = ReverseList(h);
console.log(xxx);

`;

const makeReverseAlgoSource = (arr: number[] = []) => {
  arr = arr.slice(0, 5)

  for (let i = arr.length; i < 5; i++) {
    arr.push(Math.ceil(Math.random() * 100));
  }
  return makeAlgoSource(makeShower(arr), desc, makeRealCode(arr));
};

export default makeReverseAlgoSource;
