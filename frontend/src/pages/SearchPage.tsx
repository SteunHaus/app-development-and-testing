import { useState } from "react";
import ImageCard from "../components/ImageGrid";

type Img = { url: string; title: string };

export default function SearchPage() {
  const [queue, setQueue] = useState("");
  const [results, setResults] = useState<Img[]>([]);

  const search = async () => {
    if (!queue.trim()) {
      setResults([]);
      return;
    }

    const response = await fetch(`/api/search?picture_name=${encodeURIComponent(queue)}`, {
      method: "POST"
    });
    
    if (!response.ok) {
      setResults([]);
      return;
    }

    const data = await response.json();
    setResults(data.items);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Search photo"
          value={queue}
          onChange={e => setQueue(e.target.value)}
        />

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>

      {queue.trim() !== "" && (
        <div className={
          results.length <= 2
            ? "grid grid-center"
            : "grid grid-left"
          }
        >
          {results.map((img, i) => (
            <ImageCard key={i} url={img.url} />
          ))}
        </div>
      )}
    </div>
  );
}