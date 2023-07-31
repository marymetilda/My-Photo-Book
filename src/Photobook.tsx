import { useEffect, useRef } from "react";

const Photobook = (props: { imageData: string[] }) => {
  const el = useRef<HTMLDivElement>(null);
  const angleUnit = 180 / (props.imageData.length - 1);

  useEffect(() => {
    // Setup initail items angle
    const items = el.current!.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement;
      const nextAngle = -i * angleUnit;
      item.style.transform = `rotateY(${nextAngle}deg)`;
      item.dataset.targetIndex = i.toString();
      item.dataset.angle = nextAngle.toString();
    }

    // Move view based on mouse position
    const mouseHandler = (e: MouseEvent) => {
      const delta = (e.clientY / innerHeight - 0.5) * 10 - 20;
      el.current!.style.transform = `translateZ(-20px) translateX(-175px) rotateX(${delta}deg)`;
    };
    document.addEventListener("mousemove", mouseHandler);
  }, [props.imageData, angleUnit]);

  // Target an item bring to front
  function target(index: number) {
    const items = el.current!.children;
    const selectedItem = items[index] as HTMLDivElement;

    // Find the shifted amound
    const shift = items.length - parseInt(selectedItem.dataset.targetIndex!);

    // Ignore the front item
    if (shift === items.length) return;

    // Interate and update item angle
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement;
      const oldIndex = parseInt(item.dataset.targetIndex!);
      const angle = parseFloat(item.dataset.angle!);

      let targetIndex = oldIndex + shift;
      if (targetIndex >= items.length) targetIndex -= items.length;
      let nextAngle: number;
      if (oldIndex < targetIndex) {
        nextAngle = angle - (targetIndex - oldIndex) * angleUnit;
      } else {
        nextAngle =
          angle - (360 - Math.abs(angle % 360)) - targetIndex * angleUnit;
      }
      // Now update item transform and spatial data
      item.style.transform = `rotateY(${nextAngle}deg)`;
      item.dataset.angle = nextAngle.toString();
      item.dataset.targetIndex = targetIndex.toString();
    }
  }

  return (
    <div className="container my-4">
      <div className="photobook" ref={el}>
        {props.imageData.map((it, index) => {
          const key = it + index;

          return (
            <div
              onClick={() => target(index)}
              key={key}
              style={{ backgroundImage: `url(${it})` }}
              className="photobook-item"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Photobook;
