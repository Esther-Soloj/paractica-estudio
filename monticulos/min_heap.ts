export class Task {
    private name: string;
    private priority: number;

    constructor(name: string, priority: number) {
        this.name = name;
        this.priority = priority;
    }

    public getName(): string {
        return this.name;
    }

    public getPriority(): number {
        return this.priority;
    }

    public showInformation(): string {
        return this.name + " con prioridad " + this.priority; 
    }
}


class MinHeap{
    private heap: Task[];
    private n: number; // n = cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): string {
        return this.heap[1].getName() + " - Prioridad:" + this.heap[1].getPriority();
    }

    public isEmpty(): boolean {
        return this.n == 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(value: Task): void {
        if (this.n == (this.heap.length - 1))
            this.resize(2 * this.heap.length)
        this.n++;
        this.heap[this.n] = value;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].getPriority() > this.heap[i].getPriority()) {
            let temp: Task = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: Task[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++)
            newHeap[i] = this.heap[i];
        this.heap = newHeap;
    }


    // metodo para eliminar el mínimo
    public getNextTask(): string {
        if (this.n == 0)
            return "No hay tareas pendientes"
        let min: Task = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.n--;
        this.sink(1); // Procedimiento que reestructura el árbol AVL
        return min.showInformation();
    }

    private sink(i: number): void {
        while (2*i <= this.n) {
            let j: number = 2*i; // empezamos asumiendo que el hijo izquierdo es el menor
            if (j < this.n && this.heap[j].getPriority() > this.heap[j+1].getPriority())
                j++; // cambia a hijo derecho si este es el menor
            if (this.heap[i].getPriority() <= this.heap[j].getPriority())
                break;
            // Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp: Task = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            // verificamos si procede otro intercambio hacia abajo
            i = j;
        }
    }

    //  método para listar los nodos dentro de un rango de prioridad
    public listInRange(minPriority: number, maxPriority: number): Task[] {
        const nodesInRange: Task[] = [];
        for (let i = 1; i <= this.n; i++) {
            if (this.heap[i].getPriority() >= minPriority && this.heap[i].getPriority() <= maxPriority) {
                nodesInRange.push(this.heap[i]);
            }
        }
        return nodesInRange;
    }

    public print(): void {
        let tree: string = "";
        for (let i=1; i<=this.n; i++) {
            tree += "[" + this.heap[i].getName() + "] ";
        }
        console.log(tree);
    }
}


// main

let pendientes: MinHeap = new MinHeap(6);
pendientes.insert(new Task("Calificar Laboratorio 1", 1));
pendientes.insert(new Task("Calificar Laboratorio 2", 4));
pendientes.insert(new Task("Reunirse con facultad de ingeniería", 1));
pendientes.insert(new Task("Preparar la siguiente clase", 2));
pendientes.insert(new Task("Definir Laboratorio 3", 3));
pendientes.insert(new Task("Inscribirse a capacitación general", 1));
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());
console.log("La siguiente tarea a realizar es: " + pendientes.getNextTask());


// Llamada al  método para obtener tareas con prioridad entre 1 y 3
const tasksInRange = pendientes.listInRange(1, 3);
tasksInRange.forEach(task => console.log(task.showInformation())); 