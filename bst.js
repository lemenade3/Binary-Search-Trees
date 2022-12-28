// Class Declarations

class Node {
    constructor(node) {
        this.data = node
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr
        this.root = null
    } 
    
    buildTree(array) {
        let sortedArray = mergeSort(array)
    
        for (let i = 0; i < sortedArray.length; i++) {
            while (sortedArray[i] === sortedArray[i + 1]) {
                sortedArray.splice(i + 1, 1)
            }
        }
    
        return sortedArrayToBST(sortedArray, 0, sortedArray.length - 1)
    }

    insert(n, node = this.root) {
        if (node === null) {
            node = new Node(n)
            return node
        }
        if (node.data > n) {
            node.left = this.insert(n, node.left)
        } else if (node.data < n) {
            node.right = this.insert(n, node.right)
        }
        return node
    }

    delete(n, node = this.root) {
        if (node === null) {
            return null
        }
        if (node.data === n) {
            if (node.left != null && node.right != null) {
                node.right.left = node.left
                return node.right
            }
            if (node.left != null) {
                return node.left
            }
            if (node.right != null) {
                return node.right
            }
            return null

            // if leaf delete
            // if got one child, delete node child becomes child of parent node
            // if got two children delete node larger child becomes parent of smaller and both become child of parent
        }
        if (node.data > n) {
            node.left = this.delete(n, node.left)
        }
        if (node.data < n) {
            node.right = this.delete(n, node.right)
        }
        return node
    }

    find(n, node = this.root) {
        if (node === null) {
            return null
        }
        if (node.data === n) {
            return node
        }
        if (node.data > n) {
            return this.find(n, node.left)
        }
        if (node.data < n) {
            return this.find(n, node.right)
        }
    }

    levelOrder(func, arr = [this.root]) {
        if (arr.length === 0) {
            return
        }
        let node = arr.shift()
        func(node.data)
        if (node.left !== null) {
            arr.push(node.left)
        }
        if (node.right !== null) {
            arr.push(node.right)
        }
        this.levelOrder(func, arr)
        /* take root node and add left then right children to queue
        complete function on node then remove next element from queue
        add children to queue then complete function
        */
    }

    inOrder(func, node = this.root) {
        if (node.left !== null) {
            this.inOrder(func, node.left)
        }
        func(node.data)
        if (node.right !== null) {
            this.inOrder(func, node.right)
        }
        /* if node === null, return
         take root node if the left node is !null, recurse function.
        if right node !null recurse function
        call function on node
        */
    }

    preOrder(func, node = this.root) {
        func(node.data)
        if (node.left !== null) {
            this.preOrder(func, node.left)
        }
        if (node.right !== null) {
            this.preOrder(func, node.right)
        }
    }

    postOrder(func, node = this.root) {
        if (node.left !== null) {
            this.postOrder(func, node.left)
        }
        if (node.right !== null) {
            this.postOrder(func, node.right)
        }
        func(node.data)
    }

    height(node, count = 0) {
        if (typeof node === 'number') {
            node = this.find(node)
        }
        if (node === null) {
            return count
        }
        let left = this.height(node.left, count + 1)
        let right = this.height(node.right, count + 1)
        if (left > right) {
            return left
        } else {
            return right
        }
        /* take node and carry out a preorder search.
        create a counter for the preorder search
        create a depth variable
        if the counter is less than the depth, depth = counter

        */
    }

     depth(n, node = this.root, counter = 0) {
        if (node === null) {
            return null
        }
        if (n === node.data) {
            return counter
        }
        if (n > node.data) {
            return this.depth(n, node.right, counter + 1)
        }
        if (n < node.data) {
            return this.depth(n, node.left, counter + 1)
        }
        /* take node and recurse through the tree, if the current node is not
        the requested node, increment counter
        */
     }

     isBalanced(node = this.root) {
        if (node === null) {
            return true
        }
        if (this.isBalanced(node.left) && this.isBalanced(node.right)) {
            if (Math.abs(this.height(node.left) - this.height(node.right) <= 1)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
        // if right subtree and left subtree return true then check if heights of two
        // subtrees have a difference not greater than 1
        // if so, return true
        // else return false
     }

     rebalance() {
        let array = []
        function pushToArray(node) {
            array.push(node)
        }
        this.inOrder(pushToArray)
        this.root = this.buildTree(array)
     }
}

// Helper functions for buildTree

function sortedArrayToBST(array, start, end) {
    if (start > end) {
        return null
    }
    let mid = parseInt((start + end) / 2)
    let node = new Node(array[mid])
    node.left = sortedArrayToBST(array, start, (mid - 1))
    node.right = sortedArrayToBST(array, (mid + 1), end)
    return node
}

function mergeSort(array) {
    if (array.length < 2) return array

    let a = array.splice(0, (array.length / 2))
    let b = array
    let sortedA = mergeSort(a)
    let sortedB = mergeSort(b)
    let c = []

    while (sortedA.length > 0 && sortedB.length > 0) {
        if (sortedA[0] < sortedB[0]) {
            c.push(sortedA.shift())
        } else {
            c.push(sortedB.shift())
        }
    }

    if (sortedA.length > 0) {
        c = c.concat(sortedA)
    }
    if (sortedB.length > 0) {
        c = c.concat(sortedB)
    }
    return c
}

// Function displays the tree in the console

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

// Driver Script to test BST

// create random array
// make array
// for loop for random length between 5 - 20
// in for loop add random number between 1 - 2000

function makeRandArray() {
    let array = []
    let arrayLength = Math.floor(Math.random() * 20) + 5
    for (let i = 0; i < arrayLength; i++) {
        array.push(Math.floor(Math.random() * 2000) + 1)    
    }
    return array
}

function unbalance(tree) {
    let numOfElements = Math.floor(Math.random()) + 100
    for (let i = 0; i < numOfElements; i++) {
        tree.insert(Math.floor(Math.random() * 2000) + 1)    
    }
}

let randomArray = makeRandArray()

let tree = new Tree(randomArray)
tree.root = tree.buildTree(tree.arr)
console.log(tree.isBalanced())
tree.levelOrder(console.log)
tree.preOrder(console.log)
tree.postOrder(console.log)
tree.inOrder(console.log)
unbalance(tree)
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
tree.levelOrder(console.log)
tree.preOrder(console.log)
tree.postOrder(console.log)
tree.inOrder(console.log)

prettyPrint(tree.root)