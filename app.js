
const dinosaursArr = [
  {
    species: 'Triceratops',
    weight: 13000,
    height: 114,
    diet: 'herbivore',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: ['First discovered in 1889 by Othniel Charles Marsh', 'The skull of a Triceratops alone could grow over 2m (7ft) in length.', 'The US state of Wyoming lists the Triceratops as its state dinosaur.']
  },
  {
    species: 'Tyrannosaurus Rex',
    weight: 11905,
    height: 144,
    diet: 'carnivore',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: ['The largest known skull measures in at 5 feet long.', 'Tyrannosaurus rex is often abbreviated to T-Rex.', 'The skull of a Tyrannosaurus rex alone measured up to 1.5m (5ft) long.']
  },
  {
    species: 'Ankylosaurus',
    weight: 10500,
    height: 55,
    diet: 'herbivore',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: ['Ankylosaurus survived for approximately 135 million years.', 'The name Ankylosaurus means fused lizard.', 'Ankylosaurus were herbivores (plant eaters) and had small teeth relative to their body size.']
  },
  {
    species: 'Brachiosaurus',
    weight: 70000,
    height: '372',
    diet: 'herbivore',
    where: 'North America',
    when: 'Late Jurasic',
    fact: ['An asteroid was named 9954 Brachiosaurus in 1991.', 'The Brachiosaurus was a herbivore (plant eater), that feed on foliage high above the ground.', 'Brachiosaurus lived in North America.']
  },
  {
    species: 'Stegosaurus',
    weight: 11600,
    height: 79,
    diet: 'herbivore',
    where: 'North America, Europe, Asia',
    when: 'Late Jurasic to Early Cretaceous',
    fact: ['The Stegosaurus had between 17 and 22 seperate places and flat spines.', 'The size of a Stegosaurus brain was only around the size of a dog’s.', 'The name ‘Stegosaurus’ comes from the Greek words ‘stegos’ meaning roof and ‘sauros’ meaning lizard.']
  },
  {
    species: 'Elasmosaurus',
    weight: 16000,
    height: 59,
    diet: 'carnivore',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: ['Elasmosaurus was a marine reptile first discovered in Kansas.', 'The meaning of Elasmosaurus is Thin Plated Lizard.', 'Elasmosaurus was very slow swimmer.']
  },
  {
    species: 'Pteranodon',
    weight: 44,
    height: 20,
    diet: 'carnivore',
    where: 'North America',
    when: 'Late Cretaceous',
    fact: ['Actually a flying reptile, the Pteranodon is not a dinosaur.', 'The wingspan of the pteranodon was thought to be 25 to 33 feet across.', 'Pteranodon had a toothless beak, like most birds of today.']
  },
  {
    species: 'Pigeon',
    weight: 0.5,
    height: 9,
    diet: 'herbavore',
    where: 'World Wide',
    when: 'Holocene',
    fact: ['All birds are living dinosaurs.']
  }
]

// locators and variables
const nameInput = document.getElementById('name')
const feetInput = document.getElementById('feet')
const inchesInput = document.getElementById('inches')
const weightInput = document.getElementById('weight')
const dietInput = document.getElementById('diet')
const compareButton = document.getElementById('btn')
const form = document.getElementById('dino-compare')
const compareAgainBtn = document.getElementById('compare-again-btn')
const errorAlert = document.getElementById('err-alert')
const grid = document.getElementById('grid')
const dinoImageArray = ['./images/triceratops.png', './images/tyrannosaurus-rex.png', './images/anklyosaurus.png', './images/brachiosaurus.png', './images/human.png', './images/stegosaurus.png', './images/elasmosaurus.png', './images/pteranodon.png', './images/pigeon.png']
const speciesArr = []

// Create Dino Constructor
function Dino (species, weight, height, diet, where, when) {
  this.species = species
  this.weight = weight
  this.height = height
  this.diet = diet
  this.where = where
  this.when = when
}

// Create Dino Objects and Store in Species Array
for (let i = 0; i < 8; i++) {
  speciesArr[i] = new Dino(`${dinosaursArr[i].species}`, `${dinosaursArr[i].weight}`, `${dinosaursArr[i].height}`, `${dinosaursArr[i].diet}`, `${dinosaursArr[i].where}`, `${dinosaursArr[i].when}`)
}

// Create Human Object
let human = {
  species: '',
  height: {
    feet: 0,
    inches: 0
  },
  weight: 0,
  diet: ''
}

