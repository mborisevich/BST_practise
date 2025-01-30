class Node{
    constructor(value=null, left=null, right=null){
        this.value = value,
        this.left = left,
        this.right = right
    }
}
class Tree{
    constructor(array){
        this.array = array
        this.root = this.buildTree(array)
    }
    sortArrayToBST(array, start=0, end){
        if (end >= start){
            let mid = Math.floor((end + start)/2)
            const root = new Node
            root.value = array[mid]
            root.left = this.sortArrayToBST(array, start, mid - 1)
            root.right = this.sortArrayToBST(array, mid + 1, end)
            return root
        } else {
            return null
        }

    }
    buildTree(array){
        let removedDuplicates = [...new Set(array)]
        let sortedArray = removedDuplicates.sort((a,b) => a-b)
        console.log(sortedArray)
        let start = 0
        let end = sortedArray.length - 1
        return this.sortArrayToBST(sortedArray, start, end)
    }
    insert(value, node=this.root){
        if (node.value == null){
            return 
        }
        else if (node.value < value && node.right == undefined){
            node.right = new Node(value)

        } else if (node.value > value && node.left == undefined){
            node.left = new Node(value)
        } else if (node.value < value && node.right != undefined) {
            return this.insert(value, node.right)
        } else if (node.value > value && node.left != undefined) {
            return this.insert(value, node.left)
        }

    }
    deleteItem(value, node=this.root){
        let targetNode
        function getSucc(node){
            let currentNode
            if (node.left && !node.right){
                currentNode = node.left
            } if (!node.left && node.right){
                currentNode = node.right
            } else if (node.left && node.right) {
            currentNode = node.right
                while (currentNode != undefined && currentNode.left != undefined){
                currentNode = currentNode.left
                }
            currentNode.left = node.left
            }
            return currentNode
        }
        if (node.left && node.left.value == value){
            targetNode = node.left
            node.left = getSucc(targetNode)
        } else if (node.right && node.right.value == value){
            targetNode = node.right
            node.right = getSucc(targetNode)
        }
        if (node.left && node.left.value > value){
            return this.deleteItem(value, node.left)
        } else if (node.left && node.left.value < value){
            return this.deleteItem(value, node.right)
        }
        return this.root
    }
    find(value, node=this.root){
        console.log(`Searching ${node.value}`)
        if (value == node.value){
            return node
        } else if (node.value > value && node.left != undefined) {
            return this.find(value, node.left)
        } else if (node.value < value && node.right != undefined) {
            return this.find(value, node.right)
        } else {
            return null
        }
    }
    printValue(node){
        if (node){
            console.log(node.value)
        }
        else {
            return null
        }
    }
    levelOrder(callback, node=this.root){
        let queue = []
        function addToQueue(queue, node){
            queue.push(node)
        }
        function executeQueue(callback, queue){
            queue.forEach((entry) => {
                let selectNode = queue.shift()
                callback(selectNode)
                if (!selectNode){
                    return 
                }
                else if (!selectNode.left && !selectNode.right){
                    return executeQueue(callback, queue)
                }
                else if (!selectNode.left && selectNode.right){
                    addToQueue(queue,selectNode.right)
                }
                else if (selectNode.left && !selectNode.right){
                    addToQueue(queue,selectNode.left)
                } else if (selectNode.left && selectNode.right) {
                addToQueue(queue,selectNode.left)
                addToQueue(queue,selectNode.right)
                }
                return executeQueue(callback, queue)
            })

        }
        function levelSearch(callback, node){
            addToQueue(queue, node)
            executeQueue(callback, queue)

        }
        if (!callback){
            throw new Error("Missing callback parameter!")
        }
        levelSearch(callback, node)
      


    }
    prettyPrint(node=this.root, prefix="", isLeft = true){
        if (node === null) {
            return;
        }
        if (node.right !== undefined){
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== undefined) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
}
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const test = new Tree(array)
console.log(test.root)
console.log(test.root)
test.prettyPrint()
test.find(324)
test.deleteItem(67)
test.prettyPrint()
test.levelOrder(test.printValue)
