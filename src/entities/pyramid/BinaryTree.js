export class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

export class BinaryTree {
  constructor(maxLevels) {
    this.root = null;
    this.nodes = [];
    this.maxLevels = maxLevels;
    this.currentLevel = 1;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      this.nodes.push(newNode);
    } else {
      let parent = this.nodes[0];
      if (parent.children.length < 2) {
        parent.children.push(newNode);
      } else {
        while (parent.children.length === 2) {
          this.nodes.shift();
          parent = this.nodes[0];
        }
        parent.children.push(newNode);
      }
      this.nodes.push(newNode);
    }

    this.currentLevel++;
  }

  // insert(value, level = 0) {
  //   const newNode = new No
  // de(value);

  //   if (level >= this.maxLevels) {
  //     return;
  //   }

  //   if (!this.root) {
  //     this.root = newNode;
  //     this.nodes.push(newNode);
  //   } else {
  //     const parent = this.nodes[0];
  //     if (parent.children.length < 2) {
  //       parent.children.push(newNode);
  //       level = level + 1; // Исправлено
  //     } else {
  //       parent.children[0].children.push(newNode);
  //       level = level + 1; // Исправлено
  //       this.nodes.shift();
  //     }
  //     this.nodes.push(newNode);
  //   }
  // }

  // insert(value, level = 0) {
  //   const newNode = new Node(value);

  //   if (level >= this.maxLevels) {
  //     return;
  //   }

  //   if (!this.root) {
  //     this.root = newNode;
  //     this.nodes.push(newNode);
  //   } else {
  //     const parent = this.nodes[0];
  //     if (parent.children.length < 2) {
  //       parent.children.push(newNode);
  //       level + 1;
  //     } else {
  //       parent.children[0].children.push(newNode);
  //       level + 1;
  //       this.nodes.shift();
  //     }
  //     this.nodes.push(newNode);
  //   }
  // }

  findLevelById(id) {
    return this.findLevelByIdNode(this.root, id, 0);
  }

  findLevelByIdNode(node, id, level) {
    if (!node) {
      return -1;
    }

    if (node.value.id === id) {
      return level;
    }

    for (const child of node.children) {
      const childLevel = this.findLevelByIdNode(child, id, level + 1);
      if (childLevel !== -1) {
        return childLevel;
      }
    }

    return -1;
  }
  
  findMaxLevel() {
    return this.findMaxLevelNode(this.root, 0);
  }

  findMaxLevelNode(node, currentLevel) {
    if (!node) {
      return currentLevel;
    }

    let maxLevel = currentLevel;

    for (const child of node.children) {
      const childLevel = this.findMaxLevelNode(child, currentLevel + 1);
      maxLevel = Math.max(maxLevel, childLevel);
    }

    return maxLevel;
  }

  search(value) {
    return this._searchNode(this.root, value);
  }

  _searchNode(node, value) {
    if (!node) return false;

    if (node.value === value) {
      return true;
    } else {
      for (const child of node.children) {
        if (this._searchNode(child, value)) {
          return true;
        }
      }
      return false;
    }
  }

  inOrderTraversal(callback) {
    this._inOrderTraversalNode(this.root, callback);
  }

  _inOrderTraversalNode(node, callback) {
    if (node) {
      for (const child of node.children) {
        this._inOrderTraversalNode(child, callback);
      }
      callback(node.value);
    }
  }

  preOrderTraversal(callback) {
    this._preOrderTraversalNode(this.root, callback);
  }

  _preOrderTraversalNode(node, callback) {
    if (node) {
      callback(node.value);
      for (const child of node.children) {
        this._preOrderTraversalNode(child, callback);
      }
    }
  }

  postOrderTraversal(callback) {
    this._postOrderTraversalNode(this.root, callback);
  }

  _postOrderTraversalNode(node, callback) {
    if (node) {
      for (const child of node.children) {
        this._postOrderTraversalNode(child, callback);
      }
      callback(node.value);
    }
  }
}