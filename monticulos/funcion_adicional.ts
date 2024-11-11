// patrones


class Medicamento {
    private nombre: string;
    private codigo: string; // Código como "P0012"
    private precio: number;

    constructor(nombre: string, codigo: string, precio: number) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
    }

    // Método para obtener solo la parte numérica del código
    public obtenerCodigoNumerico(): string {
        const match = this.codigo.match(/\d+/); // Extrae la parte numérica del código
        return match ? match[0] : ""; // Devuelve la parte numérica o una cadena vacía si no la encuentra
    }
}

// Ejemplo de uso
const medicamento = new Medicamento("Ibuprofeno", "P0012", 10.50);
console.log(medicamento.obtenerCodigoNumerico()); // Imprimirá "0012"

// ----------------------------------------------------------------
// sin patrones 
class Medicamentox {
    private nombre: string;
    private codigo: string; // Código como "P0012"
    private precio: number;

    constructor(nombre: string, codigo: string, precio: number) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
    }

    // Método para obtener solo la parte numérica del código
    public obtenerCodigoNumerico(): string {
        let numeros = ""; // Variable para acumular los números
        for (let i = 0; i < this.codigo.length; i++) {
            const char = this.codigo[i];
            // Verificamos si el carácter es un dígito
            if (char >= '0' && char <= '9') {
                numeros += char; // Agregamos el dígito a la cadena de números
            }
        }
        return numeros;
    }
}

// Ejemplo de uso
const medicamento = new Medicamento("Ibuprofeno", "P0012", 10.50);
console.log(medicamento.obtenerCodigoNumerico()); // Imprimirá "0012