import http from "k6/http";
import { sleep } from "k6";

let randNum = Math.floor(Math.random() * 5);

let search = ['bricklayer', 'electrical%20improver', 'decorator', 'electrician', 'engineer'];

export let options = {
  vus: 1000,
  iterations: 1000

};

export default function () {
  let signin_url = "{{URL}}/api/login";
  let url = "{{URL}}/api/jobs-search?page=1&per_page=30";
  let payload = JSON.stringify({
    email: "test.divjot.worker@yopmail.com",
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
      let searchTerm = search[randNum]
      let res = http.post(
        url,
        JSON.stringify({ searchTerm }),
        { headers: new_header }
      );
      if (res.status === 200) {
        console.log("Search Success", res.status);
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