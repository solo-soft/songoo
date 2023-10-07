import { SINGERS_NAME } from "./pages/singers";
import fetcherQuery from "./graphQl/query/fetcher/fetcherQuery";
import { SCHEMA_ARTISTS_ID } from "./graphQl/query/schema/getIdArtistByName";
import { supabase } from "./supabase/SupabaseCreateClient";
import setUserDataOnSupabase from "./supabase/inserts/setUserDataOnSupabase";
import { SINGER_NAME_PERSIAN } from "./pages/singers";

// let isRunning = false;
// export function generator() {
  // let index = 0;
  //
  // if (isRunning) return;
  //
  // isRunning = true;
  //
  // const intervalId = setInterval(async () => {
  //   const uniqueName = SINGERS_NAME[index];
  //
  //   index += 1;
  //
  //   if (index >= SINGERS_NAME.length) {
  //     clearInterval(intervalId);
  //     isRunning = false;
  //   }
  //
  //   const res = page(index);
  //
  //
  //   const fetch = await fetcherQuery(SCHEMA_ARTISTS_ID, { name: uniqueName });
  //
  //   await setUserDataOnSupabase("SingersListGlobal", {
  //     pagination: res,
  //     singer_info: fetch?.find.artists.items[0],
  //   });

    // await setUserDataOnSupabase("SingersListPersian", {
    //   pagination: res,
    //   singer_info: fetch?.find.artists.items[0],
    // });
//   }, 5000);
// }

// const page = (index) => {
//   // console.log(index);
//
//   let page = 1;
//   if (index >= 20) {
//     page = 2;
//   }
//   if (index >= 40) {
//     page = 3;
//   }
//   if (index >= 60) {
//     page = 4;
//   }
//   if (index >= 80) {
//     page = 5;
//   }
//   if (index >= 100) {
//     page = 6;
//   }
//
//   return page;
// };

// generator()
