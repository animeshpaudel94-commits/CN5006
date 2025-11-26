const mongoose = require('mongoose');

// Use environment variables for security
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin1@cluster0.ujiblay.mongodb.net/week8';

// Connection without deprecated options
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.error('Connection error:', err));

// Event listeners
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Improved Schema with validation
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age seems unrealistic']
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  Salary: {
    type: Number,
    min: [0, 'Salary cannot be negative']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Model creation - using person_doc as per lab manual
const person_doc = mongoose.model('Person', PersonSchema, 'personCollection');

// Array of multiple persons
const manypersons = [
  { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
  { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
  { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
  { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 },
  { name: 'Sarah', age: 35, Gender: "Female", Salary: 6200 },
  { name: 'Emma', age: 28, Gender: "Female", Salary: 4800 },
  { name: 'Lisa', age: 45, Gender: "Female", Salary: 7500 }
];

// TASK 1: Add single document (doc1.save explanation)
async function task1() {
  console.log("\n=== TASK 1: Adding Single Document ===");
  try {
    const doc1 = new person_doc({
      name: 'Jacky',
      age: 36,
      Gender: "Male",
      Salary: 3456
    });

    // doc1.save() - Saves the document to MongoDB and returns a promise
    // .then() - Handles the successful resolution of the promise
    const savedDoc = await doc1.save();
    console.log("New Article Has been Added Into Your DataBase:", savedDoc.name);
    
    // Add second document as mentioned in lab
    const doc2 = new person_doc({
      name: "Animesh",
      age: 21,
      Gender: "Male",
      Salary: 3456
    });
    await doc2.save();
    console.log("Second document added:", doc2.name);
    
  } catch (error) {
    console.error("Error in Task 1:", error);
  }
}

// TASK 2: Insert multiple documents
async function task2() {
  console.log("\n=== TASK 2: Adding Multiple Documents ===");
  try {
    // insertMany() - Creates multiple documents in a single operation
    const result = await person_doc.insertMany(manypersons);
    console.log("Data inserted successfully. Documents added:", result.length);
  } catch (error) {
    console.error("Error in Task 2:", error);
  }
}

// TASK 3: Find all documents with sorting and limiting
async function task3() {
  console.log("\n=== TASK 3: Fetching All Documents ===");
  try {
    const docs = await person_doc.find({})
      .sort({ Salary: 1 }) // sort ascending by Salary
      .select("name Salary age") // select only these fields
      .limit(5) // limit to 5 results as per lab requirement
      .exec();

    console.log("Showing multiple documents (sorted by Salary ascending):");
    docs.forEach(function(doc) {
      console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
    });
    console.log(`Total documents found: ${docs.length}`);
  } catch (err) {
    console.error('Error in Task 3:', err);
  }
}

// TASK 4: Find with filtering criteria
async function task4() {
  console.log("\n=== TASK 4: Find with Filtering Criteria ===");
  try {
    var givenage = 30;
    const docs = await person_doc.find({
      Gender: "Female",
      age: { $gte: givenage }
    })
    .sort({ Salary: 1 })
    .select('name Salary age')
    .limit(10)
    .exec();

    console.log("Showing females with age greater than or equal to", givenage);
    docs.forEach(function(Doc) {
      console.log(`Age: ${Doc.age}, Name: ${Doc.name}, Salary: ${Doc.Salary}`);
    });
  } catch (err) {
    console.error('Error in Task 4:', err);
  }
}

// TASK 5: Count documents
async function task5() {
  console.log("\n=== TASK 5: Count Documents ===");
  try {
    const count = await person_doc.countDocuments().exec();
    console.log("Total documents Count:", count);
  } catch (err) {
    console.error('Error in Task 5:', err);
  }
}

// TASK 6: Delete documents
async function task6() {
  console.log("\n=== TASK 6: Delete Documents ===");
  try {
    const result = await person_doc.deleteMany({ age: { $gte: 25 } }).exec();
    console.log('Deleted documents count:', result.deletedCount);
  } catch (error) {
    console.error('Error in Task 6:', error);
  }
}

// TASK 7: Update documents
async function task7() {
  console.log("\n=== TASK 7: Update Documents ===");
  try {
    // First let's add some female records to update
    const femalePersons = [
      { name: 'Anna', age: 29, Gender: "Female", Salary: 4000 },
      { name: 'Sophia', age: 31, Gender: "Female", Salary: 5200 }
    ];
    await person_doc.insertMany(femalePersons);

    const result = await person_doc.updateMany( 
      { Gender: "Female" },
      { Salary: 5555 }  
    ).exec();
    
    console.log("Update successful - Modified count:", result.modifiedCount);
    
    // Show the updated records
    const updatedFemales = await person_doc.find({ Gender: "Female" }).select('name Salary').exec();
    console.log("Updated female records:");
    updatedFemales.forEach(doc => {
      console.log(`Name: ${doc.name}, Salary: ${doc.Salary}`);
    });
  } catch (error) {
    console.error('Error in Task 7:', error);
  }
}

// Execute all tasks in sequence
async function executeAllTasks() {
  try {
    // Wait for connection to be established
    if (mongoose.connection.readyState !== 1) {
      await new Promise(resolve => db.once('connected', resolve));
    }

    await task1();
    await task2();
    await task3();
    await task4();
    await task5();
    
    // Wait a bit before delete operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    await task6();
    
    // Wait before update operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    await task7();

    console.log("\n=== ALL TASKS COMPLETED ===");
    
  } catch (error) {
    console.error('Error in main execution:', error);
  } finally {
    // Close connection after operations
    setTimeout(() => {
      mongoose.connection.close();
      console.log('Database connection closed');
    }, 5000);
  }
}

// Export for use in other files
module.exports = {
  person_doc,
  task1,
  task2,
  task3,
  task4,
  task5,
  task6,
  task7,
  executeAllTasks
};

// Run all tasks
executeAllTasks();