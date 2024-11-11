class NodeRBT {
    private data: number; 
    private father!: NodeRBT;  // NodeRBT* es un apuntador
    private leftChild!: NodeRBT; // "!" significa que el atributo no será inicializado en el constructor ...
    private rightChild!: NodeRBT; // ... pero que sí se inicializará en otra parte
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getData(): number {
        return this.data;
    }

    public setData(newData: number): void {
        this.data = newData;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true); // Nodo hoja de color negro
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() === "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private printNode(node: NodeRBT): void {
        if (node.getLeftChild() !== this.leaf)
            this.printNode(node.getLeftChild());
        console.log(node.getData() + "(" + node.getColor() + ")");
        if (node.getRightChild() !== this.leaf)
            this.printNode(node.getRightChild());
    }

    public printAll(): void {
        console.log("Orden ascendente ");
        this.printNode(this.root);
    }

    public insert(data: number): void {
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() === this.leaf)
            return;

        this.fixInsert(newNode);
    }

    public delete(data: number): void {
        let nodeToDelete: NodeRBT | null = this.searchNode(data, this.root);
        if (nodeToDelete === null) {
            console.log("El nodo no se encuentra en el árbol.");
            return;
        }

        let nodeToFix: NodeRBT | null;
        let child: NodeRBT;

        if (nodeToDelete.getLeftChild() === this.leaf || nodeToDelete.getRightChild() === this.leaf) {
            nodeToFix = nodeToDelete;
        } else {
            nodeToFix = this.successor(nodeToDelete);
        }

        if (nodeToFix.getLeftChild() !== this.leaf) {
            child = nodeToFix.getLeftChild();
        } else {
            child = nodeToFix.getRightChild();
        }

        child.setFather(nodeToFix.getFather());

        if (nodeToFix.getFather() === this.leaf) {
            this.root = child;
        } else if (nodeToFix === nodeToFix.getFather().getLeftChild()) {
            nodeToFix.getFather().setLeftChild(child);
        } else {
            nodeToFix.getFather().setRightChild(child);
        }

        if (nodeToFix !== nodeToDelete) {
            nodeToDelete.setData(nodeToFix.getData());
        }

        if (nodeToFix.getColor() === "BLACK") {
            this.fixDelete(child);
        }
    }

    private fixDelete(node: NodeRBT): void {
        while (node !== this.root && node.getColor() === "BLACK") {
            if (node === node.getFather().getLeftChild()) {
                let sibling: NodeRBT = node.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.leftRotate(node.getFather());
                    sibling = node.getFather().getRightChild();
                }

                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = node.getFather().getRightChild();
                    }

                    // sibling.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(node.getFather());
                    node = this.root;
                }
            } else {
                let sibling: NodeRBT = node.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    node.getFather().setNodeAsRed();
                    this.rightRotate(node.getFather());
                    sibling = node.getFather().getLeftChild();
                }

                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    node = node.getFather();
                } else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = node.getFather().getLeftChild();
                    }

                    // sibling.setColor(node.getFather().getColor());
                    node.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(node.getFather());
                    node = this.root;
                }
            }
        }
        node.setNodeAsBlack();
    }

        // Método para buscar un número en específico.

       // Método de búsqueda público
       public search(data: number): NodeRBT | null {
        const result = this.searchNode(data, this.root);
        if (result === null) {
            console.log(`El numero no esta en el arbol.`);
        } else {
            console.log(`Numero ${data} encontrado.`);
        }
        return result;
    }

    // Método de búsqueda privada 

    private searchNode(data: number, node: NodeRBT): NodeRBT | null {
        if (node === this.leaf || node.getData() === data)
            return node === this.leaf ? null : node;
        if (data < node.getData())
            return this.searchNode(data, node.getLeftChild());
        else
            return this.searchNode(data, node.getRightChild());
    }

    private successor(node: NodeRBT): NodeRBT {
        let current = node.getRightChild();
        while (current.getLeftChild() !== this.leaf) {
            current = current.getLeftChild();
        }
        return current;
    }

    public searchInRange(min: number, max: number): number[] {
        let result: number[] = [];
        this.searchRangeHelper(this.root, min, max, result);
        return result;
    }
    
    private searchRangeHelper(node: NodeRBT, min: number, max: number, result: number[]): void {
        if (node === this.leaf) {
            return;
        }
    
        if (node.getData() > min) {
            this.searchRangeHelper(node.getLeftChild(), min, max, result);
        }
    
        if (node.getData() >= min && node.getData() <= max) {
            result.push(node.getData());
        }
    
        if (node.getData() < max) {
            this.searchRangeHelper(node.getRightChild(), min, max, result);
        }
    }

}

const myRBTree: RBTree = new RBTree();
myRBTree.insert(7);
myRBTree.insert(15);
myRBTree.insert(11);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(50);
myRBTree.insert(45);
myRBTree.insert(5);
myRBTree.printAll();
console.log("nodo eliminado ; 15")
myRBTree.delete(15);
console.log("Árbol después de la eliminación:");
myRBTree.printAll();
myRBTree.search(11);
// Buscar números dentro del rango 10 a 40
let numbersInRange = myRBTree.searchInRange(10, 40);
console.log("Números dentro del rango [10, 40]: ", numbersInRange);
