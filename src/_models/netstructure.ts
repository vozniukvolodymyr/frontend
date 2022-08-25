type Tnode = {id: string, text: string, childcount: number, expand: boolean, item: any, children: []};
class Queue<T> {
  store: T[] = [];
  public push(val: T): any {
    this.store.push(val);
  }
  public pop(): T | undefined {
    return this.store.shift();
  }
}

export class Netstructure {
  nodes: any = [
      /* {
        id: '0',
        name: 'Heros',
        children: [
          {
            id: '1',
            name: 'Batman',
            item: {
              phrase: 'I am the batman'
            }
          },
          {
            id: '2',
            name: 'Superman',
            item: {
              phrase: 'Man of steel'
            }
          }
        ]
      } */
  ];
  root(data: any): any{
    this.nodes = [data];    
  }
  traverseDF(callback: any): any {
      // это рекурсивная и мгновенно вызываемая функция
      (function recurse(currentNode: any): any {
          // шаг 2
          if (currentNode.children){
            for (let i = 0, length = currentNode.children.length; i < length; i++) {
              // шаг 3
              recurse(currentNode.children[i]);
            }
          }
          // шаг 4
          callback(currentNode);
          // шаг 1
      })(this.nodes[0]);
  }
  traverseBF(callback: any): any {
      const queue = new Queue();
      queue.push(this.nodes[0]);
      let currentTree = queue.pop() as Tnode;
      while ( currentTree ) {
          if (currentTree.children){
            for (let i = 0, length = currentTree.children.length; i < length; i++) {
                queue.push(currentTree.children[i]);
            }
          }
          callback(currentTree);
          currentTree = queue.pop() as Tnode;
      }
  }
  contains(callback: any, traversal: any): any {
    traversal.call(this, callback);
  }
  add(data: any, id: string, traversal: any): any {
    const child = data;
    let parent: any = null;
    function callback(node: any): any {
      if (node.id === id) {
        parent = node;
      }
    }
    this.contains(callback, traversal);
    if (parent) {
        if (parent.children === undefined){
          Object.assign(parent, {children: []});
        }
        parent.children.push(child);
    }
  }
  findIndex(arr: any, id: string): any {
    let index;
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        if (arr[i].id === id) {
            index = i;
        }
    }
    return index;
  }
  remove(parentid: string, id: string, traversal: any): any {
    let parent: any = null; 
    let childToRemove: any = null;
    function callback(node: any): any {
      if (node.id === parentid) {
        parent = node;
      }
    } 
    this.contains(callback, traversal); 
    if (parent) {
        const index = this.findIndex(parent.children, id); 
        if (index === undefined) {
          return undefined
        } else {   
          childToRemove = parent.children[index];
          parent.children.splice(index, 1);
        }
    }    
    return childToRemove;
  }
  findparent(id: string, traversal: any): any {
    let parent: any = null; 
    function callback(node: any): any {
      if (node.id === id) {
        parent = node;
      }
    } 
    this.contains(callback, traversal); 
    return parent;    
  }  
}
