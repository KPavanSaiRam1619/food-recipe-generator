document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipeResult = document.getElementById('recipeResult');
    const recipeContent = document.getElementById('recipeContent');
    const regenerateBtn = document.getElementById('regenerateBtn');
    
    // Sample recipe database
    const recipeDatabase = [
        {
            name: "Veggie Stir Fry",
            ingredients: ["tofu", "broccoli", "carrot", "soy sauce"],
            cuisine: "asian",
            diet: "vegan",
            instructions: [
                "Press tofu to remove excess water, then cube",
                "Chop vegetables into bite-sized pieces",
                "Heat oil in wok over high heat",
                "Add tofu and cook until golden",
                "Add vegetables and stir fry for 5 minutes",
                "Add soy sauce and cook for 2 more minutes",
                "Serve over rice"
            ]
        },
        {
            name: "Chicken Pasta",
            ingredients: ["chicken", "pasta", "tomato", "basil"],
            cuisine: "italian",
            diet: "any",
            instructions: [
                "Cook pasta according to package directions",
                "Season and dice chicken breast",
                "Sauté chicken in olive oil until cooked through",
                "Add diced tomatoes and simmer for 10 minutes",
                "Toss cooked pasta with chicken and sauce",
                "Garnish with fresh basil"
            ]
        },
        {
            name: "Bean Tacos",
            ingredients: ["beans", "tortilla", "avocado", "lime"],
            cuisine: "mexican",
            diet: "vegan",
            instructions: [
                "Heat tortillas in a dry skillet",
                "Mash beans with lime juice and spices",
                "Spread bean mixture on tortillas",
                "Top with sliced avocado",
                "Add salsa and cilantro if desired",
                "Serve with lime wedges"
            ]
        },
        {
            name: "Quinoa Salad",
            ingredients: ["quinoa", "cucumber", "tomato", "lemon"],
            cuisine: "any",
            diet: "vegetarian",
            instructions: [
                "Cook quinoa according to package directions",
                "Chop cucumber and tomatoes into small pieces",
                "Whisk together lemon juice, olive oil, and salt",
                "Combine quinoa with vegetables",
                "Pour dressing over salad and toss",
                "Chill for 30 minutes before serving"
            ]
        }
    ];

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateRecipe();
    });

    regenerateBtn.addEventListener('click', generateRecipe);

    function generateRecipe() {
        // Get user inputs
        const ingredients = document.getElementById('ingredients').value.toLowerCase().split(',').map(i => i.trim());
        const cuisine = document.getElementById('cuisine').value;
        const diet = document.getElementById('diet').value;

        // Find matching recipes
        const matches = recipeDatabase.filter(recipe => {
            // Check ingredient match (at least one common ingredient)
            const ingredientMatch = ingredients.some(ing => 
                recipe.ingredients.some(recipeIng => recipeIng.includes(ing))
            );
            
            // Check cuisine match
            const cuisineMatch = cuisine === 'any' || recipe.cuisine === cuisine;
            
            // Check diet match
            const dietMatch = diet === 'any' || recipe.diet === diet;
            
            return ingredientMatch && cuisineMatch && dietMatch;
        });

        // Display result
        if (matches.length > 0) {
            const recipe = matches[Math.floor(Math.random() * matches.length)];
            displayRecipe(recipe);
        } else {
            displayNoMatch();
        }
    }

    function displayRecipe(recipe) {
        recipeContent.innerHTML = `
            <div class="recipe-title">${recipe.name}</div>
            
            <div class="recipe-section">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-section">
                <h3>Instructions:</h3>
                <ol>
                    ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        `;
        
        recipeResult.classList.remove('hidden');
    }

    function displayNoMatch() {
        recipeContent.innerHTML = `
            <p>No recipes found matching your ingredients. Try different ingredients or fewer restrictions.</p>
        `;
        recipeResult.classList.remove('hidden');
    }
});