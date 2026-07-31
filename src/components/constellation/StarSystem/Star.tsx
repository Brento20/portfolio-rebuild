import type { ProjectStar } from "../../../types/project";

interface StarProps {
  star: ProjectStar;
  isActive: boolean;
  isFeatured: boolean;
}

export function Star({
  star,
  isActive,
  isFeatured,
}: StarProps) {
  return (
    <>
      <span
        className={[
          "star-system__glow",
          `star-system__glow--${star.size}`,
          `star-system__glow--${star.glow}`,
          isActive ? "star-system__glow--active" : "",
          isFeatured ? "star-system__glow--featured" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <span
        className={[
          "star-system__core",
          `star-system__core--${star.size}`,
          `star-system__core--${star.glow}`,
          isActive ? "star-system__core--active" : "",
          isFeatured ? "star-system__core--featured" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </>
  );
}