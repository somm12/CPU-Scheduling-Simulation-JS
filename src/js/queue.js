class Node {
  constructor(index, arriveTime, runningTime) {
    this.index = index;
    this.arriveTime = arriveTime;
    this.runningTime = runningTime;
    this.next = null;
  }
}
// 큐 클래스
class Queue {
  constructor() {
    this.head = null; // 제일 앞 노드
    this.rear = null; // 제일 뒤 노드
    this.length = 0; // 노드의 길이
  }

  isEmpty() {
    return this.length == 0;
  }
  enqueue(index, arriveTime, runningTime) {
    // 노드 추가.
    const node = new Node(index, arriveTime, runningTime); // data를 가진 node를 만들어준다.
    if (this.isEmpty()) {
      // 헤드가 없을 경우 head를 해당 노드로
      this.head = node;
    } else {
      this.rear.next = node; // 아닐 경우 마지막의 다음 노드로
    }
    this.rear = node; // 마지막을 해당 노드로 한다.
    this.length++;
  }

  dequeue() {
    // 노드 삭제.
    if (this.isEmpty()) {
      // 헤드가 없으면 한 개도 없는 것이므로 false를 반환.
      return false;
    }
    const process = this.head; // head를 head의 다음 것으로 바꿔주고 뺀 data를 return
    this.head = this.head.next;
    this.length--;
    return process;
  }

  // head를 반환하는 함수
  front() {
    // head가 있을 경우 head의 data를 반환.
    return this.head;
  }
}
export { Node, Queue };
