import { useEffect, useState } from "react";
import ImageCard from "../components/ImageGrid";

export default function MainPage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const requests = Array.from({ length: 9 }, () =>
        fetch('/api').then(r => r.json())
      );

      const results = await Promise.all(requests);
      setImages(results);
    };

    load();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      {images.map((url, i) => (
        <ImageCard key={i} url={url} />
      ))}
    </div>
  );
}