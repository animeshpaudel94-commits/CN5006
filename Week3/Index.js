function EmployeeInfo(name,Salary)
{
    console.log("Wellcome" + name+ "Your month Salary is "+ Salary)
}

const EmpSkills= (skills)=> {
    console.log("Expert in "+ skills)
}
console.log ("THis is my first program")

var EmpName="John"
var EmpSalary= 5000
// calling of the function EmployeeInfo
EmployeeInfo(EmpName,EmpSalary)
EmpSkills("java")
const student= require('./StudentInfo') 
const person = require('./Person')  
// because getName is the function so we use () 
console.log("Student Name:" +student.getName())  
console.log(student.Location())  
console.log(student.dob)  
// because dob is a variable so we do nt use () 
console.log(student.Studentgrade()) 
console.log("grade is "+student.Studentgrade(55) ) 
// creating new Person 
person1= new person("Jim","USA","myemail@gmail.com") 
console.log("using Person Module",person1.getPersonInfo)
console.log("Programe ended")


