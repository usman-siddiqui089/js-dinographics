
    const dinosaurs_arr = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": ['First discovered in 1889 by Othniel Charles Marsh','The skull of a Triceratops alone could grow over 2m (7ft) in length.','The US state of Wyoming lists the Triceratops as its state dinosaur.']
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": ['The largest known skull measures in at 5 feet long.','Tyrannosaurus rex is often abbreviated to T-Rex.','The skull of a Tyrannosaurus rex alone measured up to 1.5m (5ft) long.']
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": ['Anklyosaurus survived for approximately 135 million years.','The name Ankylosaurus means fused lizard.','Ankylosaurus were herbivores (plant eaters) and had small teeth relative to their body size.']
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": ['An asteroid was named 9954 Brachiosaurus in 1991.','The Brachiosaurus was a herbivore (plant eater), that feed on foliage high above the ground.','Brachiosaurus lived in North America.']
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbivore",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": ['The Stegosaurus had between 17 and 22 seperate places and flat spines.','The size of their brain was only around the size of a dog’s.','The name ‘Stegosaurus’ comes from the Greek words ‘stegos’ meaning roof and ‘sauros’ meaning lizard.']
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": ['Elasmosaurus was a marine reptile first discovered in Kansas.','The meaning of its name is Thin Plated Lizard.','Elasmosaurus was very slow swimmer.']
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": ['Actually a flying reptile, the Pteranodon is not a dinosaur.','The wingspan of the pteranodon was thought to be 25 to 33 feet across.','It had a toothless beak, like most birds of today.']
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavore",
            "where": "World Wide",
            "when": "Holocene",
            "fact": ['All birds are living dinosaurs.']
        }
    ]

    //locators and variables
    let name_inp = document.getElementById('name');
    let feet_inp = document.getElementById('feet');
    let inches_inp = document.getElementById('inches');
    let weight_inp = document.getElementById('weight');
    let diet_inp = document.getElementById('diet');
    let form_btn = document.getElementById('btn');
    let form = document.getElementById("dino-compare");
    const grid = document.getElementById("grid");
    let dino_img_arr = ['./images/triceratops.png','./images/tyrannosaurus-rex.png','./images/anklyosaurus.png','./images/brachiosaurus.png','./images/human.png','./images/stegosaurus.png','./images/elasmosaurus.png','./images/pteranodon.png','./images/pigeon.png'];
    let species_arr = [];

    // Create Dino Constructor
    function Dino(species,weight,height,diet,where,when,fact){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Objects
    for(let i=0; i<8; i++){
        species_arr[i] = new Dino(`${dinosaurs_arr[i].species}`,`${dinosaurs_arr[i].weight}`,`${dinosaurs_arr[i].height}`,`${dinosaurs_arr[i].diet}`,`${dinosaurs_arr[i].where}`,`${dinosaurs_arr[i].when}`,`${dinosaurs_arr[i].fact}`)
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
    form_btn.addEventListener('click',(function fetchHumanDataFromHtmlForm(){
        //Fetch human data from html form here
        return function(){
            human = {
                species: name_inp.value,
                height: {
                    feet: feet_inp.value,
                    inches: inches_inp.value
                },
                weight: weight_inp.value,
                diet: diet_inp.value
            }
            species_arr.splice(4,0,human);
            console.log(species_arr[0].fact[0]);
            hideFormOnClick();
        }
    })());

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareWeight(obj1,obj2){
        let weight_diff;
        if(obj2.weight > obj1.weight){
            weight_diff = obj2.weight - obj1.weight;
        }
    } 

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(obj1,obj2){

    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet(obj1,obj2){

    }

    // Generate Tiles for each Dino in Array
    function generateTiles(){
        for (var i = 0; i < species_arr.length; i++) {
            let title_text = '';
            let p_text = '';
            let outer_div = document.createElement('div');
            let h3 = document.createElement('h3');
            let img = document.createElement('img');
            let p = document.createElement('p');
            // Add classNames for html elements
            outer_div.className = "grid-item";
            img.className = 'grid-img';
            img.src = `${dino_img_arr[i]}`;
            if(species_arr[i].fact!=null){
                p_text = document.createTextNode(`${species_arr[i].fact}`);
            }
            title_text = document.createTextNode(`${species_arr[i].species}`);
            //Append Dinos data with html elements
            h3.append(title_text);
            p.append(p_text);
            outer_div.appendChild(h3);
            outer_div.appendChild(img);
            if(i!=4){
                outer_div.appendChild(p);
            }             
            grid.appendChild(outer_div);
        }
    }

    // Remove form from screen
    function hideFormOnClick(){
        form.style.display = 'none';
        displayGrid();
    }


    // On button click, prepare and display infographic
    //Display the Grid
    function displayGrid(){
        generateTiles();
        grid.style.display = "flex";
    }