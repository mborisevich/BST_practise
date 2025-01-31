class Node{
    constructor(value=null, left=null, right=null){
        this.value = value,
        this.left = left,
        this.right = right
    }
}
class Tree{
    constructor(tree=[]){
        this.array = tree
        this.root = this.buildTree(this.array)
    }
    saveToArray = (node) =>{
        this.array.push(node.value)
    }
    rebalance(node=this.root, array=this.array){
        this.preOrder(this.saveToArray, node)
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


    preOrder(callback, node=this.root){
        if (!callback){
            throw new Error("Missing callback parameter!")
        }
        if (node == undefined){
            return
        } else {
            callback(node)
            this.preOrder(callback, node.left)
            this.preOrder(callback, node.right)
        }
    }
    inOrder(callback, node=this.root){
    if (!callback){
        throw new Error("Missing callback parameter!")
    } if (node == null){
        return
    } else {
        this.inOrder(callback, node.left)
        callback(node)
        this.inOrder(callback, node.right)
    }
    
    }
    countNode(count){
        if (node != null){
            count += 1
        }
        return count
    }
    depth(value, depth, node=this.root){
            console.log(`Searching ${node.value}`)
            if (value == node.value){
                return depth
            } else if (node.value > value && node.left != undefined) {
                depth =+ 1
                return this.depth(value, height, node.left)
            } else if (node.value < value && node.right != undefined) {
                depth =+ 1
                return this.depth(value, height, node.right)
            } else {
                return null
            }
        }
    height(value){
        let root = this.find(value)
        function searchHelper(height=0,node=root){
            if (node == null){
                return -1
            }
            let leftTree = searchHelper(height, node.left)
            let rightTree = searchHelper(height, node.right)
            if (leftTree > rightTree || rightTree == undefined){
                return leftTree + 1
            } else if (rightTree > leftTree || leftTree == undefined){
                return rightTree + 1
            } else if (rightTree == leftTree){
                return rightTree + 1
            }

        }
        return searchHelper(0, root)
    }
    isBalanced(node=this.root){
        let leftTree = this.height(node.left.value)
        let rightTree = this.height(node.right.value)
        if (Math.abs(leftTree - rightTree) <= 1){
            console.log(leftTree - rightTree)
            console.log("The tree is balanced")
        } else {
            console.log("The tree is unbalanced")
        }

    }

    postOrder(callback, node=this.root){
    if (!callback){
        throw new Error("Missing callback parameter!")
    } if (node == null){
        return
    } else {
        this.postOrder(callback, node.left)
        this.postOrder(callback, node.right)
        callback(node)
    }
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
function driverScript() {
    let randomArray = []
    while (randomArray.length < 12){
        randomArray.push(Math.floor(Math.random()*100))
    }
    randomTree = new Tree(randomArray)
    randomTree.isBalanced()
    randomTree.prettyPrint()
    randomTree.postOrder(randomTree.printValue)
    randomTree.inOrder(randomTree.printValue)
    randomTree.postOrder(randomTree.printValue)
    for (let i = 0; i < 20; i++){
        randomTree.insert(Math.floor(Math.random()*1000))
    }
    randomTree.isBalanced()
    randomTree.prettyPrint()
    randomTree.rebalance()
    randomTree.postOrder(randomTree.printValue)
    randomTree.inOrder(randomTree.printValue)
    randomTree.postOrder(randomTree.printValue)
    randomTree.isBalanced()
    randomTree.prettyPrint()
}
driverScript()
//test.postOrder(test.printValue)