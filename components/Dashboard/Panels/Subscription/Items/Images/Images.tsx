import Image from "next/image";
import { css } from "@emotion/css";
import {useSetRecoilState } from "recoil";
import { CURRENT_SINGER } from "../../../../../../recoil/atoms/atoms";
import {TSubscriptions} from "../../../../TDashboard";


  const style = css`
    transition: 0.5s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  `;

const Images = ({ subscription } : {subscription : TSubscriptions}) => {
  const setCurrentSinger = useSetRecoilState(CURRENT_SINGER);
  return (
    <Image
      src={subscription.singer.images[0].url || "/"}
      placeholder={"blur"}
      blurDataURL={subscription.singer.images[2].url || "/"}
      layout={"fill"}
      objectFit={"cover"}
      className={style}
      onClick={() =>
        setCurrentSinger({
          singerId: subscription.singer.id,
          singerName: subscription.singer.name,
        })
      }
    />
  );
};

export default Images;
