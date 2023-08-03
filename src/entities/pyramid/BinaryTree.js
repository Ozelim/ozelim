

export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Define the BinaryTree class
export class BinaryTree {
  constructor() {
    this.root = null;
    this.nodes = [];
  }

  // Insert a value into the binary tree
  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      this.nodes.push(newNode);
    } else {
      const parent = this.nodes[0];
      if (!parent.left) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
        this.nodes.shift(); // Remove the parent after both children are added
      }
      this.nodes.push(newNode);
    }
  }

  // _insertNode(node, newNode) {
  //   console.log(node, newNode, 'nodes');
  //   if (newNode.value < node.value) {
  //     if (!node.left) {
  //       node.left = newNode;
  //     } else {
  //       this._insertNode(node.left, newNode);
  //     }
  //   } else {
  //     if (!node.right) {
  //       node.right = newNode;
  //     } else {
  //       this._insertNode(node.right, newNode);
  //     }
  //   }
  // }

  // Search for a value in the binary tree
  search(value) {
    return this._searchNode(this.root, value);
  }

  _searchNode(node, value) {
    if (!node) return false;

    if (node.value === value) {
      return true;
    } else if (value < node.value) {
      return this._searchNode(node.left, value);
    } else {
      return this._searchNode(node.right, value);
    }
  }

  // In-order traversal (Left, Root, Right)
  inOrderTraversal(callback) {
    this._inOrderTraversalNode(this.root, callback);
  }

  _inOrderTraversalNode(node, callback) {
    if (node) {
      this._inOrderTraversalNode(node.left, callback);
      callback(node.value);
      this._inOrderTraversalNode(node.right, callback);
    }
  }

  // Pre-order traversal (Root, Left, Right)
  preOrderTraversal(callback) {
    this._preOrderTraversalNode(this.root, callback);
  }

  _preOrderTraversalNode(node, callback) {
    if (node) {
      callback(node.value);
      this._preOrderTraversalNode(node.left, callback);
      this._preOrderTraversalNode(node.right, callback);
    }
  }

  // Post-order traversal (Left, Right, Root)
  postOrderTraversal(callback) {
    this._postOrderTraversalNode(this.root, callback);
  }

  _postOrderTraversalNode(node, callback) {
    if (node) {
      this._postOrderTraversalNode(node.left, callback);
      this._postOrderTraversalNode(node.right, callback);
      callback(node.value);
    }
  }
}
