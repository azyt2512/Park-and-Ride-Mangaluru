export const getAllParks = async () => {
  const allParksUrl =
    "http://localhost:5000/api/parkinglot/";

  try {
    const response = await fetch(allParksUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    throw Error(e);
  }
};

export const getRealTimeParks = async () => {
  const realTimeUrl =
    "http://localhost:5000/api/parkinglot/";

  try {
    const response = await fetch(realTimeUrl);
    const data = await response.json();
    return data;
  } catch (e) {
    throw Error(e);
  }
};
// import realdata from "./temp2.js"
// import alldata from "./temp.js"
// export const getAllParks = async () => {
//   return alldata.records;
// };

// export const getRealTimeParks = async () => {
//   return realdata.records;
// };
