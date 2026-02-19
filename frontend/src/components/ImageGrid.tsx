type Props = {
  url: string;
  title?: string;
};

export default function ImageGrid({ url }: Props) {
  return (
    <div>
      <img src={url} style={{ width: "100%" }} />
    </div>
  );
}