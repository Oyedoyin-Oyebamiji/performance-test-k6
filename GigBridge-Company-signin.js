import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 20,
  iterations: 20
  //maxDuration:"5s"
};

export default function () {
  let url = "https://gigbridge-api-staging.herokuapp.com/api/login";
  let payload = JSON.stringify({
    // Your JSON payload data here
    "email": "test.divjot.company@yopmail.com",
    "password":"Bridge@123",
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
    if (response.status === 200) {
      console.log("OK", response.status);
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