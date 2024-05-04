import readline from 'node:readline/promises'

// 1. Crear un algoritmo que muestre los números impares entre el 0 y el 100.

function showOdds() {
  for (let i = 1; i < 100; i++) {
    if (i % 2 === 1) {
      console.log(i)
    }
  }
}

// Uncomment the line below to test the function

// showOdds()

// 2. Realizar un programa que ingrese los sueldos de 5 operarios en un vector. Realizar la creación y carga del vector en el constructor. Crear un método para imprimir el vector.

class EmployeeSalaryManager {
  private salaries: number[]

  constructor() {
    this.salaries = []
    this.loadSalaries()
  }

  private async loadSalaries() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    try {
      console.log('Please enter the salaries of 5 employees:')

      for (let i = 0; i < 5; i++) {
        const salary = await rl.question(`Salary of employee ${i + 1}: `)
        this.salaries.push(Number(salary))
      }
    } catch (error) {
      console.error(`Error reading input: ${error}`)
    } finally {
      rl.close()
      this.printSalaries()
    }
  }

  public printSalaries() {
    console.log('The salaries of the employees are:')
    for (let i = 0; i < this.salaries.length; i++) {
      console.log(`Employee ${i + 1}: ${this.salaries[i]}`)
    }
  }
}

// Uncomment the line below to test the class

// const salaryManager = new EmployeeSalaryManager()

// 3. Plantear una clase llamada Alumno y definir como atributos su nombre y su edad. En el constructor realizar el ingreso de datos. Definir otros dos métodos para imprimir los datos ingresados y un mensaje si es mayor o no de edad (edad >= 18)

class Student {
  private name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  public printInfo(): void {
    console.log(`Nombre: ${this.name}`)
    console.log(`Edad: ${this.age}`)
  }

  public isAdult(): void {
    if (this.age >= 18) console.log(`${this.name} es mayor de edad.`)
    else console.log(`${this.name} es menor de edad.`)
  }
}

// Uncomment the line below to test the class

// const student1 = new Student('Juan', 20)
// student1.printInfo()
// student1.isAdult()

// console.log('-----------')

// const student2 = new Student('Maria', 15)
// student2.printInfo()
// student2.isAdult()

// 4. JavaScript ES6: Dados los siguientes array, imprimir por consola los elementos del array “y” que no se encuentran en el array “x” utilizando para tal fin una única línea de código. const x = ["n", "bro", "c", "|"]; const y = ["d", "n", "l", "bro", "g"];

const x = ['n', 'bro', 'c', '|']
const y = ['d', 'n', 'l', 'bro', 'g']
const printElNotInX = () =>
  y.filter((el) => !x.includes(el)).forEach((el) => console.log(el))

// Uncomment the line below to test the function
// printElNotInX()
