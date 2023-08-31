import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 50,
  iterations: 50,
  //maxDuration:"5s"
};

export default function () {
  let url = "{{URL}}/api/jobs";
  let payload = JSON.stringify({
    job_type_id: 10,
    job_role_id: 2,
    years_of_experience_id: 2,
    openings: 4,
    job_description: "<p>new item</p>",
    start_date: "2023-08-24",
    posting_title: "New Test Job 4",
    end_date: "2024-11-30",
    qualifications: [288],
    job_sector_id: 1,
    address: "Fort Augustus, Highland Council, PH32, United Kingdom",
    tool_id: 2,
    payment_duration: "Per Hour",
    project_type_id: 1,
    pay_per_hour_standard: 6900,
    pay_per_hour_overtime: 900,
    pay_per_day: 0,
    pay_per_week: 0,
    pay_per_year_standard: 0,
    postal_town: "Fort Augustus",
    postal_code: "PH32",
    country: "United Kingdom",
    administrative_area_level_1: "Scotland",
    administrative_area_level_2: "Highland Council",
    lat: 57.1448064,
    long: -4.6805166,
  });
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer {{token}}",
  };

  let params = {
    headers: headers,
  };

  try {
    let response = http.post(url, payload, params);

    // Validate the response status code
    if (response.status === 201) {
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