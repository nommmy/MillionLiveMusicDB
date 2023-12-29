import styles from "../CharacterDetailPage.module.css";
import { Database } from "@/database.types";
import { FC } from "react";

type CharacterType = Database["public"]["Tables"]["mst_characters"]["Row"];
type Props = {
  character: CharacterType;
};

const CharacterProfile: FC<Props> = ({ character }) => {

  return (
    <div className={styles["profile-wrapper"]}>
      <h2>Profile</h2>
      <div className={styles["profile-items-container"]}>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            年齢
          </p>
          <p className={styles["profile-item"]}>{character.age}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            誕生日
          </p>
          <p className={styles["profile-item"]}>{character.birth_day}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            星座
          </p>
          <p className={styles["profile-item"]}>{character.sign}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            血液型
          </p>
          <p className={styles["profile-item"]}>{character.blood}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            出身地
          </p>
          <p className={styles["profile-item"]}>{character.from}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            身長
          </p>
          <p className={styles["profile-item"]}>{character.height}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            体重
          </p>
          <p className={styles["profile-item"]}>{character.weight}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            3 size
          </p>
          <p className={styles["profile-item"]}>{character.three_size}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            趣味
          </p>
          <p className={styles["profile-item"]}>{character.hobby}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            好きなこと
          </p>
          <p className={styles["profile-item"]}>{character.like}</p>
        </div>
        <div>
          <p
            className={styles["profile-item-label"]}
            style={{ borderBottom: `1px solid ${character.color}` }}
          >
            <span
              className={styles["profile-label-decoration"]}
              style={{ background: character.color }}
            />
            得意なこと
          </p>
          <p className={styles["profile-item"]}>{character.special}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;
