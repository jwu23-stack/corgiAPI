# Corgi API Documentation
The Corgi API provides information about Sir Corgi's favorite items such as his
favorite foods, locations in the world, and movies.

## Get the list of Sir Corgi's favorite items
**Request Format:** /categories

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns the entire category for Sir Corgi's favorite items that
you can look up in this API.


**Example Request:** /categories

**Example Response:**

```
food
location
movies
```

**Error Handling:**
NA

## Get the specific items from one of Sir Corgi's favorite things
**Request Format:** /categories/:category

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid category name, it returns a JSON of the basic data
for Sir Corgi's favorite items. A valid category name does not contain any space.

**Example Request:** /categories/foods

**Example Response:**

```json
{
    "name": "Ice cream",
    "name": "Sushi",
    "name": "Pizza",
    "name": "Hamburger",
    "name": "Fruit"
  }
}
```

**Error Handling:**
- Possible 400 (invalid request) error (all plain text):
  - If passed in an invalid category name, returns an error with the message:
  `Error, Bad Request. Please try again`
