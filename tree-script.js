class TreeNode {
    constructor(value) {
        this.value = value;
        this.parent = null;
    }
    
    constructor(value, parent) {
        this.value = value;
        this.parent = parent;
    }
}

class Tree {
    constructor(root) {
        this.root = root;
        root.value = root;
    }
}

function createTreeNodeElement(value) {
    const nodeElement = document.createElement('div');
    nodeElement.classList.add('node');
    nodeElement.textContent = value;
    return nodeElement;
}
