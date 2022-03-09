
/**
 * Name: Jerry Wu
 * Date: Noveber 17, 2020
 * Section: CSE 154 AB / Austin Jenchi
 * This is the index.js page for creative project 4. It implements the different
 * behaviors for the website. It informs the user what Sir Corgi's favorite
 * items are whenever they want to know more about his favorite food, location,
 * or movie.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Runs once the page loads and displays the initial screen to the user.
   */
  function init() {
    id("categories").addEventListener("click", displayScreen);
  }

  /**
   * Fetches the categories of Sir Corgi's favorite things.
   */
  function displayScreen() {
    fetch("/categories")
      .then(checkStatus)
      .then(res => res.text())
      .then(displayCategories)
      .catch(handleError);
  }

  /**
   * Displays the categories to the page and allows the user to discover
   * what Sir Corgi's favorite things are.
   * @param {object} response - response with Sir Corgi's items in text form.
   */
  function displayCategories(response) {
    let display = gen("p");
    display.textContent = response;
    display.classList.add("results");
    id("results").appendChild(display);
    changeDisplay();
    id("food-btn").addEventListener("click", function() {
      getResponse("/categories/foods");
    }, false);
    id("location-btn").addEventListener("click", function() {
      getResponse("/categories/locations");
    }, false);
    id("movie-btn").addEventListener("click", function() {
      getResponse("/categories/movies");
    }, false);
  }

  /**
   * Changes the display on the page.
   */
  function changeDisplay() {
    id("results").classList.remove("hidden");
    id("categories").classList.add("hidden");
    id("food-btn").classList.remove("hidden");
    id("location-btn").classList.remove("hidden");
    id("movie-btn").classList.remove("hidden");
  }

  /**
   * Fetches the response from the api and displays the items to the page.
   * @param {String} url - specific url to request a response.
   */
  function getResponse(url) {
    fetch(url)
      .then(checkStatus)
      .then(res => res.json())
      .then(displayItems)
      .catch(handleError);
  }

  /**
   * Displays Sir Corgi's favorite set of items from the given selection that the
   * user has picked.
   * @param {object} response - response of Sir Corgi's favorite items in json form.
   */
  function displayItems(response) {
    id("results").innerHTML = "";
    let favoriteFoods = gen("p");
    favoriteFoods.textContent = "List of his favorites:";
    let foodList = gen("ol");
    for (let i = 0; i < response.length; i++) {
      let foods = gen("li");
      foods.textContent = response[i].name;
      foodList.appendChild(foods);
    }
    id("results").appendChild(favoriteFoods);
    id("results").appendChild(foodList);
  }

  /**
   * Displays the error message to the page.
   */
  function handleError() {
    let errorMessage = gen("p");
    errorMessage.textContent = "Error. Something went wrong. Please try again.";
    errorMessage.classList.add("results");
    id("results").appendChild(errorMessage);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function checkStatus(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();