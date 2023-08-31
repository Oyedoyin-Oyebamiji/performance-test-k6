import http from "k6/http";
import { sleep } from "k6";

let randNum = Math.floor(Math.random() * 1000);

function generateRandomWord(length) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomWord = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters.charAt(randomIndex);
  }

  return randomWord;
}

let firstname = generateRandomWord(5);

export let options = {
  vus: 10,
  iterations: 10,
  //maxDuration:"5s"
};

export default function () {
  let signup_url =
    "https://gigbridge-api-staging.herokuapp.com/api/worker-signup";
  let url =
    "https://gigbridge-api-staging.herokuapp.com/api/jobs/2da23cccbef84cc8a4485918f7f82d0d/apply";
  let payload = JSON.stringify({
    first_name: "Gideon",
    last_name: "Peters",
    email: firstname + randNum + "@yopmail.com",
    password: "Bridge@123",
  });

  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    let response = http.post(signup_url, payload, { headers });

    // Validate the response status code
    if (response.status === 201) {
      console.log("OK", response.status);
      let body = JSON.parse(response.body);
      let job_headers = Object.assign({}, headers, {
        Authorization: "Bearer " + body.data.access_token,
      });
      let res = http.post(url, payload, { headers: job_headers });
      if (res.status === 201) {
        console.log("Application Success", res.status);
      } else {
        console.log("Failed", res.status);
      }
    } else {
      console.log("Failed", response.status);
      // console.log(response);
    }
  } catch (error) {
    console.log('error', error);
  }
}