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

const makeRealCode = (arr: number[], target: number) => `
let h = null;
let tail = null;  
const linkArr = []

for (let item of [${arr}]) {
  const tem = new SenkiLinkedNode(item);
  linkArr.push(tem);
  if (!tail) {
    h = tem;
    tail = tem;
  } else {
    tail.next = tem;
    tail = tem;
  }
}
console.log('target', ${target}, 'linkArr', linkArr);
if(${target} >= 0) {
  tail.next = linkArr[${target}];
}

hasCycle(h)
function hasCycle( head ) {
    if(!head||!head.next){return false;}
    let  slow = head;
    let  fast = head;
    while(fast && fast.next){
        if(fast) {
          fast.setKeyPoint('');
        }
        fast = fast.next.next
        if(fast) {
          fast.setKeyPoint('fast');
        }
        if(slow) {
          slow.setKeyPoint('');
        }
        slow = slow.next
        if(slow) {
          slow.setKeyPoint('slow');
        }
        if(fast === slow){
            return true
        }
    }
    return false
}
`;

const makeReverseAlgoSource = (arr: number[] = [], target = 1) => {
  arr = arr.slice(0, 5)

  for (let i = arr.length; i < 5; i++) {
    arr.push(Math.ceil(Math.random() * 100));
  }
  console.log('arr', arr, typeof arr)
  return makeAlgoSource(makeShower(arr), desc, makeRealCode(arr, target));
};

export default makeReverseAlgoSource;
