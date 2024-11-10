// Clase Nodo que representa un nodo de una lista doblemente enlazada
class Nodo {
    constructor(
        public data: Estudiante,  // Datos del nodo, en este caso un objeto de tipo Estudiante
        public prev: Nodo | null = null,  // Referencia al nodo anterior en la lista
        public next: Nodo | null = null   // Referencia al siguiente nodo en la lista
    ) {}
}

// Clase que representa una lista doblemente enlazada
class DoubleLinkedList {
    private head: Nodo | null = null;  // Primer nodo de la lista
    private tail: Nodo | null = null;  // Último nodo de la lista

    // Método para insertar un nuevo nodo al final de la lista
    public insert(data: Estudiante): void {
        const newNode = new Nodo(data);  // Crea un nuevo nodo con los datos del estudiante
        if (!this.tail) {  // Si la lista está vacía
            this.head = newNode;  // El nuevo nodo es tanto head como tail
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;  // El nuevo nodo apunta hacia el antiguo último nodo
            this.tail.next = newNode;  // El antiguo último nodo apunta hacia el nuevo nodo
            this.tail = newNode;  // El nuevo nodo se convierte en el último nodo
        }
    }

    // Método para buscar un nodo en la lista por el carnet del estudiante
    public search(carnet: number): Estudiante | null {
        let current = this.head;  // Inicia desde el head de la lista
        while (current) {  // Recorre la lista hasta encontrar el nodo o llegar al final
            if (current.data.getCarnet() === carnet) {  // Verifica si el carnet coincide
                return current.data;  // Retorna los datos del estudiante si coincide
            }
            current = current.next;  // Avanza al siguiente nodo
        }
        return null;  // Retorna null si no se encontró el estudiante
    }

    // Método para eliminar un nodo de la lista por el carnet del estudiante
    public delete(carnet: number): boolean {
        let current = this.head;  // Inicia desde el head de la lista
        while (current) {
            if (current.data.getCarnet() === carnet) {  // Verifica si el carnet coincide
                if (current.prev) {
                    current.prev.next = current.next;  // Enlaza el nodo anterior al siguiente nodo
                } else {
                    this.head = current.next;  // Si es el primer nodo, actualiza head
                }

                if (current.next) {
                    current.next.prev = current.prev;  // Enlaza el siguiente nodo al anterior
                } else {
                    this.tail = current.prev;  // Si es el último nodo, actualiza tail
                }

                return true;  // Retorna true si el estudiante fue eliminado
            }
            current = current.next;  // Avanza al siguiente nodo
        }
        return false;  // Retorna false si el estudiante no fue encontrado
    }

    // Método para obtener una representación en texto de la lista
    public print(): string {
        if (!this.head) return "-----";  // Retorna un marcador si la lista está vacía
        let result: string = "";
        let current: Nodo | null = this.head;

        while (current) {  // Recorre todos los nodos de la lista
            if (current.next == null) {
                result += current.data;  // Agrega el último elemento sin separador
            } else {
                result += current.data + " || ";  // Agrega el elemento seguido de un separador
            }
            current = current.next;  // Avanza al siguiente nodo
        }

        return result;
    }
}

// Clase Estudiante que representa los datos de un estudiante
class Estudiante {
    private nombre: string;
    private carnet: number;
    private carrera: string;

    constructor(nombre: string, carnet: number, carrera: string) {
        this.nombre = nombre;
        this.carnet = carnet;
        this.carrera = carrera;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCarnet(): number {
        return this.carnet;
    }

    public getCarrera(): string {
        return this.carrera;
    }

    public toString(): string {
        return `${this.carnet} - ${this.nombre} - ${this.carrera}`;  // Representación en texto del estudiante
    }
}

// Clase HashTable que utiliza una tabla hash para organizar los estudiantes en listas enlazadas
class HashTable {
    private size: number;  // Tamaño de la tabla hash
    private data: DoubleLinkedList[];  // Arreglo de listas enlazadas dobles

    constructor() {
        this.size = 10;  // Define un tamaño fijo de 10 para la tabla hash
        this.data = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.data[i] = new DoubleLinkedList();  // Inicializa cada posición con una lista doblemente enlazada
        }
    }

    // Función hash para obtener el índice en la tabla a partir del carnet
    private hash(key: number): number {
        return key % this.size;
    }

    // Inserta un estudiante en la posición calculada por la función hash
    public insert(student: Estudiante): void {
        const index: number = this.hash(student.getCarnet());
        this.data[index].insert(student);
    }

    // Busca un estudiante por su carnet
    public search(carnet: number): Estudiante | null {
        const index: number = this.hash(carnet);
        return this.data[index].search(carnet);
    }

    // Elimina un estudiante por su carnet
    public delete(carnet: number): boolean {
        const index: number = this.hash(carnet);
        return this.data[index].delete(carnet);
    }

    // Imprime la tabla hash mostrando cada lista en cada posición
    public print(): void {
        for (let i = 0; i < this.size; i++) {
            console.log(`${i + 1}. ${this.data[i].print()}`);
        }
    }
}

// Ejemplo de uso del código
let estudiante1 = new Estudiante("Javier", 2012421, "Sistemas");
let estudiante2 = new Estudiante("Roberto", 1245522, "Sistemas");
let estudiante3 = new Estudiante("Elena", 4567822, "Sistemas");
let estudiante4 = new Estudiante("Josue", 1235921, "Industrial");
let estudiante5 = new Estudiante("Martin", 2561423, "Civil");
let myTabla = new HashTable();

myTabla.insert(estudiante1);
myTabla.insert(estudiante2);
myTabla.insert(estudiante3);
myTabla.insert(estudiante4);
myTabla.insert(estudiante5);

let desconocido: Estudiante | null;
desconocido = myTabla.search(2012421);
console.log("BUSCAMOS AL ESTUDIANTE CON CARNET 2012421");
if (desconocido == null){
    console.log("El Estudiante no existe en la lista");
}
else{
    console.log("Buscado: " + desconocido.toString());
}
console.log("");

console.log("ESTUDIANTES EN LA LISTA:");
console.log("CARNET - NOMBRE - CARRERA");
myTabla.print();

// Eliminando un estudiante
console.log("\nEliminando al estudiante con carnet 2012421");
let eliminado = myTabla.delete(2012421);
if (eliminado) {
    console.log("Estudiante eliminado con éxito.");
} else {
    console.log("Estudiante no encontrado.");
}

// Mostrar lista después de eliminar
console.log("\nESTUDIANTES EN LA LISTA DESPUÉS DE LA ELIMINACIÓN:");
myTabla.print();
