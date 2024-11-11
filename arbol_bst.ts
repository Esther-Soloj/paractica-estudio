class NodeBST {
    private data: number;
    private leftChild: NodeBST | null = null;
    private rightChild: NodeBST | null = null;

    constructor(data: number) {
        this.data = data;
    }

    public getData(): number {
        return this.data;
    }

    public getLeftChild(): NodeBST | null {
        return this.leftChild;
    }

    public setLeftChild(newChild: NodeBST | null): void {
        this.leftChild = newChild;
    }

    public getRightChild(): NodeBST | null {
        return this.rightChild;
    }

    public setRightChild(newChild: NodeBST | null): void {
        this.rightChild = newChild;
    }
}

class BST {
    private root: NodeBST | null = null;

    public insert(data: number): void {
        const newNode = new NodeBST(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(node: NodeBST, newNode: NodeBST): void {
        if (newNode.getData() < node.getData()) {
            if (node.getLeftChild() === null) {
                node.setLeftChild(newNode);
            } else {
                this.insertNode(node.getLeftChild()!, newNode);
            }
        } else {
            if (node.getRightChild() === null) {
                node.setRightChild(newNode);
            } else {
                this.insertNode(node.getRightChild()!, newNode);
            }
        }
    }

    public search(data: number): NodeBST | null {
        return this.searchNode(this.root, data);
    }

    private searchNode(node: NodeBST | null, data: number): NodeBST | null {
        // Si el nodo es null, significa que el valor no fue encontrado
        if (node === null) {
            // console.log("Valor no encontrado.");
            return null;
        }
        // Si el valor es igual, devolvemos el nodo
        if (data === node.getData()) {
            return node;
        }
        // Si el valor es menor, buscamos en el subárbol izquierdo
        if (data < node.getData()) {
            return this.searchNode(node.getLeftChild(), data);
        } else {
            // Si el valor es mayor, buscamos en el subárbol derecho
            return this.searchNode(node.getRightChild(), data);
        }
    }

    public printAll(): void {
        console.log("Arbol en orden ascendente:");
        this.printNode(this.root);
    }

    private printNode(node: NodeBST | null): void {
        if (node !== null) {
            this.printNode(node.getLeftChild());
            console.log(node.getData());
            this.printNode(node.getRightChild());
        }
    }
}

// Pruebas
const myBST = new BST();
myBST.insert(7);
myBST.insert(15);
myBST.insert(11);
myBST.insert(20);
myBST.insert(30);
myBST.insert(50);
myBST.insert(45);
myBST.insert(5);

// Mostrar todos los nodos en orden ascendente
myBST.printAll();

// Buscar un valor
const foundNode = myBST.search(13);
if (foundNode !== null) {
    console.log("Valor encontrado: " + foundNode.getData());
} else {
    console.log("Valor no encontrado.");
}