// Use IIFE to get human data from form
compareButton.addEventListener('click', (function fetchHumanDataFromHtmlForm () {
  // Fetch human data from html form here
  return function () {
    const errorResult = formValidation(nameInput.value, feetInput.value, inchesInput.value, weightInput.value).toString()
    if (errorResult !== '') {
      errorAlert.innerHTML = errorResult
      errorAlert.style.display = 'block'
    } else {
      human = {
        species: nameInput.value,
        height: {
          feet: feetInput.value,
          inches: inchesInput.value
        },
        weight: weightInput.value,
        diet: dietInput.value
      }
      speciesArr.splice(4, 0, human)
      factsGenerator(speciesArr)
      hideFormOnClick()
    }
  }
})())

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight (obj1, obj2) {
  const humanWeight = parseInt(obj1.weight)
  const dinoWeight = parseInt(obj2.weight)
  let weightRatio = 0
  let whoIsHeavy = 0
  if (dinoWeight > humanWeight) {
    weightRatio = (dinoWeight / humanWeight).toFixed(2)
    whoIsHeavy = dinoWeight
  } else if (dinoWeight < humanWeight) {
    weightRatio = (humanWeight / dinoWeight).toFixed(2)
    whoIsHeavy = humanWeight
  } else {
    weightRatio = 1
  }

  if (whoIsHeavy === dinoWeight) {
    return `${obj2.species} is ${weightRatio} times heavier than you.`
  } else if (whoIsHeavy === humanWeight) {
    return `${obj1.species} is ${weightRatio} times heavier than ${obj2.species}.`
  } else if (weightRatio === 1) {
    return `${obj2.species} weighs equal to you.`
  } else {
    return 'Please try again, you entered incorrect weight value'
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight (obj1, obj2) {
  const humanHeightFeet = parseInt(obj1.height.feet * 12)
  const humanHeightInches = parseInt(obj1.height.inches)
  const humanHeight = humanHeightFeet + humanHeightInches
  const dinoHeight = parseInt(obj2.height)
  let heightRatio = 0
  let whoIsTaller = 0
  if (dinoHeight > humanHeight) {
    heightRatio = (dinoHeight / humanHeight).toFixed(2)
    whoIsTaller = dinoHeight
  } else if (dinoHeight < humanHeight) {
    heightRatio = (humanHeight / dinoHeight).toFixed(2)
    whoIsTaller = humanHeight
  } else {
    heightRatio = 1
  }

  if (whoIsTaller === dinoHeight) {
    return `${obj2.species} is ${heightRatio} times taller than you.`
  } else if (whoIsTaller === humanHeight) {
    return `${obj1.species} is ${heightRatio} times taller than ${obj2.species}`
  } else if (heightRatio === 1) {
    return `${obj2.species} is equal to you in height.`
  } else {
    return 'Please try again, you entered incorrect height value'
  }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet (obj1, obj2) {
  const humanDiet = (obj1.diet).toLowerCase()
  const dinoDiet = (obj2.diet)
  if (dinoDiet === humanDiet) {
    return `You and ${obj2.species} are both ${dinoDiet}s`
  } else {
    return `You are ${humanDiet} whereas ${obj2.species} is ${dinoDiet}`
  }
}

// Generate Tiles for each Dino in Array
function generateTiles () {
  for (let i = 0; i < speciesArr.length; i++) {
    let titleText = ''
    let pText = ''
    const outerDiv = document.createElement('div')
    const h3 = document.createElement('h3')
    const img = document.createElement('img')
    const p = document.createElement('p')
    // Add classNames for html elements
    outerDiv.className = 'grid-item'
    img.className = 'grid-img'
    img.src = `${dinoImageArray[i]}`
    if (speciesArr[i].fact != null) {
      const randFacts = Math.floor(Math.random() * speciesArr[i].fact.length) // Generate random number for facts array
      pText = document.createTextNode(`${speciesArr[i].fact[randFacts]}`)
    }
    titleText = document.createTextNode(`${speciesArr[i].species}`)
    // Append Dinos data with html elements
    h3.append(titleText)
    p.append(pText)
    outerDiv.appendChild(h3)
    outerDiv.appendChild(img)
    if (i !== 4) {
      outerDiv.appendChild(p)
    }
    grid.appendChild(outerDiv)
  }
}

// Remove form from screen
function hideFormOnClick () {
  form.style.display = 'none'
  displayGrid()
}

// On button click, prepare and display infographic
// Display the Grid
function displayGrid () {
  generateTiles()
  grid.style.display = 'flex'
  compareAgainBtn.style.display = 'block'
}

// Generate facts and store in Dino objects
function factsGenerator (arr) {
  let weightFact = ''
  let heightFact = ''
  let dietFact = ''
  for (let i = 0; i < arr.length; i++) {
    if (i === 4) {
      continue
    } else if (i === arr.length - 1) {
      arr[i].fact = dinosaursArr[i - 1].fact
    } else {
      // arr[i].fact = [];
      weightFact = compareWeight(arr[4], arr[i])
      heightFact = compareHeight(arr[4], arr[i])
      dietFact = compareDiet(arr[4], arr[i])
      if (i >= 5) {
        arr[i].fact = dinosaursArr[i - 1].fact
      } else {
        arr[i].fact = dinosaursArr[i].fact
      }
      arr[i].fact.push(weightFact)
      arr[i].fact.push(heightFact)
      arr[i].fact.push(dietFact)
    }
  }
}

// Form Validation
function formValidation (name, feet, inches, weight) {
  let errText
  name = name.toString()
  if (name === '' || feet === '' || inches === '' || weight === '') {
    errText = 'Error! Please fill the form completely.'
  } else {
    if (isNaN(feet) || isNaN(inches) || isNaN(weight) || feet < 1 || inches < 1 || weight < 1) {
      errText = 'Error! You entered invalid numeric value for Height or Weight. Please try again.'
    } else {
      errText = ''
    }
  }

  return errText
}
