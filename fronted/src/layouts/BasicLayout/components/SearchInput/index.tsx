import { Input } from "antd";

import { useNavigate } from "react-router";

const SearchInput = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  return (
    <div
      className="search-input"
      aria-hidden
      style={{ display: "flex", alignItems: "center", marginInlineEnd: 24 }}
    >
      <Search
        style={{ borderRadius: 4, marginInlineEnd: 12 }}
        placeholder="搜索题目"
        onSearch={(value) => {
          navigate(`/questions?q=${value}`);
        }}
      ></Search>
    </div>
  );
};

export default SearchInput;
