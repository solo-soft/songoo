import {css} from "@emotion/css";

export const menuStyle = css`
    .szh-menu {
      background: #252525;
      color: aliceblue;
      user-select: none;
      box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      padding: 5px;
      font-size: 14px;

      &__item {
        padding: 5px 10px;
        &--hover {
          background-color: #1e1e1e;
        }
      }

      &__divider {
        background: #494949;
      }
      &__arrow {
        background: #252525;
      }
    }
  `;
