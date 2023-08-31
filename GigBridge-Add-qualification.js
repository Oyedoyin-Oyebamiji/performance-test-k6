import http from "k6/http";
import { sleep } from "k6";

let randQualification = Math.floor(Math.random() * 5);
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

let q = [744, 743, 741, 740, 742];

export let options = {
  vus: 70,
  iterations: 70,
  //maxDuration:"5s"
};

export default function () {
  let signup_url =
    "https://gigbridge-api-staging.herokuapp.com/api/worker-signup";
  let url =
    "https://gigbridge-api-staging.herokuapp.com/api/worker/qualifications";
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
      // console.log(body.data);
      let new_header = Object.assign({}, headers, {
        Authorization: "Bearer " + body.data.access_token,
      });
      let res = http.post(
        url,
        JSON.stringify({ qualification_id: q[randQualification] }),
        { headers: new_header }
      );
      if (res.status === 201) {
        console.log("Operation Success", res.status);
        // console.log("Body", res.body);
      } else {
        console.log("Failed", res);
      }
    } else {
      console.log("Failed", response.status);
      // console.log(response);
    }
  } catch (error) {
    console.log("error", error);
  }
}