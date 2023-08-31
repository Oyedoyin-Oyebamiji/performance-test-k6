import http from "k6/http";
import { sleep } from "k6";

let randNum = Math.floor(Math.random() * 5);

let search = ['bricklayer', 'electrical%20improver', 'decorator', 'electrician', 'engineer'];

export let options = {
  vus: 50,
  iterations: 50,
  //maxDuration:"5s"
};

export default function () {
  let signin_url = "https://gigbridge-api-staging.herokuapp.com/api/login";
  let url = "https://gigbridge-api-staging.herokuapp.com/api/workers-search?query="+ search[randNum];
  let payload = JSON.stringify({
    email: "test.divjot.company@yopmail.com",
    password: "Bridge@123",
  });

  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    let response = http.post(signin_url, payload, { headers });

    // Validate the response status code
    if (response.status === 200) {
      console.log("OK", response.status);
      let body = JSON.parse(response.body);
      // console.log(body.data);
      let new_header = Object.assign({}, headers, {
        Authorization: "Bearer " + body.data.token,
      });
      let res = http.post(
        url,
        {},
        { headers: new_header }
      );
      if (res.status === 200) {
        console.log("Search Success", res.status);
        // console.log("Body", res.body);
      } else {
        console.log("Failed", res.status);
      }
    } else {
      console.log("Failed", response.status);
      // console.log(response);
    }
  } catch (error) {
    console.log("error", error);
  }
}