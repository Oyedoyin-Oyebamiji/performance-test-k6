import http from "k6/http";
import { sleep } from "k6";
let randNum = Math.floor(Math.random() * 1000);

function generateRandomWord(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomWord = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters.charAt(randomIndex);
  }
  
  return randomWord;
}

let firstname = generateRandomWord(5);

export let options = {
  vus: 50,
  iterations: 50
  //maxDuration:"5s"
};

export default function () {
  let url = "https://gigbridge-api-staging.herokuapp.com/api/company-signup";
  let payload = JSON.stringify({
    // Your JSON payload data here
    first_name: "Gideon",
    last_name: "Peters",
    email: firstname + randNum + "@yopmail.com",
    phone_number: "164859784987",
    company_name: "FooBarL",
    password: "Bridge@123",
  });
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let params = {
    headers: headers,
  };

  try {
    let response = http.post(url, payload, params);

    // Validate the response status code
    if (response.status === 201) {
      console.log("Created", response.status);
      // console.log(JSON.parse(response.body));
    } else {
      console.log("Failed", response.status);
      // console.log(response);
    }

    
  } catch (error) {
    console.log("request failed");
    console.log(error);
  }
}