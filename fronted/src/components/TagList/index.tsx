import { Tag } from "antd";
interface Props {
  tagList?: string | string[];
}

const TagList = (props: Props) => {
  const { tagList } = props;
  console.log("tagList", tagList);

  const normalizedTags = Array.isArray(tagList)
    ? tagList
    : typeof tagList === "string" && tagList
      ? [tagList]
      : [];
  // const normalizedTags = JSON.parse(tagList || "[]");
  console.log("normalizedTags", normalizedTags);

  return (
    <div className="tag-list">
      {normalizedTags.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;
