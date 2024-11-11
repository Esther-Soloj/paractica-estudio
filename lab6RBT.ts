
// Maria Esther 1627021
class NodeRBT {
    private data: number;
    private father!: NodeRBT;
    private leftChild!: NodeRBT; 
    private rightChild!: NodeRBT; 
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
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
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
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
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
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    // Orden de impresion lab 4
    private printInorden(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.printInorden(nodo.getLeftChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo?.getRightChild() !== this.leaf)
            this.printInorden(nodo.getRightChild());
    }

    private printPreorden(nodo: NodeRBT): void{
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo.getLeftChild() !== this.leaf)
            this.printPreorden(nodo.getLeftChild());
        if (nodo?.getRightChild() !== this.leaf)
            this.printPreorden(nodo.getRightChild());
    }

    private printPostorden(nodo: NodeRBT): void{
        if (nodo.getLeftChild() !== this.leaf)
            this.printPostorden(nodo.getLeftChild());
        if (nodo?.getRightChild() !== this.leaf)
            this.printPostorden(nodo.getRightChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
    }

    // Buscar Lab 4
    private searchNode(nodoInicio: NodeRBT, buscado: number): void | string{
        if (nodoInicio == this.leaf)
            return '-1'
        else{
            if (nodoInicio.getData() == buscado)
                return 'Nodo '+buscado+' encontrado'
            else if (buscado < nodoInicio.getData())
                return this.searchNode(nodoInicio.getLeftChild(), buscado)
            else if (buscado > nodoInicio.getData())
                return this.searchNode(nodoInicio.getRightChild(), buscado)
        }
    }

    private searchNodeEliminate(key: number): NodeRBT{
        let current: NodeRBT = this.root;
        while (current !== this.leaf) {
            if (current.getData() === key) {
                return current;
            } else if (key < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        return this.leaf;
    }

    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    private fixDelete(x: NodeRBT): void {
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                let w = x.getFather().getRightChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    w = x.getFather().getRightChild();
                }
                if (w.getLeftChild().getColor() === "BLACK" && w.getRightChild().getColor() === "BLACK") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getRightChild().getColor() === "BLACK") {
                        w.getLeftChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.rightRotate(w);
                        w = x.getFather().getRightChild();
                    }
                    let color = x.getFather().getColor()
                    if (color == 'BLACK')
                        w.setNodeAsBlack()
                    else
                        w.setNodeAsRed()
                    x.getFather().setNodeAsBlack();
                    w.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            } else {
                let w = x.getFather().getLeftChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    w = x.getFather().getLeftChild();
                }
                if (w.getRightChild().getColor() === "BLACK" && w.getLeftChild().getColor() === "BLACK") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getLeftChild().getColor() === "BLACK") {
                        w.getRightChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.leftRotate(w);
                        w = x.getFather().getLeftChild();
                    }
                    let color = x.getFather().getColor()
                    if (color == 'BLACK')
                        w.setNodeAsBlack()
                    else
                        w.setNodeAsRed()
                    x.getFather().setNodeAsBlack();
                    w.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    }

    private deleteNode(key: number): void{
        let z = this.searchNodeEliminate(key);
        if (z === null) {
            console.log("Element not found");
            return;
        }
        let y = z;
        let yOriginalColor = y.getColor();
        let x: NodeRBT;
        if (z.getLeftChild() === this.leaf) {
            x = z.getRightChild();
            this.transplant(z, z.getRightChild());
        } else if (z.getRightChild() === this.leaf) {
            x = z.getLeftChild();
            this.transplant(z, z.getLeftChild());
        } else {
            y = this.minimum(z.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === z) {
                x.setFather(y);
            } else {
                this.transplant(y, y.getRightChild());
                y.setRightChild(z.getRightChild());
                y.getRightChild().setFather(y);
            }
            this.transplant(z, y);
            y.setLeftChild(z.getLeftChild());
            y.getLeftChild().setFather(y);
            let color = z.getColor()
            if (color == 'BLACK')
                y.setNodeAsBlack()
            else
                y.setNodeAsRed()
        }
        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }

    private rangoProcess(nodeInicial: NodeRBT, inicio: number, final: number, rango: any[]){
        if (nodeInicial !== this.leaf){
            if (nodeInicial.getData() >= inicio && nodeInicial.getData() <= final){
                rango.push(nodeInicial.getData())
            }
        this.rangoProcess(nodeInicial.getLeftChild(), inicio, final, rango)
        this.rangoProcess(nodeInicial.getRightChild(), inicio, final, rango)
        }
    }
    
    public printInordenAll(): void {
        this.printInorden(this.root);
    }

    public printPreordenAll(): void{
        this.printPreorden(this.root);
    }

    public printPostordenAll(): void{
        this.printPostorden(this.root);
    }
    
    public insert(data: number): void {
        // Inserción normal de BST
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
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

        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }

    public search(buscado: number): string | void{
        return this.searchNode(this.root, buscado);
    }

    public delete(eliminate: number): void | string{
        this.deleteNode(eliminate)
        return 'Nodo eliminado '+eliminate
    }

    public rango(inicial: number, final: number, rango: any[]){
        return this.rangoProcess(this.root, inicial, final, rango)
    }
}

const myRBTree: RBTree = new RBTree();
myRBTree.insert(9);
myRBTree.insert(12);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(25);

console.log('In Orden:')
myRBTree.printInordenAll();
console.log('\nPre Orden:')
myRBTree.printPreordenAll();
console.log('\nPost Orden:')
myRBTree.printPostordenAll();

console.log('\nBuscaremos el nodo 20')
console.log(myRBTree.search(20))

console.log('\nIn Orden:')
myRBTree.printInordenAll();

const rango: any[] = []


console.log('\nRango desde 21 hasta 24')

myRBTree.rango(21, 24, rango)

console.log(rango)

console.log('\nRango desde 1 hasta 20')

myRBTree.rango(1, 20, rango)

console.log(rango)

console.log('\nJavier Sanchez 2012421')
console.log('Maria Esther 1627021')
