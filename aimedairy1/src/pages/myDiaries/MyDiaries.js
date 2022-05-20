import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/Design/ImageSlider";
import UserPage from "../../components/Generic/UserPage";

import SearchInput from "../../components/Form/SearchInput";
import HomeDiariesList from "./components/HomeDiariesList";
import useDiary from "../../hooks/useDiary";

const MyDiaries = () => {
  const [diaries, setDiaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [diariesToDisplay, setDiariesToDisplay] = useState([]);
  const { myDiaries } = useDiary();
  useEffect(() => {
    getDiaries();
  }, []);

  const getDiaries = async () => {
    const res = await myDiaries();
    setDiaries(res.diaries);
    setDiariesToDisplay(res.diaries);
  };

  const changeHandler = e => {
    setSearchQuery(e.target.value);
  };
  const submitHandler = () => {
    const filtered = diaries.filter(item => item.title.includes(searchQuery));
    setDiariesToDisplay(filtered);
  };
  return (
    <UserPage>
      <div className='home'>
        <div className='home__content'>
          <div className='flexed-heading u-margin-top-medium'>
            <h1>My Diaries</h1>
          </div>
          <div className='home__content__search'>
            <SearchInput
              name='search'
              placeholder='Search Diaries'
              onChange={changeHandler}
              onSubmit={submitHandler}
            />
          </div>
          <div className='home__content__diaries u-margin-top-small'>
            <HomeDiariesList diaries={diariesToDisplay} />
          </div>
        </div>
      </div>
    </UserPage>
  );
};

export default MyDiaries;
