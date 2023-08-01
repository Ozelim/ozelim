// Define the Node class to represent each node in the tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Define the BinaryTree class to represent the binary tree
export class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Function to insert a value into the binary tree
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Function to perform an inorder traversal of the binary tree
  inorderTraversal(node = this.root, result = []) {
    if (node) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
    return result;
  }

  // Function to perform a preorder traversal of the binary tree
  preorderTraversal(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
    return result;
  }

  // Function to perform a postorder traversal of the binary tree
  postorderTraversal(node = this.root, result = []) {
    if (node) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }
}

// Example usage:

