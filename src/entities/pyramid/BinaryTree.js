

export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Define the BinaryTree class
export class BinaryTree {
  constructor(maxLevels) {
    this.root = null;
    this.nodes = [];
    this.maxLevels = maxLevels;
  }

  // Insert a value into the binary tree
  insert(value, level = 0) {
    const newNode = new Node(value);

    if (level >= this.maxLevels) { 
      return; // Stop inserting if maximum levels are reached
    }

    if (!this.root) {
      this.root = newNode;
      this.nodes.push(newNode);
    } else {
      const parent = this.nodes[0];
      if (!parent.left) {
        parent.left = newNode;
        level + 1
      } else {
        parent.right = newNode;
        level + 1
        this.nodes.shift(); // Remove the parent after both children are added
      }
      this.nodes.push(newNode);
    }
  }
  
  findLevelById(id) {
    return this.findLevelByIdNode(this.root, id, 0);
  }

  findLevelByIdNode(node, id, level) {
    if (!node) {
      return -1; // Node not found
    }

    if (node.value.id === id) {
      return level; // Node found, return its level
    }

    const leftLevel = this.findLevelByIdNode(node.left, id, level + 1);
    if (leftLevel !== -1) {
      return leftLevel; // Node found in the left subtree, return its level
    }

    const rightLevel = this.findLevelByIdNode(node.right, id, level + 1);
    if (rightLevel !== -1) {
      return rightLevel; // Node found in the right subtree, return its level
    }

    return -1; // Node not found in the current node or its descendants
  }

  findMaxLevel() {
    return this.findMaxLevelNode(this.root);
  }

  findMaxLevelNode(node) {
    if (!node) {
      return 0; // If node is null, return 0 (empty tree has level 0)
    }

    // Perform a level-order traversal using a queue
    const queue = [node];
    let maxLevel = 0;

    while (queue.length > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift();

        if (currentNode.left) {
          queue.push(currentNode.left);
        }

        if (currentNode.right) {
          queue.push(currentNode.right);
        }
      }

      maxLevel++; // Increment level after processing each level
    }

    return maxLevel - 1; // Since levels start from 0, we subtract 1 from maxLevel
  }

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
