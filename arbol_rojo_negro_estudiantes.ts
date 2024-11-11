class Estudiantes {
    private nombre: string;
    private carne: string;
    private promedio: number;

    constructor(nombre: string, carne: string, promedio: number) {
        this.nombre = nombre;
        this.carne = carne;
        this.promedio = promedio;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCarne(): string {
        return this.carne;
    }

    public getPromedio(): number {
        return this.promedio;
    }

    public toString(): string {
        return `nombre: ${this.nombre}, carne: ${this.carne}, promedio: ${this.promedio}`;
    }
}

class NodeRBT {
    private data: Estudiantes;
    private father!: NodeRBT;
    private leftChild!: NodeRBT;
    private rightChild!: NodeRBT;
    private color: string;

    constructor(data: Estudiantes, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf) this.color = "BLACK";
    }

    public getData(): Estudiantes {
        return this.data;
    }

    public setData(newData: Estudiantes): void {
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
        this.leaf = new NodeRBT(new Estudiantes("", "", 0), true);
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

    public insert(student: Estudiantes): void {
        let newNode: NodeRBT = new NodeRBT(student);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData().getPromedio() < current.getData().getPromedio()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData().getPromedio() < parent.getData().getPromedio()) {
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

    public delete(promedio: number): void {
        let nodeToDelete: NodeRBT | null = this.searchNode(promedio, this.root);
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

                if (sibling.getRightChild().getColor() === "BLACK" && sibling.getLeftChild().getColor() === "BLACK") {
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

    private successor(node: NodeRBT): NodeRBT {
        let current: NodeRBT = node.getRightChild();
        while (current.getLeftChild() !== this.leaf) {
            current = current.getLeftChild();
        }
        return current;
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

    private searchNode(promedio: number, node: NodeRBT): NodeRBT | null {
        if (node === this.leaf) {
            return null;
        }

        if (promedio === node.getData().getPromedio()) {
            return node;
        } else if (promedio < node.getData().getPromedio()) {
            return this.searchNode(promedio, node.getLeftChild());
        } else {
            return this.searchNode(promedio, node.getRightChild());
        }
    }

     // Método para buscar estudiantes con un promedio específico
     public searchByPromedio(promedio: number): void {
        let node = this.searchNode(promedio, this.root);
        if (node) {
            console.log("Estudiante encontrado: " + node.getData().toString());
        } else {
            console.log("No se encontró ningún estudiante con ese promedio.");
        }
    }

    // Método para buscar estudiantes dentro de un rango de promedios
    public searchByRange(minPromedio: number, maxPromedio: number): void {
        console.log(`Buscando estudiantes con promedios entre ${minPromedio} y ${maxPromedio}:`);
        this.searchInRange(this.root, minPromedio, maxPromedio);
    }

    // Función auxiliar para buscar en el rango de promedios
    private searchInRange(node: NodeRBT, minPromedio: number, maxPromedio: number): void {
        if (node === this.leaf) {
            return;
        }

        let promedio = node.getData().getPromedio();
        if (promedio >= minPromedio && promedio <= maxPromedio) {
            console.log(node.getData().toString());
        }

        if (promedio > minPromedio) {
            this.searchInRange(node.getLeftChild(), minPromedio, maxPromedio);
        }

        if (promedio < maxPromedio) {
            this.searchInRange(node.getRightChild(), minPromedio, maxPromedio);
        }
    }
}

// Ejemplo de uso
let rbTree = new RBTree();
rbTree.insert(new Estudiantes("Juan Pérez", "2018001", 85));
rbTree.insert(new Estudiantes("Ana Gómez", "2018002", 90));
rbTree.insert(new Estudiantes("Carlos Martínez", "2018003", 80));
rbTree.insert(new Estudiantes("Luisa Fernández", "2018004", 95));

// Imprimir estudiantes ordenados por promedio
rbTree.printAll();
console.log("se eliminara el estudiante con 85")

// Eliminar estudiante con promedio 85
rbTree.delete(85);

// Imprimir nuevamente
rbTree.printAll();

// rbTree.search(95)

// Buscar estudiantes con un promedio específico
rbTree.searchByPromedio(90);

// Buscar estudiantes con promedios dentro de un rango
rbTree.searchByRange(80, 90);


// clase rbt se importa: import { Estudent } from "./estudent";
// import { NodeRBT } from "./node_rbt";

// clase nodoRBT se importa:  import { Estudent } from "./estudent";

// index.ts se importa : import { Estudent } from "./estudent";
// import { RBTree } from "./rbt";