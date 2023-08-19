import React from "react";
import Image from "next/image";
import { css } from "@emotion/css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CURRENT_SINGER } from "../../../recoil/atoms/atoms";


  const style = css`
    transition: 0.5s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  `;

const Pictures = ({ value }) => {
  const setCurrentSinger = useSetRecoilState(CURRENT_SINGER);
  return (
    <Image
      src={value.singer.images[0].url}
      layout={"fill"}
      objectFit={"cover"}
      className={style}
      onClick={() =>
        setCurrentSinger({
          singerId: value.singer.id,
          singerName: value.singer.name,
        })
      }
    />
  );
};

export default Pictures;
