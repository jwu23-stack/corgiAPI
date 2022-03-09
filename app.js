"use strict";

const express = require("express");
const app = express();

let categories = ["food", "location", "movies"];
let food = [
  {
    "name": "Ice cream"
  },
  {
    "name": "Sushi"
  },
  {
    "name": "Pizza"
  },
  {
    "name": "Hamburger"
  },
  {
    "name": "Fruit"
  }
];
let location = [
  {
    "name": "London, United Kingdom"
  },
  {
    "name": "Los Angeles, California"
  },
  {
    "name": "Seattle, Washington"
  },
  {
    "name": "Taipei, Taiwan"
  }
];
let movies = [
  {
    "name": "Spider-Man: Into the Spider-Verse"
  },
  {
    "name": "The Avengers"
  },
  {
    "name": "Ford v Ferrari"
  }
];

app.get("/categories", function(req, res) {
  res.type("text").send(getCategories());
});

app.get("/categories/:category", function(req, res) {
  if (req.params["category"] === "foods") {
    res.json(getItem(0));
  } else if (req.params["category"] === "locations") {
    res.json(getItem(1));
  } else if (req.params["category"] === "movies") {
    res.json(getItem(2));
  } else {
    res.type("text").status(400)
      .send("Error, Bad Request. Please try again");
  }
});

/**
 * Gets the categories of Sir Corgi's favorite things. Returns the category data.
 * @return {list} - category data of Sir Corgi's favorite things.
 */
function getCategories() {
  let category = "Categories include ";
  for (let i = 0; i < categories.length - 1; i++) {
    category += categories[i] + ", ";
  }
  category += "and " + categories[categories.length - 1] + ".";
  return category;
}

/**
 * Gets the specific set of items that Sir Corgi enjoys from that list. Returns the
 * list of items.
 * @param {integer} index - index within the category list.
 * @return {object} - data of Sir Corgi's favorite specific item.
 */
function getItem(index) {
  if (index === 0) {
    return food;
  } else if (index === 1) {
    return location;
  }
  return movies;
}

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);