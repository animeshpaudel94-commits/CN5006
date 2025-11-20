const mongoose = require('mongoose');

// Use environment variables for security
const MONGO_URI = process.env.MONGO_URI = 'mongodb+srv://admin:admin1@cluster0.ujiblay.mongodb.net/week8';

// Connection with better options
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

// Model creation
const Person = mongoose.model('Person', PersonSchema, 'personCollection');

// Function to create and save a single person
async function createPerson(personData) {
  try {
    const person = new Person(personData);
    const savedPerson = await person.save();
    console.log('New person added:', savedPerson);
    return savedPerson;
  } catch (error) {
    console.error('Error saving person:', error.message);
    throw error;
  }
}

// Function to insert multiple persons
async function insertManyPersons(personsArray) {
  try {
    const result = await Person.insertMany(personsArray);
    console.log(`Data inserted successfully. ${result.length} documents added.`);
    return result;
  } catch (error) {
    console.error('Error inserting multiple persons:', error);
    throw error;
  }
}

// Function to find and display persons
async function findAndDisplayPersons() {
  try {
    const docs = await Person.find({})
      .sort({ Salary: 1 }) // sort ascending by Salary
      .select("name Salary age") // select only these fields
      .limit(10) // limit to 10 results
      .exec();

    console.log("Showing multiple documents (sorted by Salary ascending):");
    console.log("======================================================");
    docs.forEach(function(doc) {
      console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
    });
    console.log(`Total documents found: ${docs.length}`);
    
    return docs;
  } catch (err) {
    console.error('Error finding documents:', err);
    throw err;
  }
}

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

// Execute all operations in sequence
async function main() {
  try {
    // Insert single document
    console.log("1. Inserting single document...");
    await createPerson({
      name: 'Animesh',
      age: 21,
      Gender: 'Male',
      Salary: 3456
    });

    // Insert multiple documents
    console.log("\n2. Inserting multiple documents...");
    await insertManyPersons(manypersons);

    // Find and display documents
    console.log("\n3. Finding and displaying documents...");
    await findAndDisplayPersons();

  } catch (error) {
    console.error('Error in main execution:', error);
  } finally {
    // Close connection after operations
    // mongoose.connection.close();
  }
}

// Alternative way using your original syntax for find
Person.find({})
  .sort({ Salary: 1 })
  .select("name Salary age")
  .limit(10)
  .exec()
  .then(docs => {
    console.log("\nAlternative find method - Showing multiple documents:");
    console.log("======================================================");
    docs.forEach(function(doc) {
      console.log(`Age: ${doc.age}, Name: ${doc.name}, Salary: ${doc.Salary}`);
    });
  })
  .catch(err => {
    console.error(err);
  });

// EXACT CODE FROM SCREENSHOTS (FIXED VERSION)
var givenage = 30;

Person.find({
  Gender: "Female",
  age: { $gte: givenage }
})
// find all users
.sort({ Salary: 1 })    // sort ascending by Salary
.select('name Salary age') // Name and salary only
.limit(10)    // limit to 10 items
.exec()    // execute the query
.then(docs => {
  console.log("showing age greater than or equal to", givenage);
  
  docs.forEach(function(Doc) {
    console.log(Doc.age, Doc.name);
  });
})
.catch(err => {
  console.error(err);
});



// Export for use in other files
module.exports = {
  Person,
  createPerson,
  insertManyPersons,
  findAndDisplayPersons
};

// Uncomment the line below to run the main function
// main();