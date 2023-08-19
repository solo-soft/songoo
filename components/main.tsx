import Suggest from "./Suggest/Suggest";
import Header from "./Header/Header";


export const Main = ({ randomSingerUS } : {randomSingerUS : string}) => {
    return (
        <>
            <Header/>
            <Suggest/>
        </>
  );
};
